const router = [
    {
        name: "home",
        path: "home",
        component: () => import("@/views/home/crm.vue"),
        meta: {
            groupParents: 'Home Dashboard'
        },
    },
    {
        name: 'SystemLog',
        path: 'system-log',
        component: () => import('@/views/system-logs.vue'),
        meta: {
            groupParents: 'Home Dashboard'
        },
    },
    {
        name: 'Exchange Receipt Number',
        path: 'exchange-receipt-number',
        component: () => import('@/views/exchange-receipt-number.vue'),
    },
    {
        name: 'Submision Dashboard',
        path: 'submission',
        component: () => import('@/views/submission.vue'),
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
    {
        name: 'Submission',
        path: '/submission',
        component: () => import('@/views/submission.vue'),
        meta: {
            groupParent: 'Submission',
        }
    },
];

export default router;
