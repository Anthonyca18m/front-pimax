<template>
    <div class="modal fade" id="modal-register-user" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">                        
                        <div class="col-md-6">
                            <label>Nombre Completo</label>
                            <input v-model.trim="fedit.name" type="text" :class="(errors.name) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                        </div>
                        <div class="col-md-3">
                            <label>DNI/PASAPORTE</label>
                            <input v-model.trim="fedit.document" type="text" :class="(errors.document) ? 'form-control is-invalid' : 'form-control'"
                            maxlength="8">
                            <span v-if="errors.document" class="text-danger">{{ errors.document[0] }}</span>
                        </div>
                        <div class="col-md-3">
                            <label>Area</label>
                            <select v-model="fedit.area_id" :class="(errors.area_id) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option v-for="(d,i) in select1" :key="i" :value="d.id">{{ d.name }}</option>
                            </select>
                            <span v-if="errors.area_id" class="text-danger">{{ errors.area_id[0] }}</span>
                        </div>
                        <div class="col-md-6">
                            <label>Tipo de Jornada</label>
                            <select v-model="fedit.jornada_id" :class="(errors.jornada_id) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option v-for="(d,i) in select2" :key="i" :value="d.id">{{ d.name }}</option>
                            </select>
                            <span v-if="errors.jornada_id" class="text-danger">{{ errors.jornada_id[0] }}</span>
                        </div>
                        <div class="col-md-6">
                            <label>Horario</label>
                            <select v-model="fedit.horario_id" :class="(errors.horario_id) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option v-for="(d,i) in select3" :key="i" :value="d.id">{{ d.name }}</option>
                            </select>
                            <span v-if="errors.horario_id" class="text-danger">{{ errors.horario_id[0] }}</span>
                        </div>
                        <div class="col-md-6">
                            <label>Fecha inicio</label>
                            <input v-model.trim="fedit.dateInit" type="date" :class="(errors.dateInit) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.dateInit" class="text-danger">{{ errors.dateInit[0] }}</span>
                        </div>
                        <div class="col-md-6">
                            <label>Fecha Fin</label>
                            <input v-model.trim="fedit.dateEnd" type="date" :class="(errors.dateEnd) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.dateEnd" class="text-danger">{{ errors.dateEnd[0] }}</span>
                        </div>
                        <div class="col-md-6">
                            <label>Salario <small class="text-muted">(En soles)</small></label>
                            <input v-model.trim="fedit.c_salary" type="number" :class="(errors.c_salary) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.c_salary" class="text-danger">{{ errors.c_salary[0] }}</span>
                        </div>

                        <div class="col-md-12 pt-3" align="center">
                            <button @click="save" class="btn btn-light border">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'

    let fedit = ref({
        name: '',
        document: '',
        area_id: '',
        jornada_id: '',
        horario_id: '',
        dateInit: '',
        dateEnd: '',
        c_salary: '',
        role: 'USR',
    })

    let select1 = ref([])
    let select2 = ref([])
    let select3 = ref([])
    let errors = ref([])

    const showModal = () => {
        if(!select1.value.length){ getSelect1() }
        if(!select2.value.length){ getSelect2() }
        if(!select3.value.length){ getSelect3() }
        cancel()
        $('#modal-register-user').modal('show')
    }

    const getSelect1 = () => {
        ac.get('/api/v1/select/areas')
            .then(({data}) => {
                select1.value = data
            })
            .catch((err) => {
                select1.value = []
            })
    }

    const getSelect2 = () => {
        ac.get('/api/v1/select/jornadas')
            .then(({data}) => {
                select2.value = data
            })
            .catch((err) => {
                select2.value = []
            })
    }

    const getSelect3 = () => {
        ac.get('/api/v1/select/horarios')
            .then(({data}) => {
                select3.value = data
            })
            .catch((err) => {
                select3.value = []
            })
    }
    
    const cancel = () => {
        fedit.value.name = ''
        fedit.value.document = ''
        fedit.value.area_id = ''
        fedit.value.jornada_id = ''
        fedit.value.horario_id = ''
        fedit.value.dateInit = ''
        fedit.value.dateEnd = ''        
        fedit.value.c_salary = ''
        
        errors.value = []
    }

    const save = () => {
        if (!validDateToDate()) return errors.value = { dateInit : ['El campo debe ser menor a la fecha final']}
        Util.load(true)
        ac.post('api/v1/employes', fedit.value)
            .then(({data}) => {
                Util.load(false)                
                $('#modal-register-user').modal('hide')
                cancel()
                Toast.fire({ icon: "success", title: "Se ha registrado con éxito!.", })
                emit('saveOn')
            }).catch((err) => {
                Util.load(false)
                errors.value = (err.response.status == 422) ? err.response.data.errors : []
            })
    }

    const validDateToDate = () => {
        const start = new Date(fedit.value.dateInit)
        const end = new Date(fedit.value.dateEnd)
        if (!(start instanceof Date && !isNaN(start)) || !(end instanceof Date && !isNaN(end))) {
            throw new Error('Ambas fechas deben ser válidas.')
        }
        return start < end
    }


    const emit = defineEmits(['saveOn'])
    defineExpose({ showModal })

</script>

<style scoped>

</style>