import { createRouter, createWebHistory } from "vue-router"
import store from '../store'
import '@/config/utils'

import DefaultLayout from '@/components/DefaultLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import moment from 'moment'

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'Index',
        meta: { isGuest: true },
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            { path: "/login", name: "Login", component: () => import('@/views/LoginView.vue'), },
        ]
    },
    {
        path: "/reset-password",
        name: 'ResetPassword',
        component: () => import('@/views/ResetPassword.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            let day = moment().format('YYYY-MM-DDThh:mm:ss')
            let expired_password = moment(store.getters.getUser.expired_password).format('YYYY-MM-DDThh:mm:ss')
            if (store.getters.getUser.status != 3 || expired_password <= day) next()
            next({ name: 'Dashboard' })
        }
    },
    {
        path: "/change-password",
        name: 'ChangePassword',
        component: () => import('@/views/ResetPassword.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: "/dashboard",
        redirect: "dashboard",
        component: DefaultLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            { path: "", name: "Dashboard", component: () => import('@/views/DashboardView.vue'), },
        ],
    },
    {
        path: "/module",
        redirect: "module",
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: ":name",
                name: 'AppMenu',
                component: () => import('@/views/DashboardView.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/errors/404View.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/errors/404View.vue')
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' })
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
    Util.startTooltip()
})

export default router