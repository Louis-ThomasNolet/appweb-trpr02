import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [

    {
        path: '/bataille',
        name: 'Bataille',
        component: () => import('../views/BatailleViews.vue'),
        props: true
    },
    {
        path: '/score',
        name: 'Score',
        component: () => import('../views/ScoreBoard.vue'),
        props: true
    },
    {
        path: '/',
        name: 'Accueil',
        component: () => import('../views/Accueil.vue'),
        props: true
    }
    ]
    export default routes