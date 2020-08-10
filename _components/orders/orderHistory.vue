<template>
    <div class="full-width full-height q-py-sm q-px-lg" id="orderHistoryComponent">
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
                            <div class="q-pa-xs">
                                <div><b>Origen:</b> Nombre Empresa</div>
                                <div>Lorem Ipsum, Ibagué - Tolima</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>Destino:</b> Nombre Red Hospitalaria</div>
                                <div>Lorem Ipsum, Manizales - Caldas</div>
                            </div>
                            <div class="q-pa-xs">
                                <b>Estado:</b> Entregado
                            </div>
                        </div>
                    </div>
                </q-item-section>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-lg">
                        <q-btn flat dense color="positive" icon="far fa-eye">
                            <q-tooltip>
                                Ver
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>
<script>
    export default {
        name: "orderHistory",
        props:{
            id:{
                default: null
            }
        },
        computed:{

        },
        data(){
            return {

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
            margin: 10px 30px
            border-left 3px solid $grey-4
            .q-item
                margin-left -25px
</style>