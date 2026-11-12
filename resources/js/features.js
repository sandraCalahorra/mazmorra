const modules = import.meta.glob('./features/*.js');

export function loadFeature(name) {
  const load = modules[`./features/${name}.js`];
  if (!load) return Promise.reject(new Error(`Función desconocida: ${name}`));
  return load();
}
