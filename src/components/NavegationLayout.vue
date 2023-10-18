<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">

        <div class="d-lg-block d-lg-flex container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasExample">
                <span class="navbar-toggler-icon" data-bs-target="#sidebar"></span>
            </button>
            <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
                <h5>CONTROL DE ASISTENCIA</h5>
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNavBarMobile"
                aria-controls="topNavBarMobile" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-user"><i class="fas fa-user"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="topNavBar">
                <slot name="navleft"></slot>
                <ul class="ms-auto navbar-nav">                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ms-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                            :title="store.getters.getUser.name">
                            <span class="icon-username">{{ store.getters.getUser.name[0] }}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-end">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'ChangePassword' }">Cambiar contraseña</router-link>
                            </li>
                            <li>
                                <a class="dropdown-item cursor-pointer" @click="logout">Cerrar Sesión</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <div class="d-md-none d-lg-none d-xl-none w-100 text-end">
                <div class="collapse navbar-collapse pt-3" id="topNavBarMobile">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <router-link class="text-decoration-none text-dark" :to="{ name: 'ChangePassword' }">Cambiar contraseña</router-link>
                        </li>
                        <li class="list-group-item">
                            <a class="text-decoration-none cursor-pointer text-dark" @click="logout">Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import store from '@/config/store'

    const router = useRouter()

    const logout = () => {
        store.dispatch('logout')
            .then(() => {
                router.push({ name: 'Login'})
            }).catch((err) => {
                
            })
    }

</script>

<style scoped>
    .icon-username {        
        width: 30px;
        height: 30px;
        background: rgb(74, 44, 117);
        border-radius: 50%;
        padding: 0.5rem .7rem;
        color: white;
        font-weight: 600;
    }
    #topNavBar .navbar-nav .nav-item {
        border-radius: 0.5rem;
        padding: 0.05rem;
        margin: 0 .1rem;
    }
    #topNavBar .navbar-nav .nav-item:hover {
        background: #e7e7e7;
        font-weight: 600;
    }
</style>