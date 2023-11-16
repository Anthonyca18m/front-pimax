<template>
    <div class="modal fade" id="modal-register" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Usuario</label>
                            <select v-model="fedit.userId" :class="(errors.userId) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option v-for="(d,i) in select1" :key="i" :value="d.id">{{ d.name }}</option>
                            </select>
                            <span v-if="errors.userId" class="text-danger">{{ errors.userId[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>Tipo de Registro</label>
                            <select v-model="fedit.typeR" :class="(errors.typeR) ? 'form-control is-invalid' : 'form-control'">
                                <option value="" disabled>Seleccionar</option>
                                <option value="E">Entrada</option>
                                <option value="S">Salida</option>
                            </select>
                            <span v-if="errors.typeR" class="text-danger">{{ errors.typeR[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>Fecha</label>
                            <input v-model.trim="fedit.date" type="datetime-local" :class="(errors.date) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.date" class="text-danger">{{ errors.date[0] }}</span>
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
        userId: '',
        typeR: '',
        date: '',
    })
    let select1 = ref([])
    let errors = ref([])

    const showModal = () => {
        if(!select1.value.length){ getSelect1() }
        cancel()
        $('#modal-register').modal('show')
    }
    
    const cancel = () => {
        fedit.value.userId = ''
        fedit.value.typeR = ''
        fedit.value.date = ''
        
        errors.value = []
    }

    const save = () => {
        Util.load(true)
        ac.post('api/v1/asistencia/module', fedit.value)
            .then(({data}) => {
                Util.load(false)                
                $('#modal-register').modal('hide')
                cancel()
                Toast.fire({ icon: "success", title: "Se ha registrado con éxito!.", })
                emit('saveOn')
            }).catch((err) => {
                Util.load(false)
                errors.value = (err.response.status == 422) ? err.response.data.errors : []
            })
    }

    const getSelect1 = () => {
        ac.get('/api/v1/select/employes')
            .then(({data}) => {
                select1.value = data
            })
            .catch((err) => {
                select1.value = []
            })
    }

    const emit = defineEmits(['saveOn'])
    defineExpose({ showModal })

</script>

<style scoped>

</style>