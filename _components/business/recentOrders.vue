<template>
    <q-card class="q-pa-lg" style="border-radius: 10px">
        <div class="text-h6 text-primary q-mb-md">Ordenes Recientes</div>
        <q-separator class="q-mb-lg" />
        <q-list v-if="orders.length > 0">
            <div v-for="(order,index) in orders">
                <q-item>
                    <q-item-section>
                        <q-item-label class="text-bold q-pa-sm">
                            N°. {{ order.id.toString().padStart(5,'0') }}
                        </q-item-label>
                        <div class="text-caption q-pa-md">
                            <div class="text-caption q-px-md">
                                <div class="q-pa-xs">
                                    <div><b>Origen:</b> {{ order.originBusiness.name }}</div>
                                    <div>{{ order.originBusiness.coords }}, {{ order.originBusiness.city.name }}</div>
                                </div>
                                <div class="q-pa-xs">
                                    <div><b>Destino:</b> {{ order.destinationBusiness.name }}</div>
                                    <div>{{ order.destinationBusiness.coords }}, {{ order.destinationBusiness.city.name }}</div>
                                </div>
                                <div class="q-pa-xs">
                                    <b>Estado:</b> {{ order.orderStatus.name }}
                                </div>
                            </div>
                        </div>
                    </q-item-section>
                    <q-item-section avatar class="items-baseline">
                        <div class="col-12 q-py-sm">
                            <q-btn flat dense color="positive" icon="far fa-eye" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}">
                                <q-tooltip>
                                    {{ $tr('qlogistic.layout.viewOrder') }}
                                </q-tooltip>
                            </q-btn>
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
            userData(){
                return this.$store.state.quserAuth.userData
            }
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
                        include: 'items,orderStatus,originBusiness,originBusiness.city,destinationBusiness,destinationBusiness.city,city,city.province',
                        filter: {}
                    }
                }
                if(this.userData.business){
                    params.params.filter.originBusiness = this.userData.business.id
                }
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                    this.loading = false
                }).catch(error => {
                    console.error(error)
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
