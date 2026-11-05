"use strict";
(() => {
  const tabs=[...document.querySelectorAll('.commission-price-tabs [role="tab"]')];
  if(!tabs.length)return;
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  const titles=['Aventuras','Compendios','Extras','Adaptaciones'];
  const euros=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);
  const packRows=service=>(window.COMMISSION_PACKAGES[service]||[]).map(p=>[p.title,p.description,`${p.from?'Desde ':''}${euros(p.price)}`]);
  const groups=[packRows('adventure'),packRows('collection'),
    [['Objeto mágico adicional','Por encima de lo incluido en el paquete.',euros(window.COMMISSION_EXTRA_RATES.objects)],['Criatura sencilla adicional','Diseño original con estadísticas. Por encima de las incluidas.',euros(window.COMMISSION_EXTRA_RATES.creatures)],['Localización breve adicional','Hasta 2 páginas, sin mapa.',euros(window.COMMISSION_EXTRA_RATES.locations)],['Ampliación narrativa','Bloque de hasta 2 páginas; no incluye nuevas criaturas u objetos.',euros(10)],['Recursos para VTT / JSON','Alcance y compatibilidad a confirmar.','A presupuestar'],['Ilustraciones originales realizadas por un ilustrador','Opcionales. Cantidad, estilo, detalle y derechos de uso a acordar.','A presupuestar']],
    [['Desarrollo de notas o ideas','Se valora el material aportado y el alcance de la aventura.','Presupuesto personalizado'],['Adaptación de nivel','Según los encuentros y las estadísticas que haya que modificar.','A consultar'],['Cambio de ambientación o sistema','Revisión previa del material y de los cambios necesarios.','A consultar'],['Requisitos especiales','Varios rangos de nivel, mecánicas complejas o proyectos extensos.','A consultar']]];
  groups.forEach((rows,index)=>{
    const body=document.querySelector(`[data-price-rows="${index}"]`);
    rows.forEach(row=>{const tr=document.createElement('tr');row.forEach((value,i)=>{const cell=document.createElement(i===0?'th':'td');if(i===0)cell.scope='row';else cell.dataset.label=i===1?'Qué incluye / alcance':'Precio orientativo';cell.textContent=value;tr.append(cell);});body.append(tr);});
  });
  let current=0;
  function select(index,focus=false){
    current=(index+tabs.length)%tabs.length;
    tabs.forEach((tab,i)=>{const active=i===current;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panels[i].hidden=!active;});
    document.querySelector('#price-position').textContent=`${titles[current]} · ${current+1} de ${tabs.length}`;
    if(focus)tabs[current].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',event=>{
      const targets={ArrowRight:current+1,ArrowLeft:current-1,Home:0,End:tabs.length-1};
      if(Object.prototype.hasOwnProperty.call(targets,event.key)){event.preventDefault();select(targets[event.key],true);}
    });
  });
  document.querySelector('#price-previous').addEventListener('click',()=>select(current-1));
  document.querySelector('#price-next').addEventListener('click',()=>select(current+1));
  const modal = document.getElementById('commission-prices-dialog');
  let previousFocus = null;
  let openingCalculator = false;
  if (modal) {
    document.querySelectorAll('[data-open-prices]').forEach(button => {
      button.addEventListener('click', () => {
        previousFocus = button;
        select(Number(button.dataset.openPrices));
        if (!modal.open) modal.showModal();
        modal.scrollTop = 0;
        modal.querySelector('.commission-prices-close').focus({preventScroll:true});
      });
    });
    modal.querySelector('.commission-prices-close').addEventListener('click', () => modal.close());
    modal.addEventListener('close', () => {
      if (!openingCalculator && previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
      openingCalculator = false;
    });
    let outside = false;
    function isOutside(event) {
      const rect = modal.getBoundingClientRect();
      return event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
    }
    modal.addEventListener('pointerdown', event => { outside = isOutside(event); });
    modal.addEventListener('click', event => {
      if (outside && isOutside(event)) modal.close();
      outside = false;
    });
    modal.querySelector('[data-open-commission]').addEventListener('click', () => {
      openingCalculator = true;
      modal.close();
      const service = document.querySelector('#commission-form')?.elements.service;
      const category = ['adventure', 'collection', null, 'adaptation'][current];
      if (service && category) {
        service.value = category;
        service.dispatchEvent(new Event('change', {bubbles:true}));
      }
    }, {capture:true});
  }
  select(0);
})();
