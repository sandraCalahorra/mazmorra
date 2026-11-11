import { contact } from './app';
import { siteData } from '../siteData';

(() => {
  const box = document.querySelector("#next-table-game");

  if (!box) return;

  const data = siteData;

  function element(tag, text, className) {
    const node = document.createElement(tag);

    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;

    return node;
  }

  function contactButton() {
    const button = element(
      "button",
      "Consultar una fecha para mi grupo ↗",
      "table-contact"
    );

    button.type = "button";

    button.onclick = () => {
      if (typeof contact === "function") {
        contact("organizar una partida para mi grupo");
      }
    };

    return button;
  }

  if (!data || data.error) {
    box.replaceChildren(
      element("p", "Consúltame las próximas fechas para jugar."),
      contactButton()
    );
    return;
  }

  const games = (data.games || [])
    .filter(
      (game) =>
        game.status === "open" &&
        new Date(game.starts) > new Date() &&
        Number(game.available) > 0
    )
    .sort((a, b) => new Date(a.starts) - new Date(b.starts));

  box.replaceChildren();

  if (!games.length) {
    box.append(
      element("p", "TU GRUPO TAMBIÉN TIENE SITIO", "eyebrow"),
      element("h3", "¿Tienes un grupo? Podemos buscar una fecha."),
      element("p", "Cuéntame cuántos sois y cuándo os gustaría jugar."),
      contactButton()
    );

    return;
  }

  const game = games[0];
  const date = new Date(game.starts);
  const zone = "Europe/Madrid";

  const day = new Intl.DateTimeFormat("es-ES", {
    timeZone: zone,
    day: "2-digit",
  }).format(date);

  const month = new Intl.DateTimeFormat("es-ES", {
    timeZone: zone,
    month: "short",
  })
    .format(date)
    .replace(".", "");

  const schedule = new Intl.DateTimeFormat("es-ES", {
    timeZone: zone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  box.append(element("p", "PRÓXIMA PARTIDA", "eyebrow"));

  const heading = element("div", undefined, "table-game-heading");
  const badge = element("div", undefined, "table-date-badge");

  badge.setAttribute("aria-hidden", "true");
  badge.append(element("strong", day), element("span", month));

  const details = element("div");

  details.append(
    element("h3", game.title),
    element(
      "p",
      `${schedule} · Horario de Madrid`,
      "table-date"
    )
  );

  heading.append(badge, details);
  box.append(heading);

  const tags = element("div", undefined, "table-game-tags");

  tags.append(
    element(
      "span",
      `${game.available} ${
        Number(game.available) === 1
          ? "plaza disponible"
          : "plazas disponibles"
      }`,
      "table-game-tag available"
    )
  );

  if (game.mode) {
    tags.append(element("span", game.mode, "table-game-tag"));
  }

  if (game.duration) {
    tags.append(element("span", game.duration, "table-game-tag"));
  }

  tags.append(
  element(
    "span",
    game.price ? `Precio: ${game.price}` : "Precio por confirmar",
    "table-game-tag price"
  )
);

  box.append(tags);

  const link = element(
    "a",
    "Ver partida y solicitar plaza →",
    "btn gold table-book-button"
  );

  link.href = `calendario.html?partida=${encodeURIComponent(game.id)}`;

  box.append(link);
})();