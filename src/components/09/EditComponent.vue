<template>
    <div class="modal fade" id="modal-edit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Editar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">                        
                        <div class="col-md-4">
                            <label>Fecha inicio</label>
                            <input v-model.trim="fedit.init" type="time" :class="(errors.init) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.init" class="text-danger">{{ errors.init[0] }}</span>
                        </div>
                        <div class="col-md-4">
                            <label>Fecha Fin</label>
                            <input v-model.trim="fedit.end" type="time" :class="(errors.end) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.end" class="text-danger">{{ errors.end[0] }}</span>
                        </div>
                        <div class="col-md-4">
                            <label>Tolerancia <small class="text-muted">(En minutos)</small></label>
                            <input v-model.trim="fedit.tolerancia" type="number" :class="(errors.tolerancia) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.tolerancia" class="text-danger">{{ errors.tolerancia[0] }}</span>
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
    import { ref, watch } from 'vue'

    let fedit = ref({
        id: '',
        init: '',
        end: '',
        tolerancia: '',
    })
    
    let errors = ref([])

    const getEdit = (id) => {
        Util.load(true)
        $('#modal-edit').modal('show')
        ac.get(`api/v1/horarios/${id}`)
            .then(({data}) => {
                fedit.value.id = data.body.id
                fedit.value.init = data.body.hour_in
                fedit.value.end = data.body.hour_out
                fedit.value.tolerancia = data.body.tolerancia
                errors.value = []

                Util.load(false)
                $('#modal-edit').show('hide')
            }).catch((err) => {                
                Util.load(false)
                $('#modal-edit').show('hide')
            })
    }

    const save = () => {
        Util.load(true)        
        ac.post(`api/v1/horarios/${fedit.value.id}`, fedit.value)
            .then(({data}) => {                
                Util.load(false)
                errors.value = []
                $('#modal-edit').modal('hide')
                Toast.fire({ icon: "success", title: "Se ha modificado con éxito!.", })
                emit('saveOn')
            }).catch((err) => {                
                Util.load(false)
                errors.value = (err.response.status == 422) ? err.response.data.errors : []
            })
    }


    const emit = defineEmits(['saveOn'])
    defineExpose({ getEdit })

</script>

<style scoped>

</style>