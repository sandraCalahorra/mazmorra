"use strict";
(() => {
  const page = document.querySelector('.about-page');
  if (!page) return;

  // Asigna aquí tus puntuaciones (1–30). El modificador se calcula solo.
  // null deja la característica pendiente de asignar.
  const scores = {
    piedad: 8,
    suerte: 16,
    improvisacion: 18,
    maldad: 14,
    sadismo: 15,
    disimulo: 17,
  };
  let assigned = 0;
  page.querySelectorAll('.dm-ability').forEach(box => {
    const score = scores[box.dataset.ability];
    if (!Number.isInteger(score) || score < 1 || score > 30) return;
    const modifier = Math.floor((score - 10) / 2);
    const scoreNode = box.querySelector('[data-score]');
    const modifierNode = box.querySelector('[data-modifier]');
    scoreNode.textContent = String(score);
    scoreNode.setAttribute('aria-label', `Puntuación ${score}`);
    modifierNode.textContent = modifier >= 0 ? `+${modifier}` : String(modifier);
    modifierNode.setAttribute('aria-label', `Modificador ${modifierNode.textContent}`);
    assigned++;
  });
  const note = page.querySelector('.dm-score-note');
  if (note && assigned === 6) note.hidden = true;

  // Cada grupo conserva su selección y permite navegar con teclado.
  page.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    if (!tabs.length || panels.some(panel => !panel)) return;
    function select(index, focus = false) {
      tabs.forEach((tab, i) => {
        const active = index === i;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
      });
      if (focus) tabs[index].focus();
    }
    panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabs[i].id);
      panel.tabIndex = 0;
    });
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', event => {
        let index;
        if (event.key === 'ArrowRight') index = (i + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') index = (i + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') index = 0;
        else if (event.key === 'End') index = tabs.length - 1;
        else return;
        event.preventDefault();
        select(index, true);
      });
    });
    select(0);
    list.hidden = false;
  });
})();

// Entrada pergamino escalonada de las tres tarjetas de la mesa.
(() => {
  function iniciar() {
    const group = document.querySelector('.about-table-cards');
    if (!group || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      group.classList.add('about-table-cards--entering');
      observer.disconnect();
    }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
    observer.observe(group);
    preference.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      group.classList.remove('about-table-cards--entering');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, {once: true});
  else iniciar();
})();
