import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      },
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/dashboard",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard/analysis",
        name: "analysis",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue")
      },
      {
        path: "/dashboard/monitor",
        name: "monitor",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Monitor.vue")
      },
      {
        path: "/dashboard/workspace",
        name: "workspace",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Workspace.vue")
      },
      {
        path: "/form",
        redirect: "/form/basic-form"
      },
      {
        path: "/form/basic-form",
        name: "basic-form",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/BasicForm.vue")
      },
      {
        path: "/form/step-form",
        name: "step-form",
        redirect: "form/step-form/info"
      },
      {
        path: "/form/step-form/info",
        name: "step-form-info",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormInfo.vue")
      },
      {
        path: "/form/step-form/confirm",
        name: "step-form-confirm",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormConfirm.vue")
      },
      {
        path: "/form/step-form/result",
        name: "step-form-result",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormResult.vue")
      },
    ]
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
