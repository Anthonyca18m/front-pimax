<template>
    <div class="container">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <div class="card">
                    <div class="card-body">
                        <div class="container-type">
                            <div :class="type == 'E' ? 'bg-primary text-white fw-bold': ''" @click="type = 'E'">Entrada</div>
                            <div :class="type == 'S' ? 'bg-primary text-white fw-bold': ''" @click="type = 'S'">Salida</div>
                        </div>
                        <form class="mb-3" @submit.prevent="save">
                            <div class="mb-3">
                                <input v-model.trim="code" type="text" 
                                class="form-control form-control-lg text-center"
                                :class="(errors.code || errors.message) ? 'is-invalid': ''" 
                                placeholder="INGRESE SU CODIGO Y PRESIONE ENTER" autofocus maxlength="4"
                                />
                                <small v-if="errors.code" class="text-danger">{{ errors.code[0] }}</small>
                            </div>
                        </form>
                        <div class="board-n">
                            <div class="n">1</div>
                            <div class="n">2</div>
                            <div class="n">3</div>
                            <div class="n">4</div>
                            <div class="n">5</div>
                            <div class="n">6</div>
                            <div class="n">7</div>
                            <div class="n">8</div>
                            <div class="n">9</div>
                            <div class="n">0</div>
                            <div class="enter">ENTER</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import store from '@/config/store'

    let code = ref('')
    let type = ref('E')
    let errors = ref([])


    const save = () => {
        alert(code.value)
        // Util.load(true)
        // ac.post(`api/v1/users/${fedit.value.id}`, fedit.value)
        //     .then(({data}) => {
        //             Util.load(false)
        //             errors.value = []
        //             $('#modal-edit-user').modal('hide')
        //             Toast.fire({ icon: "success", title: "Se ha modificado con éxito!.", })
        //             emit('saveOn')
        //         }).catch((err) => {
        //             Util.load(false)
        //             errors.value = (err.response.status == 422) ? err.response.data.errors : []
        //         })
    }

    onMounted(() => {
        
    })
</script>
<style scoped>
    .bg-primary {
        background: blue !important;
    }
    .authentication-wrapper.authentication-basic .authentication-inner {
        max-width: 500px;
    }
    .container-type, .board-n {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 5px;
    }
    .container-type div {
        min-width: 49%;
        text-align: center;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #e7e7e7;
        margin-bottom: 1rem;
        cursor: pointer;
        text-transform: uppercase;
    }
    
    .board-n .n, .board-n .enter {
        height: 100%;
        width: 100%;
        border: 1px solid #e7e7e7;
        text-align: center;
        padding: .7rem;
        border-radius: 1rem;
        cursor: pointer;
        font-size: 20px;
    }
    .board-n .n {
        flex: 1 1 calc(100% / 3);
        max-width: calc(94% / 3);
    }
    .board-n .enter {
        max-width: 66.66%;
        color: white;
        font-weight: bold;
        background: blue;
    }
    .board-n .n:hover {
        background: #e7e7e7;
        font-weight: bold;
    }
</style>