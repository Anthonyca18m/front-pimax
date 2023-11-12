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
                    placeholder="Escriba aquí y presione Enter para buscar"
                    autocomplete="off">
                </div>
                <div class="col-lg-2">
                    <label>Área</label>
                    <select v-model="filters.area_id" @change="getList" class="form-control">
                        <option value="">Seleccionar</option>
                        <option v-for="d,i in select1" :key="i" :value="d.id">{{ d.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <div class="pb-3 d-flex justify-content-end">                
                <button @click="$refs.reg.showModal" class="btn btn-primary border px-5">Registrar Nuevo</button>
            </div>
            <div class="table-responsive">
                <table id="module1" class="table table-sm">
                    <thead class="text-center">
                        <tr>
                            <th>CODIGO</th>
                            <th>AREA</th>
                            <th>NOMBRE COMPLETO</th>
                            <th>DOCUMENTO</th>
                            <th>TIPO DE CONTRATO</th>
                            <th>CONTRATO</th>                            
                            <th>ESTADO</th>
                            <th>F.REGISTRO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d,i) in list" :key="i">
                            <td align="center">{{ d.code }}</td>
                            <td align="center">{{ d.area.area }}</td>
                            <td align="center">{{ d.name }}</td>
                            <td align="center">{{ d.document }}</td>
                            <td align="center">{{ d.contrato.type.name }}</td>
                            <td align="center">                                
                                <span v-if="d.contrato.status == 1" class="badge bg-success">VIGENTE</span>
                                <span v-else class="badge bg-danger">VENCIDO</span>
                            </td>                            
                            <td align="center">{{ (d.status == 1) ? 'ACTIVO':'INACTIVO' }}</td>
                            <td align="center">{{ $filters.date(d.created_at, 'YYYY-MM-DD HH:mm:ss a') }}</td>
                            <td align="center">
                                <button @click="$refs.edit.getEdit(d.id)" class="btn btn-sm btn-light mx-1 border" title="Editar">
                                    <i class="far fa-edit"></i>
                                </button>
                                <button @click="question(d.id)" class="btn btn-sm btn-light mx-1 border" title="Eliminar">
                                    <i class="far fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <RegisterComponent ref="reg" @saveOn="getList"/>
    <EditComponent ref="edit" @saveOn="getList"/>
</template>
<script setup>
    import RegisterComponent from '@/components/02/RegisterComponent.vue'
    import EditComponent from '@/components/02/EditComponent.vue'
    import { ref, onMounted, watch, defineComponent } from 'vue'
    import storeOption from '@/config/store/options'

    defineComponent({
        components: {
            RegisterComponent,
            EditComponent,
        }
    })
    
    let list = ref([])
    let filters = ref({
        limit: 100,
        search: '',
        area_id: '',
    })
    let select1 = ref([])

    const getList = () => {
        Util.load(true)
        ac.get('/api/v1/employes', { params: filters.value })
            .then(({data}) => {
                Util.load(false)
                list.value = data
                initDataTable()
            }).catch((err) => {
                Util.load(false)
            })
    }

    const getSelect1 = () => {
        ac.get('/api/v1/select/areas')
            .then(({data}) => {
                select1.value = data
            })
            .catch((err) => {
                select1.value = []
            })
    }

    const initDataTable = () => {
        Util.resetDataTable('#module1', { orderable: false, order: [], searching: false, pageLength: 10, dom:"Bfrtip",
        buttons: [{ extend: 'excel', text: 'Exportar Datos a Excel', title: 'LISTA DE EMPLEADOS' }]  })
    }

    const resetFilter = () => {
        filters.value.limit = 100
        filters.value.search = ''
        filters.value.area_id = ''
        getList()
    }

    const question = (id) => {
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
                    destroy(id)
                }
        })
    }

    const destroy = (id) => {
        Util.load(true)
        ac.delete(`/api/v1/employes/${id}`)
            .then(({data}) => {
                Util.load(false)
                if (data) {
                    Toast.fire({ icon: "success", title: "Se ha eliminado con éxito!.", })
                } else {
                    Toast.fire({ icon: "error", title: 'El Empleado tiene registros, no puede ser eliminado.' })    
                }
                getList()
            }).catch((err) => {
                Toast.fire({ icon: "error", title: 'El Empleado tiene registros, no puede ser eliminado.' })
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
        if(!select1.value.length){ getSelect1() }
    })

</script>
<style scoped>
    
</style>