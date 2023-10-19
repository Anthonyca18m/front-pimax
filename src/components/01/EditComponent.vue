<template>
    <div class="modal fade" id="modal-edit-user" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Editar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Nombre</label>
                            <input v-model.trim="fedit.name" type="text" :class="(errors.name) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>DNI/PASAPORTE</label>
                            <input v-model.trim="fedit.document" type="text" :class="(errors.document) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.document" class="text-danger">{{ errors.document[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>usuario</label>
                            <input v-model.trim="fedit.username" type="text" :class="(errors.username) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.username" class="text-danger">{{ errors.username[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>Contraseña</label>
                            <input v-model.trim="fedit.password" type="password" :class="(errors.password) ? 'form-control is-invalid' : 'form-control'">
                            <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
                        </div>
                        <div class="col-md-12">
                            <label>Estado</label>
                            <select v-model.trim="fedit.status" :class="(errors.status) ? 'form-control is-invalid' : 'form-control'">
                                <option value="1">ACTIVO</option>
                                <option value="0">INACTIVO</option>
                            </select>
                            <span v-if="errors.status" class="text-danger">{{ errors.status[0] }}</span>
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
        document: '',
        username: '',
        password: '',
        status: '',
    })
    let errors = ref([])

    const getEdit = (id) => {
        Util.load(true)
        $('#modal-edit-user').modal('show')
        ac.get(`api/v1/users/${id}`)
            .then(({data}) => {
                fedit.value.id = data.id
                fedit.value.name = data.name
                fedit.value.document = data.document
                fedit.value.username = data.username                                
                fedit.value.status = data.status
                errors.value = []

                Util.load(false)
                $('#modal-edit-user').show('hide')
            }).catch((err) => {                
                Util.load(false)
                $('#modal-edit-user').show('hide')
            })
    }

    const save = () => {
        Util.load(true)        
        ac.post(`api/v1/users/${fedit.value.id}`, fedit.value)
            .then(({data}) => {                
                Util.load(false)
                errors.value = []
                $('#modal-edit-user').modal('hide')
                Toast.fire({ icon: "success", title: "Se ha modificado con éxito!.", })
                emit('saveOn')
            }).catch((err) => {                
                Util.load(false)
                errors.value = (err.response.status == 422) ? err.response.data.errors : []
            })
    }

    watch(() => fedit.value.document , (n) => {
        fedit.value.document = Format('digits', n)
    })
    watch(() => fedit.value.name , (n) => {
        fedit.value.name = Format('letters', n)
    })


    const emit = defineEmits(['saveOn'])
    defineExpose({ getEdit })

</script>

<style scoped>

</style>