import{agendaClient as R}from"./agenda-cliente-CI1OWnFS.js";import{initializePricing as te}from"./precios-partidas-bVwPSyAH.js";import{s as X,k as ae}from"./main-CLiHRCN8.js";import"./account-h-QSJpDN.js";(()=>{var G;const O=document.querySelectorAll("[data-request-game]");if(!O.length)return;const n=document.createElement("dialog");n.id="request-game-dialog",n.setAttribute("aria-labelledby","request-title"),n.innerHTML=`
  <button type="button" class="close" aria-label="Cerrar ventana">×</button>
  <p class="request-progress" id="request-progress"></p>
  <h2 id="request-title">Solicita tu partida</h2>

  <p class="request-note">
    Cuéntame qué os gustaría jugar. Revisaremos disponibilidad,
    precio y condiciones antes de confirmar.
  </p>

  <form id="request-game-form">
    <div data-step="0">
      <h3>¿Qué aventura quieres vivir?</h3>

      <div class="request-grid">
        <label class="wide">
          Tipo de aventura
          <select name="kind" required>
            <option value="" selected disabled>Seleccione...</option>
            <option value="mia">Una aventura de La Mazmorra del Roleo</option>
            <option value="oficial">Una campaña oficial</option>
            <option value="personalizada">Una aventura personalizada</option>
          </select>
        </label>

        <label class="wide" id="request-adventure-label" hidden>
          Elige una publicación
            <select name="adventure" required>
                <option value="" selected disabled>Seleccione...</option>
            </select>
        </label>

        <label class="wide" id="request-idea-label" hidden>
          <span id="request-idea-title">¿Qué tienes en mente?</span>
          <textarea
            name="idea"
            maxlength="600"
            required
            placeholder="Cuéntame la ambientación, el tono y el tipo de historia que os apetece jugar. Si aún no lo sabéis, puedo orientaros."
          ></textarea>
        </label>

        <label>
          Formato
          <select name="format" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Partida única</option>
            <option>Aventura de varias sesiones</option>
            <option>Campaña</option>
            <option>Necesito orientación</option>
          </select>
        </label>

        <label>
          Duración por sesión
          <select name="duration" required>
            <option value="" selected disabled>Seleccione...</option>
            <option value="2">2 horas</option>
            <option value="2.5">2,5 horas</option>
            <option value="3">3 horas</option>
          </select>
        </label>
      </div>
    </div>

    <div data-step="1" hidden>
      <h3>Háblame de vuestro grupo</h3>

      <div class="request-grid">
        <label>
          Tu nombre
          <input name="name" autocomplete="name" maxlength="80" required>
        </label>
        <label>Correo o teléfono de contacto
          <input name="contact" autocomplete="email" maxlength="200" required>
        </label>

        <label>
          Situación del grupo
          <select name="group" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Tenemos un grupo formado</option>
            <option>Soy un jugador y busco mesa</option>
          </select>
        </label>

        <label>
          Número de jugadores
          <input name="players" type="number" min="1" max="30" required>
        </label>

        <label>
          Experiencia
          <select name="experience" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Es nuestra primera partida</option>
            <option>Tenemos algo de experiencia</option>
            <option>Somos jugadores habituales</option>
            <option>Grupo con experiencia variada</option>
          </select>
        </label>

        <label>
          Nivel de los personajes
          <select name="level" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Necesito orientación</option>
            <option>Niveles 1–3</option>
            <option>Niveles 4–6</option>
            <option>Niveles 7–10</option>
            <option>Nivel 11 o superior</option>
          </select>
        </label>

        <label>
          Modalidad
          <select name="mode" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Online</option>
            <option>Presencial</option>
          </select>
        </label>

        <label class="wide" id="request-location-label" hidden>
          Localidad
          <input name="location" maxlength="120">
        </label>
      </div>
    </div>

    <div data-step="2" hidden>
      <h3>¿Cuándo os viene bien?</h3>

      <p class="request-note">
        Selecciona la fecha de la primera sesión.
        Todas las horas corresponden al horario de Madrid.
      </p>

      <div class="request-grid">
        <label>
          Fecha de la primera sesión
          <input name="date1" type="date" required>
        </label>

        <label>
          Hora de inicio
          <input name="time1" type="time" step="300" required>
        </label>

        <label class="wide">
          Frecuencia
          <select name="frequency" required>
            <option value="" selected disabled>Seleccione...</option>
            <option>Una sola vez</option>
            <option>Semanal</option>
            <option>Quincenal</option>
            <option>Mensual</option>
            <option>A convenir</option>
          </select>
        </label>

        <label class="wide">
          Si no podemos jugar en esa fecha y hora,
          ¿qué otras disponibilidades tenéis? · opcional
          <textarea
            name="availability"
            maxlength="350"
            placeholder="Ej.: también podemos los viernes desde las 18:00."
          ></textarea>
        </label>

        <label class="wide">
          Comentarios o temas que preferís evitar · opcional
          <textarea name="notes" maxlength="600"></textarea>
        </label>
      </div>
    </div>

    <div data-step="3" hidden>
      <h3>Revisa tu propuesta</h3>
      <div id="request-summary" class="request-summary"></div>

      <p class="request-note">
        Se abrirá WhatsApp con el mensaje preparado. Tendrás que
        enviarlo allí. Esta propuesta todavía no reserva una fecha.
      </p>
    </div>

    <p id="request-error" role="alert"></p>

    <div class="request-actions">
      <button type="button" class="btn outline" id="request-back">
        ← Anterior
      </button>
      <button type="submit" class="btn gold" id="request-next">
        Continuar →
      </button>
    </div>
  </form>
`,document.body.append(n);const c=n.querySelector("form"),t=c.elements;c.querySelectorAll("select").forEach(e=>{let a=e.querySelector('option[value=""]');a||(a=new Option("Seleccione...",""),a.disabled=!0,e.prepend(a)),e.required=!0,e.value=""});const B=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Madrid",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),M=e=>B.find(a=>a.type===e).value;t.date1.min=`${M("year")}-${M("month")}-${M("day")}`,t.time1.step="300",t.time1.addEventListener("input",()=>{t.time1.setCustomValidity("")});const y=n.querySelector("#request-error");let u=0;const L=(((G=X)==null?void 0:G.commissioned_games)||[]).filter(e=>["mia","oficial"].includes(e.origin)&&e.published===!0);function F(){const e=t.adventure.value,a=L.filter(o=>o.origin===t.kind.value),i=new Option(a.length?"Seleccione...":"No hay aventuras disponibles","");i.disabled=!0,i.selected=!0,t.adventure.replaceChildren(i),a.forEach(o=>t.adventure.add(new Option(o.title,o.title))),a.some(o=>o.title===e)&&(t.adventure.value=e)}t.kind.addEventListener("change",F),F();const g=document.createElement("article");g.className="request-adventure-card",g.hidden=!0,n.querySelector("#request-adventure-label").after(g);function z(){const e=L.find(s=>s.origin===t.kind.value&&s.title===t.adventure.value);if(g.replaceChildren(),g.hidden=!e,!e)return;if(e.cover){const s=document.createElement("img");try{const v=new URL(e.cover,location.href);["http:","https:"].includes(v.protocol)&&(s.src=v.href,s.alt=`Portada de ${e.title}`,s.addEventListener("error",()=>{s.hidden=!0}),g.append(s))}catch{}}const a=document.createElement("div"),i=document.createElement("h4");i.textContent=e.title;const o=document.createElement("p");o.textContent=`${e.format} · ${e.level} · En español`;const r=document.createElement("p");r.textContent=e.description||"";const p=document.createElement("div");p.className="request-adventure-heading";const l=document.createElement("span");l.className="request-adventure-price";const b=String(e.format||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim(),d=["partida unica","one-shot","oneshot","one shot","una sola sesion","1 sola sesion"].includes(b),m=e.hourly_rate==null||e.hourly_rate===""?NaN:Number(String(e.hourly_rate).replace(",","."));if(Number.isFinite(m)&&m>0){const s=new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(m);l.textContent=d?`${s} por jugador · pago único`:`${s}/h por jugador`}else l.textContent="A consultar";p.append(i,l),a.append(p,o,r),g.append(a)}t.kind.addEventListener("change",z),t.adventure.addEventListener("change",z);const J=Array.from(t.level.options).map(e=>({texto:e.textContent,valor:e.value,disabled:e.disabled}));let q=!1,V="";const Y=Array.from(t.format.options).map(e=>({texto:e.textContent,valor:e.value,disabled:e.disabled}));let E=!1,I="";function P(){const e=["mia","oficial"].includes(t.kind.value),a=!t.kind.value||e,i=L.find(r=>r.origin===t.kind.value&&r.title===t.adventure.value),o=e?String((i==null?void 0:i.format)||"").trim():"";if(a){E||(I=t.format.value);const r=new Option(o||"Seleccione...",o,!0,!0);r.disabled=!o,t.format.replaceChildren(r),E=!0,t.format.classList.add("campo-bloqueado"),t.format.setAttribute("aria-readonly","true"),t.format.title=o?"Este formato está establecido por la aventura":"Selecciona una publicación para cargar su formato"}else E&&(t.format.replaceChildren(...Y.map(r=>{const p=new Option(r.texto,r.valor);return p.disabled=r.disabled,p})),t.format.value=I,E=!1,t.format.classList.remove("campo-bloqueado"),t.format.removeAttribute("aria-readonly"),t.format.removeAttribute("title"))}t.adventure.addEventListener("change",P),t.kind.addEventListener("change",P),P(),t.format.addEventListener("pointerdown",e=>{E&&e.preventDefault()}),t.format.addEventListener("keydown",e=>{E&&e.key!=="Tab"&&e.preventDefault()});function U(){const e=L.find(i=>i.origin===t.kind.value&&i.title===t.adventure.value),a=["mia","oficial"].includes(t.kind.value)?String((e==null?void 0:e.level)||"").trim():"";a?(q||(V=t.level.value),t.level.replaceChildren(new Option(a,a,!0,!0)),q=!0,t.level.classList.add("campo-bloqueado"),t.level.setAttribute("aria-readonly","true"),t.level.title="El nivel está establecido por la aventura"):q&&(t.level.replaceChildren(...J.map(i=>{const o=new Option(i.texto,i.valor);return o.disabled=i.disabled,o})),t.level.value=V,q=!1,t.level.classList.remove("campo-bloqueado"),t.level.removeAttribute("aria-readonly"),t.level.removeAttribute("title"))}t.adventure.addEventListener("change",U),t.kind.addEventListener("change",U),t.level.addEventListener("pointerdown",e=>{q&&e.preventDefault()}),t.level.addEventListener("keydown",e=>{q&&e.key!=="Tab"&&e.preventDefault()});function N(){const e=["mia","oficial"].includes(t.kind.value),a=t.kind.value==="personalizada",i=t.mode.value==="Presencial";n.querySelector("#request-adventure-label").hidden=!e,n.querySelector("#request-idea-label").hidden=!a,n.querySelector("#request-location-label").hidden=!i,t.adventure.disabled=!e,t.idea.disabled=!a,t.location.disabled=!i,t.location.required=i,n.querySelector("#request-idea-title").textContent=t.kind.value==="oficial"?"¿Qué campaña oficial quieres jugar?":"¿Qué aventura tienes en mente?"}function Z(){var o;const e=Object.fromEntries(new FormData(c)),a={mia:"Aventura de La Mazmorra del Roleo",oficial:"Campaña oficial",personalizada:"Aventura personalizada"},i=[];if(e.date1){const[r,p,l]=e.date1.split("-");i.push(`${l}/${p}/${r} a las ${e.time1}`)}return["¡Hola, Hugo! Me gustaría solicitar una partida.","",`Nombre: ${e.name.trim()}`,...(o=e.contact)!=null&&o.trim()?[`Contacto: ${e.contact.trim()}`]:[],`Tipo: ${a[e.kind]}`,`Aventura: ${["mia","oficial"].includes(e.kind)?e.adventure:e.idea.trim()||"Busco recomendación"}`,`Formato: ${e.format}`,`Duración por sesión: ${e.duration==="4"?"4 horas aproximadamente":`${String(e.duration).replace(".",",")} horas`}`,"",`Grupo: ${e.group}`,`Jugadores: ${e.players}`,`Experiencia: ${e.experience}`,`Nivel: ${e.level}`,`Modalidad: ${e.mode}${e.location?` · ${e.location.trim()}`:""}`,"","Disponibilidad · horario de Madrid:",...i.map(r=>`• ${r}`),e.availability.trim()?`Disponibilidad alternativa: ${e.availability.trim()}`:"",`Frecuencia: ${e.frequency}`,e.notes.trim()?`Comentarios: ${e.notes.trim()}`:"","",typeof j=="function"?`PRECIO ORIENTATIVO:
${j(e)}`:"PRECIO ORIENTATIVO: pendiente de calcular.","","¿Podrías confirmarme disponibilidad, presupuesto y condiciones?"].filter(r=>r!=="").join(`
`)}function K(){var s,v,f,x,w;const e=Object.fromEntries(new FormData(c)),a=n.querySelector("#request-summary"),i=h=>String(h??"").replace(/[&<>"']/g,k=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[k]),o={mia:"Aventura de La Mazmorra del Roleo",oficial:"Campaña oficial",personalizada:"Aventura personalizada"},r=["mia","oficial"].includes(e.kind)?e.adventure:((s=e.idea)==null?void 0:s.trim())||"Aventura por definir",p=e.date1?e.date1.split("-").reverse().join("/"):"Por acordar",l=e.duration==="4"?"4 horas aproximadamente":`${String(e.duration).replace(".",",")} horas`,b=typeof j=="function"?j(e):"Presupuesto pendiente de calcular.",d=(h,k)=>`
    <div class="review-detail">
      <dt>${i(h)}</dt>
      <dd>${i(k)}</dd>
    </div>
  `,m=b.split(`
`).filter(Boolean);a.innerHTML=`
    <div class="review-heading">
      <span class="review-kicker">TU PRÓXIMA AVENTURA</span>
      <h3>${i(r)}</h3>
      <p>${i(o[e.kind])}</p>

      <div class="review-tags">
        <span>${i(e.format)}</span>
        <span>${i(e.mode)}</span>
        <span>${i(e.players)} jugadores</span>
      </div>
    </div>

    <div class="review-body">
      <section class="review-block">
        <h4>La sesión</h4>
        <dl class="review-grid">
          ${d("Fecha",p)}
          ${d("Hora · Madrid",e.time1)}
          ${d("Duración",l)}
          ${d("Frecuencia",e.frequency)}
        </dl>
      </section>

      <section class="review-block">
        <h4>Vuestro grupo</h4>
        <dl class="review-grid">
          ${d("Contacto",e.name)}
          ${d("Grupo",e.group)}
          ${d("Experiencia",e.experience)}
          ${d("Nivel",e.level)}
          ${e.location?d("Localidad",e.location):""}
        </dl>
      </section>

      ${(v=e.availability)!=null&&v.trim()||(f=e.notes)!=null&&f.trim()?`
            <section class="review-block">
              <h4>Detalles adicionales</h4>
              <dl class="review-grid">
                ${(x=e.availability)!=null&&x.trim()?d("Disponibilidad alternativa",e.availability):""}
                ${(w=e.notes)!=null&&w.trim()?d("Comentarios",e.notes):""}
              </dl>
            </section>
          `:""}

      <section class="review-budget">
        <h4>Presupuesto orientativo</h4>
        ${m.map(h=>`
          <p class="${h.startsWith("TOTAL")?"review-total":"review-price-line"}">${i(h)}</p>
        `).join("")}
      </section>
    </div>
  `}function C(){n.querySelectorAll("[data-step]").forEach(e=>{const a=Number(e.dataset.step)===u;e.hidden=!a,e.querySelectorAll("input, select, textarea").forEach(i=>{i.disabled=!a})}),N(),n.querySelectorAll("[data-step]").forEach(e=>{Number(e.dataset.step)!==u&&e.querySelectorAll("input, select, textarea").forEach(a=>{a.disabled=!0})}),n.querySelector("#request-progress").textContent=u===3?"Revisa tu solicitud":`Paso ${u+1} de 3`,n.querySelector("#request-back").hidden=u===0,n.querySelector("#request-next").textContent=u===3?"Enviar solicitud →":"Continuar →",y.textContent="",u===3&&(H(),K(),Array.from(t).forEach(e=>{e.matches("input, select, textarea")&&(e.disabled=!0)}))}function H(){c.querySelectorAll("input, select, textarea").forEach(e=>{e.disabled=!1}),N()}t.kind.addEventListener("change",N),t.mode.addEventListener("change",N),n.querySelector("#request-back").onclick=()=>{u=Math.max(0,u-1),C()};let $=0,D="",_="";c.onsubmit=async e=>{var o,r,p;const a=++$;if(e.preventDefault(),u<3&&!c.reportValidity())return;if(u===1&&!t.name.value.trim()){y.textContent="Indica tu nombre.",t.name.focus();return}if(u===2){const l=t.date1.value,b=t.time1.value;if(!l||!b){y.textContent="Selecciona una fecha y una hora.";return}if(l<t.date1.min){y.textContent="Selecciona una fecha de hoy en adelante.";return}const[d,m,s=0]=b.split(":").map(Number);if(m%5!==0||s!==0){t.time1.setCustomValidity("Selecciona una hora en intervalos de 5 minutos: 18:00, 18:05, 18:10..."),t.time1.reportValidity();return}t.time1.setCustomValidity("");const v=n.querySelector("#request-next");v.disabled=!0;try{if(await R.check(c),!n.open||a!==$)return}catch(f){y.textContent=f.message;return}finally{v.disabled=!1}}if(u<3){u++,C(),n.scrollTop=0;return}const i=n.querySelector("#request-next");i.disabled=!0;try{if(await R.check(c),!n.open||a!==$)return;H();const l=Object.fromEntries(new FormData(c));l.players=Number(l.players);const b=JSON.stringify(l);(b!==_||!D)&&(_=b,D=[...crypto.getRandomValues(new Uint8Array(16))].map(ee=>ee.toString(16).padStart(2,"0")).join(""));const d=await R.account(),m=await ae("api/game-requests",{method:"POST",headers:{"Content-Type":"application/json","X-Mazmorra-CSRF":d.csrf},data:JSON.stringify({...l,request_token:D})}),s=m.data;if(m.status<200||m.status>=300)throw Error(s.error||"No se pudo guardar la solicitud.");if(!n.open||a!==$)return;const v=Z()+`

Referencia web: `+s.reference,f=document.createElement("section");f.className="request-web-receipt";const x=document.createElement("h3");x.textContent="Solicitud recibida";const w=document.createElement("p"),h=l.kind==="personalizada"?"Partida personalizada":l.adventure,k=l.date1.split("-").reverse().join("/");w.textContent=`${l.name.trim()} · ${h} · ${k} a las ${l.time1} (Madrid).

Revisaremos tu propuesta. La fecha y el precio quedan pendientes de confirmación; las horas todavía no están reservadas.`,+". Revisaremos tu propuesta. La fecha y el precio quedan pendientes de confirmación; las horas todavía no están reservadas.";const W=document.createElement("p");W.textContent=d.user?"También puedes verla en Mis partidas.":"Guarda la referencia. Te responderemos por el contacto que has indicado.";const S=document.createElement("a");S.className="btn gold",S.target="_blank",S.rel="noopener noreferrer",S.textContent="Continuar por WhatsApp ↗",S.href="https://wa.me/"+String(((r=(o=X)==null?void 0:o.config)==null?void 0:r.whatsapp)||"34666530043").replace(/\D/g,"")+"?text="+encodeURIComponent(v);const A=document.createElement("button");A.type="button",A.className="btn outline",A.textContent="Cerrar",A.onclick=()=>n.close(),f.append(x,w,W,S,A),(p=n.querySelector(".request-web-receipt"))==null||p.remove(),c.before(f),c.hidden=!0}catch(l){y.textContent=l.message}finally{i.disabled=!1}},n.querySelector(".close").onclick=()=>n.close();let T=!1;function Q(e){const a=n.getBoundingClientRect();return e.target===n&&(e.clientX<a.left||e.clientX>a.right||e.clientY<a.top||e.clientY>a.bottom)}n.addEventListener("pointerdown",e=>{T=e.button===0&&Q(e)}),n.addEventListener("click",e=>{T&&Q(e)&&n.close(),T=!1}),n.addEventListener("pointercancel",()=>{T=!1}),n.addEventListener("close",()=>{var e;$++,(e=n.querySelector(".request-web-receipt"))==null||e.remove(),c.hidden=!1,c.reset(),u=0,t.kind.dispatchEvent(new Event("change",{bubbles:!0})),t.mode.dispatchEvent(new Event("change",{bubbles:!0})),t.time1.setCustomValidity(""),n.querySelector("#request-summary").replaceChildren(),y.textContent="",C(),n.scrollTop=0}),c.addEventListener("agenda-edit-schedule",()=>{u=2,C(),t.date1.focus()}),R.setupAvailability(c,n);const j=te();O.forEach(e=>{e.addEventListener("click",()=>{var i;if(n.open)return;const a=(i=document.querySelector("#calendar-days"))==null?void 0:i.dataset.selectedDate;/^\d{4}-\d{2}-\d{2}$/.test(a||"")&&a>=t.date1.min&&(t.date1.value=a,t.date1.dispatchEvent(new Event("input",{bubbles:!0})),t.date1.dispatchEvent(new Event("change",{bubbles:!0}))),C(),n.showModal()})})})();
