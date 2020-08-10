<template>
    <div class="full-width full-height q-px-lg" id="orderHistoryComponent">
        <q-list class="full-height">
            <q-item>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-sm">
                        <q-btn flat dense color="primary" icon="fas fa-check-circle" />
                    </div>
                </q-item-section>
                <q-item-section>
                    <div class="text-caption q-pa-md">
                        <div class="text-caption q-px-md">
                            <div class="text-primary text-h6">
                                Recibido
                            </div>
                            <div class="q-pa-xs">
                                <div><b>Origen:</b> Nombre Empresa</div>
                                <div>Lorem Ipsum, Ibagué - Tolima</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>Destino:</b> Nombre Red Hospitalaria</div>
                                <div>Lorem Ipsum, Manizales - Caldas</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>Nº. de Piezas:</b> 00</div>
                                <div><b>Embalaje:</b> Embalaje</div>
                                <div><b><q-icon name="fas fa-circle" size="4px" class="q-mr-sm" /> Hora: 08:00 am</b></div>
                            </div>
                        </div>
                    </div>
                </q-item-section>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-lg">
                        <q-btn flat dense color="positive" icon="far fa-eye" @click="()=>{selectedStatusId=25;showStatusModal=true}">
                            <q-tooltip>
                                Ver
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
        <orderHistoryModal :id="selectedStatusId" v-model="showStatusModal" />
    </div>
</template>
<script>
    import orderHistoryModal from "./orderHistoryModal";
    export default {
        name: "orderHistory",
        components:{
            orderHistoryModal
        },
        props:{
            id:{
                default: null
            }
        },
        computed:{

        },
        data(){
            return {
                selectedStatusId: 11,
                showStatusModal: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{

            })
        },
    }
</script>

<style lang="stylus">
    #orderHistoryComponent
        .q-list
            margin: 0 10px
            border-left 3px solid $grey-4
            .q-item
                margin-left -25px
</style>