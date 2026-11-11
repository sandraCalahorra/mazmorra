import '../css/app.css';
import { createApp } from 'vue';
import { loadFeature } from './features';
import { loadSiteData } from './siteData';

const root = document.querySelector('#app');
const pages = import.meta.glob('./pages/*.vue');

async function start() {
  const { default: Page, features, needsSiteData } = await pages[`./pages/${root.dataset.page}.vue`]();

  createApp(Page).mount(root);

  if (needsSiteData) await loadSiteData();

  for (const feature of features) {
    await loadFeature(feature);
  }
  root.removeAttribute('aria-busy');

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
  root.removeAttribute('aria-busy');
  const status = document.createElement('p');
  status.setAttribute('role', 'alert');
  status.textContent = 'No se ha podido cargar la página completa. Vuelve a intentarlo.';
  root.prepend(status);
});
