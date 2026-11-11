import{agendaClient as B}from"./agenda-cliente-CI1OWnFS.js";import{s as X,k as W}from"./main-CLiHRCN8.js";import"./account-h-QSJpDN.js";const n=t=>document.querySelector(t),o=t=>String(t??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]);let S=X||{products:[],games:[],config:{}},N="all";const C=n("#modal"),_=n("#modal-content");function O(t){_.innerHTML=t,C.showModal()}n(".close").onclick=()=>C.close();C.addEventListener("click",t=>{if(t.target===C){const a=C.getBoundingClientRect();(t.clientX<a.left||t.clientX>a.right||t.clientY<a.top||t.clientY>a.bottom)&&C.close()}});function J(t="vuestro contenido"){const a=S.config;O('<p class="eyebrow">HABLEMOS DE TU PRÓXIMA PARTIDA</p><h2>Prepara tu mensaje.</h2><label for="message">Tu consulta</label><textarea id="message"></textarea><div class="actions" id="contact-actions"></div><p id="contact-notice" class="notice"></p><p id="copy-status" role="status"></p>');const i=n("#message");i.value=`Hola, Hugo. Me interesa ${t}.

¿Podrías indicarme disponibilidad, precio y plazo?`;const g=n("#contact-actions");if(a.whatsapp){const p=document.createElement("a");p.className="btn gold",p.textContent="Abrir WhatsApp ↗",p.target="_blank",p.rel="noopener";const y=()=>p.href="https://wa.me/"+a.whatsapp+"?text="+encodeURIComponent(i.value);y(),i.oninput=y,g.append(p)}const u=document.createElement("button");if(u.className="btn gold",u.textContent="Copiar mensaje",u.onclick=async()=>{try{await navigator.clipboard.writeText(i.value),n("#copy-status").textContent="Mensaje copiado."}catch{i.select(),n("#copy-status").textContent="Selecciona y copia el texto."}},g.append(u),n("#contact-notice").textContent=a.whatsapp?"WhatsApp se abrirá con tu mensaje. Envíalo allí para contactar con el autor.":"El autor todavía no ha configurado WhatsApp.",a.email){const p=document.createElement("p");p.textContent="Correo: "+a.email,_.append(p)}if(a.paypal){const p=document.createElement("p");p.textContent="Realiza el pago solo después de acordar el pedido o la reserva con el autor.";const y=document.createElement("a");y.className="btn gold",y.href=a.paypal,y.target="_blank",y.rel="noopener",y.textContent="Abrir PayPal ↗",_.append(p,y)}if(a.delivery){const p=document.createElement("p");p.textContent=a.delivery,_.append(p)}}function G(t){const a={available:{clase:"available",texto:"En Stock"},out:{clase:"out",texto:"Sin Stock"},digital:{clase:"digital",texto:"Formato digital"},unknown:{clase:"unknown",texto:"Stock físico a consultar"}},i=a[t.physical_stock]||a.unknown;return`
    <span class="stock-label stock-label--${i.clase}">
      <span class="stock-label__dot" aria-hidden="true"></span>
      ${i.texto}
    </span>
  `}function U(){var T;const t=n("#products");if(!t)return;const a=(((T=n("#search"))==null?void 0:T.value)||"").toLocaleLowerCase("es"),i={pdf:{label:"PDF",format:"digital",description:"La aventura en PDF para leerla en pantalla o imprimirla."},pdf_vtt:{label:"PDF + VTT",format:"digital",description:"PDF y los materiales para mesa virtual incluidos en esta publicación."},pdf_vtt_json:{label:"PDF + VTT + JSON",format:"digital",description:"PDF, materiales para mesa virtual y archivos JSON. Consulta la plataforma compatible en la descripción de la publicación."},book:{label:"Libro físico",format:"physical",description:"Ejemplar impreso. Envío pendiente de calcular según destino."},book_pdf:{label:"Libro + PDF",format:"physical",description:"Ejemplar impreso y PDF. Envío pendiente de calcular según destino."},book_pdf_vtt:{label:"Libro + PDF + VTT",format:"physical",description:"Ejemplar impreso, PDF y materiales para mesa virtual. Envío pendiente de calcular según destino."},book_pdf_vtt_json:{label:"Libro + PDF + VTT + JSON",format:"physical",description:"Ejemplar impreso, PDF, materiales para mesa virtual y archivos JSON. Consulta la plataforma compatible en la descripción. Envío pendiente de calcular según destino."}},g=e=>new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(e);function u(e){return(Array.isArray(e.purchase_packages)?e.purchase_packages:[]).filter(d=>i[d.id]&&Number.isFinite(Number(d.price))&&Number(d.price)>0&&(N==="all"||i[d.id].format===N))}function p(e){const d=u(e);if(!d.length)return"Precio a consultar";const h=Math.min(...d.map(P=>Number(P.price)));return`${d.length>1?"Desde ":""}${g(h)}`}function y(e){const d=u(e);return d.length?`
      <div class="purchase-choice">
        <label>
          Elige tu paquete
          <select data-purchase-package>
            <option value="">Seleccione...</option>

            ${d.map(h=>`
                  <option value="${o(h.id)}">
                    ${o(i[h.id].label)}
                    · ${o(g(Number(h.price)))}
                  </option>
                `).join("")}
          </select>
        </label>

        <p data-purchase-description>
          Selecciona una opción para ver qué incluye.
        </p>

        <p data-purchase-feedback role="status"></p>

      </div>
    `:`
        <p class="purchase-choice">
          Consulta con el autor los formatos y precios disponibles.
        </p>
      `}const L=S.products.filter(e=>(N==="all"||e.sale_format===N||e.sale_format==="both")&&`${e.title} ${e.intro}`.toLocaleLowerCase("es").includes(a));t.innerHTML=L.length?L.map((e,d)=>`
            <article class="product flip-product">
              <div class="flip-inner">
                <div class="flip-front">
                  <span class="publication-status ${e.status==="Disponible"||e.status==="Publicado"?"publication-status--published":e.status==="Próximamente"?"publication-status--soon":"publication-status--development"}">
                    ${o(e.status==="Disponible"?"Publicado":e.status||"En desarrollo")}
                  </span>

                  <div class="cover ${e.color==="blue"?"blue":""}">
                    ${e.cover?`
                          <img
                            class="uploaded-cover"
                            src="${o(e.cover)}"
                            alt="Portada de ${o(e.title)}"
                          >
                        `:`
                          <small>LA MAZMORRA DEL ROLEO</small>
                          <span class="cover-icon">✧</span>
                          <strong>${o(e.title)}</strong>
                          <small>UNA HISTORIA PARA TU MESA</small>
                        `}
                  </div>

                  <div class="product-info">
                    <div class="product-title-row">
                      <h3>${o(e.title)}</h3>

                      <span data-purchase-stock>
                        ${e.sale_format==="digital"?"":G(e)}
                      </span>
                    </div>

                    <p>${o(e.intro)}</p>

                    <div class="product-specs">
                      <span class="product-specs__tag">
                        ${o(e.level||"Nivel por confirmar")}
                      </span>

                      <span class="product-specs__tag">
                        ${o(e.players||"Jugadores por confirmar")}
                      </span>

                      <span class="product-specs__tag">
                        ${o(e.duration||"Duración por confirmar")}
                      </span>
${e.pages?`<span class="product-specs__tag">
        ${o(e.pages)} páginas
      </span>`:""}
                      <span
                        class="product-specs__tag product-specs__tag--price"
                      >
                        <span data-purchase-price>
                          ${o(p(e))}
                        </span>
                      </span>
                    </div>

                    ${y(e)}

                    <div class="publication-actions">
                      <button
                        type="button"
                        data-flip-open
                        aria-expanded="false"
                        aria-controls="publication-back-${d}"
                      >
                        Ver publicación ↻
                      </button>

                      ${V(e.demo)?`
                            <button
                              type="button"
                              data-demo="${o(e.id)}"
                            >
                              Ver demo ↗
                            </button>
                          `:""}

                      <a
                        class="front-buy"
                        href="https://wa.me/34666530043"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Comprar ↗
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  class="flip-back"
                  id="publication-back-${d}"
                  aria-hidden="true"
                  inert
                >
                  <div class="flip-back-heading">
                    <span class="eyebrow">${o(e.label)}</span>
                    <h3 tabindex="-1">${o(e.title)}</h3>

                    <span class="badge">
                      ${o(e.status||"En desarrollo")}
                    </span>
                  </div>

                      <div class="flip-back-content">
                        <p class="preserve-lines">${o((e.description||"").trim())}</p>

                    <dl class="flip-details">
                      <div>
                        <dt>Nivel</dt>
                        <dd>${o(e.level||"Por confirmar")}</dd>
                      </div>

                      <div>
                        <dt>Jugadores</dt>
                        <dd>${o(e.players||"Por confirmar")}</dd>
                      </div>

                      <div>
                        <dt>Duración</dt>
                        <dd>${o(e.duration||"Por confirmar")}</dd>
                      </div>
${e.pages?`<div>
        <dt>Páginas</dt>
        <dd>${o(e.pages)}</dd>
      </div>`:""}


                      <div>
                        <dt>Precio</dt>
                        <dd data-purchase-price>
                          ${o(p(e))}
                        </dd>
                      </div>
                    </dl>

                    ${y(e)}

                    ${V(e.demo)?`
                          <div class="publication-actions">
                            <button
                              type="button"
                              data-demo="${o(e.id)}"
                            >
                              Ver demo ↗
                            </button>
                          </div>
                        `:""}
                  </div>

                  <a
                    class="flip-return flip-buy"
                    href="https://wa.me/34666530043"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Comprar por WhatsApp ↗
                  </a>
                </div>
              </div>
            </article>
          `).join(""):`
      <div class="empty">
        <h3>Aún quedan estantes por llenar.</h3>
        <p>No hay publicaciones para esta selección.</p>
      </div>
    `,t.querySelectorAll(".flip-product").forEach((e,d)=>{e.id=`publicacion-${L[d].id}`;const h=L[d],P=u(h),c=e.querySelectorAll("[data-purchase-package]"),s=e.querySelectorAll(".front-buy, .flip-buy"),x=["Disponible","Publicado"].includes(h.status);let v="";function w(){const r=P.find($=>$.id===v),l=r?i[r.id]:null,b=(l==null?void 0:l.format)==="physical"&&h.physical_stock==="out",D=x&&r&&!b,q=[D?`¡Hola, Hugo! Me gustaría comprar «${h.title}».`:`¡Hola, Hugo! Me interesa «${h.title}».`,...r?[`Formato: ${l.format==="digital"?"Digital":"Físico"}.`,`Paquete: ${l.label}.`,`Precio indicado: ${g(Number(r.price))}.`,...l.format==="physical"?["Envío pendiente de calcular según destino."]:[]]:[],b?"He visto que no hay stock. ¿Cuándo volverá a estar disponible?":D?"¿Cómo realizo el pago y recibo el pedido?":"¿Puedes confirmarme disponibilidad y condiciones?"],H="https://wa.me/34666530043?text="+encodeURIComponent(q.join(`
`));c.forEach($=>{$.value=v}),e.querySelectorAll("[data-purchase-price]").forEach($=>{$.textContent=r?g(Number(r.price)):p(h)}),e.querySelectorAll("[data-purchase-description]").forEach($=>{$.textContent=l?l.description:"Selecciona una opción para ver qué incluye."}),e.querySelectorAll("[data-purchase-feedback]").forEach($=>{$.textContent=""}),e.querySelectorAll("[data-purchase-stock]").forEach($=>{$.hidden=l?l.format!=="physical":N==="digital"||h.sale_format==="digital"}),s.forEach($=>{$.href=H;const Y=x&&!b?"Comprar":"Consultar";$.textContent=$.classList.contains("front-buy")?`${Y} ↗`:`${Y} por WhatsApp ↗`})}c.forEach(r=>{r.addEventListener("change",()=>{v=r.value,w()})}),s.forEach(r=>{r.addEventListener("click",l=>{if(!P.length||v)return;l.preventDefault();const b=r.closest(".flip-front, .flip-back");b.querySelector("[data-purchase-feedback]").textContent="Selecciona el paquete que te interesa antes de continuar.",b.querySelector("[data-purchase-package]").focus()})}),w();const E=e.querySelector(".flip-front"),m=e.querySelector(".flip-back"),A=e.querySelector("[data-flip-open]");let f=null,k=null,I=0,F=null;async function j(){if(!f||e.dataset.closing==="true")return;e.dataset.closing="true";const r=f;t.scrollLeft=I;const l=e.getBoundingClientRect(),b=k==null?void 0:k.getBoundingClientRect();e.classList.remove("is-flipped");const D=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let q=null;if(b&&!D&&l.width&&l.height){e.style.animation="none",Object.assign(e.style,{position:"fixed",left:`${l.left}px`,top:`${l.top}px`,width:`${l.width}px`,height:`${l.height}px`,margin:"0",transform:"none",transition:"none"}),q=e.animate([{left:`${l.left}px`,top:`${l.top}px`,width:`${l.width}px`,height:`${l.height}px`},{left:`${b.left}px`,top:`${b.top}px`,width:`${b.width}px`,height:`${b.height}px`}],{duration:650,easing:"cubic-bezier(0.22, 0.61, 0.36, 1)",fill:"forwards"}),r.classList.add("card-lightbox-closing");try{await q.finished}catch{}}E.inert=!1,m.inert=!0,E.setAttribute("aria-hidden","false"),m.setAttribute("aria-hidden","true"),A.setAttribute("aria-expanded","false"),e.classList.remove("card-ampliada"),k!=null&&k.isConnected&&k.replaceWith(e),q==null||q.cancel(),["position","left","top","width","height","margin","transform","transition"].forEach(H=>{e.style.removeProperty(H)}),e.style.removeProperty("animation"),delete e.dataset.closing,k=null,f=null,r.open&&r.close(),r.remove(),requestAnimationFrame(()=>{t.scrollLeft=I,F!=null&&F.isConnected&&F.focus({preventScroll:!0})})}function R(r){var b;if(!r){j();return}if(f)return;F=A,I=t.scrollLeft,k=document.createElement("div"),k.className="card-placeholder",k.style.height=`${e.offsetHeight}px`,k.setAttribute("aria-hidden","true"),e.before(k),f=document.createElement("dialog"),f.className="card-lightbox",f.setAttribute("aria-label",((b=e.querySelector("h3"))==null?void 0:b.textContent)||"Información de la publicación"),t.append(f),f.append(e),e.classList.add("card-ampliada"),E.inert=!0,m.inert=!1,E.setAttribute("aria-hidden","true"),m.setAttribute("aria-hidden","false"),A.setAttribute("aria-expanded","true"),f.addEventListener("cancel",D=>{D.preventDefault(),j()});let l=!1;f.addEventListener("pointerdown",D=>{l=D.target===f}),f.addEventListener("click",D=>{l&&D.target===f&&j(),l=!1}),f.showModal(),requestAnimationFrame(()=>{f&&(e.classList.add("is-flipped"),m.querySelector("h3").focus({preventScroll:!0}),t.scrollLeft=I)})}A.onclick=()=>R(!0);let z="";try{z=decodeURIComponent(window.location.hash.slice(1))}catch{z=""}z&&z===e.id&&(history.replaceState(null,"",window.location.pathname+window.location.search),requestAnimationFrame(()=>{e.isConnected&&(e.scrollIntoView({behavior:"auto",block:"center",inline:"center"}),requestAnimationFrame(()=>{e.isConnected&&R(!0)}))}));let M=null;E.addEventListener("pointerdown",r=>{M={x:r.clientX,y:r.clientY,scroll:t.scrollLeft}}),E.addEventListener("click",r=>{var b;if(r.target.closest("button, a, input, select, textarea, label, .purchase-choice")||!M)return;const l=Math.abs(r.clientX-M.x)>8||Math.abs(r.clientY-M.y)>8||Math.abs(t.scrollLeft-M.scroll)>8;M=null,!(l||(b=window.getSelection())!=null&&b.toString())&&R(!0)}),e.addEventListener("keydown",r=>{r.key==="Escape"&&e.classList.contains("is-flipped")&&(r.preventDefault(),R(!1))})})}n("#search")&&(n("#search").oninput=U,document.querySelectorAll("[data-filter]").forEach(t=>t.onclick=()=>{N=t.dataset.filter,document.querySelectorAll("[data-filter]").forEach(a=>a.classList.toggle("active",a===t)),U()}),U());document.querySelectorAll("[data-service]").forEach(t=>t.onclick=()=>J(t.dataset.service));n("#contact-button")&&(n("#contact-button").onclick=()=>J());n("#contact-status")&&(n("#contact-status").textContent=S.config.whatsapp?"Contacta por WhatsApp y acuerda los detalles con el autor.":"El autor todavía no ha configurado WhatsApp.");document.querySelectorAll("[data-legal]").forEach(t=>t.onclick=()=>O(t.dataset.legal==="privacy"?'<p class="eyebrow">PRIVACIDAD · INFORMACIÓN PROVISIONAL</p><h2>Datos de las solicitudes.</h2><p>Al solicitar una partida, se guardan tu nombre o alias, contacto, número de jugadores y notas para que el director pueda tramitarla. Solo el administrador puede consultar estos datos. No introduzcas información sensible en las notas.</p><p>Las cuentas guardan nombre, correo, contacto y una contraseña protegida mediante hash, además de su vinculación con las reservas. El acceso utiliza una cookie de sesión necesaria. La administración utiliza una cookie de sesión necesaria para el acceso privado. No hay analítica publicitaria incorporada.</p><p>Antes del lanzamiento público, el propietario debe completar esta política con sus datos, base jurídica, plazos de conservación, proveedores y medios para ejercer derechos.</p>':'<p class="eyebrow">LA MAZMORRA DEL ROLEO</p><h2>Información del proyecto.</h2><p>Proyecto independiente de Hugo Durán. Las compras y los pagos se acuerdan directamente con el autor. Las solicitudes de partida requieren confirmación expresa del director.</p><p>Antes de abrir las ventas al público se deben completar los datos del vendedor, condiciones de compra, cancelación y entrega, y atribuciones de las publicaciones. No existe afiliación con Wizards of the Coast.</p>'));if(n("#calendar-days")){let d=function(){const c=T();n("#month-label").textContent=a.toLocaleDateString("es-ES",{month:"long",year:"numeric"});const s=n("#calendar-days");s.dataset.selectedDate=i,s.replaceChildren();for(let v=0;v<(a.getDay()+6)%7;v++)s.append(document.createElement("span"));const x=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();for(let v=1;v<=x;v++){const w=p(new Date(a.getFullYear(),a.getMonth(),v,12)),E=c.filter(A=>y(A.starts)===w).length,m=document.createElement("button");m.textContent=v+(E?" ·":""),m.disabled=w<t,m.className=(w===t?"today ":"")+(w===i?"selected":""),m.setAttribute("aria-label",L(w)+(E?` · ${E} partida(s)`:" · Sin partidas")),m.setAttribute("aria-pressed",String(w===i)),m.onclick=()=>{i=w,d(),h()},s.append(m)}},h=function(){n("#selected-date").textContent=L(i);const c=T().filter(s=>y(s.starts)===i);n("#session-list").innerHTML=c.length?c.map(s=>`<article class="session-card"><h3>${o(s.title)}</h3><p>${o(new Date(s.starts).toLocaleTimeString("es-ES",{timeZone:"Europe/Madrid",hour:"2-digit",minute:"2-digit"}))} (Madrid) · ${o(s.duration)}<br>${o(s.mode)}<br>${o(s.price||"Precio por confirmar")} · ${s.available} plaza(s) disponibles</p><p class="preserve-lines">${o(s.description)}</p><button class="btn gold" data-book="${s.id}" data-waitlist="${s.available<1?"true":"false"}">${s.available<1?"Apuntarme a la lista de espera ↗":"Solicitar plaza ↗"}</button></article>`).join(""):`<div class="calendar-empty-invite">
    <h3>¡Este día puede ser vuestra próxima aventura!</h3>
    <p>
      No hay sesiones publicadas para esta fecha.
      Solicita una partida para tu grupo.
    </p>
    <span class="calendar-empty-arrow" aria-hidden="true">↓</span>
  </div>`,document.querySelectorAll("[data-book]").forEach(s=>s.onclick=()=>P(S.games.find(x=>x.id===s.dataset.book),s.dataset.waitlist==="true"))},P=function(c,s=!1){O(`<p class="eyebrow">${s?"LISTA DE ESPERA":"SOLICITUD DE PLAZA"}</p><h2>${o(c.title)}</h2><p>${o(new Date(c.starts).toLocaleString("es-ES",{timeZone:"Europe/Madrid"}))} (Madrid) · ${o(c.price||"Precio por confirmar")}</p><p class="notice">La solicitud queda pendiente hasta que el director la confirme. ${s?"La sesión está completa. Esta solicitud te añade a la lista de espera; no reserva plazas ni garantiza una vacante.":"Las solicitudes pendientes no bloquean plazas."}</p><form id="booking-form"><div class="booking-fields"><label>Nombre o alias<input name="name" maxlength="80" required autocomplete="nickname"></label><label>Jugadores<input name="players" type="number" min="1" max="${s?20:Math.min(20,c.available)}" value="1" required></label><label class="wide">Correo o teléfono de contacto<input name="contact" maxlength="200" required></label><label class="wide">Notas<textarea name="notes" maxlength="1500" placeholder="Experiencia, dudas o preferencias del grupo. No incluyas datos sensibles."></textarea></label><label class="wide consent"><input type="checkbox" name="consent" required> He leído la información de privacidad y acepto que se utilicen estos datos para tramitar mi solicitud.</label></div><button class="btn gold" type="submit">${s?"Apuntarme a la lista de espera":"Enviar solicitud"}</button><p id="booking-status" role="status"></p></form>`),B.autofill(n("#booking-form")),n("#booking-form").onsubmit=async x=>{x.preventDefault();const v=x.target,w=v.querySelector("button");w.disabled=!0;const E=Object.fromEntries(new FormData(v));try{const m=await W("api/reservations",{method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify({...E,game_id:c.id,waitlist:s,players:Number(E.players),consent:v.elements.consent.checked})}),A=m.data;if(m.status<200||m.status>=300)throw Error(A.error);_.innerHTML=`<p class="eyebrow">SOLICITUD RECIBIDA</p><h2>${A.waitlisted?"Ya estás en la lista de espera":"¡Ya está en la mesa!"}</h2><p>${A.waitlisted?"Si se libera una plaza, el máster revisará la lista y contactará contigo. No hay plaza reservada ni asignación automática.":"El director ha recibido tu solicitud y la revisará."} La reserva todavía no está confirmada; no realices ningún pago hasta acordar las condiciones.</p><p>Referencia: <strong>${o(A.reference)}</strong></p><p>El director te responderá por el contacto que has indicado. No se ha enviado un correo automático.</p>`;const f=await W("api/public");f.status===200&&(S=f.data),d(),h()}catch(m){n("#booking-status")&&(n("#booking-status").textContent=m.message),w.disabled=!1}}};const t=new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Madrid",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);let a=new Date(t+"T12:00:00");a.setDate(1);let i=t;const g=new URLSearchParams(window.location.search).get("partida"),u=S.games.find(c=>String(c.id)===g);u&&new Date(u.starts)>new Date&&(i=new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Madrid",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(u.starts)),a=new Date(i+"T12:00:00"),a.setDate(1));const p=c=>`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}-${String(c.getDate()).padStart(2,"0")}`,y=c=>new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Madrid",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(c)),L=c=>new Date(c+"T12:00:00").toLocaleDateString("es-ES",{dateStyle:"full"}),T=()=>S.games.filter(c=>new Date(c.starts)>new Date),e=n("#propose-date");e&&(e.hidden=!0),n("#previous-month").onclick=()=>{a=new Date(a.getFullYear(),a.getMonth()-1,1,12),d()},n("#next-month").onclick=()=>{a=new Date(a.getFullYear(),a.getMonth()+1,1,12),d()},n("#today-month").onclick=()=>{a=new Date(t+"T12:00:00"),a.setDate(1),i=t,d(),h()},d(),h()}if(S.error){const t=document.createElement("p");t.className="notice",t.textContent=S.error,document.querySelector("main").prepend(t)}if(n("#preview-select")){const t=n("#preview-select"),a=n("#preview-frame"),i=n("#preview-link"),g=(S.config.previews||[]).filter(u=>typeof u.title=="string"&&/^https:\/\/heyzine\.com\/flip-book\/[a-zA-Z0-9_-]+\.html$/.test(u.url));t.replaceChildren(new Option("Selecciona una aventura…","")),g.forEach((u,p)=>t.add(new Option(u.title,String(p)))),t.disabled=g.length===0,n("#preview-status").textContent=S.error?"No se han podido cargar las muestras. Comprueba la conexión con la base de datos.":g.length?"Selecciona una muestra para abrir el visor.":"Próximamente habrá muestras disponibles.",t.onchange=()=>{if(a.hidden=i.hidden=!0,a.removeAttribute("src"),i.removeAttribute("href"),t.value===""){n("#preview-status").textContent="Selecciona una muestra para abrir el visor.";return}const u=g[Number(t.value)];a.src=u.url,a.title="Muestra: "+u.title,i.href=u.url,a.hidden=i.hidden=!1,n("#preview-status").textContent="Muestra seleccionada: "+u.title}}function V(t){return typeof t=="string"&&/^https:\/\/heyzine\.com\/flip-book\/[a-zA-Z0-9_-]+\.html$/.test(t)}const Z=n("#products");Z&&Z.addEventListener("click",t=>{const a=t.target.closest("[data-demo]");if(!a)return;const i=S.products.find(g=>g.id===a.dataset.demo);!i||!V(i.demo)||(C.classList.add("demo-modal"),O(`<p class="eyebrow">MUESTRA DE LA AVENTURA</p><h2>${o(i.title)}</h2><iframe class="book-demo" src="${o(i.demo)}" title="Demo de ${o(i.title)}" allowfullscreen></iframe><p><a class="btn gold" href="${o(i.demo)}" target="_blank" rel="noopener noreferrer">Abrir en Heyzine ↗</a></p>`))});C.addEventListener("close",()=>{C.classList.remove("demo-modal"),_.replaceChildren()});export{J as contact};
