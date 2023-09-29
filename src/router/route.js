import adminDashboard from '@/router/admin-dashboard/index'
const routes = [
  {
    path: "/admin",
    name: "Layout",
    redirect: "/admin/home",
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
