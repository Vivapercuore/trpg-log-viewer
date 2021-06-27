import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import home from './pages/home/home.vue'
import editor from './pages/editor/editor.vue'

const routes = [
    {
        path: '/home',
        component: home,
    },
    {
        path: '/editor',
        component: editor,
    },
    {
        // 路由重定向
        path: '/',
        component: home,
    },
    {
        // 路由重定向 404
        path: '/:w+',
        name: '*',
        redirect: '/404'
    },
]

let router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
