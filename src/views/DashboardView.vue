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
                <div class="row py-5">
                    <div v-for="w,i in widgets" :key="i" class="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                        <div class="card widget-report">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <i :class="`icon-widget ${w[1]}`"></i>
                                    </div>
                                    <div class="col-lg-8">
                                        <h6>{{ w[0] }}</h6>
                                        <p>{{ w[2] }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <div class="container-graphic">
                                        <canvas id="graphic-1"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <FooterComponent :menu="true"/>
    
</template>

<script setup>
    
    import MenuLayout from '@/components/MenuLayout.vue'
    import NavegationLayout from '@/components/NavegationLayout.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import Chart from 'chart.js/auto'
    import moment from 'moment'

    import { ref, onMounted } from 'vue'

    let widgets = ref([])
    let chart = ref({})
    let org = ref(false)

    const getWidges = () => {
        Util.load(true)
        ac2.get('api/v1/reports/widgets')
            .then(({data}) => {
                widgets.value = data
            })
            .catch((err) => {})
            .finally(() => {
                Util.load(false)
            })
    }

    const getData1 = () => {
        Util.load(true)
        ac2.get('api/v1/reports/gpc-tardanzas')
            .then(({data}) => {                
                graphic(data)
            })
            .catch((err) => {})
            .finally(() => {
                Util.load(false)
            })
    }

    const getData = () => {
        getData1()
    }


    const graphic = (data) => {
        if (org.value) chart.value.destroy()

        chart.value = new Chart(
            document.getElementById('graphic-1'),
            {
                type: 'bar',
                data: {
                        labels: data.map(row => row.MES),
                        datasets: [
                            {
                                label: "Asistencias",
                                fill: 'origin',
                                data: data.map(row => row.ASISTENCIA),
                                backgroundColor: 'blue',
                                borderRadius: 10,
                            },
                            {
                                label: 'Tardanzas',
                                fill: 'origin',
                                data: data.map(row => row.TARDANZA),
                                backgroundColor: 'red',
                                borderRadius: 10,
                            },
                        ]
                },
                options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'GRÁFICO DE CONTROL DE ASISTENCIAS POR MES'
                            },
                        },                        
                        responsive: true,
                        aspectRatio: 0,
                }
            })            
    }

    onMounted(() => {
        getData()
        getWidges()
    })

</script>
<style scoped>
.icon {
    font-size: 36px;
}
.container-graphic #graphic-1, .container-graphic #graphic-2 {
    height: 350px;
    width: 100%;
}
</style>