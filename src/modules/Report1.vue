<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-3">
                    <div class="row">
                        <div class="col-lg-12">
                            <label>Busca y selecciona al trabajador</label>
                            <select v-model="fedit.userId" :class="(errors.userId) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option v-for="(d,i) in select1" :key="i" :value="d.id">{{ d.name }}</option>
                            </select>
                            <span v-if="errors.userId" class="text-danger">{{ errors.userId[0] }}</span>
                        </div>
                        <div class="col-lg-6">
                            <label>Fecha de Inicio:</label>
                            <input v-model.trim="fedit.dateInit" type="date" :class="(errors.dateInit) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.dateInit" class="text-danger">{{ errors.dateInit[0] }}</span>
                        </div>
                        <div class="col-lg-6">
                            <label>Fecha Fin:</label>
                            <input v-model.trim="fedit.dateEnd" type="date" :class="(errors.dateEnd) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.dateEnd" class="text-danger">{{ errors.dateEnd[0] }}</span>
                        </div>
                        <div class="col-lg-6">
                            <button @click="view = 1" class="btn border w-100" :class="(view == 1) ? 'btn-primary':'btn-light'">Vista Calendario</button>
                        </div>
                        <div class="col-lg-6">
                            <button @click="view = 2" class="btn border w-100" :class="(view == 2) ? 'btn-primary':'btn-light'">Vista Tabla</button>
                        </div>
                        <div class="col-lg-12 mt-4">
                            <button class="btn btn-primary w-100" @click="getData">Buscar</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9" v-show="view == 1">
                    <div id='calendar'></div>
                </div>
                <div class="col-lg-9" v-show="view == 2">
                    <div class="table-responsive">                    
                        <table id="table-calendar" class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Trabajador</th>
                                    <th>Fecha</th>
                                    <th>Día</th>
                                    <th>Entrada</th>
                                    <th>Salida</th>
                                    <th>Tardanza (minutos)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(d, i) in assitence" :key="i">
                                    <td>{{ d.USERNAME }}</td>
                                    <td>{{ d.DAY }}</td>
                                    <td>{{ (d.DAY != null) ? $filters.date(d.DAY, 'dddd') : '' }}</td>
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
    import { Calendar } from '@fullcalendar/core'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import { ref, onMounted } from 'vue'

    let fedit = ref({
        userId: '',
        dateInit: '',
        dateEnd: '',
    })
    let view = ref('')
    let select1 = ref([])
    let assitence = ref([])
    let errors = ref([])


    const getSelect1 = () => {
        ac.get('/api/v1/select/employes')
            .then(({data}) => {
                select1.value = data
            })
            .catch((err) => {
                select1.value = []
            })
    }

    const getData = () => {
        Util.load(true)
        ac2.get('api/v1/reports/employer/asistencia', { params: fedit.value })
            .then(({data}) => {
                assitence.value = data
                if (view.value == 1) {
                    setCalendar()    
                } else {
                    initDataTable()
                }                
            })
            .catch((err) => {})
            .finally(() => {
                Util.load(false)
            })
    }

    const setCalendar = () => {

        let eventosFullCalendar = assitence.value.flatMap(dia => {
            let events = []
            if (dia.ENTRADA) {
                events.push({ title: 'ENTRADA', start: dia.ENTRADA, allDay: false, backgroundColor: (dia.TARDANZA > 0) ? 'red':'' })
            }
            if (dia.SALIDA) {
                events.push({ title: 'SALIDA', start: dia.SALIDA, allDay: false })
            }
            return events
        })

        const calendar = new Calendar(document.getElementById('calendar'), {
            plugins: [dayGridPlugin],
            headerToolbar: {
                left: null,
                center: 'title',
                // right: null,
            },
            locale: 'es',
            events: eventosFullCalendar,
        })
        calendar.render()
    }

    const initDataTable = () => {
        Util.resetDataTable('#table-calendar', { orderable: false, order: [], searching: false, pageLength: 10, dom:"Bfrtip",
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'LISTA DE EMPLEADOS' }]  })
    }

    onMounted(() => {
      getSelect1() 
    })


</script>
<style scoped>

</style>