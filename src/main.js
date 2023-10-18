import './assets/css/bootstrap.min.css'
import './assets/css/all.css'
import './assets/css/dataTables.bootstrap5.min.css'
import './assets/css/buttons.dataTables.min.css'
import './assets/css/style.css'

import './config/axios'
import './config/alerts'
import './config/utils'

import $ from 'jquery'
window.$ = $
window.jQuery = $

import filters from './config/filters'
import { createApp } from 'vue'

import store from './config/store'
import router from './config/router'

import App from './App.vue'

const app = createApp(App).use(store).use(router)

app.config.globalProperties.$filters = filters
app.config.globalProperties.$Util = Util
app.config.globalProperties.$getSrc = (src) => `${import.meta.env.VITE_SRC_URL}${src}`

app.mount('#app')
