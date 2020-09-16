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
                                <div><b>{{ $tr('ui.label.address') }}:</b> {{ history.order.originAddress }}, {{ history.order.originCity.name }}</div>
                            </div>
                            <div class="q-pa-xs">
                                <div><b>{{ $tr('qlogistic.layout.form.destination') }}:</b> {{ history.order.destinationBusiness.name }}</div>
                                <div><b>{{ $tr('ui.label.address') }}:</b> {{ history.order.destinationAddress }}, {{ history.order.destinationCity.name }}</div>
                                <div>{{ $trd(history.updatedAt, {type: 'long'}) }}</div>
                            </div>
                            <div class="q-pa-xs">
                                <b>{{ $tr('ui.form.status') }}:</b> {{ history.orderStatus.name }}
                            </div>
                        </div>
                    </div>
                </q-item-section>
                <q-item-section avatar class="items-baseline">
                    <div class="col-12 q-py-lg">
                        <q-btn flat dense color="positive" icon="far fa-eye" @click="()=> {itemSelected = history.id;showHistoryModal = true}">
                            <q-tooltip>
                                Ver
                            </q-tooltip>
                        </q-btn>
                        <q-btn v-if="$auth.hasAccess('ilogistics.orderstatushistories.edit')" flat dense color="positive" icon="far fa-edit" @click="()=> {itemSelected = history.id;showUpdateDialog = true}">
                          <q-tooltip>
                            {{ $tr('ui.label.edit') }}
                          </q-tooltip>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
        <orderHistoryModal :itemId="itemSelected" v-model="showHistoryModal" />
        <updateDialog :item-id="id" :order-history-id="itemSelected" v-model="showUpdateDialog" @updated="init" />
        <inner-loading :visible="loading"/>
    </div>
</template>
<script>
    import OrderHistoryModal from "@imagina/qlogistic/_components/orders/orderHistoryModal";
    import updateDialog from "@imagina/qlogistic/_components/orders/updateDialog"
    export default {
        name: "orderHistory",
        components: {OrderHistoryModal,updateDialog},
        props:{
            id:{
                default: null
            }
        },
        computed:{
          userData(){
            return this.$store.state.quserAuth.userData
          },
        },
        watch:{
          id(){
            this.init()
          }
        },
        data(){
            return {
                histories: [],
                loading: false,
                success: false,
                itemSelected: null,
                showHistoryModal: false,
                showUpdateDialog: false,
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
                        include: 'order,order.originBusiness,order.destinationBusiness,orderStatus,order.originCity,order.destinationCity,locations',
                        filter:{
                            orderId: this.id
                        },
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
            margin: 10px 0 10px 30px
            border-left 3px solid $grey-4
            .q-item
                margin-left -25px
</style>
