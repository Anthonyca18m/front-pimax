import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore ({
    plugins: [ createPersistedState({}) ],
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },        
    },
    getters: {
        getToken(state) {
            return state.user.token
        },
        getUser(state) {
            return state.user.data
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                ac.post('/auth/login', user)
                    .then(({data}) => {
                        commit('setUser', data)
                        resolve(data)
                    }).catch((err) => {
                        reject(err.response)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                // ac.get('/api/v1/auth/logout')
                //     .then(() => {
                        commit('logout')
                        resolve()
                    // }).catch((err) => {
                    //     reject(err.response)
                    // })
            })
        },
    },
    mutations: {
        setUser: (state, user) => {
            if (user) {
                state.user.token = user.token
                state.user.data.id = user.id
                state.user.data.username = user.username
                state.user.data.role = user.role
                state.user.data.name = user.name
                
                sessionStorage.setItem('TOKEN', user.token)
            }
        },  
        logout: (state) => {
            state.user.data = {}
            state.user.token = null            
            sessionStorage.clear()
            window.localStorage.clear() 
            window.location.reload()                                
        },
    },
    modules: {

    }
})

export default store