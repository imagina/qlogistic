<template>
    <div class="full-width full-height q-py-sm q-px-lg relative-position" id="orderHistoryComponent">
        <q-list class="full-height" v-if="success">
            <q-item v-for="(history,i) in histories" :key="i">
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-sm">
                        <q-btn flat dense color="primary" icon="fas fa-check-circle" />
                    </div>
                </q-item-section>
                <q-item-section>
                    <div class="text-caption q-pa-md">
                        <div class="text-caption q-px-md">
                            <div class="q-pa-xs">
                                <div><b>{{ $tr('qlogistic.layout.form.origin') }}:</b> {{ history.order.originBusiness.name }}</div>
                                <div>Lorem Ipsum, Ibagué - Tolima</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>{{ $tr('qlogistic.layout.form.destination') }}:</b> {{ history.order.destinationBusiness.name }}</div>
                                <div>Lorem Ipsum, Manizales - Caldas</div>
                            </div>
                            <div class="q-pa-xs">
                                <b>{{ $tr('ui.form.status') }}:</b> {{ history.orderStatus.name }}
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
        <inner-loading :visible="loading"/>
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
                histories: [],
                loading: false,
                success: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            async init(){
                this.success = false
                this.loading = true
                let params = {
                    params:{
                        include: 'order,order.originBusiness,order.destinationBusiness,orderStatus',
                        order: this.id
                    }
                }
                await this.$crud.index('apiRoutes.qlogistic.orderStatusHistories',params).then(response =>{
                    this.histories = response.data
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
                this.loading = false
                this.success = true
            }
        }
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
