<template>
    <div class="modal fade" id="modal-register-user" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario de Registro</h5>
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
                            <input v-model.trim="fedit.document" type="text" :class="(errors.document) ? 'form-control is-invalid' : 'form-control'"
                            maxlength="8">
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
    import { ref } from 'vue'

    let fedit = ref({
        name: '',
        document: '',
        username: '',
        password: '',
        role: 'ADMIN',
    })
    let errors = ref([])

    const showModal = () => {
        cancel()
        $('#modal-register-user').modal('show')
    }

    const cancel = () => {
        fedit.value.name = ''
        fedit.value.document = ''
        fedit.value.username = ''
        fedit.value.password = ''
        fedit.value.role = 'ADMIN'
        errors.value = []
    }

    const save = () => {
        Util.load(true)        
        ac.post('api/v1/users', fedit.value)
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


    const emit = defineEmits(['saveOn'])
    defineExpose({ showModal })

</script>

<style scoped>

</style>