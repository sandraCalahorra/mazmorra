import{s as m}from"./main-CLiHRCN8.js";(()=>{var i;const t=document.querySelector("#featured-products");if(!t)return;const s=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),c=e=>new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(e),r=(((i=m)==null?void 0:i.products)||[]).filter(e=>e.published!==!1).slice(0,3);function l(e){const a=(Array.isArray(e.purchase_packages)?e.purchase_packages:[]).map(o=>Number(o.price)).filter(o=>Number.isFinite(o)&&o>0);return a.length?(new Set(a).size>1?"Desde ":"")+c(Math.min(...a)):e.price||"Precio a consultar"}t.innerHTML=r.length?r.map(e=>{const a="catalogo.html#publicacion-"+encodeURIComponent(String(e.id)),n=e.status==="Disponible"?"Publicado":e.status||"En desarrollo",o=[e.level,e.players,e.pages?`${e.pages} páginas`:""].filter(Boolean);return`
          <article class="home-book">
            <a
              class="home-book__cover"
              href="${s(a)}"
              aria-label="${s(`Descubrir ${e.title}`)}"
            >
              <span class="home-book__status">
                ${s(n)}
              </span>

              ${e.cover?`
                    <img
                      src="${s(e.cover)}"
                      alt="${s(`Portada de ${e.title}`)}"
                      loading="lazy"
                      width="600"
                      height="500"
                    >
                  `:`
                    <span class="home-book__placeholder">
                      <small>LA MAZMORRA DEL ROLEO</small>
                      <span aria-hidden="true">✧</span>
                      <strong>${s(e.title)}</strong>
                    </span>
                  `}
            </a>

            <div class="home-book__content">
              <h3>
                <a href="${s(a)}">
                  ${s(e.title)}
                </a>
              </h3>

              <p class="home-book__intro">
                ${s(e.intro)}
              </p>

              <p class="home-book__meta">
                ${s(o.join(" · "))}
              </p>

              <div class="home-book__bottom">
                <span class="home-book__price">
                  ${s(l(e))}
                </span>

                <a
                  class="home-book__discover"
                  href="${s(a)}"
                >
                  Descubrir <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        `}).join(""):`
      <p class="home-library__empty">
        La biblioteca se está preparando.
        Pronto encontrarás nuevas historias aquí.
      </p>
    `})();
