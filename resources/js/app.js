import '../css/app.css';
import { createApp } from 'vue';
import { loadFeature } from '@/features';
import { loadSiteData } from '@/store/modules/siteData';

import { loadPage } from './router';

const root = document.querySelector('#app');
const loading = document.querySelector('#site-loading');

function finishLoading() {
  root.removeAttribute('aria-busy');
  root.inert = false;
  loading?.remove();
}

async function start() {
  const { default: Page, features, needsSiteData } = await loadPage(root.dataset.page);

  createApp(Page).mount(root);

  if (needsSiteData) await loadSiteData();

  for (const feature of features) {
    await loadFeature(feature);
  }
  finishLoading();

  if (location.hash) {
    try {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    } catch {
      // El fragmento puede contener escapes inválidos.
    }
  }
}

start().catch((error) => {
  console.error(error);
  finishLoading();
  const status = document.createElement('p');
  status.setAttribute('role', 'alert');
  status.textContent = 'No se ha podido cargar la página completa. Vuelve a intentarlo.';
  root.prepend(status);
});
