<template>
    <q-card class="q-pa-lg" style="border-radius: 10px">
        <q-card-section class="q-pa-none">
            <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.activeOrders') }}</div>
            <q-separator class="q-mb-lg" />
            <div v-if="orders.length > 0">
                <q-list class="full-height" v-for="(order,index) in orders" :key="index">
                    <q-item>
                        <q-item-section>
                            <div class="text-caption q-pa-md">
                                <q-item-label class="text-primary text-bold q-pa-sm">
                                    N°. {{ order.id.toString().padStart(5,'0') }}
                                </q-item-label>
                                <div class="text-caption q-px-md">
                                    <div class="q-pa-xs">
                                        <div><b>{{ $tr('qlogistic.layout.form.origin') }}:</b> {{ order.originBusiness.name }}</div>
                                        <div>{{ order.originBusiness.coords }}, {{ order.originBusiness.city.name }}</div>
                                    </div>
                                    <div class="q-pa-xs">
                                        <div><b>{{ $tr('qlogistic.layout.form.destination') }}:</b> {{ order.destinationBusiness.name }}</div>
                                        <div>{{ order.destinationBusiness.coords }}, {{ order.city.name }}</div>
                                    </div>
                                    <div class="q-pa-xs">
                                        <b>{{ $tr('ui.form.status') }}:</b> {{ order.orderStatus.name }}
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
                    <q-separator class="q-mb-lg" />
                </q-list>
            </div>
            <div class="col-12" v-else>
                <notResults />
            </div>
            <inner-loading :visible="loading" />
        </q-card-section>
    </q-card>
</template>
<script>
    import notResults from '@imagina/qlogistic/_components/master/notResults'
    import orderHistoryModal from '@imagina/qlogistic/_components/orders/orderHistoryModal'
    export default {
        name: "activeOrders",
        components:{
            notResults,
            orderHistoryModal,
        },
        props:{

        },
        computed:{
            userData(){
                return this.$store.state.quserAuth.userData
            }
        },
        data(){
            return {
                orders:[],
                loading: false,
                itemSelected: null,
                showModal: false,
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
                await this.getData()
                this.loading = false
            },
            async getData(){
                let params = {
                    params:{
                        include: 'orderStatus,originBusiness,originBusiness.city,destinationBusiness,destinationBusiness.city,city',
                        filter:{
                            user: this.userData.id
                        },
                    }
                }
                /*if(this.userData.business){
                    params.params.filter.originBusiness = this.userData.business.id
                }
                if(this.userData.businesses.length > 0){
                    let business = this.userData.businesses
                    let bdata = []
                    for (let x in business){
                        bdata.push(business[x].id)
                    }
                    params.params.filter.originBusiness = bdata.join(',')
                }*/
                console.error(params)
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            }
        }
    }
</script>

<style scoped>

</style>
