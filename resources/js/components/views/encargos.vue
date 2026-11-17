<template>
    <SiteHeader current="encargos" />
    <main class="interior-page commission-page">
        <section class="commission-hero">
            <img src="images/contacto.png" width="1448" height="1086" alt="Escritorio de creación de aventuras con pergamino y pluma">
            <div>
                <p class="eyebrow">ENCARGOS PERSONALIZADOS</p>
                <h1>Tu idea, una nueva <em>aventura.</em></h1>
                <p class="commission-lead">
                    Escribo aventuras y recursos para tu mesa. Podemos partir de una
                    idea, desarrollar tu material o crear los detalles que necesita tu
                    campaña.
                </p>
                <ol class="commission-process">
                    <li>
                        <b>01</b><strong>Cuéntame tu idea</strong><span>Tu punto de partida y lo que necesitas.</span>
                    </li>
                    <li>
                        <b>02</b><strong>Acordamos el encargo</strong><span>Contenido, precio, plazos y revisiones.</span>
                    </li>
                    <li>
                        <b>03</b><strong>Recibe tu contenido</strong><span>Entrega digital en el formato acordado.</span>
                    </li>
                </ol>
                <BaseButton class="btn commission-cta" data-open-commission="">
                    Cuéntame tu idea ↗
                </BaseButton>
                <p class="small">
                    No necesitas tenerlo todo resuelto. La consulta inicial no confirma
                    un encargo.
                </p>
            </div>
        </section>
        <section class="commission-block">
            <p class="eyebrow">QUÉ PODEMOS CREAR</p>
            <h2>Contenido pensado para tu mesa.</h2>
            <div class="commission-cards">
                <article>
                    <span class="commission-icon" aria-hidden="true"><FluentIcon name="games" /></span>
                    <h3>Aventuras a medida</h3>
                    <p>Una historia creada para vuestro grupo, con el nivel, el tono y la duración que buscáis. Desde un one-shot hasta una campaña corta.</p>
                    <p class="commission-example"><strong>Por ejemplo: </strong>Una aventura de terror para dos sesiones.</p>
                    <BaseButton class="commission-price-open" data-open-prices="0" aria-haspopup="dialog" aria-controls="commission-prices-dialog">Consultar precios ↗</BaseButton></article>
                <article>
                    <span class="commission-icon" aria-hidden="true"><FluentIcon name="hand-draw" /></span>
                    <h3>Adaptación de contenido</h3>
                    <p>Doy forma a tus notas o reviso el contenido que ya tienes para dejarlo listo para jugar. Acordaremos los cambios, el sistema y el alcance.</p>
                    <p class="commission-example"><strong>Por ejemplo: </strong>Convertir tu idea en una aventura con objetivos y encuentros.</p>
                    <BaseButton class="commission-price-open" data-open-prices="3" aria-haspopup="dialog" aria-controls="commission-prices-dialog">Consultar precios ↗</BaseButton></article>
                <article>
                    <span class="commission-icon" aria-hidden="true"><FluentIcon name="library" /></span>
                    <h3>Compendios y suplementos</h3>
                    <p>Recursos para enriquecer tu campaña: objetos mágicos, criaturas y localizaciones. Elige qué necesitas y cuánto contenido quieres incluir.</p>
                    <p class="commission-example"><strong>Por ejemplo: </strong>Un pequeño bestiario o una localización con secretos.</p>
                    <BaseButton class="commission-price-open" data-open-prices="1" aria-haspopup="dialog" aria-controls="commission-prices-dialog">Consultar precios ↗</BaseButton></article>
            </div>
        </section>

        <section class="commission-envelope" aria-labelledby="commission-envelope-title">
            <details class="commission-envelope__details">
                <summary class="commission-envelope__cover">
                    <span class="commission-envelope__drawing" aria-hidden="true"><span class="commission-envelope__seal">♜</span></span>
                    <span class="commission-envelope__intro">
                        <span class="commission-envelope__eyebrow">UNA PROPUESTA PARA TU MESA</span>
                        <h2 id="commission-envelope-title">Tu encargo, con todo claro.</h2>
                        <span class="commission-envelope__description">Qué acordaremos y cómo recibirás tu contenido.</span>
                        <span class="commission-envelope__action"><span class="commission-envelope__closed-label">Abrir el sobre</span><span class="commission-envelope__open-label">Cerrar el sobre</span><span class="commission-envelope__symbol" aria-hidden="true"></span></span>
                    </span>
                </summary>
                <div class="commission-envelope__sheet">
                    <div class="commission-envelope__letter-heading"><span>LA MAZMORRA DEL ROLEO</span><span>Los detalles de tu encargo</span></div>
                    <div class="commission-envelope__columns">
                        <div>
                            <h3>Antes de empezar</h3>
                            <p>Recibirás una propuesta con estos cuatro puntos:</p>
                            <dl class="commission-envelope__agreement">
                                <div><dt>Contenido</dt><dd>Qué voy a preparar.</dd></div>
                                <div><dt>Presupuesto</dt><dd>Cuánto costará.</dd></div>
                                <div><dt>Plazo</dt><dd>Cuándo lo recibirás.</dd></div>
                                <div><dt>Revisiones</dt><dd>Qué ajustes están incluidos.</dd></div>
                            </dl>
                            <p class="commission-envelope__small">Si el encargo crece, acordaremos los cambios antes de continuar.</p>
                        </div>
                        <div class="commission-envelope__delivery">
                            <h3>La entrega</h3>
                            <p>Recibirás tu contenido en el formato acordado. El presupuesto detallará los archivos incluidos.</p>
                            <dl class="commission-envelope__formats">
                                <div><dt>PDF</dt><dd>El documento para leer, preparar y consultar.</dd></div>
                                <div><dt>VTT / JSON</dt><dd>Recursos digitales según el contenido y la compatibilidad de la plataforma.</dd></div>
                            </dl>
                            <p class="commission-envelope__signature">Una propuesta a tu medida.<br /><span>Hugo · La Mazmorra del Roleo</span></p>
                        </div>
                    </div>
                    <p class="commission-envelope__notice"><strong>No realizo mapas.</strong> Las ilustraciones y los recursos adicionales se presupuestan aparte.</p>
                </div>
            </details>
        </section>

        <section id="encargos-faq" class="formats-guide" aria-labelledby="encargos-faq-title">
            <div class="formats-guide__heading">
                <p class="eyebrow">ANTES DE ENCARGAR</p>
                <h2 id="encargos-faq-title">Resolvemos tus dudas.</h2>
                <p>
                    Qué puedes encargar, cómo acordamos los detalles y qué recibirás al
                    terminar.
                </p>
                <BaseButton class="commission-faq-toggle" aria-expanded="false" aria-controls="commission-faq-questions">Ver preguntas ＋</BaseButton>
            </div>
            <div id="commission-faq-questions" hidden="" class="formats-guide__questions">
                <details>
                    <summary>¿Necesito tener la idea desarrollada?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead"><strong>No necesitas tener la idea desarrollada.</strong> Una temática, una escena o una necesidad de tu campaña pueden ser el punto de partida.</p><ul class="formats-guide__resources"><li><strong>Una temática</strong><span>El tono o la ambientación que te apetece explorar.</span></li><li><strong>Una escena</strong><span>Ese momento que quieres llevar a tu mesa.</span></li><li><strong>Una necesidad</strong><span>El contenido que echas en falta en tu campaña.</span></li></ul><div class="formats-guide__notice"><p>Te ayudaré a concretar <strong>qué contenido podemos preparar</strong> a partir de tu idea.</p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Cuánto cuesta un encargo?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">Puedes obtener una <strong>estimación con los paquetes y extras de la calculadora</strong>.</p><p>El precio depende de:</p><ul class="formats-guide__resources"><li><strong>Extensión</strong><span>La cantidad de contenido que acordemos preparar.</span></li><li><strong>Complejidad</strong><span>El trabajo que requiere desarrollar tu propuesta.</span></li><li><strong>Formatos de entrega</strong><span>Los archivos y recursos incluidos en el encargo.</span></li></ul><div class="formats-guide__notice"><strong class="formats-guide__notice-title">Presupuesto confirmado antes de empezar</strong><p>Puedes indicar un rango para que valoremos el alcance. <strong>Te confirmaré el presupuesto antes de comenzar el trabajo.</strong></p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Cuánto tarda?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">El plazo depende del <strong>encargo y de mi disponibilidad</strong>.</p><p>Indica si tienes una fecha objetivo para que podamos valorar tu propuesta.</p><div class="formats-guide__notice"><strong class="formats-guide__notice-title">Un plazo acordado contigo</strong><p>Acordaremos la fecha de entrega <strong>antes de confirmar el trabajo</strong>.</p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Puedo pedir cambios?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead"><strong>Acordaremos las revisiones incluidas</strong> en tu encargo.</p><div class="formats-guide__notice"><strong class="formats-guide__notice-title">Si la idea crece durante el proceso</strong><p>Si solicitas contenido nuevo o cambios que amplían el alcance, concretaremos <strong>su coste y sus plazos antes de realizarlos</strong>.</p></div>
                    </div>
                </details>
                <details>
                    <summary>
                        ¿Incluye mapas, ilustraciones o archivos para VTT?
                    </summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">Las ilustraciones y los recursos para VTT o JSON <strong>se valoran según el proyecto</strong>.</p><ul class="formats-guide__resources"><li><strong>Ilustraciones</strong><span>Su inclusión se acuerda para cada encargo.</span></li><li><strong>Recursos para VTT</strong><span>El presupuesto indica los archivos incluidos.</span></li><li><strong>Archivos JSON</strong><span>Cuando corresponda, se especificará su compatibilidad.</span></li></ul><div class="formats-guide__notice"><strong class="formats-guide__notice-title">Mapas</strong><p><strong>No realizo mapas.</strong> El presupuesto detallará qué recursos forman parte de la entrega.</p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Cómo se confirma y se paga?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">Revisaremos tu propuesta <strong>por WhatsApp</strong> antes de confirmar el encargo.</p><ol class="formats-guide__steps"><li><strong>Acordamos los detalles.</strong> Contenido, importe, plazos, revisiones y condiciones de pago.</li><li><strong>Recibes las instrucciones.</strong> El pago se realiza por PayPal mediante enlace o QR.</li></ol><div class="formats-guide__notice formats-guide__notice--important"><strong class="formats-guide__notice-title">Antes de pagar</strong><p>Espera a tener <strong>confirmados los detalles del encargo</strong>.</p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Esto incluye que dirijas la partida?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">Este apartado es para <strong>crear contenido por encargo</strong>.</p><div class="formats-guide__notice formats-guide__notice--help"><strong class="formats-guide__notice-title">¿Buscas una partida dirigida para tu grupo?</strong><p>Visita el <a href="calendario">calendario y solicita tu partida</a>.</p></div>
                    </div>
                </details>
                <details>
                    <summary>¿Quién responde a mi consulta?</summary>
                    <div class="formats-guide__answer">
                        <p class="formats-guide__lead">Mi asistente de WhatsApp puede orientarte sobre <strong>los servicios y el proceso</strong>.</p><div class="formats-guide__notice formats-guide__notice--help"><strong class="formats-guide__notice-title">La revisión del encargo la hago yo</strong><p>Yo revisaré <strong>el alcance, el presupuesto y los plazos</strong>. Si hace falta mi atención, el asistente te derivará a mí.</p></div>
                    </div>
                </details>
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
                    Historias que se leen.<br>
                    Aventuras que se viven.
                </p>

                <a class="site-footer__contact" href="https://wa.me/34666530043" target="_blank" rel="noopener noreferrer">
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

                <a href="https://www.instagram.com/la_mazmorra_del_roleo/" target="_blank" rel="noopener noreferrer">
                    Instagram <span aria-hidden="true">↗</span>
                </a>

                <a href="https://mesasroleras.com/gm/osoliron411" target="_blank" rel="noopener noreferrer">
                    Mesas Roleras <span aria-hidden="true">↗</span>
                </a>

                <a href="https://linktr.ee/Osoliron411" target="_blank" rel="noopener noreferrer">
                    Todos mis enlaces · Linktree <span aria-hidden="true">↗</span>
                </a>

                <a class="site-footer__email" href="mailto:lamazmorradelroleo@gmail.com">
                    lamazmorradelroleo@gmail.com
                </a>
            </div>
        </div>

        <div class="site-footer__bottom">
            <p>
                © 2026 La Mazmorra del Roleo.
                <span>Proyecto independiente, no afiliado a Wizards of the Coast.</span>
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
    <dialog id="commission-prices-dialog" aria-labelledby="commission-prices-title"><div class="commission-prices-toolbar"><span>✦ &nbsp; GUÍA DE PRECIOS</span><BaseButton class="commission-prices-close" aria-label="Cerrar precios" autofocus="">×</BaseButton></div><section class="commission-prices">
            <p class="eyebrow">PRECIOS ORIENTATIVOS</p>
            <h2 id="commission-prices-title">Un punto de partida para tu encargo.</h2>
            <p>
                Elige un paquete en la calculadora para ver su contenido y añadir
                extras. Todos los importes están pendientes de confirmación tras
                revisar tu idea.
            </p>
            <p class="commission-price-categories-label">Explora las categorías</p>
            <div class="commission-price-tabs" role="tablist" aria-label="Categorías de precios">
                <BaseButton role="tab" id="price-tab-0" aria-controls="price-panel-0" aria-selected="true" tabindex="0">
                    Aventuras</BaseButton><BaseButton role="tab" id="price-tab-1" aria-controls="price-panel-1" aria-selected="false" tabindex="-1">
                    Compendios</BaseButton><BaseButton role="tab" id="price-tab-2" aria-controls="price-panel-2" aria-selected="false" tabindex="-1">
                    Extras</BaseButton><BaseButton role="tab" id="price-tab-3" aria-controls="price-panel-3" aria-selected="false" tabindex="-1">
                    Adaptaciones
                </BaseButton>
            </div>
            <div class="commission-price-navigation">
                <BaseButton id="price-previous" aria-label="Tabla anterior">
                    ←
                </BaseButton>
                <p id="price-position" role="status" aria-live="polite">
                    Aventuras · 1 de 4
                </p>
                <BaseButton id="price-next" aria-label="Tabla siguiente">
                    →
                </BaseButton>
            </div>
            <div role="tabpanel" id="price-panel-0" aria-labelledby="price-tab-0" tabindex="0">
                <div class="commission-price-scroll">
                    <table>
                        <caption>
                            Aventuras · precios orientativos
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Servicio</th>
                                <th scope="col">Qué incluye / alcance</th>
                                <th scope="col">Precio orientativo</th>
                            </tr>
                        </thead>
                        <tbody data-price-rows="0"></tbody>
                    </table>
                </div>
            </div>
            <div role="tabpanel" id="price-panel-1" aria-labelledby="price-tab-1" tabindex="0" hidden="">
                <div class="commission-price-scroll">
                    <table>
                        <caption>
                            Compendios · precios orientativos
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Servicio</th>
                                <th scope="col">Qué incluye / alcance</th>
                                <th scope="col">Precio orientativo</th>
                            </tr>
                        </thead>
                        <tbody data-price-rows="1"></tbody>
                    </table>
                </div>
            </div>
            <div role="tabpanel" id="price-panel-2" aria-labelledby="price-tab-2" tabindex="0" hidden="">
                <div class="commission-price-scroll">
                    <table>
                        <caption>
                            Extras · precios orientativos
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Servicio</th>
                                <th scope="col">Qué incluye / alcance</th>
                                <th scope="col">Precio orientativo</th>
                            </tr>
                        </thead>
                        <tbody data-price-rows="2"></tbody>
                    </table>
                </div>
            </div>
            <div role="tabpanel" id="price-panel-3" aria-labelledby="price-tab-3" tabindex="0" hidden="">
                <div class="commission-price-scroll">
                    <table>
                        <caption>
                            Adaptaciones · precios orientativos
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Servicio</th>
                                <th scope="col">Qué incluye / alcance</th>
                                <th scope="col">Precio orientativo</th>
                            </tr>
                        </thead>
                        <tbody data-price-rows="3"></tbody>
                    </table>
                </div>
            </div>
            <p class="small">
                PDF con maquetación sencilla y una ronda de ajustes incluidos en los
                paquetes de creación. Los extras se suman una sola vez; VTT, JSON y
                requisitos especiales se valoran aparte.
            </p>
            <BaseButton class="btn commission-cta" data-open-commission="">
                Calcular mi encargo ↗
            </BaseButton>
            <p class="small">
                La duración depende del ritmo de la mesa. No incluye dirección de
                partidas, mapas ni ilustraciones originales.
            </p>
        </section></dialog><dialog id="commission-dialog" class="commission-page" aria-labelledby="commission-dialog-title">
        <BaseButton class="commission-close" aria-label="Cerrar formulario">
            ×
        </BaseButton>
        <p class="eyebrow commission-dialog__eyebrow">✦ &nbsp; TU ENCARGO A MEDIDA</p>
        <h2 id="commission-dialog-title">Demos forma a tu idea.</h2>
        <p>
            Completa lo que sepas y revisa tu consulta antes de continuar por
            WhatsApp.
        </p>
        <form id="commission-form" novalidate="">
            <p id="commission-progress" class="commission-progress" aria-live="polite" tabindex="-1"></p>
            <div class="commission-progress-track" aria-hidden="true"><span></span></div>
            <fieldset data-commission-step="0">
                <legend>¿Qué necesitas?</legend>
                <p class="commission-step-intro">Elige el punto de partida que mejor se ajuste a tu idea. Si aún no lo tienes claro, también puedo ayudarte.</p>
                <label>Servicio<BaseSelect name="service" required="">
                        <option value="">Selecciona…</option>
                        <option value="adventure">Aventura a medida</option>
                        <option value="collection">Compendio o suplemento</option>
                        <option value="adaptation">Adaptación de contenido</option>
                        <option value="help">
                            No lo tengo claro, prefiero contártelo
                        </option>
                    </BaseSelect></label>
                <p>Crear contenido por encargo no incluye dirigir una partida.</p>
            </fieldset>
            <fieldset data-commission-step="1" hidden="">
                <legend>Configura tu encargo</legend>
                <p class="commission-step-intro">Selecciona un paquete y añade solo lo que necesites. Verás una estimación orientativa antes de continuar.</p>
                <label>Paquete<BaseSelect name="package" required=""></BaseSelect></label>
                <div id="commission-included" class="commission-notice"></div>
                <label>
                    ¿Quieres añadir extras?
                    <BaseSelect name="extras_choice" aria-controls="commission-extras">
                        <option value="no" selected="">
                            No, solo el contenido incluido
                        </option>
                        <option value="yes">Sí, quiero personalizarlo</option>
                    </BaseSelect>
                </label>

                <div class="commission-fields" id="commission-extras" hidden="">
                    <label>
                        Objetos adicionales
                        <input name="objects" type="number" min="0" max="30" step="1" value="0">
                    </label>

                    <label>
                        Criaturas sencillas adicionales
                        <input name="creatures" type="number" min="0" max="20" step="1" value="0">
                    </label>

                    <label>
                        Localizaciones breves adicionales
                        <input name="locations" type="number" min="0" max="20" step="1" value="0">
                    </label>

                    <label>
                        Bloques narrativos adicionales · hasta 2 páginas cada uno
                        <input name="pages" type="number" min="0" max="20" step="1" value="0">
                    </label>
                </div>
                <BaseCheckbox label-class="commission-illustrations" name="illustrations">
                    <span>
                        <strong>
                            Solicitar ilustraciones originales realizadas por un
                            ilustrador
                        </strong>
                        <small>
                            Opcional. Cantidad, estilo, detalle y derechos de uso a
                            acordar. Precio y plazo pendientes de presupuestar.
                        </small>
                    </span>
                </BaseCheckbox>

                <label>Formato de entrega<BaseSelect name="delivery">
                        <option value="pdf">PDF con maquetación sencilla</option>
                        <option value="vtt">
                            PDF y recursos para VTT · suplemento a consultar
                        </option>
                        <option value="json">
                            PDF y JSON · suplemento y compatibilidad a consultar
                        </option>
                    </BaseSelect>
                </label>

                <div id="commission-estimate" class="commission-estimate" role="status" aria-live="polite"></div>
                <p class="small">
                    Los extras se añaden a lo incluido. Las páginas necesarias para
                    presentar objetos, criaturas o localizaciones adicionales ya están
                    incluidas en su precio. Las páginas de contenido no cuentan portada,
                    índice ni créditos.
                </p>
            </fieldset>
            <fieldset data-commission-step="2" hidden="">
                <legend>Cuéntame tu idea</legend>
                <p class="commission-step-intro">Cuéntame lo que ya sabes; los campos opcionales pueden quedar en blanco.</p>
                <div class="commission-fields">
                    <label>Tu nombre<input name="name" autocomplete="name" maxlength="100" required=""></label><label>Sistema y edición · opcional<input name="system" maxlength="120" placeholder="Ej.: D&amp;D 5e 2014"></label><label class="wide">Tu idea y el material del que partes<textarea name="idea" rows="5" maxlength="4000" required="" placeholder="Qué necesitas, el tono que buscas y qué material tienes…"></textarea></label><label data-group-field="">Nivel y jugadores · opcional<input name="group" maxlength="120"></label><label>Fecha deseada de entrega · opcional<input type="date" name="date"></label><label class="wide">Otros requisitos · opcional<textarea name="notes" rows="3" maxlength="1500" placeholder="Varios rangos de nivel, jefe especial, uso comercial u otras necesidades…"></textarea>
                    </label>
                </div>
                <p class="small">
                    Podrás enviarme tus archivos por WhatsApp después de la consulta.
                    Los requisitos especiales se valoran aparte.
                </p>
            </fieldset>
            <section data-commission-step="3" hidden="" aria-label="Resumen de la consulta">
                <h3>Revisa tu consulta</h3>
                <p class="commission-step-intro">Comprueba los detalles antes de continuar. Puedes volver atrás para cambiarlos.</p>
                <div id="commission-message" class="commission-summary"></div>
                <p class="commission-notice">
                    <strong>Estimación orientativa.</strong> Confirmaré contigo el
                    alcance, la disponibilidad, el precio final y los plazos antes de
                    comenzar. No realices ningún pago todavía.
                </p>
                <a id="commission-send" class="btn commission-cta" target="_blank" rel="noopener noreferrer">Continuar por WhatsApp ↗</a>
            </section>
            <div class="commission-wizard-actions">
                <BaseButton id="commission-back" class="commission-edit" hidden="">
                    ← Anterior</BaseButton><BaseButton type="submit" class="btn commission-cta" id="commission-next">
                    Continuar →
                </BaseButton>
            </div>
            <p id="commission-status" role="status" aria-live="polite"></p>
        </form>
    </dialog>
    <dialog id="modal">
        <BaseButton class="close" aria-label="Cerrar ventana">×</BaseButton>
        <div id="modal-content"></div>
    </dialog>
</template>


<script>
import BaseSelect from '../core-ui/BaseSelect.vue';
import BaseCheckbox from '../core-ui/BaseCheckbox.vue';
import BaseButton from '../core-ui/BaseButton.vue';
import FluentIcon from '../shared/FluentIcon.vue';
import '../../../css/pages/encargos.css';
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
    components: { BaseButton, BaseCheckbox, BaseSelect, FluentIcon, SiteHeader },
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

            window.COMMISSION_PACKAGES = {
                adventure: [
                    {id:'scene',title:'Escena o encuentro',price:20,description:'Una situación, gancho y posibles resoluciones. Hasta 2 páginas. Sin objetos ni criaturas originales incluidos.'},
                    {id:'oneshot',title:'One-shot sencilla',price:40,description:'1 sesión, hasta 5 páginas, trama cerrada, 1 localización principal y 1 objeto mágico. Sin criaturas originales incluidas.'},
                    {id:'short',title:'Aventura corta',price:80,description:'2–3 sesiones, hasta 10 páginas, 2 objetos mágicos y 1 criatura original sencilla.'},
                    {id:'campaign',title:'Minicampaña',price:150,description:'4–6 sesiones, hasta 20 páginas, 3 objetos mágicos y 2 criaturas originales sencillas.'},
                ],
                collection: [
                    {id:'object',title:'Un objeto mágico',price:2.5,description:'Concepto, descripción y funcionamiento de un objeto mágico.'},
                    {id:'objects5',title:'Colección de 5 objetos',price:12,description:'Cinco objetos relacionados por una temática.'},
                    {id:'creature',title:'Una criatura sencilla',price:5,description:'Concepto y estadísticas de una criatura original sencilla.'},
                    {id:'creatures5',title:'Compendio de 5 criaturas sencillas',price:20,description:'Cinco criaturas originales sencillas con temática compartida.'},
                    {id:'location',title:'Una localización breve',price:10,description:'Descripción, secretos y ganchos de un lugar. Hasta 2 páginas, sin mapa.'},
                    {id:'boss',title:'Jefe con mecánicas especiales',price:8,description:'Jefe con mecánicas especiales. Complejidad pendiente de confirmación.'},
                ]
            };
            window.COMMISSION_EXTRA_RATES = {objects:2.5,creatures:5,locations:10,pages:10};
            window.commissionEstimate = function(service, packageId, quantities, delivery) {
                const pack = window.COMMISSION_PACKAGES[service]?.find(p=>p.id===packageId);
                if (!pack) return null;
                const extras = [['objects','Objetos adicionales'],['creatures','Criaturas sencillas adicionales'],['locations','Localizaciones breves adicionales'],['pages','Bloques narrativos de hasta 2 páginas']].map(([key,label])=>{
                    const rate=window.COMMISSION_EXTRA_RATES[key];
                    const quantity=Number(quantities[key] ?? 0);
                    const max=key==='objects'?30:20;
                    if (!Number.isInteger(quantity)||quantity<0||quantity>max) throw Error('Revisa las cantidades de los extras.');
                    return {label,quantity,rate,total:quantity*rate};
                });
                return {pack,extras,total:pack.price+extras.reduce((sum,e)=>sum+e.total,0),pending:delivery!=='pdf',from:!!pack.from};
            };

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

            (() => {
                const toggle = document.querySelector(".commission-faq-toggle");
                const questions = document.querySelector("#commission-faq-questions");
                let faqAnimation = null;
                toggle?.addEventListener("click", () => {
                    const open = toggle.getAttribute("aria-expanded") === "true";
                    const startHeight = questions.hidden ? 0 : questions.getBoundingClientRect().height;
                    faqAnimation?.cancel();
                    faqAnimation = null;
                    toggle.setAttribute("aria-expanded", String(!open));
                    toggle.textContent = open ? "Ver preguntas ＋" : "Ocultar preguntas −";
                    questions.inert = open;
                    if (!questions.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                        questions.hidden = open;
                        questions.style.overflow = "";
                        return;
                    }
                    questions.hidden = false;
                    questions.style.overflow = "hidden";
                    faqAnimation = questions.animate(
                        [{ height: `${startHeight}px`, opacity: open ? 1 : .65 },
                            { height: `${open ? 0 : questions.scrollHeight}px`, opacity: open ? .65 : 1 }],
                        { duration: 380, easing: "cubic-bezier(.22, 1, .36, 1)" },
                    );
                    faqAnimation.onfinish = () => {
                        questions.hidden = open;
                        questions.style.overflow = "";
                        faqAnimation = null;
                    };
                });
                const form = document.querySelector("#commission-form");
                if (!form) return;
                const modal = document.querySelector("#commission-dialog");
                const steps = [...form.querySelectorAll("[data-commission-step]")];
                const back = form.querySelector("#commission-back"),
                    next = form.querySelector("#commission-next");
                const progress = form.querySelector("#commission-progress"),
                    status = form.querySelector("#commission-status");
                const output = form.querySelector("#commission-message"),
                    send = form.querySelector("#commission-send");
                const service = form.elements.service,
                    packages = form.elements.package;
                const money = (n) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(n);
                const names = {
                    adventure: "Aventura a medida",
                    collection: "Compendio o suplemento",
                    adaptation: "Adaptación de contenido",
                    help: "Consulta sin paquete definido",
                };
                let step = 0,
                    previousFocus = null;
                const value = (name) => String(form.elements[name]?.value || "").trim();

                function hasExtras() {
                    return form.elements.extras_choice.value === "yes";
                }

                function syncExtras() {
                    const enabled = hasExtras();
                    const container = form.querySelector("#commission-extras");

                    container.hidden = !enabled;

                    container.querySelectorAll("input").forEach((input) => {
                        input.disabled = !enabled || step !== 1;
                    });
                }
                function estimate() {
                    const quantities = Object.fromEntries(
                        ["objects", "creatures", "locations", "pages"].map((key) => [
                            key,
                            hasExtras() ? value(key) : 0,
                        ]),
                    );

                    return window.commissionEstimate(
                        value("service"),
                        value("package"),
                        quantities,
                        value("delivery"),
                    );
                }
                function quoteLines(q) {
                    if (!q) return ["Presupuesto personalizado: pendiente de valorar."];
                    return [
                        `Paquete: ${q.pack.title}.`,
                        `Incluye: ${q.pack.description}`,
                        "PDF con maquetación sencilla y una ronda de ajustes incluidos.",
                        `Base orientativa: ${q.from ? "desde " : ""}${money(q.pack.price)}.`,
                        ...q.extras
                            .filter((e) => e.quantity)
                            .map(
                                (e) =>
                                    `${e.label}: ${e.quantity} × ${money(e.rate)} = ${money(e.total)}.`,
                            ),
                        `Estimación ${q.from ? "mínima " : ""}del contenido: ${money(q.total)}${q.pending ? " + suplemento de formato pendiente de valorar" : ""}${form.elements.illustrations.checked ? " + ilustraciones pendientes de presupuestar" : ""}.`,
                    ];
                }
                function updateEstimate() {
                    const area = form.querySelector("#commission-estimate");
                    try {
                        const q = estimate();
                        form.querySelector("#commission-included").textContent = q
                            ? `${q.pack.description} PDF con maquetación sencilla y una ronda de ajustes incluidos.`
                            : "";
                        area.textContent = q ? quoteLines(q).slice(3).join("\n") : "";
                    } catch (error) {
                        area.textContent = error.message;
                    }
                }
                function configure() {
                    const json = form.elements.delivery.querySelector('option[value="json"]');
                    const isCollection = service.value === "collection";
                    json.hidden = isCollection;
                    json.disabled = isCollection;
                    if (isCollection && form.elements.delivery.value === "json")
                        form.elements.delivery.value = "pdf";
                    const old = packages.value;
                    const list = window.COMMISSION_PACKAGES[service.value] || [];
                    packages.replaceChildren(
                        new Option("Selecciona…", ""),
                        ...list.map(
                            (p) =>
                                new Option(
                                    `${p.title} · ${p.from ? "desde " : ""}${money(p.price)}`,
                                    p.id,
                                ),
                        ),
                    );
                    if (list.some((p) => p.id === old)) packages.value = old;
                    ["objects", "creatures", "locations", "pages"].forEach(
                        (k) => (form.elements[k].value = "0"),
                    );
                    form.querySelector("[data-group-field]").hidden =
                        service.value === "collection";
                    updateEstimate();
                }
                function show() {
                    steps.forEach((el, i) => {
                        el.hidden = i !== step;
                        el.querySelectorAll("input,select,textarea").forEach(
                            (field) => (field.disabled = i !== step),
                        );
                    });
                    back.hidden = step === 0;
                    next.hidden = step === 3;
                    const path = ["adaptation", "help"].includes(service.value)
                        ? [0, 2, 3]
                        : [0, 1, 2, 3];
                    progress.textContent = `Paso ${path.indexOf(step) + 1} de ${path.length} · ${["Servicio", "Paquete y extras", "Tu idea", "Resumen"][step]}`;
                    form.querySelector('.commission-progress-track span').style.width = `${((path.indexOf(step) + 1) / path.length) * 100}%`;
                    next.textContent = step === 2 ? "Revisar mi consulta →" : "Continuar →";
                    status.textContent = "";
                    syncExtras();
                    if (step === 3) summary();
                    modal.scrollTop = 0;
                    progress.focus({ preventScroll: true });
                }
                function summary() {
                    const q = estimate();
                    const illustrations = !!q && form.elements.illustrations.checked;

                    const delivery =
                        form.elements.delivery.selectedOptions[0]?.textContent.trim() || "";

                    const date = value("date")
                        ? value("date").split("-").reverse().join("/")
                        : "";

                    const lines = [
                        `¡Hola, Hugo! Soy ${value("name")} y me gustaría consultar un encargo.`,
                        `Servicio: ${names[value("service")]}.`,
                        ...quoteLines(q),
                        `Mi idea:\n${value("idea")}`,
                    ];

                    for (const [key, label] of [
                        ["system", "Sistema y edición"],
                        ["group", "Nivel y jugadores"],
                        ["date", "Fecha deseada"],
                        ["notes", "Otros requisitos"],
                    ]) {
                        if (key === "group" && service.value === "collection") continue;

                        const entry = key === "date" ? date : value(key);
                        if (entry) lines.push(`${label}: ${entry}`);
                    }

                    if (illustrations) {
                        lines.push(
                            "Solicito ilustraciones originales realizadas por un ilustrador. " +
                                "Cantidad, estilo, detalle, derechos de uso, precio y plazo " +
                                "pendientes de acordar.",
                        );
                    }

                    if (q) lines.push(`Entrega solicitada: ${delivery}.`);

                    lines.push(
                        "Importes orientativos, pendientes de revisar complejidad y requisitos. " +
                            "¿Me confirmas el alcance, el precio final, la disponibilidad, " +
                            "las revisiones y los plazos antes de comenzar?",
                    );

                    const phone = String(
                        siteData?.config?.whatsapp || "34666530043",
                    ).replace(/\D/g, "");

                    send.href = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n\n"))}`;

                    output.replaceChildren();
                    output.classList.add("commission-summary");

                    function card(title, className = "commission-summary__card") {
                        const section = document.createElement("div");
                        section.className = className;

                        const heading = document.createElement("h4");
                        heading.textContent = title;

                        section.append(heading);
                        output.append(section);
                        return section;
                    }

                    function paragraph(parent, text, className) {
                        const element = document.createElement("p");
                        element.className = className;
                        element.textContent = text;
                        parent.append(element);
                    }

                    function detail(parent, label, text) {
                        if (!text) return;

                        const row = document.createElement("div");
                        row.className = "commission-summary__detail";

                        const caption = document.createElement("span");
                        caption.textContent = label;

                        const content = document.createElement("strong");
                        content.textContent = text;

                        row.append(caption, content);
                        parent.append(row);
                    }

                    const order = card("Tu encargo");
                    detail(order, "Servicio", names[value("service")]);

                    if (q) {
                        detail(order, "Paquete", q.pack.title);

                        paragraph(order, q.pack.description, "commission-summary__included");

                        detail(order, "Entrega", delivery);

                        paragraph(
                            order,
                            "PDF con maquetación sencilla y una ronda de ajustes incluidos.",
                            "commission-summary__included",
                        );
                    }

                    const idea = card("La idea que tienes en mente");

                    paragraph(idea, value("idea"), "commission-summary__description");

                    const details = card("Los detalles");
                    detail(details, "Nombre", value("name"));
                    detail(details, "Sistema y edición", value("system"));

                    if (service.value !== "collection") {
                        detail(details, "Nivel y jugadores", value("group"));
                    }

                    detail(details, "Fecha deseada", date || "A acordar");
                    detail(details, "Otros requisitos", value("notes"));

                    const price = card("Tu estimación", "commission-summary__price");
                    paragraph(price, "Una referencia inicial para tu consulta", "commission-summary__price-intro");

                    if (q) {
                        detail(price, "Paquete base", money(q.pack.price));

                        q.extras
                            .filter((extra) => extra.quantity > 0)
                            .forEach((extra) => {
                                detail(
                                    price,
                                    `${extra.label} × ${extra.quantity}`,
                                    money(extra.total),
                                );
                            });

                        const total = document.createElement("div");
                        total.className = "commission-summary__total-row";
                        paragraph(total, q.from ? "Estimación mínima" : "Estimación del contenido", "commission-summary__total-label");
                        paragraph(total, `${q.from ? "Desde " : ""}${money(q.total)}`, "commission-summary__total");
                        price.append(total);

                        const pending = [];

                        if (q.pending) pending.push("Suplemento del formato de entrega");
                        if (illustrations) pending.push("Ilustraciones originales");

                        if (pending.length) {
                            const pendingBox = document.createElement("div");
                            pendingBox.className = "commission-summary__pending";
                            const heading = document.createElement("strong");
                            heading.textContent = "Pendiente de presupuestar";
                            const list = document.createElement("ul");
                            pending.forEach((item) => {
                                const li = document.createElement("li");
                                li.textContent = item;
                                list.append(li);
                            });
                            pendingBox.append(heading, list);
                            price.append(pendingBox);
                        }
                    } else {
                        paragraph(
                            price,
                            "Prepararé un presupuesto personalizado después de revisar tu consulta.",
                            "commission-summary__pending",
                        );
                    }
                }
                service.addEventListener("change", configure);
                form.elements.extras_choice.addEventListener("change", () => {
                    syncExtras();
                    updateEstimate();
                    send.removeAttribute("href");
                });
                form.addEventListener("input", () => {
                    send.removeAttribute("href");
                    if (step === 1) updateEstimate();
                });
                form.addEventListener("change", () => {
                    send.removeAttribute("href");
                    if (step === 1) updateEstimate();
                });
                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    if (step === 3) return;
                    if (!form.reportValidity()) return;
                    if (step === 2 && (!value("name") || !value("idea"))) {
                        status.textContent =
                            "Introduce tu nombre y una breve descripción de tu idea.";
                        return;
                    }
                    if (step === 1) {
                        try {
                            if (!estimate()) return;
                        } catch (error) {
                            status.textContent = error.message;
                            return;
                        }
                    }
                    step =
                        step === 0 && ["adaptation", "help"].includes(service.value)
                            ? 2
                            : step + 1;
                    show();
                });
                back.addEventListener("click", () => {
                    send.removeAttribute("href");
                    step =
                        step === 2 && ["adaptation", "help"].includes(service.value)
                            ? 0
                            : step - 1;
                    show();
                });
                document.querySelectorAll("[data-open-commission]").forEach((button) =>
                    button.addEventListener("click", () => {
                        if (modal.open) return;
                        previousFocus = document.activeElement;
                        modal.showModal();
                        show();
                    }),
                );
                modal
                    .querySelector(".commission-close")
                    .addEventListener("click", () => modal.close());
                modal.addEventListener("close", () => {

                    form.reset();
                    step = 0;

                    configure();
                    syncExtras();

                    output.replaceChildren();
                    send.removeAttribute("href");
                    status.textContent = "";

                    if (previousFocus?.isConnected) {
                        previousFocus.focus({ preventScroll: true });
                    }
                });
                let outside = false;
                function isOutside(e) {
                    const r = modal.getBoundingClientRect();
                    return (
                        e.target === modal &&
                        (e.clientX < r.left ||
                            e.clientX > r.right ||
                            e.clientY < r.top ||
                            e.clientY > r.bottom)
                    );
                }
                modal.addEventListener("pointerdown", (e) => (outside = isOutside(e)));
                modal.addEventListener("click", (e) => {
                    if (outside && isOutside(e)) modal.close();
                    outside = false;
                });
                configure();
                steps.forEach((el, i) =>
                    el
                        .querySelectorAll("input,select,textarea")
                        .forEach((field) => (field.disabled = i !== 0)),
                );
            })();

            window.mazmorraContact = contact;

        } catch (error) {
            console.error("Unable to initialize view encargos.", error);
        }
    },
};
</script>

