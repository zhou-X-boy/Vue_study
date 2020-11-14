import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Soft1 from "../views/Soft1.vue";

Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        // component: () =>
        //     import ( /* webpackChunkName: "about" */ "../views/About.vue")
        component: About
    },
    {
        path: "/soft1",
        name: "Soft1",
        component: Soft1,
    }
];

const router = new VueRouter({
    routes
});

export default router;