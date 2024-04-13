import type { RouteRecordRaw } from 'vue-router'
import ScoreBoard from '../views/ScoreBoard.vue'
import Bataille from '../components/Bataille.vue' 
import Accueil from '../views/Accueil.vue'


const routes: Array<RouteRecordRaw> = [

    {
        path: '/bataille',
        name: 'Bataille',
        component: Bataille,
        props: true
    },
    {
        path: '/score',
        name: 'Score',
        component: ScoreBoard,
        props: true
    },
    {
        path: '/accueil',
        name: 'Accueil',
        component: Accueil,
        props: true
    }
    ]
    export default routes