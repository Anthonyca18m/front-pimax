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
                                        <i :class="`icon-widget ${w.widget_icon}`"></i>
                                    </div>
                                    <div class="col-lg-8">
                                        <h6>{{ w.widget_name }}</h6>
                                        <p>{{ w.widget_data }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
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
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <div class="container-graphic">
                                        <canvas id="graphic-2"></canvas>
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

    let widgets = ref([
        { widget_icon: 'far fa-user', widget_name: 'Usuarios', widget_data: 1 },
        { widget_icon: 'far fa-users', widget_name: 'Empleados', widget_data: 1 },
        { widget_icon: 'far fa-calendar', widget_name: 'Horarios', widget_data: 1 },
        { widget_icon: 'far fa-clipboard-list', widget_name: 'Contratos', widget_data: 1 },
        { widget_icon: 'far fa-user-lock', widget_name: 'Sesiones', widget_data: 1 },
        { widget_icon: 'far fa-cctv', widget_name: 'Movimientos', widget_data: 1 },
    ])
    let d1 = ref({})
    let d2 = ref({})
    let chart = ref({})
    let org = ref(false)

    const getData = () => {
        const data_g1 = [
            {
                "MES": "2023-01",
                "TARDANZA": "90",
                "ASISTENCIA": "0",                    
                "TOTAL": "90"
            },
            {
                "MES": "2023-02",
                "TARDANZA": "115",
                "ASISTENCIA": "50",                    
                "TOTAL": "165"
            },
            {
                "MES": "2023-03",
                "TARDANZA": "28",
                "ASISTENCIA": "2",
                "TOTAL": "30"
            },
            
        ]

        const data_g2 = [
            {
                "AREA": "area 1",                 
                "TOTAL": "90",
                "COLOR": "blue",
            },
            {
                "AREA": "area 2",                  
                "TOTAL": "30",
                "COLOR": "yellow",
            },
            {
                "AREA": "area 1",
                "TOTAL": "30",
                "COLOR": "red",
            },
            {
                "AREA": "area 3",
                "TOTAL": "30",
                "COLOR": "green",
            },
            
        ]

        graphic(data_g1)
        graphic2(data_g2)
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

    const graphic2 = (data) => {
        if (org.value) chart.value.destroy()

        chart.value = new Chart(
            document.getElementById('graphic-2'),
            {
                type: 'pie',
                data: {
                        labels: data.map(row => row.AREA),
                        datasets: [
                            {
                                label: "Registro de Asistencias",
                                fill: 'origin',
                                data: data.map(row => row.TOTAL),
                                backgroundColor: data.map(row => row.COLOR),                                
                            },
                        ]
                },
                options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'GRÁFICO DE CONTROL DE ASISTENCIAS POR AREA DE HOY'
                            },
                        },                        
                        responsive: true,
                        aspectRatio: 0,
                }
            })            
    }

    onMounted(() => {
        getData()
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