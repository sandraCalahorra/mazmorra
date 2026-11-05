"use strict";
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
let site = window.SITE_DATA || { products: [], games: [], config: {} },
  filter = "all";
const modal = $("#modal"),
  content = $("#modal-content");
function openDialog(html) {
  content.innerHTML = html;
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
    '<p class="eyebrow">HABLEMOS DE TU PRÓXIMA PARTIDA</p><h2>Prepara tu mensaje.</h2><label for="message">Tu consulta</label><textarea id="message"></textarea><div class="actions" id="contact-actions"></div><p id="contact-notice" class="notice"></p><p id="copy-status" role="status"></p>',
  );
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
  const copy = document.createElement("button");
  copy.className = "btn gold";
  copy.textContent = "Copiar mensaje";
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
    : "El autor todavía no ha configurado WhatsApp.";
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
          <select data-purchase-package>
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
          </select>
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

  lista.innerHTML = items.length
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
                      <button
                        type="button"
                        data-flip-open
                        aria-expanded="false"
                        aria-controls="publication-back-${index}"
                      >
                        Ver publicación ↻
                      </button>

                      ${
                        validDemo(p.demo)
                          ? `
                            <button
                              type="button"
                              data-demo="${esc(p.id)}"
                            >
                              Ver demo ↗
                            </button>
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
                            <button
                              type="button"
                              data-demo="${esc(p.id)}"
                            >
                              Ver demo ↗
                            </button>
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
    `;

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
          // Restaura la card aunque se interrumpa la animación.
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

    // Abre únicamente la aventura enlazada desde «Descubrir».
    let destinoInicial = "";

    try {
      destinoInicial = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      destinoInicial = "";
    }

    if (destinoInicial && destinoInicial === card.id) {
      // Retira el identificador antes de abrir para evitar repeticiones.
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
    : "El autor todavía no ha configurado WhatsApp.";
const menu = $(".menu");
menu.onclick = () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  $("nav").classList.toggle("open", open);
};
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
    // Comparte la fecha completa seleccionada con el formulario de solicitud.
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
        b = document.createElement("button");
      b.textContent = n + (count ? " ·" : "");
      b.disabled = value < today;
      b.className =
        (value === today ? "today " : "") +
        (value === selected ? "selected" : "");
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
    $("#session-list").innerHTML = games.length
      ? games
          .map(
            (g) =>
              `<article class="session-card"><h3>${esc(g.title)}</h3><p>${esc(new Date(g.starts).toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit" }))} (Madrid) · ${esc(g.duration)}<br>${esc(g.mode)}<br>${esc(g.price || "Precio por confirmar")} · ${g.available} plaza(s) disponibles</p><p class="preserve-lines">${esc(g.description)}</p><button class="btn gold" data-book="${g.id}" data-waitlist="${g.available < 1 ? "true" : "false"}">${g.available < 1 ? "Apuntarme a la lista de espera ↗" : "Solicitar plaza ↗"}</button></article>`,
          )
          .join("")
      : `<div class="calendar-empty-invite">
    <h3>¡Este día puede ser vuestra próxima aventura!</h3>
    <p>
      No hay sesiones publicadas para esta fecha.
      Solicita una partida para tu grupo.
    </p>
    <span class="calendar-empty-arrow" aria-hidden="true">↓</span>
  </div>`;
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
      `<p class="eyebrow">${waiting ? "LISTA DE ESPERA" : "SOLICITUD DE PLAZA"}</p><h2>${esc(g.title)}</h2><p>${esc(new Date(g.starts).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))} (Madrid) · ${esc(g.price || "Precio por confirmar")}</p><p class="notice">La solicitud queda pendiente hasta que el director la confirme. ${waiting ? "La sesión está completa. Esta solicitud te añade a la lista de espera; no reserva plazas ni garantiza una vacante." : "Las solicitudes pendientes no bloquean plazas."}</p><form id="booking-form"><div class="booking-fields"><label>Nombre o alias<input name="name" maxlength="80" required autocomplete="nickname"></label><label>Jugadores<input name="players" type="number" min="1" max="${waiting ? 20 : Math.min(20, g.available)}" value="1" required></label><label class="wide">Correo o teléfono de contacto<input name="contact" maxlength="200" required></label><label class="wide">Notas<textarea name="notes" maxlength="1500" placeholder="Experiencia, dudas o preferencias del grupo. No incluyas datos sensibles."></textarea></label><label class="wide consent"><input type="checkbox" name="consent" required> He leído la información de privacidad y acepto que se utilicen estos datos para tramitar mi solicitud.</label></div><button class="btn gold" type="submit">${waiting ? "Apuntarme a la lista de espera" : "Enviar solicitud"}</button><p id="booking-status" role="status"></p></form>`,
    );
    window.MazmorraCliente?.autofill($("#booking-form"));
    $("#booking-form").onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target,
        button = f.querySelector("button");
      button.disabled = true;
      const data = Object.fromEntries(new FormData(f));
      try {
        const response = await fetch("api.php?route=/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            game_id: g.id,
            waitlist: waiting,
            players: Number(data.players),
            consent: f.elements.consent.checked,
          }),
        });
        const r = await response.json();
        if (!response.ok) throw Error(r.error);
        content.innerHTML = `<p class="eyebrow">SOLICITUD RECIBIDA</p><h2>${r.waitlisted ? "Ya estás en la lista de espera" : "¡Ya está en la mesa!"}</h2><p>${r.waitlisted ? "Si se libera una plaza, el máster revisará la lista y contactará contigo. No hay plaza reservada ni asignación automática." : "El director ha recibido tu solicitud y la revisará."} La reserva todavía no está confirmada; no realices ningún pago hasta acordar las condiciones.</p><p>Referencia: <strong>${esc(r.reference)}</strong></p><p>El director te responderá por el contacto que has indicado. No se ha enviado un correo automático.</p>`;
        const updated = await fetch("api.php?route=/api/public");
        if (updated.ok) site = await updated.json();
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
