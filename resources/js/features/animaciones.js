(() => {
  function iniciar() {
    const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (preferencia.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const registrados = new WeakSet();

    const cards = [
      ".card",
      ".product-card",
      ".session-card",
      ".commission-step",
      ".commission-card",
      ".faq details",
    ].join(", ");

    const bloques = [
      "main > section",
      ".author-card",
      ".site-footer__main",
      "[data-reveal]",
    ].join(", ");

    const selector = `${bloques}, ${cards}`;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;

          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    function registrar(elemento) {
      // La guía de reserva utiliza su propia animación.
      if (
        elemento.matches(".booking-guide") ||
        (elemento.matches(".commission-block") && elemento.querySelector(".commission-cards")) ||
        elemento.closest(".commission-cards") ||
        elemento.closest(".booking-guide")
      ) {
        return;
      }
      if (registrados.has(elemento)) return;
      registrados.add(elemento);

      // Evita animar a la vez un contenedor y sus hijos.
      // Los elementos interiores tienen prioridad.
      if (
        !elemento.hasAttribute("data-reveal") &&
        elemento.querySelector(selector)
      ) {
        return;
      }

      const rect = elemento.getBoundingClientRect();

      // El contenido visible al abrir la página aparece directamente.
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return;
      }

      if (!elemento.hasAttribute("data-reveal")) {
        elemento.dataset.reveal = elemento.matches(".author-card")
          ? "zoom"
          : "up";
      }

      // Cards hermanas: entrada escalonada, con un máximo de 240 ms.
      if (elemento.matches(cards) && elemento.parentElement) {
        const hermanas = Array.from(elemento.parentElement.children).filter(
          (hijo) => hijo.matches(cards),
        );

        const posicion = hermanas.indexOf(elemento);

        elemento.style.setProperty(
          "--reveal-delay",
          `${Math.min(Math.max(posicion, 0), 3) * 80}ms`,
        );
      }

      elemento.classList.add("scroll-reveal");
      observer.observe(elemento);
    }

    function buscar(raiz) {
      if (!(raiz instanceof Element)) return;

      if (raiz.matches(selector)) registrar(raiz);
      raiz.querySelectorAll(selector).forEach(registrar);
    }

    buscar(document.body);

    // Incluye cards creadas después por el catálogo o las reservas.
    const cambios = new MutationObserver((mutaciones) => {
      mutaciones.forEach((mutacion) => {
        mutacion.addedNodes.forEach(buscar);

        mutacion.removedNodes.forEach((nodo) => {
          if (!(nodo instanceof Element)) return;

          observer.unobserve(nodo);
          nodo.querySelectorAll(".scroll-reveal").forEach((elemento) => {
            observer.unobserve(elemento);
          });
        });
      });
    });

    cambios.observe(document.body, {
      childList: true,
      subtree: true,
    });

    preferencia.addEventListener("change", (evento) => {
      if (!evento.matches) return;

      observer.disconnect();
      cambios.disconnect();

      document.querySelectorAll(".scroll-reveal").forEach((elemento) => {
        elemento.classList.add("is-visible");
      });
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
// Aparición escalonada de los pasos de reserva.
(() => {
  const steps = document.querySelector(".booking-guide__steps");

  if (
    !steps ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      steps.classList.add("is-entering");
      observer.disconnect();
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(steps);
})();

// Las tarjetas de servicios se despliegan como pergaminos, una sola vez.
(() => {
  function iniciarPergaminos() {
    const group = document.querySelector('.commission-cards');
    if (!group || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      group.classList.add('commission-cards--entering');
      observer.disconnect();
    }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
    observer.observe(group);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarPergaminos, {once: true});
  } else iniciarPergaminos();
})();
