"use strict";

(async () => {
  const get = (selector) => document.querySelector(selector);

  const message = (text) => {
    if (get("#user-status")) {
      get("#user-status").textContent = text;
    }
  };

  const escape = (text) =>
    String(text ?? "").replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character]
    );

  let account;

  async function load() {
    if (window.MazmorraCliente) { account = await window.MazmorraCliente.account(); return account; }
    const response = await fetch("usuario-api.php", {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data.error);
    }

    account = data;
    return data;
  }

  async function send(data) {
    const response = await fetch("usuario-api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": account.csrf,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw Error(result.error);
    }

    return result;
  }

  try {
    await load();

    const menu = get("#user-menu");

    if (menu) {
      menu.innerHTML =
        account.user || account.admin
          ? `
            <details class="account-menu">
              <summary>
                ${escape(account.user?.name || "Administrador")} ▾
              </summary>
              <div>
                ${
                  account.user
                    ? `
                      <a href="mis-partidas.html">Mis partidas</a>
                      <a href="mi-perfil.html">Mi perfil</a>
                    `
                    : ""
                }
                ${
                  account.admin
                    ? '<a href="admin.html">Administración</a>'
                    : ""
                }
                <button type="button" id="user-logout">
                  Cerrar sesión
                </button>
              </div>
            </details>
          `
          : `
            <a href="acceso.html">Iniciar sesión</a>
            <a href="registro.html">Registrarse</a>
          `;

      if (get("#user-logout")) {
        get("#user-logout").onclick = async () => {
          try {
            await send({ action: "logout" });
            location.href = "index.html";
          } catch (error) {
            message(error.message);
          }
        };
      }
    }

    const privatePage = get("#user-games") || get("#user-profile");

    if (privatePage && !account.user) {
      message("Inicia sesión para acceder a esta sección.");

      const link = document.createElement("a");
      link.href = "acceso.html";
      link.textContent = "Iniciar sesión";
      link.className = "btn gold";

      privatePage.after(link);
      return;
    }

    for (const [selector, action] of [
      ["#user-login", "login"],
      ["#user-register", "register"],
      ["#user-profile", "profile"],
    ]) {
      const form = get(selector);

      if (!form) continue;

      if (action === "profile") {
        form.hidden = false;

        for (const key of ["name", "email", "contact"]) {
          form.elements[key].value = account.user[key];
        }
      }

      form.onsubmit = async (event) => {
        event.preventDefault();

        const button = form.querySelector("button");
        button.disabled = true;

        try {
          const data = Object.fromEntries(new FormData(form));

          if (action === "register") {
            data.consent = form.elements.consent.checked;
          }

          await send({ ...data, action });

          if (action === "profile") {
            form.elements.current.value = "";
            form.elements.password.value = "";
            message("Perfil guardado.");
          } else {
            location.href = "mis-partidas.html";
          }
        } catch (error) {
          message(error.message);
        } finally {
          button.disabled = false;
        }
      };
    }

    const gamesContainer = get("#user-games");

    if (gamesContainer) {
      const status = {
        pending: "Pendiente",
        waitlisted: "En lista de espera (no reserva plazas)",
        confirmed: "Confirmada",
        rejected: "Rechazada",
        cancelled: "Cancelada",
      };

      const list = account.reservations;
      const now = new Date();

      gamesContainer.innerHTML =
        `
          <p>
            Las solicitudes realizadas con tu sesión iniciada aparecen aquí.
            Las anteriores al registro no se vinculan automáticamente.
          </p>
        ` +
        [
          [
            "Próximas partidas",
            list.filter((game) => new Date(game.starts) >= now),
          ],
          [
            "Historial",
            list.filter((game) => new Date(game.starts) < now),
          ],
        ]
          .map(
            ([title, items]) => `
              <h2>${title}</h2>
              ${
                items.length
                  ? items
                      .map((game) => {
                        const date = new Date(game.starts).toLocaleString(
                          "es-ES",
                          { timeZone: "Europe/Madrid" }
                        );

                        return `
                          <article class="session-card">
                            <h3>${escape(game.title)}</h3>${game.request_type === "commissioned" ? "<p><strong>Partida por encargo</strong></p>" : ""}

                            <p>
                              ${escape(date)} (Madrid)<br>
                              ${escape(game.duration)} · ${escape(game.mode)}
                            </p>

                            <p>
                              ${escape(game.players)} plaza(s) ·
                              Reserva ${escape(status[game.status] || game.status)}
                              <br>
                              Pago:
                              ${
                                Number(game.paid)
                                  ? "Comprobado por el máster"
                                  : "No comprobado"
                              }
                            </p>

                            ${game.status === "rejected" && game.rejection_reason ? `
                              <aside role="note" style="padding:16px;margin:18px 0;background:#fff0e8;border:1px solid #d3a38f;border-radius:8px;color:#663c30;">
                                <strong>Mensaje del máster sobre tu solicitud</strong>
                                <p style="color:inherit;white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0 0;">${escape(game.rejection_reason)}</p>
                              </aside>` : ""}

                            <button
                              type="button"
                              class="btn outline"
                              data-contact-game="${escape(game.id)}"
                            >
                              Contactar con el máster ↗
                            </button>
                          </article>
                        `;
                      })
                      .join("")
                  : "<p>No hay partidas en esta sección.</p>"
              }
            `
          )
          .join("");

      // Abre el modal al pulsar el botón de una reserva.
      gamesContainer.addEventListener("click", (event) => {
        const button = event.target.closest("[data-contact-game]");

        if (!button) return;

        const game = list.find(
          (item) => String(item.id) === button.dataset.contactGame
        );

        if (!game) return;

        try {
          if (typeof contact !== "function") {
            throw Error(
              "No se ha cargado el modal de contacto. Comprueba que app.js se carga antes de usuario.js."
            );
          }

          const date = new Date(game.starts).toLocaleString("es-ES", {
            timeZone: "Europe/Madrid",
          });

          // Reutiliza el modal de contacto de app.js.
          contact(`mi reserva para «${game.title}»`);

          const field = get("#message");

          if (!field) {
            throw Error("No se ha encontrado el campo del mensaje.");
          }

          field.value =
            `Hola, Hugo. Soy ${account.user.name}.\n\n` +
            `Te escribo sobre mi reserva para «${game.title}», ` +
            `del ${date} (horario de Madrid).\n` +
            `Referencia de reserva: ${game.id}.\n\n` +
            `Mi consulta es:\n`;

          // Actualiza el enlace de WhatsApp con el mensaje preparado.
          field.dispatchEvent(new Event("input", { bubbles: true }));

          field.focus();
          field.setSelectionRange(field.value.length, field.value.length);
        } catch (error) {
          message(error.message);
        }
      });
    }
  } catch (error) {
    message(error.message);

    if (get("#user-menu")) {
      get("#user-menu").innerHTML =
        '<a href="acceso.html">Acceso de usuarios</a>';
    }
  }
})();