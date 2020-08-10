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
                                    {{ order.status }}
                                </span>
                            </div>
                            <q-separator class="q-my-md"/>
                            <div class="row q-col-gutter-sm">
                                <div class="col-8 col-md-12 q-pb-md">
                                    <div class="row  q-col-gutter-sm">
                                        <div class="col-12 col-lg-8">
                                            <div class="row q-col-gutter-sm">
                                                <div class="col-12 col-lg-4 right-border">
                                                    <b>Fecha: </b> {{ order.createdAt }}
                                                </div>
                                                <div class="col-12 col-lg-4 right-border text-center-md">
                                                    {{ order.enterprise }}
                                                </div>
                                                <div class="col-12 col-lg-4 right-border text-center-md">
                                                    <b>Origen: </b> {{ order.origin }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-4 text-center-md">
                                            <b>Destino: </b> {{ order.destination }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 lt-md flex content-end">
                                    <q-btn color="positive" label="Ver Orden" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 text-center gt-sm">
                            <div class="q-py-sm">
                                <q-chip :label="order.status"/>
                            </div>
                            <div class="q-pt-sm">
                                <q-btn color="positive" label="Ver Orden" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                            </div>
                        </div>
                    </div>
                </q-card>
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
            init(){
                this.loading = true
                this.getData()
                this.loading = false
            },
            async getData(){
                await this.$crud.index('apiRoutes.qlogistic.orders').then(response =>{
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