import { notify, refresh, state } from './admin';
import { requestWithStatus } from '@/bootstrap';

(() => {
  const panel = document.querySelector("#panel");
  if (!panel) return;
  function enhance() {
    if (
      document.querySelector(".admin-tabs .active")?.dataset.tab !==
      "reservations"
    )
      return;
    if (typeof state === "undefined" || !state) return;
    for (const card of panel.querySelectorAll(".admin-item")) {
      if (card.querySelector("[data-delete-request]")) continue;
      const existing = card.querySelector(
        "[data-reservation],[data-reject-reservation],[data-archive-reservation]",
      );
      if (!existing) continue;
      const id =
        existing.dataset.reservation ||
        existing.dataset.rejectReservation ||
        existing.dataset.archiveReservation;
      const row = state.reservations.find(
        (item) => String(item.id) === String(id),
      );
      if (!row) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn danger";
      button.dataset.deleteRequest = id;
      button.textContent = "Eliminar definitivamente";
      button.onclick = async () => {
        const item = state.reservations.find(
          (entry) => String(entry.id) === String(id),
        );
        if (!item) return;
        const date = new Date(item.starts).toLocaleString("es-ES", {
          timeZone: "Europe/Madrid",
          dateStyle: "short",
          timeStyle: "short",
        });
        const warning = `¿Eliminar definitivamente la solicitud de ${item.name} para «${item.game_title || item.title}», del ${date} (Madrid)?\n\nSe borrará también de Mis partidas. No se puede recuperar.${item.status === "confirmed" ? " Se liberarán sus plazas o el horario reservado." : ""}${item.paid ? " Consta un pago comprobado: eliminar no realiza ninguna devolución." : ""}`;
        if (!confirm(warning)) return;
        button.disabled = true;
        try {
          const response = await requestWithStatus("api/admin/request/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Mazmorra-CSRF": state.csrf,
            },
            data: JSON.stringify({
              id: item.id,
              type:
                item.request_type === "commissioned"
                  ? "commissioned"
                  : "session",
              expected_status: item.status,
              confirmation: "DELETE",
            }),
          });
          const result = response.data;
          if ((response.status < 200 || response.status >= 300))
            throw Error(result.error || "No se pudo eliminar la solicitud.");
          await refresh();
          notify(result.message);
        } catch (error) {
          notify(error.message, true);
        } finally {
          button.disabled = false;
        }
      };
      card.querySelector(".actions")?.append(button);
    }
  }
  new MutationObserver(enhance).observe(panel, {
    childList: true,
    subtree: true,
  });
  enhance();
})();
