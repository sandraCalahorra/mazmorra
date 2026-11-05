"use strict";
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
  panel.innerHTML = `<div class="panel-head"><h2>Tu disponibilidad semanal</h2></div>
 <p>Horario de Madrid. Las franjas semanales se repiten hasta que las cambies. Los bloqueos tienen prioridad sobre las horas disponibles.</p>
 <form id="agenda-admin-form" class="agenda-settings">
 <label class="check"><input type="checkbox" name="enabled" ${c.enabled ? "checked" : ""}>Activar disponibilidad por horas</label>
 <label>Separación entre posibles inicios<select name="step">${[5, 15, 30, 60].map((n) => `<option value="${n}" ${Number(c.step) === n ? "selected" : ""}>${n} minutos</option>`).join("")}</select></label>
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
 <button type="submit" class="btn gold">Guardar disponibilidad</button><p id="agenda-save-status" role="status"></p></form>`;
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
    row.innerHTML = `<label>Desde<select data-start required>${options(range[0])}</select></label><label>Hasta<select data-end required>${options(range[1], true)}</select></label><button type="button" aria-label="Quitar franja" class="agenda-remove">×</button>`;
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
    card.innerHTML = `<h3>${day}<small>Se repite cada semana</small></h3><div class="agenda-day-track" role="img" aria-label="Franjas semanales de ${day}"></div><div class="agenda-track-labels"><span>00:00</span><span>12:00</span><span>24:00</span></div>${["available", "unavailable"].map((kind) => `<div data-kind="${kind}" class="agenda-kind"><h4>${kind === "available" ? "● Disponible" : "● No disponible"}</h4><div class="agenda-ranges"></div><button type="button" class="btn outline agenda-add-range">+ Añadir franja</button></div>`).join("")}`;
    const copyTools = document.createElement("div");
    copyTools.className = "agenda-copy-tools";
    copyTools.innerHTML =
      '<button type="button" class="btn outline" data-copy-day>Copiar horario</button><button type="button" class="btn outline" data-paste-day disabled>Pegar horario</button>';
    card.append(copyTools);
    copyTools.querySelector("[data-copy-day]").onclick = () => {
      const copyButton = copyTools.querySelector("[data-copy-day]");

      // Al pulsar otra vez el mismo día, cancela la copia.
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
    row.innerHTML = `<legend>Bloqueo puntual</legend><label>Fecha<input type="date" data-field="date" required value="${esc(block.date || "")}"></label><label>Desde<select data-field="start" required>${options(block.start || "")}</select></label><label>Hasta<select data-field="end" required>${options(block.end || "", true)}</select></label><label>Nota privada<input data-field="note" maxlength="160" value="${esc(block.note || "")}"></label><button type="button" class="btn danger">Quitar bloqueo</button>`;
    row.querySelector("button").onclick = () => row.remove();
    blocks.append(row);
  }
  const extras=panel.querySelector('#agenda-extras');
  function addExtra(extra={}) {
    const row=document.createElement('fieldset');row.className='agenda-block agenda-extra';
    row.innerHTML=`<legend>Disponible en esta fecha</legend><label>Fecha<input type="date" data-field="date" required value="${esc(extra.date||'')}"></label><label>Desde<select data-field="start" required>${options(extra.start||'')}</select></label><label>Hasta<select data-field="end" required>${options(extra.end||'',true)}</select></label><label>Nota privada<input data-field="note" maxlength="160" value="${esc(extra.note||'')}"></label><button type="button" class="btn outline">Quitar apertura</button>`;
    row.querySelector('button').onclick=()=>row.remove();extras.append(row);
  }
  (c.extra_available||[]).forEach(addExtra);
  panel.querySelector('#agenda-add-extra').onclick=()=>addExtra();
  (c.blocks || []).forEach(add);
  panel.querySelector("#agenda-add-block").onclick = () => add();
  const snapshot=()=>JSON.stringify([...form.querySelectorAll('input,select,textarea')].map(input=>[input.type,input.value,input.type==='checkbox'?input.checked:null]));
  let baseline=snapshot();
  window.AgendaEditor={
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
      window.AgendaEditor?.saved(submittedSnapshot);
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
  box.innerHTML = `<h2>Para revisar</h2><div class="agenda-alert-grid"><button type="button" data-agenda-jump="reservations"><strong>${pending.length}</strong> solicitudes pendientes</button><button type="button" data-agenda-jump="reservations"><strong>${waiting.length}</strong> en lista de espera${invitations.length ? ` · ${invitations.length} con plazas para revisar` : ""}</button><button type="button" data-agenda-jump="games"><strong>${upcoming.length}</strong> partidas esta semana con plazas libres</button></div>${
    upcoming.length
      ? `<ul>${upcoming
          .slice(0, 5)
          .map(
            (g) =>
              `<li>${esc(g.title)} · ${esc(new Date(g.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "short", timeStyle: "short" }))} · ${Number(g.available)} plazas</li>`,
          )
          .join("")}</ul>`
      : ""
  }`;
  box.querySelectorAll("[data-agenda-jump]").forEach(
    (button) =>
      (button.onclick = () => {
        currentTab = button.dataset.agendaJump;
        render();
        document.querySelector("#panel").focus({ preventScroll: true });
      }),
  );
}

// Una sola protección para la navegación, las pestañas y el cierre de página.
if(!window.agendaLeaveGuardInstalled){
 window.agendaLeaveGuardInstalled=true;
 window.addEventListener('beforeunload',event=>{if(window.AgendaEditor?.dirty()){event.preventDefault();event.returnValue='';}});
 document.addEventListener('click',event=>{
  const target=event.target.closest('[data-tab],[data-agenda-jump],#refresh,#logout,a[href]');
  if(target && window.AgendaEditor && !window.AgendaEditor.canLeave()){event.preventDefault();event.stopImmediatePropagation();}
 },true);
}
