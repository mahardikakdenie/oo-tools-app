import adminDashboard from '@/router/admin-dashboard/index'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/system-log",
    component: () => import("@/Layout/index.vue"),
    children: [
      ...adminDashboard,
      {
        path: "/calender",
        name: "calender",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
];

export default routes;
