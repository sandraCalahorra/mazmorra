"use strict";
(() => {
  const toggle = document.querySelector(".commission-faq-toggle");
  const questions = document.querySelector("#commission-faq-questions");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    questions.hidden = open;
    toggle.textContent = open ? "Ver preguntas ＋" : "Ocultar preguntas −";
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

    // Mensaje para WhatsApp.
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
      window.SITE_DATA?.config?.whatsapp || "34666530043",
    ).replace(/\D/g, "");

    send.href = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n\n"))}`;

    // Resumen visual independiente del mensaje de WhatsApp.
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

    const price = card("Presupuesto orientativo", "commission-summary__price");

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

      paragraph(
        price,
        `${q.from ? "Desde " : ""}${money(q.total)}`,
        "commission-summary__total",
      );

      const pending = [];

      if (q.pending) pending.push("Suplemento del formato de entrega");
      if (illustrations) pending.push("Ilustraciones originales");

      paragraph(
        price,
        pending.length
          ? `Pendiente de presupuestar: ${pending.join("; ")}. ` +
              "No incluido en el importe mostrado."
          : "Importe pendiente de confirmar tras revisar tu idea.",
        "commission-summary__pending",
      );
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
    // Limpia los campos y vuelve al primer paso.
    form.reset();
    step = 0;

    // Actualiza paquetes, formato y campos visibles.
    configure();
    syncExtras();

    // Borra el resumen y el enlace anterior.
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
