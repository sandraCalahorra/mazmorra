import routes from './routes';

// Laravel resuelve la URL y entrega el nombre de la vista a Vue.
export function loadPage(name) {
    const route = routes.find((entry) => entry.name === name);
    if (!route) {
        throw new Error(`Vista desconocida: ${name}`);
    }

    return route.component();
}
