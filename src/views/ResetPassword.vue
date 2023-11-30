<template>
    <div class="container">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <div class="card">
                    <div class="card-body">
                        <div class="app-brand justify-content-center">
                            <a class="app-brand-link gap-2">
                                <span class="app-brand-logo demo">
                                    <!-- <img :src="$getSrc('/images/logo.png')" width="250"> -->
                                </span>
                            </a>
                        </div>

                        <form class="mb-3" @submit="resetPassword">
                            <div class="mb-3 form-password-toggle">
                                <label>Nueva Contraseña</label>
                                <div class="input-group input-group-merge">
                                    <input v-model.trim="user.password" type="password" :class="(errors.password) ? 'form-control is-invalid': 'form-control'" 
                                    placeholder="*************" aria-describedby="password" />
                                </div>
                                <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <label>Confirmar Nueva Contraseña</label>
                                <div class="input-group input-group-merge">
                                    <input v-model.trim="user.repassword" type="password" :class="(errors.repassword) ? 'form-control is-invalid': 'form-control'" 
                                    placeholder="*************" aria-describedby="password" />
                                </div>
                                <small v-if="errors.repassword" class="text-danger">{{ errors.repassword[0] }}</small>
                            </div>
                            <div>
                                <b>Nota:</b> <br>
                                <p>* Debe tener como mínimo 8 caracteres.</p>
                                <p>* Debe tener como máximo 16 caracteres.</p>
                            </div>
                            <div class="mt-3">
                                <button :disabled="load" class="btn btn-primary d-grid w-100" type="submit">
                                    {{ (load) ? 'Procesando...' : 'Actualizar Contraseña' }}
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

const user = ref({ user_id: store.getters.getUser.id, password: '', repassword: '' })
let load = ref(false)
let errors = ref([])

const resetPassword = (e) => {  
    e.preventDefault()
    Util.load(true)
    ac.post('auth/reset-password', user.value)
        .then(({data}) => {
            Util.load(false)
            router.push({ name: 'Dashboard' })
        }).catch((err) => {  
            Util.load(false)
            errors.value = (err.response.status == 422) ? err.response.data.errors : []
        })
}
</script>

<style>


</style>
