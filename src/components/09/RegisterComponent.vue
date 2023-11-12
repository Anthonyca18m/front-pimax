<template>
    <div class="modal fade" id="modal-register" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Registro</h5>
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
    import { ref, computed } from 'vue'

    let fedit = ref({
        init: '',
        end: '',
        tolerancia: '',
    })

    let errors = ref([])

    const showModal = () => {
        cancel()
        $('#modal-register').modal('show')
    }
    
    const cancel = () => {
        fedit.value.init = ''
        fedit.value.end = ''
        fedit.value.tolerancia = ''
        
        errors.value = []
    }

    const save = () => {
        Util.load(true)
        ac.post('api/v1/horarios', fedit.value)
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

    const emit = defineEmits(['saveOn'])
    defineExpose({ showModal })

</script>

<style scoped>

</style>