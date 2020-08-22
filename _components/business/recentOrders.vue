<template>
    <q-card class="q-pa-lg" style="border-radius: 10px">
        <div class="text-h6 text-primary q-mb-md">Ordenes Recientes</div>
        <q-separator class="q-mb-lg" />
        <q-list v-if="orders.length > 0">
            <div v-for="(order,index) in orders">
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
                </q-item>
            </div>
        </q-list>
        <div class="full-width" v-else>
            <not-result />
        </div>
        <inner-loading :visible="loading" />
    </q-card>
</template>
<script>
    import NotResult from "@imagina/qlogistic/_components/master/notResults";
    export default {
        name: "recentOrders",
        components: {NotResult},
        props:{
            id:{
                default: null
            }
        },
        computed:{

        },
        data(){
            return {
                loading: false,
                orders: []
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            async init(){
                this.loading = true
                let params = {
                    params:{
                        filter: {
                            business: this.id
                        }
                    }
                }
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                    this.loading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>