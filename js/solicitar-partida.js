"use strict";

(() => {
  const botones = document.querySelectorAll("[data-request-game]");
  if (!botones.length) return;

  const dialog = document.createElement("dialog");
  dialog.id = "request-game-dialog";
  dialog.setAttribute("aria-labelledby", "request-title");

  dialog.innerHTML = `
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
`;

  document.body.append(dialog);

  const form = dialog.querySelector("form");
  const fields = form.elements;
  // Todos los desplegables requieren una elección explícita.
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

  // Fecha mínima: hoy en Madrid.
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

  // Opciones desde las publicaciones públicas, sin insertar HTML del catálogo.
  // Aventuras disponibles para dirigir, separadas del catálogo de venta.
  const publicaciones = (window.SITE_DATA?.commissioned_games || []).filter(
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
      // Solo rutas locales y URL HTTP(S); se excluyen esquemas activos.
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
        /* La ficha sigue disponible sin portada. */
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

  // Conserva las opciones normales para oficiales y personalizadas.
  const opcionesNivel = Array.from(fields.level.options).map((opcion) => ({
    texto: opcion.textContent,
    valor: opcion.value,
    disabled: opcion.disabled,
  }));

  let nivelAutomatico = false;
  let nivelManual = "";

  // Opciones originales para oficiales y personalizadas.
  const opcionesFormato = Array.from(fields.format.options).map((opcion) => ({
    texto: opcion.textContent,
    valor: opcion.value,
    disabled: opcion.disabled,
  }));

  let formatoAutomatico = false;
  let formatoManual = "";

  function sincronizarFormato() {
    const esMia = ["mia", "oficial"].includes(fields.kind.value);

    // Bloqueado desde el inicio y al seleccionar aventuras tuyas.
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

  // Aplica también el valor si ya hay una aventura seleccionada.
  sincronizarFormato();

  // Impide abrir o modificar el selector cuando es automático.
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

      // Una única opción con el texto exacto de tu publicación.
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
      typeof window.precioSolicitudPartida === "function"
        ? `PRECIO ORIENTATIVO:\n${window.precioSolicitudPartida(d)}`
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
      typeof window.precioSolicitudPartida === "function"
        ? window.precioSolicitudPartida(d)
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

      // Valida solo los campos del paso que está en pantalla.
      bloque.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.disabled = !activo;
      });
    });

    actualizarCampos();

    // Mantén desactivados todos los campos de pasos ocultos.
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
      // Habilita los campos para construir el resumen completo.
      habilitarParaResumen();
      pintarResumenVisual(); // Evita que campos ocultos bloqueen el envío final.
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
        await window.MazmorraCliente.check(form);
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
      await window.MazmorraCliente.check(form);
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
      const account = await window.MazmorraCliente.account();
      const response = await fetch("api.php?route=/api/game-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": account.csrf,
        },
        body: JSON.stringify({ ...data, request_token: requestToken }),
      });
      const result = await response.json();
      if (!response.ok)
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
        String(window.SITE_DATA?.config?.whatsapp || "34666530043").replace(
          /\D/g,
          "",
        ) +
        "?text=" +
        encodeURIComponent(mensaje);
      const close = document.createElement("button");
      close.type = "button";
      close.className = "btn outline";
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

    // Actualiza los selectores y la ficha de la aventura.
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
  window.MazmorraCliente?.setupAvailability(form, dialog);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (dialog.open) return;

      // Lee el día seleccionado al abrir; usa la fecha civil sin convertirla a UTC.
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
