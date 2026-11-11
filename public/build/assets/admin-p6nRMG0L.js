import{k as te}from"./main-CLiHRCN8.js";function Z(e){const a=e.shipping||{};return`<fieldset class="wide shipping-fields"><legend>Libro sin embalaje</legend>
    <p>Datos de un solo ejemplar, sin sobre ni protecciones. El peso y las medidas de sobre se configuran en Envíos y se añaden una sola vez por paquete.</p>
    <div class="shipping-admin-grid">${[["book_weight_g","Peso del libro (g)",4e4],["book_length_cm","Largo del libro (cm)",240],["book_width_cm","Ancho del libro (cm)",240],["book_height_cm","Grosor del libro (cm)",240]].map(([o,i,l])=>`<label>${i}<input type="number" name="shipping_${o}" min="0.01" max="${l}" step="0.01" value="${s(a[o]??"")}"></label>`).join("")}</div>
    <p class="small">Completa los cuatro campos para calcular el envío, tanto de uno como de varios ejemplares.</p>
  </fieldset>`}function X(e){const a=p.shipping;if(!a){e.textContent="No se ha cargado la configuración de envíos.";return}const o=["1","2","3","3+","4"],i=["Araba/Álava","Albacete","Alicante","Almería","Ávila","Badajoz","Illes Balears","Barcelona","Burgos","Cáceres","Cádiz","Castellón","Ciudad Real","Córdoba","A Coruña","Cuenca","Girona","Granada","Guadalajara","Gipuzkoa","Huelva","Huesca","Jaén","León","Lleida","La Rioja","Lugo","Madrid","Málaga","Murcia","Navarra","Ourense","Asturias","Palencia","Las Palmas","Pontevedra","Salamanca","Santa Cruz de Tenerife","Cantabria","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Bizkaia","Zamora","Zaragoza","Ceuta","Melilla"],l=(r,t,d,m=100,g=!0)=>`<label>${t}<input type="number" name="${r}" min="0" max="${m}" step="0.01" value="${s(d??"")}" ${g?"required":""}></label>`;e.innerHTML=`<div class="panel-head"><h2>Envíos de libros</h2></div>
    <p>Correos Paq Estándar a domicilio · Un sobre de hasta 5 kg, incluido el embalaje; una pila de libros. Península y Baleares. Otros destinos se confirman por WhatsApp.</p>
    <form id="shipping-settings" class="settings-form">
      <label class="shipping-check"><input name="enabled" type="checkbox" ${a.enabled?"checked":""}> Activar cálculo automático</label>
      <div class="shipping-admin-grid">
        <label>Código postal de origen<input name="origin_postcode" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" value="${s(a.origin_postcode)}" placeholder="Tu código postal en Zaragoza"></label>
        <label>Tarifas confirmadas hasta<input name="valid_until" type="date" value="${s(a.valid_until)}"></label>
        <input type="hidden" name="packaging_fee" value="2">
        ${l("surcharge_percent","Recargo sobre transporte antes de impuestos (%)",a.surcharge_percent)}
      </div>
      <details class="shipping-admin-section" open><summary>Configuración del sobre</summary>
      <p>Se calcula una única pila en un sobre de hasta 5 kg reales, incluido el embalaje. Si el pedido supera su capacidad, se confirma por WhatsApp. El importe del embalaje es final y se suma una sola vez.</p>
      <p>Mide el espacio útil para una pila, reservando protección y cierre. Introduce también las medidas exteriores máximas de referencia del sobre lleno y cerrado: se usarán para todos los pedidos y pueden aumentar la estimación por peso volumétrico. El alto exterior no es el grosor del papel.</p>
      ${["envelope"].map(r=>{var m;const t=((m=a.packaging_types)==null?void 0:m[r])||{};return`<fieldset class="shipping-fields"><legend>Sobre</legend>
          <p class="small">Límite fijo: 5 kg de libros y embalaje juntos.</p>
          <div class="shipping-admin-grid">
          ${[["fee","Precio del sobre y preparación al cliente (€)",2,100],["weight_g","Peso del embalaje y protección vacíos (g)",null,1e4],["inner_length_cm","Largo interior útil (cm)",null,240],["inner_width_cm","Ancho interior útil (cm)",null,240],["inner_height_cm","Grosor máximo de la pila (cm)",null,240],["length_cm","Largo exterior (cm)",null,240],["width_cm","Ancho exterior (cm)",null,240],["height_cm","Alto exterior del paquete cerrado (cm)",null,240]].map(([g,h,N,M])=>`<label>${h}<input data-packing-kind="${r}" data-packing-key="${g}" type="number" min="${["fee","weight_g"].includes(g)?0:.01}" max="${M}" step="0.01" value="${s(t[g]??N??"")}"></label>`).join("")}
          </div></fieldset>`}).join("")}
      </details>
      <p>Las tarifas precargadas son las de tu oferta de marzo de 2026, sin impuestos. Comprueba el contrato vigente y los posibles recargos antes de activar.</p>
      <details class="shipping-admin-section" open><summary>Tarifas de transporte sin impuestos (€)</summary>
      <div class="shipping-table-scroll"><table><thead><tr><th>Zona</th>${[1,2,3,4,5,10,15].map(r=>`<th>Hasta ${r} kg</th>`).join("")}<th>Impuesto (%)</th></tr></thead><tbody>
      ${o.map(r=>`<tr><th>${r}</th>${a.rates[r].map((t,d)=>`<td><input aria-label="Zona ${r}, hasta ${[1,2,3,4,5,10,15][d]} kg" data-rate-zone="${r}" data-rate-index="${d}" type="number" min="0.01" max="1000" step="0.01" value="${s(t)}" required></td>`).join("")}<td><input aria-label="Impuesto zona ${r}" data-tax-zone="${r}" type="number" min="0" max="100" step="0.01" value="${s(a.tax_percent[r]??"")}" placeholder="Confirmar"></td></tr>`).join("")}
      </tbody></table></div></details>
      <details class="shipping-admin-section"><summary>Zona de Correos por provincia de destino</summary>
      <p>Confirma la clasificación para envíos desde tu código postal. No basta la distancia: Correos distingue zonas 3 y 3+. Las provincias sin zona o sin impuesto configurado quedan a consultar.</p>
      <div class="shipping-admin-grid">${i.map((r,t)=>{const d=String(t+1).padStart(2,"0"),m=["35","38","51","52"].includes(d);return`<label>${d} · ${r}${m?" · A consultar":`<select data-province="${d}"><option value="">A consultar</option>${o.map(g=>`<option value="${g}" ${a.province_zones[d]===g?"selected":""}>Zona ${g}</option>`).join("")}</select>`}</label>`}).join("")}</div></details>
      <label class="shipping-check"><input name="confirmed" type="checkbox" ${a.confirmed?"checked":""}> He comprobado tarifas, impuestos, recargos y zonas de mi contrato vigente.</label>
      <p>Pasada la fecha de revisión, la web vuelve a «Envío a consultar». El peso facturable es el mayor entre el real y largo × ancho × alto / 6000 (cm). Más de 15 kg facturables o medidas fuera de límite: a consultar.</p>
      <button type="submit" class="btn gold">Guardar envíos</button>
      <p id="shipping-save-status" role="status"></p>
    </form>`;const n=e.querySelector("form");n.onsubmit=async r=>{r.preventDefault();const t=n.querySelector("[type=submit]"),d=n.querySelector("[role=status]");t.disabled=!0;try{const m=Object.fromEntries(new FormData(n));m.enabled=n.elements.enabled.checked,m.confirmed=n.elements.confirmed.checked,m.rates={},m.tax_percent={},m.province_zones={},o.forEach(g=>{m.rates[g]=Array.from(n.querySelectorAll("[data-rate-zone]")).filter(h=>h.dataset.rateZone===g).map(h=>Number(h.value)),m.tax_percent[g]=Array.from(n.querySelectorAll("[data-tax-zone]")).find(h=>h.dataset.taxZone===g).value}),n.querySelectorAll("[data-province]").forEach(g=>m.province_zones[g.dataset.province]=g.value),m.packaging_types={},["envelope"].forEach(g=>{const h={enabled:!0,max_weight_kg:5};n.querySelectorAll('[data-packing-kind="'+g+'"][data-packing-key]').forEach(N=>{h[N.dataset.packingKey]=N.value}),m.packaging_types[g]=h}),await $("/api/admin/shipping",m),await S(),j("Configuración de envíos guardada.")}catch(m){d.textContent=m.message}finally{t.disabled=!1}}}const ve=Object.freeze(Object.defineProperty({__proto__:null,renderShippingSettings:X,shippingProductFields:Z},Symbol.toStringTag,{value:"Module"}));let q;function ee(e){const a=p.agenda||{enabled:!1,step:15,weekly:{},blocks:[]},o=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];e.innerHTML=`<div class="panel-head"><h2>Tu disponibilidad semanal</h2></div>
 <p>Horario de Madrid. Las franjas semanales se repiten hasta que las cambies. Los bloqueos tienen prioridad sobre las horas disponibles.</p>
 <form id="agenda-admin-form" class="agenda-settings">
 <label class="check"><input type="checkbox" name="enabled" ${a.enabled?"checked":""}>Activar disponibilidad por horas</label>
 <label>Separación entre posibles inicios<select name="step">${[5,15,30,60].map(u=>`<option value="${u}" ${Number(a.step)===u?"selected":""}>${u} minutos</option>`).join("")}</select></label>
 <details class="agenda-week-toggle">
  <summary>Mostrar / ocultar horario semanal ▾</summary>
 <div class="agenda-visual-heading"><div><h3>Tu semana, de un vistazo</h3><p>Verde: puedes dirigir. Rojo: no estás disponible. Un día sin franjas verdes no ofrece partidas.</p></div>
 <button type="button" class="btn outline" id="agenda-university">Añadir universidad · L–J, 17:15–21:30</button></div>
 <div class="agenda-week-cards"></div>
 </details>
 <section class="agenda-extra-section"><h3>Abrir horas extra en una fecha</h3><p>Estas franjas permiten jugar aunque ese día tengas un bloqueo semanal, como universidad. Se suman a tu horario habitual. Los bloqueos puntuales y las partidas publicadas siguen ocupados.</p><div id="agenda-extras"></div><button type="button" class="btn outline" id="agenda-add-extra">Abrir horas extra +</button></section>
 <h3>Bloqueos en fechas concretas</h3><p>Para citas, vacaciones o partidas acordadas por WhatsApp. Solo afectan a la fecha indicada. Las notas son privadas.</p>
 <div id="agenda-blocks"></div><button type="button" class="btn outline" id="agenda-add-block">Añadir bloqueo puntual +</button>
 <p class="small">Las partidas publicadas también ocupan horas. Las solicitudes por WhatsApp no bloquean automáticamente. Desactivado: el cliente puede proponer una hora libremente.</p>
 <button type="submit" class="btn gold">Guardar disponibilidad</button><p id="agenda-save-status" role="status"></p></form>`;const i=e.querySelector("form"),l=e.querySelector("#agenda-blocks"),n=e.querySelector(".agenda-week-cards"),r=u=>String(Math.floor(u/60)).padStart(2,"0")+":"+String(u%60).padStart(2,"0"),t=u=>Number(u.slice(0,2))*60+Number(u.slice(3));function d(u,f=!1){let v='<option value="">Elegir…</option>';const x=new Set;for(let b=0;b<=(f?1440:1425);b+=15)x.add(r(b));return u&&x.add(u),v+[...x].sort().map(b=>`<option ${b===u?"selected":""} value="${s(b)}">${s(b)}</option>`).join("")}function m(u){const f=u.querySelector(".agenda-day-track");f.replaceChildren();for(const v of["available","unavailable"])u.querySelectorAll(`[data-kind="${v}"] .agenda-range`).forEach(x=>{const b=x.querySelector("[data-start]").value,_=x.querySelector("[data-end]").value;if(!b||!_||t(_)<=t(b))return;const y=document.createElement("span");y.className="agenda-track-"+v,y.style.left=t(b)/1440*100+"%",y.style.width=(t(_)-t(b))/1440*100+"%",y.title=`${v==="available"?"Disponible":"No disponible"}: ${b}–${_}`,f.append(y)})}function g(u,f,v=["",""]){const x=u.querySelector(`[data-kind="${f}"]`),b=document.createElement("div");b.className="agenda-range",b.innerHTML=`<label>Desde<select data-start required>${d(v[0])}</select></label><label>Hasta<select data-end required>${d(v[1],!0)}</select></label><button type="button" aria-label="Quitar franja" class="agenda-remove">×</button>`,b.querySelector("button").onclick=()=>{b.remove(),m(u)},b.addEventListener("change",()=>m(u)),x.querySelector(".agenda-ranges").append(b),m(u)}let h=null;o.forEach((u,f)=>{var b;const v=document.createElement("section");v.className="agenda-day-card",v.dataset.day=String(f+1),v.innerHTML=`<h3>${u}<small>Se repite cada semana</small></h3><div class="agenda-day-track" role="img" aria-label="Franjas semanales de ${u}"></div><div class="agenda-track-labels"><span>00:00</span><span>12:00</span><span>24:00</span></div>${["available","unavailable"].map(_=>`<div data-kind="${_}" class="agenda-kind"><h4>${_==="available"?"● Disponible":"● No disponible"}</h4><div class="agenda-ranges"></div><button type="button" class="btn outline agenda-add-range">+ Añadir franja</button></div>`).join("")}`;const x=document.createElement("div");x.className="agenda-copy-tools",x.innerHTML='<button type="button" class="btn outline" data-copy-day>Copiar horario</button><button type="button" class="btn outline" data-paste-day disabled>Pegar horario</button>',v.append(x),x.querySelector("[data-copy-day]").onclick=()=>{const _=x.querySelector("[data-copy-day]");if((h==null?void 0:h.name)===u){h=null,n.querySelectorAll("[data-copy-day]").forEach(y=>{y.textContent="Copiar horario",y.setAttribute("aria-pressed","false")}),n.querySelectorAll("[data-paste-day]").forEach(y=>{y.disabled=!0,y.textContent="Pegar horario"}),e.querySelector("#agenda-save-status").textContent="Copia cancelada. Los horarios no se han modificado.";return}n.querySelectorAll("[data-copy-day]").forEach(y=>{y.textContent="Copiar horario",y.setAttribute("aria-pressed","false")}),_.textContent="Cancelar copia",_.setAttribute("aria-pressed","true"),h={name:u};for(const y of["available","unavailable"])h[y]=[...v.querySelectorAll(`[data-kind="${y}"] .agenda-range`)].map(P=>[P.querySelector("[data-start]").value,P.querySelector("[data-end]").value]);n.querySelectorAll("[data-paste-day]").forEach(y=>{y.disabled=!1,y.textContent="Pegar "+u.toLowerCase()}),e.querySelector("#agenda-save-status").textContent="Horario de "+u.toLowerCase()+" copiado. Puedes pegarlo en varios días; sustituirá sus franjas."},x.querySelector("[data-paste-day]").onclick=()=>{if(h){for(const _ of["available","unavailable"])v.querySelector(`[data-kind="${_}"] .agenda-ranges`).replaceChildren(),h[_].forEach(y=>g(v,_,[...y]));m(v),e.querySelector("#agenda-save-status").textContent="Horario de "+h.name.toLowerCase()+" pegado en "+u.toLowerCase()+". Pulsa Guardar disponibilidad para conservarlo."}},n.append(v),v.querySelectorAll(".agenda-add-range").forEach(_=>_.onclick=()=>g(v,_.closest("[data-kind]").dataset.kind)),(a.weekly[f+1]||[]).forEach(_=>g(v,"available",_)),(((b=a.weekly_unavailable)==null?void 0:b[f+1])||[]).forEach(_=>g(v,"unavailable",_))}),e.querySelector("#agenda-university").onclick=()=>{[...n.children].slice(0,4).forEach(u=>{[...u.querySelectorAll('[data-kind="unavailable"] .agenda-range')].some(v=>v.querySelector("[data-start]").value==="17:15"&&v.querySelector("[data-end]").value==="21:30")||g(u,"unavailable",["17:15","21:30"])}),e.querySelector("#agenda-save-status").textContent="Universidad añadida de lunes a jueves. Pulsa Guardar disponibilidad para conservar los cambios."};function N(u={}){const f=document.createElement("fieldset");f.className="agenda-block",f.innerHTML=`<legend>Bloqueo puntual</legend><label>Fecha<input type="date" data-field="date" required value="${s(u.date||"")}"></label><label>Desde<select data-field="start" required>${d(u.start||"")}</select></label><label>Hasta<select data-field="end" required>${d(u.end||"",!0)}</select></label><label>Nota privada<input data-field="note" maxlength="160" value="${s(u.note||"")}"></label><button type="button" class="btn danger">Quitar bloqueo</button>`,f.querySelector("button").onclick=()=>f.remove(),l.append(f)}const M=e.querySelector("#agenda-extras");function V(u={}){const f=document.createElement("fieldset");f.className="agenda-block agenda-extra",f.innerHTML=`<legend>Disponible en esta fecha</legend><label>Fecha<input type="date" data-field="date" required value="${s(u.date||"")}"></label><label>Desde<select data-field="start" required>${d(u.start||"")}</select></label><label>Hasta<select data-field="end" required>${d(u.end||"",!0)}</select></label><label>Nota privada<input data-field="note" maxlength="160" value="${s(u.note||"")}"></label><button type="button" class="btn outline">Quitar apertura</button>`,f.querySelector("button").onclick=()=>f.remove(),M.append(f)}(a.extra_available||[]).forEach(V),e.querySelector("#agenda-add-extra").onclick=()=>V(),(a.blocks||[]).forEach(N),e.querySelector("#agenda-add-block").onclick=()=>N();const T=()=>JSON.stringify([...i.querySelectorAll("input,select,textarea")].map(u=>[u.type,u.value,u.type==="checkbox"?u.checked:null]));let I=T();q={dirty:()=>i.isConnected&&I!==T(),saved:u=>{I=u??T()},canLeave:()=>!i.isConnected||I===T()?!0:confirm("Tienes cambios de disponibilidad sin guardar. ¿Salir y descartarlos?")?(I=T(),!0):!1},i.onsubmit=async u=>{u.preventDefault();const f=e.querySelector("#agenda-save-status"),v=i.querySelector("[type=submit]");try{const x={},b={};[...n.children].forEach(P=>{for(const[L,re]of[["available",x],["unavailable",b]])re[P.dataset.day]=[...P.querySelectorAll(`[data-kind="${L}"] .agenda-range`)].map(U=>{const F=U.querySelector("[data-start]").value,G=U.querySelector("[data-end]").value;if(!F||!G||t(G)<=t(F))throw Error(`Revisa las horas de ${o[Number(P.dataset.day)-1]}. La hora final debe ser posterior a la inicial.`);return[F,G]})});const _=[...l.children].map(P=>Object.fromEntries([...P.querySelectorAll("[data-field]")].map(L=>[L.dataset.field,L.value.trim()]))),y=T();v.disabled=!0,await $("/api/admin/agenda",{enabled:i.elements.enabled.checked,step:Number(i.elements.step.value),weekly:x,weekly_unavailable:b,blocks:_,extra_available:[...M.children].map(P=>Object.fromEntries([...P.querySelectorAll("[data-field]")].map(L=>[L.dataset.field,L.value.trim()])))}),q==null||q.saved(y),await S(),j("Disponibilidad guardada. El horario semanal y sus bloqueos se repetirán automáticamente.")}catch(x){f.textContent=x.message}finally{v.disabled=!1}}}function ae(){let e=document.querySelector("#agenda-admin-alerts");e||(e=document.createElement("section"),e.id="agenda-admin-alerts",e.className="agenda-admin-alerts",document.querySelector("#stats").after(e));const a=Date.now(),o=a+7*864e5,i=p.reservations.filter(t=>t.status==="pending"&&!t.archived),l=p.reservations.filter(t=>t.status==="waitlisted"&&!t.archived),n=p.games.filter(t=>t.status==="open"&&new Date(t.starts).getTime()>a&&new Date(t.starts).getTime()<=o&&Number(t.available)>0),r=l.filter(t=>p.games.some(d=>String(d.id)===String(t.game_id)&&d.status==="open"&&new Date(d.starts).getTime()>a&&Number(d.available)>=Number(t.players)));e.innerHTML=`<h2>Para revisar</h2><div class="agenda-alert-grid"><button type="button" data-agenda-jump="reservations"><strong>${i.length}</strong> solicitudes pendientes</button><button type="button" data-agenda-jump="reservations"><strong>${l.length}</strong> en lista de espera${r.length?` · ${r.length} con plazas para revisar`:""}</button><button type="button" data-agenda-jump="games"><strong>${n.length}</strong> partidas esta semana con plazas libres</button></div>${n.length?`<ul>${n.slice(0,5).map(t=>`<li>${s(t.title)} · ${s(new Date(t.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid",dateStyle:"short",timeStyle:"short"}))} · ${Number(t.available)} plazas</li>`).join("")}</ul>`:""}`,e.querySelectorAll("[data-agenda-jump]").forEach(t=>t.onclick=()=>{ne(t.dataset.agendaJump),document.querySelector("#panel").focus({preventScroll:!0})})}window.addEventListener("beforeunload",e=>{q!=null&&q.dirty()&&(e.preventDefault(),e.returnValue="")});document.addEventListener("click",e=>{e.target.closest("[data-tab],[data-agenda-jump],#refresh,#logout,a[href]")&&q&&!q.canLeave()&&(e.preventDefault(),e.stopImmediatePropagation())},!0);const be=Object.freeze(Object.defineProperty({__proto__:null,get agendaEditor(){return q},renderAgendaAdmin:ee,renderAgendaAlerts:ae},Symbol.toStringTag,{value:"Module"})),c=e=>document.querySelector(e),s=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),ie="mazmorra-admin-tab";function oe(){try{return localStorage.getItem(ie)||"products"}catch{return"products"}}let p=null,E=oe();const A=c("#editor"),Y={open:"Abierta",closed:"Cerrada a nuevas solicitudes",cancelled:"Cancelada",pending:"Pendiente",waitlisted:"Lista de espera",confirmed:"Confirmada",rejected:"Rechazada"};async function $(e,a){const o=await te(e.replace(/^\//,""),{method:a?"POST":"GET",headers:a?{"Content-Type":"application/json","X-Mazmorra-CSRF":(p==null?void 0:p.csrf)||""}:{},data:a?JSON.stringify(a):void 0}),i=o.data;if(o.status<200||o.status>=300)throw o.status===401&&(p=null,c("#dashboard").hidden=!0,c("#login").hidden=!1,c("#logout").hidden=!0,A.close()),Error(i.error||"No se pudo completar la operación.");return i}function j(e,a=!1){c("#alert").textContent=e,c("#alert").className=a?"admin-error":"admin-success"}async function S(){try{p=await $("/api/admin/state"),c("#login").hidden=!0,c("#dashboard").hidden=!1,c("#logout").hidden=!1,H()}catch(e){if(!c("#login").hidden&&e.message==="Inicia sesión para continuar.")return;j(e.message,!0)}}function R(e){c("#editor-body").innerHTML=e+'<p id="editor-error" role="alert"></p>',A.showModal()}c(".close").onclick=()=>A.close();function w(e,a,o="",i="text",l=!1,n=!1){return`<label class="${l?"wide":""}">${a}<input name="${e}" type="${i}" value="${s(o)}" ${n?"required":""}></label>`}function z(e,a,o="",i=6e3){return`<label class="wide">${a}<textarea name="${e}" maxlength="${i}">${s(o)}</textarea></label>`}function C(e,a,o,i){return`<label>${a}<select name="${e}">${o.map(([l,n])=>`<option value="${l}" ${i===l?"selected":""}>${n}</option>`).join("")}</select></label>`}function B(e,a,o){const i=c("#edit-form");i.onsubmit=async l=>{l.preventDefault();const n=i.querySelector("[type=submit]");n.disabled=!0;try{let r=Object.fromEntries(new FormData(i));r.id=a||"",o&&(r=o(r,i)),await $(e,r),A.close(),j("Cambios guardados. La web ya utiliza los datos actualizados."),await S()}catch(r){c("#editor-error").textContent=r.message,c("#editor-error").className="editor-error"}finally{n.disabled=!1}}}const se=[{id:"pdf",label:"PDF",format:"digital"},{id:"pdf_vtt",label:"PDF + VTT",format:"digital"},{id:"pdf_vtt_json",label:"PDF + VTT + JSON",format:"digital"},{id:"book",label:"Libro físico",format:"physical"},{id:"book_pdf",label:"Libro + PDF",format:"physical"},{id:"book_pdf_vtt",label:"Libro + PDF + VTT",format:"physical"},{id:"book_pdf_vtt_json",label:"Libro + PDF + VTT + JSON",format:"physical"}];function le(e){const a=Array.isArray(e.purchase_packages)?e.purchase_packages:[];return`
    <fieldset class="wide purchase-packages">
      <legend>Opciones de compra</legend>
      <label class="check">
  <input type="checkbox" id="unlock-purchase-packages">
  Editar opciones de compra
</label>
      <p>Activa los paquetes que vendes e indica su precio total.</p>

      ${["digital","physical"].map(o=>`
        <h3>${o==="digital"?"Contenido digital":"Libros físicos"}</h3>

        ${se.filter(i=>i.format===o).map(i=>{const l=a.find(r=>r.id===i.id),n=!!l;return`
              <div class="purchase-package" data-package="${i.id}">
                <label class="check">
                  <input
                    type="checkbox"
                    data-package-enabled
                    ${n?"checked":""}
                  >
                  ${i.label}
                </label>

                <label>
                  Precio total · €
                  <input
                    type="number"
                    data-package-price
                    min="0.01"
                    max="10000"
                    step="0.01"
                    value="${s((l==null?void 0:l.price)??"")}"
                    ${n?"required":"disabled"}
                  >
                </label>
              </div>
            `}).join("")}
      `).join("")}
    </fieldset>
  `}function W(e={}){R(`<p class="eyebrow">CATÁLOGO</p><h2>${e.id?"Editar publicación":"Nueva publicación"}</h2><form id="edit-form"><div class="form-grid">${w("title","Título",e.title,"text",!0,!0)}${C("type","Categoría",[["aventura","Aventura"],["compendio","Libro o compendio"]],e.type||"aventura")}
     ${C("sale_format","Formato de venta",[["","Seleccione..."],["digital","Contenido digital"],["physical","Libro físico"],["both","Digital y físico"]],e.sale_format||"")}
    ${C("status","Etiqueta de estado",[["En desarrollo","En desarrollo"],["Próximamente","Próximamente"],["Disponible","Disponible"],["Agotado","Agotado"]],e.status||"En desarrollo")}${w("label","Género o subtítulo",e.label)}
${le(e)}
${C("physical_stock","Stock físico",[["available","En stock"],["out","Sin stock"]],e.physical_stock||"out")}
${Z(e)}
<label>
  Número de páginas
  <input
    name="pages"
    type="number"
    min="1"
    max="10000"
    step="1"
    value="${s(e.pages??"")}"
    placeholder="Ej.: 48"
  >
</label>
<label>
  Tarifa de partida · €/hora para todo el grupo de 3–5 jugadores
  <input
    name="session_rate"
    type="number"
    min="0.01"
    max="10000"
    step="0.01"
    value="${s(e.session_rate??"")}"
    placeholder="Sin configurar"
  >
</label>${w("level","Nivel",e.level)}
${C("players","Jugadores",[["","Seleccione..."],["1–2 jugadores","1–2 jugadores"],["3–5 jugadores","3–5 jugadores"],["6 o más jugadores","6 o más jugadores"],["No aplica","No aplica"]],e.players||"")}
${C("duration","Duración / formato de la aventura",[["","Seleccione..."],["Partida única","Partida única"],["Aventura de varias sesiones","Aventura de varias sesiones"],["Campaña corta","Campaña corta"],["Campaña larga","Campaña larga"],["Duración variable","Duración variable"],["No aplica","No aplica"]],e.duration||"")}
${w("demo","Enlace de la demo en Heyzine (opcional)",e.demo,"url",!0)}
${w("cover","URL de portada HTTPS o imagen subida",e.cover,"text",!0)}
<label class="wide">Subir portada (PNG, JPG o WebP, máximo 2,5 MB)<input id="cover-file" type="file" accept="image/png,image/jpeg,image/webp"></label>${z("intro","Descripción corta",e.intro,400)}${z("description","Descripción completa",e.description)}<label class="wide check"><input name="published" type="checkbox" ${e.published!==!1?"checked":""}>Visible en el catálogo</label></div><button class="btn gold" type="submit">Guardar publicación</button></form>`);for(const n of["status","players","duration","sale_format"]){const r=c("#edit-form").elements[n],t=e[n];t&&!Array.from(r.options).some(d=>d.value===t)&&(r.add(new Option(t,t)),r.value=t),r.required=!0}const a=c("#edit-form"),o=a.querySelector("#unlock-purchase-packages"),i=a.querySelectorAll("[data-package]");function l(){const n=o.checked;i.forEach(r=>{const t=r.querySelector("[data-package-enabled]"),d=r.querySelector("[data-package-price]");t.disabled=!n,d.disabled=!n||!t.checked,d.required=n&&t.checked})}o.addEventListener("change",l),i.forEach(n=>{n.querySelector("[data-package-enabled]").addEventListener("change",l)}),l(),B("/api/admin/product",e.id,(n,r)=>{const t=Array.from(r.querySelectorAll("[data-package]")).filter(d=>d.querySelector("[data-package-enabled]").checked).map(d=>({id:d.dataset.package,price:Number(d.querySelector("[data-package-price]").value)}));return{...n,purchase_packages:t,published:r.elements.published.checked}}),c("#cover-file").onchange=async n=>{const r=n.target.files[0];if(!r)return;if(r.size>25e5){c("#editor-error").textContent="La imagen supera 2,5 MB.";return}const t=c("#edit-form [type=submit]");t.disabled=!0;try{const d=new Uint8Array(await r.arrayBuffer());let m="";for(let h=0;h<d.length;h+=32768)m+=String.fromCharCode(...d.subarray(h,h+32768));const g=await $("/api/admin/upload",{content:btoa(m)});c("#edit-form").elements.cover.value=g.url,c("#editor-error").textContent="Portada subida. Guarda la publicación para aplicarla."}catch(d){c("#editor-error").textContent=d.message}finally{t.disabled=!1}}}function ce(e){if(!e)return"";const a=new Date(e);return new Date(a.getTime()-a.getTimezoneOffset()*6e4).toISOString().slice(0,16)}function Q(e={}){const a=Intl.DateTimeFormat().resolvedOptions().timeZone;R(`<p class="eyebrow">AGENDA</p><h2>${e.id?"Editar partida":"Nueva partida"}</h2><p class="small">Introduce la fecha y hora en la zona de este dispositivo: <b>${s(a)}</b>. La web las mostrará en horario de Madrid.</p><form id="edit-form"><div class="form-grid">${w("title","Título de la partida",e.title,"text",!0,!0)}${w("starts","Fecha y hora",ce(e.starts),"datetime-local",!1,!0)}${w("capacity","Plazas totales",e.capacity||5,"number",!1,!0)}${w("price","Precio por jugador (ej.: 15 €)",e.price)}${w("duration","Duración",e.duration)}${w("mode","Modalidad / ubicación",e.mode||"Online")}${C("status","Estado",[["open","Abierta"],["closed","Cerrada a nuevas solicitudes"],["cancelled","Cancelada"]],e.status||"open")}${z("description","Descripción y condiciones",e.description,3e3)}</div><p class="small">Cancelar una partida cancelará también sus solicitudes pendientes y reservas confirmadas. Los pagos se conservan para que puedas gestionar las devoluciones manualmente.</p><button class="btn gold" type="submit">Guardar partida</button></form>`),B("/api/admin/game",e.id,o=>{if(o.status==="cancelled"&&e.status!=="cancelled"&&!confirm("¿Cancelar la partida y sus reservas activas?"))throw Error("Cancelación detenida.");return{...o,capacity:Number(o.capacity),starts:new Date(o.starts).toISOString()}})}function J(e,a=!1){if(e.request_type==="commissioned"){me(e,a);return}const o={none:"Sin aviso",pending:"Envío pendiente de comprobar",sent:"Aceptado por el servidor de correo",failed:"No se pudo confirmar el envío",not_configured:"Correo sin configurar",no_recipient:"Sin email válido"};R(`<p class="eyebrow">SOLICITUD ${s(e.id)}</p><h2>${s(e.name)}</h2>
    <p>${s(e.game_title)} · ${s(new Date(e.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid"}))} (Madrid)</p>
    <p><b>Contacto:</b> ${s(e.contact)}<br><b>Jugadores:</b> ${s(e.players)}</p><p>${s(e.notes)}</p>
    <form id="edit-form"><div class="form-grid">
    ${C("status","Estado",[["pending","Pendiente"],["waitlisted","Lista de espera"],["confirmed","Confirmada"],["rejected","Rechazada"],["cancelled","Cancelada"]],a?"rejected":e.status)}
    <label class="check"><input name="paid" type="checkbox" ${e.paid?"checked":""}>Pago comprobado manualmente</label>
    <label class="check wide" id="short-notice-label" hidden><input type="checkbox" name="accept_short_notice"> Faltan menos de 24 horas para empezar. He acordado expresamente esta excepción con el grupo.</label>
    <label class="wide" id="rejection-message-label">Mensaje para el usuario
      <textarea name="rejection_reason" maxlength="2000" rows="5" ${e.status==="rejected"&&e.rejection_reason?"readonly":""}>${s(e.rejection_reason||"")}</textarea>
    </label></div>
    <p id="rejection-help" class="small">Este mensaje aparecerá en Mis partidas si la reserva tiene una cuenta vinculada. También se intentará enviar al email de su cuenta o, si no existe, al contacto cuando sea un correo válido.</p>
    ${e.status==="rejected"?`<p class="small"><b>Correo:</b> ${s(o[e.rejection_email_status]||"Sin aviso")}</p>`:""}
    <button class="btn gold" type="submit">Guardar reserva</button>
    ${e.status==="rejected"&&["failed","not_configured","no_recipient"].includes(e.rejection_email_status)?'<button class="btn outline" type="button" id="retry-rejection-email">Reintentar correo</button>':""}
    </form>`);const i=c("#edit-form"),l=()=>{const r=i.elements.status.value==="rejected",t=i.elements.status.value==="confirmed"&&e.status!=="confirmed"&&new Date(e.starts).getTime()-Date.now()<864e5;c("#short-notice-label").hidden=!t,i.elements.accept_short_notice.required=t,c("#rejection-message-label").hidden=!r,c("#rejection-help").hidden=!r,i.elements.rejection_reason.required=r,i.querySelector("[type=submit]").textContent=r&&e.status!=="rejected"?"Rechazar y avisar al usuario":"Guardar reserva";const d=c("#retry-rejection-email");d&&(d.hidden=!r)};i.elements.status.addEventListener("change",l),l(),i.onsubmit=async r=>{if(r.preventDefault(),!i.reportValidity())return;const t=i.querySelector("[type=submit]");t.disabled=!0;try{const d=await $("/api/admin/reservation",{id:e.id,status:i.elements.status.value,paid:i.elements.paid.checked,accept_short_notice:i.elements.accept_short_notice.checked,rejection_reason:i.elements.rejection_reason.value.trim()});A.close(),await S(),j(d.message||"Reserva guardada.")}catch(d){c("#editor-error").textContent=d.message,c("#editor-error").className="editor-error"}finally{t.disabled=!1}};const n=c("#retry-rejection-email");n&&(n.onclick=async()=>{n.disabled=!0;try{const r=await $("/api/admin/reservation",{id:e.id,status:"rejected",retry_email:!0});A.close(),await S(),j(r.message)}catch(r){c("#editor-error").textContent=r.message,c("#editor-error").className="editor-error"}finally{n.disabled=!1}})}const K=[{catalog_id:"LMoP",title:"La mina perdida de Phandelver",original_title:"Lost Mine of Phandelver",origin:"oficial",format:"Campaña corta",level:"Niveles 1–5",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/LMoP.webp",description:`Una escolta hacia Phandalin se convierte en la búsqueda de una antigua mina. Bandidos, ruinas y amenazas locales pondrán a prueba a un grupo que empieza su carrera como aventurero.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#lmop",cover_source:"https://5e.tools/img/covers/LMoP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"HotDQ",title:"El tesoro de la Reina Dragón",original_title:"Hoard of the Dragon Queen",origin:"oficial",format:"Campaña larga",level:"Niveles 1–7",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/HotDQ.webp",description:`Los ataques del Culto del Dragón sacuden la Costa de la Espada. Seguid el rastro de sus saqueos para descubrir por qué reúne un tesoro de proporciones extraordinarias.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#hotdq",cover_source:"https://5e.tools/img/covers/HotDQ.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"RoT",title:"El auge de Tiamat",original_title:"Rise of Tiamat",origin:"oficial",format:"Campaña larga",level:"Niveles 8–15",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/RoT.webp",description:`Las facciones de la Costa de la Espada necesitan aliados contra una amenaza dracónica. Diplomacia, expediciones y enfrentamientos decisivos continúan la historia de El tesoro de la Reina Dragón.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#rot",cover_source:"https://5e.tools/img/covers/RoT.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"PotA",title:"Príncipes del Apocalipsis",original_title:"Princes of the Apocalypse",origin:"oficial",format:"Campaña larga",level:"Niveles 1–15",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/PotA.webp",description:`Extraños sucesos alteran el valle del Dessarin. Investigad desapariciones y fortalezas sospechosas mientras una amenaza elemental crece bajo la superficie.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#pota",cover_source:"https://5e.tools/img/covers/PotA.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"OotA",title:"Fuera del abismo",original_title:"Out of the Abyss",origin:"oficial",format:"Campaña larga",level:"Niveles 1–15",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/OotA.webp",description:`Atrapados en la Infraoscuridad, tendréis que encontrar una salida entre criaturas extrañas, ciudades subterráneas y una locura que se extiende por las profundidades.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#oota",cover_source:"https://5e.tools/img/covers/OotA.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"CoS",title:"La maldición de Strahd",original_title:"Curse of Strahd",origin:"oficial",format:"Campaña larga",level:"Niveles 1–10",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/CoS.webp",description:`La niebla os conduce a Barovia, un valle sometido a un señor vampiro. Investigad sus secretos y buscad aliados en una historia de terror gótico donde escapar no será sencillo.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#cos",cover_source:"https://5e.tools/img/covers/CoS.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"SKT",title:"El trueno del Rey de la Tormenta",original_title:"Storm King's Thunder",origin:"oficial",format:"Campaña larga",level:"Niveles 1–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/SKT.webp",description:`Los gigantes amenazan los asentamientos del norte. Recorred la Costa de la Espada para descubrir qué ha quebrado su orden y evitar que el conflicto arrase las tierras de los pequeños.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#skt",cover_source:"https://5e.tools/img/covers/SKT.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"ToA",title:"La tumba de la aniquilación",original_title:"Tomb of Annihilation",origin:"oficial",format:"Campaña larga",level:"Niveles 1–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/ToA.webp",description:`Una maldición impide devolver a los muertos a la vida y consume a quienes ya regresaron. La búsqueda de respuestas conduce a las selvas de Chult y a sus ruinas olvidadas.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#toa",cover_source:"https://5e.tools/img/covers/ToA.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"WDH",title:"Waterdeep: El golpe de los dragones",original_title:"Waterdeep: Dragon Heist",origin:"oficial",format:"Campaña corta",level:"Niveles 1–5",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/WDH.webp",description:`Un trabajo en Waterdeep os introduce en una carrera por un tesoro desaparecido. Investigaciones, contactos y facciones rivales importan tanto como saber usar una espada.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#wdh",cover_source:"https://5e.tools/img/covers/WDH.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"WDMM",title:"Waterdeep: La mazmorra del mago loco",original_title:"Waterdeep: Dungeon of the Mad Mage",origin:"oficial",format:"Campaña larga",level:"Niveles 5–20",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/WDMM.webp",description:`Bajo Waterdeep se extiende Bajomontaña, un laberinto de niveles dominado por un mago imprevisible. Explorad sus dominios, negociad con sus habitantes y afrontad desafíos cada vez mayores.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#wdmm",cover_source:"https://5e.tools/img/covers/WDMM.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"DIP",title:"El dragón del Pico Agujahelada",original_title:"Essentials Kit: Dragon of Icespire Peak",origin:"oficial",format:"Campaña corta",level:"Niveles 1–6",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/DIP.webp",description:`La llegada de un dragón blanco altera la vida alrededor de Phandalin. Elegid encargos, ayudad a sus habitantes y preparaos para afrontar una amenaza que domina las montañas.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#dip",cover_source:"https://5e.tools/img/covers/DIP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"SLW",title:"La ira del Señor de las Tormentas",original_title:"Essentials Kit: Storm Lord's Wrath",origin:"oficial",format:"Campaña corta",level:"Niveles 7–9",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/SLW.webp",description:`La reconstrucción de Leilon necesita protección. Explorad sus alrededores y enfrentaos a fuerzas que amenazan con convertir la costa en un nuevo campo de batalla.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#slw",cover_source:"https://5e.tools/img/covers/SLW.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"SDW",title:"El despertar del dragón durmiente",original_title:"Essentials Kit: Sleeping Dragon's Wake",origin:"oficial",format:"Campaña corta",level:"Niveles 9–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/SDW.webp",description:`Las amenazas sobre Leilon conducen a nuevos encuentros con dragones y poderes de la costa. Continuación de La ira del Señor de las Tormentas.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#sdw",cover_source:"https://5e.tools/img/covers/SDW.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"DC",title:"Contienda divina",original_title:"Essentials Kit: Divine Contention",origin:"oficial",format:"Campaña corta",level:"Niveles 11–12",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/DC.webp",description:`Leilon se convierte en el centro de un enfrentamiento entre fuerzas religiosas enemigas. Defended a la comunidad y resolved los conflictos que culminan la trilogía de Leilon.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#dc",cover_source:"https://5e.tools/img/covers/DC.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"BGDIA",title:"Baldur’s Gate: Descenso al Averno",original_title:"Baldur's Gate: Descent Into Avernus",origin:"oficial",format:"Campaña larga",level:"Niveles 1–13",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/BGDIA.webp",description:`Una crisis en la Costa de la Espada conduce a los Nueve Infiernos. Pactos peligrosos, decisiones morales y viajes por un paisaje infernal marcarán la búsqueda de una ciudad perdida.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#bgdia",cover_source:"https://5e.tools/img/covers/BGDIA.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"IDRotF",title:"Icewind Dale: Escarcha de la Doncella de Hielo",original_title:"Icewind Dale: Rime of the Frostmaiden",origin:"oficial",format:"Campaña larga",level:"Niveles 1–12",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/IDRotF.webp",description:`Diez Ciudades sobrevive bajo un invierno interminable. Investigad sus problemas y las fuerzas que se ocultan en el hielo, en una campaña de aislamiento, misterio y supervivencia.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#idrotf",cover_source:"https://5e.tools/img/covers/IDRotF.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"WBtW",title:"El Feywild más allá de Brujaluz",original_title:"The Wild Beyond the Witchlight",origin:"oficial",format:"Campaña larga",level:"Niveles 1–8",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/WBtW.webp",description:`Un carnaval ambulante abre el camino a un dominio feérico en dificultades. Pactos, acertijos y criaturas caprichosas permiten resolver muchos conflictos mediante el ingenio y la conversación.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#wbtw",cover_source:"https://5e.tools/img/covers/WBtW.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"CRCotN",title:"Critical Role: La llamada de las profundidades",original_title:"Critical Role: Call of the Netherdeep",origin:"oficial",format:"Campaña larga",level:"Niveles 3–12",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/CRCotN.webp",description:`Un hallazgo durante un festival os arrastra hacia los misterios de un héroe olvidado. Explorad Exandria mientras otro grupo de aventureros sigue un camino que puede cruzarse con el vuestro.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#crcotn",cover_source:"https://5e.tools/img/covers/CRCotN.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"DoSI",title:"Los dragones de la Isla de las Tempestades",original_title:"Dragons of Stormwreck Isle",origin:"oficial",format:"Campaña corta",level:"Niveles 1–3",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/DoSI.webp",description:`En una isla marcada por antiguos conflictos dracónicos, una comunidad busca la paz. Investigad sus peligros y descubrid cómo el pasado sigue afectando a sus habitantes.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#dosi",cover_source:"https://5e.tools/img/covers/DoSI.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"LoX",title:"La luz de Xaryxis",original_title:"Light of Xaryxis",origin:"oficial",format:"Campaña corta",level:"Niveles 5–8",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/LoX.webp",description:`Una amenaza llegada del cielo obliga a abandonar vuestro mundo. Embarcad en una aventura de fantasía espacial con navíos, aliados insólitos y viajes por el espacio salvaje.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#lox",cover_source:"https://5e.tools/img/covers/LoX.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"DSotDQ",title:"Dragonlance: La sombra de la Reina Dragón",original_title:"Dragonlance: Shadow of the Dragon Queen",origin:"oficial",format:"Campaña larga",level:"Niveles 1–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/DSotDQ.webp",description:`La guerra llega a Krynn y transforma la vida de una comunidad de Solamnia. Combatid junto a sus defensores en una historia de resistencia frente a los ejércitos de la Reina Dragón.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#dsotdq",cover_source:"https://5e.tools/img/covers/DSotDQ.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"PaBTSO",title:"Phandelver y las profundidades: El obelisco fragmentado",original_title:"Phandelver and Below: The Shattered Obelisk",origin:"oficial",format:"Campaña larga",level:"Niveles 1–12",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/PaBTSO.webp",description:`Las primeras aventuras alrededor de Phandalin dan paso a una amenaza mucho más extraña. Investigad los cambios que afectan a la región y seguid sus pistas hacia las profundidades.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#pabtso",cover_source:"https://5e.tools/img/covers/PaBTSO.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"ToFW",title:"Planescape: El giro de la rueda de la fortuna",original_title:"Turn of Fortune's Wheel",origin:"oficial",format:"Campaña larga",level:"Niveles 3–10; tramo final a nivel 17",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/ToFW.webp",description:`Despertáis en Sigil con recuerdos incompletos. Un viaje por las Tierras Exteriores os llevará a cuestionar vuestra identidad y el lugar que ocupáis en el multiverso.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#tofw",cover_source:"https://5e.tools/img/covers/ToFW.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"VEoR",title:"Vecna: La víspera de la ruina",original_title:"Vecna: Eve of Ruin",origin:"oficial",format:"Campaña larga",level:"Niveles 10–20",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/VEoR.webp",description:`Una amenaza contra el multiverso reúne a héroes de gran poder. Viajes entre escenarios de D&D, aliados célebres y desafíos de alto nivel dan forma a una misión de alcance extraordinario.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#veor",cover_source:"https://5e.tools/img/covers/VEoR.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"CoA",title:"Las cadenas de Asmodeo",original_title:"Chains of Asmodeus",origin:"oficial",format:"Campaña larga",level:"Niveles 11–20",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/CoA.webp",description:`Descended por los Nueve Infiernos en busca de almas atrapadas. La negociación, la tentación y los enemigos de alto poder acompañan un viaje por los dominios infernales.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#coa",cover_source:"https://5e.tools/img/covers/CoA.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"GoS",title:"Los fantasmas de Saltmarsh",original_title:"Ghosts of Saltmarsh",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–12",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/GoS.webp",description:`Una población costera sirve de punto de partida para misterios, contrabando y expediciones marítimas. Recopilatorio: las aventuras pueden jugarse por separado o enlazarse con preparación del máster.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#gos",cover_source:"https://5e.tools/img/covers/GoS.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"CM",title:"Misterios de Candlekeep",original_title:"Candlekeep Mysteries",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–16",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/CM.webp",description:`Los libros de una gran biblioteca abren la puerta a investigaciones y sucesos insólitos. Recopilatorio de misterios independientes; se escogerá uno adecuado al nivel del grupo.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#cm",cover_source:"https://5e.tools/img/covers/CM.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"JttRC",title:"Viajes por la Ciudadela Radiante",original_title:"Journeys through the Radiant Citadel",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–14",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/JttRC.webp",description:`Una ciudadela del Plano Etéreo conecta comunidades con historias y conflictos propios. Recopilatorio de aventuras independientes con investigación, exploración y encuentros sociales.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#jttrc",cover_source:"https://5e.tools/img/covers/JttRC.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"KftGV",title:"Llaves de la Cámara Dorada",original_title:"Keys from the Golden Vault",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/KftGV.webp",description:`Una organización clandestina propone golpes que requieren información y planificación. Recopilatorio de misiones independientes donde infiltrarse y coordinarse puede ser mejor que combatir.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#kftgv",cover_source:"https://5e.tools/img/covers/KftGV.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"QftIS",title:"Misiones de la Escalera Infinita",original_title:"Quests from the Infinite Staircase",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–13",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/QftIS.webp",description:`Una escalera entre mundos conduce a seis aventuras clásicas adaptadas a quinta edición. Se puede elegir una expedición o acordar una secuencia de viajes.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#qftis",cover_source:"https://5e.tools/img/covers/QftIS.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"HoL",title:"Ravenloft: La casa de los lamentos",original_title:"Ravenloft: The House of Lament",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–3",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/VRGR.webp",description:`Una casa aislada conserva ecos de una tragedia. Investigad sus estancias y las presencias que las habitan en una aventura de terror sobrenatural.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#hol",cover_source:"https://5e.tools/img/covers/VRGR.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"VNotEE",title:"Vecna: El nido del Ojo Arcano",original_title:"Vecna: Nest of the Eldritch Eye",origin:"oficial",format:"Partida única",level:"Nivel 3",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/VNotEE.webp",description:`Una misión en Neverwinter conduce a una investigación subterránea vinculada a un culto. Aventura breve que puede servir como introducción temática a una campaña sobre Vecna.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#vnotee",cover_source:"https://5e.tools/img/covers/VNotEE.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-TSC",title:"La Ciudadela Sin Sol",original_title:"Tales from the Yawning Portal: The Sunless Citadel",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–3",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Una fortaleza hundida y una extraña fruta atraen a los aventureros. Explorad sus galerías y descubrid qué ocurre bajo las ruinas.

Experiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",published:!1,source:"https://5e.tools/adventure.html#tftyp-tsc",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-TFoF",title:"La Forja de la Furia",original_title:"Tales from the Yawning Portal: The Forge of Fury",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 3–5",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Una antigua fortaleza enana promete secretos y tesoros. Sus salones abandonados albergan nuevos ocupantes y peligros en varios niveles.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#tftyp-tfof",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-THSoT",title:"El santuario oculto de Tamoachan",original_title:"Tales from the Yawning Portal: The Hidden Shrine of Tamoachan",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 5–8",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Un santuario enterrado encierra trampas y vestigios de una civilización antigua. La exploración cuidadosa será esencial para encontrar una salida.

Experiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Conviene conocer las reglas básicas y manejar una ficha de personaje.",published:!1,source:"https://5e.tools/adventure.html#tftyp-thsot",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-WPM",title:"La Montaña del Penacho Blanco",original_title:"Tales from the Yawning Portal: White Plume Mountain",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 8–9",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`La recuperación de armas legendarias conduce a una montaña llena de desafíos. Una mazmorra de pruebas, trampas y soluciones ingeniosas.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#tftyp-wpm",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-DiT",title:"Muerte en Thay",original_title:"Tales from the Yawning Portal: Dead in Thay",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 9–11",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Una incursión contra los Magos Rojos lleva al grupo a una extensa mazmorra. Coordinación y gestión de recursos serán claves para avanzar.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#tftyp-dit",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-AtG",title:"Contra los gigantes",original_title:"Tales from the Yawning Portal: Against the Giants",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 11–14",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Asentamientos amenazados necesitan una respuesta frente a los gigantes. Una sucesión de incursiones conduce a fortalezas cada vez más peligrosas.

Experiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",published:!1,source:"https://5e.tools/adventure.html#tftyp-atg",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"TftYP-ToH",title:"La tumba de los horrores",original_title:"Tales from the Yawning Portal: Tomb of Horrors",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 10–14",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/TftYP.webp",description:`Una tumba legendaria pone a prueba la atención y la prudencia del grupo. Sus trampas y acertijos hacen de cada decisión un riesgo.

Experiencia recomendada: Recomendada para jugadores con experiencia que disfruten de trampas difíciles y exploración exigente.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Recomendada para jugadores con experiencia que disfruten de trampas difíciles y exploración exigente.",published:!1,source:"https://5e.tools/adventure.html#tftyp-toh",cover_source:"https://5e.tools/img/covers/TftYP.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."},{catalog_id:"DrDe",title:"Guaridas de dragones",original_title:"Dragon Delves",origin:"oficial",format:"Aventura de varias sesiones",level:"Niveles 1–12, según la aventura elegida",hours:"consultar",hourly_rate:null,language:"es",cover:"images/campanas/DrDe.webp",description:`Diez aventuras independientes centradas en dragones y sus guaridas. Se elegirá una historia adecuada al nivel y la experiencia del grupo.

Experiencia recomendada: variable según la aventura; hay opciones para comenzar a jugar.

Partida dirigida en español. Duración orientativa; el ritmo depende del grupo.`,experience:"Variable según la aventura; hay opciones para comenzar a jugar.",published:!1,source:"https://5e.tools/adventures.html",cover_source:"https://5e.tools/img/covers/DrDe.webp",level_note:"Rango del índice del libro; no implica elegir libremente el nivel inicial."}];function k(e){const a=String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return["partida unica","one-shot","oneshot","one shot","una sola sesion","1 sola sesion"].includes(a)}function O(e={}){R(`
    <p class="eyebrow">PARTIDAS POR ENCARGO</p>
    <h2>${e.id?"Editar aventura":"Nueva aventura para dirigir"}</h2>

    <form id="edit-form">
      <div class="form-grid">
        ${w("title","Título",e.title,"text",!0,!0)}

        ${C("origin","Origen",[["mia","Aventura propia"],["oficial","Aventura oficial de Wizards"]],e.origin||"mia")}

        ${C("format","Formato",[["Partida única","Partida única"],["Aventura de varias sesiones","Aventura de varias sesiones"],["Campaña corta","Campaña corta"],["Campaña larga","Campaña larga"]],e.format||"Partida única")}

        ${w("level","Nivel de los personajes",e.level)}

        ${C("hours","Duración recomendada por sesión",[["2","2 horas"],["2.5","2,5 horas"],["3","3 horas"],["4","4 horas · One-shot"]],k(e.format||"Partida única")?"4":["2","2.5","3","4"].includes(String(e.hours).replace(",","."))?String(e.hours).replace(",","."):"3")}

        <label>
          <span id="commission-rate-label">Tarifa por jugador y sesión · €</span><input
            name="hourly_rate"
            type="number"
            min="0.01"
            max="10000"
            step="0.01"
            value="${s(e.hourly_rate??"")}"
            placeholder="Vacío: a consultar"
          >
        </label>

        ${C("language","Idioma del material",[["es","Español"],["en","Solo en inglés · suplemento a consultar"]],e.language||"es")}

        ${w("cover","URL de portada HTTPS o ruta de uploads",e.cover,"text",!0)}

        ${z("description","Descripción de la partida y condiciones",e.description,6e3)}

        <label class="wide check">
          <input
            name="published"
            type="checkbox"
            ${e.published===!0?"checked":""}
          >
          Disponible para solicitar
        </label>
      </div>

        <p class="small">
          En partidas únicas, el precio es por jugador y sesión: no se multiplica por las horas.
          En campañas y aventuras de varias sesiones, la tarifa es por jugador y hora.
          Para 6 o más jugadores se prepara un presupuesto personalizado.
          Para 1 o 2: mesa compartida o sesión privada.
          Las partidas oficiales se dirigen en español. La tarifa vacía se muestra como «A consultar».
        </p>

      <button class="btn gold" type="submit">Guardar aventura</button>
    </form>
  `);const a=document.querySelector("#edit-form"),o=a.elements.hours,i=a.elements.format,l=String(e.hours??"3").replace(",","."),n=k(e.format||i.value)||l==="4";let r=k(i.value)?"Campaña corta":i.value,t=["2","2.5","3"].includes(l)?l:"3";o.replaceChildren(new Option("2 horas","2"),new Option("2,5 horas","2.5"),new Option("3 horas","3"),new Option("4 horas · One-shot","4")),i.value=n?"Partida única":r,o.value=n?"4":t;function d(){const m=k(i.value);a.querySelector("#commission-rate-label").textContent=m?"Precio único por jugador y sesión · €":"Tarifa por jugador y hora · €"}o.addEventListener("change",()=>{o.value==="4"?(k(i.value)||(r=i.value),i.value="Partida única"):(t=o.value,k(i.value)&&(i.value=r)),d()}),i.addEventListener("change",()=>{k(i.value)?(o.value!=="4"&&(t=o.value),o.value="4"):(r=i.value,o.value==="4"&&(o.value=t)),d()}),d(),B("/api/admin/commissioned-game",e.id,(m,g)=>({...m,format:i.value,hours:o.value,language:g.elements.origin.value==="oficial"?"es":m.language,published:g.elements.published.checked}))}function de(e){const a=p.commissioned_games||[],o=i=>new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(Number(i));e.innerHTML=`
    <div class="panel-head">
      <div>
        <h2>Partidas por encargo</h2>
        <p>Aventuras disponibles para dirigir, sin fecha asignada.</p>
      </div>

      <button type="button" class="btn outline" id="official-catalog">Catálogo de campañas oficiales</button>
      <button type="button" class="btn gold" id="new-commissioned">
        Añadir aventura +
      </button>
    </div>

    <div class="admin-list">
      ${a.length?a.map(i=>`
            <article class="admin-item">
              <div>
                <span class="tag">
                  ${i.published?"DISPONIBLE":"BORRADOR"}
                  · ${i.origin==="oficial"?"OFICIAL":"PROPIA"}
                </span>

                <h3>${s(i.title)}</h3>

                <p>
                  ${s(i.format)}
                  · ${s(i.level||"Nivel a consultar")}
                </p>

                <p>
                  ${i.hourly_rate!=null?`${o(i.hourly_rate)} ${k(i.format)?"por jugador · pago único":"por jugador y hora"}`:"Tarifa a consultar"}
                </p>
              </div>

              <div class="actions">
                <button type="button" class="btn outline"
                  data-commission-edit="${s(i.id)}">
                  Editar
                </button>

                <button type="button" class="btn outline"
                  data-commission-clone="${s(i.id)}">
                  Clonar
                </button>

                <button type="button" class="btn danger"
                  data-commission-delete="${s(i.id)}">
                  Eliminar
                </button>
              </div>
            </article>
          `).join(""):'<p class="admin-empty">Añade tu primera aventura para dirigir.</p>'}
    </div>
  `,c("#official-catalog").onclick=pe,c("#new-commissioned").onclick=()=>O(),e.querySelectorAll("[data-commission-edit]").forEach(i=>{i.onclick=()=>{const l=a.find(n=>n.id===i.dataset.commissionEdit);l&&O(l)}}),e.querySelectorAll("[data-commission-clone]").forEach(i=>{i.onclick=()=>{const l=a.find(r=>r.id===i.dataset.commissionClone);if(!l)return;const n={...l,title:`${l.title} (copia)`,published:!1};delete n.id,O(n)}}),e.querySelectorAll("[data-commission-delete]").forEach(i=>{i.onclick=async()=>{if(confirm("¿Eliminar esta aventura de las partidas por encargo?")){i.disabled=!0;try{await $("/api/admin/commissioned-game/delete",{id:i.dataset.commissionDelete}),await S(),j("Aventura eliminada de las partidas por encargo.")}catch(l){j(l.message,!0)}finally{i.disabled=!1}}}})}let D=!1;function H(){if(!p)return;if(q&&!q.canLeave()){E="agenda";return}document.querySelector(`[data-tab="${CSS.escape(E)}"]`)||(E="products");try{localStorage.setItem(ie,E)}catch{}c("#stats").innerHTML=`<div><b>${p.products.length}</b><span>Publicaciones</span></div><div><b>${p.games.filter(a=>a.status==="open").length}</b><span>Partidas abiertas</span></div><div><b>${p.reservations.filter(a=>a.status==="pending").length}</b><span>Solicitudes pendientes</span></div>`,document.querySelectorAll("[data-tab]").forEach(a=>a.classList.toggle("active",a.dataset.tab===E)),ae();const e=c("#panel");if(E==="agenda"){ee(e);return}if(E==="shipping"){X(e);return}if(E==="commissioned"){de(e);return}if(E==="products")e.innerHTML='<div class="panel-head"><h2>Tu catálogo</h2><button class="btn gold" id="new-product">Añadir publicación +</button></div><div class="admin-list">'+(p.products.map(a=>`<article class="admin-item"><div><span class="tag">${a.published===!1?"BORRADOR":"VISIBLE"} · ${s(a.type)}</span><h3>${s(a.title)}</h3><p>${s(a.price||"Precio por confirmar")}</p></div>
          <div class="actions">
          <button class="btn outline" data-edit="${s(a.id)}">Editar</button>
          <button type="button" class="btn outline" data-clone="${s(a.id)}">Clonar</button>
          <button class="btn danger" data-delete="${s(a.id)}">Eliminar</button>
          </div>
          </article>`).join("")||'<p class="admin-empty">Todavía no hay publicaciones.</p>')+"</div>",c("#new-product").onclick=()=>W(),e.querySelectorAll("[data-edit]").forEach(a=>a.onclick=()=>W(p.products.find(o=>o.id===a.dataset.edit))),e.querySelectorAll("[data-clone]").forEach(a=>{a.onclick=()=>{const o=p.products.find(l=>l.id===a.dataset.clone);if(!o)return;const i={...o,title:`${o.title} (copia)`,published:!1};delete i.id,W(i)}}),e.querySelectorAll("[data-delete]").forEach(a=>a.onclick=async()=>{if(confirm("¿Eliminar esta publicación del catálogo?"))try{await $("/api/admin/product/delete",{id:a.dataset.delete}),await S(),j("Publicación eliminada.")}catch(o){j(o.message,!0)}});else if(E==="games")e.innerHTML='<div class="panel-head"><h2>Partidas y plazas</h2><button class="btn gold" id="new-game">Crear partida +</button></div><div class="admin-list">'+(p.games.map(a=>`<article class="admin-item"><div><span class="tag">${Y[a.status]}</span><h3>${s(a.title)}</h3><p>${s(new Date(a.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid"}))} (Madrid) · ${s(a.mode)}<br>${a.booked}/${a.capacity} plazas confirmadas · ${s(a.price||"Precio por confirmar")}</p></div><button class="btn outline" data-game="${a.id}">Editar partida</button></article>`).join("")||'<p class="admin-empty">Crea tu primera partida para que aparezca en el calendario.</p>')+"</div>",c("#new-game").onclick=()=>Q(),e.querySelectorAll("[data-game]").forEach(a=>a.onclick=()=>Q(p.games.find(o=>o.id===a.dataset.game)));else if(E==="reservations"){const a=n=>n.archived===!0||Number(n.archived)===1,o=p.reservations.filter(a).length,i=p.reservations.length-o,l=p.reservations.filter(n=>a(n)===D);e.innerHTML=`
      <div class="panel-head">
        <h2>${D?"Solicitudes archivadas":"Solicitudes y reservas"}</h2>
        <button type="button" class="btn outline" id="toggle-archived-reservations">
          ${D?`Volver a reservas (${i})`:`Ver archivadas (${o})`}
        </button>
      </div>
      <p>${D?"Se conserva el historial. Puedes restaurar una solicitud para volver a gestionarla.":"Las pendientes no bloquean plazas. Puedes archivar las rechazadas o canceladas."}</p>
      <div class="admin-list">${l.map(n=>`
        <article class="admin-item">
          <div><span class="tag">${s(Y[n.status]||n.status)} · ${n.paid?"Pago comprobado":"Pago no comprobado"}${n.request_type==="commissioned"?" · Partida por encargo":""}${D?" · Archivada":""}</span>
            <h3>${s(n.name)} · ${s(n.players)} plaza(s)</h3>
            <p>${s(n.game_title)}<br>${s(n.contact)}</p>
          </div>
          <div class="actions">
            ${D?`<button type="button" class="btn outline" data-request-type="${s(n.request_type||"session")}" data-archive-reservation="${s(n.id)}" data-archived="false">Restaurar solicitud</button>`:`
              <button type="button" class="btn outline" data-reservation="${s(n.id)}">Gestionar</button>
              <button type="button" class="btn danger" data-reject-reservation="${s(n.id)}">${n.status==="rejected"?"Ver rechazo":"Rechazar solicitud"}</button>
              ${["rejected","cancelled"].includes(n.status)?`<button type="button" class="btn outline" data-request-type="${s(n.request_type||"session")}" data-archive-reservation="${s(n.id)}" data-archived="true">Archivar solicitud</button>`:""}
            `}
          </div>
        </article>`).join("")||`<p class="admin-empty">${D?"No hay solicitudes archivadas.":"No hay solicitudes en la lista principal."}</p>`}
      </div>`,c("#toggle-archived-reservations").onclick=()=>{D=!D,H()},e.querySelectorAll("[data-archive-reservation]").forEach(n=>{n.onclick=async()=>{n.disabled=!0;try{const r=await $(n.dataset.requestType==="commissioned"?"/api/admin/game-request":"/api/admin/reservation/archive",{id:n.dataset.archiveReservation,archived:n.dataset.archived==="true"});await S(),j(r.message)}catch(r){j(r.message,!0)}finally{n.disabled=!1}}}),e.querySelectorAll("[data-reject-reservation]").forEach(n=>{n.onclick=()=>{const r=p.reservations.find(t=>String(t.id)===n.dataset.rejectReservation);r&&J(r,!0)}}),e.querySelectorAll("[data-reservation]").forEach(n=>{n.onclick=()=>{const r=p.reservations.find(t=>String(t.id)===n.dataset.reservation);r&&J(r)}})}else e.innerHTML='<div class="panel-head"><h2>Contacto y pagos manuales</h2></div><form id="settings-form" class="settings-form">'+w("whatsapp","WhatsApp: prefijo de país y número, sin + ni espacios",p.config.whatsapp)+w("paypal","Enlace de PayPal",p.config.paypal,"url")+w("email","Correo de contacto",p.config.email,"email")+z("delivery","Información de entrega",p.config.delivery,1e3)+'<h3>Muestras de aventuras · Heyzine</h3><p>Publica en Heyzine únicamente las páginas que quieras mostrar. El título aparece en el desplegable de la web.</p><div id="preview-rows"></div><button type="button" class="btn outline" id="add-preview">Añadir muestra +</button><p class="small">No se conecta con tu cuenta de PayPal ni se comprueban pagos automáticamente. No introduzcas contraseñas ni claves privadas.</p><button class="btn gold">Guardar configuración</button></form>',ue(),c("#settings-form").onsubmit=async a=>{a.preventDefault();try{const o=Object.fromEntries(new FormData(a.target));o.previews=Array.from(document.querySelectorAll(".preview-row")).map(i=>({title:i.querySelector("[data-preview-title]").value,url:i.querySelector("[data-preview-url]").value})),await $("/api/admin/config",o),await S(),j("Configuración actualizada.")}catch(o){j(o.message,!0)}}}c("#login-form").onsubmit=async e=>{e.preventDefault();const a=e.target.querySelector("button");a.disabled=!0;try{await $("/api/login",Object.fromEntries(new FormData(e.target))),e.target.reset(),c("#alert").textContent="",await S()}catch(o){j(o.message,!0)}finally{a.disabled=!1}};c("#logout").onclick=async()=>{try{await $("/api/logout",{}),p=null,c("#dashboard").hidden=!0,c("#login").hidden=!1,c("#logout").hidden=!0,j("Sesión cerrada.")}catch(e){j(e.message,!0)}};c("#refresh").onclick=S;if(!document.querySelector('[data-tab="commissioned"]')){const e=document.querySelector('[data-tab="games"]');if(e){const a=document.createElement("button");a.type="button",a.dataset.tab="commissioned",a.textContent="Partidas por encargo",e.after(a)}}document.querySelectorAll("[data-tab]").forEach(e=>e.onclick=()=>{E=e.dataset.tab,H()});S();function ue(){const e=c("#preview-rows");function a(o={title:"",url:""}){if(e.children.length>=50)return;const i=document.createElement("fieldset");i.className="preview-row",i.innerHTML='<legend>Muestra de aventura</legend><label>Título de la muestra<input data-preview-title maxlength="160" required></label><label>Enlace de Heyzine<input data-preview-url type="url" maxlength="300" placeholder="https://heyzine.com/flip-book/identificador.html" required></label><button type="button" class="btn danger">Quitar muestra</button>',i.querySelector("[data-preview-title]").value=o.title,i.querySelector("[data-preview-url]").value=o.url,i.querySelector("button").onclick=()=>i.remove(),e.append(i)}(p.config.previews||[]).forEach(a),c("#add-preview").onclick=()=>a()}function pe(){R(`<p class="eyebrow">CATÁLOGO OFICIAL · PARTIDAS EN ESPAÑOL</p>
    <h2>Elige qué campañas ofrecer</h2>
    <p>Las fichas de esta biblioteca no son públicas. Abre una, revisa el contenido y guarda como borrador o marca «Disponible para solicitar».</p>
    <p>La duración y la experiencia recomendada son orientaciones editables. Los recopilatorios requieren acordar una aventura concreta.</p>
    <label>Buscar campaña<input type="search" id="official-search" placeholder="Título en español o inglés"></label>
    <div id="official-results" style="display:grid;gap:16px;margin-top:20px"></div>`);const e=c("#official-results"),a=()=>{const o=c("#official-search").value.trim().toLocaleLowerCase("es"),i=K.filter(l=>`${l.title} ${l.original_title}`.toLocaleLowerCase("es").includes(o));e.innerHTML=i.map(l=>{const n=(p.commissioned_games||[]).find(r=>r.origin==="oficial"&&[l.title,l.original_title].includes(r.title));return`<article style="display:flex;gap:18px;align-items:flex-start;border:1px solid #cdbfa8;padding:16px;border-radius:8px">
        <img src="${s(l.cover)}" alt="Portada de ${s(l.original_title)}" loading="lazy" style="width:90px;height:125px;object-fit:contain">
        <div style="min-width:0"><h3>${s(l.title)}</h3><p>${s(l.original_title)}</p>
        <p>${s(l.level)} · ${s(l.format)}</p>
        <p style="white-space:pre-line">${s(l.description)}</p>
        <p>${n?n.published?"Disponible para solicitar":"Guardada como borrador":"Sin activar · precio a consultar"}</p>
        <button type="button" class="btn gold" data-official-template="${s(l.catalog_id)}">${n?"Editar ficha guardada":"Preparar ficha"}</button></div>
      </article>`}).join("")||"<p>No hay coincidencias.</p>",e.querySelectorAll("[data-official-template]").forEach(l=>{l.onclick=()=>{const n=K.find(t=>t.catalog_id===l.dataset.officialTemplate),r=(p.commissioned_games||[]).find(t=>t.origin==="oficial"&&[n.title,n.original_title].includes(t.title));A.close(),O(r||{...n,hourly_rate:"",published:!1})}})};c("#official-search").addEventListener("input",a),a()}function me(e,a=!1){const o=e.data||{},i={kind:"Origen",adventure:"Aventura",idea:"Idea de partida",format:"Formato",group:"Grupo",experience:"Experiencia",level:"Nivel",mode:"Modalidad",location:"Lugar",frequency:"Frecuencia",availability:"Otras fechas",notes:"Comentarios",smallGroup:"Grupo pequeño",price_estimate:"Presupuesto orientativo al solicitar"};R(`<p class="eyebrow">PARTIDA POR ENCARGO</p>
<p>
  ${s(e.name)} · ${s(e.title)} ·
  ${s(new Date(e.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid",dateStyle:"short",timeStyle:"short"}))} (Madrid)
</p><h2>${s(e.name)}</h2><p>${s(e.title)} · ${s(new Date(e.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid"}))} (Madrid) · ${s(e.duration)}</p><p>${s(e.players)} jugadores · ${s(e.contact)}</p><dl>${Object.entries(i).filter(([r])=>o[r]).map(([r,t])=>`<dt><strong>${t}</strong></dt><dd style="white-space:pre-wrap;overflow-wrap:anywhere">${s(o[r])}</dd>`).join("")}</dl>
 <form id="request-manage-form">${C("status","Estado",[["pending","Pendiente"],["confirmed","Confirmada"],["rejected","Rechazada"],["cancelled","Cancelada"]],a?"rejected":e.status)}<label class="check"><input type="checkbox" name="paid" ${e.paid?"checked":""}>Pago comprobado manualmente</label><label class="check" id="request-short" hidden><input type="checkbox" name="accept_short_notice">He acordado con el grupo confirmar con menos de 24 horas.</label><label id="request-reason">Mensaje para el usuario<textarea name="rejection_reason" maxlength="2000" rows="4" ${e.status==="rejected"?"readonly":""}>${s(e.rejection_reason||"")}</textarea></label><p class="small">Al confirmar se comprueba que el horario completo siga libre y se ocupa la primera sesión. La frecuencia es orientativa: las siguientes sesiones se acuerdan aparte. El mensaje de rechazo aparece en Mis partidas si tiene cuenta y se intenta enviar por correo con la configuración SMTP existente.</p><button type="submit" class="btn gold">Guardar solicitud</button></form>`);const l=c("#request-manage-form"),n=()=>{const r=l.elements.status.value==="rejected";c("#request-reason").hidden=!r,l.elements.rejection_reason.required=r;const t=l.elements.status.value==="confirmed"&&e.status!=="confirmed"&&new Date(e.starts).getTime()-Date.now()<864e5;c("#request-short").hidden=!t,l.elements.accept_short_notice.required=t};l.elements.status.onchange=n,n(),l.onsubmit=async r=>{if(r.preventDefault(),!l.reportValidity())return;const t=l.querySelector("[type=submit]");t.disabled=!0;try{const d=await $("/api/admin/game-request",{id:e.id,status:l.elements.status.value,paid:l.elements.paid.checked,rejection_reason:l.elements.rejection_reason.value.trim(),accept_short_notice:l.elements.accept_short_notice.checked});A.close(),await S(),j(d.message)}catch(d){c("#editor-error").textContent=d.message}finally{t.disabled=!1}}}function ne(e){E=e,H()}const he=Object.freeze(Object.defineProperty({__proto__:null,api:$,esc:s,notify:j,refresh:S,selectAdminTab:ne,get state(){return p}},Symbol.toStringTag,{value:"Module"}));export{be as a,he as b,ve as e,j as n,S as r,p as s};
