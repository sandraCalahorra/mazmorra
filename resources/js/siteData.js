import { api, apiError } from './api';

export let siteData = { products: [], games: [], config: {} };
let pending;

export function loadSiteData() {
  pending ??= api.get('api/public')
    .then(({ data }) => (siteData = data))
    .catch((error) => {
      siteData.error = apiError(error, 'No se han podido cargar los datos de la web.');
      return siteData;
    });
  return pending;
}
