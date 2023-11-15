<template>
    <div class="container">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <div class="card">
                    <div class="card-body">
                        <form class="mb-3" @submit.prevent="save">
                            <div class="mb-3">
                                <input v-model.trim="code" type="text" id="code" class="form-control form-control-lg text-center"
                                    :class="(errors.code || errors.message) ? 'is-invalid' : ''"
                                    placeholder="INGRESE SU CODIGO Y PRESIONE ENTER" autofocus maxlength="4" />
                                <small v-if="errors.code" class="text-danger">{{ errors.code[0] }}</small>
                            </div>
                        </form>
                        <div class="board-n">
                            <div class="n" @click="setCode(1)">1</div>
                            <div class="n" @click="setCode(2)">2</div>
                            <div class="n" @click="setCode(3)">3</div>
                            <div class="n" @click="setCode(4)">4</div>
                            <div class="n" @click="setCode(5)">5</div>
                            <div class="n" @click="setCode(6)">6</div>
                            <div class="n" @click="setCode(7)">7</div>
                            <div class="n" @click="setCode(8)">8</div>
                            <div class="n" @click="setCode(9)">9</div>
                            <div class="n" @click="setCode(0)">0</div>
                            <div class="enter" @click="save">ENTER</div>
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
    import Swal from 'sweetalert2'

    let code = ref('')
    let errors = ref([])


    const save = () => {
        if(code.value == '') return
        Util.load(true)
        ac2.post('api/v1/asistencia/form', { codigo: code.value })
            .then(({data}) => {
                errors.value = []
                Swal.fire({ title: data, icon: 'success', showConfirmButton: false, timer: 3000 })
            })
            .catch((err) => {
                Swal.fire({ title: err.response.data, icon: 'error', showConfirmButton: false, timer: 3000 })
            })
            .finally(() => {
                Util.load(false)
                code.value = ''
            })
    }

    const setCode = (n) => {
        if (code.value.length == 4) return
        code.value = `${code.value}${n}`
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

    .container-type,
    .board-n {
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

    .board-n .n,
    .board-n .enter {
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