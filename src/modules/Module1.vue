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
                <button @click="$refs.reg.showModal" class="btn btn-primary border px-5">Registrar Nuevo</button>
            </div>
            <div class="table-responsive">
                <table id="module1" class="table table-sm">
                    <thead class="text-center">
                        <tr>                  
                            <th>USUARIO</th>          
                            <th>NOMBRE COMPLETO</th>
                            <th>DOCUMENTO</th>                            
                            <th>ESTADO</th>
                            <th>F.REGISTRO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d,i) in list" :key="i">
                            <td align="center">{{ d.username }}</td>
                            <td align="center">{{ d.name }}</td>
                            <td align="center">{{ d.document }}</td>                            
                            <td align="center">{{ (d.status == 1) ? 'ACTIVO':'INACTIVO' }}</td>
                            <td>{{ $filters.date(d.fecha_registro, 'YYYY-MM-DD HH:mm:ss a') }}</td>
                            <td align="center">
                                <button @click="$refs.edit.getEdit(d.id)" class="btn btn-sm btn-light mx-1 border" title="Editar">
                                    <i class="far fa-edit"></i>
                                </button>
                                <button v-if="d.id != store.getters.getUser.id" @click="question(d.id)" class="btn btn-sm btn-light mx-1 border" title="Eliminar">
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
    import RegisterComponent from '@/components/01/RegisterComponent.vue'
    import EditComponent from '@/components/01/EditComponent.vue'
    import { ref, onMounted, watch, defineComponent } from 'vue'
    import storeOption from '@/config/store/options'
    import store from '@/config/store'

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
        ac.delete(`/api/v1/users/${id}`)
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