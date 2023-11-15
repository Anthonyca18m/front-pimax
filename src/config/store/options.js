import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const storeOption = createStore ({
    plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
    state: {
        menu: [        
            {id: 1, type: 1, name : 'Lista de Usuarios',     slug : 'lista-de-usuarios',     component: 'Module1' },
            {id: 2, type: 1, name : 'Lista de Trabajadores', slug : 'lista-de-trabajadores', component: 'Module2' },
            {id: 9, type: 1, name : 'Lista de Horarios',     slug : 'lista-de-horarios',     component: 'Module9' },
            {id: 9, type: 1, name : 'Lista de Áreas',        slug : 'lista-de-areas',        component: 'Module10' },
            {id: 9, type: 1, name : 'Tipos de Contrato',     slug : 'tipos-de-contrato',     component: 'Module11' },
            {id: 3, type: 1, name : 'Registros de Entrada/Salida',  slug : 'registros-de-entrada',  component: 'Module3' },
            {id: 5, type: 1, name : 'Log Logins',            slug : 'log-logins',            component: 'Module5' },
            {id: 6, type: 1, name : 'Log Movimientos',       slug : 'log-movimientos',       component: 'Module6' },
            {id: 7, type: 1, name : 'Acerca de',             slug : 'acerca-de',             component: 'Module7' },

            {id: 101, type: 2, name : 'Reporte 1',           slug : 'reportes-1',            component: 'Report1' },
            {id: 102, type: 2, name : 'Reporte 2',           slug : 'reportes-2',            component: 'Report2' },
            {id: 103, type: 2, name : 'Reporte 3',           slug : 'reportes-3',            component: 'Report3' },
            {id: 104, type: 2, name : 'Reporte 4',           slug : 'reportes-4',            component: 'Report4' },
        ],
        menu_active: {},
    },
    getters: {
        getMenu(state) { return state.menu.filter(e => e.type == 1) },
        getReports(state) { return state.menu.filter(e => e.type == 2) },
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