import { siteData } from '../siteData';

(() => {
  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  function category(format) {
    const s = normalize(format);
    if (
      [
        "partida unica",
        "one-shot",
        "oneshot",
        "one shot",
        "una sola sesion",
        "1 sola sesion",
      ].includes(s)
    )
      return "oneshot";
    if (s.includes("corta")) return "short";
    if (s.includes("larga") || s === "campana") return "long";
    if (s.includes("sesiones")) return "multi";
    return "";
  }
  const names = {
    oneshot: "One-shot · Una sola sesión",
    multi: "Varias sesiones",
    short: "Campaña corta",
    long: "Campaña larga",
  };
  const adventures = (siteData?.commissioned_games || []).filter(
    (item) => item.published === true,
  );
  function badge(format) {
    const span = document.createElement("span");
    span.className = "adventure-format-badge";
    span.dataset.formatColor = category(format);
    span.textContent = names[span.dataset.formatColor] || format;
    return span;
  }
  const form = document.querySelector("#request-game-form"),
    dialog = document.querySelector("#request-game-dialog");
  if (form && dialog) {
    let preferOneshot = false;
    const panel = document.createElement("aside");
    panel.className = "request-format-preference";
    panel.hidden = true;
    const text = document.createElement("p"),
      change = document.createElement("button");
    change.type = "button";
    change.textContent = "Ver sin prioridad de one-shots";
    change.hidden = true;
    panel.append(text, change);
    form.querySelector('[data-step="0"]').prepend(panel);

    function regroup() {
      const select = form.elements.adventure;
      const selected = select.value;
      const kind = form.elements.kind.value;

      const entries = adventures.filter((item) => item.origin === kind);
      const single = entries.filter(
        (item) => category(item.format) === "oneshot",
      );

      const visible = preferOneshot ? single : entries;

      const placeholder = new Option(
        visible.length
          ? "Selecciona una aventura…"
          : preferOneshot
            ? "No hay one-shots disponibles"
            : "No hay aventuras disponibles",
        "",
      );

      placeholder.disabled = true;
      placeholder.selected = true;
      select.replaceChildren(placeholder);

      // Asigna a cada opción su categoría para aplicar el color pastel.
      function crearOpcion(item) {
        const option = new Option(item.title, item.title);
        option.dataset.formatColor = category(item.format);
        return option;
      }

      // Orden de los grupos y sus colores.
      const grupos = [
        ["oneshot", "One-shots · Una sola sesión"],
        ["multi", "Aventuras de varias sesiones"],
        ["short", "Campañas cortas"],
        ["long", "Campañas largas"],
      ];

      for (const [tipo, titulo] of grupos) {
        const items = visible
          .filter((item) => category(item.format) === tipo)
          .sort((a, b) => a.title.localeCompare(b.title, "es"));

        if (!items.length) continue;

        const group = document.createElement("optgroup");
        group.label = titulo;

        items.forEach((item) => {
          group.append(crearOpcion(item));
        });

        select.append(group);
      }

      // Conserva los formatos que no tengan una categoría reconocida.
      const otros = visible
        .filter(
          (item) => !grupos.some(([tipo]) => category(item.format) === tipo),
        )
        .sort((a, b) => a.title.localeCompare(b.title, "es"));

      if (otros.length) {
        const group = document.createElement("optgroup");
        group.label = "Otras aventuras";

        otros.forEach((item) => {
          group.append(crearOpcion(item));
        });

        select.append(group);
      }

      // Mantiene la selección solo si sigue estando disponible.
      select.value = visible.some((item) => item.title === selected)
        ? selected
        : "";

      change.hidden = true;
      panel.hidden = !preferOneshot;

      text.textContent = !kind
        ? "Elige un one-shot propio, oficial o personalizado."
        : kind === "personalizada"
          ? "One-shot personalizado · Una sesión de unas 4 horas."
          : single.length
            ? "Mostrando únicamente aventuras de una sola sesión."
            : "No hay one-shots disponibles en este origen. Prueba el otro origen o una partida personalizada.";
    }
    function decorateCard() {
      const card = form.querySelector(".request-adventure-card");
      if (!card) return;
      const item = adventures.find(
        (item) =>
          item.origin === form.elements.kind.value &&
          item.title === form.elements.adventure.value,
      );
      card.querySelector(".adventure-format-badge")?.remove();
      delete card.dataset.formatColor;
      if (!item) return;
      card.dataset.formatColor = category(item.format);
      card
        .querySelector(".request-adventure-heading")
        ?.after(badge(item.format));
    }
    change.onclick = () => {
      preferOneshot = false;
      regroup();
    };
    form.addEventListener("agenda-select-start", (event) => {
      preferOneshot = Number(event.detail.duration) === 240;
      queueMicrotask(() => {
        regroup();
        if (preferOneshot && form.elements.kind.value === "personalizada") {
          form.elements.format.value = "Partida única";
          form.elements.format.dispatchEvent(
            new Event("change", { bubbles: true }),
          );
        }
      });
    });
    form.elements.kind.addEventListener("change", () => {
      regroup();
      if (preferOneshot && form.elements.kind.value === "personalizada") {
        form.elements.format.value = "Partida única";
        form.elements.format.dispatchEvent(
          new Event("change", { bubbles: true }),
        );
      }
      decorateCard();
    });
    form.elements.adventure.addEventListener("change", () => {
      decorateCard();
      const item = adventures.find(
        (item) =>
          item.origin === form.elements.kind.value &&
          item.title === form.elements.adventure.value,
      );
      if (preferOneshot && item && category(item.format) !== "oneshot") {
        text.textContent =
          "Has elegido una aventura de varias sesiones. Selecciona 2, 2,5 o 3 horas y volveremos a comprobar el hueco.";
        const duration = form.elements.duration;
        [...duration.options]
          .filter((option) => option.value === "4")
          .forEach((option) => option.remove());
        if (!["2", "2.5", "3"].includes(duration.value)) duration.value = "";
        duration.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    dialog.addEventListener("close", () => {
      preferOneshot = false;
      panel.hidden = true;
      queueMicrotask(() => {
        regroup();
        decorateCard();
      });
    });
    decorateCard();
  }
  // Las tarifas conservan sus filtros, paginación y ordenación.
  const rates =
    document.querySelector("#adventure-rates") ||
    document.querySelector("[data-rates-origin]")?.closest("section");
  function decorateRates() {
    if (!rates) return;
    for (const row of rates.querySelectorAll("tbody tr")) {
      const cells = row.querySelectorAll(":scope > td");
      if (cells.length < 3) continue;
      const span = cells[1].querySelector("span");
      if (!span) continue;
      const cat = category(span.textContent);
      if (!cat) continue;
      span.classList.add("adventure-format-badge");
      span.dataset.formatColor = cat;
      row.dataset.formatColor = cat;
    }
  }
  if (rates) {
    const legend = document.createElement("div");
    legend.className = "adventure-format-legend";
    legend.setAttribute("aria-label", "Formatos de las aventuras");
    for (const [key, label] of Object.entries(names)) {
      const item = document.createElement("span");
      item.className = "adventure-format-badge";
      item.dataset.formatColor = key;
      item.textContent = label;
      legend.append(item);
    }
    const tableBox =
      rates.querySelector(".game-rates__scroll") ||
      rates.querySelector("table");
    if (tableBox) tableBox.before(legend);
    new MutationObserver(decorateRates).observe(rates, {
      childList: true,
      subtree: true,
    });
    decorateRates();
  }
})();
