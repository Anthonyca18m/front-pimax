<template>
    <div class="container">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <div class="card">
                    <div class="card-body">
                        <div class="app-brand justify-content-center">
                            <a class="app-brand-link gap-2">
                                <span class="app-brand-logo demo">
                                    <img :src="$getSrc('/images/vite.svg')" alt="Sodimac" width="100">
                                </span>
                            </a>
                        </div>

                        <form class="mb-3" @submit="login">
                            <div class="mb-3">
                                <label class="form-label">Usuario</label>
                                <input v-model.trim="user.username" type="text" :class="(errors.username || errors.message) ? 'form-control is-invalid': 'form-control'" 
                                placeholder="Ingrese su nombre de usuario" autofocus />
                                <small v-if="errors.username" class="text-danger">{{ errors.username[0] }}</small>
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <!-- <div class="d-flex justify-content-between">
                                    <label class="form-label">Contraseña</label>
                                    <a href="">
                                        <small>¿Has olvidado tu contraseña?</small>
                                    </a>
                                </div> -->
                                <div class="input-group input-group-merge">
                                    <input v-model.trim="user.password" type="password" :class="(errors.password || errors.message) ? 'form-control is-invalid': 'form-control'" 
                                    placeholder="*************" aria-describedby="password" />                                    
                                </div>
                                <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
                                <small v-if="errors.message" class="text-danger">{{ errors.message[0] }}</small>
                            </div>
                            
                            <div class="mb-3">
                                <div class="form-check">
                                    <input v-model="user.remember" class="form-check-input" type="checkbox" id="remember-me" />
                                    <label class="form-check-label" for="remember-me"> Recuérdame </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button :disabled="load" class="btn btn-danger d-grid w-100" type="submit">
                                    {{ (load) ? 'Validando credenciales...' : 'Iniciar sesión' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/config/store'

const router = useRouter()

const user = ref({ username: '', password: '', remember: false })
let load = ref(false)
let errors = ref([])

const login = (e) => {  
    e.preventDefault()
    load.value = !load.value
    store.dispatch('login', user.value)
        .then((data) => {
            if(data.redirect) return router.push({ name: 'ResetPassword' }) 
            load.value = !load.value
            router.push({ name: 'Dashboard' })
        }).catch((err) => {  
            load.value = !load.value
            errors.value = (err.status == 422) ? err.data.errors : []
        })
}
</script>

<style>


</style>
