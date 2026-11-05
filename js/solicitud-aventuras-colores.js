"use strict";

(() => {
  if (window.__solicitudAventurasColores) return;
  window.__solicitudAventurasColores = true;

  const normalizar = (valor) =>
    String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Orden: larga, corta, varias sesiones y one-shots.
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
  const aventuras = window.SITE_DATA?.commissioned_games;

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

  // Evita reconstruir la lista continuamente con el MutationObserver.
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

    // También funciona si la ventana se crea después de cargar la página.
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