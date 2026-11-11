import { loadFeature } from '../features';

(() => {
  const catalog = document.querySelector('[data-about-catalog]');
  const request = document.querySelector('[data-about-request]');
  if (!catalog || !request) return;
  let requestReady;
  function prepareRequest() {
    requestReady ||= (async () => {
      request.setAttribute('data-request-game', '');
      await loadFeature('solicitar-partida');
      if (!document.getElementById('request-game-dialog')) throw Error('request');
    })().catch(error => { requestReady = null; throw error; });
    return requestReady;
  }

  let catalogReady;
  function prepareCatalog() {
    catalogReady ||= (async () => {
      await prepareRequest();
      const section = document.querySelector('#game-rates-body')?.closest('.game-rates');
      if (!section) throw Error('catalog');
      section.removeAttribute('data-reveal');
      catalog.classList.add('booking-guide__explore');
      await loadFeature('sobre-mi-catalogo');
      if (!document.getElementById('adventure-catalog-dialog')) throw Error('catalog-dialog');
    })().catch(error => { catalogReady = null; throw error; });
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
        await prepare();
        button.removeAttribute('aria-busy'); status.textContent = '';
        button.click();
      } catch {
        status.textContent = 'No se ha podido abrir. Puedes volver a intentarlo o acceder desde el calendario.';
      } finally {button.removeAttribute('aria-busy');}
    });
  }
})();
