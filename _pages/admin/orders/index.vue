<template>
    <div class="flex flex-center relative-position">
        <div class="row full-width q-px-sm" v-if="orders.length > 0">
            <div class="col-12 q-py-sm" v-for="(order,index) in orders" :key="index">
                <q-card class="q-px-lg q-pt-lg" style="border-radius: 10px">
                    <div class="row">
                        <div class="col-12 col-md-9">
                            <div class="text-primary text-bold">
                                N°. {{ order.id.toString().padStart(5,'0') }}
                                <span class="float-right mobile-only">
                                    {{ order.orderStatus.name }}
                                </span>
                            </div>
                            <q-separator class="q-my-md"/>
                            <div class="row q-col-gutter-sm">
                                <div class="col-8 col-md-12 q-pb-md">
                                    <div class="row  q-col-gutter-sm">
                                        <div class="col-12 col-lg-8">
                                            <div class="row q-col-gutter-sm">
                                                <div class="col-12 col-lg-4 right-border">
                                                    <b>{{ $tr('ui.form.date') }}: </b> {{ $trd(order.createdAt) }}
                                                </div>
                                                <div class="col-12 col-lg-4 right-border text-center-md">
                                                    {{ order.originBusiness.name }}
                                                </div>
                                                <div class="col-12 col-lg-4 right-border text-center-md">
                                                    <b>{{ $tr('qlogistic.layout.form.origin') }}: </b> {{ order.originBusiness.city.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-4 text-center-md">
                                            <b>{{ $tr('qlogistic.layout.form.destination') }}: </b> {{ order.destinationBusiness.name }}, {{ order.destinationBusiness.city.name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 lt-md flex content-end">
                                    <q-btn color="positive" :label="$tr('qlogistic.layout.viewOrder')" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 text-center gt-sm">
                            <div class="q-py-sm">
                                <q-chip :label="order.orderStatus.name"/>
                            </div>
                            <div class="q-pt-sm">
                                <q-btn color="positive" label="Ver Orden" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                            </div>
                        </div>
                    </div>
                </q-card>
                <q-page-sticky position="bottom-right" :offset="[18, 50]">
                    <q-btn no-caps rounded dense icon="fas fa-plus" class="q-pa-sm mobile-only" size="sm" color="primary" :to="{name: 'qlogistic.orders.create'}">
                        <q-tooltip>
                            {{ $tr('qlogistic.layout.ordersCreate') }}
                        </q-tooltip>
                    </q-btn>
                </q-page-sticky>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12 q-py-sm">
                <not-results />
            </div>
        </div>
        <inner-loading :visible="loading" />
    </div>
</template>

<script>
    import notResults from '@imagina/qlogistic/_components/master/notResults'
    export default {
        name: "ordersIndex",
        components:{
            notResults
        },
        computed:{
            userData(){
                return this.$store.state.quserAuth.userData
            }
        },
        data(){
            return {
                orders:[
                ],
                loading: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.$root.$emit('dataToHeader',this.$attrs)
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
                        include: 'originBusiness,destinationBusiness,orderStatus,originBusiness.city,destinationBusiness.city',
                        filter:{}
                    }
                }
                if(this.userData.business){
                    params.params.filter.originBusiness = this.userData.business.id
                }
                if(this.userData.businesses.length > 0){
                    let business = this.userData.businesses
                    let bdata = []
                    for (let x in business){
                        bdata.push(business[x].id)
                    }
                    params.params.filter.originBusiness = bdata.join(',')
                }
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            }
        },
    }
</script>

<style lang="stylus">
    .right-border
        @media (min-width: $breakpoint-md)
            border-right: 1px solid $grey-4
    .text-center-md
        @media (min-width: $breakpoint-md)
            text-align center
</style>
