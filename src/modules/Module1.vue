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
                <button class="btn btn-primary px-4">REGISTRAR NUEVO</button>
            </div>
            <div class="table-responsive">
                <table id="module1" class="table table-sm">
                    <thead class="text-center">
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE COMPLETO</th>
                            <th>DOCUMENTO</th>
                            <th>USUARIO</th>
                            <th>ESTADO</th>
                            <th>F.REGISTRO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d,i) in list" :key="i">
                            <td align="center">{{ d.code }}</td>
                            <td>{{ d.name }}</td>
                            <td align="center">{{ d.document }}</td>
                            <td align="center">{{ d.username }}</td>
                            <td align="center">{{ (d.status == 1) ? 'ACTIVO':'INACTIVO' }}</td>
                            <td>{{ $filters.date(d.fecha_registro, 'YYYY-MM-DD HH:mm:ss a') }}</td>
                            <td align="center">
                                <button class="btn btn-sm btn-light border mx-1" title="editar"><i class="far fa-edit"></i></button>
                                <button class="btn btn-sm btn-light border mx-1" title="Eliminar"><i class="far fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, watch, defineComponent } from 'vue'
    import storeOption from '@/config/store/options'
    import store from '@/config/store'
    
    let list = ref([])
    let filters = ref({
        limit: 100,
        search: '',
    })

    const getList = () => {
        Util.load(true)
        ac.get('/api/v1/users', { params: filters.value })
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
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'LISTA DE USUARIOS' }]  })
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