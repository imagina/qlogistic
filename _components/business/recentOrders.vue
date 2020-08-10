<template>
    <q-card class="q-pa-lg" style="border-radius: 10px">
        <div class="text-h6 text-primary q-mb-md">Ordenes Recientes</div>
        <q-list>
            <q-separator class="q-mb-lg" />
            <q-item>
                <q-item-section>
                    <q-item-label class="text-bold q-pa-sm">
                        N°. 00004
                    </q-item-label>
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
                    <div class="col-12 q-py-sm">
                        <q-btn flat dense color="positive" icon="far fa-eye">
                            <q-tooltip>
                                Ver Orden
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-separator class="q-mb-lg" />
            <q-item class="q-py-md">
                <q-item-section>
                    <q-item-label class="text-bold q-pa-sm">
                        N°. 00004
                    </q-item-label>
                    <div class="text-caption q-pa-md">
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
                </q-item-section>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-sm">
                        <q-btn flat dense color="positive" icon="far fa-eye">
                            <q-tooltip>
                                Ver Orden
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-card>
</template>
<script>
    export default {
        name: "recentOrders",
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

<style scoped>

</style>