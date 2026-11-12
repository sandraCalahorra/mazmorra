export default [
    {
        path: '/',
        name: 'index',
        meta: { requiresAuth: false, title: 'La Mazmorra del Roleo — Historias que se juegan' },
        component: () => import('@/components/views/index.vue')
    },
    {
        path: '/acceso',
        name: 'acceso',
        meta: { requiresAuth: false, title: 'Iniciar sesión — La Mazmorra del Roleo' },
        component: () => import('@/components/views/acceso.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: { requiresAuth: false, title: 'Administración — La Mazmorra del Roleo' },
        component: () => import('@/components/views/admin.vue')
    },
    {
        path: '/calendario',
        name: 'calendario',
        meta: { requiresAuth: false, title: 'Calendario de partidas — La Mazmorra del Roleo' },
        component: () => import('@/components/views/calendario.vue')
    },
    {
        path: '/catalogo',
        name: 'catalogo',
        meta: { requiresAuth: false, title: 'El catálogo — La Mazmorra del Roleo' },
        component: () => import('@/components/views/catalogo.vue')
    },
    {
        path: '/contacto',
        name: 'contacto',
        meta: { requiresAuth: false, title: 'Contacto — La Mazmorra del Roleo' },
        component: () => import('@/components/views/contacto.vue')
    },
    {
        path: '/encargos',
        name: 'encargos',
        meta: { requiresAuth: false, title: 'Encargos a medida — La Mazmorra del Roleo' },
        component: () => import('@/components/views/encargos.vue')
    },
    {
        path: '/mi-perfil',
        name: 'mi-perfil',
        meta: { requiresAuth: true, title: 'Mi perfil — La Mazmorra del Roleo' },
        component: () => import('@/components/views/mi-perfil.vue')
    },
    {
        path: '/mis-partidas',
        name: 'mis-partidas',
        meta: { requiresAuth: true, title: 'Mis partidas — La Mazmorra del Roleo' },
        component: () => import('@/components/views/mis-partidas.vue')
    },
    {
        path: '/registro',
        name: 'registro',
        meta: { requiresAuth: false, title: 'Crear una cuenta — La Mazmorra del Roleo' },
        component: () => import('@/components/views/registro.vue')
    },
    {
        path: '/sobre-mi',
        name: 'sobre-mi',
        meta: { requiresAuth: false, title: 'Sobre mí — La Mazmorra del Roleo' },
        component: () => import('@/components/views/sobre-mi.vue')
    }
];
