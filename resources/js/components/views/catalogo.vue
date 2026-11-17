<template>
    <SiteHeader current="catalogo" />
    <main class="interior-page">
        <section class="interior-hero">
            <div>
                <p class="eyebrow">LA BIBLIOTECA DEL AVENTURERO</p>
                <h1>Tu próxima historia<br /><em>empieza aquí.</em></h1>
                <p class="lead">
                    Aventuras y compendios para llevar a tu mesa. Explora cada
                    publicación y abre su demo para conocerla por dentro.
                </p>
            </div>
            <img src="images/servicios.png" alt="" loading="lazy" />
        </section>
        <section id="catalogo" class="catalog section">
            <div class="catalog-tools">
                <div class="filters" role="group" aria-label="Filtrar catálogo">
                    <BaseButton class="active" data-filter="all">
                        Todo el catálogo
                    </BaseButton>
                    <BaseButton data-filter="digital">
                        Contenido digital
                    </BaseButton>
                    <BaseButton data-filter="physical">Libros físicos</BaseButton>
                </div>
                <label class="search"
                ><span>⌕</span
                ><input
                        id="search"
                        placeholder="Busca una historia…"
                        aria-label="Buscar en el catálogo"
                /></label>
            </div>
            <div class="catalog-note-anchor">
                <div class="book-carousel" aria-label="Publicaciones">
                    <div class="book-carousel__controls">
                        <span>Explora las historias</span>

                        <div>
                            <BaseButton
                                id="books-prev"
                                aria-label="Ver publicaciones anteriores"
                                aria-controls="products"
                            >
                                ←
                            </BaseButton>

                            <BaseButton
                                id="books-next"
                                aria-label="Ver publicaciones siguientes"
                                aria-controls="products"
                            >
                                →
                            </BaseButton>
                        </div>
                    </div>

                    <div
                        class="products"
                        id="products"
                        tabindex="0"
                        aria-label="Listado de publicaciones"
                    ></div>
                </div>

                <a class="catalog-info-notice" href="#formatos-envios">
                    <span class="catalog-info-notice__icon" aria-hidden="true">✦</span>
                    <span class="catalog-info-notice__text">
                        <span class="catalog-info-notice__eyebrow">PREPARA TU AVENTURA</span>
                        <strong>Antes de hacer tu pedido</strong>
                        <span>
                            Descubre qué incluye cada formato —PDF, VTT y JSON—, cómo se
                            calculan los envíos y cómo recibirás tu pedido.
                        </span>
                        <em>Descubre formatos y envíos <span aria-hidden="true">↗</span></em>
                    </span>

                    <span class="catalog-info-notice__arrow" aria-hidden="true">↓</span>
                </a>
            </div>

            <p class="catalog-note">
                Consulta el estado de cada publicación. Los proyectos en desarrollo no
                están disponibles para compra.
            </p>
        </section>

        <section
            id="formatos-envios"
            class="formats-guide section"
            aria-labelledby="formats-title"
        >
            <div class="formats-guide__heading">
                <p class="eyebrow">ANTES DE ABRIR LA PRÓXIMA AVENTURA</p>
                <h2 id="formats-title">Formatos, compras y envíos.</h2>
                <p>
                    Elige cómo quieres llevar la aventura a tu mesa. Aquí te explico qué
                    incluye cada formato y cómo hacer tu pedido.
                </p>
                <BaseButton
                    class="formats-guide__toggle"
                    aria-expanded="false"
                    aria-controls="formats-content"
                >
                    <span class="formats-guide__toggle-label">Ver información</span>
                    <span class="formats-guide__toggle-icon" aria-hidden="true">+</span>
                </BaseButton>
            </div>

            <div id="formats-content" class="formats-guide__content">
                <div id="formats-questions" class="formats-guide__questions">
                    <p class="formats-guide__group">01 · Elige tu formato</p>

                    <details>
                        <summary>¿Qué incluye el PDF?</summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                La <strong>edición digital de la publicación</strong>, para leer
                                y consultar mientras preparas o diriges tus partidas.
                            </p>
                            <p>
                                Puedes abrirla en tu <strong>ordenador o tableta</strong> y
                                tener el documento de la aventura a mano durante la sesión.
                            </p>
                            <aside
                                class="formats-guide__notice"
                                aria-label="Elegir recursos digitales"
                            >
                                <strong class="formats-guide__notice-title"
                                >¿También quieres mapas y tokens?</strong
                                >
                                <p>
                                    El paquete PDF incluye el documento. Para disponer de los
                                    recursos gráficos como archivos para tu mesa virtual, elige
                                    una opción que incluya <strong>VTT</strong>.
                                </p>
                            </aside>
                        </div>
                    </details>

                    <details>
                        <summary>¿Qué son los materiales para VTT?</summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                <strong>VTT significa «mesa virtual»</strong>: una herramienta
                                para jugar a rol online, mostrar mapas y mover fichas.
                            </p>
                            <p>
                                El paquete reúne los
                                <strong>recursos gráficos de la aventura</strong>:
                            </p>
                            <ul class="formats-guide__resources">
                                <li>
                                    <strong>Mapas del director de juego</strong
                                    ><span
                                    >La versión del GM para preparar y dirigir la
                                        aventura.</span
                                    >
                                </li>
                                <li>
                                    <strong>Mapas de los jugadores</strong
                                    ><span
                                    >La versión que puedes mostrar al grupo durante la
                                        partida.</span
                                    >
                                </li>
                                <li>
                                    <strong>Tokens de monstruos</strong
                                    ><span
                                    >Fichas digitales para representar a las criaturas sobre el
                                        mapa.</span
                                    >
                                </li>
                            </ul>
                            <aside
                                class="formats-guide__notice"
                                aria-label="Diferencia entre VTT y JSON"
                            >
                                <strong class="formats-guide__notice-title"
                                >VTT y JSON: ¿qué cambia?</strong
                                >
                                <p>
                                    VTT aporta los archivos gráficos. La
                                    <strong>importación del contenido preparado en Roll20</strong>
                                    corresponde al paquete que incluye JSON.
                                </p>
                            </aside>
                        </div>
                    </details>

                    <details>
                        <summary>¿Qué es el archivo JSON para Roll20?</summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                Un <strong>archivo de importación</strong> para cargar la
                                aventura en Roll20 mediante un script.
                            </p>
                            <p>
                                Al importarlo, se incorpora el contenido preparado:
                                <strong>la aventura, las notas, los monstruos</strong> y los
                                demás elementos incluidos en esa publicación. Así reduces el
                                trabajo de introducirlos manualmente.
                            </p>
                            <aside
                                class="formats-guide__notice formats-guide__notice--important"
                                aria-label="Requisitos del archivo JSON"
                            >
                                <span class="formats-guide__notice-kicker">
                                    ANTES DE COMPRAR
                                </span>

                                <strong class="formats-guide__notice-title">
                                    Necesitas betteR20 para importar la aventura
                                </strong>

                                <p>
                                    Este formato utiliza <strong>betteR20, de 5etools</strong>.
                                    Para instalarlo necesitas la extensión
                                    <strong>Tampermonkey</strong> en tu navegador y el script
                                    correspondiente.
                                </p>

                                <p>
                                    Encontrarás los enlaces de instalación en
                                    <a
                                        href="https://5e.tools/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    ><strong>5etools → «Use Roll20?» ↗</strong></a>.
                                    Allí se ofrecen versiones para reglas de
                                    <strong>2014 y 2024</strong>.
                                </p>

                                <p>
                                    <strong>Antes de instalar:</strong>
                                    consulta conmigo qué versión corresponde al archivo
                                    de la aventura. La página indica que se utiliza la ficha
                                    <strong>«D&amp;D 5E by Roll20»</strong> y que solo debe
                                    mantenerse activo un script a la vez.
                                </p>
                            </aside>
                        </div>
                    </details>

                    <details>
                        <summary>¿Qué incluye la edición física?</summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                Recibirás <strong>un ejemplar impreso</strong>. Los archivos
                                digitales que lo acompañan dependen del paquete seleccionado.
                            </p>
                            <div class="formats-guide__comparison">
                                <div>
                                    <h3>Libro + PDF</h3>
                                    <p>
                                        Incluye el <strong>ejemplar impreso</strong> y la
                                        <strong>edición digital</strong>.
                                    </p>
                                </div>
                                <div>
                                    <h3>Libro + PDF + VTT + JSON</h3>
                                    <p>
                                        Añade los <strong>recursos para mesa virtual</strong> y el
                                        <strong>archivo de importación</strong>.
                                    </p>
                                </div>
                            </div>
                            <p>
                                Revisa las
                                <strong
                                >opciones disponibles y el precio de esa publicación</strong
                                >
                                antes de enviar tu solicitud por WhatsApp.
                            </p>
                        </div>
                    </details>

                    <p class="formats-guide__group">02 · Tu pedido, paso a paso</p>

                    <details>
                        <summary>¿Cómo puedo comprar?</summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                Elige tu aventura en la web y
                                <strong>continúa el pedido por WhatsApp</strong>.
                            </p>
                            <ol class="formats-guide__steps">
                                <li>
                                    <strong>Elige tu publicación y paquete.</strong
                                    ><span>Selecciona la opción de compra que quieras.</span>
                                </li>
                                <li>
                                    <strong>Calcula el envío si compras un libro físico.</strong
                                    ><span
                                    >Indica la cantidad y el código postal, comprueba la
                                        localidad y calcula el envío. Si aparece
                                        <strong>«A consultar»</strong>, te confirmaré el importe por
                                        WhatsApp.</span
                                        >
                                </li>
                                <li>
                                    <strong>Envía el mensaje preparado.</strong
                                    ><span
                                    >Pulsa continuar por WhatsApp y envía los datos de tu
                                        pedido.</span
                                    >
                                </li>
                                <li>
                                    <strong
                                    >Confirma el pedido y recibe las instrucciones de
                                        pago.</strong
                                    ><span
                                    >Por ese canal recibirás la confirmación del
                                        <strong>importe final y la disponibilidad</strong>, junto
                                        con el enlace o QR para pagar por
                                        <strong>PayPal</strong>.</span
                                        >
                                </li>
                                <li>
                                    <strong>Recibe tu pedido.</strong
                                    ><span
                                    >Una vez comprobado el pago, prepararé la entrega digital o
                                        el envío del libro, según tu paquete, y te informaré por
                                        WhatsApp.</span
                                    >
                                </li>
                            </ol>
                            <aside
                                class="formats-guide__notice formats-guide__notice--help"
                                aria-label="Ayuda del asistente"
                            >
                                <strong class="formats-guide__notice-title"
                                >Mi asistente también puede ayudarte</strong
                                >
                                <p>
                                    En WhatsApp puedes consultar dudas sobre
                                    <strong>publicaciones, formatos y el proceso de compra</strong
                                    >. Si la consulta necesita mi atención, el asistente te
                                    derivará a mí para ayudarte personalmente.
                                </p>
                            </aside>
                            <p class="formats-guide__closing">
                                <strong>Antes de pagar:</strong> confirma el importe total y los
                                plazos de entrega. No necesitas realizar ningún pago
                                directamente desde esta web.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary>¿Cuánto cuestan los gastos de envío?</summary>
                        <div class="formats-guide__answer">
                            <div class="formats-guide__comparison">
                                <div>
                                    <h3>Contenido digital</h3>
                                    <p>
                                        <strong>Sin gastos de envío postal.</strong> El precio
                                        corresponde al paquete digital que selecciones.
                                    </p>
                                </div>
                                <div>
                                    <h3>Libros físicos</h3>
                                    <p>
                                        El envío <strong>se añade al precio del libro</strong>.
                                        Puedes calcularlo al pulsar «Comprar», indicando cantidad y
                                        destino.
                                    </p>
                                </div>
                            </div>
                            <p>
                                La calculadora utiliza el
                                <strong
                                >peso de los ejemplares, el embalaje, las medidas y la zona de
                                    destino</strong
                                >
                                para estimar los gastos de envío.
                            </p>
                            <p>
                                Cuando se puede calcular, el importe mostrado como
                                <strong>«Envío» ya incluye el embalaje</strong>: no se añade una
                                segunda vez al total.
                            </p>
                            <aside
                                class="formats-guide__notice"
                                aria-label="Pedidos que necesitan revisión"
                            >
                                <strong class="formats-guide__notice-title"
                                >¿Aparece «Envío a consultar»?</strong
                                >
                                <p>
                                    El cálculo automático contempla
                                    <strong>un sobre de hasta 5 kg, incluido el embalaje</strong>,
                                    siempre que los libros quepan. Los pedidos que necesiten otro
                                    embalaje o tengan un destino sin cálculo automático se
                                    confirman por WhatsApp <strong>antes del pago</strong>.
                                </p>
                            </aside>
                        </div>
                    </details>

                    <details>
                        <summary>
                            ¿Cuándo recibiré mi pedido y cómo hago el seguimiento?
                        </summary>
                        <div class="formats-guide__answer">
                            <p class="formats-guide__lead">
                                Los plazos se acordarán
                                <strong>por WhatsApp antes del pago</strong>, tanto para libros
                                como para archivos digitales.
                            </p>
                            <ul class="formats-guide__delivery">
                                <li>
                                    <strong>Preparación y envío de libros.</strong> Te confirmaré
                                    los plazos previstos para preparar y enviar tu pedido.
                                </li>
                                <li>
                                    <strong>Entrega digital.</strong> Acordaremos el medio y el
                                    plazo de entrega de los archivos incluidos en tu paquete.
                                </li>
                                <li>
                                    <strong>Estado y seguimiento.</strong> Te informaré por
                                    WhatsApp y te facilitaré el seguimiento del envío cuando esté
                                    disponible.
                                </li>
                            </ul>
                            <aside
                                class="formats-guide__notice formats-guide__notice--help"
                                aria-label="Canal de seguimiento"
                            >
                                <strong class="formats-guide__notice-title"
                                >Toda la información, en la misma conversación</strong
                                >
                                <p>
                                    Utilizaremos WhatsApp para confirmar los detalles y mantenerte
                                    al día del estado de tu pedido.
                                </p>
                            </aside>
                        </div>
                    </details>
                </div>

                <a
                    class="formats-guide__contact"
                    href="https://wa.me/34666530043?text=Hola%2C%20Hugo.%20Tengo%20una%20duda%20sobre%20los%20formatos%20o%20el%20env%C3%ADo%20de%20una%20publicaci%C3%B3n."
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ¿Te queda alguna duda? Escríbeme ↗
                </a>
            </div>
        </section>
    </main>
    <footer class="site-footer">
        <div class="site-footer__main">
            <div class="site-footer__brand">
                <a class="brand" href="./">
                    <span class="brand-icon" aria-hidden="true">♜</span>
                    <span>LA MAZMORRA<small>DEL ROLEO</small></span>
                </a>

                <p>
                    Historias que se leen.<br />
                    Aventuras que se viven.
                </p>

                <a
                    class="site-footer__contact"
                    href="https://wa.me/34666530043"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Hablemos por WhatsApp <span aria-hidden="true">↗</span>
                </a>
            </div>

            <nav class="site-footer__column" aria-label="Enlaces del pie de página">
                <h2>Explora la mazmorra</h2>
                <a href="catalogo">Aventuras y libros</a>
                <a href="calendario">Reserva tu partida</a>
                <a href="encargos">Aventuras por encargo</a>
                <a href="sobre-mi">Conoce al máster</a>
                <a href="contacto">Contacto</a>
            </nav>

            <div class="site-footer__column">
                <h2>Más allá de la mesa</h2>

                <a
                    href="https://www.instagram.com/la_mazmorra_del_roleo/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram <span aria-hidden="true">↗</span>
                </a>

                <a
                    href="https://mesasroleras.com/gm/osoliron411"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mesas Roleras <span aria-hidden="true">↗</span>
                </a>

                <a
                    href="https://linktr.ee/Osoliron411"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Todos mis enlaces · Linktree <span aria-hidden="true">↗</span>
                </a>

                <a
                    class="site-footer__email"
                    href="mailto:lamazmorradelroleo@gmail.com"
                >
                    lamazmorradelroleo@gmail.com
                </a>
            </div>
        </div>

        <div class="site-footer__bottom">
            <p>
                © 2026 La Mazmorra del Roleo.
                <span
                >Proyecto independiente, no afiliado a Wizards of the Coast.</span
                >
            </p>

            <div class="site-footer__legal">
                <BaseButton data-legal="legal">
                    Información del sitio
                </BaseButton>
                <BaseButton data-legal="privacy">Privacidad</BaseButton>
                <a href="admin">Administración</a>
            </div>
        </div>
    </footer>
    <dialog id="modal">
        <BaseButton class="close" aria-label="Cerrar ventana">×</BaseButton>
        <div id="modal-content"></div>
    </dialog>
</template>


<script>
import BaseButton from '../core-ui/BaseButton.vue';
import '../../../css/pages/catalogo.css';
import SiteHeader from '../shared/SiteHeader.vue';
import { createBaseSelect } from '@/components/core-ui/BaseSelect.vue';
import { createBaseButton, setHtmlWithBaseButtons } from '@/components/core-ui/BaseButton.vue';
import { loadAccount } from '@/store/modules/account';
import { requestWithStatus } from '@/bootstrap';
import filledPaths from '@/assets/fluent/filled.js';
import { setHtmlWithBaseCheckboxes } from '@/components/core-ui/BaseCheckbox.vue';
import { siteData } from '@/store/modules/siteData';

export const needsSiteData = true;

export default {
    components: { BaseButton, SiteHeader },
    async mounted() {
        try {
            // Initialize page behavior after Vue has rendered the view.

            let agendaClient;

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
                }catch(_) {  }
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
                const summaryText=document.createElement('span'),changeButton=createBaseButton();changeButton.textContent='Cambiar fecha y hora';
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
                        const select=createBaseSelect();select.name='time1';select.required=true;select.disabled=field.disabled;select.id=field.id;field.replaceWith(select);field=select;
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
                    if (selection.duration) {
                    const value=String(selection.duration/60);
                    if(![...durationField.options].some(option=>option.value===value))durationField.add(new Option(selection.duration===240?'4 horas aproximadamente':value+' horas',value));
                    durationField.value=value;
                    durationField.dispatchEvent(new Event('change',{bubbles:true}));
                    }
                    selectedStart=selection.time || '';
                    update();
                });
                form.addEventListener('change',event=>{if(['date1','duration','format','kind','adventure'].includes(event.target.name))queueMicrotask(update);});
                form.addEventListener('input',event=>{if(['name','contact'].includes(event.target.name)&&event.isTrusted)event.target.dataset.userEdited='true';});
                dialog.addEventListener('close',()=>{request++;selectedStart='';summary.hidden=true;note.textContent='';choices.replaceChildren();for(const key of ['name','contact'])if(form.elements[key])delete form.elements[key].dataset.userEdited;});
                document.querySelectorAll('[data-request-game]').forEach(button=>button.addEventListener('click',()=>queueMicrotask(()=>{autofill(form);update();})));
                update();
                }
                agendaClient={account,autofill,slots,check,setupAvailability};

                const days=document.querySelector('#calendar-days'),sessions=document.querySelector('#session-list');
                if(days&&sessions){
                const box=document.createElement('div');box.className='agenda-availability-launch';sessions.before(box);
                const trigger = createBaseButton({ class: 'agenda-availability-button' });
                trigger.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="${filledPaths.clock[0]}" />
                    </svg>
                    <span>Consultar disponibilidad<small>Comprueba si hay horarios publicados</small></span>
                    <span aria-hidden="true">↗</span>`;
                box.append(trigger);
                const modal=document.createElement('dialog');modal.className='agenda-availability-modal';modal.setAttribute('aria-labelledby','agenda-availability-title');
                setHtmlWithBaseButtons(modal, `<base-button class="agenda-modal-close" aria-label="Cerrar disponibilidad">×</base-button><p class="agenda-modal-eyebrow">HAGAMOS HUECO A VUESTRA AVENTURA</p><h2 id="agenda-availability-title">Consulta de disponibilidad</h2><p class="agenda-modal-date"></p><div class="agenda-duration-choice" hidden><p>¿Cuánto durará vuestra sesión?</p><div class="agenda-duration-buttons" role="group" aria-label="Duración de la sesión"></div></div><p class="agenda-modal-status" role="status" aria-live="polite"></p><base-button class="agenda-next-slot" hidden>Buscar el próximo día con hueco →</base-button><base-button class="agenda-request-date" hidden>Solicitar esta fecha →</base-button><div class="agenda-modal-slots"></div><p class="agenda-modal-footnote">Horario de Madrid. Enviar una solicitud no reserva el hueco: el máster confirmará la disponibilidad.</p>`);
                document.body.append(modal);let duration=120,request=0,browsingDate="";
                const durations=modal.querySelector('.agenda-duration-buttons'),status=modal.querySelector('.agenda-modal-status'),grid=modal.querySelector('.agenda-modal-slots');
                const label=n=>String(n/60).replace('.',',');
                [120,150,180,240].forEach(n=>{const button=createBaseButton();button.dataset.minutes=n;button.textContent=n===240?'4 h · One-shot':label(n)+' horas';button.onclick=()=>{duration=n;updateModal();};durations.append(button);});
                async function updateModal(){
                    if(!modal.open)return;const date=browsingDate||days.dataset.selectedDate,mine=++request;grid.replaceChildren();
                    const next=modal.querySelector('.agenda-next-slot'), requestDate=modal.querySelector('.agenda-request-date'), durationChoice=modal.querySelector('.agenda-duration-choice');next.hidden=true;requestDate.hidden=true;
                    durations.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.minutes)===duration)));
                    modal.querySelector('.agenda-modal-date').textContent=date?new Date(date+'T12:00:00').toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'';
                    if(!date){status.textContent='Selecciona primero un día en el calendario.';return;}
                    status.textContent='Buscando huecos para vuestra mesa…';
                    try{
                    const data=await slots(date,duration);if(mine!==request||!modal.open)return;
                    if(!data.enabled){durationChoice.hidden=true;status.textContent='No hay horarios publicados para consultar. Puedes solicitar esta fecha y proponer una hora; el máster confirmará si está disponible.';requestDate.hidden=false;return;}
                    durationChoice.hidden=false;
                    if(!data.slots.length){next.hidden=false;status.textContent='No hay huecos para '+label(duration)+' horas. Prueba otra duración o elige otro día en el calendario.';return;}
                    status.textContent='Elige una hora de inicio para continuar con tu solicitud de '+label(duration)+' h. La selección no reserva el hueco.';
                    for(const [name,test] of [['Mañana',h=>h<12],['Tarde',h=>h>=12&&h<20],['Noche',h=>h>=20]]){
                        const times=data.slots.filter(time=>test(Number(time.slice(0,2))));if(!times.length)continue;
                        const section=document.createElement('section'),heading=document.createElement('h3'),chips=document.createElement('div');heading.textContent=name;chips.className='agenda-time-grid';
                        times.forEach(time=>{const chip=createBaseButton({ class: 'agenda-time-chip' });chip.textContent=time;chip.setAttribute('aria-label','Solicitar partida a las '+time);
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
                modal.querySelector('.agenda-request-date').onclick=()=>{
                    const opener=document.querySelector('[data-request-game]');
                    if(!opener){status.textContent='No se pudo abrir la solicitud. Recarga la página.';return;}
                    const date=browsingDate||days.dataset.selectedDate;
                    modal.close();opener.click();
                    const form=document.querySelector('#request-game-form');
                    if(form)form.dispatchEvent(new CustomEvent('agenda-select-start',{detail:{date}}));
                };
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

            const $ = (s) => document.querySelector(s),
                esc = (v) =>
                    String(v ?? "").replace(
                        /[&<>"']/g,
                        (c) =>
                            ({
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                            })[c],
                    );
            let site = siteData || { products: [], games: [], config: {} },
                filter = "all";
            const modal = $("#modal"),
                content = $("#modal-content");
            function openDialog(html, kind = '') {
                modal.classList.toggle('contact-dialog', kind === 'contact');
                setHtmlWithBaseCheckboxes(content, html);
                modal.showModal();
            }
            $(".close").onclick = () => modal.close();
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    const r = modal.getBoundingClientRect();
                    if (
                        e.clientX < r.left ||
                        e.clientX > r.right ||
                        e.clientY < r.top ||
                        e.clientY > r.bottom
                    )
                        modal.close();
                }
            });
            function contact(subject = "vuestro contenido") {
                const c = site.config;
                openDialog(
                    '<p class="eyebrow">HABLEMOS DE TU PRÓXIMA PARTIDA</p><h2 id="contact-dialog-title">Prepara tu mensaje.</h2><p class="contact-dialog__intro">Cuéntame qué tienes en mente. Puedes editar el mensaje antes de enviarlo.</p><label for="message">Tu mensaje</label><textarea id="message"></textarea><div class="actions" id="contact-actions"></div><p id="contact-notice" class="notice"></p><p id="copy-status" role="status"></p>',
                'contact',);
                const field = $("#message");
                field.value = `Hola, Hugo. Me interesa ${subject}.\n\n¿Podrías indicarme disponibilidad, precio y plazo?`;
                const actions = $("#contact-actions");
                if (c.whatsapp) {
                    const a = document.createElement("a");
                    a.className = "btn gold";
                    a.textContent = "Abrir WhatsApp ↗";
                    a.target = "_blank";
                    a.rel = "noopener";
                    const update = () =>
                        (a.href =
                            "https://wa.me/" +
                            c.whatsapp +
                            "?text=" +
                            encodeURIComponent(field.value));
                    update();
                    field.oninput = update;
                    actions.append(a);
                }
                const copy = createBaseButton({ class: c.whatsapp ? "btn contact-dialog__copy" : "btn gold" }, "Copiar mensaje");
                copy.onclick = async () => {
                    try {
                        await navigator.clipboard.writeText(field.value);
                        $("#copy-status").textContent = "Mensaje copiado.";
                    } catch {
                        field.select();
                        $("#copy-status").textContent = "Selecciona y copia el texto.";
                    }
                };
                actions.append(copy);
                $("#contact-notice").textContent = c.whatsapp
                    ? "WhatsApp se abrirá con tu mensaje. Envíalo allí para contactar con el autor."
                    : "WhatsApp no está disponible por ahora. Copia tu mensaje para enviarlo por otro medio.";
                if (c.email) {
                    const email = document.createElement("p");
                    email.textContent = "Correo: " + c.email;
                    content.append(email);
                }
                if (c.paypal) {
                    const p = document.createElement("p");
                    p.textContent =
                        "Realiza el pago solo después de acordar el pedido o la reserva con el autor.";
                    const a = document.createElement("a");
                    a.className = "btn gold";
                    a.href = c.paypal;
                    a.target = "_blank";
                    a.rel = "noopener";
                    a.textContent = "Abrir PayPal ↗";
                    content.append(p, a);
                }
                if (c.delivery) {
                    const p = document.createElement("p");
                    p.textContent = c.delivery;
                    content.append(p);
                }
            }

            function stockLabel(product) {
                const opciones = {
                    available: {
                        clase: "available",
                        texto: "En Stock",
                    },
                    out: {
                        clase: "out",
                        texto: "Sin Stock",
                    },
                    digital: {
                        clase: "digital",
                        texto: "Formato digital",
                    },
                    unknown: {
                        clase: "unknown",
                        texto: "Stock físico a consultar",
                    },
                };

                const stock = opciones[product.physical_stock] || opciones.unknown;

                return `
                    <span class="stock-label stock-label--${stock.clase}">
                        <span class="stock-label__dot" aria-hidden="true"></span>
                        ${stock.texto}
                    </span>
                `;
            }
            function renderProducts() {
                const lista = $("#products");
                if (!lista) return;

                const q = ($("#search")?.value || "").toLocaleLowerCase("es");

                const definicionesCompra = {
                    pdf: {
                        label: "PDF",
                        format: "digital",
                        description: "La aventura en PDF para leerla en pantalla o imprimirla.",
                    },
                    pdf_vtt: {
                        label: "PDF + VTT",
                        format: "digital",
                        description:
                            "PDF y los materiales para mesa virtual incluidos en esta publicación.",
                    },
                    pdf_vtt_json: {
                        label: "PDF + VTT + JSON",
                        format: "digital",
                        description:
                            "PDF, materiales para mesa virtual y archivos JSON. Consulta la plataforma compatible en la descripción de la publicación.",
                    },
                    book: {
                        label: "Libro físico",
                        format: "physical",
                        description:
                            "Ejemplar impreso. Envío pendiente de calcular según destino.",
                    },
                    book_pdf: {
                        label: "Libro + PDF",
                        format: "physical",
                        description:
                            "Ejemplar impreso y PDF. Envío pendiente de calcular según destino.",
                    },
                    book_pdf_vtt: {
                        label: "Libro + PDF + VTT",
                        format: "physical",
                        description:
                            "Ejemplar impreso, PDF y materiales para mesa virtual. Envío pendiente de calcular según destino.",
                    },
                    book_pdf_vtt_json: {
                        label: "Libro + PDF + VTT + JSON",
                        format: "physical",
                        description:
                            "Ejemplar impreso, PDF, materiales para mesa virtual y archivos JSON. Consulta la plataforma compatible en la descripción. Envío pendiente de calcular según destino.",
                    },
                };

                const eurosCompra = (valor) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(valor);

                function paquetesCompra(p) {
                    return (
                        Array.isArray(p.purchase_packages) ? p.purchase_packages : []
                    ).filter(
                        (opcion) =>
                            definicionesCompra[opcion.id] &&
                            Number.isFinite(Number(opcion.price)) &&
                            Number(opcion.price) > 0 &&
                            (filter === "all" || definicionesCompra[opcion.id].format === filter),
                    );
                }

                function precioCompra(p) {
                    const paquetes = paquetesCompra(p);

                    if (!paquetes.length) return "Precio a consultar";

                    const minimo = Math.min(...paquetes.map((opcion) => Number(opcion.price)));

                    return `${paquetes.length > 1 ? "Desde " : ""}${eurosCompra(minimo)}`;
                }

                function selectorCompra(p) {
                    const paquetes = paquetesCompra(p);

                    if (!paquetes.length) {
                        return `
                            <p class="purchase-choice">
                                Consulta con el autor los formatos y precios disponibles.
                            </p>
                        `;
                    }

                    return `
                        <div class="purchase-choice">
                            <label>
                                Elige tu paquete
                                <base-select data-purchase-package>
                                    <option value="">Seleccione...</option>

                                    ${paquetes
                                        .map(
                                            (opcion) => `
                                                <option value="${esc(opcion.id)}">
                                                    ${esc(definicionesCompra[opcion.id].label)}
                                                    · ${esc(eurosCompra(Number(opcion.price)))}
                                                </option>
                                            `,
                                        )
                                        .join("")}
                                </base-select>
                            </label>

                            <p data-purchase-description>
                                Selecciona una opción para ver qué incluye.
                            </p>

                            <p data-purchase-feedback role="status"></p>

                        </div>
                    `;
                }

                const items = site.products.filter(
                    (p) =>
                        (filter === "all" ||
                            p.sale_format === filter ||
                            p.sale_format === "both") &&
                        `${p.title} ${p.intro}`.toLocaleLowerCase("es").includes(q),
                );

                setHtmlWithBaseButtons(lista, items.length
                    ? items
                            .map(
                                (p, index) => `
                                    <article class="product flip-product">
                                        <div class="flip-inner">
                                            <div class="flip-front">
                                                <span class="publication-status ${
                                                    p.status === "Disponible" || p.status === "Publicado"
                                                        ? "publication-status--published"
                                                        : p.status === "Próximamente"
                                                            ? "publication-status--soon"
                                                            : "publication-status--development"
                                                }">
                                                    ${esc(
                                                        p.status === "Disponible"
                                                            ? "Publicado"
                                                            : p.status || "En desarrollo",
                                                    )}
                                                </span>

                                                <div class="cover ${p.color === "blue" ? "blue" : ""}">
                                                    ${
                                                        p.cover
                                                            ? `
                                                                <img
                                                                    class="uploaded-cover"
                                                                    src="${esc(p.cover)}"
                                                                    alt="Portada de ${esc(p.title)}"
                                                                >
                                                            `
                                                            : `
                                                                <small>LA MAZMORRA DEL ROLEO</small>
                                                                <span class="cover-icon">✧</span>
                                                                <strong>${esc(p.title)}</strong>
                                                                <small>UNA HISTORIA PARA TU MESA</small>
                                                            `
                                                    }
                                                </div>

                                                <div class="product-info">
                                                    <div class="product-title-row">
                                                        <h3>${esc(p.title)}</h3>

                                                        <span data-purchase-stock>
                                                            ${p.sale_format === "digital" ? "" : stockLabel(p)}
                                                        </span>
                                                    </div>

                                                    <p>${esc(p.intro)}</p>

                                                    <div class="product-specs">
                                                        <span class="product-specs__tag">
                                                            ${esc(p.level || "Nivel por confirmar")}
                                                        </span>

                                                        <span class="product-specs__tag">
                                                            ${esc(p.players || "Jugadores por confirmar")}
                                                        </span>

                                                        <span class="product-specs__tag">
                                                            ${esc(p.duration || "Duración por confirmar")}
                                                        </span>
            ${
                p.pages
                    ? `<span class="product-specs__tag">
                            ${esc(p.pages)} páginas
                        </span>`
                    : ""
            }
                                                        <span
                                                            class="product-specs__tag product-specs__tag--price"
                                                        >
                                                            <span data-purchase-price>
                                                                ${esc(precioCompra(p))}
                                                            </span>
                                                        </span>
                                                    </div>

                                                    ${selectorCompra(p)}

                                                    <div class="publication-actions">
                                                        <base-button
                                                            data-flip-open
                                                            aria-expanded="false"
                                                            aria-controls="publication-back-${index}"
                                                        >
                                                            Ver publicación ↻
                                                        </base-button>

                                                        ${
                                                            validDemo(p.demo)
                                                                ? `
                                                                    <base-button
                                                                        data-demo="${esc(p.id)}"
                                                                    >
                                                                        Ver demo ↗
                                                                    </base-button>
                                                                `
                                                                : ""
                                                        }

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
                                                id="publication-back-${index}"
                                                aria-hidden="true"
                                                inert
                                            >
                                                <div class="flip-back-heading">
                                                    <span class="eyebrow">${esc(p.label)}</span>
                                                    <h3 tabindex="-1">${esc(p.title)}</h3>

                                                    <span class="badge">
                                                        ${esc(p.status || "En desarrollo")}
                                                    </span>
                                                </div>

                                                        <div class="flip-back-content">
                                                            <p class="preserve-lines">${esc((p.description || "").trim())}</p>

                                                    <dl class="flip-details">
                                                        <div>
                                                            <dt>Nivel</dt>
                                                            <dd>${esc(p.level || "Por confirmar")}</dd>
                                                        </div>

                                                        <div>
                                                            <dt>Jugadores</dt>
                                                            <dd>${esc(p.players || "Por confirmar")}</dd>
                                                        </div>

                                                        <div>
                                                            <dt>Duración</dt>
                                                            <dd>${esc(p.duration || "Por confirmar")}</dd>
                                                        </div>
            ${
                p.pages
                    ? `<div>
                            <dt>Páginas</dt>
                            <dd>${esc(p.pages)}</dd>
                        </div>`
                    : ""
            }

                                                        <div>
                                                            <dt>Precio</dt>
                                                            <dd data-purchase-price>
                                                                ${esc(precioCompra(p))}
                                                            </dd>
                                                        </div>
                                                    </dl>

                                                    ${selectorCompra(p)}

                                                    ${
                                                        validDemo(p.demo)
                                                            ? `
                                                                <div class="publication-actions">
                                                                    <base-button
                                                                        data-demo="${esc(p.id)}"
                                                                    >
                                                                        Ver demo ↗
                                                                    </base-button>
                                                                </div>
                                                            `
                                                            : ""
                                                    }
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
                                `,
                            )
                            .join("")
                    : `
                        <div class="empty">
                            <h3>Aún quedan estantes por llenar.</h3>
                            <p>No hay publicaciones para esta selección.</p>
                        </div>
                    `);

                lista.querySelectorAll(".flip-product").forEach((card, indice) => {
                    card.id = `publicacion-${items[indice].id}`;

                    const publicacionCompra = items[indice];
                    const paquetes = paquetesCompra(publicacionCompra);

                    const selectores = card.querySelectorAll("[data-purchase-package]");

                    const enlacesCompra = card.querySelectorAll(".front-buy, .flip-buy");

                    const publicada = ["Disponible", "Publicado"].includes(
                        publicacionCompra.status,
                    );

                    let paqueteElegido = "";

                    function actualizarCompra() {
                        const opcion = paquetes.find((paquete) => paquete.id === paqueteElegido);

                        const detalle = opcion ? definicionesCompra[opcion.id] : null;

                        const sinStock =
                            detalle?.format === "physical" &&
                            publicacionCompra.physical_stock === "out";

                        const compraDirecta = publicada && opcion && !sinStock;

                        const lineas = [
                            compraDirecta
                                ? `¡Hola, Hugo! Me gustaría comprar «${publicacionCompra.title}».`
                                : `¡Hola, Hugo! Me interesa «${publicacionCompra.title}».`,

                            ...(opcion
                                ? [
                                        `Formato: ${
                                            detalle.format === "digital" ? "Digital" : "Físico"
                                        }.`,
                                        `Paquete: ${detalle.label}.`,
                                        `Precio indicado: ${eurosCompra(Number(opcion.price))}.`,

                                        ...(detalle.format === "physical"
                                            ? ["Envío pendiente de calcular según destino."]
                                            : []),
                                    ]
                                : []),

                            sinStock
                                ? "He visto que no hay stock. ¿Cuándo volverá a estar disponible?"
                                : compraDirecta
                                    ? "¿Cómo realizo el pago y recibo el pedido?"
                                    : "¿Puedes confirmarme disponibilidad y condiciones?",
                        ];

                        const url =
                            "https://wa.me/34666530043?text=" +
                            encodeURIComponent(lineas.join("\n"));

                        selectores.forEach((selector) => {
                            selector.value = paqueteElegido;
                        });

                        card.querySelectorAll("[data-purchase-price]").forEach((nodo) => {
                            nodo.textContent = opcion
                                ? eurosCompra(Number(opcion.price))
                                : precioCompra(publicacionCompra);
                        });

                        card.querySelectorAll("[data-purchase-description]").forEach((nodo) => {
                            nodo.textContent = detalle
                                ? detalle.description
                                : "Selecciona una opción para ver qué incluye.";
                        });

                        card.querySelectorAll("[data-purchase-feedback]").forEach((nodo) => {
                            nodo.textContent = "";
                        });

                        card.querySelectorAll("[data-purchase-stock]").forEach((nodo) => {
                            nodo.hidden = detalle
                                ? detalle.format !== "physical"
                                : filter === "digital" || publicacionCompra.sale_format === "digital";
                        });

                        enlacesCompra.forEach((enlace) => {
                            enlace.href = url;

                            const accion = publicada && !sinStock ? "Comprar" : "Consultar";

                            enlace.textContent = enlace.classList.contains("front-buy")
                                ? `${accion} ↗`
                                : `${accion} por WhatsApp ↗`;
                        });
                    }

                    selectores.forEach((selector) => {
                        selector.addEventListener("change", () => {
                            paqueteElegido = selector.value;
                            actualizarCompra();
                        });
                    });

                    enlacesCompra.forEach((enlace) => {
                        enlace.addEventListener("click", (evento) => {
                            if (!paquetes.length || paqueteElegido) return;

                            evento.preventDefault();

                            const cara = enlace.closest(".flip-front, .flip-back");

                            cara.querySelector("[data-purchase-feedback]").textContent =
                                "Selecciona el paquete que te interesa antes de continuar.";

                            cara.querySelector("[data-purchase-package]").focus();
                        });
                    });

                    actualizarCompra();

                    const frontal = card.querySelector(".flip-front");
                    const reverso = card.querySelector(".flip-back");
                    const abrir = card.querySelector("[data-flip-open]");

                    let ventanaCard = null;
                    let marcadorCard = null;
                    let scrollCarrusel = 0;
                    let focoAnterior = null;

                    async function cerrarCard() {
                        if (!ventanaCard || card.dataset.closing === "true") return;

                        card.dataset.closing = "true";

                        const ventana = ventanaCard;

                        lista.scrollLeft = scrollCarrusel;

                        const origen = card.getBoundingClientRect();
                        const destino = marcadorCard?.getBoundingClientRect();

                        card.classList.remove("is-flipped");

                        const reducir = window.matchMedia(
                            "(prefers-reduced-motion: reduce)",
                        ).matches;

                        let animacion = null;

                        if (destino && !reducir && origen.width && origen.height) {
                            card.style.animation = "none";

                            Object.assign(card.style, {
                                position: "fixed",
                                left: `${origen.left}px`,
                                top: `${origen.top}px`,
                                width: `${origen.width}px`,
                                height: `${origen.height}px`,
                                margin: "0",
                                transform: "none",
                                transition: "none",
                            });

                            animacion = card.animate(
                                [
                                    {
                                        left: `${origen.left}px`,
                                        top: `${origen.top}px`,
                                        width: `${origen.width}px`,
                                        height: `${origen.height}px`,
                                    },
                                    {
                                        left: `${destino.left}px`,
                                        top: `${destino.top}px`,
                                        width: `${destino.width}px`,
                                        height: `${destino.height}px`,
                                    },
                                ],
                                {
                                    duration: 650,
                                    easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                                    fill: "forwards",
                                },
                            );

                            ventana.classList.add("card-lightbox-closing");

                            try {
                                await animacion.finished;
                            } catch {

                            }
                        }

                        frontal.inert = false;
                        reverso.inert = true;

                        frontal.setAttribute("aria-hidden", "false");
                        reverso.setAttribute("aria-hidden", "true");
                        abrir.setAttribute("aria-expanded", "false");

                        card.classList.remove("card-ampliada");

                        if (marcadorCard?.isConnected) {
                            marcadorCard.replaceWith(card);
                        }

                        animacion?.cancel();

                        [
                            "position",
                            "left",
                            "top",
                            "width",
                            "height",
                            "margin",
                            "transform",
                            "transition",
                        ].forEach((propiedad) => {
                            card.style.removeProperty(propiedad);
                        });

                        card.style.removeProperty("animation");
                        delete card.dataset.closing;

                        marcadorCard = null;
                        ventanaCard = null;

                        if (ventana.open) ventana.close();
                        ventana.remove();

                        requestAnimationFrame(() => {
                            lista.scrollLeft = scrollCarrusel;

                            if (focoAnterior?.isConnected) {
                                focoAnterior.focus({ preventScroll: true });
                            }
                        });
                    }

                    function voltear(activo) {
                        if (!activo) {
                            cerrarCard();
                            return;
                        }

                        if (ventanaCard) return;

                        focoAnterior = abrir;
                        scrollCarrusel = lista.scrollLeft;

                        marcadorCard = document.createElement("div");
                        marcadorCard.className = "card-placeholder";
                        marcadorCard.style.height = `${card.offsetHeight}px`;
                        marcadorCard.setAttribute("aria-hidden", "true");

                        card.before(marcadorCard);

                        ventanaCard = document.createElement("dialog");
                        ventanaCard.className = "card-lightbox";

                        ventanaCard.setAttribute(
                            "aria-label",
                            card.querySelector("h3")?.textContent ||
                                "Información de la publicación",
                        );

                        lista.append(ventanaCard);
                        ventanaCard.append(card);

                        card.classList.add("card-ampliada");

                        frontal.inert = true;
                        reverso.inert = false;

                        frontal.setAttribute("aria-hidden", "true");
                        reverso.setAttribute("aria-hidden", "false");
                        abrir.setAttribute("aria-expanded", "true");

                        ventanaCard.addEventListener("cancel", (evento) => {
                            evento.preventDefault();
                            cerrarCard();
                        });

                        let empiezaFuera = false;

                        ventanaCard.addEventListener("pointerdown", (evento) => {
                            empiezaFuera = evento.target === ventanaCard;
                        });

                        ventanaCard.addEventListener("click", (evento) => {
                            if (empiezaFuera && evento.target === ventanaCard) {
                                cerrarCard();
                            }

                            empiezaFuera = false;
                        });

                        ventanaCard.showModal();

                        requestAnimationFrame(() => {
                            if (!ventanaCard) return;

                            card.classList.add("is-flipped");
                            reverso.querySelector("h3").focus({ preventScroll: true });

                            lista.scrollLeft = scrollCarrusel;
                        });
                    }

                    abrir.onclick = () => voltear(true);

                    let destinoInicial = "";

                    try {
                        destinoInicial = decodeURIComponent(window.location.hash.slice(1));
                    } catch {
                        destinoInicial = "";
                    }

                    if (destinoInicial && destinoInicial === card.id) {

                        history.replaceState(
                            null,
                            "",
                            window.location.pathname + window.location.search,
                        );

                        requestAnimationFrame(() => {
                            if (!card.isConnected) return;

                            card.scrollIntoView({
                                behavior: "auto",
                                block: "center",
                                inline: "center",
                            });

                            requestAnimationFrame(() => {
                                if (card.isConnected) {
                                    voltear(true);
                                }
                            });
                        });
                    }

                    let inicio = null;

                    frontal.addEventListener("pointerdown", (evento) => {
                        inicio = {
                            x: evento.clientX,
                            y: evento.clientY,
                            scroll: lista.scrollLeft,
                        };
                    });

                    frontal.addEventListener("click", (evento) => {
                        if (
                            evento.target.closest(
                                "button, a, input, select, textarea, label, .purchase-choice",
                            )
                        ) {
                            return;
                        }

                        if (!inicio) return;

                        const seMovio =
                            Math.abs(evento.clientX - inicio.x) > 8 ||
                            Math.abs(evento.clientY - inicio.y) > 8 ||
                            Math.abs(lista.scrollLeft - inicio.scroll) > 8;

                        inicio = null;

                        if (seMovio || window.getSelection()?.toString()) return;

                        voltear(true);
                    });

                    card.addEventListener("keydown", (evento) => {
                        if (evento.key === "Escape" && card.classList.contains("is-flipped")) {
                            evento.preventDefault();
                            voltear(false);
                        }
                    });
                });
            }
            if ($("#search")) {
                $("#search").oninput = renderProducts;
                document.querySelectorAll("[data-filter]").forEach(
                    (b) =>
                        (b.onclick = () => {
                            filter = b.dataset.filter;
                            document
                                .querySelectorAll("[data-filter]")
                                .forEach((x) => x.classList.toggle("active", x === b));
                            renderProducts();
                        }),
                );
                renderProducts();
            }
            document
                .querySelectorAll("[data-service]")
                .forEach((b) => (b.onclick = () => contact(b.dataset.service)));
            if ($("#contact-button")) $("#contact-button").onclick = () => contact();
            if ($("#contact-status"))
                $("#contact-status").textContent = site.config.whatsapp
                    ? "Contacta por WhatsApp y acuerda los detalles con el autor."
                    : "WhatsApp no está disponible por ahora. Copia tu mensaje para enviarlo por otro medio.";
            document
                .querySelectorAll("[data-legal]")
                .forEach(
                    (b) =>
                        (b.onclick = () =>
                            openDialog(
                                b.dataset.legal === "privacy"
                                    ? '<p class="eyebrow">PRIVACIDAD · INFORMACIÓN PROVISIONAL</p><h2>Datos de las solicitudes.</h2><p>Al solicitar una partida, se guardan tu nombre o alias, contacto, número de jugadores y notas para que el director pueda tramitarla. Solo el administrador puede consultar estos datos. No introduzcas información sensible en las notas.</p><p>Las cuentas guardan nombre, correo, contacto y una contraseña protegida mediante hash, además de su vinculación con las reservas. El acceso utiliza una cookie de sesión necesaria. La administración utiliza una cookie de sesión necesaria para el acceso privado. No hay analítica publicitaria incorporada.</p><p>Antes del lanzamiento público, el propietario debe completar esta política con sus datos, base jurídica, plazos de conservación, proveedores y medios para ejercer derechos.</p>'
                                    : '<p class="eyebrow">LA MAZMORRA DEL ROLEO</p><h2>Información del proyecto.</h2><p>Proyecto independiente de Hugo Durán. Las compras y los pagos se acuerdan directamente con el autor. Las solicitudes de partida requieren confirmación expresa del director.</p><p>Antes de abrir las ventas al público se deben completar los datos del vendedor, condiciones de compra, cancelación y entrega, y atribuciones de las publicaciones. No existe afiliación con Wizards of the Coast.</p>',
                            )),
                );
            if ($("#calendar-days")) {
                const today = new Intl.DateTimeFormat("sv-SE", {
                    timeZone: "Europe/Madrid",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).format(new Date());
                let shown = new Date(today + "T12:00:00");
                shown.setDate(1);
                let selected = today;
                const requestedGameId = new URLSearchParams(window.location.search).get(
                    "partida",
                );

                const requestedGame = site.games.find(
                    (game) => String(game.id) === requestedGameId,
                );

                if (requestedGame && new Date(requestedGame.starts) > new Date()) {
                    selected = new Intl.DateTimeFormat("sv-SE", {
                        timeZone: "Europe/Madrid",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(new Date(requestedGame.starts));

                    shown = new Date(selected + "T12:00:00");
                    shown.setDate(1);
                }
                const iso = (d) =>
                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                const dateOf = (timestamp) =>
                    new Intl.DateTimeFormat("sv-SE", {
                        timeZone: "Europe/Madrid",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(new Date(timestamp));
                const longDate = (value) =>
                    new Date(value + "T12:00:00").toLocaleDateString("es-ES", {
                        dateStyle: "full",
                    });
                const liveGames = () =>
                    site.games.filter((g) => new Date(g.starts) > new Date());
                const proposeDateButton = $("#propose-date");

                if (proposeDateButton) {
                    proposeDateButton.hidden = true;
                }
                function calendar() {
                    const games = liveGames();
                    $("#month-label").textContent = shown.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                    });
                    const days = $("#calendar-days");

                    days.dataset.selectedDate = selected;
                    days.replaceChildren();
                    for (let i = 0; i < (shown.getDay() + 6) % 7; i++)
                        days.append(document.createElement("span"));
                    const last = new Date(
                        shown.getFullYear(),
                        shown.getMonth() + 1,
                        0,
                    ).getDate();
                    for (let n = 1; n <= last; n++) {
                        const value = iso(new Date(shown.getFullYear(), shown.getMonth(), n, 12)),
                            count = games.filter((g) => dateOf(g.starts) === value).length,
                            b = createBaseButton(
                                { class: { today: value === today, selected: value === selected } },
                                n + (count ? " ·" : ""),
                            );
                        b.disabled = value < today;
                        b.setAttribute(
                            "aria-label",
                            longDate(value) +
                                (count ? ` · ${count} partida(s)` : " · Sin partidas"),
                        );
                        b.setAttribute("aria-pressed", String(value === selected));
                        b.onclick = () => {
                            selected = value;
                            calendar();
                            sessions();
                        };
                        days.append(b);
                    }
                }
                function sessions() {
                    $("#selected-date").textContent = longDate(selected);
                    const games = liveGames().filter((g) => dateOf(g.starts) === selected);
                    setHtmlWithBaseButtons($("#session-list"), games.length
                        ? games
                                .map(
                                    (g) =>
                                        `<article class="session-card"><h3>${esc(g.title)}</h3><p>${esc(new Date(g.starts).toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit" }))} (Madrid) · ${esc(g.duration)}<br>${esc(g.mode)}<br>${esc(g.price || "Precio por confirmar")} · ${g.available} plaza(s) disponibles</p><p class="preserve-lines">${esc(g.description)}</p><base-button class="btn gold" data-book="${g.id}" data-waitlist="${g.available < 1 ? "true" : "false"}">${g.available < 1 ? "Apuntarme a la lista de espera ↗" : "Solicitar plaza ↗"}</base-button></article>`,
                                )
                                .join("")
                        : `<div class="calendar-empty-invite">
                    <h3>¡Este día puede ser vuestra próxima aventura!</h3>
                    <p>
                        No hay sesiones publicadas para esta fecha.
                        Solicita una partida para tu grupo.
                    </p>
                    <span class="calendar-empty-arrow" aria-hidden="true">↓</span>
                </div>`);
                    document
                        .querySelectorAll("[data-book]")
                        .forEach(
                            (b) =>
                                (b.onclick = () =>
                                    booking(site.games.find((g) => g.id === b.dataset.book), b.dataset.waitlist === "true")),
                        );

                }
                function booking(g, waiting = false) {
                    openDialog(
                        `<p class="eyebrow">${waiting ? "LISTA DE ESPERA" : "SOLICITUD DE PLAZA"}</p><h2>${esc(g.title)}</h2><p>${esc(new Date(g.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))} (Madrid) · ${esc(g.price || "Precio por confirmar")}</p><p class="notice">La solicitud queda pendiente hasta que el director la confirme. ${waiting ? "La sesión está completa. Esta solicitud te añade a la lista de espera; no reserva plazas ni garantiza una vacante." : "Las solicitudes pendientes no bloquean plazas."}</p><form id="booking-form"><div class="booking-fields"><label>Nombre o alias<input name="name" maxlength="80" required autocomplete="nickname"></label><label>Jugadores<input name="players" type="number" min="1" max="${waiting ? 20 : Math.min(20, g.available)}" value="1" required></label><label class="wide">Correo o teléfono de contacto<input name="contact" maxlength="200" required></label><label class="wide">Notas<textarea name="notes" maxlength="1500" placeholder="Experiencia, dudas o preferencias del grupo. No incluyas datos sensibles."></textarea></label><base-checkbox label-class="wide consent" name="consent" required> He leído la información de privacidad y acepto que se utilicen estos datos para tramitar mi solicitud.</base-checkbox></div><base-button class="btn gold" type="submit">${waiting ? "Apuntarme a la lista de espera" : "Enviar solicitud"}</base-button><p id="booking-status" role="status"></p></form>`,
                    );
                    agendaClient.autofill($("#booking-form"));
                    $("#booking-form").onsubmit = async (e) => {
                        e.preventDefault();
                        const f = e.target,
                            button = f.querySelector("button");
                        button.disabled = true;
                        const data = Object.fromEntries(new FormData(f));
                        try {
                            const response = await requestWithStatus("api/reservations", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                data: JSON.stringify({
                                    ...data,
                                    game_id: g.id,
                                    waitlist: waiting,
                                    players: Number(data.players),
                                    consent: f.elements.consent.checked,
                                }),
                            });
                            const r = response.data;
                            if ((response.status < 200 || response.status >= 300)) throw Error(r.error);
                            content.innerHTML = `<p class="eyebrow">SOLICITUD RECIBIDA</p><h2>${r.waitlisted ? "Ya estás en la lista de espera" : "¡Ya está en la mesa!"}</h2><p>${r.waitlisted ? "Si se libera una plaza, el máster revisará la lista y contactará contigo. No hay plaza reservada ni asignación automática." : "El director ha recibido tu solicitud y la revisará."} La reserva todavía no está confirmada; no realices ningún pago hasta acordar las condiciones.</p><p>Referencia: <strong>${esc(r.reference)}</strong></p><p>El director te responderá por el contacto que has indicado. No se ha enviado un correo automático.</p>`;
                            const updated = await requestWithStatus("api/public");
                            if (updated.status === 200) site = updated.data;
                            calendar();
                            sessions();
                        } catch (err) {
                            if ($("#booking-status"))
                                $("#booking-status").textContent = err.message;
                            button.disabled = false;
                        }
                    };
                }
                $("#previous-month").onclick = () => {
                    shown = new Date(shown.getFullYear(), shown.getMonth() - 1, 1, 12);
                    calendar();
                };
                $("#next-month").onclick = () => {
                    shown = new Date(shown.getFullYear(), shown.getMonth() + 1, 1, 12);
                    calendar();
                };
                $("#today-month").onclick = () => {
                    shown = new Date(today + "T12:00:00");
                    shown.setDate(1);
                    selected = today;
                    calendar();
                    sessions();
                };
                calendar();
                sessions();
            }

            if (site.error) {
                const alert = document.createElement("p");
                alert.className = "notice";
                alert.textContent = site.error;
                document.querySelector("main").prepend(alert);
            }

            if ($("#preview-select")) {
                const select = $("#preview-select"),
                    frame = $("#preview-frame"),
                    link = $("#preview-link");
                const previews = (site.config.previews || []).filter(
                    (p) =>
                        typeof p.title === "string" &&
                        /^https:\/\/heyzine\.com\/flip-book\/[a-zA-Z0-9_-]+\.html$/.test(p.url),
                );
                select.replaceChildren(new Option("Selecciona una aventura…", ""));
                previews.forEach((p, i) => select.add(new Option(p.title, String(i))));
                select.disabled = previews.length === 0;
                $("#preview-status").textContent = site.error
                    ? "No se han podido cargar las muestras. Comprueba la conexión con la base de datos."
                    : previews.length
                        ? "Selecciona una muestra para abrir el visor."
                        : "Próximamente habrá muestras disponibles.";
                select.onchange = () => {
                    frame.hidden = link.hidden = true;
                    frame.removeAttribute("src");
                    link.removeAttribute("href");
                    if (select.value === "") {
                        $("#preview-status").textContent =
                            "Selecciona una muestra para abrir el visor.";
                        return;
                    }
                    const p = previews[Number(select.value)];
                    frame.src = p.url;
                    frame.title = "Muestra: " + p.title;
                    link.href = p.url;
                    frame.hidden = link.hidden = false;
                    $("#preview-status").textContent = "Muestra seleccionada: " + p.title;
                };
            }

            function validDemo(url) {
                return (
                    typeof url === "string" &&
                    /^https:\/\/heyzine\.com\/flip-book\/[a-zA-Z0-9_-]+\.html$/.test(url)
                );
            }
            const productGrid = $("#products");
            if (productGrid)
                productGrid.addEventListener("click", (event) => {
                    const button = event.target.closest("[data-demo]");
                    if (!button) return;
                    const product = site.products.find((p) => p.id === button.dataset.demo);
                    if (!product || !validDemo(product.demo)) return;
                    modal.classList.add("demo-modal");
                    openDialog(
                        `<p class="eyebrow">MUESTRA DE LA AVENTURA</p><h2>${esc(product.title)}</h2><iframe class="book-demo" src="${esc(product.demo)}" title="Demo de ${esc(product.title)}" allowfullscreen></iframe><p><a class="btn gold" href="${esc(product.demo)}" target="_blank" rel="noopener noreferrer">Abrir en Heyzine ↗</a></p>`,
                    );
                });
            modal.addEventListener("close", () => {
                modal.classList.remove("demo-modal");
                content.replaceChildren();
            });

            (() => {
                function iniciar() {
                    const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");

                    if (preferencia.matches || !("IntersectionObserver" in window)) {
                        return;
                    }

                    const registrados = new WeakSet();

                    const cards = [
                        ".card",
                        ".product-card",
                        ".session-card",
                        ".commission-step",
                        ".commission-card",
                        ".faq details",
                    ].join(", ");

                    const bloques = [
                        "main > section",
                        ".author-card",
                        ".site-footer__main",
                        "[data-reveal]",
                    ].join(", ");

                    const selector = `${bloques}, ${cards}`;

                    const observer = new IntersectionObserver(
                        (entradas) => {
                            entradas.forEach((entrada) => {
                                if (!entrada.isIntersecting) return;

                                entrada.target.classList.add("is-visible");
                                observer.unobserve(entrada.target);
                            });
                        },
                        {
                            threshold: 0,
                            rootMargin: "0px 0px -35px 0px",
                        },
                    );

                    function registrar(elemento) {

                        if (
                            elemento.matches(".booking-guide") ||
                            (elemento.matches(".commission-block") && elemento.querySelector(".commission-cards")) ||
                            elemento.closest(".commission-cards") ||
                            elemento.closest(".booking-guide")
                        ) {
                            return;
                        }
                        if (registrados.has(elemento)) return;
                        registrados.add(elemento);

                        if (
                            !elemento.hasAttribute("data-reveal") &&
                            elemento.querySelector(selector)
                        ) {
                            return;
                        }

                        const rect = elemento.getBoundingClientRect();

                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            return;
                        }

                        if (!elemento.hasAttribute("data-reveal")) {
                            elemento.dataset.reveal = elemento.matches(".author-card")
                                ? "zoom"
                                : "up";
                        }

                        if (elemento.matches(cards) && elemento.parentElement) {
                            const hermanas = Array.from(elemento.parentElement.children).filter(
                                (hijo) => hijo.matches(cards),
                            );

                            const posicion = hermanas.indexOf(elemento);

                            elemento.style.setProperty(
                                "--reveal-delay",
                                `${Math.min(Math.max(posicion, 0), 3) * 80}ms`,
                            );
                        }

                        elemento.classList.add("scroll-reveal");
                        observer.observe(elemento);
                    }

                    function buscar(raiz) {
                        if (!(raiz instanceof Element)) return;

                        if (raiz.matches(selector)) registrar(raiz);
                        raiz.querySelectorAll(selector).forEach(registrar);
                    }

                    buscar(document.body);

                    const cambios = new MutationObserver((mutaciones) => {
                        mutaciones.forEach((mutacion) => {
                            mutacion.addedNodes.forEach(buscar);

                            mutacion.removedNodes.forEach((nodo) => {
                                if (!(nodo instanceof Element)) return;

                                observer.unobserve(nodo);
                                nodo.querySelectorAll(".scroll-reveal").forEach((elemento) => {
                                    observer.unobserve(elemento);
                                });
                            });
                        });
                    });

                    cambios.observe(document.body, {
                        childList: true,
                        subtree: true,
                    });

                    preferencia.addEventListener("change", (evento) => {
                        if (!evento.matches) return;

                        observer.disconnect();
                        cambios.disconnect();

                        document.querySelectorAll(".scroll-reveal").forEach((elemento) => {
                            elemento.classList.add("is-visible");
                        });
                    });
                }

                if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", iniciar, {
                        once: true,
                    });
                } else {
                    iniciar();
                }
            })();

            (() => {
                const steps = document.querySelector(".booking-guide__steps");

                if (
                    !steps ||
                    !("IntersectionObserver" in window) ||
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ) {
                    return;
                }

                const observer = new IntersectionObserver(
                    (entries) => {
                        if (!entries.some((entry) => entry.isIntersecting)) return;

                        steps.classList.add("is-entering");
                        observer.disconnect();
                    },
                    {
                        threshold: 0.15,
                    },
                );

                observer.observe(steps);
            })();

            (() => {
                function iniciarPergaminos() {
                    const group = document.querySelector('.commission-cards');
                    if (!group || !('IntersectionObserver' in window) ||
                            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    const observer = new IntersectionObserver(entries => {
                        if (!entries.some(entry => entry.isIntersecting)) return;
                        group.classList.add('commission-cards--entering');
                        observer.disconnect();
                    }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
                    observer.observe(group);
                }
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', iniciarPergaminos, {once: true});
                } else iniciarPergaminos();
            })();

            document.querySelectorAll('.faq details, #formatos-envios .formats-guide__questions details, #commission-faq-questions details').forEach((details) => {
                const summary = details.querySelector('summary');
                const answer = details.querySelector('.formats-guide__answer') || details.querySelector('p');
                if (!summary || !answer || !details.animate) return;
                let animation;
                let closing = false;
                summary.addEventListener('click', (event) => {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    event.preventDefault();
                    const wasClosing = closing;
                    const start = details.offsetHeight;
                    animation?.cancel();
                    closing = details.open && !wasClosing;
                    if (!details.open) details.open = true;
                    details.classList.toggle('faq-closing', closing);
                    const end = closing ? summary.offsetHeight : summary.offsetHeight + answer.offsetHeight;
                    details.style.overflow = 'hidden';
                    animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
                        duration: 320, easing: 'cubic-bezier(.22, 1, .36, 1)',
                    });
                    animation.onfinish = () => {
                        if (closing) details.open = false;
                        details.classList.remove('faq-closing');
                        details.style.overflow = '';
                        closing = false;
                        animation = null;
                    };
                });
            });

            document.querySelectorAll('.booking-guide__formats').forEach((details) => {
                const summary = details.querySelector('summary');
                if (!summary || !details.animate) return;
                let animation = null;
                let closing = false;
                summary.addEventListener('click', (event) => {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    event.preventDefault();
                    const start = details.getBoundingClientRect().height;
                    const wasClosing = closing;
                    animation?.cancel();
                    closing = details.open && !wasClosing;
                    if (!details.open) details.open = true;
                    details.classList.toggle('is-closing', closing);
                    const style = getComputedStyle(details);
                    const borders = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
                    const closedHeight = summary.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + borders;
                    const end = closing ? closedHeight : details.scrollHeight + borders;
                    details.style.overflow = 'hidden';
                    animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
                        duration: 380, easing: 'cubic-bezier(.22, 1, .36, 1)',
                    });
                    animation.onfinish = () => {
                        if (closing) details.open = false;
                        details.classList.remove('is-closing');
                        details.style.overflow = '';
                        closing = false;
                        animation = null;
                    };
                });
            });

            (() => {
                const lista = document.querySelector(".book-carousel #products");
                const anterior = document.querySelector("#books-prev");
                const siguiente = document.querySelector("#books-next");

                if (!lista || !anterior || !siguiente) return;

                const reducirMovimiento = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                );

            function actualizarFlechas() {
                    const limite = Math.max(0, lista.scrollWidth - lista.clientWidth);

                    anterior.parentElement.hidden = limite <= 2;
                    anterior.disabled = lista.scrollLeft <= 2;
                    siguiente.disabled = lista.scrollLeft >= limite - 2;
                }

                function mover(direccion) {
                    const card = lista.querySelector(".product");
                    if (!card) return;

                    const estilos = getComputedStyle(lista);
                    const espacio = parseFloat(estilos.columnGap) || 0;

                    lista.scrollBy({
                        left: direccion * (card.getBoundingClientRect().width + espacio),
                        behavior: reducirMovimiento.matches ? "instant" : "smooth",
                    });
                }

                anterior.addEventListener("click", () => mover(-1));
                siguiente.addEventListener("click", () => mover(1));

                lista.addEventListener("keydown", (evento) => {
                    if (evento.target !== lista) return;

                    if (evento.key === "ArrowRight") {
                        evento.preventDefault();
                        mover(1);
                    }

                    if (evento.key === "ArrowLeft") {
                        evento.preventDefault();
                        mover(-1);
                    }
                });

                function actualizarCatalogo() {
                    lista.scrollLeft = 0;

                    requestAnimationFrame(actualizarFlechas);
                }

                new MutationObserver(actualizarCatalogo).observe(lista, {
                    childList: true,
                });

                lista.addEventListener("scroll", actualizarFlechas, { passive: true });
                lista.addEventListener("load", actualizarFlechas, true);

                if ("ResizeObserver" in window) {
                    new ResizeObserver(actualizarFlechas).observe(lista);
                } else {
                    window.addEventListener("resize", actualizarFlechas);
                }

            actualizarCatalogo();
            })();

            (() => {
                const money = (n) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(n);
                let dialog = null;
                document.addEventListener("click", (e) => {
                    const link = e.target.closest("a.front-buy, a.flip-buy");
                    if (!link || e.defaultPrevented) return;
                    const card = link.closest(".flip-product");
                    const packageId = card?.querySelector("[data-purchase-package]")?.value;
                    if (!packageId?.startsWith("book")) return;
                    const product = (siteData?.products || []).find(
                        (p) => "publicacion-" + p.id === card.id,
                    );
                    if (
                        !product ||
                        !["Disponible", "Publicado"].includes(product.status) ||
                        product.physical_stock === "out"
                    )
                        return;
                    e.preventDefault();
                    if (dialog?.open) return;
                    const previousFocus = document.activeElement;
                    const modal = document.createElement("dialog");
                    dialog = modal;
                    modal.className = "shipping-dialog";
                    modal.setAttribute("aria-labelledby", "shipping-title");
                    setHtmlWithBaseButtons(modal, `<base-button class="shipping-close" aria-label="Cerrar calculadora">×</base-button>
                        <p class="eyebrow">TU PEDIDO</p><h2 id="shipping-title">Calcula el envío.</h2>
                        <p data-product></p><p>Calculamos un sobre de hasta 5 kg, incluido el embalaje. Los pedidos que no quepan se confirman por WhatsApp antes del pago.</p>
                        <form><label>Cantidad de ejemplares<input name="quantity" type="number" min="1" max="100" step="1" value="1" required></label>
                            <label>Destino<base-select name="country"><option value="ES">España</option><option value="OTHER">Otro país · consultar</option></base-select></label>
                            <label>Código postal<input name="postcode" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" required autocomplete="postal-code"></label>
                            <label>Localidad / ciudad<input name="city" maxlength="180" readonly autocomplete="address-level2" placeholder="Introduce primero el código postal"></label>
                            <label hidden>Selecciona tu localidad<base-select name="city_choice" disabled></base-select></label>
                            <p data-city-status role="status" aria-live="polite"></p>
                            <base-button type="submit" class="btn gold">Calcular envío</base-button>
                        </form>
                        <div class="shipping-result" role="status" aria-live="polite"></div>
                        <a class="btn shipping-whatsapp" target="_blank" rel="noopener noreferrer" hidden>Continuar por WhatsApp ↗</a>`);
                    document.body.append(modal);
                    modal.querySelector("[data-product]").textContent = product.title;
                    const f = modal.querySelector("form"),
                        cp = f.elements.postcode,
                        city = f.elements.city;
                    const choice = f.elements.city_choice,
                        hint = modal.querySelector("[data-city-status]");
                    const result = modal.querySelector(".shipping-result"),
                        next = modal.querySelector(".shipping-whatsapp");
                    const calc = f.querySelector("button");
                    let quoteVersion = 0,
                        lookupVersion = 0,
                        quoteAbort = null,
                        lookupAbort = null;
                    let timer = null,
                        resolvedCP = "",
                        cities = [];
                    const domestic = () => f.elements.country.value === "ES";
                    const selectedCity = () =>
                        cities.length > 1 ? choice.value : city.value.trim();
                    function invalidate() {
                        quoteVersion++;
                        quoteAbort?.abort();
                        quoteAbort = null;
                        next.hidden = true;
                        next.removeAttribute("href");
                        result.textContent = "";
                        calc.disabled = false;
                    }
                    function cityMode(locked) {
                        city.readOnly = locked;
                        city.required = !locked;
                        city.style.backgroundColor = locked ? "#e7e7e3" : "#fff";
                        city.style.color = "#243329";
                    }
                    function resetCity() {
                        lookupVersion++;
                        lookupAbort?.abort();
                        clearTimeout(timer);
                        resolvedCP = "";
                        cities = [];
                        city.value = "";
                        city.hidden = false;
                        city.closest("label").hidden = false;
                        choice.replaceChildren();
                        choice.disabled = true;
                        choice.required = false;
                        choice.closest("label").hidden = true;
                        hint.textContent = "";
                        cityMode(domestic());
                        city.placeholder = domestic()
                            ? "Introduce primero el código postal"
                            : "Escribe tu localidad";
                    }
                    function manualConsultation() {
                        result.textContent =
                            "No podemos calcular este envío automáticamente. Confirma el destino por WhatsApp.";
                        const phone = String(
                            siteData?.config?.whatsapp || "34666530043",
                        ).replace(/\D/g, "");
                        next.href =
                            "https://wa.me/" +
                            phone +
                            "?text=" +
                            encodeURIComponent(
                                `¡Hola, Hugo! Quiero comprar «${product.title}», paquete ${packageId}, ${f.elements.quantity.value} ejemplar(es). Destino: España, CP ${cp.value.trim()}. La web no ha podido identificar mi localidad. ¿Me confirmas localidad, envío, disponibilidad y total?`,
                            );
                        next.hidden = false;
                    }
                    async function lookup() {
                        if (
                            !domestic() ||
                            !/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/.test(cp.value.trim())
                        )
                            return;
                        const version = lookupVersion,
                            postcode = cp.value.trim();
                        lookupAbort = new AbortController();
                        hint.textContent = "Buscando localidad…";
                        try {
                            const response = await requestWithStatus(
                                "api/localities?postcode=" + encodeURIComponent(postcode),
                                { signal: lookupAbort.signal, cache: "no-store" },
                            );
                            const data = response.data;
                            if (version !== lookupVersion || !modal.open) return;
                            if ((response.status < 200 || response.status >= 300) || !Array.isArray(data.cities))
                                throw Error("No se pudo consultar la localidad.");
                            cities = data.cities;
                            resolvedCP = postcode;
                            if (!cities.length) {
                                hint.textContent =
                                    "Código no encontrado en nuestro catálogo. Consulta el destino por WhatsApp.";
                                manualConsultation();
                            } else if (cities.length === 1) {
                                city.value = cities[0];
                                hint.textContent = "Localidad identificada automáticamente.";
                            } else {
                                city.closest("label").hidden = true;
                                choice.closest("label").hidden = false;
                                choice.disabled = false;
                                choice.required = true;
                                choice.add(new Option("Selecciona tu localidad", ""));
                                cities.forEach((name) => choice.add(new Option(name, name)));
                                hint.textContent =
                                    "Este código tiene varias localidades. Selecciona la tuya.";
                            }
                        } catch (err) {
                            if (version !== lookupVersion || err.name === "AbortError") return;
                            hint.textContent =
                                "No se pudo buscar la localidad. Vuelve a introducir el código postal o consulta por WhatsApp.";
                            manualConsultation();
                        }
                    }
                    f.addEventListener("input", (e) => {
                        invalidate();
                        if (e.target === cp) {
                            resetCity();
                            if (cp.value.trim().length === 5) timer = setTimeout(lookup, 250);
                        }
                    });
                    choice.addEventListener("change", invalidate);
                    f.elements.country.onchange = () => {
                        invalidate();
                        cp.required = domestic();
                        cp.disabled = !domestic();
                        resetCity();
                        calc.textContent = domestic()
                            ? "Calcular envío"
                            : "Consultar envío internacional";
                        if (domestic()) lookup();
                    };
                    const close = () => modal.close();
                    modal.querySelector(".shipping-close").onclick = close;
                    modal.addEventListener("cancel", (e) => {
                        e.preventDefault();
                        close();
                    });
                    let outside = false;
                    modal.addEventListener("pointerdown", (e) => {
                        outside = e.target === modal;
                    });
                    modal.addEventListener("click", (e) => {
                        if (e.target !== modal || !outside) return;
                        const r = modal.getBoundingClientRect();
                        if (
                            e.clientX < r.left ||
                            e.clientX > r.right ||
                            e.clientY < r.top ||
                            e.clientY > r.bottom
                        )
                            close();
                    });
                    modal.addEventListener(
                        "close",
                        () => {
                            invalidate();
                            lookupVersion++;
                            lookupAbort?.abort();
                            clearTimeout(timer);
                            modal.remove();
                            dialog = null;
                            if (previousFocus?.isConnected)
                                previousFocus.focus({ preventScroll: true });
                        },
                        { once: true },
                    );
                    f.onsubmit = async (e) => {
                        e.preventDefault();
                        invalidate();
                        const postcode = domestic() ? cp.value.trim() : "";
                        const locality = domestic() ? selectedCity() : city.value.trim();
                        if (
                            domestic() &&
                            (resolvedCP !== postcode || !cities.includes(locality))
                        ) {
                            result.textContent =
                                "Espera a que se identifique la localidad y selecciónala si hay varias.";
                            return;
                        }
                        if (!locality) {
                            result.textContent = "Introduce tu localidad.";
                            return;
                        }
                        const token = quoteVersion;
                        calc.disabled = true;
                        quoteAbort = new AbortController();
                        result.textContent = "Consultando el envío…";
                        try {
                            const response = await requestWithStatus(
                                "api/shipping/quote",
                                {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    data: JSON.stringify({
                                        product_id: product.id,
                                        package_id: packageId,
                                        country: domestic() ? "ES" : "XX",
                                        postcode,
                                        city: locality,
                                        quantity: Number(f.elements.quantity.value),
                                    }),
                                    signal: quoteAbort.signal,
                                },
                            );
                            const data = response.data;
                            if (token !== quoteVersion || !modal.open) return;
                            if ((response.status < 200 || response.status >= 300))
                                throw Error(data.error || "No se pudo calcular el envío.");
                            result.replaceChildren();
                            const lines = [
                                ["Destino", domestic() ? `${locality}, ${postcode}` : locality],
                                ["Paquete", data.package_label],
                                ["Cantidad", String(data.quantity)],
                                ["Precio por ejemplar", money(data.unit_price)],
                                ["Subtotal de libros", money(data.product_price)],
                                [
                                    "Envío",
                                    data.available ? money(data.shipping_price) : "A consultar",
                                ],
                            ];
                            if (data.available) {
                                lines.push([
                                    "Embalaje incluido",
                                    data.packaging_label + " · " + money(data.packaging_fee),
                                ]);
                                lines.push(["Total", money(data.total)]);
                            }
                            const dl = document.createElement("dl");
                            lines.forEach(([label, value]) => {
                                const row = document.createElement("div"),
                                    dt = document.createElement("dt"),
                                    dd = document.createElement("dd");
                                dt.textContent = label;
                                dd.textContent = value;
                                row.append(dt, dd);
                                dl.append(row);
                            });
                            const note = document.createElement("p");
                            note.textContent = data.message;
                            result.append(dl, note);
                            const message = [
                                `¡Hola, Hugo! Me gustaría comprar «${data.title}».`,
                                `Paquete: ${data.package_label}.`,
                                `Cantidad: ${data.quantity} ejemplar(es).`,
                                `Libros: ${money(data.product_price)} (${money(data.unit_price)} por ejemplar).`,
                                domestic()
                                    ? `Destino: ${locality}, España, código postal ${postcode}.`
                                    : `Destino: ${locality}, otro país (te indico el país).`,
                                data.available
                                    ? `Envío: ${money(data.shipping_price)} · ${data.service}; embalaje incluido: ${data.packaging_label}, ${money(data.packaging_fee)}.`
                                    : "Envío pendiente de confirmar.",
                                ...(data.available ? [`Total calculado: ${money(data.total)}.`] : []),
                                "¿Me confirmas el importe final, la disponibilidad y cómo realizar el pago?",
                            ];
                            const phone = String(
                                siteData?.config?.whatsapp || "34666530043",
                            ).replace(/\D/g, "");
                            next.href =
                                "https://wa.me/" +
                                phone +
                                "?text=" +
                                encodeURIComponent(message.join("\n"));
                            next.hidden = false;
                        } catch (err) {
                            if (token === quoteVersion && err.name !== "AbortError")
                                result.textContent = err.message;
                        } finally {
                            if (token === quoteVersion) calc.disabled = false;
                        }
                    };
                    cityMode(true);
                    modal.showModal();
                    cp.focus();
                });
            })();

            (() => {
                            const section = document.getElementById("formatos-envios");
                            if (!section) return;
                            const button = section.querySelector(".formats-guide__toggle");
                            const questions = document.getElementById("formats-content");
                            const label = button.querySelector(".formats-guide__toggle-label");
                            const icon = button.querySelector(".formats-guide__toggle-icon");

                            let animation = null;
                            function setExpanded(expanded, animate = false) {
                                const wasHidden = questions.hidden;
                                const startHeight = wasHidden ? 0 : questions.getBoundingClientRect().height;
                                if (animation) {
                                    animation.cancel();
                                    animation = null;
                                }
                                button.setAttribute("aria-expanded", String(expanded));
                                label.textContent = expanded ? "Ocultar información" : "Ver información";
                                icon.textContent = expanded ? "−" : "+";
                                questions.inert = !expanded;

                                if (!animate || !questions.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                                    questions.hidden = !expanded;
                                    questions.style.overflow = "";
                                    return;
                                }

                                questions.hidden = false;
                                questions.style.overflow = "hidden";
                                const endHeight = expanded ? questions.scrollHeight : 0;
                                animation = questions.animate(
                                    [{ height: `${startHeight}px`, opacity: expanded ? 0.65 : 1 },
                                        { height: `${endHeight}px`, opacity: expanded ? 1 : 0.65 }],
                                    { duration: 380, easing: "cubic-bezier(.22, 1, .36, 1)" },
                                );
                                animation.onfinish = () => {
                                    questions.hidden = !expanded;
                                    questions.style.overflow = "";
                                    animation = null;
                                };
                            }

                            setExpanded(false);
                            button.addEventListener("click", () => {
                                setExpanded(button.getAttribute("aria-expanded") !== "true", true);
                            });

                            function openLinkedSection() {
                                const id = window.location.hash.slice(1);
                                if ((id === section.id || (id && section.contains(document.getElementById(id)))) && button.getAttribute("aria-expanded") !== "true") {
                                    setExpanded(true);
                                }
                            }
                            document.querySelectorAll('a[href="#formatos-envios"]').forEach((link) => {
                                link.addEventListener("click", () => setExpanded(true, questions.hidden));
                            });
                            window.addEventListener("hashchange", openLinkedSection);
                            openLinkedSection();
                        })();

            window.mazmorraContact = contact;
        } catch (error) {
            console.error("Unable to initialize view catalogo.", error);
        }
    },
};
</script>

