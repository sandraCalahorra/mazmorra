import { siteData } from '@/store/modules/siteData';

(() => {
  // Compatible con el HTML del catálogo anterior y el de tarjetas.
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
  // Se conservan rangos separados: «3–10; tramo final a nivel 17» no equivale a 3–17.
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
    const button = element("button", label + " ↕", "rates-heading-sort");
    button.type = "button";
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
  const previous = element("button", "← Anterior"),
    next = element("button", "Siguiente →"),
    info = element("span", "");
  previous.type = next.type = "button";
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
        // Los valores a consultar permanecen al final, en ambos sentidos.
        if (av === null || bv === null)
          return av === bv ? 0 : av === null ? 1 : -1;
        // No compara tarifas por hora con pagos únicos, incluso en formatos desconocidos.
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
    if (empty) {
      empty.hidden = !!visible.length;
      empty.textContent = "No hay aventuras que coincidan con estos filtros.";
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
        detailsButton = element(
          "button",
          "＋ Ver detalles",
          "rates-details-button",
        );
        detailsButton.type = "button";
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
              // Destaca la primera frase de la descripción.
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
        button = element(
          "button",
          "Solicitar aventura ↗",
          "game-rates__request",
        );
      button.type = "button";
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
  const reset = element("button", "Borrar filtros ↺", "rates-reset");

  reset.type = "button";

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
  // El mismo catálogo permanece montado: conserva filtros y paginación.
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
    const close = element("button", "×", "catalog-modal__close");
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar catálogo");
    bar.append(hint, close);
    modal.append(bar, section);
    document.body.append(modal);
    section.hidden = false;
    // El catálogo ya tiene su propia apertura; evita el reveal de su contenedor.
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
    // Cierra la capa del catálogo antes de abrir el formulario de solicitud.
    section.addEventListener(
      "click",
      (event) => {
        if (event.target.closest(".game-rates__request")) hideCatalog(true);
      },
      true,
    );
  }
})();
