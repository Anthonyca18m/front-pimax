import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const storeOption = createStore ({
    plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
    state: {
        menu: [        
            {id: 1, name : 'Lista de Usuarios', slug : 'menu-1', component: 'Module1' },
            {id: 2, name : 'Lista de Trabajadores', slug : 'menu-2', component: 'Module2' },
            {id: 3, name : 'Registros de Entrada', slug : 'menu-3', component: 'Module3' },
            {id: 4, name : 'Registros de Salida', slug : 'menu-4', component: 'Module4' },
            {id: 5, name : 'Log Logins', slug : 'menu-5', component: 'Module5' },
            {id: 6, name : 'Log Movimientos', slug : 'menu-6', component: 'Module6' },
            {id: 8, name : 'Reportes', slug : 'menu-8', component: 'Module8' },
            {id: 7, name : 'Acerca de', slug : 'menu-7', component: 'Module7' },
        ],
        menu_active: {},
    },
    getters: {
        getMenu(state) { return state.menu },
        getFilterLimit() {
            return [
                { label: '100', value: 100 }, 
                { label: '300', value: 300 }, 
                { label: '500', value: 500 }, 
                { label: '1000', value: 1000 }, 
                { label: '2500', value: 2500 }, 
                { label: '5000', value: 5000 }, 
                { label: '10000', value: 10000 },
                { label: '25000', value: 25000 },
                { label: '50000', value: 50000 }, 
                { label: 'Sin límite', value: 1000000 }
            ]
        },
        getModule(state) { return state.menu_active },
    },
    actions: {
        findModule({ commit }, moduleName) {
            commit('SetMenu', moduleName)
        },
    },
    mutations: {
        SetMenu: (state, menu) => {
            state.menu_active = state.menu.find(e => e.slug == menu)            
        },
    },
    modules: {

    }
})

export default storeOption