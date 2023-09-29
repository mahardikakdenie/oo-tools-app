const router = [
    {
        name: "home",
        path: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
            groupParents: 'Home Dashboard'
        },
    },
    {
        name: 'CRM Dashboard',
        path: 'crm',
        component: () => import('@/views/home/crm.vue'),
    },
    {
        name: 'Ecommerce Dashboard',
        path: 'ecommerce',
        component: () => import('@/views/home/ecommerce.vue'),
    },
    {
        name: 'Bangking Dashboard',
        path: 'banking',
        component: () => import('@/views/home/banking.vue'),
    },
    {
        name: 'Project Dashboard',
        path: 'project',
        component: () => import('@/views/home/project.vue'),
        meta: {
            groupParent: 'Home Dashboard'
        },
    },
];

export default router;