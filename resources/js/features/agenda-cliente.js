import { loadAccount } from '@/store/modules/account';
import { requestWithStatus } from '@/bootstrap';

export let agendaClient;

(() => {
 const account = loadAccount;
 async function autofill(form) {
  try {
   const data=await account();if(!data.user||!form.isConnected)return;
   const dialog=form.closest('dialog');if(dialog&&!dialog.open)return;
   for(const key of ['name','contact']) {
    const field=form.elements.namedItem(key);
    if(field&&!field.value.trim()&&!field.dataset.userEdited) {
     field.value=data.user[key] || (key==='contact'?data.user.email:'') || '';
     field.dispatchEvent(new Event('change',{bubbles:true}));
    }
   }
  }catch(_) { /* La solicitud como invitado sigue disponible. */ }
 }
 async function slots(date,duration) {
  const response=await requestWithStatus(`api/availability?date=${encodeURIComponent(date)}&duration=${encodeURIComponent(duration)}`);
  const data = response.data;
  if(response.status !== 200)throw Error(data.error||'No se pudo comprobar la disponibilidad.');return data;
 }
 const durationOf=form=>{const n=Number(form.elements.namedItem('duration')?.value);return Number.isFinite(n)&&n>0?Math.round(n*60):null;};
 async function check(form) {
  const date=form.elements.namedItem('date1')?.value,time=form.elements.namedItem('time1')?.value,duration=durationOf(form);
  if(!date||!time||!duration)throw Error('Selecciona duración, fecha y hora para comprobar la disponibilidad.');
  const result=await slots(date,duration);
  if(result.enabled&&!result.slots.includes(time))throw Error('La sesión completa no cabe a esa hora o el hueco ya no está disponible. Elige otro inicio.');
  return result;
 }
 function setupAvailability(form,dialog) {
  const label=form.elements.time1.closest('label');
  const note=document.createElement('p');note.className='agenda-help';note.setAttribute('role','status');label.after(note);
  const choices=document.createElement('div');choices.className='agenda-slot-choices';note.after(choices);
  let request=0, selectedStart="";
  const summary=document.createElement('aside');summary.className='agenda-request-selection';summary.hidden=true;
  const summaryText=document.createElement('span'),changeButton=document.createElement('button');changeButton.type='button';changeButton.textContent='Cambiar fecha y hora';
  summary.append(summaryText,changeButton);form.prepend(summary);
  changeButton.onclick=()=>form.dispatchEvent(new CustomEvent('agenda-edit-schedule'));
  function updateSummary(){
   const date=form.elements.date1.value,time=form.elements.time1.value,duration=durationOf(form);
   summary.hidden=!(date&&time&&duration);
   if(!summary.hidden)summaryText.textContent=new Date(date+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'long'})+' · '+time+' · '+String(duration/60).replace('.',',')+' h · Madrid';
  }
  form.addEventListener('input',updateSummary);form.addEventListener('change',()=>queueMicrotask(updateSummary));
  async function update() {
   const mine=++request,date=form.elements.date1.value,duration=durationOf(form);
   choices.replaceChildren();
   if(!date||!duration){note.textContent='Elige una fecha y duración para ver las horas libres · Madrid.';return;}
   note.textContent='Comprobando horas disponibles…';
   try {
    const data=await slots(date,duration);if(mine!==request)return;
    let field=form.elements.time1;
    if(!data.enabled){
     if(field.tagName==='SELECT') { const input=document.createElement('input'); input.type='time';input.name='time1';input.required=true;input.step='300';input.disabled=field.disabled;input.value=field.value;field.replaceWith(input); }
     note.textContent='Horario a confirmar con el máster · Madrid.';return;
    }
    if(field.tagName!=='SELECT') {
     const select=document.createElement('select');select.name='time1';select.required=true;select.disabled=field.disabled;select.id=field.id;field.replaceWith(select);field=select;
    }
    const previous=selectedStart || field.value;
    selectedStart="";
    field.replaceChildren(new Option(data.slots.length?'Selecciona una hora…':'Sin horas disponibles',''),...data.slots.map(time=>new Option(time,time)));
    if(data.slots.includes(previous))field.value=previous;
    updateSummary();
    note.textContent=data.slots.length?`Horas de inicio para una sesión de ${duration/60} h completas · Madrid. La solicitud no reserva el hueco.`:'No hay huecos para esa duración. Prueba otra fecha o una duración menor.';
   }catch(error){if(mine===request){note.textContent=error.message;}}
  }
  form.addEventListener('agenda-select-start',event=>{
   const selection=event.detail;
   form.elements.date1.value=selection.date;
   const durationField=form.elements.namedItem('duration');
   const value=String(selection.duration/60);
   if(![...durationField.options].some(option=>option.value===value))durationField.add(new Option(selection.duration===240?'4 horas aproximadamente':value+' horas',value));
   durationField.value=value;
   durationField.dispatchEvent(new Event('change',{bubbles:true}));
   selectedStart=selection.time;
   update();
  });
  form.addEventListener('change',event=>{if(['date1','duration','format','kind','adventure'].includes(event.target.name))queueMicrotask(update);});
  form.addEventListener('input',event=>{if(['name','contact'].includes(event.target.name)&&event.isTrusted)event.target.dataset.userEdited='true';});
  dialog.addEventListener('close',()=>{request++;selectedStart='';summary.hidden=true;note.textContent='';choices.replaceChildren();for(const key of ['name','contact'])if(form.elements[key])delete form.elements[key].dataset.userEdited;});
  document.querySelectorAll('[data-request-game]').forEach(button=>button.addEventListener('click',()=>queueMicrotask(()=>{autofill(form);update();})));
  update();
 }
 agendaClient={account,autofill,slots,check,setupAvailability};
 // Consulta visual del día seleccionado.
 const days=document.querySelector('#calendar-days'),sessions=document.querySelector('#session-list');
 if(days&&sessions){
  const box=document.createElement('div');box.className='agenda-availability-launch';sessions.before(box);
  const trigger=document.createElement('button');trigger.type='button';trigger.className='agenda-availability-button';trigger.innerHTML='<span aria-hidden="true">◷</span><span>Ver disponibilidad<small>Consulta las horas libres de este día</small></span><span aria-hidden="true">↗</span>';box.append(trigger);
  const modal=document.createElement('dialog');modal.className='agenda-availability-modal';modal.setAttribute('aria-labelledby','agenda-availability-title');
  modal.innerHTML=`<button type="button" class="agenda-modal-close" aria-label="Cerrar disponibilidad">×</button><p class="agenda-modal-eyebrow">HAGAMOS HUECO A VUESTRA AVENTURA</p><h2 id="agenda-availability-title">Horas disponibles</h2><p class="agenda-modal-date"></p><p>¿Cuánto durará vuestra sesión?</p><div class="agenda-duration-buttons" role="group" aria-label="Duración de la sesión"></div><p class="agenda-modal-status" role="status" aria-live="polite"></p><button type="button" class="agenda-next-slot" hidden>Buscar el próximo día con hueco →</button><div class="agenda-modal-slots"></div><p class="agenda-modal-footnote">Horario de Madrid. Cada hora indica un inicio en el que cabe la sesión completa. Enviar una solicitud no reserva el hueco.</p>`;
  document.body.append(modal);let duration=120,request=0,browsingDate="";
  const durations=modal.querySelector('.agenda-duration-buttons'),status=modal.querySelector('.agenda-modal-status'),grid=modal.querySelector('.agenda-modal-slots');
  const label=n=>String(n/60).replace('.',',');
  [120,150,180,240].forEach(n=>{const button=document.createElement('button');button.type='button';button.dataset.minutes=n;button.textContent=n===240?'4 h · One-shot':label(n)+' horas';button.onclick=()=>{duration=n;updateModal();};durations.append(button);});
  async function updateModal(){
   if(!modal.open)return;const date=browsingDate||days.dataset.selectedDate,mine=++request;grid.replaceChildren();
   const next=modal.querySelector('.agenda-next-slot');next.hidden=true;
   durations.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.minutes)===duration)));
   modal.querySelector('.agenda-modal-date').textContent=date?new Date(date+'T12:00:00').toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'';
   if(!date){status.textContent='Selecciona primero un día en el calendario.';return;}
   status.textContent='Buscando huecos para vuestra mesa…';
   try{
    const data=await slots(date,duration);if(mine!==request||!modal.open)return;
    if(!data.enabled){status.textContent='La disponibilidad se confirma directamente con el máster. Puedes solicitar una fecha y hora.';return;}
    if(!data.slots.length){next.hidden=false;status.textContent='No hay huecos para '+label(duration)+' horas. Prueba otra duración o elige otro día en el calendario.';return;}
    status.textContent=data.slots.length+' horas de inicio disponibles para sesiones de '+label(duration)+' h.';
    for(const [name,test] of [['Mañana',h=>h<12],['Tarde',h=>h>=12&&h<20],['Noche',h=>h>=20]]){
     const times=data.slots.filter(time=>test(Number(time.slice(0,2))));if(!times.length)continue;
     const section=document.createElement('section'),heading=document.createElement('h3'),chips=document.createElement('div');heading.textContent=name;chips.className='agenda-time-grid';
     times.forEach(time=>{const chip=document.createElement('button');chip.type='button';chip.className='agenda-time-chip';chip.textContent=time;chip.setAttribute('aria-label','Solicitar partida a las '+time);
      chip.onclick=()=>{
       const opener=document.querySelector('[data-request-game]');
       if(!opener){status.textContent='No se pudo abrir la solicitud. Recarga la página.';return;}
       const selection={date,time,duration};
       modal.close();opener.click();
       const form=document.querySelector('#request-game-form');
       if(form)form.dispatchEvent(new CustomEvent('agenda-select-start',{detail:selection}));
      };chips.append(chip);});section.append(heading,chips);grid.append(section);
    }
   }catch(error){if(mine===request&&modal.open)status.textContent=error.message;}
  }
  modal.querySelector('.agenda-next-slot').onclick=async()=>{
   const button=modal.querySelector('.agenda-next-slot'),mine=++request;
   const after=browsingDate||days.dataset.selectedDate;const chosenDuration=duration;
   button.disabled=true;status.textContent='Buscando el próximo día con hueco…';
   try{
    const response=await requestWithStatus('api/availability/next?after='+encodeURIComponent(after)+'&duration='+chosenDuration);
    const data=response.data;if(response.status !== 200)throw Error(data.error||'No se pudo buscar un hueco.');
    if(mine!==request||!modal.open)return;
    if(!data.enabled){status.textContent='El horario se confirma con el máster.';return;}
    if(!data.date){status.textContent='No hay huecos para esta duración en los próximos 365 días.';return;}
    browsingDate=data.date;updateModal();
   }catch(error){if(mine===request&&modal.open)status.textContent=error.message;}finally{button.disabled=false;}
  };
  trigger.onclick=()=>{browsingDate='';const form=document.querySelector('#request-game-form');const chosen=form?durationOf(form):null;if([120,150,180,240].includes(chosen))duration=chosen;modal.showModal();updateModal();};
  modal.querySelector('.agenda-modal-close').onclick=()=>modal.close();
  let outside=false;const isOutside=event=>{const r=modal.getBoundingClientRect();return event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;};
  modal.addEventListener('pointerdown',event=>{outside=event.target===modal&&isOutside(event);});
  modal.addEventListener('click',event=>{if(outside&&event.target===modal&&isOutside(event))modal.close();outside=false;});
  modal.addEventListener('close',()=>{request++;});
  new MutationObserver(()=>{browsingDate='';if(modal.open)updateModal();}).observe(days,{attributes:true,attributeFilter:['data-selected-date']});
 }
})();
