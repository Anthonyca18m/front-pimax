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
                            <label>Descripción</label>
                            <input v-model.trim="fedit.name" type="text" :class="(errors.name) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
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
    })

    let errors = ref([])

    const showModal = () => {
        cancel()
        $('#modal-register').modal('show')
    }
    
    const cancel = () => {
        fedit.value.name = ''
        
        errors.value = []
    }

    const save = () => {
        Util.load(true)
        ac.post('api/v1/areas', fedit.value)
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