import axios from 'axios'
import store from '@/config/store'

const baseURL = (import.meta.env.PRODUCTION) ? `${import.meta.env.VITE_API_URL}`: `${import.meta.env.VITE_API_URL}/`

const ac = axios.create({
    baseURL: baseURL,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest',
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
});

const ac2 = axios.create({
    baseURL: baseURL,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest',
    },
    withCredentials: false,
    xsrfCookieName: 'XSRF-TOKEN',
});

ac.interceptors.request.use(config => {
    if (store.state.user.token != null && store.state.user.token != 'null') {
        config.headers.Authorization = `Bearer ${store.state.user.token}`   
    }
    return config
})

ac.interceptors.response.use(response => {
    return response
    }, error => {
        if (error.response.data.message.includes('JWT')) return Util.logoutExpired()
        // if (error.response.status === 500) return Util.againBlock()
        return Promise.reject(error)
})


window.ac = ac
window.ac2 = ac2

