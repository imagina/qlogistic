<template>
    <q-card class="q-pa-lg" style="border-radius: 10px">
        <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.activeOrders') }}</div>
        <q-separator class="q-mb-lg" />
        <q-list v-if="orders.length > 0">
            <q-item v-for="(order,index) in orders" :key="index">
                <q-item-section>
                    <q-item-label class="text-primary text-bold q-pa-sm">
                        N°. 00004
                    </q-item-label>
                    <div class="text-caption q-pa-md">
                        <div class="text-caption q-px-md">
                            <div class="q-pa-xs">
                                <div><b>{{ $tr('qlogistic.layout.form.origin') }}:</b> {{ order.originBusiness.name }}</div>
                                <div>Lorem Ipsum, {{ order.originBusiness.city.name }}</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>{{ $tr('qlogistic.layout.form.destination') }}:</b> Nombre Red Hospitalaria</div>
                                <div>Lorem Ipsum, Manizales - Caldas</div>
                            </div>
                            <div class="q-pa-xs">
                                <b>{{ $tr('ui.form.status') }}:</b> {{ order.status.name }}
                            </div>
                        </div>
                    </div>
                </q-item-section>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-sm">
                        <q-btn flat dense color="positive" icon="far fa-eye">
                            <q-tooltip>
                                {{ $tr('qlogistic.layout.viewOrder') }}
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
                <q-separator class="q-mb-lg" />
            </q-item>
        </q-list>
        <div v-else>
            <notResults />
        </div>
    </q-card>
</template>
<script>
    import notResults from '@imagina/qlogistic/_components/master/notResults'
    export default {
        name: "activeOrders",
        components:{
            notResults
        },
        props:{

        },
        computed:{

        },
        data(){
            return {
                orders:[],
                loading: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{
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
                let params = {
                    params:{
                        include: 'status',
                        filter:{
                            status: 1
                        }
                    }
                }
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