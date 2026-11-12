import { siteData } from '@/store/modules/siteData';

export function initializePricing() {
  const dialog = document.querySelector("#request-game-dialog");
  if (!dialog) return;

  const form = dialog.querySelector("form");
  const fields = form.elements;

  // La tarifa configurada es por sesión en partidas únicas y por hora en campañas.
  const euros = (cantidad) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(cantidad);

  // Número exacto: también permite solicitar un grupo especial.
  fields.players.min = "1";
  fields.players.max = "30";

  const opcionesPequenos = document.createElement("label");
  opcionesPequenos.className = "wide";
  opcionesPequenos.hidden = true;

  opcionesPequenos.innerHTML = `
  Para grupos de 1 o 2 jugadores
  <select name="smallGroup" required>
    <option value="" selected disabled>Seleccione...</option>
    <option value="shared">Buscar una mesa compartida</option>
    <option value="private">Solicitar una sesión privada</option>
  </select>
`;

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

    // Solo participa en el formulario cuando está visible
    // y el paso del grupo está activo.
    fields.smallGroup.disabled =
      opcionesPequenos.hidden || fields.players.disabled;

// Oculta el cuadro adicional cuando estamos en el resumen final.
caja.hidden = true; 
 }

  form.addEventListener("input", actualizar);
  form.addEventListener("change", actualizar);

  // Actualiza al avanzar, retroceder o volver a abrir el modal.
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
