"use strict";
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
      // Reuse authenticated admin data when available; no additional request.
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
        /* The visual layer also works without shared state. */
      }
      // Origen de las aventuras disponibles para dirigir.
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
    const originSelect = make("select");

    originSelect.add(new Option("Todas las campañas", ""));
    originSelect.add(new Option("Mis campañas", "mia"));
    originSelect.add(new Option("Campañas oficiales", "oficial"));

    originLabel.append(originSelect);
    const statusLabel = make("label", "Estado");
    const select = make("select");
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
    const reset = make("button", "Limpiar", "admin-reset");
    reset.type = "button";
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
// Portadas como fondo del catálogo oficial.
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
// Cerrar el editor al pulsar en el fondo exterior.
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
