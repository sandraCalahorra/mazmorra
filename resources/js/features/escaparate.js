import { siteData } from '@/store/modules/siteData';

(() => {
  const lista = document.querySelector("#featured-products");
  if (!lista) return;

  const escapar = (valor) =>
    String(valor ?? "").replace(/[&<>"']/g, (caracter) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[caracter]);

  const euros = (valor) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(valor);

  const publicaciones = (
    siteData?.products || []
  )
    .filter((p) => p.published !== false)
    .slice(0, 3);

  function precioInicial(publicacion) {
    const precios = (
      Array.isArray(publicacion.purchase_packages)
        ? publicacion.purchase_packages
        : []
    )
      .map((paquete) => Number(paquete.price))
      .filter((precio) => Number.isFinite(precio) && precio > 0);

    if (!precios.length) {
      return publicacion.price || "Precio a consultar";
    }

    const distintos = new Set(precios);

    return (
      (distintos.size > 1 ? "Desde " : "") +
      euros(Math.min(...precios))
    );
  }

  lista.innerHTML = publicaciones.length
    ? publicaciones.map((p) => {
        const enlace =
          "catalogo#publicacion-" +
          encodeURIComponent(String(p.id));

        const estado =
          p.status === "Disponible"
            ? "Publicado"
            : p.status || "En desarrollo";

        const datos = [
          p.level,
          p.players,
          p.pages ? `${p.pages} páginas` : "",
        ].filter(Boolean);

        return `
          <article class="home-book">
            <a
              class="home-book__cover"
              href="${escapar(enlace)}"
              aria-label="${escapar(`Descubrir ${p.title}`)}"
            >
              <span class="home-book__status">
                ${escapar(estado)}
              </span>

              ${
                p.cover
                  ? `
                    <img
                      src="${escapar(p.cover)}"
                      alt="${escapar(`Portada de ${p.title}`)}"
                      loading="lazy"
                      width="600"
                      height="500"
                    >
                  `
                  : `
                    <span class="home-book__placeholder">
                      <small>LA MAZMORRA DEL ROLEO</small>
                      <span aria-hidden="true">✧</span>
                      <strong>${escapar(p.title)}</strong>
                    </span>
                  `
              }
            </a>

            <div class="home-book__content">
              <h3>
                <a href="${escapar(enlace)}">
                  ${escapar(p.title)}
                </a>
              </h3>

              <p class="home-book__intro">
                ${escapar(p.intro)}
              </p>

              <p class="home-book__meta">
                ${escapar(datos.join(" · "))}
              </p>

              <div class="home-book__bottom">
                <span class="home-book__price">
                  ${escapar(precioInicial(p))}
                </span>

                <a
                  class="home-book__discover"
                  href="${escapar(enlace)}"
                >
                  Descubrir <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        `;
      }).join("")
    : `
      <p class="home-library__empty">
        La biblioteca se está preparando.
        Pronto encontrarás nuevas historias aquí.
      </p>
    `;
})();