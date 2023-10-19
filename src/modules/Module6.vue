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
            <div class="table-responsive">
                <table id="module1" class="table table-sm">
                    <thead class="text-center">
                        <tr>
                            <th>USUARIO</th>
                            <th>ACCION</th>
                            <th>DATA</th>
                            <th>ACT DATA</th>
                            <th>URL</th>
                            <th>IP</th>
                            <th>F.REGISTRO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(d,i) in list" :key="i">
                            <td>{{ d.username }}</td>
                            <td>{{ d.action_name }}</td>
                            <td>{{ d.orig_data }}</td>
                            <td>{{ d.rep_data }}</td>
                            <td>{{ d.url_full }}</td>
                            <td>{{ d.ip_user }}</td>                            
                            <td>{{ $filters.date(d.created_at, 'YYYY-MM-DD HH:mm:ss a') }}</td>
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
        ac.get('/api/v1/log/move', { params: filters.value })
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
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'LISTA DE MOVIMIENTOS' }]  })
    }

    const resetFilter = () => {
        filters.value.limit = 100
        filters.value.search = ''
        getList()
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