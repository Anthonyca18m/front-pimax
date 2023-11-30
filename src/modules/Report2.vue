<template>
    <div class="row">
        <div class="col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <label>Busca y selecciona el área</label>
                        <select v-model="fedit.area_id" :class="(errors.area_id) ? 'form-control is-invalid' : 'form-control'">
                            <option value="" disabled>Seleccionar</option>
                            <option v-for="(d,i) in select1" :key="i" :value="d.id">{{ d.name }}</option>
                        </select>
                        <span v-if="errors.area_id" class="text-danger">{{ errors.area_id[0] }}</span>
                    </div>

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
        </div>
        <div class="col-lg-9">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="table" class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>TRABAJADOR</th>
                                    <th>AREA</th>
                                    <th>FECHA</th>
                                    <th>DÍA</th>
                                    <th>ENTRADA</th>
                                    <th>SALIDA</th>
                                    <th>TARDANZA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(d, i) in list" :key="i">
                                    <td>{{ d.EMPLOYER }}</td>
                                    <td>{{ d.AREA }}</td>
                                    <td>{{ d.FECHA }}</td>
                                    <td>{{ (d.DIA != null) ? $filters.date(d.FECHA, 'dddd') : '' }}</td>
                                    <td>{{ (d.ENTRADA != null) ? $filters.date(d.ENTRADA, 'HH:mm:ss a') : '' }}</td>
                                    <td>{{ (d.SALIDA != null) ? $filters.date(d.SALIDA, 'HH:mm:ss a') : '' }}</td>
                                    <td>{{ d.TARDANZA }}</td>
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

    let fedit = ref({
        area_id: '',
        dateInit: '',
        dateEnd: '',
    })
    let select1 = ref([])
    let errors = ref([])
    let list = ref([])

    const getSelect1 = () => {
        ac.get('/api/v1/select/areas')
            .then(({data}) => {
                select1.value = data
            })
            .catch((err) => {
                select1.value = []
            })
    }

    const getData = () => {
        Util.load(true)
        ac2.get('api/v1/reports/area/asistencia', { params: fedit.value })
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

    const initDataTable = () => {
        Util.resetDataTable('#table', { orderable: false, order: [], searching: false, pageLength: 10, dom:"Bfrtip",
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'REPORTE DE ASISTENCIA POR AREA' }]  })
    }

    onMounted(() => {
        getSelect1()
    })


</script>
<style scoped>
    
</style>