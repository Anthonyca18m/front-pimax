<template>
    <navegation-layout>
        <template #navleft>
            <div class="nav-left collapse navbar-collapse">
                <div class="mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Mostrar/Ocultar Menu">
                    <button @click="toggle" id="btnsbdesktop" class="btn border" data-bs-toggle="collapse" data-bs-target="#sidebardesktop">
                        <i class="far fa-bars-sort"></i>
                    </button>
                </div>
            </div>
        </template>
    </navegation-layout>

    <menu-layout></menu-layout>

    <main id="page-module" class="my-5 pt-4">
        <div class="container-fluid px-3">
            <div class="container-dashboard">
                <component v-if="component != ''" :is="component"></component>
            </div>
        </div>
    </main>

    <FooterComponent :menu="true"/>
    
</template>

<script setup>
    
    import MenuLayout from '@/components/MenuLayout.vue'
    import NavegationLayout from '@/components/NavegationLayout.vue'    
    import ErrorModule from '@/modules/ErrorModule.vue'
    import FooterComponent from '@/components/FooterComponent.vue'

    import { useRoute } from 'vue-router'
    import { ref, watch, defineAsyncComponent, shallowRef } from 'vue'
    import storeOption from '@/config/store/options'    

    const route = useRoute()
    
    let component = shallowRef('')
    let appName = ref('')

    watch(() => route.params, (n) => {        
        Util.load(true)
        
        storeOption.dispatch('findModule', route.params.name)
            .then(() => {
                appName.value = storeOption.getters.getModule.name
                component.value = defineAsyncComponent({
                    loader: () => import(`@/modules/${storeOption.getters.getModule.component}.vue`),
                    errorComponent: ErrorModule
                })
                Util.load(false)
            }).catch((err) => {
                component.value = ErrorModule
                Util.load(false)
            })
        
    }, { immediate: true })

    const toggle = () => {
        $('#page-module').toggleClass('m-0')
    }

</script>
<style scoped>

</style>