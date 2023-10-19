<template>
    <div class="card">
        <button @click="resetFilter" class="btn-filter-clear btn btn-sm btn-light border px-3">Limpiar filtros</button>        
        <div class="card-body">
            <div class="row">
                <div class="col-lg-2">
                    <label>Límite de Datos</label>
                    <select v-model="filters.limit" @change="getList" class="form-control">
                        <option v-for="d,i in storeOption.getters.getFilterLimit" :key="i" :value="d.value">{{ d.label }}</option>
                    </select>
                </div>
                <div class="col-lg-4">
                    <label>Buscar</label>
                    <input v-model.trim="filters.search"  @keypress.enter="getList" type="text" class="form-control" 
                    placeholder="Escriba aquí y presione Enter para buscar">
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <div class="pb-3 d-flex justify-content-end">
                <button @click="question" class="btn btn-danger border px-5">Limpiar registros</button>
            </div>
            <div class="table-responsive">
                <table id="module1" class="table table-sm">
                    <thead class="text-center">
                        <tr>
                            <th>USUARIO</th>
                            <th>NOMBRE COMPLETO</th>
                            <th>F.REGISTRO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(d,i) in list" :key="i">
                            <td>{{ d[1] }}</td>
                            <td>{{ d[2] }}</td>
                            <td>{{ $filters.date(d[3], 'YYYY-MM-DD HH:mm:ss a') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, watch } from 'vue'
    import storeOption from '@/config/store/options'

    let list = ref([])
    let filters = ref({
        limit: 100,
        search: '',
    })

    const getList = () => {
        Util.load(true)
        ac.get('/api/v1/log/logins', { params: filters.value })
            .then(({data}) => {
                Util.load(false)
                list.value = data
                initDataTable()
            }).catch((err) => {
                Util.load(false)
            })
    }

    const initDataTable = () => {
        Util.resetDataTable('#module1', { orderable: false, order: [], searching: false, pageLength: 10, dom:"Bfrtip",
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'LISTA DE LOGINS' }]  })
    }

    const resetFilter = () => {
        filters.value.limit = 100
        filters.value.search = ''
        getList()
    }

    const question = () => {
        Swal.fire({
            title: 'Estas seguro de eliminar?',
            text: "Está acción no tiene reversa",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!'
            }).then((result) => {
                if (result.value) {
                    destroy()
                }
        })
    }

    const destroy = () => {
        Util.load(true)
        ac.delete('/api/v1/log/logins')
            .then(({data}) => {
                Util.load(false)
                Toast.fire({ icon: "success", title: "Se ha eliminado con éxito!.", })
                getList()
            }).catch((err) => {
                Toast.fire({ icon: "error", title: err.response.data.errors[0] ?? 'undefined' })        
                Util.load(false)
            })
    }

    watch(() => filters.value.search , (n) => {
        initDataTable()
    })

    watch(() => filters.value.limit , (n) => {
        initDataTable()
    })

    onMounted(() => {
        getList()
    })

</script>
<style scoped>
    
</style>