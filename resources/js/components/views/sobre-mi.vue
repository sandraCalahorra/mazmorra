<template>
    <SiteHeader current="sobre-mi" />
    <main class="interior-page about-page">
        <section
            class="about-hero about-hero--sheet"
            aria-labelledby="about-title"
        >
            <div class="about-hero__copy">
                <p class="about-kicker">DETRÁS DE LA PANTALLA</p>
                <h1 id="about-title">
                    Soy Hugo.<br />Yo preparo el mundo;<br /><em
                >vosotros decidís qué ocurre.</em
                >
                </h1>
                <p class="about-intro">
                    Máster, autor y la persona detrás de
                    <strong>La Mazmorra del Roleo</strong>. Escribo aventuras para
                    llevarlas a la mesa, compartirlas y ver qué hace cada grupo con
                    ellas.
                </p>

                <p class="about-intro">
                    <strong>Todo máster guarda algún secreto.</strong> Despliega mi
                    ficha y descubre mis rasgos, mis competencias y unas estadísticas
                    poco fiables. <FluentIcon name="games" />
                </p>
            </div>

            <div class="dm-intro-seal" aria-hidden="true">
                <span>♜</span><small>EL MÁSTER<br />TAMBIÉN TIENE FICHA</small>
            </div>
        </section>
        <section
            class="dm-sheet dm-sheet--with-actions"
            aria-label="La ficha del máster"
        >
            <details class="dm-sheet-fold">
                <summary class="dm-sheet-fold__summary">
                    <span class="dm-sheet-fold__crest" aria-hidden="true">♜</span
                    ><span class="dm-sheet-fold__intro"
                    ><span>DETRÁS DE LA PANTALLA</span>
                        <h2>La ficha del máster</h2>
                        <small
                        >Atributos sospechosos, rasgos especiales y un poco de mi
                            historia.</small
                        ></span
                        ><span class="dm-sheet-fold__action"
                        ><span class="dm-sheet-fold__closed">Abrir mi ficha</span
                        ><span class="dm-sheet-fold__opened">Guardar mi ficha</span
                        ><span class="dm-sheet-fold__symbol" aria-hidden="true"></span
                        ></span>
                </summary>
                <div class="dm-sheet-fold__content">
                    <div class="dm-sheet__ribbon">
                        <span>LA MAZMORRA DEL ROLEO</span
                        ><span>FICHA DEL MÁSTER · D&amp;D 5e</span>
                    </div>
                    <div class="dm-sheet__identity">
                        <div class="dm-sheet__portrait">
                            <span aria-hidden="true">HD</span><small>OSOLIRON411</small>
                        </div>
                        <div class="dm-sheet__name">
                            <p class="dm-sheet__field-label">NOMBRE DEL PERSONAJE</p>
                            <h2 id="dm-name">Hugo Durán</h2>
                            <p>Detrás de la pantalla. Dentro de cada historia.</p>
                        </div>
                        <dl class="dm-sheet__fields">
                            <div>
                                <dt>Clase</dt>
                                <dd>Máster / Autor</dd>
                            </div>
                            <div>
                                <dt>Trasfondo</dt>
                                <dd>Creador de La Mazmorra del Roleo</dd>
                            </div>
                            <div>
                                <dt>Experiencia</dt>
                                <dd>7 años dirigiendo · 3 como máster de pago</dd>
                            </div>
                            <div>
                                <dt>Sistema</dt>
                                <dd>Dungeons &amp; Dragons 5e</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="dm-sheet__body dm-sheet__body--two-sides">
                        <div class="dm-sheet__attributes">
                            <div class="dm-abilities-heading">
                                <h3>Atributos</h3>
                                <p>Pulsa para descubrirlos.</p>
                            </div>
                            <div class="dm-abilities">
                                <details class="dm-ability" data-ability="piedad">
                                    <summary>
                                        <span class="dm-ability__name">Piedad</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 8"
                                        >8</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador -1"
                                        >-1</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>¿Ese crítico era necesario?</p>
                                </details>
                                <details class="dm-ability" data-ability="suerte">
                                    <summary>
                                        <span class="dm-ability__name">Suerte</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 16"
                                        >16</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador +3"
                                        >+3</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>Veintes detrás de la pantalla.</p>
                                </details>
                                <details class="dm-ability" data-ability="improvisacion">
                                    <summary>
                                        <span class="dm-ability__name">Improvisación</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 18"
                                        >18</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador +4"
                                        >+4</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>Esto estaba planeado. Claro.</p>
                                </details>
                            </div>
                        </div>
                        <div class="dm-sheet__content">
                            <div
                                class="dm-tabs"
                                role="tablist"
                                aria-label="Apartados de la ficha"
                                hidden=""
                            >
                                <BaseButton
                                    role="tab"
                                    id="dm-tab-traits"
                                    aria-controls="dm-panel-traits"
                                    aria-selected="true"
                                >
                                    <FluentIcon name="document-text" /> Rasgos
                                </BaseButton>
                                <BaseButton
                                    role="tab"
                                    id="dm-tab-skills"
                                    aria-controls="dm-panel-skills"
                                    aria-selected="false"
                                    tabindex="-1"
                                >
                                    <FluentIcon name="games" /> Competencias
                                </BaseButton>
                                <BaseButton
                                    role="tab"
                                    id="dm-tab-diary"
                                    aria-controls="dm-panel-diary"
                                    aria-selected="false"
                                    tabindex="-1"
                                >
                                    <FluentIcon name="book-open" /> Diario
                                </BaseButton>
                            </div>
                            <div id="dm-panel-traits" class="dm-panel">
                                <div class="dm-panel__heading">
                                    <span>RASGOS DE CLASE</span>
                                    <h3>Habilidades especiales del máster.</h3>
                                </div>
                                <div class="dm-traits">
                                    <article>
                                        <span aria-hidden="true">01</span>
                                        <h4><FluentIcon name="mic" /> Voz de PNJ</h4>
                                        <p>
                                            Puedo interpretar a veinte personajes distintos con las
                                            <strong>mismas tres voces</strong>.
                                        </p>
                                    </article>
                                    <article>
                                        <span aria-hidden="true">02</span>
                                        <h4><FluentIcon name="games" /> No os preocupéis</h4>
                                        <p>
                                            Pronunciar esta frase obliga al grupo a
                                            <strong>preocuparse inmediatamente</strong>.
                                        </p>
                                    </article>
                                    <article>
                                        <span aria-hidden="true">03</span>
                                        <h4><FluentIcon name="eye" /> ¿Estáis seguros?</h4>
                                        <p>
                                            Puedo convertir abrir una puerta en
                                            <strong>veinte minutos de debate</strong>. Usos
                                            ilimitados.
                                        </p>
                                    </article>
                                </div>
                            </div>
                            <div id="dm-panel-skills" class="dm-panel">
                                <div class="dm-panel__heading">
                                    <span>COMPETENCIAS</span>
                                    <h3>En esto tengo competencia.</h3>
                                </div>
                                <div class="dm-skills">
                                    <details>
                                        <summary><FluentIcon name="games" /> Dirección de partidas</summary>
                                        <p>
                                            Yo pongo el mundo, los peligros y los PNJ. Vosotros
                                            encontráis
                                            <strong>la única solución que no había previsto</strong
                                            >.
                                        </p>
                                    </details>
                                    <details>
                                        <summary><FluentIcon name="document-text" /> Escritura de aventuras</summary>
                                        <p>
                                            Convierto ideas en
                                            <strong>historias listas para jugar</strong>. Lo de que
                                            sobrevivan a vuestro grupo ya es otra aventura.
                                        </p>
                                    </details>
                                    <details>
                                        <summary><FluentIcon name="animal-paw-print" /> Criaturas y objetos mágicos</summary>
                                        <p>
                                            Diseño bichos que os compliquen la vida y
                                            <strong
                                            >objetos que os ayuden a complicármela a mí</strong
                                            >.
                                        </p>
                                    </details>
                                    <details>
                                        <summary><FluentIcon name="key" /> Localizaciones y misterios</summary>
                                        <p>
                                            Lugares llenos de <strong>secretos y pistas</strong>.
                                            Algunas incluso las encontraréis antes de quemar el
                                            edificio.
                                        </p>
                                    </details>
                                </div>
                                <a
                                    class="dm-sheet-cta dm-sheet-cta--primary"
                                    href="encargos"
                                >Creamos algo para tu mesa
                                    <span aria-hidden="true">✦</span></a
                                    >
                            </div>
                            <div id="dm-panel-diary" class="dm-panel">
                                <div class="dm-panel__heading">
                                    <span>DIARIO DE AVENTURAS</span>
                                    <h3>Mi historia, en tres capítulos.</h3>
                                </div>
                                <div class="about-chapters">
                                    <details>
                                        <summary>
                                            <span class="about-chapters__number">01</span
                                            ><span
                                            ><small>EL PRIMER DADO</small
                                            ><strong>Empecé detrás de la pantalla</strong></span
                                            ><span class="about-plus" aria-hidden="true"></span>
                                        </summary>
                                        <div class="about-chapters__content">
                                            <p>
                                                <strong
                                                >Mi primera partida ya fue como máster.</strong
                                                >
                                                Fue caótica, divertida y suficiente para que quisiera
                                                seguir preparando historias. Con el tiempo, aquella
                                                afición fue ocupando cada vez más espacio.
                                            </p>
                                            <p>
                                                Hoy sigo alternando aventuras propias y oficiales, con
                                                ganas de descubrir qué hará el siguiente grupo.
                                            </p>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>
                                            <span class="about-chapters__number">02</span
                                            ><span
                                            ><small>LA MAZMORRA DEL ROLEO</small
                                            ><strong
                                            >De dirigir historias a compartirlas</strong
                                            ></span
                                            ><span class="about-plus" aria-hidden="true"></span>
                                        </summary>
                                        <div class="about-chapters__content">
                                            <p>
                                                La Mazmorra del Roleo reúne mis dos facetas:
                                                <strong>dirigir partidas y escribir contenido</strong>
                                                para que otras mesas también puedan disfrutarlo.
                                            </p>
                                            <p>
                                                <em>La Casa de los Miller</em> y
                                                <em>La Caverna Misteriosa</em> forman parte de ese
                                                recorrido como autor. Me gusta trabajar con la
                                                tensión, los misterios y los lugares que esconden algo
                                                más de lo que muestran.
                                            </p>
                                            <a class="about-text-link" href="catalogo"
                                            >Conocer mis publicaciones →</a
                                            >
                                        </div>
                                    </details>
                                    <details>
                                        <summary>
                                            <span class="about-chapters__number">03</span
                                            ><span
                                            ><small>EL SIGUIENTE CAPÍTULO</small
                                            ><strong
                                            >Siempre hay otra idea en el escritorio</strong
                                            ></span
                                            ><span class="about-plus" aria-hidden="true"></span>
                                        </summary>
                                        <div class="about-chapters__content">
                                            <p>
                                                Entre partidas sigo escribiendo aventuras, diseñando
                                                criaturas, objetos mágicos y localizaciones. También
                                                desarrollo contenido por encargo para quienes tienen
                                                una idea que quieren llevar a su mesa.
                                            </p>
                                            <p>
                                                Esta web es el lugar donde se encuentran esas
                                                historias: las que puedes jugar conmigo y las que
                                                puedes llevarte a tu propio grupo.
                                            </p>
                                            <a class="about-text-link" href="encargos"
                                            >Tengo una idea para un encargo →</a
                                            >
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                        <div class="dm-sheet__attributes dm-sheet__attributes--right">
                            <div class="dm-abilities-heading">
                                <h3>Más atributos</h3>
                                <p>Pulsa para descubrirlos.</p>
                            </div>
                            <div class="dm-abilities">
                                <details class="dm-ability" data-ability="maldad">
                                    <summary>
                                        <span class="dm-ability__name">Maldad</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 14"
                                        >14</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador +2"
                                        >+2</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>El cofre tenía dientes.</p>
                                </details>
                                <details class="dm-ability" data-ability="sadismo">
                                    <summary>
                                        <span class="dm-ability__name">Sadismo</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 15"
                                        >15</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador +2"
                                        >+2</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>«¿Cómo que otra fase?»</p>
                                </details>
                                <details class="dm-ability" data-ability="disimulo">
                                    <summary>
                                        <span class="dm-ability__name">Disimulo</span
                                        ><span
                                            class="dm-ability__score"
                                            data-score=""
                                            aria-label="Puntuación 17"
                                        >17</span
                                        ><span
                                            class="dm-ability__modifier"
                                            data-modifier=""
                                            aria-label="Modificador +3"
                                        >+3</span
                                        ><span class="dm-ability__prompt" aria-hidden="true"
                                        >+</span
                                        >
                                    </summary>
                                    <p>Esa sonrisa no augura nada bueno.</p>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div class="dm-sheet__footer">
                        <span><FluentIcon name="games" /> Principiantes bienvenidos</span
                        ><a
                            href="https://mesasroleras.com/gm/osoliron411"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="dm-sheet-cta dm-sheet-cta--reviews"
                        >Opiniones de mis jugadores ↗</a
                        >
                    </div>
                </div>
            </details>
        </section>
        <div class="about-actions about-actions--after-sheet">
            <a class="about-button" href="calendario"
            >Quiero jugar contigo <span aria-hidden="true">↗</span></a
            >
            <a class="about-text-link" href="catalogo"
            >Explorar tus publicaciones →</a
            >
        </div>
        <a
            class="about-reviews"
            href="https://mesasroleras.com/gm/osoliron411"
            target="_blank"
            rel="noopener noreferrer"
        >¿Cómo es jugar conmigo? Lee a mis jugadores en Mesas Roleras ↗</a
        >

        <section class="about-table" aria-labelledby="about-table-title">
            <div class="about-section-heading">
                <p class="about-kicker">BUSCA TU SITIO</p>
                <h2 id="about-table-title">¿Cómo es sentarse a mi mesa?</h2>
                <p>Encuentra tu forma de jugar conmigo.</p>
            </div>

            <div class="about-table-cards">
                <article id="about-panel-new" class="about-table-card">
                    <div class="about-table-card__head">
                        <span class="about-table-card__icon" aria-hidden="true"><FluentIcon name="leaf-two" /></span>
                        <h3>Tu primera partida</h3>
                    </div>
                    <div class="about-table-card__body">
                        <h4>No necesitas sabértelo todo.</h4>
                        <p>
                            Si es tu primer contacto con D&amp;D, te ayudaré a entender las
                            reglas mientras jugamos. Puedes preguntar: aprender también
                            forma parte de la partida.
                        </p>
                        <p class="about-panel__note">
                            Consulta las próximas mesas y dime que estás empezando. Te
                            acompañaré con las reglas.
                        </p>
                        <a class="about-text-link" href="calendario"
                        >Ver próximas partidas →</a
                        >
                    </div>
                </article>
                <article id="about-panel-player" class="about-table-card">
                    <div class="about-table-card__head">
                        <span class="about-table-card__icon" aria-hidden="true"><FluentIcon name="games" /></span>
                        <h3>Ya tienes experiencia</h3>
                    </div>
                    <div class="about-table-card__body">
                        <h4>El mundo responde a lo que hacéis.</h4>
                        <p>
                            Me interesa el mazmorreo con sentido: lugares que explorar,
                            secretos y retos que admitan distintas soluciones. Hay espacio
                            para interpretar, combatir y asumir las consecuencias de
                            vuestras decisiones.
                        </p>
                        <p class="about-panel__note">
                            Explora las aventuras disponibles y encuentra vuestra próxima
                            historia.
                        </p>
                        <a
                            class="about-text-link"
                            href="calendario"
                            data-about-catalog=""
                            aria-haspopup="dialog"
                        >Explorar aventuras →</a
                        >
                    </div>
                </article>
                <article id="about-panel-group" class="about-table-card">
                    <div class="about-table-card__head">
                        <span class="about-table-card__icon" aria-hidden="true"><FluentIcon name="compass-northwest" /></span>
                        <h3>Vienes con tu grupo</h3>
                    </div>
                    <div class="about-table-card__body">
                        <h4>Busquemos una aventura para vosotros.</h4>
                        <p>
                            Contadme qué os apetece jugar, cuántos sois y vuestra
                            experiencia. Podemos elegir una aventura propia, una oficial o
                            plantear una partida personalizada.
                        </p>
                        <p class="about-panel__note">
                            Contadme cuántos sois, qué os apetece jugar y vuestra
                            disponibilidad. Concretaremos los detalles antes de confirmar.
                        </p>
                        <a
                            class="about-text-link"
                            href="calendario"
                            data-about-request=""
                            aria-haspopup="dialog"
                        >Solicitar una partida →</a
                        >
                    </div>
                </article>
            </div>
            <p id="about-action-status" role="status"></p>
        </section>

        <section
            class="about-invitation"
            aria-labelledby="about-invitation-title"
        >
            <div>
                <p class="about-kicker">NOS VEMOS AL OTRO LADO DE LA PANTALLA</p>
                <h2 id="about-invitation-title">
                    La siguiente historia<br />todavía está por jugar.
                </h2>
                <p>
                    Ya sabes quién prepara la mesa. Ahora me gustaría conocer a quienes
                    se van a sentar en ella.
                </p>
                <p class="about-signature">Hugo</p>
            </div>
            <a class="about-button" href="contacto"
            >Hablemos de vuestra próxima aventura ↗</a
            >
        </section>
    </main>
    <footer>
        <a class="brand" href="./"
        ><span class="brand-icon">♜</span
        ><span>LA MAZMORRA<small>DEL ROLEO</small></span></a
        >
        <p>Historias que se leen. Aventuras que se viven.</p>
        <div>
            <BaseButton data-legal="legal">Información del sitio</BaseButton
            ><BaseButton data-legal="privacy">Privacidad</BaseButton>
        </div>
        <small
        >© 2026 La Mazmorra del Roleo. Proyecto independiente, no afiliado a
            Wizards of the Coast.</small
        ><a class="admin-access" href="admin">Administración</a>
    </footer>
    <dialog id="modal">
        <BaseButton class="close" aria-label="Cerrar ventana">×</BaseButton>
        <div id="modal-content"></div>
    </dialog>
    <AdventureRates hidden />
</template>


<script>
import BaseButton from '../core-ui/BaseButton.vue';
import FluentIcon from '../shared/FluentIcon.vue';
import '../../../css/pages/sobre-mi.css';
import SiteHeader from '../shared/SiteHeader.vue';
import AdventureRates from '../shared/AdventureRates.vue';
import { createBaseSelect } from '@/components/core-ui/BaseSelect.vue';
import { createBaseButton, setHtmlWithBaseButtons } from '@/components/core-ui/BaseButton.vue';
import { loadAccount } from '@/store/modules/account';
import { requestWithStatus } from '@/bootstrap';
import filledPaths from '@/assets/fluent/filled.js';
import { replaceBaseSelects } from '@/components/core-ui/BaseSelect.vue';
import { siteData } from '@/store/modules/siteData';
import { setHtmlWithBaseCheckboxes } from '@/components/core-ui/BaseCheckbox.vue';

export const needsSiteData = true;

export default {
    components: { BaseButton, FluentIcon, SiteHeader, AdventureRates },
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

            function initializePricing() {
                const dialog = document.querySelector("#request-game-dialog");
                if (!dialog) return;

                const form = dialog.querySelector("form");
                const fields = form.elements;

                const euros = (cantidad) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(cantidad);

                fields.players.min = "1";
                fields.players.max = "30";

                const opcionesPequenos = document.createElement("label");
                opcionesPequenos.className = "wide";
                opcionesPequenos.hidden = true;

                opcionesPequenos.innerHTML = `
                Para grupos de 1 o 2 jugadores
                <base-select name="smallGroup" required>
                    <option value="" selected disabled>Seleccione...</option>
                    <option value="shared">Buscar una mesa compartida</option>
                    <option value="private">Solicitar una sesión privada</option>
                </base-select>
            `;

                replaceBaseSelects(opcionesPequenos);
                fields.players.closest(".request-grid").append(opcionesPequenos);

                const elegirDuracion = new Option("Seleccione...", "");
                elegirDuracion.disabled = true;

                fields.duration.replaceChildren(
                    elegirDuracion,
                    new Option("2 horas", "2"),
                    new Option("2,5 horas", "2.5"),
                    new Option("3 horas", "3"),
                );

                fields.duration.value = "";
                fields.duration.required = true;
                let duracionAnterior = "";
                let duracionFija = false;
                function sincronizarDuracion() {
                    const format = String(fields.format.value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
                    const single = ["partida unica", "one-shot", "oneshot", "one shot", "una sola sesion", "1 sola sesion"].includes(format);
                    if (single && !duracionFija) {
                        duracionAnterior = fields.duration.value;
                        fields.duration.replaceChildren(new Option("4 horas aproximadamente", "4", true, true));
                        fields.duration.classList.add("campo-bloqueado");
                        fields.duration.setAttribute("aria-readonly", "true");
                        duracionFija = true;
                    } else if (!single && duracionFija) {
                        const placeholder = new Option("Seleccione...", ""); placeholder.disabled = true;
                        fields.duration.replaceChildren(placeholder, new Option("2 horas", "2"), new Option("2,5 horas", "2.5"), new Option("3 horas", "3"));
                        fields.duration.value = ["2", "2.5", "3"].includes(duracionAnterior) ? duracionAnterior : "";
                        fields.duration.classList.remove("campo-bloqueado");fields.duration.removeAttribute("aria-readonly");duracionFija = false;
                    }
                }
                fields.duration.addEventListener("pointerdown", e => {if(duracionFija)e.preventDefault();});
                fields.duration.addEventListener("keydown", e => {if(duracionFija && e.key!=="Tab")e.preventDefault();});
                dialog.addEventListener("close", () => {
                    duracionAnterior = "";
                    sincronizarDuracion();
                    if (!duracionFija) fields.duration.value = "";
                });

                const caja = document.createElement("aside");
                caja.className = "request-price";
                caja.setAttribute("aria-live", "polite");
                caja.setAttribute("aria-atomic", "true");

                dialog.querySelector(".request-actions").before(caja);

            function estimacion(datos = null) {
                function leer(nombre) {
                    if (
                        datos &&
                        Object.prototype.hasOwnProperty.call(datos, nombre)
                    ) {
                        return String(datos[nombre] ?? "");
                    }

                    return form.querySelector(`[name="${nombre}"]`)?.value ?? "";
                }

                const jugadores = Number(leer("players"));
                const horas = Number(leer("duration"));
                const tipo = leer("kind");

                if (
                    !Number.isInteger(jugadores) ||
                    jugadores < 1 ||
                    jugadores > 30
                ) {
                    return "Selecciona el número de jugadores para calcular el presupuesto.";
                }

                if (jugadores <= 2) {
                    const opcion = leer("smallGroup");

                    if (!opcion) {
                        return "Elige entre mesa compartida o sesión privada.";
                    }

                    return opcion === "shared"
                        ? "Mesa compartida: precio pendiente de confirmar según la aventura y la mesa disponible."
                        : `Sesión privada para ${jugadores} jugador(es): presupuesto personalizado.`;
                }

                if (jugadores >= 6) {
                    return (
                        `Grupo especial de ${jugadores} jugadores.\n` +
                        "Precio superior al de una mesa estándar, con presupuesto personalizado."
                    );
                }

                const personalizada = tipo === "personalizada";

                const aventura = (
                    siteData?.commissioned_games || []
                ).find(
                    (partida) =>
                        partida.title === leer("adventure") &&
                        partida.origin === tipo &&
                        partida.published === true
                );

                const formato = String(aventura?.format || leer("format")).normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
                const unica = ["partida unica", "one-shot", "oneshot", "one shot", "una sola sesion", "1 sola sesion"].includes(formato);
                if (personalizada && (!formato || formato === "necesito orientacion")) {
                    return "Formato pendiente de definir. One-shot personalizada: desde 15 € por jugador, pago único por unas 4 horas. Varias sesiones o campaña: desde 5 € por jugador y hora. Confirmaré el precio final según complejidad y preparación antes de reservar.";
                }
                const tarifa = personalizada
                    ? (unica ? 15 : 5)
                    : aventura?.hourly_rate != null
                        ? Number(String(aventura.hourly_rate).replace(",", "."))
                        : null;

                if (
                    typeof tarifa !== "number" ||
                    !Number.isFinite(tarifa) ||
                    tarifa <= 0
                ) {
                    return "Tarifa de esta aventura: a consultar.";
                }

                const desde = personalizada ? "Desde " : "";
                const lineas = [
                    `Jugadores: ${jugadores}.`,
                    `${desde}${euros(tarifa)} por jugador ${unica ? "y sesión · pago único" : "y hora"}.`,
                ];

                if (unica) {
                    lineas.push("Duración de la sesión: 4 horas aproximadamente.");
                    lineas.push(`${personalizada ? "TOTAL MÍNIMO ESTIMADO DEL GRUPO" : "TOTAL ESTIMADO DEL GRUPO"}: ${desde.toLowerCase()}${euros(tarifa * jugadores)} · pago único.`);
                } else if (horas > 0 && Number.isFinite(horas)) {
                    const porPersona = tarifa * horas;
                    const totalGrupo = porPersona * jugadores;

                    lineas.push(
                        `Duración por sesión: ${horas} horas.`,
                        `${desde}${euros(porPersona)} por persona y sesión.`,
                        `${personalizada ? "TOTAL MÍNIMO ESTIMADO DEL GRUPO" : "TOTAL ESTIMADO DEL GRUPO"}: ${desde.toLowerCase()}${euros(totalGrupo)} por sesión.`
                    );
                } else {
                    lineas.push("Duración y total pendientes de acordar.");
                }

                if (personalizada) {
                    lineas.push(
                        "Estimación mínima. El precio puede aumentar según lo solicitado, la complejidad y la preparación. Confirmaré el importe final antes de reservar."
                    );
                }

                lineas.push(
                    "Estimación pendiente de confirmación.",
                    unica ? "El importe cubre la partida completa de una sesión; no se multiplica por las horas."
                        : "En campañas, el importe corresponde a una sesión, no a toda la campaña."
                );

                return lineas.join("\n");
            }
                function actualizar() {
                    sincronizarDuracion();
                    caja.textContent = estimacion();
                    const jugadores = Number(
                        form.querySelector('input[name="players"]')?.value,
                    );

                    opcionesPequenos.hidden = !(jugadores >= 1 && jugadores <= 2);

                    fields.smallGroup.disabled =
                        opcionesPequenos.hidden || fields.players.disabled;

            caja.hidden = true;
                }

                form.addEventListener("input", actualizar);
                form.addEventListener("change", actualizar);

                form.addEventListener("submit", () => {
                    queueMicrotask(actualizar);
                });

                dialog.querySelector("#request-back").addEventListener("click", () => {
                    queueMicrotask(actualizar);
                });

                document.querySelectorAll("[data-request-game]").forEach((boton) => {
                    boton.addEventListener("click", actualizar);
                });

                actualizar();
                return estimacion;
            }

            function addCatalogScrollControls(scroll) {
                const controls = document.createElement('div');
                controls.className = 'catalog-scroll-controls';
                controls.innerHTML = '<span>Desliza o usa las flechas para ver toda la tabla</span><div><button type="button" aria-label="Ver columnas anteriores">←</button><button type="button" aria-label="Ver más columnas">→</button></div>';
                scroll.before(controls);
                scroll.tabIndex = 0;
                scroll.setAttribute('role', 'region');
                scroll.setAttribute('aria-label', 'Tabla de tarifas desplazable horizontalmente');
                const [previous, next] = controls.querySelectorAll('button');
                const update = () => {
                    const remaining = scroll.scrollWidth - scroll.clientWidth;
                    controls.hidden = remaining <= 1;
                    previous.disabled = scroll.scrollLeft <= 1;
                    next.disabled = scroll.scrollLeft >= remaining - 1;
                };
                previous.addEventListener('click', () => scroll.scrollBy({ left: -scroll.clientWidth * 0.75, behavior: 'smooth' }));
                next.addEventListener('click', () => scroll.scrollBy({ left: scroll.clientWidth * 0.75, behavior: 'smooth' }));
                scroll.addEventListener('scroll', update, { passive: true });
                new ResizeObserver(update).observe(scroll);
                update();
            }

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
                const botones = document.querySelectorAll("[data-request-game]");
                if (!botones.length) return;

                const dialog = document.createElement("dialog");
                dialog.id = "request-game-dialog";
                dialog.setAttribute("aria-labelledby", "request-title");

                setHtmlWithBaseButtons(dialog, `
                <base-button class="close" aria-label="Cerrar ventana">×</base-button>
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
                                <base-select name="kind" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option value="mia">Una aventura de La Mazmorra del Roleo</option>
                                    <option value="oficial">Una campaña oficial</option>
                                    <option value="personalizada">Una aventura personalizada</option>
                                </base-select>
                            </label>

                            <label class="wide" id="request-adventure-label" hidden>
                                Elige una publicación
                                    <base-select name="adventure" required>
                                            <option value="" selected disabled>Seleccione...</option>
                                    </base-select>
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
                                <base-select name="format" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Partida única</option>
                                    <option>Aventura de varias sesiones</option>
                                    <option>Campaña</option>
                                    <option>Necesito orientación</option>
                                </base-select>
                            </label>

                            <label>
                                Duración por sesión
                                <base-select name="duration" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option value="2">2 horas</option>
                                    <option value="2.5">2,5 horas</option>
                                    <option value="3">3 horas</option>
                                </base-select>
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
                                <base-select name="group" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Tenemos un grupo formado</option>
                                    <option>Soy un jugador y busco mesa</option>
                                </base-select>
                            </label>

                            <label>
                                Número de jugadores
                                <input name="players" type="number" min="1" max="30" required>
                            </label>

                            <label>
                                Experiencia
                                <base-select name="experience" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Es nuestra primera partida</option>
                                    <option>Tenemos algo de experiencia</option>
                                    <option>Somos jugadores habituales</option>
                                    <option>Grupo con experiencia variada</option>
                                </base-select>
                            </label>

                            <label>
                                Nivel de los personajes
                                <base-select name="level" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Necesito orientación</option>
                                    <option>Niveles 1–3</option>
                                    <option>Niveles 4–6</option>
                                    <option>Niveles 7–10</option>
                                    <option>Nivel 11 o superior</option>
                                </base-select>
                            </label>

                            <label>
                                Modalidad
                                <base-select name="mode" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Online</option>
                                    <option>Presencial</option>
                                </base-select>
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
                                <base-select name="frequency" required>
                                    <option value="" selected disabled>Seleccione...</option>
                                    <option>Una sola vez</option>
                                    <option>Semanal</option>
                                    <option>Quincenal</option>
                                    <option>Mensual</option>
                                    <option>A convenir</option>
                                </base-select>
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
                        <base-button class="btn outline" id="request-back">
                            ← Anterior
                        </base-button>
                        <base-button type="submit" class="btn gold" id="request-next">
                            Continuar →
                        </base-button>
                    </div>
                </form>
            `);

                document.body.append(dialog);

                const form = dialog.querySelector("form");
                const fields = form.elements;

                form.querySelectorAll("select").forEach((select) => {
                    let placeholder = select.querySelector('option[value=""]');

                    if (!placeholder) {
                        placeholder = new Option("Seleccione...", "");
                        placeholder.disabled = true;
                        select.prepend(placeholder);
                    }

                    select.required = true;
                    select.value = "";
                });

                const partesHoy = new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Europe/Madrid",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).formatToParts(new Date());

                const parte = (tipo) =>
                    partesHoy.find((elemento) => elemento.type === tipo).value;

                fields.date1.min = `${parte("year")}-${parte("month")}-${parte("day")}`;

                fields.time1.step = "300";

                fields.time1.addEventListener("input", () => {
                    fields.time1.setCustomValidity("");
                });
                const error = dialog.querySelector("#request-error");
                let paso = 0;

                const publicaciones = (siteData?.commissioned_games || []).filter(
                    (partida) =>
                        ["mia", "oficial"].includes(partida.origin) && partida.published === true,
                );

                function cargarPublicaciones() {
                    const anterior = fields.adventure.value;
                    const lista = publicaciones.filter((p) => p.origin === fields.kind.value);
                    const placeholder = new Option(
                        lista.length ? "Seleccione..." : "No hay aventuras disponibles",
                        "",
                    );
                    placeholder.disabled = true;
                    placeholder.selected = true;
                    fields.adventure.replaceChildren(placeholder);
                    lista.forEach((p) => fields.adventure.add(new Option(p.title, p.title)));
                    if (lista.some((p) => p.title === anterior))
                        fields.adventure.value = anterior;
                }
                fields.kind.addEventListener("change", cargarPublicaciones);
                cargarPublicaciones();

                const ficha = document.createElement("article");
                ficha.className = "request-adventure-card";
                ficha.hidden = true;
                dialog.querySelector("#request-adventure-label").after(ficha);
                function pintarFicha() {
                    const item = publicaciones.find(
                        (p) =>
                            p.origin === fields.kind.value && p.title === fields.adventure.value,
                    );
                    ficha.replaceChildren();
                    ficha.hidden = !item;
                    if (!item) return;
                    if (item.cover) {
                        const img = document.createElement("img");

                        try {
                            const url = new URL(item.cover, location.href);
                            if (["http:", "https:"].includes(url.protocol)) {
                                img.src = url.href;
                                img.alt = `Portada de ${item.title}`;
                                img.addEventListener("error", () => {
                                    img.hidden = true;
                                });
                                ficha.append(img);
                            }
                        } catch (_) {

                        }
                    }
                    const body = document.createElement("div");
                    const title = document.createElement("h4");
                    title.textContent = item.title;
                    const meta = document.createElement("p");
                    meta.textContent = `${item.format} · ${item.level} · En español`;
                    const description = document.createElement("p");
                    description.textContent = item.description || "";
                    const heading = document.createElement("div");
                    heading.className = "request-adventure-heading";

                    const price = document.createElement("span");
                    price.className = "request-adventure-price";

                    const format = String(item.format || "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .trim();

                    const single = [
                        "partida unica",
                        "one-shot",
                        "oneshot",
                        "one shot",
                        "una sola sesion",
                        "1 sola sesion",
                    ].includes(format);

                    const rate =
                        item.hourly_rate == null || item.hourly_rate === ""
                            ? NaN
                            : Number(String(item.hourly_rate).replace(",", "."));

                    if (Number.isFinite(rate) && rate > 0) {
                        const amount = new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "EUR",
                        }).format(rate);

                        price.textContent = single
                            ? `${amount} por jugador · pago único`
                            : `${amount}/h por jugador`;
                    } else {
                        price.textContent = "A consultar";
                    }

                    heading.append(title, price);
                    body.append(heading, meta, description);
                    ficha.append(body);
                }
                fields.kind.addEventListener("change", pintarFicha);
                fields.adventure.addEventListener("change", pintarFicha);

                const opcionesNivel = Array.from(fields.level.options).map((opcion) => ({
                    texto: opcion.textContent,
                    valor: opcion.value,
                    disabled: opcion.disabled,
                }));

                let nivelAutomatico = false;
                let nivelManual = "";

                const opcionesFormato = Array.from(fields.format.options).map((opcion) => ({
                    texto: opcion.textContent,
                    valor: opcion.value,
                    disabled: opcion.disabled,
                }));

                let formatoAutomatico = false;
                let formatoManual = "";

                function sincronizarFormato() {
                    const esMia = ["mia", "oficial"].includes(fields.kind.value);

                    const bloquear = !fields.kind.value || esMia;

                    const aventura = publicaciones.find(
                        (p) =>
                            p.origin === fields.kind.value && p.title === fields.adventure.value,
                    );

                    const formato = esMia ? String(aventura?.format || "").trim() : "";

                    if (bloquear) {
                        if (!formatoAutomatico) {
                            formatoManual = fields.format.value;
                        }

                        const opcion = new Option(
                            formato || "Seleccione...",
                            formato,
                            true,
                            true,
                        );

                        opcion.disabled = !formato;

                        fields.format.replaceChildren(opcion);
                        formatoAutomatico = true;

                        fields.format.classList.add("campo-bloqueado");
                        fields.format.setAttribute("aria-readonly", "true");
                        fields.format.title = formato
                            ? "Este formato está establecido por la aventura"
                            : "Selecciona una publicación para cargar su formato";
                    } else if (formatoAutomatico) {
                        fields.format.replaceChildren(
                            ...opcionesFormato.map((opcion) => {
                                const elemento = new Option(opcion.texto, opcion.valor);
                                elemento.disabled = opcion.disabled;
                                return elemento;
                            }),
                        );

                        fields.format.value = formatoManual;
                        formatoAutomatico = false;

                        fields.format.classList.remove("campo-bloqueado");
                        fields.format.removeAttribute("aria-readonly");
                        fields.format.removeAttribute("title");
                    }
                }

                fields.adventure.addEventListener("change", sincronizarFormato);
                fields.kind.addEventListener("change", sincronizarFormato);

                sincronizarFormato();

                fields.format.addEventListener("pointerdown", (evento) => {
                    if (formatoAutomatico) evento.preventDefault();
                });

                fields.format.addEventListener("keydown", (evento) => {
                    if (formatoAutomatico && evento.key !== "Tab") {
                        evento.preventDefault();
                    }
                });

                function sincronizarNivel() {
                    const aventura = publicaciones.find(
                        (p) =>
                            p.origin === fields.kind.value && p.title === fields.adventure.value,
                    );

                    const nivel = ["mia", "oficial"].includes(fields.kind.value)
                        ? String(aventura?.level || "").trim()
                        : "";

                    if (nivel) {
                        if (!nivelAutomatico) {
                            nivelManual = fields.level.value;
                        }

                        fields.level.replaceChildren(new Option(nivel, nivel, true, true));
                        nivelAutomatico = true;
                        fields.level.classList.add("campo-bloqueado");
                        fields.level.setAttribute("aria-readonly", "true");
                        fields.level.title = "El nivel está establecido por la aventura";
                    } else if (nivelAutomatico) {
                        fields.level.replaceChildren(
                            ...opcionesNivel.map((opcion) => {
                                const elemento = new Option(opcion.texto, opcion.valor);
                                elemento.disabled = opcion.disabled;
                                return elemento;
                            }),
                        );

                        fields.level.value = nivelManual;
                        nivelAutomatico = false;
                        fields.level.classList.remove("campo-bloqueado");
                        fields.level.removeAttribute("aria-readonly");
                        fields.level.removeAttribute("title");
                    }
                }

                fields.adventure.addEventListener("change", sincronizarNivel);
                fields.kind.addEventListener("change", sincronizarNivel);
                fields.level.addEventListener("pointerdown", (evento) => {
                    if (nivelAutomatico) evento.preventDefault();
                });

                fields.level.addEventListener("keydown", (evento) => {
                    if (nivelAutomatico && evento.key !== "Tab") {
                        evento.preventDefault();
                    }
                });

                function actualizarCampos() {
                    const propia = ["mia", "oficial"].includes(fields.kind.value);
                    const otra = fields.kind.value === "personalizada";
                    const presencial = fields.mode.value === "Presencial";

                    dialog.querySelector("#request-adventure-label").hidden = !propia;
                    dialog.querySelector("#request-idea-label").hidden = !otra;
                    dialog.querySelector("#request-location-label").hidden = !presencial;

                    fields.adventure.disabled = !propia;
                    fields.idea.disabled = !otra;
                    fields.location.disabled = !presencial;
                    fields.location.required = presencial;

                    dialog.querySelector("#request-idea-title").textContent =
                        fields.kind.value === "oficial"
                            ? "¿Qué campaña oficial quieres jugar?"
                            : "¿Qué aventura tienes en mente?";
                }

                function resumen() {
                    const d = Object.fromEntries(new FormData(form));

                    const tipos = {
                        mia: "Aventura de La Mazmorra del Roleo",
                        oficial: "Campaña oficial",
                        personalizada: "Aventura personalizada",
                    };

                    const fechas = [];

                    if (d.date1) {
                        const [year, month, day] = d.date1.split("-");
                        fechas.push(`${day}/${month}/${year} a las ${d.time1}`);
                    }

                    return [
                        "¡Hola, Hugo! Me gustaría solicitar una partida.",
                        "",
                        `Nombre: ${d.name.trim()}`,
                        ...(d.contact?.trim() ? [`Contacto: ${d.contact.trim()}`] : []),
                        `Tipo: ${tipos[d.kind]}`,
                        `Aventura: ${["mia", "oficial"].includes(d.kind) ? d.adventure : d.idea.trim() || "Busco recomendación"}`,
                        `Formato: ${d.format}`,
                        `Duración por sesión: ${
                            d.duration === "4"
                                ? "4 horas aproximadamente"
                                : `${String(d.duration).replace(".", ",")} horas`
                        }`,
                        "",
                        `Grupo: ${d.group}`,
                        `Jugadores: ${d.players}`,
                        `Experiencia: ${d.experience}`,
                        `Nivel: ${d.level}`,
                        `Modalidad: ${d.mode}${d.location ? ` · ${d.location.trim()}` : ""}`,
                        "",
                        "Disponibilidad · horario de Madrid:",
                        ...fechas.map((fecha) => `• ${fecha}`),
                        d.availability.trim()
                            ? `Disponibilidad alternativa: ${d.availability.trim()}`
                            : "",
                        `Frecuencia: ${d.frequency}`,
                        d.notes.trim() ? `Comentarios: ${d.notes.trim()}` : "",
                        "",
                        typeof estimatePrice === "function"
                            ? `PRECIO ORIENTATIVO:\n${estimatePrice(d)}`
                            : "PRECIO ORIENTATIVO: pendiente de calcular.",
                        "",
                        "¿Podrías confirmarme disponibilidad, presupuesto y condiciones?",
                    ]
                        .filter((linea) => linea !== "")
                        .join("\n");
                }

                function pintarResumenVisual() {
                    const d = Object.fromEntries(new FormData(form));
                    const contenedor = dialog.querySelector("#request-summary");

                    const escapar = (valor) =>
                        String(valor ?? "").replace(
                            /[&<>"']/g,
                            (caracter) =>
                                ({
                                    "&": "&amp;",
                                    "<": "&lt;",
                                    ">": "&gt;",
                                    '"': "&quot;",
                                    "'": "&#39;",
                                })[caracter],
                        );

                    const tipos = {
                        mia: "Aventura de La Mazmorra del Roleo",
                        oficial: "Campaña oficial",
                        personalizada: "Aventura personalizada",
                    };

                    const aventura = ["mia", "oficial"].includes(d.kind)
                        ? d.adventure
                        : d.idea?.trim() || "Aventura por definir";

                    const fecha = d.date1
                        ? d.date1.split("-").reverse().join("/")
                        : "Por acordar";

                    const duracion =
                        d.duration === "4"
                            ? "4 horas aproximadamente"
                            : `${String(d.duration).replace(".", ",")} horas`;

                    const precio =
                        typeof estimatePrice === "function"
                            ? estimatePrice(d)
                            : "Presupuesto pendiente de calcular.";

                    const dato = (etiqueta, valor) => `
                    <div class="review-detail">
                        <dt>${escapar(etiqueta)}</dt>
                        <dd>${escapar(valor)}</dd>
                    </div>
                `;

                    const lineasPrecio = precio.split("\n").filter(Boolean);

                    contenedor.innerHTML = `
                    <div class="review-heading">
                        <span class="review-kicker">TU PRÓXIMA AVENTURA</span>
                        <h3>${escapar(aventura)}</h3>
                        <p>${escapar(tipos[d.kind])}</p>

                        <div class="review-tags">
                            <span>${escapar(d.format)}</span>
                            <span>${escapar(d.mode)}</span>
                            <span>${escapar(d.players)} jugadores</span>
                        </div>
                    </div>

                    <div class="review-body">
                        <section class="review-block">
                            <h4>La sesión</h4>
                            <dl class="review-grid">
                                ${dato("Fecha", fecha)}
                                ${dato("Hora · Madrid", d.time1)}
                                ${dato("Duración", duracion)}
                                ${dato("Frecuencia", d.frequency)}
                            </dl>
                        </section>

                        <section class="review-block">
                            <h4>Vuestro grupo</h4>
                            <dl class="review-grid">
                                ${dato("Contacto", d.name)}
                                ${dato("Grupo", d.group)}
                                ${dato("Experiencia", d.experience)}
                                ${dato("Nivel", d.level)}
                                ${d.location ? dato("Localidad", d.location) : ""}
                            </dl>
                        </section>

                        ${
                            d.availability?.trim() || d.notes?.trim()
                                ? `
                                    <section class="review-block">
                                        <h4>Detalles adicionales</h4>
                                        <dl class="review-grid">
                                            ${
                                                d.availability?.trim()
                                                    ? dato("Disponibilidad alternativa", d.availability)
                                                    : ""
                                            }
                                            ${d.notes?.trim() ? dato("Comentarios", d.notes) : ""}
                                        </dl>
                                    </section>
                                `
                                : ""
                        }

                        <section class="review-budget">
                            <h4>Presupuesto orientativo</h4>
                            ${lineasPrecio
                                .map(
                                    (linea) => `
                                <p class="${
                                    linea.startsWith("TOTAL") ? "review-total" : "review-price-line"
                                }">${escapar(linea)}</p>
                            `,
                                )
                                .join("")}
                        </section>
                    </div>
                `;
                }
                function mostrarPaso() {
                    dialog.querySelectorAll("[data-step]").forEach((bloque) => {
                        const activo = Number(bloque.dataset.step) === paso;
                        bloque.hidden = !activo;

                        bloque.querySelectorAll("input, select, textarea").forEach((campo) => {
                            campo.disabled = !activo;
                        });
                    });

                    actualizarCampos();

                    dialog.querySelectorAll("[data-step]").forEach((bloque) => {
                        if (Number(bloque.dataset.step) !== paso) {
                            bloque.querySelectorAll("input, select, textarea").forEach((campo) => {
                                campo.disabled = true;
                            });
                        }
                    });
                    dialog.querySelector("#request-progress").textContent =
                        paso === 3 ? "Revisa tu solicitud" : `Paso ${paso + 1} de 3`;

                    dialog.querySelector("#request-back").hidden = paso === 0;

                    dialog.querySelector("#request-next").textContent =
                        paso === 3 ? "Enviar solicitud →" : "Continuar →";
                    error.textContent = "";

                    if (paso === 3) {

                        habilitarParaResumen();
                        pintarResumenVisual();
                        Array.from(fields).forEach((campo) => {
                            if (campo.matches("input, select, textarea")) campo.disabled = true;
                        });
                    }
                }

                function habilitarParaResumen() {
                    form.querySelectorAll("input, select, textarea").forEach((campo) => {
                        campo.disabled = false;
                    });
                    actualizarCampos();
                }

                fields.kind.addEventListener("change", actualizarCampos);
                fields.mode.addEventListener("change", actualizarCampos);

                dialog.querySelector("#request-back").onclick = () => {
                    paso = Math.max(0, paso - 1);
                    mostrarPaso();
                };

                let agendaSubmitVersion = 0;
                let requestToken = "",
                    submissionSignature = "";
                form.onsubmit = async (evento) => {
                    const submitVersion = ++agendaSubmitVersion;
                    evento.preventDefault();
                    if (paso < 3 && !form.reportValidity()) return;

                    if (paso === 1 && !fields.name.value.trim()) {
                        error.textContent = "Indica tu nombre.";
                        fields.name.focus();
                        return;
                    }

                    if (paso === 2) {
                        const fecha = fields.date1.value;
                        const hora = fields.time1.value;

                        if (!fecha || !hora) {
                            error.textContent = "Selecciona una fecha y una hora.";
                            return;
                        }

                        if (fecha < fields.date1.min) {
                            error.textContent = "Selecciona una fecha de hoy en adelante.";
                            return;
                        }

                        const [horas, minutos, segundos = 0] = hora.split(":").map(Number);

                        if (minutos % 5 !== 0 || segundos !== 0) {
                            fields.time1.setCustomValidity(
                                "Selecciona una hora en intervalos de 5 minutos: 18:00, 18:05, 18:10...",
                            );
                            fields.time1.reportValidity();
                            return;
                        }

                        fields.time1.setCustomValidity("");
                        const button = dialog.querySelector("#request-next");
                        button.disabled = true;
                        try {
                            await agendaClient.check(form);
                            if (!dialog.open || submitVersion !== agendaSubmitVersion) return;
                        } catch (failure) {
                            error.textContent = failure.message;
                            return;
                        } finally {
                            button.disabled = false;
                        }
                    }

                    if (paso < 3) {
                        paso++;
                        mostrarPaso();
                        dialog.scrollTop = 0;
                        return;
                    }

                    const button = dialog.querySelector("#request-next");
                    button.disabled = true;
                    try {
                        await agendaClient.check(form);
                        if (!dialog.open || submitVersion !== agendaSubmitVersion) return;
                        habilitarParaResumen();
                        const data = Object.fromEntries(new FormData(form));
                        data.players = Number(data.players);
                        const signature = JSON.stringify(data);
                        if (signature !== submissionSignature || !requestToken) {
                            submissionSignature = signature;
                            requestToken = [...crypto.getRandomValues(new Uint8Array(16))]
                                .map((n) => n.toString(16).padStart(2, "0"))
                                .join("");
                        }
                        const account = await agendaClient.account();
                        const response = await requestWithStatus("api/game-requests", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Mazmorra-CSRF": account.csrf,
                            },
                            data: JSON.stringify({ ...data, request_token: requestToken }),
                        });
                        const result = response.data;
                        if ((response.status < 200 || response.status >= 300))
                            throw Error(result.error || "No se pudo guardar la solicitud.");
                        if (!dialog.open || submitVersion !== agendaSubmitVersion) return;
                        const mensaje = resumen() + "\n\nReferencia web: " + result.reference;
                        const receipt = document.createElement("section");
                        receipt.className = "request-web-receipt";
                        const title = document.createElement("h3");
                        title.textContent = "Solicitud recibida";
                        const detail = document.createElement("p");
                        const nombrePartida =
                            data.kind === "personalizada"
                                ? "Partida personalizada"
                                : data.adventure;

                        const fechaSolicitud = data.date1.split("-").reverse().join("/");

                        detail.textContent =
                            `${data.name.trim()} · ${nombrePartida} · ` +
                            `${fechaSolicitud} a las ${data.time1} (Madrid).\n\n` +
                            "Revisaremos tu propuesta. La fecha y el precio quedan pendientes " +
                            "de confirmación; las horas todavía no están reservadas.";
                        +". Revisaremos tu propuesta. La fecha y el precio quedan pendientes de confirmación; las horas todavía no están reservadas.";
                        const accountNote = document.createElement("p");
                        accountNote.textContent = account.user
                            ? "También puedes verla en Mis partidas."
                            : "Guarda la referencia. Te responderemos por el contacto que has indicado.";
                        const link = document.createElement("a");
                        link.className = "btn gold";
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        link.textContent = "Continuar por WhatsApp ↗";
                        link.href =
                            "https://wa.me/" +
                            String(siteData?.config?.whatsapp || "34666530043").replace(
                                /\D/g,
                                "",
                            ) +
                            "?text=" +
                            encodeURIComponent(mensaje);
                        const close = createBaseButton({ class: "btn outline" });
                        close.textContent = "Cerrar";
                        close.onclick = () => dialog.close();
                        receipt.append(title, detail, accountNote, link, close);
                        dialog.querySelector(".request-web-receipt")?.remove();
                        form.before(receipt);
                        form.hidden = true;
                    } catch (failure) {
                        error.textContent = failure.message;
                    } finally {
                        button.disabled = false;
                    }
                };

                dialog.querySelector(".close").onclick = () => dialog.close();
                let inicioFuera = false;

                function estaFuera(event) {
                    const rect = dialog.getBoundingClientRect();

                    return (
                        event.target === dialog &&
                        (event.clientX < rect.left ||
                            event.clientX > rect.right ||
                            event.clientY < rect.top ||
                            event.clientY > rect.bottom)
                    );
                }

                dialog.addEventListener("pointerdown", (event) => {
                    inicioFuera = event.button === 0 && estaFuera(event);
                });

                dialog.addEventListener("click", (event) => {
                    if (inicioFuera && estaFuera(event)) {
                        dialog.close();
                    }

                    inicioFuera = false;
                });

                dialog.addEventListener("pointercancel", () => {
                    inicioFuera = false;
                });
                dialog.addEventListener("close", () => {
                    agendaSubmitVersion++;
                    dialog.querySelector(".request-web-receipt")?.remove();
                    form.hidden = false;
                    form.reset();
                    paso = 0;

                    fields.kind.dispatchEvent(new Event("change", { bubbles: true }));

                    fields.mode.dispatchEvent(new Event("change", { bubbles: true }));

                    fields.time1.setCustomValidity("");

                    dialog.querySelector("#request-summary").replaceChildren();
                    error.textContent = "";

                    mostrarPaso();
                    dialog.scrollTop = 0;
                });

                form.addEventListener("agenda-edit-schedule", () => {
                    paso = 2;
                    mostrarPaso();
                    fields.date1.focus();
                });
                agendaClient.setupAvailability(form, dialog);
                const estimatePrice = initializePricing();

                botones.forEach((boton) => {
                    boton.addEventListener("click", () => {
                        if (dialog.open) return;

                        const fechaCalendario =
                            document.querySelector("#calendar-days")?.dataset.selectedDate;
                        if (
                            /^\d{4}-\d{2}-\d{2}$/.test(fechaCalendario || "") &&
                            fechaCalendario >= fields.date1.min
                        ) {
                            fields.date1.value = fechaCalendario;
                            fields.date1.dispatchEvent(new Event("input", { bubbles: true }));
                            fields.date1.dispatchEvent(new Event("change", { bubbles: true }));
                        }

                        mostrarPaso();
                        dialog.showModal();
                    });
                });
            })();

            (() => {

                const previousBody = document.querySelector("#game-rates-body");
                if (previousBody && previousBody.tagName !== "TBODY") {
                    const table = document.createElement("table");
                    table.innerHTML =
                        '<caption class="game-rates__caption">Tarifas por jugador de las aventuras disponibles</caption><thead><tr><th scope="col">Aventura</th><th scope="col">Formato y nivel</th><th scope="col">Precio por jugador</th><th scope="col">Por sesión</th><th scope="col">Solicitud</th></tr></thead><tbody id="game-rates-body"></tbody>';
                    previousBody.replaceWith(table);
                }
                const body = document.querySelector("#game-rates-body");
                if (!body) return;
                const section = body.closest(".game-rates");
                const scroll = body.closest(".game-rates__scroll");
                const empty = section.querySelector("#game-rates-empty");
                const tabs = section.querySelectorAll("[data-rates-origin]");
                const adventures = (siteData?.commissioned_games || []).filter(
                    (x) => x.published === true && ["mia", "oficial"].includes(x.origin),
                );
                const money = (n) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(n);
                const normalize = (x) =>
                    String(x || "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .trim();
                const singleSession = (x) =>
                    [
                        "partida unica",
                        "one-shot",
                        "oneshot",
                        "one shot",
                        "una sola sesion",
                        "1 sola sesion",
                    ].includes(normalize(x));
                function rateOf(x) {
                    if (x.hourly_rate == null || x.hourly_rate === "") return null;
                    const rate = Number(String(x.hourly_rate).replace(",", "."));
                    return Number.isFinite(rate) && rate > 0 ? rate : null;
                }
                function element(tag, text, cls) {
                    const el = document.createElement(tag);
                    if (text != null) el.textContent = text;
                    if (cls) el.className = cls;
                    return el;
                }

                function levelRanges(text) {
                    const ranges = [];
                    String(text || "").replace(/(\d+)\s*[–—-]\s*(\d+)|(\d+)/g, (_, a, b, c) => {
                        ranges.push(a ? [Number(a), Number(b)] : [Number(c), Number(c)]);
                        return "";
                    });
                    return ranges.filter(([a, b]) => a >= 1 && b <= 20 && a <= b);
                }
                const tools = element("div", null, "game-rates__tools");
                tools.innerHTML = `<label class="rates-search">Buscar aventura<input type="search" name="rates_search" placeholder="Nombre de la aventura…" autocomplete="off"></label><p class="rates-results" role="status" aria-live="polite"></p>`;
                const caption = scroll.querySelector("caption");
                if (caption) caption.append(tools);
                else scroll.before(tools);
                const get = (name) => tools.querySelector(`[name="rates_${name}"]`);
                let sortKey = "",
                    ascending = true;
                const headers = scroll.querySelectorAll("thead th");
                const sortButtons = [];
                for (const [index, key, label] of [
                    [0, "name", "Aventura"],
                    [1, "level", "Formato y nivel"],
                    [2, "price", "Precio por jugador"],
                ]) {
                    if (!headers[index]) continue;
                    const button = createBaseButton({ class: "rates-heading-sort" }, label + " ↕");
                    headers[index].replaceChildren(button);
                    headers[index].setAttribute("aria-sort", "none");
                    sortButtons.push({ button, header: headers[index], key, label });
                    button.addEventListener("click", () => {
                        ascending = sortKey === key ? !ascending : true;
                        sortKey = key;
                        for (const entry of sortButtons) {
                            const active = entry.key === sortKey;
                            entry.header.setAttribute(
                                "aria-sort",
                                active ? (ascending ? "ascending" : "descending") : "none",
                            );
                            entry.button.textContent =
                                entry.label + (active ? (ascending ? " ↑" : " ↓") : " ↕");
                        }
                        refresh();
                    });
                }
                section
                    .querySelectorAll(".game-rates__pagination")
                    .forEach((x) => x.remove());
                const pagination = element("nav", null, "game-rates__pagination");
                pagination.setAttribute("aria-label", "Páginas de aventuras");
                const previous = createBaseButton(undefined, "← Anterior"),
                    next = createBaseButton(undefined, "Siguiente →"),
                    info = element("span", "");
                info.setAttribute("aria-live", "polite");
                pagination.append(previous, info, next);
                scroll.after(pagination);
                let currentPage = 1,
                    currentOrigin =
                        section.querySelector('[data-rates-origin][aria-pressed="true"]')?.dataset
                            .ratesOrigin || "mia";
                function groupPriority(item) {
                    const format = normalize(item.format);
                    if (format.includes("larga") || format === "campana") return 0;
                    if (format.includes("corta")) return 1;
                    if (singleSession(item.format)) return 3;
                    if (format.includes("sesiones")) return 2;
                    return 4;
                }
                function startingLevel(item) {
                    const ranges = levelRanges(item.level);
                    return ranges.length ? Math.min(...ranges.map(([start]) => start)) : null;
                }
                function filtered() {
                    const query = normalize(get("search").value);
                    return adventures
                        .filter(
                            (item) =>
                                item.origin === currentOrigin &&
                                normalize(item.title).includes(query),
                        )
                        .sort((a, b) => {
                            const group = groupPriority(a) - groupPriority(b);
                            if (group) return group;
                            if (!sortKey) return 0;
                            if (sortKey === "name")
                                return (ascending ? 1 : -1) * a.title.localeCompare(b.title, "es");
                            const av = sortKey === "level" ? startingLevel(a) : rateOf(a);
                            const bv = sortKey === "level" ? startingLevel(b) : rateOf(b);

                            if (av === null || bv === null)
                                return av === bv ? 0 : av === null ? 1 : -1;

                            if (sortKey === "price") {
                                const unit =
                                    Number(singleSession(a.format)) - Number(singleSession(b.format));
                                if (unit) return unit;
                            }
                            return (ascending ? 1 : -1) * (av - bv);
                        });
                }
                function requestAdventure(item) {
                    const opener = document.querySelector("[data-request-game]");
                    if (!opener) return;
                    opener.click();
                    const f = document.querySelector("#request-game-form");
                    if (!f) return;
                    f.elements.kind.value = item.origin;
                    f.elements.kind.dispatchEvent(new Event("change", { bubbles: true }));
                    f.elements.adventure.value = item.title;
                    f.elements.adventure.dispatchEvent(new Event("change", { bubbles: true }));
                    f.elements.adventure.focus();
                }
                function render() {
                    const visible = filtered(),
                        pages = Math.max(1, Math.ceil(visible.length / 4));
                    currentPage = Math.max(1, Math.min(currentPage, pages));
                    body.replaceChildren();
                    scroll.hidden = false;
                    section.classList.toggle('is-empty', visible.length === 0);
                    const tableHead = scroll.querySelector('thead');
                    if (tableHead) tableHead.hidden = visible.length === 0;
                    if (empty) {
                        empty.hidden = !!visible.length;
                        empty.textContent = adventures.some(item => item.origin === currentOrigin)
                            ? "No encontramos aventuras con ese nombre. Prueba otra búsqueda o borra los filtros."
                            : "Todavía no hay aventuras publicadas en esta categoría. Prueba la otra pestaña.";
                    }
                    pagination.hidden = visible.length <= 4;
                    previous.disabled = currentPage === 1;
                    next.disabled = currentPage === pages;
                    info.textContent = `Página ${currentPage} de ${pages}`;
                    const start = (currentPage - 1) * 4;
                    tools.querySelector(".rates-results").textContent = visible.length
                        ? `${visible.length} aventura${visible.length === 1 ? "" : "s"} · Mostrando ${start + 1}–${Math.min(start + 4, visible.length)}`
                        : "0 aventuras encontradas";
                    visible.slice(start, start + 4).forEach((item) => {
                        const single = singleSession(item.format),
                            rate = rateOf(item),
                            row = element("tr");
                        const category = ["long", "short", "multi", "oneshot"][groupPriority(item)];
                        if (category) row.dataset.formatColor = category;
                        const title = element("td");
                        title.append(element("strong", item.title, "game-rates__title"));

                        let detailsRow = null;
                        let detailsButton = null;

                        if (item.description) {
                            detailsButton = createBaseButton({ class: "rates-details-button" }, "＋ Ver detalles");
                            detailsButton.setAttribute("aria-expanded", "false");

                            detailsRow = element("tr", null, "rates-details-row");
                            detailsRow.hidden = true;

                            const detailsCell = document.createElement("td");
                            detailsCell.colSpan = 5;

                            const content = element("div", null, "rates-details-content");

                            String(item.description)
                                .split(/\n\s*\n/)
                                .filter((text) => text.trim())
                                .forEach((text, index) => {
                                    const paragraph = document.createElement("p");
                                    const cleaned = text.trim();

                                    if (cleaned.startsWith("Experiencia recomendada:")) {
                                        const heading = document.createElement("strong");
                                        heading.textContent = "Experiencia recomendada: ";

                                        paragraph.append(
                                            heading,
                                            document.createTextNode(
                                                cleaned.slice("Experiencia recomendada:".length).trim(),
                                            ),
                                        );
                                    } else if (index === 0) {

                                        const end = cleaned.indexOf(". ");

                                        const heading = document.createElement("strong");
                                        heading.textContent =
                                            end === -1 ? cleaned : cleaned.slice(0, end + 1);

                                        paragraph.append(heading);

                                        if (end !== -1) {
                                            paragraph.append(
                                                document.createTextNode(cleaned.slice(end + 1)),
                                            );
                                        }
                                    } else {
                                        paragraph.textContent = cleaned;
                                    }

                                    content.append(paragraph);
                                });

                            detailsCell.append(content);

                            detailsRow.append(detailsCell);
                            title.append(detailsButton);

                            detailsButton.addEventListener("click", () => {
                                const open = detailsRow.hidden;

                                detailsRow.hidden = !open;
                                detailsButton.setAttribute("aria-expanded", String(open));
                                detailsButton.textContent = open
                                    ? "− Ocultar detalles"
                                    : "＋ Ver detalles";
                            });
                        }
                        const format = element("td");
                        format.append(
                            element("span", item.format || "A consultar"),
                            element("small", item.level || "Nivel a consultar"),
                            element(
                                "small",
                                single ? "4 horas aproximadamente" : "Sesiones de 2, 2,5 o 3 horas",
                            ),
                        );
                        const price = element("td");
                        price.append(
                            element(
                                "strong",
                                rate === null ? "A consultar" : money(rate),
                                "game-rates__price",
                            ),
                            element(
                                "small",
                                single ? "Por jugador · pago único" : "Por jugador y hora",
                            ),
                        );
                        const session = element("td");
                        if (rate === null) session.textContent = "Pendiente de presupuesto";
                        else if (single)
                            session.append(
                                element("strong", `${money(rate)} por jugador`),
                                element("small", "Partida completa · pago único"),
                            );
                        else
                            [2, 2.5, 3].forEach((h) =>
                                session.append(
                                    element(
                                        "div",
                                        `${String(h).replace(".", ",")} h · ${money(rate * h)} por jugador`,
                                    ),
                                ),
                            );
                        const action = element("td"),
                            button = createBaseButton({ class: "game-rates__request" }, "Solicitar aventura ↗");
                        button.addEventListener("click", () => requestAdventure(item));
                        action.append(button);
                        row.append(title, format, price, session, action);
                        body.append(row);
                        if (detailsRow) {
                            body.append(detailsRow);
                        }
                    });
                    tabs.forEach((t) =>
                        t.setAttribute(
                            "aria-pressed",
                            String(t.dataset.ratesOrigin === currentOrigin),
                        ),
                    );
                }
                function refresh() {
                    currentPage = 1;
                    render();
                }
                const reset = createBaseButton({ class: "rates-reset" }, "Borrar filtros ↺");

                reset.addEventListener("click", () => {
                    get("search").value = "";
                    sortKey = "";
                    ascending = true;

                    for (const entry of sortButtons) {
                        entry.header.setAttribute("aria-sort", "none");
                        entry.button.textContent = entry.label + " ↕";
                    }

                    refresh();
                });

                if (caption) {
                    const captionHeading = element("div", null, "rates-caption-heading");
                    const captionTitle = element("span", "Tarifas por jugador de las aventuras disponibles");
                    captionHeading.append(captionTitle, reset);
                    caption.replaceChildren(captionHeading, tools);
                } else tools.prepend(reset);
                tools.addEventListener("input", refresh);
                tools.addEventListener("change", refresh);
                tabs.forEach((t) =>
                    t.addEventListener("click", () => {
                        currentOrigin = t.dataset.ratesOrigin;
                        refresh();
                    }),
                );
                function turn(offset) {
                    currentPage += offset;
                    render();
                }
                previous.addEventListener("click", () => turn(-1));
                next.addEventListener("click", () => turn(1));
                render();

                const opener = document.querySelector(".booking-guide__explore");
                if (
                    opener &&
                    typeof document.createElement("dialog").showModal === "function"
                ) {
                    if (!section.id) section.id = "adventure-rates";
                    const modal = element("dialog", null, "catalog-modal");
                    modal.id = "adventure-catalog-dialog";
                    modal.setAttribute("aria-labelledby", "game-rates-title");
                    const bar = element("div", null, "catalog-modal__bar");
                    const hint = element("span", "Aventuras para vuestra mesa");
                    const close = createBaseButton({ class: "catalog-modal__close" }, "×");
                    close.setAttribute("aria-label", "Cerrar catálogo");
                    bar.append(hint, close);
                    modal.append(bar, section);
                    document.body.append(modal);
                    addCatalogScrollControls(scroll);
                    section.hidden = false;

                    section.removeAttribute("data-reveal");
                    section.classList.remove("scroll-reveal");
                    section.classList.add("is-visible");
                    opener.setAttribute("aria-controls", modal.id);
                    opener.setAttribute("aria-haspopup", "dialog");
                    opener.setAttribute("aria-expanded", "false");
                    let savedScroll = 0;
                    function openCatalog(event) {
                        event?.preventDefault();
                        if (modal.open) return;
                        if (document.querySelector("dialog[open]")) return;
                        modal.showModal();
                        modal.scrollTop = savedScroll;
                        opener.setAttribute("aria-expanded", "true");
                        close.focus({ preventScroll: true });
                    }
                    function hideCatalog(keepBubble) {
                        savedScroll = modal.scrollTop;
                        if (modal.open) modal.close();
                        opener.setAttribute("aria-expanded", "false");
                        opener.focus({ preventScroll: true });
                    }
                    opener.addEventListener("click", openCatalog);
                    opener.addEventListener("keydown", (event) => {
                        if (event.key === " ") {
                            event.preventDefault();
                            opener.click();
                        }
                    });
                    close.addEventListener("click", () => hideCatalog(false));
                    modal.addEventListener("cancel", (event) => {
                        event.preventDefault();
                        hideCatalog(true);
                    });
                    let startedOutside = false;
                    function outside(event) {
                        const r = modal.getBoundingClientRect();
                        return (
                            event.clientX < r.left ||
                            event.clientX > r.right ||
                            event.clientY < r.top ||
                            event.clientY > r.bottom
                        );
                    }
                    modal.addEventListener("pointerdown", (event) => {
                        startedOutside = event.target === modal && outside(event);
                    });
                    modal.addEventListener("click", (event) => {
                        if (startedOutside && event.target === modal && outside(event))
                            hideCatalog(true);
                        startedOutside = false;
                    });

                    section.addEventListener(
                        "click",
                        (event) => {
                            if (event.target.closest(".game-rates__request")) hideCatalog(true);
                        },
                        true,
                    );
                }
            })();

            (() => {
                const page = document.querySelector('.about-page');
                if (!page) return;

                const scores = {
                    piedad: 8,
                    suerte: 16,
                    improvisacion: 18,
                    maldad: 14,
                    sadismo: 15,
                    disimulo: 17,
                };
                let assigned = 0;
                page.querySelectorAll('.dm-ability').forEach(box => {
                    const score = scores[box.dataset.ability];
                    if (!Number.isInteger(score) || score < 1 || score > 30) return;
                    const modifier = Math.floor((score - 10) / 2);
                    const scoreNode = box.querySelector('[data-score]');
                    const modifierNode = box.querySelector('[data-modifier]');
                    scoreNode.textContent = String(score);
                    scoreNode.setAttribute('aria-label', `Puntuación ${score}`);
                    modifierNode.textContent = modifier >= 0 ? `+${modifier}` : String(modifier);
                    modifierNode.setAttribute('aria-label', `Modificador ${modifierNode.textContent}`);
                    assigned++;
                });
                const note = page.querySelector('.dm-score-note');
                if (note && assigned === 6) note.hidden = true;

                page.querySelectorAll('[role="tablist"]').forEach(list => {
                    const tabs = [...list.querySelectorAll('[role="tab"]')];
                    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
                    if (!tabs.length || panels.some(panel => !panel)) return;
                    function select(index, focus = false) {
                        tabs.forEach((tab, i) => {
                            const active = index === i;
                            tab.setAttribute('aria-selected', String(active));
                            tab.tabIndex = active ? 0 : -1;
                            panels[i].hidden = !active;
                        });
                        if (focus) tabs[index].focus();
                    }
                    panels.forEach((panel, i) => {
                        panel.setAttribute('role', 'tabpanel');
                        panel.setAttribute('aria-labelledby', tabs[i].id);
                        panel.tabIndex = 0;
                    });
                    tabs.forEach((tab, i) => {
                        tab.addEventListener('click', () => select(i));
                        tab.addEventListener('keydown', event => {
                            let index;
                            if (event.key === 'ArrowRight') index = (i + 1) % tabs.length;
                            else if (event.key === 'ArrowLeft') index = (i + tabs.length - 1) % tabs.length;
                            else if (event.key === 'Home') index = 0;
                            else if (event.key === 'End') index = tabs.length - 1;
                            else return;
                            event.preventDefault();
                            select(index, true);
                        });
                    });
                    select(0);
                    list.hidden = false;
                });
            })();

            document.querySelectorAll('.about-page .dm-sheet-fold, .about-page .dm-ability, .about-page .dm-skills details, .about-page .about-chapters details').forEach((details) => {
                const summary = details.querySelector(':scope > summary');
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
                        duration: details.classList.contains('dm-sheet-fold') ? 450 : 320,
                        easing: 'cubic-bezier(.22, 1, .36, 1)',
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
                function iniciar() {
                    const group = document.querySelector('.about-table-cards');
                    if (!group || !('IntersectionObserver' in window)) return;
                    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
                    if (preference.matches) return;
                    const observer = new IntersectionObserver(entries => {
                        if (!entries.some(entry => entry.isIntersecting)) return;
                        group.classList.add('about-table-cards--entering');
                        observer.disconnect();
                    }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
                    observer.observe(group);
                    preference.addEventListener('change', event => {
                        if (!event.matches) return;
                        observer.disconnect();
                        group.classList.remove('about-table-cards--entering');
                    });
                }
                if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, {once: true});
                else iniciar();
            })();

            (() => {
                if (window.__solicitudAventurasColores) return;
                window.__solicitudAventurasColores = true;

                const normalizar = (valor) =>
                    String(valor || "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .trim();

                const formatos = [
                    { clave: "long", fondo: "#eee6f5", texto: "#503c64" },
                    { clave: "short", fondo: "#e7f0df", texto: "#345333" },
                    { clave: "multi", fondo: "#e3eff9", texto: "#284c69" },
                    { clave: "oneshot", fondo: "#fbe8d3", texto: "#74451f" },
                    { clave: "other", fondo: "#fffaf0", texto: "#304333" },
                ];

                function prioridad(formato) {
                    const texto = normalizar(formato);

                    if (
                        /one[ -]?shot|partida unica|una sola sesion|1 sola sesion/.test(texto)
                    ) {
                        return 3;
                    }

                    if (texto.includes("larga") || texto === "campana") return 0;
                    if (texto.includes("corta")) return 1;
                    if (texto.includes("sesiones")) return 2;

                    return 4;
                }

            function ordenarYPintar(selector) {
                const seleccionada = selector.value;
                const origen = selector.form?.elements.kind?.value;
                const aventuras = siteData?.commissioned_games;

                if (!Array.isArray(aventuras)) return;

                const publicaciones = aventuras.filter(
                    (aventura) => !origen || aventura.origin === origen,
                );

                const titulos = [
                    "Campaña larga",
                    "Campaña corta",
                    "Varias sesiones",
                    "One-shots · Una sola sesión",
                    "Otras aventuras",
                ];

                const opciones = Array.from(selector.options);
                const placeholder = opciones.find((opcion) => !opcion.value);
                const grupos = formatos.map(() => []);

                opciones.forEach((opcion) => {
                    if (!opcion.value) return;

                    const aventura = publicaciones.find(
                        (item) => item.title === opcion.value,
                    );

                    const posicion = aventura ? prioridad(aventura.format) : 4;

                    grupos[posicion].push(opcion);
                });

                grupos.forEach((grupo) => {
                    grupo.sort((a, b) =>
                        a.text.localeCompare(b.text, "es", {
                            sensitivity: "base",
                        }),
                    );
                });

                const firma = JSON.stringify(
                    grupos.map((grupo) =>
                        grupo.map((opcion) => [opcion.value, opcion.text]),
                    ),
                );

                const gruposActuales = Array.from(selector.children).filter(
                    (elemento) => elemento.tagName === "OPTGROUP",
                );

                const gruposEsperados = grupos.filter((grupo) => grupo.length).length;

                if (
                    selector.dataset.firmaGrupos !== firma ||
                    gruposActuales.length !== gruposEsperados ||
                    opciones.some(
                        (opcion) =>
                            opcion.value &&
                            opcion.parentElement.tagName !== "OPTGROUP",
                    )
                ) {
                    const contenido = document.createDocumentFragment();

                    if (placeholder) {
                        placeholder.style.backgroundColor = "#fffaf0";
                        placeholder.style.color = "#304333";
                        contenido.append(placeholder);
                    }

                    grupos.forEach((opcionesGrupo, indice) => {
                        if (!opcionesGrupo.length) return;

                        const color = formatos[indice];
                        const grupo = document.createElement("optgroup");

                        grupo.label = titulos[indice];
                        grupo.style.backgroundColor = color.fondo;
                        grupo.style.color = color.texto;

                        opcionesGrupo.forEach((opcion) => {
                            opcion.dataset.formatColor = color.clave;
                            opcion.style.backgroundColor = color.fondo;
                            opcion.style.color = color.texto;

                            grupo.append(opcion);
                        });

                        contenido.append(grupo);
                    });

                    selector.replaceChildren(contenido);
                    selector.value = seleccionada;
                    selector.dataset.firmaGrupos = firma;
                }

                const opcionActual = selector.selectedOptions[0];

                const colorActual =
                    formatos.find(
                        (formato) =>
                            formato.clave === opcionActual?.dataset.formatColor,
                    ) || formatos[4];

                selector.style.backgroundColor = colorActual.fondo;
                selector.style.color = colorActual.texto;
            }

                function iniciar() {
                    let pendiente = false;

                    function actualizar() {
                        pendiente = false;

                        document
                            .querySelectorAll(
                                '#request-game-form select[name="adventure"]',
                            )
                            .forEach(ordenarYPintar);
                    }

                    function programarActualizacion() {
                        if (pendiente) return;

                        pendiente = true;
                        queueMicrotask(actualizar);
                    }

                    document.addEventListener("change", (evento) => {
                        if (evento.target.matches("#request-game-form select")) {
                            programarActualizacion();
                        }
                    });

                    const observador = new MutationObserver(programarActualizacion);

                    observador.observe(document.body, {
                        childList: true,
                        subtree: true,
                    });

                    actualizar();

                    window.addEventListener("load", programarActualizacion, {
                        once: true,
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
            window.mazmorraContact = contact;
        } catch (error) {
            console.error("Unable to initialize view sobre-mi.", error);
        }
    },
};
</script>

