<template>
    <header>
        <a class="brand" href="./"
        >♜ LA MAZMORRA <small>ADMINISTRACIÓN</small></a
        ><a class="btn outline" href="./" target="_blank" rel="noopener"
        >Ver web ↗</a
        ><BaseButton id="logout" class="btn gold" hidden>Cerrar sesión</BaseButton>
    </header>
    <main class="admin-shell">
        <div id="alert" role="status"></div>
        <section id="login">
            <p class="eyebrow">ACCESO DEL PROPIETARIO</p>
            <h1>Tu mesa de trabajo.</h1>
            <p>Gestiona tus publicaciones y las próximas partidas.</p>
            <form id="login-form">
                <label
                >Usuario<input
                        name="username"
                        required
                        autocomplete="username" /></label
                ><label
                >Contraseña<input
                        name="password"
                        type="password"
                        required
                        autocomplete="current-password" /></label
                ><BaseButton type="submit" class="btn gold">Entrar</BaseButton>
            </form>
            <p class="small">
                Primera vez. Tras ejecutar las migraciones, crea el acceso desde
                la terminal con <code>php artisan mazmorra:admin</code>.
            </p>
        </section>
        <section id="dashboard" hidden>
            <div class="admin-title">
                <div>
                    <p class="eyebrow">LA MAZMORRA DEL ROLEO</p>
                    <h1>Administración</h1>
                </div>
                <BaseButton id="refresh" class="btn outline">Actualizar datos</BaseButton>
            </div>
            <div class="admin-stats" id="stats"></div>
            <nav class="admin-tabs" aria-label="Secciones del administrador">
                <BaseButton data-tab="commissioned">
                    Partidas por encargo
                </BaseButton>
                <BaseButton data-tab="products" class="active">Publicaciones</BaseButton
                >
                <BaseButton data-tab="agenda">Disponibilidad</BaseButton><BaseButton data-tab="games">Partidas</BaseButton
                ><BaseButton data-tab="reservations">Reservas</BaseButton
                ><BaseButton data-tab="shipping">Envíos</BaseButton><BaseButton data-tab="settings">Configuración</BaseButton>
            </nav>
            <div id="panel"></div>
        </section>
    </main>
    <dialog id="editor">
        <BaseButton class="close" aria-label="Cerrar editor">×</BaseButton>
        <div id="editor-body"></div>
    </dialog>
</template>


<script>
import BaseButton from '../core-ui/BaseButton.vue';
import '../../../css/pages/admin.css';
import { setHtmlWithBaseCheckboxes } from '@/components/core-ui/BaseCheckbox.vue';
import { setHtmlWithBaseButtons } from '@/components/core-ui/BaseButton.vue';
import { createBaseButton } from '@/components/core-ui/BaseButton.vue';
import { requestWithStatus } from '@/bootstrap';
import { createBaseSelect } from '@/components/core-ui/BaseSelect.vue';
export const needsSiteData = false;
export default {
    components: { BaseButton },
    async mounted() {
        try {
            // Initialize page behavior after Vue has rendered the view.

            let agendaEditor;
            function renderAgendaAdmin(panel) {
                const c = state.agenda || {
                    enabled: false,
                    step: 15,
                    weekly: {},
                    blocks: [],
                };
                const weekdays = [
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                    "Domingo",
                ];
                setHtmlWithBaseCheckboxes(panel, `<div class="panel-head"><h2>Tu disponibilidad semanal</h2></div>
                <p>Horario de Madrid. Las franjas semanales se repiten hasta que las cambies. Los bloqueos tienen prioridad sobre las horas disponibles.</p>
                <form id="agenda-admin-form" class="agenda-settings">
                <base-checkbox label-class="check" name="enabled" ${c.enabled ? "checked" : ""}>Activar disponibilidad por horas</base-checkbox>
                <label>Separación entre posibles inicios<base-select name="step">${[5, 15, 30, 60].map((n) => `<option value="${n}" ${Number(c.step) === n ? "selected" : ""}>${n} minutos</option>`).join("")}</base-select></label>
                <details class="agenda-week-toggle">
                <summary>Mostrar / ocultar horario semanal ▾</summary>
                <div class="agenda-visual-heading"><div><h3>Tu semana, de un vistazo</h3><p>Verde: puedes dirigir. Rojo: no estás disponible. Un día sin franjas verdes no ofrece partidas.</p></div>
                <base-button class="btn outline" id="agenda-university">Añadir universidad · L–J, 17:15–21:30</base-button></div>
                <div class="agenda-week-cards"></div>
                </details>
                <section class="agenda-extra-section"><h3>Abrir horas extra en una fecha</h3><p>Estas franjas permiten jugar aunque ese día tengas un bloqueo semanal, como universidad. Se suman a tu horario habitual. Los bloqueos puntuales y las partidas publicadas siguen ocupados.</p><div id="agenda-extras"></div><base-button class="btn outline" id="agenda-add-extra">Abrir horas extra +</base-button></section>
                <h3>Bloqueos en fechas concretas</h3><p>Para citas, vacaciones o partidas acordadas por WhatsApp. Solo afectan a la fecha indicada. Las notas son privadas.</p>
                <div id="agenda-blocks"></div><base-button class="btn outline" id="agenda-add-block">Añadir bloqueo puntual +</base-button>
                <p class="small">Las partidas publicadas también ocupan horas. Las solicitudes por WhatsApp no bloquean automáticamente. Desactivado: el cliente puede proponer una hora libremente.</p>
                <base-button type="submit" class="btn gold">Guardar disponibilidad</base-button><p id="agenda-save-status" role="status"></p></form>`);
                const form = panel.querySelector("form"),
                    blocks = panel.querySelector("#agenda-blocks"),
                    week = panel.querySelector(".agenda-week-cards");
                const clock = (n) =>
                    String(Math.floor(n / 60)).padStart(2, "0") +
                    ":" +
                    String(n % 60).padStart(2, "0");
                const minutes = (s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
                function options(value, end = false) {
                    let html = '<option value="">Elegir…</option>';
                    const times = new Set();
                    for (let n = 0; n <= (end ? 1440 : 1425); n += 15) times.add(clock(n));
                    if (value) times.add(value);
                    return (
                        html +
                        [...times]
                            .sort()
                            .map(
                                (t) =>
                                    `<option ${t === value ? "selected" : ""} value="${esc(t)}">${esc(t)}</option>`,
                            )
                            .join("")
                    );
                }
                function preview(card) {
                    const track = card.querySelector(".agenda-day-track");
                    track.replaceChildren();
                    for (const kind of ["available", "unavailable"])
                        card
                            .querySelectorAll(`[data-kind="${kind}"] .agenda-range`)
                            .forEach((row) => {
                                const a = row.querySelector("[data-start]").value,
                                    b = row.querySelector("[data-end]").value;
                                if (!a || !b || minutes(b) <= minutes(a)) return;
                                const span = document.createElement("span");
                                span.className = "agenda-track-" + kind;
                                span.style.left = (minutes(a) / 1440) * 100 + "%";
                                span.style.width = ((minutes(b) - minutes(a)) / 1440) * 100 + "%";
                                span.title = `${kind === "available" ? "Disponible" : "No disponible"}: ${a}–${b}`;
                                track.append(span);
                            });
                }
                function addRange(card, kind, range = ["", ""]) {
                    const group = card.querySelector(`[data-kind="${kind}"]`),
                        row = document.createElement("div");
                    row.className = "agenda-range";
                    setHtmlWithBaseButtons(row, `<label>Desde<base-select data-start required>${options(range[0])}</base-select></label><label>Hasta<base-select data-end required>${options(range[1], true)}</base-select></label><base-button aria-label="Quitar franja" class="agenda-remove">×</base-button>`);
                    row.querySelector("button").onclick = () => {
                        row.remove();
                        preview(card);
                    };
                    row.addEventListener("change", () => preview(card));
                    group.querySelector(".agenda-ranges").append(row);
                    preview(card);
                }
                let copiedDay = null;
                weekdays.forEach((day, i) => {
                    const card = document.createElement("section");
                    card.className = "agenda-day-card";
                    card.dataset.day = String(i + 1);
                    setHtmlWithBaseButtons(card, `<h3>${day}<small>Se repite cada semana</small></h3><div class="agenda-day-track" role="img" aria-label="Franjas semanales de ${day}"></div><div class="agenda-track-labels"><span>00:00</span><span>12:00</span><span>24:00</span></div>${["available", "unavailable"].map((kind) => `<div data-kind="${kind}" class="agenda-kind"><h4>${kind === "available" ? "● Disponible" : "● No disponible"}</h4><div class="agenda-ranges"></div><base-button class="btn outline agenda-add-range">+ Añadir franja</base-button></div>`).join("")}`);
                    const copyTools = document.createElement("div");
                    copyTools.className = "agenda-copy-tools";
                    setHtmlWithBaseButtons(copyTools, '<base-button class="btn outline" data-copy-day>Copiar horario</base-button><base-button class="btn outline" data-paste-day disabled>Pegar horario</base-button>');
                    card.append(copyTools);
                    copyTools.querySelector("[data-copy-day]").onclick = () => {
                        const copyButton = copyTools.querySelector("[data-copy-day]");

                        if (copiedDay?.name === day) {
                            copiedDay = null;

                            week.querySelectorAll("[data-copy-day]").forEach((button) => {
                                button.textContent = "Copiar horario";
                                button.setAttribute("aria-pressed", "false");
                            });

                            week.querySelectorAll("[data-paste-day]").forEach((button) => {
                                button.disabled = true;
                                button.textContent = "Pegar horario";
                            });

                            panel.querySelector("#agenda-save-status").textContent =
                                "Copia cancelada. Los horarios no se han modificado.";
                            return;
                        }

                        week.querySelectorAll("[data-copy-day]").forEach((button) => {
                            button.textContent = "Copiar horario";
                            button.setAttribute("aria-pressed", "false");
                        });

                        copyButton.textContent = "Cancelar copia";
                        copyButton.setAttribute("aria-pressed", "true");

                        copiedDay = { name: day };
                        for (const kind of ["available", "unavailable"])
                            copiedDay[kind] = [
                                ...card.querySelectorAll(`[data-kind="${kind}"] .agenda-range`),
                            ].map((row) => [
                                row.querySelector("[data-start]").value,
                                row.querySelector("[data-end]").value,
                            ]);
                        week.querySelectorAll("[data-paste-day]").forEach((button) => {
                            button.disabled = false;
                            button.textContent = "Pegar " + day.toLowerCase();
                        });
                        panel.querySelector("#agenda-save-status").textContent =
                            "Horario de " +
                            day.toLowerCase() +
                            " copiado. Puedes pegarlo en varios días; sustituirá sus franjas.";
                    };
                    copyTools.querySelector("[data-paste-day]").onclick = () => {
                        if (!copiedDay) return;
                        for (const kind of ["available", "unavailable"]) {
                            card
                                .querySelector(`[data-kind="${kind}"] .agenda-ranges`)
                                .replaceChildren();
                            copiedDay[kind].forEach((range) => addRange(card, kind, [...range]));
                        }
                        preview(card);
                        panel.querySelector("#agenda-save-status").textContent =
                            "Horario de " +
                            copiedDay.name.toLowerCase() +
                            " pegado en " +
                            day.toLowerCase() +
                            ". Pulsa Guardar disponibilidad para conservarlo.";
                    };
                    week.append(card);
                    card
                        .querySelectorAll(".agenda-add-range")
                        .forEach(
                            (button) =>
                                (button.onclick = () =>
                                    addRange(card, button.closest("[data-kind]").dataset.kind)),
                        );
                    (c.weekly[i + 1] || []).forEach((range) =>
                        addRange(card, "available", range),
                    );
                    (c.weekly_unavailable?.[i + 1] || []).forEach((range) =>
                        addRange(card, "unavailable", range),
                    );
                });
                panel.querySelector("#agenda-university").onclick = () => {
                    [...week.children].slice(0, 4).forEach((card) => {
                        const exists = [
                            ...card.querySelectorAll('[data-kind="unavailable"] .agenda-range'),
                        ].some(
                            (row) =>
                                row.querySelector("[data-start]").value === "17:15" &&
                                row.querySelector("[data-end]").value === "21:30",
                        );
                        if (!exists) addRange(card, "unavailable", ["17:15", "21:30"]);
                    });
                    panel.querySelector("#agenda-save-status").textContent =
                        "Universidad añadida de lunes a jueves. Pulsa Guardar disponibilidad para conservar los cambios.";
                };
                function add(block = {}) {
                    const row = document.createElement("fieldset");
                    row.className = "agenda-block";
                    setHtmlWithBaseButtons(row, `<legend>Bloqueo puntual</legend><label>Fecha<input type="date" data-field="date" required value="${esc(block.date || "")}"></label><label>Desde<base-select data-field="start" required>${options(block.start || "")}</base-select></label><label>Hasta<base-select data-field="end" required>${options(block.end || "", true)}</base-select></label><label>Nota privada<input data-field="note" maxlength="160" value="${esc(block.note || "")}"></label><base-button class="btn danger">Quitar bloqueo</base-button>`);
                    row.querySelector("button").onclick = () => row.remove();
                    blocks.append(row);
                }
                const extras=panel.querySelector('#agenda-extras');
                function addExtra(extra={}) {
                    const row=document.createElement('fieldset');row.className='agenda-block agenda-extra';
                    setHtmlWithBaseButtons(row, `<legend>Disponible en esta fecha</legend><label>Fecha<input type="date" data-field="date" required value="${esc(extra.date||'')}"></label><label>Desde<base-select data-field="start" required>${options(extra.start||'')}</base-select></label><label>Hasta<base-select data-field="end" required>${options(extra.end||'',true)}</base-select></label><label>Nota privada<input data-field="note" maxlength="160" value="${esc(extra.note||'')}"></label><base-button class="btn outline">Quitar apertura</base-button>`);
                    row.querySelector('button').onclick=()=>row.remove();extras.append(row);
                }
                (c.extra_available||[]).forEach(addExtra);
                panel.querySelector('#agenda-add-extra').onclick=()=>addExtra();
                (c.blocks || []).forEach(add);
                panel.querySelector("#agenda-add-block").onclick = () => add();
                const snapshot=()=>JSON.stringify([...form.querySelectorAll('input,select,textarea')].map(input=>[input.type,input.value,input.type==='checkbox'?input.checked:null]));
                let baseline=snapshot();
                agendaEditor={
                    dirty:()=>form.isConnected && baseline!==snapshot(),
                    saved:(submitted)=>{baseline=submitted??snapshot();},
                    canLeave:()=>{
                        if(!form.isConnected || baseline===snapshot())return true;
                        if(!confirm('Tienes cambios de disponibilidad sin guardar. ¿Salir y descartarlos?'))return false;
                        baseline=snapshot();return true;
                    }
                };
                form.onsubmit = async (event) => {
                    event.preventDefault();
                    const status = panel.querySelector("#agenda-save-status"),
                        button = form.querySelector("[type=submit]");
                    try {
                        const weekly = {},
                            weekly_unavailable = {};
                        [...week.children].forEach((card) => {
                            for (const [kind, target] of [
                                ["available", weekly],
                                ["unavailable", weekly_unavailable],
                            ]) {
                                target[card.dataset.day] = [
                                    ...card.querySelectorAll(`[data-kind="${kind}"] .agenda-range`),
                                ].map((row) => {
                                    const a = row.querySelector("[data-start]").value,
                                        b = row.querySelector("[data-end]").value;
                                    if (!a || !b || minutes(b) <= minutes(a))
                                        throw Error(
                                            `Revisa las horas de ${weekdays[Number(card.dataset.day) - 1]}. La hora final debe ser posterior a la inicial.`,
                                        );
                                    return [a, b];
                                });
                            }
                        });
                        const blocksData = [...blocks.children].map((row) =>
                            Object.fromEntries(
                                [...row.querySelectorAll("[data-field]")].map((input) => [
                                    input.dataset.field,
                                    input.value.trim(),
                                ]),
                            ),
                        );
                        const submittedSnapshot=snapshot();
                        button.disabled = true;
                        await api("/api/admin/agenda", {
                            enabled: form.elements.enabled.checked,
                            step: Number(form.elements.step.value),
                            weekly,
                            weekly_unavailable,
                            blocks: blocksData,
                            extra_available:[...extras.children].map(row=>Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input=>[input.dataset.field,input.value.trim()]))),
                        });
                        agendaEditor?.saved(submittedSnapshot);
                        await refresh();
                        notify(
                            "Disponibilidad guardada. El horario semanal y sus bloqueos se repetirán automáticamente.",
                        );
                    } catch (error) {
                        status.textContent = error.message;
                    } finally {
                        button.disabled = false;
                    }
                };
            }
            function renderAgendaAlerts() {
                let box = document.querySelector("#agenda-admin-alerts");
                if (!box) {
                    box = document.createElement("section");
                    box.id = "agenda-admin-alerts";
                    box.className = "agenda-admin-alerts";
                    document.querySelector("#stats").after(box);
                }
                const now = Date.now(),
                    week = now + 7 * 86400000;
                const pending = state.reservations.filter(
                    (r) => r.status === "pending" && !r.archived,
                );
                const waiting = state.reservations.filter(
                    (r) => r.status === "waitlisted" && !r.archived,
                );
                const upcoming = state.games.filter(
                    (g) =>
                        g.status === "open" &&
                        new Date(g.starts).getTime() > now &&
                        new Date(g.starts).getTime() <= week &&
                        Number(g.available) > 0,
                );
                const invitations = waiting.filter((r) =>
                    state.games.some(
                        (g) =>
                            String(g.id) === String(r.game_id) &&
                            g.status === "open" &&
                            new Date(g.starts).getTime() > now &&
                            Number(g.available) >= Number(r.players),
                    ),
                );
                setHtmlWithBaseButtons(box, `<h2>Para revisar</h2><div class="agenda-alert-grid"><base-button data-agenda-jump="reservations"><strong>${pending.length}</strong> solicitudes pendientes</base-button><base-button data-agenda-jump="reservations"><strong>${waiting.length}</strong> en lista de espera${invitations.length ? ` · ${invitations.length} con plazas para revisar` : ""}</base-button><base-button data-agenda-jump="games"><strong>${upcoming.length}</strong> partidas esta semana con plazas libres</base-button></div>${
                    upcoming.length
                        ? `<ul>${upcoming
                                .slice(0, 5)
                                .map(
                                    (g) =>
                                        `<li>${esc(g.title)} · ${esc(new Date(g.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "short", timeStyle: "short" }))} · ${Number(g.available)} plazas</li>`,
                                )
                                .join("")}</ul>`
                        : ""
                }`);
                box.querySelectorAll("[data-agenda-jump]").forEach(
                    (button) =>
                        (button.onclick = () => {
                            selectAdminTab(button.dataset.agendaJump);
                            document.querySelector("#panel").focus({ preventScroll: true });
                        }),
                );
            }

                window.addEventListener('beforeunload',event=>{if(agendaEditor?.dirty()){event.preventDefault();event.returnValue='';}});
                document.addEventListener('click',event=>{
                const target=event.target.closest('[data-tab],[data-agenda-jump],#refresh,#logout,a[href]');
                if(target && agendaEditor && !agendaEditor.canLeave()){event.preventDefault();event.stopImmediatePropagation();}
                },true);

            function shippingProductFields(product) {
                const saved = product.shipping || {};
                return `<fieldset class="wide shipping-fields"><legend>Libro sin embalaje</legend>
                    <p>Datos de un solo ejemplar, sin sobre ni protecciones. El peso y las medidas de sobre se configuran en Envíos y se añaden una sola vez por paquete.</p>
                    <div class="shipping-admin-grid">${[
                        ["book_weight_g", "Peso del libro (g)", 40000],
                        ["book_length_cm", "Largo del libro (cm)", 240],
                        ["book_width_cm", "Ancho del libro (cm)", 240],
                        ["book_height_cm", "Grosor del libro (cm)", 240],
                    ]
                        .map(
                            ([key, label, max]) =>
                                `<label>${label}<input type="number" name="shipping_${key}" min="0.01" max="${max}" step="0.01" value="${esc(saved[key] ?? "")}"></label>`,
                        )
                        .join("")}</div>
                    <p class="small">Completa los cuatro campos para calcular el envío, tanto de uno como de varios ejemplares.</p>
                </fieldset>`;
            }
            function renderShippingSettings(panel) {
                const c = state.shipping;
                if (!c) {
                    panel.textContent =
                        "No se ha cargado la configuración de envíos.";
                    return;
                }
                const zones = ["1", "2", "3", "3+", "4"];
                const provinces = [
                    "Araba/Álava",
                    "Albacete",
                    "Alicante",
                    "Almería",
                    "Ávila",
                    "Badajoz",
                    "Illes Balears",
                    "Barcelona",
                    "Burgos",
                    "Cáceres",
                    "Cádiz",
                    "Castellón",
                    "Ciudad Real",
                    "Córdoba",
                    "A Coruña",
                    "Cuenca",
                    "Girona",
                    "Granada",
                    "Guadalajara",
                    "Gipuzkoa",
                    "Huelva",
                    "Huesca",
                    "Jaén",
                    "León",
                    "Lleida",
                    "La Rioja",
                    "Lugo",
                    "Madrid",
                    "Málaga",
                    "Murcia",
                    "Navarra",
                    "Ourense",
                    "Asturias",
                    "Palencia",
                    "Las Palmas",
                    "Pontevedra",
                    "Salamanca",
                    "Santa Cruz de Tenerife",
                    "Cantabria",
                    "Segovia",
                    "Sevilla",
                    "Soria",
                    "Tarragona",
                    "Teruel",
                    "Toledo",
                    "Valencia",
                    "Valladolid",
                    "Bizkaia",
                    "Zamora",
                    "Zaragoza",
                    "Ceuta",
                    "Melilla",
                ];
                const num = (name, label, value, max = 100, required = true) =>
                    `<label>${label}<input type="number" name="${name}" min="0" max="${max}" step="0.01" value="${esc(value ?? "")}" ${required ? "required" : ""}></label>`;
                setHtmlWithBaseCheckboxes(panel, `<div class="panel-head"><h2>Envíos de libros</h2></div>
                    <p>Correos Paq Estándar a domicilio · Un sobre de hasta 5 kg, incluido el embalaje; una pila de libros. Península y Baleares. Otros destinos se confirman por WhatsApp.</p>
                    <form id="shipping-settings" class="settings-form">
                        <base-checkbox label-class="shipping-check" name="enabled" ${c.enabled ? "checked" : ""}> Activar cálculo automático</base-checkbox>
                        <div class="shipping-admin-grid">
                            <label>Código postal de origen<input name="origin_postcode" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" value="${esc(c.origin_postcode)}" placeholder="Tu código postal en Zaragoza"></label>
                            <label>Tarifas confirmadas hasta<input name="valid_until" type="date" value="${esc(c.valid_until)}"></label>
                            <input type="hidden" name="packaging_fee" value="2">
                            ${num("surcharge_percent", "Recargo sobre transporte antes de impuestos (%)", c.surcharge_percent)}
                        </div>
                        <details class="shipping-admin-section" open><summary>Configuración del sobre</summary>
                        <p>Se calcula una única pila en un sobre de hasta 5 kg reales, incluido el embalaje. Si el pedido supera su capacidad, se confirma por WhatsApp. El importe del embalaje es final y se suma una sola vez.</p>
                        <p>Mide el espacio útil para una pila, reservando protección y cierre. Introduce también las medidas exteriores máximas de referencia del sobre lleno y cerrado: se usarán para todos los pedidos y pueden aumentar la estimación por peso volumétrico. El alto exterior no es el grosor del papel.</p>
                        ${["envelope"]
                            .map((kind) => {
                                const t = c.packaging_types?.[kind] || {};
                                const label = "Sobre";
                                return `<fieldset class="shipping-fields"><legend>${label}</legend>
                                <p class="small">Límite fijo: 5 kg de libros y embalaje juntos.</p>
                                <div class="shipping-admin-grid">
                                ${[
                                    ["fee", "Precio del sobre y preparación al cliente (€)", 2, 100],
                                    [
                                        "weight_g",
                                        "Peso del embalaje y protección vacíos (g)",
                                        null,
                                        10000,
                                    ],
                                    ["inner_length_cm", "Largo interior útil (cm)", null, 240],
                                    ["inner_width_cm", "Ancho interior útil (cm)", null, 240],
                                    ["inner_height_cm", "Grosor máximo de la pila (cm)", null, 240],
                                    ["length_cm", "Largo exterior (cm)", null, 240],
                                    ["width_cm", "Ancho exterior (cm)", null, 240],
                                    ["height_cm", "Alto exterior del paquete cerrado (cm)", null, 240],
                                ]
                                    .map(
                                        ([key, text, fallback, max]) =>
                                            `<label>${text}<input data-packing-kind="${kind}" data-packing-key="${key}" type="number" min="${["fee", "weight_g"].includes(key) ? 0 : 0.01}" max="${max}" step="0.01" value="${esc(t[key] ?? fallback ?? "")}"></label>`,
                                    )
                                    .join("")}
                                </div></fieldset>`;
                            })
                            .join("")}
                        </details>
                        <p>Las tarifas precargadas son las de tu oferta de marzo de 2026, sin impuestos. Comprueba el contrato vigente y los posibles recargos antes de activar.</p>
                        <details class="shipping-admin-section" open><summary>Tarifas de transporte sin impuestos (€)</summary>
                        <div class="shipping-table-scroll"><table><thead><tr><th>Zona</th>${[1, 2, 3, 4, 5, 10, 15].map((n) => `<th>Hasta ${n} kg</th>`).join("")}<th>Impuesto (%)</th></tr></thead><tbody>
                        ${zones.map((z) => `<tr><th>${z}</th>${c.rates[z].map((v, i) => `<td><input aria-label="Zona ${z}, hasta ${[1, 2, 3, 4, 5, 10, 15][i]} kg" data-rate-zone="${z}" data-rate-index="${i}" type="number" min="0.01" max="1000" step="0.01" value="${esc(v)}" required></td>`).join("")}<td><input aria-label="Impuesto zona ${z}" data-tax-zone="${z}" type="number" min="0" max="100" step="0.01" value="${esc(c.tax_percent[z] ?? "")}" placeholder="Confirmar"></td></tr>`).join("")}
                        </tbody></table></div></details>
                        <details class="shipping-admin-section"><summary>Zona de Correos por provincia de destino</summary>
                        <p>Confirma la clasificación para envíos desde tu código postal. No basta la distancia: Correos distingue zonas 3 y 3+. Las provincias sin zona o sin impuesto configurado quedan a consultar.</p>
                        <div class="shipping-admin-grid">${provinces
                            .map((name, i) => {
                                const code = String(i + 1).padStart(2, "0");
                                const special = ["35", "38", "51", "52"].includes(code);
                                return `<label>${code} · ${name}${special ? " · A consultar" : `<base-select data-province="${code}"><option value="">A consultar</option>${zones.map((z) => `<option value="${z}" ${c.province_zones[code] === z ? "selected" : ""}>Zona ${z}</option>`).join("")}</base-select>`}</label>`;
                            })
                            .join("")}</div></details>
                        <base-checkbox label-class="shipping-check" name="confirmed" ${c.confirmed ? "checked" : ""}> He comprobado tarifas, impuestos, recargos y zonas de mi contrato vigente.</base-checkbox>
                        <p>Pasada la fecha de revisión, la web vuelve a «Envío a consultar». El peso facturable es el mayor entre el real y largo × ancho × alto / 6000 (cm). Más de 15 kg facturables o medidas fuera de límite: a consultar.</p>
                        <base-button type="submit" class="btn gold">Guardar envíos</base-button>
                        <p id="shipping-save-status" role="status"></p>
                    </form>`);
                const f = panel.querySelector("form");
                f.onsubmit = async (e) => {
                    e.preventDefault();
                    const button = f.querySelector("[type=submit]");
                    const message = f.querySelector("[role=status]");
                    button.disabled = true;
                    try {
                        const d = Object.fromEntries(new FormData(f));
                        d.enabled = f.elements.enabled.checked;
                        d.confirmed = f.elements.confirmed.checked;
                        d.rates = {};
                        d.tax_percent = {};
                        d.province_zones = {};
                        zones.forEach((z) => {
                            d.rates[z] = Array.from(f.querySelectorAll("[data-rate-zone]"))
                                .filter((n) => n.dataset.rateZone === z)
                                .map((n) => Number(n.value));
                            d.tax_percent[z] = Array.from(
                                f.querySelectorAll("[data-tax-zone]"),
                            ).find((n) => n.dataset.taxZone === z).value;
                        });
                        f.querySelectorAll("[data-province]").forEach(
                            (n) => (d.province_zones[n.dataset.province] = n.value),
                        );
                        d.packaging_types = {};
                        ["envelope"].forEach((kind) => {
                            const t = { enabled: true, max_weight_kg: 5 };
                            f.querySelectorAll(
                                '[data-packing-kind="' + kind + '"][data-packing-key]',
                            ).forEach((n) => {
                                t[n.dataset.packingKey] = n.value;
                            });
                            d.packaging_types[kind] = t;
                        });
                        await api("/api/admin/shipping", d);
                        await refresh();
                        notify("Configuración de envíos guardada.");
                    } catch (err) {
                        message.textContent = err.message;
                    } finally {
                        button.disabled = false;
                    }
                };
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
            const ADMIN_TAB_KEY = "mazmorra-admin-tab";

            function recuperarPestanaAdmin() {
                try {
                    return localStorage.getItem(ADMIN_TAB_KEY) || "products";
                } catch {
                    return "products";
                }
            }

            let state = null,
                currentTab = recuperarPestanaAdmin();
            const editor = $("#editor");
            const statusNames = {
                open: "Abierta",
                closed: "Cerrada a nuevas solicitudes",
                cancelled: "Cancelada",
                pending: "Pendiente",
                waitlisted: "Lista de espera",
                confirmed: "Confirmada",
                rejected: "Rechazada",
            };
            async function api(path, data) {
                const response = await requestWithStatus(path.replace(/^\//, ""), {
                    method: data ? "POST" : "GET",
                    headers: data
                        ? {
                                "Content-Type": "application/json",
                                "X-Mazmorra-CSRF": state?.csrf || "",
                            }
                        : {},
                    data: data ? JSON.stringify(data) : undefined,
                });
                const result = response.data;
                if ((response.status < 200 || response.status >= 300)) {
                    if (response.status === 401) {
                        state = null;
                        $("#dashboard").hidden = true;
                        $("#login").hidden = false;
                        $("#logout").hidden = true;
                        editor.close();
                    }
                    throw Error(result.error || "No se pudo completar la operación.");
                }
                return result;
            }
            function notify(message, error = false) {
                $("#alert").textContent = message;
                $("#alert").className = error ? "admin-error" : "admin-success";
            }
            async function refresh() {
                try {
                    state = await api("/api/admin/state");
                    $("#login").hidden = true;
                    $("#dashboard").hidden = false;
                    $("#logout").hidden = false;
                    render();
                } catch (e) {
                    if (!$("#login").hidden && e.message === "Inicia sesión para continuar.")
                        return;
                    notify(e.message, true);
                }
            }
            function form(html) {
                setHtmlWithBaseCheckboxes($("#editor-body"), html + '<p id="editor-error" role="alert"></p>');
                editor.showModal();
            }
            $(".close").onclick = () => editor.close();
            function input(
                name,
                label,
                value = "",
                type = "text",
                wide = false,
                required = false,
            ) {
                return `<label class="${wide ? "wide" : ""}">${label}<input name="${name}" type="${type}" value="${esc(value)}" ${required ? "required" : ""}></label>`;
            }
            function area(name, label, value = "", max = 6000) {
                return `<label class="wide">${label}<textarea name="${name}" maxlength="${max}">${esc(value)}</textarea></label>`;
            }
            function select(name, label, options, value) {
                return `<label>${label}<base-select name="${name}">${options.map(([key, title]) => `<option value="${key}" ${value === key ? "selected" : ""}>${title}</option>`).join("")}</base-select></label>`;
            }
            function bindSave(path, id, transform) {
                const formEl = $("#edit-form");
                formEl.onsubmit = async (e) => {
                    e.preventDefault();
                    const submit = formEl.querySelector("[type=submit]");
                    submit.disabled = true;
                    try {
                        let data = Object.fromEntries(new FormData(formEl));
                        data.id = id || "";
                        if (transform) data = transform(data, formEl);
                        await api(path, data);
                        editor.close();
                        notify("Cambios guardados. La web ya utiliza los datos actualizados.");
                        await refresh();
                    } catch (err) {
                        $("#editor-error").textContent = err.message;
                        $("#editor-error").className = "editor-error";
                    } finally {
                        submit.disabled = false;
                    }
                };
            }

            const purchasePackages = [
                { id: "pdf", label: "PDF", format: "digital" },
                { id: "pdf_vtt", label: "PDF + VTT", format: "digital" },
                { id: "pdf_vtt_json", label: "PDF + VTT + JSON", format: "digital" },

                { id: "book", label: "Libro físico", format: "physical" },
                { id: "book_pdf", label: "Libro + PDF", format: "physical" },
                { id: "book_pdf_vtt", label: "Libro + PDF + VTT", format: "physical" },
                {
                    id: "book_pdf_vtt_json",
                    label: "Libro + PDF + VTT + JSON",
                    format: "physical",
                },
            ];

            function purchasePackagesForm(product) {
                const guardados = Array.isArray(product.purchase_packages)
                    ? product.purchase_packages
                    : [];

                return `
                    <fieldset class="wide purchase-packages">
                        <legend>Opciones de compra</legend>
                        <base-checkbox label-class="check" id="unlock-purchase-packages">
                Editar opciones de compra
            </base-checkbox>
                        <p>Activa los paquetes que vendes e indica su precio total.</p>

                        ${["digital", "physical"]
                            .map(
                                (formato) => `
                            <h3>${formato === "digital" ? "Contenido digital" : "Libros físicos"}</h3>

                            ${purchasePackages
                                .filter((paquete) => paquete.format === formato)
                                .map((paquete) => {
                                    const actual = guardados.find((p) => p.id === paquete.id);
                                    const activo = Boolean(actual);

                                    return `
                                        <div class="purchase-package" data-package="${paquete.id}">
                                            <base-checkbox label-class="check"
                                                    data-package-enabled
                                                    ${activo ? "checked" : ""}
                                                >
                                                ${paquete.label}
                                            </base-checkbox>

                                            <label>
                                                Precio total · €
                                                <input
                                                    type="number"
                                                    data-package-price
                                                    min="0.01"
                                                    max="10000"
                                                    step="0.01"
                                                    value="${esc(actual?.price ?? "")}"
                                                    ${activo ? "required" : "disabled"}
                                                >
                                            </label>
                                        </div>
                                    `;
                                })
                                .join("")}
                        `,
                            )
                            .join("")}
                    </fieldset>
                `;
            }
            function productForm(product = {}) {
                form(
                    `<p class="eyebrow">CATÁLOGO</p><h2>${product.id ? "Editar publicación" : "Nueva publicación"}</h2><form id="edit-form"><div class="form-grid">${input("title", "Título", product.title, "text", true, true)}${select(
                        "type",
                        "Categoría",
                        [
                            ["aventura", "Aventura"],
                            ["compendio", "Libro o compendio"],
                        ],
                        product.type || "aventura",
                    )}
                        ${select(
                            "sale_format",
                            "Formato de venta",
                            [
                                ["", "Seleccione..."],
                                ["digital", "Contenido digital"],
                                ["physical", "Libro físico"],
                                ["both", "Digital y físico"],
                            ],
                            product.sale_format || "",
                        )}
                    ${select(
                        "status",
                        "Etiqueta de estado",
                        [
                            ["En desarrollo", "En desarrollo"],
                            ["Próximamente", "Próximamente"],
                            ["Disponible", "Disponible"],
                            ["Agotado", "Agotado"],
                        ],
                        product.status || "En desarrollo",
                    )}${input("label", "Género o subtítulo", product.label)}
            ${purchasePackagesForm(product)}
            ${select(
                "physical_stock",
                "Stock físico",
                [
                    ["available", "En stock"],
                    ["out", "Sin stock"],
                ],
                product.physical_stock || "out",
            )}
            ${shippingProductFields(product)}
            <label>
                Número de páginas
                <input
                    name="pages"
                    type="number"
                    min="1"
                    max="10000"
                    step="1"
                    value="${esc(product.pages ?? "")}"
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
                    value="${esc(product.session_rate ?? "")}"
                    placeholder="Sin configurar"
                >
            </label>${input("level", "Nivel", product.level)}
            ${select(
                "players",
                "Jugadores",
                [
                    ["", "Seleccione..."],
                    ["1–2 jugadores", "1–2 jugadores"],
                    ["3–5 jugadores", "3–5 jugadores"],
                    ["6 o más jugadores", "6 o más jugadores"],
                    ["No aplica", "No aplica"],
                ],
                product.players || "",
            )}
            ${select(
                "duration",
                "Duración / formato de la aventura",
                [
                    ["", "Seleccione..."],
                    ["Partida única", "Partida única"],
                    ["Aventura de varias sesiones", "Aventura de varias sesiones"],
                    ["Campaña corta", "Campaña corta"],
                    ["Campaña larga", "Campaña larga"],
                    ["Duración variable", "Duración variable"],
                    ["No aplica", "No aplica"],
                ],
                product.duration || "",
            )}
            ${input("demo", "Enlace de la demo en Heyzine (opcional)", product.demo, "url", true)}
            ${input("cover", "URL de portada HTTPS o imagen subida", product.cover, "text", true)}
            <label class="wide">Subir portada (PNG, JPG o WebP, máximo 2,5 MB)<input id="cover-file" type="file" accept="image/png,image/jpeg,image/webp"></label>${area("intro", "Descripción corta", product.intro, 400)}${area("description", "Descripción completa", product.description)}<base-checkbox label-class="wide check" name="published" ${product.published !== false ? "checked" : ""}>Visible en el catálogo</base-checkbox></div><base-button class="btn gold" type="submit">Guardar publicación</base-button></form>`,
                );

                for (const nombre of ["status", "players", "duration", "sale_format"]) {
                    const campo = $("#edit-form").elements[nombre];
                    const valorActual = product[nombre];

                    if (
                        valorActual &&
                        !Array.from(campo.options).some((opcion) => opcion.value === valorActual)
                    ) {
                        campo.add(new Option(valorActual, valorActual));
                        campo.value = valorActual;
                    }

                    campo.required = true;
                }

                const formulario = $("#edit-form");
                const desbloquear = formulario.querySelector("#unlock-purchase-packages");
                const filasPaquetes = formulario.querySelectorAll("[data-package]");

                function actualizarBloqueoPaquetes() {
                    const editable = desbloquear.checked;

                    filasPaquetes.forEach((fila) => {
                        const casilla = fila.querySelector("[data-package-enabled]");
                        const precio = fila.querySelector("[data-package-price]");

                        casilla.disabled = !editable;
                        precio.disabled = !editable || !casilla.checked;
                        precio.required = editable && casilla.checked;
                    });
                }

                desbloquear.addEventListener("change", actualizarBloqueoPaquetes);

                filasPaquetes.forEach((fila) => {
                    fila
                        .querySelector("[data-package-enabled]")
                        .addEventListener("change", actualizarBloqueoPaquetes);
                });

                actualizarBloqueoPaquetes();

                bindSave("/api/admin/product", product.id, (d, f) => {
                    const paquetes = Array.from(f.querySelectorAll("[data-package]"))
                        .filter((fila) => fila.querySelector("[data-package-enabled]").checked)
                        .map((fila) => ({
                            id: fila.dataset.package,
                            price: Number(fila.querySelector("[data-package-price]").value),
                        }));

                    return {
                        ...d,
                        purchase_packages: paquetes,
                        published: f.elements.published.checked,
                    };
                });
                $("#cover-file").onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 2500000) {
                        $("#editor-error").textContent = "La imagen supera 2,5 MB.";
                        return;
                    }
                    const submit = $("#edit-form [type=submit]");
                    submit.disabled = true;
                    try {
                        const buffer = new Uint8Array(await file.arrayBuffer());
                        let binary = "";
                        for (let i = 0; i < buffer.length; i += 32768)
                            binary += String.fromCharCode(...buffer.subarray(i, i + 32768));
                        const result = await api("/api/admin/upload", { content: btoa(binary) });
                        $("#edit-form").elements.cover.value = result.url;
                        $("#editor-error").textContent =
                            "Portada subida. Guarda la publicación para aplicarla.";
                    } catch (err) {
                        $("#editor-error").textContent = err.message;
                    } finally {
                        submit.disabled = false;
                    }
                };
            }
            function localDate(iso) {
                if (!iso) return "";
                const date = new Date(iso);
                return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16);
            }
            function gameForm(game = {}) {
                const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                form(
                    `<p class="eyebrow">AGENDA</p><h2>${game.id ? "Editar partida" : "Nueva partida"}</h2><p class="small">Introduce la fecha y hora en la zona de este dispositivo: <b>${esc(zone)}</b>. La web las mostrará en horario de Madrid.</p><form id="edit-form"><div class="form-grid">${input("title", "Título de la partida", game.title, "text", true, true)}${input("starts", "Fecha y hora", localDate(game.starts), "datetime-local", false, true)}${input("capacity", "Plazas totales", game.capacity || 5, "number", false, true)}${input("price", "Precio por jugador (ej.: 15 €)", game.price)}${input("duration", "Duración", game.duration)}${input("mode", "Modalidad / ubicación", game.mode || "Online")}${select(
                        "status",
                        "Estado",
                        [
                            ["open", "Abierta"],
                            ["closed", "Cerrada a nuevas solicitudes"],
                            ["cancelled", "Cancelada"],
                        ],
                        game.status || "open",
                    )}${area("description", "Descripción y condiciones", game.description, 3000)}</div><p class="small">Cancelar una partida cancelará también sus solicitudes pendientes y reservas confirmadas. Los pagos se conservan para que puedas gestionar las devoluciones manualmente.</p><base-button class="btn gold" type="submit">Guardar partida</base-button></form>`,
                );
                bindSave("/api/admin/game", game.id, (d) => {
                    if (
                        d.status === "cancelled" &&
                        game.status !== "cancelled" &&
                        !confirm("¿Cancelar la partida y sus reservas activas?")
                    )
                        throw Error("Cancelación detenida.");
                    return {
                        ...d,
                        capacity: Number(d.capacity),
                        starts: new Date(d.starts).toISOString(),
                    };
                });
            }
            function reservationForm(r, rejectNow = false) {
                if (r.request_type === "commissioned") {
                    gameRequestForm(r, rejectNow);
                    return;
                }
                const mailLabels = {
                    none: "Sin aviso",
                    pending: "Envío pendiente de comprobar",
                    sent: "Aceptado por el servidor de correo",
                    failed: "No se pudo confirmar el envío",
                    not_configured: "Correo sin configurar",
                    no_recipient: "Sin email válido",
                };
                form(`<p class="eyebrow">SOLICITUD ${esc(r.id)}</p><h2>${esc(r.name)}</h2>
                    <p>${esc(r.game_title)} · ${esc(new Date(r.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))} (Madrid)</p>
                    <p><b>Contacto:</b> ${esc(r.contact)}<br><b>Jugadores:</b> ${esc(r.players)}</p><p>${esc(r.notes)}</p>
                    <form id="edit-form"><div class="form-grid">
                    ${select(
                        "status",
                        "Estado",
                        [
                            ["pending", "Pendiente"],
                            ["waitlisted", "Lista de espera"],
                            ["confirmed", "Confirmada"],
                            ["rejected", "Rechazada"],
                            ["cancelled", "Cancelada"],
                        ],
                        rejectNow ? "rejected" : r.status,
                    )}
                    <base-checkbox label-class="check" name="paid" ${r.paid ? "checked" : ""}>Pago comprobado manualmente</base-checkbox>
                    <base-checkbox label-class="check wide" label-id="short-notice-label" label-hidden name="accept_short_notice"> Faltan menos de 24 horas para empezar. He acordado expresamente esta excepción con el grupo.</base-checkbox>
                    <label class="wide" id="rejection-message-label">Mensaje para el usuario
                        <textarea name="rejection_reason" maxlength="2000" rows="5" ${r.status === "rejected" && r.rejection_reason ? "readonly" : ""}>${esc(r.rejection_reason || "")}</textarea>
                    </label></div>
                    <p id="rejection-help" class="small">Este mensaje aparecerá en Mis partidas si la reserva tiene una cuenta vinculada. También se intentará enviar al email de su cuenta o, si no existe, al contacto cuando sea un correo válido.</p>
                    ${r.status === "rejected" ? `<p class="small"><b>Correo:</b> ${esc(mailLabels[r.rejection_email_status] || "Sin aviso")}</p>` : ""}
                    <base-button class="btn gold" type="submit">Guardar reserva</base-button>
                    ${r.status === "rejected" && ["failed", "not_configured", "no_recipient"].includes(r.rejection_email_status) ? '<base-button class="btn outline" id="retry-rejection-email">Reintentar correo</base-button>' : ""}
                    </form>`);
                const f = $("#edit-form");
                const update = () => {
                    const rejected = f.elements.status.value === "rejected";
                    const shortNotice =
                        f.elements.status.value === "confirmed" &&
                        r.status !== "confirmed" &&
                        new Date(r.starts).getTime() - Date.now() < 86400000;
                    $("#short-notice-label").hidden = !shortNotice;
                    f.elements.accept_short_notice.required = shortNotice;
                    $("#rejection-message-label").hidden = !rejected;
                    $("#rejection-help").hidden = !rejected;
                    f.elements.rejection_reason.required = rejected;
                    f.querySelector("[type=submit]").textContent =
                        rejected && r.status !== "rejected"
                            ? "Rechazar y avisar al usuario"
                            : "Guardar reserva";
                    const retry = $("#retry-rejection-email");
                    if (retry) retry.hidden = !rejected;
                };
                f.elements.status.addEventListener("change", update);
                update();
                f.onsubmit = async (event) => {
                    event.preventDefault();
                    if (!f.reportValidity()) return;
                    const button = f.querySelector("[type=submit]");
                    button.disabled = true;
                    try {
                        const result = await api("/api/admin/reservation", {
                            id: r.id,
                            status: f.elements.status.value,
                            paid: f.elements.paid.checked,
                            accept_short_notice: f.elements.accept_short_notice.checked,
                            rejection_reason: f.elements.rejection_reason.value.trim(),
                        });
                        editor.close();
                        await refresh();
                        notify(result.message || "Reserva guardada.");
                    } catch (error) {
                        $("#editor-error").textContent = error.message;
                        $("#editor-error").className = "editor-error";
                    } finally {
                        button.disabled = false;
                    }
                };
                const retry = $("#retry-rejection-email");
                if (retry)
                    retry.onclick = async () => {
                        retry.disabled = true;
                        try {
                            const result = await api("/api/admin/reservation", {
                                id: r.id,
                                status: "rejected",
                                retry_email: true,
                            });
                            editor.close();
                            await refresh();
                            notify(result.message);
                        } catch (error) {
                            $("#editor-error").textContent = error.message;
                            $("#editor-error").className = "editor-error";
                        } finally {
                            retry.disabled = false;
                        }
                    };
            }

            function cloneProduct(id) {
                const original = state.products.find((p) => p.id === id);
                if (!original) return;

                const copia = {
                    ...original,
                    title: `${original.title} (copia)`,
                    published: false,
                };

                delete copia.id;

                productForm(copia);
            }

            const officialCampaignTemplates = [
                {
                    catalog_id: "LMoP",
                    title: "La mina perdida de Phandelver",
                    original_title: "Lost Mine of Phandelver",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 1–5",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/LMoP.webp",
                    description:
                        "Una escolta hacia Phandalin se convierte en la búsqueda de una antigua mina. Bandidos, ruinas y amenazas locales pondrán a prueba a un grupo que empieza su carrera como aventurero.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#lmop",
                    cover_source: "https://5e.tools/img/covers/LMoP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "HotDQ",
                    title: "El tesoro de la Reina Dragón",
                    original_title: "Hoard of the Dragon Queen",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–7",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/HotDQ.webp",
                    description:
                        "Los ataques del Culto del Dragón sacuden la Costa de la Espada. Seguid el rastro de sus saqueos para descubrir por qué reúne un tesoro de proporciones extraordinarias.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#hotdq",
                    cover_source: "https://5e.tools/img/covers/HotDQ.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "RoT",
                    title: "El auge de Tiamat",
                    original_title: "Rise of Tiamat",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 8–15",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/RoT.webp",
                    description:
                        "Las facciones de la Costa de la Espada necesitan aliados contra una amenaza dracónica. Diplomacia, expediciones y enfrentamientos decisivos continúan la historia de El tesoro de la Reina Dragón.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#rot",
                    cover_source: "https://5e.tools/img/covers/RoT.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "PotA",
                    title: "Príncipes del Apocalipsis",
                    original_title: "Princes of the Apocalypse",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–15",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/PotA.webp",
                    description:
                        "Extraños sucesos alteran el valle del Dessarin. Investigad desapariciones y fortalezas sospechosas mientras una amenaza elemental crece bajo la superficie.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#pota",
                    cover_source: "https://5e.tools/img/covers/PotA.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "OotA",
                    title: "Fuera del abismo",
                    original_title: "Out of the Abyss",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–15",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/OotA.webp",
                    description:
                        "Atrapados en la Infraoscuridad, tendréis que encontrar una salida entre criaturas extrañas, ciudades subterráneas y una locura que se extiende por las profundidades.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#oota",
                    cover_source: "https://5e.tools/img/covers/OotA.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "CoS",
                    title: "La maldición de Strahd",
                    original_title: "Curse of Strahd",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–10",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/CoS.webp",
                    description:
                        "La niebla os conduce a Barovia, un valle sometido a un señor vampiro. Investigad sus secretos y buscad aliados en una historia de terror gótico donde escapar no será sencillo.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#cos",
                    cover_source: "https://5e.tools/img/covers/CoS.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "SKT",
                    title: "El trueno del Rey de la Tormenta",
                    original_title: "Storm King's Thunder",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/SKT.webp",
                    description:
                        "Los gigantes amenazan los asentamientos del norte. Recorred la Costa de la Espada para descubrir qué ha quebrado su orden y evitar que el conflicto arrase las tierras de los pequeños.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#skt",
                    cover_source: "https://5e.tools/img/covers/SKT.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "ToA",
                    title: "La tumba de la aniquilación",
                    original_title: "Tomb of Annihilation",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/ToA.webp",
                    description:
                        "Una maldición impide devolver a los muertos a la vida y consume a quienes ya regresaron. La búsqueda de respuestas conduce a las selvas de Chult y a sus ruinas olvidadas.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#toa",
                    cover_source: "https://5e.tools/img/covers/ToA.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "WDH",
                    title: "Waterdeep: El golpe de los dragones",
                    original_title: "Waterdeep: Dragon Heist",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 1–5",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/WDH.webp",
                    description:
                        "Un trabajo en Waterdeep os introduce en una carrera por un tesoro desaparecido. Investigaciones, contactos y facciones rivales importan tanto como saber usar una espada.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#wdh",
                    cover_source: "https://5e.tools/img/covers/WDH.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "WDMM",
                    title: "Waterdeep: La mazmorra del mago loco",
                    original_title: "Waterdeep: Dungeon of the Mad Mage",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 5–20",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/WDMM.webp",
                    description:
                        "Bajo Waterdeep se extiende Bajomontaña, un laberinto de niveles dominado por un mago imprevisible. Explorad sus dominios, negociad con sus habitantes y afrontad desafíos cada vez mayores.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#wdmm",
                    cover_source: "https://5e.tools/img/covers/WDMM.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "DIP",
                    title: "El dragón del Pico Agujahelada",
                    original_title: "Essentials Kit: Dragon of Icespire Peak",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 1–6",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/DIP.webp",
                    description:
                        "La llegada de un dragón blanco altera la vida alrededor de Phandalin. Elegid encargos, ayudad a sus habitantes y preparaos para afrontar una amenaza que domina las montañas.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#dip",
                    cover_source: "https://5e.tools/img/covers/DIP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "SLW",
                    title: "La ira del Señor de las Tormentas",
                    original_title: "Essentials Kit: Storm Lord's Wrath",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 7–9",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/SLW.webp",
                    description:
                        "La reconstrucción de Leilon necesita protección. Explorad sus alrededores y enfrentaos a fuerzas que amenazan con convertir la costa en un nuevo campo de batalla.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#slw",
                    cover_source: "https://5e.tools/img/covers/SLW.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "SDW",
                    title: "El despertar del dragón durmiente",
                    original_title: "Essentials Kit: Sleeping Dragon's Wake",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 9–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/SDW.webp",
                    description:
                        "Las amenazas sobre Leilon conducen a nuevos encuentros con dragones y poderes de la costa. Continuación de La ira del Señor de las Tormentas.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#sdw",
                    cover_source: "https://5e.tools/img/covers/SDW.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "DC",
                    title: "Contienda divina",
                    original_title: "Essentials Kit: Divine Contention",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 11–12",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/DC.webp",
                    description:
                        "Leilon se convierte en el centro de un enfrentamiento entre fuerzas religiosas enemigas. Defended a la comunidad y resolved los conflictos que culminan la trilogía de Leilon.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#dc",
                    cover_source: "https://5e.tools/img/covers/DC.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "BGDIA",
                    title: "Baldur’s Gate: Descenso al Averno",
                    original_title: "Baldur's Gate: Descent Into Avernus",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–13",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/BGDIA.webp",
                    description:
                        "Una crisis en la Costa de la Espada conduce a los Nueve Infiernos. Pactos peligrosos, decisiones morales y viajes por un paisaje infernal marcarán la búsqueda de una ciudad perdida.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#bgdia",
                    cover_source: "https://5e.tools/img/covers/BGDIA.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "IDRotF",
                    title: "Icewind Dale: Escarcha de la Doncella de Hielo",
                    original_title: "Icewind Dale: Rime of the Frostmaiden",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–12",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/IDRotF.webp",
                    description:
                        "Diez Ciudades sobrevive bajo un invierno interminable. Investigad sus problemas y las fuerzas que se ocultan en el hielo, en una campaña de aislamiento, misterio y supervivencia.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#idrotf",
                    cover_source: "https://5e.tools/img/covers/IDRotF.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "WBtW",
                    title: "El Feywild más allá de Brujaluz",
                    original_title: "The Wild Beyond the Witchlight",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–8",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/WBtW.webp",
                    description:
                        "Un carnaval ambulante abre el camino a un dominio feérico en dificultades. Pactos, acertijos y criaturas caprichosas permiten resolver muchos conflictos mediante el ingenio y la conversación.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#wbtw",
                    cover_source: "https://5e.tools/img/covers/WBtW.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "CRCotN",
                    title: "Critical Role: La llamada de las profundidades",
                    original_title: "Critical Role: Call of the Netherdeep",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 3–12",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/CRCotN.webp",
                    description:
                        "Un hallazgo durante un festival os arrastra hacia los misterios de un héroe olvidado. Explorad Exandria mientras otro grupo de aventureros sigue un camino que puede cruzarse con el vuestro.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#crcotn",
                    cover_source: "https://5e.tools/img/covers/CRCotN.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "DoSI",
                    title: "Los dragones de la Isla de las Tempestades",
                    original_title: "Dragons of Stormwreck Isle",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 1–3",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/DoSI.webp",
                    description:
                        "En una isla marcada por antiguos conflictos dracónicos, una comunidad busca la paz. Investigad sus peligros y descubrid cómo el pasado sigue afectando a sus habitantes.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#dosi",
                    cover_source: "https://5e.tools/img/covers/DoSI.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "LoX",
                    title: "La luz de Xaryxis",
                    original_title: "Light of Xaryxis",
                    origin: "oficial",
                    format: "Campaña corta",
                    level: "Niveles 5–8",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/LoX.webp",
                    description:
                        "Una amenaza llegada del cielo obliga a abandonar vuestro mundo. Embarcad en una aventura de fantasía espacial con navíos, aliados insólitos y viajes por el espacio salvaje.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#lox",
                    cover_source: "https://5e.tools/img/covers/LoX.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "DSotDQ",
                    title: "Dragonlance: La sombra de la Reina Dragón",
                    original_title: "Dragonlance: Shadow of the Dragon Queen",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/DSotDQ.webp",
                    description:
                        "La guerra llega a Krynn y transforma la vida de una comunidad de Solamnia. Combatid junto a sus defensores en una historia de resistencia frente a los ejércitos de la Reina Dragón.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#dsotdq",
                    cover_source: "https://5e.tools/img/covers/DSotDQ.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "PaBTSO",
                    title: "Phandelver y las profundidades: El obelisco fragmentado",
                    original_title: "Phandelver and Below: The Shattered Obelisk",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 1–12",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/PaBTSO.webp",
                    description:
                        "Las primeras aventuras alrededor de Phandalin dan paso a una amenaza mucho más extraña. Investigad los cambios que afectan a la región y seguid sus pistas hacia las profundidades.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#pabtso",
                    cover_source: "https://5e.tools/img/covers/PaBTSO.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "ToFW",
                    title: "Planescape: El giro de la rueda de la fortuna",
                    original_title: "Turn of Fortune's Wheel",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 3–10; tramo final a nivel 17",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/ToFW.webp",
                    description:
                        "Despertáis en Sigil con recuerdos incompletos. Un viaje por las Tierras Exteriores os llevará a cuestionar vuestra identidad y el lugar que ocupáis en el multiverso.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tofw",
                    cover_source: "https://5e.tools/img/covers/ToFW.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "VEoR",
                    title: "Vecna: La víspera de la ruina",
                    original_title: "Vecna: Eve of Ruin",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 10–20",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/VEoR.webp",
                    description:
                        "Una amenaza contra el multiverso reúne a héroes de gran poder. Viajes entre escenarios de D&D, aliados célebres y desafíos de alto nivel dan forma a una misión de alcance extraordinario.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#veor",
                    cover_source: "https://5e.tools/img/covers/VEoR.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "CoA",
                    title: "Las cadenas de Asmodeo",
                    original_title: "Chains of Asmodeus",
                    origin: "oficial",
                    format: "Campaña larga",
                    level: "Niveles 11–20",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/CoA.webp",
                    description:
                        "Descended por los Nueve Infiernos en busca de almas atrapadas. La negociación, la tentación y los enemigos de alto poder acompañan un viaje por los dominios infernales.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#coa",
                    cover_source: "https://5e.tools/img/covers/CoA.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "GoS",
                    title: "Los fantasmas de Saltmarsh",
                    original_title: "Ghosts of Saltmarsh",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–12",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/GoS.webp",
                    description:
                        "Una población costera sirve de punto de partida para misterios, contrabando y expediciones marítimas. Recopilatorio: las aventuras pueden jugarse por separado o enlazarse con preparación del máster.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#gos",
                    cover_source: "https://5e.tools/img/covers/GoS.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "CM",
                    title: "Misterios de Candlekeep",
                    original_title: "Candlekeep Mysteries",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–16",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/CM.webp",
                    description:
                        "Los libros de una gran biblioteca abren la puerta a investigaciones y sucesos insólitos. Recopilatorio de misterios independientes; se escogerá uno adecuado al nivel del grupo.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#cm",
                    cover_source: "https://5e.tools/img/covers/CM.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "JttRC",
                    title: "Viajes por la Ciudadela Radiante",
                    original_title: "Journeys through the Radiant Citadel",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–14",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/JttRC.webp",
                    description:
                        "Una ciudadela del Plano Etéreo conecta comunidades con historias y conflictos propios. Recopilatorio de aventuras independientes con investigación, exploración y encuentros sociales.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#jttrc",
                    cover_source: "https://5e.tools/img/covers/JttRC.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "KftGV",
                    title: "Llaves de la Cámara Dorada",
                    original_title: "Keys from the Golden Vault",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/KftGV.webp",
                    description:
                        "Una organización clandestina propone golpes que requieren información y planificación. Recopilatorio de misiones independientes donde infiltrarse y coordinarse puede ser mejor que combatir.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#kftgv",
                    cover_source: "https://5e.tools/img/covers/KftGV.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "QftIS",
                    title: "Misiones de la Escalera Infinita",
                    original_title: "Quests from the Infinite Staircase",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–13",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/QftIS.webp",
                    description:
                        "Una escalera entre mundos conduce a seis aventuras clásicas adaptadas a quinta edición. Se puede elegir una expedición o acordar una secuencia de viajes.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#qftis",
                    cover_source: "https://5e.tools/img/covers/QftIS.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "HoL",
                    title: "Ravenloft: La casa de los lamentos",
                    original_title: "Ravenloft: The House of Lament",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–3",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/VRGR.webp",
                    description:
                        "Una casa aislada conserva ecos de una tragedia. Investigad sus estancias y las presencias que las habitan en una aventura de terror sobrenatural.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#hol",
                    cover_source: "https://5e.tools/img/covers/VRGR.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "VNotEE",
                    title: "Vecna: El nido del Ojo Arcano",
                    original_title: "Vecna: Nest of the Eldritch Eye",
                    origin: "oficial",
                    format: "Partida única",
                    level: "Nivel 3",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/VNotEE.webp",
                    description:
                        "Una misión en Neverwinter conduce a una investigación subterránea vinculada a un culto. Aventura breve que puede servir como introducción temática a una campaña sobre Vecna.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#vnotee",
                    cover_source: "https://5e.tools/img/covers/VNotEE.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-TSC",
                    title: "La Ciudadela Sin Sol",
                    original_title: "Tales from the Yawning Portal: The Sunless Citadel",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–3",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Una fortaleza hundida y una extraña fruta atraen a los aventureros. Explorad sus galerías y descubrid qué ocurre bajo las ruinas.\n\nExperiencia recomendada: No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "No necesitas experiencia previa; te acompañaré con las reglas y la creación del personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-tsc",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-TFoF",
                    title: "La Forja de la Furia",
                    original_title: "Tales from the Yawning Portal: The Forge of Fury",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 3–5",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Una antigua fortaleza enana promete secretos y tesoros. Sus salones abandonados albergan nuevos ocupantes y peligros en varios niveles.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-tfof",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-THSoT",
                    title: "El santuario oculto de Tamoachan",
                    original_title:
                        "Tales from the Yawning Portal: The Hidden Shrine of Tamoachan",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 5–8",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Un santuario enterrado encierra trampas y vestigios de una civilización antigua. La exploración cuidadosa será esencial para encontrar una salida.\n\nExperiencia recomendada: Conviene conocer las reglas básicas y manejar una ficha de personaje.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Conviene conocer las reglas básicas y manejar una ficha de personaje.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-thsot",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-WPM",
                    title: "La Montaña del Penacho Blanco",
                    original_title: "Tales from the Yawning Portal: White Plume Mountain",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 8–9",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "La recuperación de armas legendarias conduce a una montaña llena de desafíos. Una mazmorra de pruebas, trampas y soluciones ingeniosas.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-wpm",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-DiT",
                    title: "Muerte en Thay",
                    original_title: "Tales from the Yawning Portal: Dead in Thay",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 9–11",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Una incursión contra los Magos Rojos lleva al grupo a una extensa mazmorra. Coordinación y gestión de recursos serán claves para avanzar.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-dit",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-AtG",
                    title: "Contra los gigantes",
                    original_title: "Tales from the Yawning Portal: Against the Giants",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 11–14",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Asentamientos amenazados necesitan una respuesta frente a los gigantes. Una sucesión de incursiones conduce a fortalezas cada vez más peligrosas.\n\nExperiencia recomendada: Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendable tener experiencia: se usan personajes con numerosas habilidades y recursos.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-atg",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "TftYP-ToH",
                    title: "La tumba de los horrores",
                    original_title: "Tales from the Yawning Portal: Tomb of Horrors",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 10–14",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/TftYP.webp",
                    description:
                        "Una tumba legendaria pone a prueba la atención y la prudencia del grupo. Sus trampas y acertijos hacen de cada decisión un riesgo.\n\nExperiencia recomendada: Recomendada para jugadores con experiencia que disfruten de trampas difíciles y exploración exigente.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Recomendada para jugadores con experiencia que disfruten de trampas difíciles y exploración exigente.",
                    published: false,
                    source: "https://5e.tools/adventure.html#tftyp-toh",
                    cover_source: "https://5e.tools/img/covers/TftYP.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
                {
                    catalog_id: "DrDe",
                    title: "Guaridas de dragones",
                    original_title: "Dragon Delves",
                    origin: "oficial",
                    format: "Aventura de varias sesiones",
                    level: "Niveles 1–12, según la aventura elegida",
                    hours: "consultar",
                    hourly_rate: null,
                    language: "es",
                    cover: "images/campanas/DrDe.webp",
                    description:
                        "Diez aventuras independientes centradas en dragones y sus guaridas. Se elegirá una historia adecuada al nivel y la experiencia del grupo.\n\nExperiencia recomendada: variable según la aventura; hay opciones para comenzar a jugar.\n\nPartida dirigida en español. Duración orientativa; el ritmo depende del grupo.",
                    experience:
                        "Variable según la aventura; hay opciones para comenzar a jugar.",
                    published: false,
                    source: "https://5e.tools/adventures.html",
                    cover_source: "https://5e.tools/img/covers/DrDe.webp",
                    level_note:
                        "Rango del índice del libro; no implica elegir libremente el nivel inicial.",
                },
            ];

            function isSingleSession(format) {
                const text = String(format || "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .trim();
                return [
                    "partida unica",
                    "one-shot",
                    "oneshot",
                    "one shot",
                    "una sola sesion",
                    "1 sola sesion",
                ].includes(text);
            }

            function commissionedForm(item = {}) {
                form(`
                    <p class="eyebrow">PARTIDAS POR ENCARGO</p>
                    <h2>${item.id ? "Editar aventura" : "Nueva aventura para dirigir"}</h2>

                    <form id="edit-form">
                        <div class="form-grid">
                            ${input("title", "Título", item.title, "text", true, true)}

                            ${select(
                                "origin",
                                "Origen",
                                [
                                    ["mia", "Aventura propia"],
                                    ["oficial", "Aventura oficial de Wizards"],
                                ],
                                item.origin || "mia",
                            )}

                            ${select(
                                "format",
                                "Formato",
                                [
                                    ["Partida única", "Partida única"],
                                    ["Aventura de varias sesiones", "Aventura de varias sesiones"],
                                    ["Campaña corta", "Campaña corta"],
                                    ["Campaña larga", "Campaña larga"],
                                ],
                                item.format || "Partida única",
                            )}

                            ${input("level", "Nivel de los personajes", item.level)}

                            ${select(
                                "hours",
                                "Duración recomendada por sesión",
                                [
                                    ["2", "2 horas"],
                                    ["2.5", "2,5 horas"],
                                    ["3", "3 horas"],
                                    ["4", "4 horas · One-shot"],
                                ],
                                isSingleSession(item.format || "Partida única")
                                    ? "4"
                                    : ["2", "2.5", "3", "4"].includes(
                                                String(item.hours).replace(",", "."),
                                            )
                                        ? String(item.hours).replace(",", ".")
                                        : "3",
                            )}

                            <label>
                                <span id="commission-rate-label">Tarifa por jugador y sesión · €</span><input
                                    name="hourly_rate"
                                    type="number"
                                    min="0.01"
                                    max="10000"
                                    step="0.01"
                                    value="${esc(item.hourly_rate ?? "")}"
                                    placeholder="Vacío: a consultar"
                                >
                            </label>

                            ${select(
                                "language",
                                "Idioma del material",
                                [
                                    ["es", "Español"],
                                    ["en", "Solo en inglés · suplemento a consultar"],
                                ],
                                item.language || "es",
                            )}

                            ${input(
                                "cover",
                                "URL de portada HTTPS o ruta de uploads",
                                item.cover,
                                "text",
                                true,
                            )}

                            ${area(
                                "description",
                                "Descripción de la partida y condiciones",
                                item.description,
                                6000,
                            )}

                            <base-checkbox label-class="wide check"
                                    name="published"
                                    ${item.published === true ? "checked" : ""}
                                >
                                Disponible para solicitar
                            </base-checkbox>
                        </div>

                            <p class="small">
                                En partidas únicas, el precio es por jugador y sesión: no se multiplica por las horas.
                                En campañas y aventuras de varias sesiones, la tarifa es por jugador y hora.
                                Para 6 o más jugadores se prepara un presupuesto personalizado.
                                Para 1 o 2: mesa compartida o sesión privada.
                                Las partidas oficiales se dirigen en español. La tarifa vacía se muestra como «A consultar».
                            </p>

                        <base-button class="btn gold" type="submit">Guardar aventura</base-button>
                    </form>
                `);

                const rateForm = document.querySelector("#edit-form");
                const duration = rateForm.elements.hours;
                const format = rateForm.elements.format;

                const savedHours = String(item.hours ?? "3").replace(",", ".");
                const initialSingle =
                    isSingleSession(item.format || format.value) || savedHours === "4";

                let campaignFormat = isSingleSession(format.value)
                    ? "Campaña corta"
                    : format.value;

                let campaignHours = ["2", "2.5", "3"].includes(savedHours) ? savedHours : "3";

                duration.replaceChildren(
                    new Option("2 horas", "2"),
                    new Option("2,5 horas", "2.5"),
                    new Option("3 horas", "3"),
                    new Option("4 horas · One-shot", "4"),
                );

                format.value = initialSingle ? "Partida única" : campaignFormat;
                duration.value = initialSingle ? "4" : campaignHours;

                function updateRateLabel() {
                    const single = isSingleSession(format.value);

                    rateForm.querySelector("#commission-rate-label").textContent = single
                        ? "Precio único por jugador y sesión · €"
                        : "Tarifa por jugador y hora · €";
                }

                duration.addEventListener("change", () => {
                    if (duration.value === "4") {
                        if (!isSingleSession(format.value)) {
                            campaignFormat = format.value;
                        }

                        format.value = "Partida única";
                    } else {
                        campaignHours = duration.value;

                        if (isSingleSession(format.value)) {
                            format.value = campaignFormat;
                        }
                    }

                    updateRateLabel();
                });

                format.addEventListener("change", () => {
                    if (isSingleSession(format.value)) {
                        if (duration.value !== "4") {
                            campaignHours = duration.value;
                        }

                        duration.value = "4";
                    } else {
                        campaignFormat = format.value;

                        if (duration.value === "4") {
                            duration.value = campaignHours;
                        }
                    }

                    updateRateLabel();
                });

                updateRateLabel();

                bindSave("/api/admin/commissioned-game", item.id, (data, formulario) => ({
                    ...data,
                    format: format.value,
                    hours: duration.value,
                    language:
                        formulario.elements.origin.value === "oficial" ? "es" : data.language,
                    published: formulario.elements.published.checked,
                }));
            }
            function renderCommissioned(panel) {
                const items = state.commissioned_games || [];

                const euros = (valor) =>
                    new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                    }).format(Number(valor));

                setHtmlWithBaseButtons(panel, `
                    <div class="panel-head">
                        <div>
                            <h2>Partidas por encargo</h2>
                            <p>Aventuras disponibles para dirigir, sin fecha asignada.</p>
                        </div>

                        <base-button class="btn outline" id="official-catalog">Catálogo de campañas oficiales</base-button>
                        <base-button class="btn gold" id="new-commissioned">
                            Añadir aventura +
                        </base-button>
                    </div>

                    <div class="admin-list">
                        ${
                            items.length
                                ? items
                                        .map(
                                            (item) => `
                                    <article class="admin-item">
                                        <div>
                                            <span class="tag">
                                                ${item.published ? "DISPONIBLE" : "BORRADOR"}
                                                · ${item.origin === "oficial" ? "OFICIAL" : "PROPIA"}
                                            </span>

                                            <h3>${esc(item.title)}</h3>

                                            <p>
                                                ${esc(item.format)}
                                                · ${esc(item.level || "Nivel a consultar")}
                                            </p>

                                            <p>
                                                ${
                                                    item.hourly_rate != null
                                                        ? `${euros(item.hourly_rate)} ${isSingleSession(item.format) ? "por jugador · pago único" : "por jugador y hora"}`
                                                        : "Tarifa a consultar"
                                                }
                                            </p>
                                        </div>

                                        <div class="actions">
                                            <base-button class="btn outline"
                                                data-commission-edit="${esc(item.id)}">
                                                Editar
                                            </base-button>

                                            <base-button class="btn outline"
                                                data-commission-clone="${esc(item.id)}">
                                                Clonar
                                            </base-button>

                                            <base-button class="btn danger"
                                                data-commission-delete="${esc(item.id)}">
                                                Eliminar
                                            </base-button>
                                        </div>
                                    </article>
                                `,
                                        )
                                        .join("")
                                : '<p class="admin-empty">Añade tu primera aventura para dirigir.</p>'
                        }
                    </div>
                `);

                $("#official-catalog").onclick = showOfficialCampaignCatalog;
                $("#new-commissioned").onclick = () => commissionedForm();

                panel.querySelectorAll("[data-commission-edit]").forEach((button) => {
                    button.onclick = () => {
                        const item = items.find(
                            (item) => item.id === button.dataset.commissionEdit,
                        );

                        if (item) commissionedForm(item);
                    };
                });

                panel.querySelectorAll("[data-commission-clone]").forEach((button) => {
                    button.onclick = () => {
                        const original = items.find(
                            (item) => item.id === button.dataset.commissionClone,
                        );

                        if (!original) return;

                        const copia = {
                            ...original,
                            title: `${original.title} (copia)`,
                            published: false,
                        };

                        delete copia.id;
                        commissionedForm(copia);
                    };
                });

                panel.querySelectorAll("[data-commission-delete]").forEach((button) => {
                    button.onclick = async () => {
                        if (!confirm("¿Eliminar esta aventura de las partidas por encargo?")) {
                            return;
                        }

                        button.disabled = true;

                        try {
                            await api("/api/admin/commissioned-game/delete", {
                                id: button.dataset.commissionDelete,
                            });

                            await refresh();
                            notify("Aventura eliminada de las partidas por encargo.");
                        } catch (error) {
                            notify(error.message, true);
                        } finally {
                            button.disabled = false;
                        }
                    };
                });
            }

            let showArchivedReservations = false;

            function render() {
                if (!state) return;
                if (agendaEditor && !agendaEditor.canLeave()) {
                    currentTab = "agenda";
                    return;
                }

                if (!document.querySelector(`[data-tab="${CSS.escape(currentTab)}"]`)) {
                    currentTab = "products";
                }

                try {
                    localStorage.setItem(ADMIN_TAB_KEY, currentTab);
                } catch {

                }
                $("#stats").innerHTML =
                    `<div><b>${state.products.length}</b><span>Publicaciones</span></div><div><b>${state.games.filter((g) => g.status === "open").length}</b><span>Partidas abiertas</span></div><div><b>${state.reservations.filter((r) => r.status === "pending").length}</b><span>Solicitudes pendientes</span></div>`;
                document
                    .querySelectorAll("[data-tab]")
                    .forEach((b) => b.classList.toggle("active", b.dataset.tab === currentTab));
                renderAgendaAlerts();
                const panel = $("#panel");
                if (currentTab === "agenda") {
                    renderAgendaAdmin(panel);
                    return;
                }
                if (currentTab === "shipping") {
                    renderShippingSettings(panel);
                    return;
                }
                if (currentTab === "commissioned") {
                    renderCommissioned(panel);
                    return;
                }
                if (currentTab === "products") {
                    setHtmlWithBaseButtons(panel, '<div class="panel-head"><h2>Tu catálogo</h2><base-button class="btn gold" id="new-product">Añadir publicación +</base-button></div><div class="admin-list">' +
                        (state.products
                            .map(
                                (p) =>
                                    `<article class="admin-item"><div><span class="tag">${p.published === false ? "BORRADOR" : "VISIBLE"} · ${esc(p.type)}</span><h3>${esc(p.title)}</h3><p>${esc(p.price || "Precio por confirmar")}</p></div>
                                <div class="actions">
                                <base-button class="btn outline" data-edit="${esc(p.id)}">Editar</base-button>
                                <base-button class="btn outline" data-clone="${esc(p.id)}">Clonar</base-button>
                                <base-button class="btn danger" data-delete="${esc(p.id)}">Eliminar</base-button>
                                </div>
                                </article>`,
                            )
                            .join("") ||
                            '<p class="admin-empty">Todavía no hay publicaciones.</p>') +
                        "</div>");
                    $("#new-product").onclick = () => productForm();
                    panel
                        .querySelectorAll("[data-edit]")
                        .forEach(
                            (b) =>
                                (b.onclick = () =>
                                    productForm(state.products.find((p) => p.id === b.dataset.edit))),
                        );
                    panel.querySelectorAll("[data-clone]").forEach((button) => {
                        button.onclick = () => {
                            const original = state.products.find(
                                (p) => p.id === button.dataset.clone,
                            );

                            if (!original) return;

                            const copia = {
                                ...original,
                                title: `${original.title} (copia)`,
                                published: false,
                            };

                            delete copia.id;
                            productForm(copia);
                        };
                    });
                    panel.querySelectorAll("[data-delete]").forEach(
                        (b) =>
                            (b.onclick = async () => {
                                if (!confirm("¿Eliminar esta publicación del catálogo?")) return;
                                try {
                                    await api("/api/admin/product/delete", { id: b.dataset.delete });
                                    await refresh();
                                    notify("Publicación eliminada.");
                                } catch (e) {
                                    notify(e.message, true);
                                }
                            }),
                    );
                } else if (currentTab === "games") {
                    setHtmlWithBaseButtons(panel, '<div class="panel-head"><h2>Partidas y plazas</h2><base-button class="btn gold" id="new-game">Crear partida +</base-button></div><div class="admin-list">' +
                        (state.games
                            .map(
                                (g) =>
                                    `<article class="admin-item"><div><span class="tag">${statusNames[g.status]}</span><h3>${esc(g.title)}</h3><p>${esc(new Date(g.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))} (Madrid) · ${esc(g.mode)}<br>${g.booked}/${g.capacity} plazas confirmadas · ${esc(g.price || "Precio por confirmar")}</p></div><base-button class="btn outline" data-game="${g.id}">Editar partida</base-button></article>`,
                            )
                            .join("") ||
                            '<p class="admin-empty">Crea tu primera partida para que aparezca en el calendario.</p>') +
                        "</div>");
                    $("#new-game").onclick = () => gameForm();
                    panel
                        .querySelectorAll("[data-game]")
                        .forEach(
                            (b) =>
                                (b.onclick = () =>
                                    gameForm(state.games.find((g) => g.id === b.dataset.game))),
                        );
                } else if (currentTab === "reservations") {
                    const isArchived = (reservation) =>
                        reservation.archived === true || Number(reservation.archived) === 1;
                    const archivedCount = state.reservations.filter(isArchived).length;
                    const mainCount = state.reservations.length - archivedCount;
                    const visible = state.reservations.filter(
                        (r) => isArchived(r) === showArchivedReservations,
                    );
                    setHtmlWithBaseButtons(panel, `
                        <div class="panel-head">
                            <h2>${showArchivedReservations ? "Solicitudes archivadas" : "Solicitudes y reservas"}</h2>
                            <base-button class="btn outline" id="toggle-archived-reservations">
                                ${showArchivedReservations ? `Volver a reservas (${mainCount})` : `Ver archivadas (${archivedCount})`}
                            </base-button>
                        </div>
                        <p>${showArchivedReservations ? "Se conserva el historial. Puedes restaurar una solicitud para volver a gestionarla." : "Las pendientes no bloquean plazas. Puedes archivar las rechazadas o canceladas."}</p>
                        <div class="admin-list">${
                            visible
                                .map(
                                    (r) => `
                            <article class="admin-item">
                                <div><span class="tag">${esc(statusNames[r.status] || r.status)} · ${r.paid ? "Pago comprobado" : "Pago no comprobado"}${r.request_type === "commissioned" ? " · Partida por encargo" : ""}${showArchivedReservations ? " · Archivada" : ""}</span>
                                    <h3>${esc(r.name)} · ${esc(r.players)} plaza(s)</h3>
                                    <p>${esc(r.game_title)}<br>${esc(r.contact)}</p>
                                </div>
                                <div class="actions">
                                    ${
                                        showArchivedReservations
                                            ? `<base-button class="btn outline" data-request-type="${esc(r.request_type || "session")}" data-archive-reservation="${esc(r.id)}" data-archived="false">Restaurar solicitud</base-button>`
                                            : `
                                        <base-button class="btn outline" data-reservation="${esc(r.id)}">Gestionar</base-button>
                                        <base-button class="btn danger" data-reject-reservation="${esc(r.id)}">${r.status === "rejected" ? "Ver rechazo" : "Rechazar solicitud"}</base-button>
                                        ${["rejected", "cancelled"].includes(r.status) ? `<base-button class="btn outline" data-request-type="${esc(r.request_type || "session")}" data-archive-reservation="${esc(r.id)}" data-archived="true">Archivar solicitud</base-button>` : ""}
                                    `
                                    }
                                </div>
                            </article>`,
                                )
                                .join("") ||
                            `<p class="admin-empty">${showArchivedReservations ? "No hay solicitudes archivadas." : "No hay solicitudes en la lista principal."}</p>`
                        }
                        </div>`);
                    $("#toggle-archived-reservations").onclick = () => {
                        showArchivedReservations = !showArchivedReservations;
                        render();
                    };
                    panel.querySelectorAll("[data-archive-reservation]").forEach((button) => {
                        button.onclick = async () => {
                            button.disabled = true;
                            try {
                                const result = await api(
                                    button.dataset.requestType === "commissioned"
                                        ? "/api/admin/game-request"
                                        : "/api/admin/reservation/archive",
                                    {
                                        id: button.dataset.archiveReservation,
                                        archived: button.dataset.archived === "true",
                                    },
                                );
                                await refresh();
                                notify(result.message);
                            } catch (error) {
                                notify(error.message, true);
                            } finally {
                                button.disabled = false;
                            }
                        };
                    });
                    panel.querySelectorAll("[data-reject-reservation]").forEach((button) => {
                        button.onclick = () => {
                            const reservation = state.reservations.find(
                                (item) => String(item.id) === button.dataset.rejectReservation,
                            );
                            if (reservation) reservationForm(reservation, true);
                        };
                    });
                    panel.querySelectorAll("[data-reservation]").forEach((button) => {
                        button.onclick = () => {
                            const reservation = state.reservations.find(
                                (item) => String(item.id) === button.dataset.reservation,
                            );
                            if (reservation) reservationForm(reservation);
                        };
                    });
                } else {
                    setHtmlWithBaseButtons(panel, '<div class="panel-head"><h2>Contacto y pagos manuales</h2></div><form id="settings-form" class="settings-form">' +
                        input(
                            "whatsapp",
                            "WhatsApp: prefijo de país y número, sin + ni espacios",
                            state.config.whatsapp,
                        ) +
                        input("paypal", "Enlace de PayPal", state.config.paypal, "url") +
                        input("email", "Correo de contacto", state.config.email, "email") +
                        area("delivery", "Información de entrega", state.config.delivery, 1000) +
                        '<h3>Muestras de aventuras · Heyzine</h3><p>Publica en Heyzine únicamente las páginas que quieras mostrar. El título aparece en el desplegable de la web.</p><div id="preview-rows"></div><base-button class="btn outline" id="add-preview">Añadir muestra +</base-button><p class="small">No se conecta con tu cuenta de PayPal ni se comprueban pagos automáticamente. No introduzcas contraseñas ni claves privadas.</p><base-button type="submit" class="btn gold">Guardar configuración</base-button></form>');
                    renderPreviewSettings();
                    $("#settings-form").onsubmit = async (e) => {
                        e.preventDefault();
                        try {
                            const data = Object.fromEntries(new FormData(e.target));
                            data.previews = Array.from(
                                document.querySelectorAll(".preview-row"),
                            ).map((row) => ({
                                title: row.querySelector("[data-preview-title]").value,
                                url: row.querySelector("[data-preview-url]").value,
                            }));
                            await api("/api/admin/config", data);
                            await refresh();
                            notify("Configuración actualizada.");
                        } catch (err) {
                            notify(err.message, true);
                        }
                    };
                }
            }
            $("#login-form").onsubmit = async (e) => {
                e.preventDefault();
                const button = e.target.querySelector("button");
                button.disabled = true;
                try {
                    await api("/api/login", Object.fromEntries(new FormData(e.target)));
                    e.target.reset();
                    $("#alert").textContent = "";
                    await refresh();
                } catch (err) {
                    notify(err.message, true);
                } finally {
                    button.disabled = false;
                }
            };
            $("#logout").onclick = async () => {
                try {
                    await api("/api/logout", {});
                    state = null;
                    $("#dashboard").hidden = true;
                    $("#login").hidden = false;
                    $("#logout").hidden = true;
                    notify("Sesión cerrada.");
                } catch (e) {
                    notify(e.message, true);
                }
            };
            $("#refresh").onclick = refresh;
            if (!document.querySelector('[data-tab="commissioned"]')) {
                const gamesTab = document.querySelector('[data-tab="games"]');
                if (gamesTab) {
                    const button = createBaseButton();
                    button.dataset.tab = "commissioned";
                    button.textContent = "Partidas por encargo";
                    gamesTab.after(button);
                }
            }
            document.querySelectorAll("[data-tab]").forEach(
                (b) =>
                    (b.onclick = () => {
                        currentTab = b.dataset.tab;
                        render();
                    }),
            );
            refresh();

            function renderPreviewSettings() {
                const rows = $("#preview-rows");
                function add(p = { title: "", url: "" }) {
                    if (rows.children.length >= 50) return;
                    const row = document.createElement("fieldset");
                    row.className = "preview-row";
                    setHtmlWithBaseButtons(row, '<legend>Muestra de aventura</legend><label>Título de la muestra<input data-preview-title maxlength="160" required></label><label>Enlace de Heyzine<input data-preview-url type="url" maxlength="300" placeholder="https://heyzine.com/flip-book/identificador.html" required></label><base-button class="btn danger">Quitar muestra</base-button>');
                    row.querySelector("[data-preview-title]").value = p.title;
                    row.querySelector("[data-preview-url]").value = p.url;
                    row.querySelector("button").onclick = () => row.remove();
                    rows.append(row);
                }
                (state.config.previews || []).forEach(add);
                $("#add-preview").onclick = () => add();
            }

            function showOfficialCampaignCatalog() {
                form(`<p class="eyebrow">CATÁLOGO OFICIAL · PARTIDAS EN ESPAÑOL</p>
                    <h2>Elige qué campañas ofrecer</h2>
                    <p>Las fichas de esta biblioteca no son públicas. Abre una, revisa el contenido y guarda como borrador o marca «Disponible para solicitar».</p>
                    <p>La duración y la experiencia recomendada son orientaciones editables. Los recopilatorios requieren acordar una aventura concreta.</p>
                    <label>Buscar campaña<input type="search" id="official-search" placeholder="Título en español o inglés"></label>
                    <div id="official-results" style="display:grid;gap:16px;margin-top:20px"></div>`);
                const results = $("#official-results");
                const draw = () => {
                    const query = $("#official-search").value.trim().toLocaleLowerCase("es");
                    const entries = officialCampaignTemplates.filter((item) =>
                        `${item.title} ${item.original_title}`
                            .toLocaleLowerCase("es")
                            .includes(query),
                    );
                    setHtmlWithBaseButtons(results, entries
                            .map((item) => {
                                const saved = (state.commissioned_games || []).find(
                                    (existing) =>
                                        existing.origin === "oficial" &&
                                        [item.title, item.original_title].includes(existing.title),
                                );
                                return `<article style="display:flex;gap:18px;align-items:flex-start;border:1px solid #cdbfa8;padding:16px;border-radius:8px">
                            <img src="${esc(item.cover)}" alt="Portada de ${esc(item.original_title)}" loading="lazy" style="width:90px;height:125px;object-fit:contain">
                            <div style="min-width:0"><h3>${esc(item.title)}</h3><p>${esc(item.original_title)}</p>
                            <p>${esc(item.level)} · ${esc(item.format)}</p>
                            <p style="white-space:pre-line">${esc(item.description)}</p>
                            <p>${saved ? (saved.published ? "Disponible para solicitar" : "Guardada como borrador") : "Sin activar · precio a consultar"}</p>
                            <base-button class="btn gold" data-official-template="${esc(item.catalog_id)}">${saved ? "Editar ficha guardada" : "Preparar ficha"}</base-button></div>
                        </article>`;
                            })
                            .join("") || "<p>No hay coincidencias.</p>");
                    results.querySelectorAll("[data-official-template]").forEach((button) => {
                        button.onclick = () => {
                            const template = officialCampaignTemplates.find(
                                (item) => item.catalog_id === button.dataset.officialTemplate,
                            );
                            const saved = (state.commissioned_games || []).find(
                                (existing) =>
                                    existing.origin === "oficial" &&
                                    [template.title, template.original_title].includes(existing.title),
                            );
                            editor.close();
                            commissionedForm(
                                saved || { ...template, hourly_rate: "", published: false },
                            );
                        };
                    });
                };
                $("#official-search").addEventListener("input", draw);
                draw();
            }

            function gameRequestForm(r, rejectNow = false) {
                const d = r.data || {};
                const labels = {
                    kind: "Origen",
                    adventure: "Aventura",
                    idea: "Idea de partida",
                    format: "Formato",
                    group: "Grupo",
                    experience: "Experiencia",
                    level: "Nivel",
                    mode: "Modalidad",
                    location: "Lugar",
                    frequency: "Frecuencia",
                    availability: "Otras fechas",
                    notes: "Comentarios",
                    smallGroup: "Grupo pequeño",
                    price_estimate: "Presupuesto orientativo al solicitar",
                };
                form(`<p class="eyebrow">PARTIDA POR ENCARGO</p>
            <p>
                ${esc(r.name)} · ${esc(r.title)} ·
                ${esc(
                    new Date(r.starts).toLocaleString("es-ES", {
                        timeZone: "Europe/Madrid",
                        dateStyle: "short",
                        timeStyle: "short",
                    }),
                )} (Madrid)
            </p><h2>${esc(r.name)}</h2><p>${esc(r.title)} · ${esc(new Date(r.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))} (Madrid) · ${esc(r.duration)}</p><p>${esc(r.players)} jugadores · ${esc(r.contact)}</p><dl>${Object.entries(
                    labels,
                )
                    .filter(([key]) => d[key])
                    .map(
                        ([key, label]) =>
                            `<dt><strong>${label}</strong></dt><dd style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(d[key])}</dd>`,
                    )
                    .join("")}</dl>
                <form id="request-manage-form">${select(
                    "status",
                    "Estado",
                    [
                        ["pending", "Pendiente"],
                        ["confirmed", "Confirmada"],
                        ["rejected", "Rechazada"],
                        ["cancelled", "Cancelada"],
                    ],
                    rejectNow ? "rejected" : r.status,
                )}<base-checkbox label-class="check" name="paid" ${r.paid ? "checked" : ""}>Pago comprobado manualmente</base-checkbox><base-checkbox label-class="check" label-id="request-short" label-hidden name="accept_short_notice">He acordado con el grupo confirmar con menos de 24 horas.</base-checkbox><label id="request-reason">Mensaje para el usuario<textarea name="rejection_reason" maxlength="2000" rows="4" ${r.status === "rejected" ? "readonly" : ""}>${esc(r.rejection_reason || "")}</textarea></label><p class="small">Al confirmar se comprueba que el horario completo siga libre y se ocupa la primera sesión. La frecuencia es orientativa: las siguientes sesiones se acuerdan aparte. El mensaje de rechazo aparece en Mis partidas si tiene cuenta y se intenta enviar por correo con la configuración SMTP existente.</p><base-button type="submit" class="btn gold">Guardar solicitud</base-button></form>`);
                const f = $("#request-manage-form");
                const update = () => {
                    const rejected = f.elements.status.value === "rejected";
                    $("#request-reason").hidden = !rejected;
                    f.elements.rejection_reason.required = rejected;
                    const soon =
                        f.elements.status.value === "confirmed" &&
                        r.status !== "confirmed" &&
                        new Date(r.starts).getTime() - Date.now() < 86400000;
                    $("#request-short").hidden = !soon;
                    f.elements.accept_short_notice.required = soon;
                };
                f.elements.status.onchange = update;
                update();
                f.onsubmit = async (event) => {
                    event.preventDefault();
                    if (!f.reportValidity()) return;
                    const button = f.querySelector("[type=submit]");
                    button.disabled = true;
                    try {
                        const result = await api("/api/admin/game-request", {
                            id: r.id,
                            status: f.elements.status.value,
                            paid: f.elements.paid.checked,
                            rejection_reason: f.elements.rejection_reason.value.trim(),
                            accept_short_notice: f.elements.accept_short_notice.checked,
                        });
                        editor.close();
                        await refresh();
                        notify(result.message);
                    } catch (error) {
                        $("#editor-error").textContent = error.message;
                    } finally {
                        button.disabled = false;
                    }
                };
            }
            function selectAdminTab(tab) {
                currentTab = tab;
                render();
            }

            (() => {
                const panel = document.querySelector("#panel");
                if (!panel) return;
                document.body.classList.add("admin-visual");
                const normalize = (value) =>
                    String(value || "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase();
                const make = (tag, text, cls) => {
                    const el = document.createElement(tag);
                    if (text) el.textContent = text;
                    if (cls) el.className = cls;
                    return el;
                };
                const savedFilters = new Map();
                function enhance() {
                    const list = panel.querySelector(".admin-list");
                    if (!list || list.dataset.visualReady) return;
                    list.dataset.visualReady = "true";
                    const tab =
                        document.querySelector(".admin-tabs .active")?.dataset.tab || "";
                    if (!["products", "games", "commissioned", "reservations"].includes(tab))
                        return;
                    panel.dataset.visualTab = tab;
                    const cards = [...list.querySelectorAll(".admin-item")];
                    const statuses = new Set();
                    for (const card of cards) {
                        const tag = card.querySelector(".tag");
                        const label =
                            tag?.textContent.trim().split("·")[0].trim() || "Sin estado";
                        statuses.add(label);
                        card.dataset.visualStatus = label;
                        const normalized = normalize(label);
                        card.dataset.tone = /borrador|pendiente|lista de espera/.test(normalized)
                            ? "pending"
                            : /cancelad|rechazad|cerrada/.test(normalized)
                                ? "muted"
                                : "live";
                        if (tag) {
                            const labels = tag.textContent
                                .split("·")
                                .map((s) => s.trim())
                                .filter(Boolean);
                            tag.replaceChildren(
                                ...labels.map((text) => make("span", text, "admin-badge")),
                            );
                        }

                        let data = null;
                        try {
                            if (typeof state !== "undefined" && state) {
                                const button = card.querySelector(
                                    "[data-commission-edit],[data-edit],[data-game],[data-reservation]",
                                );
                                const id = button && Object.values(button.dataset)[0];
                                const key = {
                                    commissioned: "commissioned_games",
                                    products: "products",
                                    games: "games",
                                    reservations: "reservations",
                                }[tab];
                                data = (state[key] || []).find(
                                    (item) => String(item.id) === String(id),
                                );
                            }
                        } catch (_) {

                        }

                        if (tab === "commissioned") {
                            const etiquetas = Array.from(
                                tag?.querySelectorAll(".admin-badge") || [],
                                (elemento) => normalize(elemento.textContent).trim(),
                            );

                            card.dataset.visualOrigin =
                                data?.origin ||
                                (etiquetas.includes("oficial")
                                    ? "oficial"
                                    : etiquetas.includes("propia")
                                        ? "mia"
                                        : "");
                        }
                        const cover = data?.cover || data?.image;
                        if (cover && ["products", "commissioned"].includes(tab)) {
                            try {
                                const url = new URL(cover, location.href);
                                if (
                                    url.protocol === "https:" ||
                                    (url.origin === location.origin &&
                                        ["http:", "https:"].includes(url.protocol))
                                ) {
                                    const image = make("img", "", "admin-card-cover");
                                    image.src = url.href;
                                    if (tab === "commissioned") {
                                        card.classList.add("admin-adventure-background");
                                        card.style.setProperty(
                                            "--adventure-cover",
                                            `url(${JSON.stringify(url.href)})`,
                                        );
                                    }
                                    image.alt = "";
                                    image.loading = "lazy";
                                    image.addEventListener("error", () => image.remove(), {
                                        once: true,
                                    });
                                    card.prepend(image);
                                }
                            } catch (_) {}
                        }
                        if (tab === "games" && data && Number(data.capacity) > 0) {
                            const booked = Number(data.booked) || 0;
                            const meter = make("div", "", "admin-capacity");
                            const progress = make("progress");
                            progress.max = Number(data.capacity);
                            progress.value = booked;
                            progress.setAttribute(
                                "aria-label",
                                `${booked} de ${data.capacity} plazas confirmadas`,
                            );
                            meter.append(
                                make("span", `${booked} / ${data.capacity} plazas confirmadas`),
                                progress,
                            );
                            card.querySelector("div")?.append(meter);
                        }
                        if (tab === "reservations" && data) {
                            const payment = make(
                                "span",
                                data.paid ? "Pago comprobado" : "Revisar pago",
                                "admin-payment",
                            );
                            payment.dataset.paid = String(Boolean(data.paid));
                            card.querySelector("div")?.append(payment);
                        }
                    }
                    const toolbar = make("div", "", "admin-tools");
                    const searchLabel = make("label", "Buscar");
                    const search = make("input");
                    search.type = "search";
                    search.placeholder =
                        tab === "reservations"
                            ? "Nombre, partida o contacto…"
                            : "Título, formato o nivel…";
                    searchLabel.append(search);
                    const originLabel = make("label", "Campaña");
                    const originSelect = createBaseSelect();

                    originSelect.add(new Option("Todas las campañas", ""));
                    originSelect.add(new Option("Mis campañas", "mia"));
                    originSelect.add(new Option("Campañas oficiales", "oficial"));

                    originLabel.append(originSelect);
                    const statusLabel = make("label", "Estado");
                    const select = createBaseSelect();
                    select.add(new Option("Todos los estados", ""));
                    statuses.forEach((label) => select.add(new Option(label, label)));
                    statusLabel.append(select);
                    const count = make("p", "", "admin-result-count");
                    count.setAttribute("role", "status");
                    const empty = make(
                        "p",
                        "No hay coincidencias. Prueba otro nombre o estado.",
                        "admin-empty",
                    );
                    empty.hidden = true;
                    const reset = createBaseButton({ class: "admin-reset" }, "Limpiar");
                    if (tab === "commissioned") {
                        toolbar.classList.add("admin-tools--origin");
                        toolbar.append(searchLabel, originLabel, statusLabel, reset, count);
                    } else {
                        toolbar.append(searchLabel, statusLabel, reset, count);
                    }
                    list.before(toolbar);
                    list.after(empty);
                    const previous = savedFilters.get(tab);

                    if (previous) {
                        search.value = previous.query || "";
                        select.value = previous.status || "";
                        originSelect.value = previous.origin || "";
                    }

                    function filter() {
                        const query = normalize(search.value.trim());
                        const origin = tab === "commissioned" ? originSelect.value : "";

                        let visible = 0;

                        cards.forEach((card) => {
                            const coincideBusqueda = normalize(card.textContent).includes(query);

                            const coincideEstado =
                                !select.value || card.dataset.visualStatus === select.value;

                            const coincideOrigen = !origin || card.dataset.visualOrigin === origin;

                            card.hidden = !(coincideBusqueda && coincideEstado && coincideOrigen);

                            if (!card.hidden) visible++;
                        });

                        count.textContent =
                            `${visible} de ${cards.length} ` +
                            (tab === "reservations" ? "reservas" : "elementos");

                        empty.textContent =
                            "No hay coincidencias. Prueba a cambiar o limpiar los filtros.";

                        empty.hidden = visible > 0 || cards.length === 0;

                        savedFilters.set(tab, {
                            query: search.value,
                            status: select.value,
                            origin,
                        });
                    }

                    search.addEventListener("input", filter);
                    select.addEventListener("change", filter);
                    originSelect.addEventListener("change", filter);

                    reset.addEventListener("click", () => {
                        search.value = "";
                        select.value = "";
                        originSelect.value = "";

                        filter();
                        search.focus();
                    });

                    filter();
                }
                new MutationObserver(enhance).observe(panel, { childList: true });
                enhance();
            })();

            (() => {
                const editorBody = document.querySelector("#editor-body");
                if (!editorBody) return;

                function decorarPortadas() {
                    editorBody.querySelectorAll("#official-results article").forEach((card) => {
                        const image = card.querySelector("img");
                        if (!image) return;

                        card.classList.add("official-cover-background");
                        card.style.setProperty(
                            "--adventure-cover",
                            `url(${JSON.stringify(image.src)})`,
                        );
                    });
                }

                new MutationObserver(decorarPortadas).observe(editorBody, {
                    childList: true,
                    subtree: true,
                });

                decorarPortadas();
            })();

            (() => {
                const modal = document.querySelector("#editor");
                if (!modal) return;

                let inicioFuera = false;

                function estaFuera(event) {
                    const rect = modal.getBoundingClientRect();

                    return (
                        event.target === modal &&
                        (event.clientX < rect.left ||
                            event.clientX > rect.right ||
                            event.clientY < rect.top ||
                            event.clientY > rect.bottom)
                    );
                }

                modal.addEventListener("pointerdown", (event) => {
                    inicioFuera = estaFuera(event);
                });

                modal.addEventListener("click", (event) => {
                    if (inicioFuera && estaFuera(event)) {
                        modal.close();
                    }

                    inicioFuera = false;
                });

                modal.addEventListener("pointercancel", () => {
                    inicioFuera = false;
                });
            })();

            (() => {
                const entries = [{"id": "LMoP", "title": "La mina perdida de Phandelver", "original": "Lost Mine of Phandelver", "cover": "images/campanas/LMoP.webp", "background": "images/fondos-campanas/la-mina-perdida-de-phandelver.png"}, {"id": "HotDQ", "title": "El tesoro de la Reina Dragón", "original": "Hoard of the Dragon Queen", "cover": "images/campanas/HotDQ.webp", "background": "images/fondos-campanas/el-tesoro-de-la-reina-dragon.png"}, {"id": "RoT", "title": "El auge de Tiamat", "original": "Rise of Tiamat", "cover": "images/campanas/RoT.webp", "background": "images/fondos-campanas/el-auge-de-tiamat.png"}, {"id": "PotA", "title": "Príncipes del Apocalipsis", "original": "Princes of the Apocalypse", "cover": "images/campanas/PotA.webp", "background": "images/fondos-campanas/principes-del-apocalipsis.png"}, {"id": "OotA", "title": "Fuera del abismo", "original": "Out of the Abyss", "cover": "images/campanas/OotA.webp", "background": "images/fondos-campanas/fuera-del-abismo.png"}, {"id": "CoS", "title": "La maldición de Strahd", "original": "Curse of Strahd", "cover": "images/campanas/CoS.webp", "background": "images/fondos-campanas/la-maldicion-de-strahd.png"}, {"id": "SKT", "title": "El trueno del Rey de la Tormenta", "original": "Storm King's Thunder", "cover": "images/campanas/SKT.webp", "background": "images/fondos-campanas/el-trueno-del-rey-de-la-tormenta.png"}, {"id": "ToA", "title": "La tumba de la aniquilación", "original": "Tomb of Annihilation", "cover": "images/campanas/ToA.webp", "background": "images/fondos-campanas/la-tumba-de-la-aniquilacion.png"}, {"id": "WDH", "title": "Waterdeep: El golpe de los dragones", "original": "Waterdeep: Dragon Heist", "cover": "images/campanas/WDH.webp", "background": "images/fondos-campanas/waterdeep-el-golpe-de-los-dragones.png"}, {"id": "WDMM", "title": "Waterdeep: La mazmorra del mago loco", "original": "Waterdeep: Dungeon of the Mad Mage", "cover": "images/campanas/WDMM.webp", "background": "images/fondos-campanas/waterdeep-la-mazmorra-del-mago-loco.png"}, {"id": "DIP", "title": "El dragón del Pico Agujahelada", "original": "Essentials Kit: Dragon of Icespire Peak", "cover": "images/campanas/DIP.webp", "background": "images/fondos-campanas/el-dragon-del-pico-agujahelada.png"}, {"id": "SLW", "title": "La ira del Señor de las Tormentas", "original": "Essentials Kit: Storm Lord's Wrath", "cover": "images/campanas/SLW.webp", "background": "images/fondos-campanas/la-ira-del-senor-de-las-tormentas.png"}, {"id": "SDW", "title": "El despertar del dragón durmiente", "original": "Essentials Kit: Sleeping Dragon's Wake", "cover": "images/campanas/SDW.webp", "background": "images/fondos-campanas/el-despertar-del-dragon-durmiente.png"}, {"id": "DC", "title": "Contienda divina", "original": "Essentials Kit: Divine Contention", "cover": "images/campanas/DC.webp", "background": "images/fondos-campanas/contienda-divina.png"}, {"id": "BGDIA", "title": "Baldur’s Gate: Descenso al Averno", "original": "Baldur's Gate: Descent Into Avernus", "cover": "images/campanas/BGDIA.webp", "background": "images/fondos-campanas/baldurs-gate-descenso-al-averno.png"}, {"id": "IDRotF", "title": "Icewind Dale: Escarcha de la Doncella de Hielo", "original": "Icewind Dale: Rime of the Frostmaiden", "cover": "images/campanas/IDRotF.webp", "background": "images/fondos-campanas/icewind-dale-escarcha-de-la-doncella-de-hielo.png"}, {"id": "WBtW", "title": "El Feywild más allá de Brujaluz", "original": "The Wild Beyond the Witchlight", "cover": "images/campanas/WBtW.webp", "background": "images/fondos-campanas/el-feywild-mas-alla-de-brujaluz.png"}, {"id": "CRCotN", "title": "Critical Role: La llamada de las profundidades", "original": "Critical Role: Call of the Netherdeep", "cover": "images/campanas/CRCotN.webp", "background": "images/fondos-campanas/critical-role-la-llamada-de-las-profundidades.png"}, {"id": "DoSI", "title": "Los dragones de la Isla de las Tempestades", "original": "Dragons of Stormwreck Isle", "cover": "images/campanas/DoSI.webp", "background": "images/fondos-campanas/los-dragones-de-la-isla-de-las-tempestades.png"}, {"id": "LoX", "title": "La luz de Xaryxis", "original": "Light of Xaryxis", "cover": "images/campanas/LoX.webp", "background": "images/fondos-campanas/la-luz-de-xaryxis.png"}, {"id": "DSotDQ", "title": "Dragonlance: La sombra de la Reina Dragón", "original": "Dragonlance: Shadow of the Dragon Queen", "cover": "images/campanas/DSotDQ.webp", "background": "images/fondos-campanas/dragonlance-la-sombra-de-la-reina-dragon.png"}, {"id": "PaBTSO", "title": "Phandelver y las profundidades: El obelisco fragmentado", "original": "Phandelver and Below: The Shattered Obelisk", "cover": "images/campanas/PaBTSO.webp", "background": "images/fondos-campanas/phandelver-y-las-profundidades-el-obelisco-fragmentado.png"}, {"id": "ToFW", "title": "Planescape: El giro de la rueda de la fortuna", "original": "Turn of Fortune's Wheel", "cover": "images/campanas/ToFW.webp", "background": "images/fondos-campanas/planescape-el-giro-de-la-rueda-de-la-fortuna.png"}, {"id": "VEoR", "title": "Vecna: La víspera de la ruina", "original": "Vecna: Eve of Ruin", "cover": "images/campanas/VEoR.webp", "background": "images/fondos-campanas/vecna-la-vispera-de-la-ruina.png"}, {"id": "CoA", "title": "Las cadenas de Asmodeo", "original": "Chains of Asmodeus", "cover": "images/campanas/CoA.webp", "background": "images/fondos-campanas/las-cadenas-de-asmodeo.png"}, {"id": "GoS", "title": "Los fantasmas de Saltmarsh", "original": "Ghosts of Saltmarsh", "cover": "images/campanas/GoS.webp", "background": "images/fondos-campanas/los-fantasmas-de-saltmarsh.png"}, {"id": "CM", "title": "Misterios de Candlekeep", "original": "Candlekeep Mysteries", "cover": "images/campanas/CM.webp", "background": "images/fondos-campanas/misterios-de-candlekeep.png"}, {"id": "JttRC", "title": "Viajes por la Ciudadela Radiante", "original": "Journeys through the Radiant Citadel", "cover": "images/campanas/JttRC.webp", "background": "images/fondos-campanas/viajes-por-la-ciudadela-radiante.png"}, {"id": "KftGV", "title": "Llaves de la Cámara Dorada", "original": "Keys from the Golden Vault", "cover": "images/campanas/KftGV.webp", "background": "images/fondos-campanas/llaves-de-la-camara-dorada.png"}, {"id": "QftIS", "title": "Misiones de la Escalera Infinita", "original": "Quests from the Infinite Staircase", "cover": "images/campanas/QftIS.webp", "background": "images/fondos-campanas/misiones-de-la-escalera-infinita.png"}, {"id": "HoL", "title": "Ravenloft: La casa de los lamentos", "original": "Ravenloft: The House of Lament", "cover": "images/campanas/VRGR.webp", "background": "images/fondos-campanas/ravenloft-la-casa-de-los-lamentos.png"}, {"id": "VNotEE", "title": "Vecna: El nido del Ojo Arcano", "original": "Vecna: Nest of the Eldritch Eye", "cover": "images/campanas/VNotEE.webp", "background": "images/fondos-campanas/vecna-el-nido-del-ojo-arcano.png"}, {"id": "TftYP-TSC", "title": "La Ciudadela Sin Sol", "original": "Tales from the Yawning Portal: The Sunless Citadel", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/la-ciudadela-sin-sol.png"}, {"id": "TftYP-TFoF", "title": "La Forja de la Furia", "original": "Tales from the Yawning Portal: The Forge of Fury", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/la-forja-de-la-furia.png"}, {"id": "TftYP-THSoT", "title": "El santuario oculto de Tamoachan", "original": "Tales from the Yawning Portal: The Hidden Shrine of Tamoachan", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/el-santuario-oculto-de-tamoachan.png"}, {"id": "TftYP-WPM", "title": "La Montaña del Penacho Blanco", "original": "Tales from the Yawning Portal: White Plume Mountain", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/la-montana-del-penacho-blanco.png"}, {"id": "TftYP-DiT", "title": "Muerte en Thay", "original": "Tales from the Yawning Portal: Dead in Thay", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/muerte-en-thay.png"}, {"id": "TftYP-AtG", "title": "Contra los gigantes", "original": "Tales from the Yawning Portal: Against the Giants", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/contra-los-gigantes.png"}, {"id": "TftYP-ToH", "title": "La tumba de los horrores", "original": "Tales from the Yawning Portal: Tomb of Horrors", "cover": "images/campanas/TftYP.webp", "background": "images/fondos-campanas/la-tumba-de-los-horrores.png"}, {"id": "DrDe", "title": "Guaridas de dragones", "original": "Dragon Delves", "cover": "images/campanas/DrDe.webp", "background": "images/fondos-campanas/guaridas-de-dragones.png"}];
                const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
                const names = new Map(entries.flatMap(entry => [[normalize(entry.title),entry],[normalize(entry.original),entry]]));
                function decorate(root, selector) {
                root.querySelectorAll(selector).forEach(card => {
                    if (card.dataset.landscapeReady) return;
                    const title = card.querySelector('h3')?.textContent;
                    let entry = names.get(normalize(title));
                    if (!entry) {
                    const img = card.querySelector('img');
                    const filename = img?.getAttribute('src')?.split('/').pop()?.split('?')[0];
                    entry = entries.find(row => row.cover.split('/').pop() === filename);
                    }
                    if (!entry) return;
                    card.dataset.landscapeReady = 'true';

                    const preload = new Image();
                    preload.onload = () => {
                    card.style.setProperty('--adventure-cover', `url(${JSON.stringify(new URL(entry.background, document.baseURI).href)})`);
                    card.classList.add('landscape-adventure-background');
                    };
                    preload.src = entry.background;
                });
                }
                const panel = document.querySelector('#panel');
                const editorBody = document.querySelector('#editor-body');
                const update = () => {
                if(panel && document.querySelector('.admin-tabs .active')?.dataset.tab === 'commissioned') decorate(panel,'.admin-item');
                if(editorBody) decorate(editorBody,'#official-results article');
                };
                const observer = new MutationObserver(update);
                if(panel) observer.observe(panel,{childList:true,subtree:true});
                if(editorBody) observer.observe(editorBody,{childList:true,subtree:true});
                update();
            })();

            (() => {
                const panel = document.querySelector("#panel");
                if (!panel) return;
                function enhance() {
                    if (
                        document.querySelector(".admin-tabs .active")?.dataset.tab !==
                        "reservations"
                    )
                        return;
                    if (typeof state === "undefined" || !state) return;
                    for (const card of panel.querySelectorAll(".admin-item")) {
                        if (card.querySelector("[data-delete-request]")) continue;
                        const existing = card.querySelector(
                            "[data-reservation],[data-reject-reservation],[data-archive-reservation]",
                        );
                        if (!existing) continue;
                        const id =
                            existing.dataset.reservation ||
                            existing.dataset.rejectReservation ||
                            existing.dataset.archiveReservation;
                        const row = state.reservations.find(
                            (item) => String(item.id) === String(id),
                        );
                        if (!row) continue;
                        const button = createBaseButton({ class: "btn danger" });
                        button.dataset.deleteRequest = id;
                        button.textContent = "Eliminar definitivamente";
                        button.onclick = async () => {
                            const item = state.reservations.find(
                                (entry) => String(entry.id) === String(id),
                            );
                            if (!item) return;
                            const date = new Date(item.starts).toLocaleString("es-ES", {
                                timeZone: "Europe/Madrid",
                                dateStyle: "short",
                                timeStyle: "short",
                            });
                            const warning = `¿Eliminar definitivamente la solicitud de ${item.name} para «${item.game_title || item.title}», del ${date} (Madrid)?\n\nSe borrará también de Mis partidas. No se puede recuperar.${item.status === "confirmed" ? " Se liberarán sus plazas o el horario reservado." : ""}${item.paid ? " Consta un pago comprobado: eliminar no realiza ninguna devolución." : ""}`;
                            if (!confirm(warning)) return;
                            button.disabled = true;
                            try {
                                const response = await requestWithStatus("api/admin/request/delete", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Mazmorra-CSRF": state.csrf,
                                    },
                                    data: JSON.stringify({
                                        id: item.id,
                                        type:
                                            item.request_type === "commissioned"
                                                ? "commissioned"
                                                : "session",
                                        expected_status: item.status,
                                        confirmation: "DELETE",
                                    }),
                                });
                                const result = response.data;
                                if ((response.status < 200 || response.status >= 300))
                                    throw Error(result.error || "No se pudo eliminar la solicitud.");
                                await refresh();
                                notify(result.message);
                            } catch (error) {
                                notify(error.message, true);
                            } finally {
                                button.disabled = false;
                            }
                        };
                        card.querySelector(".actions")?.append(button);
                    }
                }
                new MutationObserver(enhance).observe(panel, {
                    childList: true,
                    subtree: true,
                });
                enhance();
            })();

        } catch (error) {
            console.error("Unable to initialize view admin.", error);
        }
    },
};
</script>

