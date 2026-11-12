(() => {
        const section = document.getElementById("formatos-envios");
        if (!section) return;
        const button = section.querySelector(".formats-guide__toggle");
        const questions = document.getElementById("formats-content");
        const label = button.querySelector(".formats-guide__toggle-label");
        const icon = button.querySelector(".formats-guide__toggle-icon");

        function setExpanded(expanded) {
          questions.hidden = !expanded;
          button.setAttribute("aria-expanded", String(expanded));
          label.textContent = expanded ? "Ocultar información" : "Ver información";
          icon.textContent = expanded ? "−" : "+";
        }

        setExpanded(false);
        button.addEventListener("click", () => {
          setExpanded(button.getAttribute("aria-expanded") !== "true");
        });

        function openLinkedSection() {
          const id = window.location.hash.slice(1);
          if (id === section.id || (id && section.contains(document.getElementById(id)))) {
            setExpanded(true);
          }
        }
        document.querySelectorAll('a[href="#formatos-envios"]').forEach((link) => {
          link.addEventListener("click", () => setExpanded(true));
        });
        window.addEventListener("hashchange", openLinkedSection);
        openLinkedSection();
      })();
