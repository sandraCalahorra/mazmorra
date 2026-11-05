"use strict";

(() => {
  const lista = document.querySelector(".book-carousel #products");
  const anterior = document.querySelector("#books-prev");
  const siguiente = document.querySelector("#books-next");

  if (!lista || !anterior || !siguiente) return;

  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const usarRaton = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  function actualizarFlechas() {
    const limite = Math.max(0, lista.scrollWidth - lista.clientWidth);

    anterior.disabled = lista.scrollLeft <= 2;
    siguiente.disabled = lista.scrollLeft >= limite - 2;
  }

  function mover(direccion) {
    const card = lista.querySelector(".product");
    if (!card) return;

    const estilos = getComputedStyle(lista);
    const espacio = parseFloat(estilos.columnGap) || 0;

    lista.scrollBy({
      left: direccion * (card.getBoundingClientRect().width + espacio),
      behavior: reducirMovimiento.matches ? "instant" : "smooth",
    });
  }

  anterior.addEventListener("click", () => mover(-1));
  siguiente.addEventListener("click", () => mover(1));

  // Permite recorrer el listado con el teclado al enfocarlo.
  lista.addEventListener("keydown", (evento) => {
    if (evento.target !== lista) return;

    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      mover(1);
    }

    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      mover(-1);
    }
  });

  // Efecto 3D sobre las portadas, incluidas las creadas al filtrar.
  const portadasPreparadas = new WeakSet();

  function prepararPortadas() {
    lista.querySelectorAll(".cover").forEach((portada) => {
      if (portadasPreparadas.has(portada)) return;
      portadasPreparadas.add(portada);

      const card = portada.closest(".product");

      function restablecer() {
        portada.style.setProperty("--tilt-x", "0deg");
        portada.style.setProperty("--tilt-y", "0deg");
      }

      card.addEventListener("pointermove", (evento) => {
        if (
          reducirMovimiento.matches ||
          !usarRaton.matches ||
          evento.pointerType !== "mouse"
        ) {
          restablecer();
          return;
        }

        const rect = card.getBoundingClientRect();

        const x = Math.max(
          -0.5,
          Math.min(0.5, (evento.clientX - rect.left) / rect.width - 0.5)
        );

        const y = Math.max(
          -0.5,
          Math.min(0.5, (evento.clientY - rect.top) / rect.height - 0.5)
        );

        portada.style.setProperty("--tilt-x", `${-y * 12}deg`);
        portada.style.setProperty("--tilt-y", `${x * 16}deg`);
      });

      card.addEventListener("pointerleave", restablecer);
      card.addEventListener("pointercancel", restablecer);
    });
  }

  function actualizarCatalogo() {
    lista.scrollLeft = 0;
    prepararPortadas();
    requestAnimationFrame(actualizarFlechas);
  }

  // app.js reconstruye las cards al buscar o cambiar de categoría.
  new MutationObserver(actualizarCatalogo).observe(lista, {
    childList: true,
  });

  lista.addEventListener("scroll", actualizarFlechas, { passive: true });
  lista.addEventListener("load", actualizarFlechas, true);

  if ("ResizeObserver" in window) {
    new ResizeObserver(actualizarFlechas).observe(lista);
  } else {
    window.addEventListener("resize", actualizarFlechas);
  }

  reducirMovimiento.addEventListener("change", () => {
    lista.querySelectorAll(".cover").forEach((portada) => {
      portada.style.setProperty("--tilt-x", "0deg");
      portada.style.setProperty("--tilt-y", "0deg");
    });
  });

  actualizarCatalogo();
})();