import { requestWithStatus } from '@/bootstrap';
import { siteData } from '@/store/modules/siteData';

(() => {
  const money = (n) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(n);
  let dialog = null;
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.front-buy, a.flip-buy");
    if (!link || e.defaultPrevented) return;
    const card = link.closest(".flip-product");
    const packageId = card?.querySelector("[data-purchase-package]")?.value;
    if (!packageId?.startsWith("book")) return;
    const product = (siteData?.products || []).find(
      (p) => "publicacion-" + p.id === card.id,
    );
    if (
      !product ||
      !["Disponible", "Publicado"].includes(product.status) ||
      product.physical_stock === "out"
    )
      return;
    e.preventDefault();
    if (dialog?.open) return;
    const previousFocus = document.activeElement;
    const modal = document.createElement("dialog");
    dialog = modal;
    modal.className = "shipping-dialog";
    modal.setAttribute("aria-labelledby", "shipping-title");
    modal.innerHTML = `<button type="button" class="shipping-close" aria-label="Cerrar calculadora">×</button>
      <p class="eyebrow">TU PEDIDO</p><h2 id="shipping-title">Calcula el envío.</h2>
      <p data-product></p><p>Calculamos un sobre de hasta 5 kg, incluido el embalaje. Los pedidos que no quepan se confirman por WhatsApp antes del pago.</p>
      <form><label>Cantidad de ejemplares<input name="quantity" type="number" min="1" max="100" step="1" value="1" required></label>
        <label>Destino<select name="country"><option value="ES">España</option><option value="OTHER">Otro país · consultar</option></select></label>
        <label>Código postal<input name="postcode" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" required autocomplete="postal-code"></label>
        <label>Localidad / ciudad<input name="city" maxlength="180" readonly autocomplete="address-level2" placeholder="Introduce primero el código postal"></label>
        <label hidden>Selecciona tu localidad<select name="city_choice" disabled></select></label>
        <p data-city-status role="status" aria-live="polite"></p>
        <button type="submit" class="btn gold">Calcular envío</button>
      </form>
      <div class="shipping-result" role="status" aria-live="polite"></div>
      <a class="btn shipping-whatsapp" target="_blank" rel="noopener noreferrer" hidden>Continuar por WhatsApp ↗</a>`;
    document.body.append(modal);
    modal.querySelector("[data-product]").textContent = product.title;
    const f = modal.querySelector("form"),
      cp = f.elements.postcode,
      city = f.elements.city;
    const choice = f.elements.city_choice,
      hint = modal.querySelector("[data-city-status]");
    const result = modal.querySelector(".shipping-result"),
      next = modal.querySelector(".shipping-whatsapp");
    const calc = f.querySelector("button");
    let quoteVersion = 0,
      lookupVersion = 0,
      quoteAbort = null,
      lookupAbort = null;
    let timer = null,
      resolvedCP = "",
      cities = [];
    const domestic = () => f.elements.country.value === "ES";
    const selectedCity = () =>
      cities.length > 1 ? choice.value : city.value.trim();
    function invalidate() {
      quoteVersion++;
      quoteAbort?.abort();
      quoteAbort = null;
      next.hidden = true;
      next.removeAttribute("href");
      result.textContent = "";
      calc.disabled = false;
    }
    function cityMode(locked) {
      city.readOnly = locked;
      city.required = !locked;
      city.style.backgroundColor = locked ? "#e7e7e3" : "#fff";
      city.style.color = "#243329";
    }
    function resetCity() {
      lookupVersion++;
      lookupAbort?.abort();
      clearTimeout(timer);
      resolvedCP = "";
      cities = [];
      city.value = "";
      city.hidden = false;
      city.closest("label").hidden = false;
      choice.replaceChildren();
      choice.disabled = true;
      choice.required = false;
      choice.closest("label").hidden = true;
      hint.textContent = "";
      cityMode(domestic());
      city.placeholder = domestic()
        ? "Introduce primero el código postal"
        : "Escribe tu localidad";
    }
    function manualConsultation() {
      result.textContent =
        "No podemos calcular este envío automáticamente. Confirma el destino por WhatsApp.";
      const phone = String(
        siteData?.config?.whatsapp || "34666530043",
      ).replace(/\D/g, "");
      next.href =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
          `¡Hola, Hugo! Quiero comprar «${product.title}», paquete ${packageId}, ${f.elements.quantity.value} ejemplar(es). Destino: España, CP ${cp.value.trim()}. La web no ha podido identificar mi localidad. ¿Me confirmas localidad, envío, disponibilidad y total?`,
        );
      next.hidden = false;
    }
    async function lookup() {
      if (
        !domestic() ||
        !/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/.test(cp.value.trim())
      )
        return;
      const version = lookupVersion,
        postcode = cp.value.trim();
      lookupAbort = new AbortController();
      hint.textContent = "Buscando localidad…";
      try {
        const response = await requestWithStatus(
          "api/localities?postcode=" + encodeURIComponent(postcode),
          { signal: lookupAbort.signal, cache: "no-store" },
        );
        const data = response.data;
        if (version !== lookupVersion || !modal.open) return;
        if ((response.status < 200 || response.status >= 300) || !Array.isArray(data.cities))
          throw Error("No se pudo consultar la localidad.");
        cities = data.cities;
        resolvedCP = postcode;
        if (!cities.length) {
          hint.textContent =
            "Código no encontrado en nuestro catálogo. Consulta el destino por WhatsApp.";
          manualConsultation();
        } else if (cities.length === 1) {
          city.value = cities[0];
          hint.textContent = "Localidad identificada automáticamente.";
        } else {
          city.closest("label").hidden = true;
          choice.closest("label").hidden = false;
          choice.disabled = false;
          choice.required = true;
          choice.add(new Option("Selecciona tu localidad", ""));
          cities.forEach((name) => choice.add(new Option(name, name)));
          hint.textContent =
            "Este código tiene varias localidades. Selecciona la tuya.";
        }
      } catch (err) {
        if (version !== lookupVersion || err.name === "AbortError") return;
        hint.textContent =
          "No se pudo buscar la localidad. Vuelve a introducir el código postal o consulta por WhatsApp.";
        manualConsultation();
      }
    }
    f.addEventListener("input", (e) => {
      invalidate();
      if (e.target === cp) {
        resetCity();
        if (cp.value.trim().length === 5) timer = setTimeout(lookup, 250);
      }
    });
    choice.addEventListener("change", invalidate);
    f.elements.country.onchange = () => {
      invalidate();
      cp.required = domestic();
      cp.disabled = !domestic();
      resetCity();
      calc.textContent = domestic()
        ? "Calcular envío"
        : "Consultar envío internacional";
      if (domestic()) lookup();
    };
    const close = () => modal.close();
    modal.querySelector(".shipping-close").onclick = close;
    modal.addEventListener("cancel", (e) => {
      e.preventDefault();
      close();
    });
    let outside = false;
    modal.addEventListener("pointerdown", (e) => {
      outside = e.target === modal;
    });
    modal.addEventListener("click", (e) => {
      if (e.target !== modal || !outside) return;
      const r = modal.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        close();
    });
    modal.addEventListener(
      "close",
      () => {
        invalidate();
        lookupVersion++;
        lookupAbort?.abort();
        clearTimeout(timer);
        modal.remove();
        dialog = null;
        if (previousFocus?.isConnected)
          previousFocus.focus({ preventScroll: true });
      },
      { once: true },
    );
    f.onsubmit = async (e) => {
      e.preventDefault();
      invalidate();
      const postcode = domestic() ? cp.value.trim() : "";
      const locality = domestic() ? selectedCity() : city.value.trim();
      if (
        domestic() &&
        (resolvedCP !== postcode || !cities.includes(locality))
      ) {
        result.textContent =
          "Espera a que se identifique la localidad y selecciónala si hay varias.";
        return;
      }
      if (!locality) {
        result.textContent = "Introduce tu localidad.";
        return;
      }
      const token = quoteVersion;
      calc.disabled = true;
      quoteAbort = new AbortController();
      result.textContent = "Consultando el envío…";
      try {
        const response = await requestWithStatus(
          "api/shipping/quote",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
              product_id: product.id,
              package_id: packageId,
              country: domestic() ? "ES" : "XX",
              postcode,
              city: locality,
              quantity: Number(f.elements.quantity.value),
            }),
            signal: quoteAbort.signal,
          },
        );
        const data = response.data;
        if (token !== quoteVersion || !modal.open) return;
        if ((response.status < 200 || response.status >= 300))
          throw Error(data.error || "No se pudo calcular el envío.");
        result.replaceChildren();
        const lines = [
          ["Destino", domestic() ? `${locality}, ${postcode}` : locality],
          ["Paquete", data.package_label],
          ["Cantidad", String(data.quantity)],
          ["Precio por ejemplar", money(data.unit_price)],
          ["Subtotal de libros", money(data.product_price)],
          [
            "Envío",
            data.available ? money(data.shipping_price) : "A consultar",
          ],
        ];
        if (data.available) {
          lines.push([
            "Embalaje incluido",
            data.packaging_label + " · " + money(data.packaging_fee),
          ]);
          lines.push(["Total", money(data.total)]);
        }
        const dl = document.createElement("dl");
        lines.forEach(([label, value]) => {
          const row = document.createElement("div"),
            dt = document.createElement("dt"),
            dd = document.createElement("dd");
          dt.textContent = label;
          dd.textContent = value;
          row.append(dt, dd);
          dl.append(row);
        });
        const note = document.createElement("p");
        note.textContent = data.message;
        result.append(dl, note);
        const message = [
          `¡Hola, Hugo! Me gustaría comprar «${data.title}».`,
          `Paquete: ${data.package_label}.`,
          `Cantidad: ${data.quantity} ejemplar(es).`,
          `Libros: ${money(data.product_price)} (${money(data.unit_price)} por ejemplar).`,
          domestic()
            ? `Destino: ${locality}, España, código postal ${postcode}.`
            : `Destino: ${locality}, otro país (te indico el país).`,
          data.available
            ? `Envío: ${money(data.shipping_price)} · ${data.service}; embalaje incluido: ${data.packaging_label}, ${money(data.packaging_fee)}.`
            : "Envío pendiente de confirmar.",
          ...(data.available ? [`Total calculado: ${money(data.total)}.`] : []),
          "¿Me confirmas el importe final, la disponibilidad y cómo realizar el pago?",
        ];
        const phone = String(
          siteData?.config?.whatsapp || "34666530043",
        ).replace(/\D/g, "");
        next.href =
          "https://wa.me/" +
          phone +
          "?text=" +
          encodeURIComponent(message.join("\n"));
        next.hidden = false;
      } catch (err) {
        if (token === quoteVersion && err.name !== "AbortError")
          result.textContent = err.message;
      } finally {
        if (token === quoteVersion) calc.disabled = false;
      }
    };
    cityMode(true);
    modal.showModal();
    cp.focus();
  });
})();
