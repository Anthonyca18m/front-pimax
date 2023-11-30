<template>
    <div class="row">
        <!-- <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <label>Fecha de Inicio:</label>
                        <input v-model.trim="fedit.dateInit" type="date" :class="(errors.dateInit) ? 'form-control is-invalid' : 'form-control'">
                        <span v-if="errors.dateInit" class="text-danger">{{ errors.dateInit[0] }}</span>
                    </div>
                    <div class="col">
                        <label>Fecha Fin:</label>
                        <input v-model.trim="fedit.dateEnd" type="date" :class="(errors.dateEnd) ? 'form-control is-invalid' : 'form-control'">
                        <span v-if="errors.dateEnd" class="text-danger">{{ errors.dateEnd[0] }}</span>
                    </div>

                    <div class="col py-3">
                        <button class="btn btn-primary w-100" @click="getData">Buscar</button>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="table" class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>TRABAJADOR</th>
                                    <th>AREA</th>
                                    <th>HORARIO</th>
                                    <th>TIPO DE CONTRATO</th>
                                    <th>SALARIO</th>
                                    <th>FECHA DE INICIO</th>
                                    <th>FECHA DE VENCIMIENTO</th>
                                    <th>TIEMPO RESTANTE</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(d, i) in list" :key="i">
                                    <td>{{ d.EMPLOYER }}</td>
                                    <td>{{ d.AREA }}</td>
                                    <td>{{ d.ENTRADA }}-{{ d.SALIDA }}</td>
                                    <td>{{ d.TIPO_CONTRATO }}</td>
                                    <td>{{ d.SALARIO }}</td>
                                    <td>{{ d.FECHA_INICIO }}</td>
                                    <td>{{ d.FECHA_FIN }}</td>
                                    <td>{{ getDayDiff(d.FECHA_FIN) }}</td>
                                    <td>{{ d.ESTADO }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

    import { ref, onMounted } from 'vue'

    let errors = ref([])
    let list = ref([])


    const getData = () => {
        Util.load(true)
        ac2.get('api/v1/reports/contratos')
            .then(({data}) => {
                list.value = data                
                initDataTable()                
            })
            .catch((err) => {
                errors.value = (err.response.status == 422) ? err.response.data.errors : []
            })
            .finally(() => {
                Util.load(false)
            })
    }

    const getDayDiff = (date_init) => {
        const date1 = new Date(date_init)
        const date2 = new Date()
        const diferenciaEnMilisegundos = date1 - date2
        const days = parseInt(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24))
        return days < 1 ? 0 : days
    } 

    const initDataTable = () => {
        Util.resetDataTable('#table', { orderable: false, order: [], searching: false, pageLength: 10, dom:"Bfrtip",
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'REPORTE DE ASISTENCIA POR AREA' }]  })
    }

    onMounted(() => {
        getData()
    })


</script>
<style scoped>
    
</style>