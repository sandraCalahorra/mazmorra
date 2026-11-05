"use strict";
(() => {
  const catalog = document.querySelector('[data-about-catalog]');
  const request = document.querySelector('[data-about-request]');
  if (!catalog || !request) return;
  const cache = new Map();
  const pageURL = new URL('calendario.html', document.baseURI);
  let pagePromise;
  const calendar = () => pagePromise ||= fetch(pageURL, {credentials:'same-origin'})
    .then(r => { if (!r.ok) throw Error('calendar'); return r.text(); })
    .then(html => new DOMParser().parseFromString(html, 'text/html'))
    .catch(error => { pagePromise = null; throw error; });
  function style(url) {
    if ([...document.styleSheets].some(s => s.href === url)) return;
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = url;
    document.head.append(link);
  }
  function script(url) {
    if (cache.has(url)) return cache.get(url);
    const pending = new Promise((resolve,reject) => {
      const tag = document.createElement('script'); tag.src = url;
      tag.onload = resolve; tag.onerror = () => {tag.remove();cache.delete(url);reject(Error('script'));};
      document.body.append(tag);
    }); cache.set(url,pending); return pending;
  }
  function calendarStyles(page) {
    for (const link of page.querySelectorAll('link[rel="stylesheet"][href]')) {
      if (/solicitar-partida|tarifas|catalogo-aventuras|precios-partidas|formatos-aventuras|solicitudes-web|calendario\.css/.test(link.getAttribute('href')))
        style(new URL(link.getAttribute('href'),pageURL).href);
    }
  }
  let requestReady;
  async function prepareRequest(page) {
    if (document.querySelector('#request-game-dialog')) return;
    if (requestReady) return requestReady;
    requestReady = (async () => {
      request.setAttribute('data-request-game','');
      const pricing = [...page.querySelectorAll('script[src]')].reverse().find(s => /precios-partidas\.js/.test(s.getAttribute('src')));
      if (pricing) await script(new URL(pricing.getAttribute('src'),pageURL).href);
      style(new URL('css/solicitar-partida.css', pageURL).href);
      const src = [...page.querySelectorAll('script[src]')].reverse().find(s => /solicitar-partida\.js/.test(s.getAttribute('src')));
      await script(new URL(src?.getAttribute('src') || 'js/solicitar-partida.js', pageURL).href);
      if (!document.querySelector('#request-game-dialog')) throw Error('request');
    })().catch(error => {requestReady=null;throw error;});
    return requestReady;
  }
  let catalogReady;
  async function prepareCatalog(page) {
    if (catalogReady) return catalogReady;
    catalogReady = (async () => {
      await prepareRequest(page);
      const source = page.querySelector('#game-rates-body')?.closest('.game-rates');
      if (!source) throw Error('catalog');
      const section = document.importNode(source, true);
      section.hidden = true;
      section.id = 'adventure-rates';
      section.querySelectorAll('.game-rates__tools, .game-rates__pagination').forEach(el => el.remove());
      section.removeAttribute('data-reveal');
      document.body.append(section);
      catalog.classList.add('booking-guide__explore');
      style(new URL('css/sobre-mi-catalogo.css?v=2', pageURL).href);
      await script(new URL('js/sobre-mi-catalogo.js?v=2',pageURL).href);
      if (!document.querySelector('#adventure-catalog-dialog')) {section.remove();throw Error('catalog-dialog');}
    })().catch(error => {catalogReady=null;throw error;});
    return catalogReady;
  }
  for (const [button, prepare, dialogId] of [[request,prepareRequest,'request-game-dialog'],[catalog,prepareCatalog,'adventure-catalog-dialog']]) {
    button.addEventListener('click', async event => {
      event.preventDefault();
      if (document.getElementById(dialogId)) return;
      if (button.getAttribute('aria-busy') === 'true') return;
      button.setAttribute('aria-busy','true');
      const status = document.getElementById('about-action-status');
      status.textContent = 'Cargando…';
      try {
        const page = await calendar(); calendarStyles(page); await prepare(page);
        button.removeAttribute('aria-busy'); status.textContent = '';
        button.click();
      } catch {
        status.textContent = 'No se ha podido abrir. Puedes volver a intentarlo o acceder desde el calendario.';
      } finally {button.removeAttribute('aria-busy');}
    });
  }
})();
