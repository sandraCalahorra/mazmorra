"use strict";
// Se carga antes de admin.js; sus funciones se ejecutan después del inicio de sesión.
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
      "Actualiza api.php y añade app/shipping.php para configurar los envíos.";
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
  panel.innerHTML = `<div class="panel-head"><h2>Envíos de libros</h2></div>
    <p>Correos Paq Estándar a domicilio · Un sobre de hasta 5 kg, incluido el embalaje; una pila de libros. Península y Baleares. Otros destinos se confirman por WhatsApp.</p>
    <form id="shipping-settings" class="settings-form">
      <label class="shipping-check"><input name="enabled" type="checkbox" ${c.enabled ? "checked" : ""}> Activar cálculo automático</label>
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
          return `<label>${code} · ${name}${special ? " · A consultar" : `<select data-province="${code}"><option value="">A consultar</option>${zones.map((z) => `<option value="${z}" ${c.province_zones[code] === z ? "selected" : ""}>Zona ${z}</option>`).join("")}</select>`}</label>`;
        })
        .join("")}</div></details>
      <label class="shipping-check"><input name="confirmed" type="checkbox" ${c.confirmed ? "checked" : ""}> He comprobado tarifas, impuestos, recargos y zonas de mi contrato vigente.</label>
      <p>Pasada la fecha de revisión, la web vuelve a «Envío a consultar». El peso facturable es el mayor entre el real y largo × ancho × alto / 6000 (cm). Más de 15 kg facturables o medidas fuera de límite: a consultar.</p>
      <button type="submit" class="btn gold">Guardar envíos</button>
      <p id="shipping-save-status" role="status"></p>
    </form>`;
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
