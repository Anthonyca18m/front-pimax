<template>
    <div class="collapse show position-fixed sidebar-nav bg-white border-0 shadow-sm" tabindex="-1" id="sidebardesktop">
        <div class="offcanvas-body pt-4">
            <nav class="navbar-light">
                <ul class="navbar-nav">
                    <li>
                        <div class="my-2">
                            <hr class="dropdown-divider bg-light" />
                        </div>
                        <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                            MENU
                        </div>                        
                        <div>
                            <div v-for="m,i in storeOption.getters.getMenu" :key="i">
                                <router-link :to="{ name: 'AppMenu', params: { name: m.slug } }"
                                    :class="(m.slug == route.params.name) ? 'nav-link px-3 active': 'nav-link px-3'">
                                        <span class="me-2"><i class=""></i></span>
                                        <span class="m-name">{{ m.name }}</span>
                                </router-link>                              
                            </div>
                        </div>
                        <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                            REPORTES
                        </div> 
                        <div>
                            <div v-for="m,i in storeOption.getters.getReports" :key="i">
                                <router-link :to="{ name: 'AppMenu', params: { name: m.slug } }"
                                    :class="(m.slug == route.params.name) ? 'nav-link px-3 active': 'nav-link px-3'">
                                        <span class="me-2"><i class=""></i></span>
                                        <span class="m-name">{{ m.name }}</span>
                                </router-link>                              
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="offcanvas offcanvas-start sidebar-nav bg-white border-0 shadow-sm" tabindex="-1" id="sidebar" style="visibility: visible;">
        <div class="offcanvas-body pt-4">
            <nav class="navbar-light">
                <ul class="navbar-nav">
                    <li>
                        <div class="my-2">
                            <hr class="dropdown-divider bg-light" />
                        </div>
                        <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                            MENU
                        </div>                        
                        <div>
                            <div v-for="m,i in storeOption.getters.getMenu" :key="i">
                                <router-link :to="{ name: 'AppMenu', params: { name: m.slug } }"
                                    :class="(m.slug == route.params.name) ? 'nav-link px-3 active': 'nav-link px-3'">
                                        <span class="me-2"><i class=""></i></span>
                                        <span class="m-name">{{ m.name }}</span>
                                </router-link>                              
                            </div>
                        </div>
                        <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                            REPORTES
                        </div> 
                        <div>
                            <div v-for="m,i in storeOption.getters.getReports" :key="i">
                                <router-link :to="{ name: 'AppMenu', params: { name: m.slug } }"
                                    :class="(m.slug == route.params.name) ? 'nav-link px-3 active': 'nav-link px-3'">
                                        <span class="me-2"><i class=""></i></span>
                                        <span class="m-name">{{ m.name }}</span>
                                </router-link>                              
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
    import storeOption from '@/config/store/options'
    import { useRoute } from 'vue-router'

    const route = useRoute()

</script>

<style scoped>
.offcanvas-body .navbar-nav .nav-link .sm-name {
    font-size: 13.5px;
}
.offcanvas-body .navbar-nav .m-name {
    font-size: 14.5px;
}
</style>