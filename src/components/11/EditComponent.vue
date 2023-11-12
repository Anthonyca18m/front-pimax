<template>
    <div class="modal fade" id="modal-edit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Editar</h5>
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
    import { ref, watch } from 'vue'

    let fedit = ref({
        id: '',
        name: '',
    })
    
    let errors = ref([])

    const getEdit = (id) => {
        Util.load(true)
        $('#modal-edit').modal('show')
        ac.get(`api/v1/typecontratos/${id}`)
            .then(({data}) => {
                fedit.value.id = data.body.id
                fedit.value.name = data.body.name
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
        ac.post(`api/v1/typecontratos/${fedit.value.id}`, fedit.value)
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