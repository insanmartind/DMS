import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DMSLocal from './components/DMSLocal.vue'
import DMSAnalista from './components/DMSAnalista.vue'
import DMSAprobacion from './components/DMSAprobacion.vue'
import DMSProveedor from './components/DMSProveedor.vue'
import GDURol from './components/GDURol.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/DMSLocal',
            name: 'DMSLocal',
            component: DMSLocal
        },
        {
            path: '/DMSAnalista',
            name: 'DMSAnalista',
            component: DMSAnalista
        },
        {
            path: '/DMSAprobacion',
            name: 'DMSAprobacion',
            component: DMSAprobacion
        },
        {
            path: '/DMSProveedor',
            name: 'DMSProveedor',
            component: DMSProveedor
        },
        {
            path: '/GDURol',
            name: 'GDURol',
            component: GDURol
        }
    ]
})