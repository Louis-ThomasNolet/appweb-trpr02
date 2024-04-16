import type { RouteRecordRaw } from 'vue-router'
import ScoreBoard from '../views/ScoreBoard.vue'

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
        component: ScoreBoard,
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