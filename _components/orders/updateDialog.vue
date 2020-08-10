<template>
    <q-dialog v-model="show" no-backdrop-dismiss no-route-dismiss content-class="q-container" v-bind="this.$q.platform.is.mobile?{fullHeight: true,maximized: true}:{}">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <q-btn flat round dense icon="fas fa-arrow-left" v-close-popup class="mobile-only q-mr-sm" />
                    <span class="q-py-md">Actualizar Orden</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup class="desktop-only" />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
                <div class="row q-col-gutter-md">
                    <div class="col-12 text-right">
                        <span class="text-subtitle2 text-primary q-pa-sm text-bold"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Modificar Estado:</span>
                        <q-btn-dropdown rounded no-caps color="secondary" :label="selectedStatus.name">
                            <q-list>
                                <q-item tag="label" v-ripple clickable v-for="(status,index) in statuses" :key="index" v-close-popup>
                                    <q-item-section>
                                        <q-item-label>
                                            <q-radio :label="status.name" :val="status" v-model="selectedStatus" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row" v-if="selectedStatus.id === 3">
                    <div class="col-12">
                        <q-radio label="Terrestre" color="primary" :val="1" />
                        <q-radio label="Aéreo" color="primary" :val="2" />
                    </div>
                    <div class="col-12">
                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">Empresa Transportadora</div>
                        <q-select
                                outlined
                                dense
                                use-chips
                                :loading="businessLoading"

                                :options="businessOptions"
                                label="Selección de Empresa"
                                map-options
                                emit-value
                                use-input
                                @filter="(val, update)=>update(()=>{businessOptions = $helper.filterOptions(val,business,locale.formTemplate.businessId)})"
                                option-label="label"
                        />
                    </div>
                    <q-separator class="q-my-lg" />
                </div>
                <div class="row" v-if="selectedStatus.id === 5">
                    <div class="col-12">
                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">Entregado A:</div>
                        <q-input  outlined dense label="Nombre funcionario"
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                    </div>
                    <div class="col-12">
                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">Teléfono:</div>
                        <q-input  outlined dense label="Teléfono"
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                    </div>
                    <div class="col-12">
                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">Cargo:</div>
                        <q-input  outlined dense label="Cargo"
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                    </div>
                    <q-separator class="q-my-md" />
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="text-subtitle2 text-bold text-primary q-px-md q-py-sm">Observaciones:</div>
                        <q-input  outlined dense label="Observaciones" type="textarea"
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                    </div>
                </div>
                <div class="row" v-if="selectedStatus.id === 5">
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="text-subtitle2 text-bold text-primary q-px-md q-py-sm">Firma:</div>
                        <q-input  outlined dense label="" type="textarea"
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-right">
                        <q-btn rounded color="positive" icon="fas fa-paper-plane" label="Enviar" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "updateDialog",
        props:{
            value: {default: false},
            itemId: {default: false},
        },
        watch: {
            value(newValue) {
                this.show = this.value
            },
            show(newValue) {
                this.$emit('input', this.show)
                this.initForm()
            },
        },
        data(){
            return {
                show: false,
                selectedStatus: {id:1, name:'Recibido'},
                statuses: [
                    {id:1, name:'Recibido'},
                    {id:2, name:'Transito Ciudad de Origen'},
                    {id:3, name:'Envío Nacional'},
                    {id:4, name:'Transito Ciudad Destino'},
                    {id:5, name:'Entregado'},
                    {id:6, name:'Completado'}
                ]
            }
        },
        methods:{
            initForm(){
                this.show = this.value//Assign props value to show modal
            }
        }
    }
</script>

<style scoped>

</style>