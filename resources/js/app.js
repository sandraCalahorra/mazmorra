import './components/core-ui/BaseSelect.vue';
import '../css/app.css';
import { createApp } from 'vue';
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
  const { default: Page, needsSiteData } = await loadPage(root.dataset.page);

  // Each view owns its lifecycle and initializes its own page behavior.
  // Load public data before mounting so `mounted` does not race the request.
  if (needsSiteData) await loadSiteData();

  createApp(Page).mount(root);
  finishLoading();

  if (location.hash) {
    try {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    } catch {
      // The fragment may contain invalid escape sequences.
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
