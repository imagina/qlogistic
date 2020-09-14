<template>
    <div class="flex flex-center relative-position">
        <div class="row full-width q-pb-md q-px-sm">
            <div class="col-12">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section v-if="success">
                        <div class="row">
                            <div class="col-12">
                                <q-list>
                                    <q-item>
                                        <q-item-section avatar style="width: 30px" class="items-baseline">
                                            <div class="col-12 q-py-sm">
                                                <q-icon name="fas fa-clipboard-list" size="xs" color="primary" class="q-mt-sm" />
                                            </div>
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="row q-py-sm">
                                                <div class="col-12">
                                                    <div class="text-h6 text-primary">Orden #{{ itemId.padStart(5,'0') }}</div>
                                                </div>
                                            </div>
                                        </q-item-section>
                                        <q-item-section side>
                                            <div class="row q-py-sm">
                                                <div class="col-12">
                                                    <div class="text-h6 text-secondary">{{ $tr('ui.form.status') }}: {{ order.orderStatus.name }}</div>
                                                </div>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row full-width q-pa-sm" v-if="success">
            <div class="col-12 col-md-6">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section>
                        <div class="row q-pa-sm">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12 q-my-sm">
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">{{ $tr('qlogistic.layout.form.origin')  }}:</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ order.originBusiness.name }}</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.orderBusiness')  }}</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ order.originAddress }} , {{ order.originCity.name }}</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.form.origin')  }}</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">{{ $tr('qlogistic.layout.form.destination')  }}:</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ order.destinationCity.name }}, {{ order.destinationCity.province.name }}</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.form.destination')  }}</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ order.destinationBusiness.name }}</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.form.destinationBusiness')  }}</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">{{ $tr('qlogistic.layout.form.additionalInfo') }}:</div>
                                        <div class="row q-ma-md">
                                          <div class="col-12 col-md-6">
                                            <div class="text-subtitle2 text-bold text-primary">{{ $tr('qlogistic.layout.form.patient') }}</div>
                                            <div class="text-caption text-justify">
                                              {{ order.customerName }}
                                            </div>
                                          </div>
                                          <div class="col-12 col-md-6">
                                            <div class="text-subtitle2 text-bold text-primary">{{ $tr('qlogistic.layout.form.patientDni') }}</div>
                                            <div class="text-caption text-justify">
                                              {{ order.customerDni }}
                                            </div>
                                          </div>
                                        </div>
                                        <div v-for="(item,i) in order.items">
                                            <q-separator class="q-my-md" />
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />
                                                      {{ item.description }}
                                                    </div>
                                                    <div class="text-caption text-primary text-bold q-pl-sm">{{ item.packagingType.name }}</div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="text-subtitle1">
                                                      <q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ item.quantity }}
                                                    </div>
                                                    <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.form.pieces') }}</div>
                                                </div>
                                                <div class="col-3">
                                                  <q-btn v-if="$auth.hasAccess('ilogistics.orders.print') && item.qrs" class="q-mr-sm" icon="fas fa-print" rounded color="primary" @click="()=>{orderItemId = item.id;showQRDialog = true}">
                                                    <q-tooltip>
                                                      {{ $tr('qlogistic.layout.generateQR') }}
                                                    </q-tooltip>
                                                  </q-btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 q-my-md">
                                        <div class="text-subtitle2 text-bold text-primary">{{ $tr('qlogistic.layout.form.observations2') }}</div>
                                        <div class="text-caption text-justify">
                                            {{ order.observations }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-right desktop-only">
                                <!--<q-btn class="q-mr-sm" :label="$tr('qlogistic.layout.generateQR')" icon="fas fa-print" rounded color="primary" @click="()=>{showQRDialog = true}" />-->
                                <q-btn v-if="$auth.hasAccess('ilogistics.orderstatushistories.create')"  :label="$tr('ui.label.update')" icon="fas fa-save" rounded color="positive" @click="()=>{showUpdateDialog = true}" />
                            </div>
                            <q-page-sticky position="bottom-right" :offset="[18, 60]" class="mobile-only">
                                <!--<q-btn class="q-mr-sm" icon="fas fa-print" rounded color="primary" @click="()=>{showQRDialog = true}">
                                    <q-tooltip>
                                        {{ $tr('qlogistic.layout.generateQR') }}
                                    </q-tooltip>
                                </q-btn>-->
                                <q-btn v-if="$auth.hasAccess('ilogistics.orderstatushistories.create')" icon="fas fa-save" rounded color="positive" @click="()=>{showUpdateDialog = true}">
                                    <q-tooltip>
                                        {{ $tr('ui.label.update') }}
                                    </q-tooltip>
                                </q-btn>
                            </q-page-sticky>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-6">
                <div class="row q-px-lg">
                    <div class="col-12">
                        <div class="text-h6 text-primary text-bold q-mt-xl q-mx-md">{{ $tr('qlogistic.layout.historial') }}</div>
                        <orderHistory :id="itemId" @input="init" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-12">
            <updateDialog :item-id="itemId" :order-history-id="false" v-model="showUpdateDialog" @created="init" />
            <qrDialog :item-id="orderItemId" v-model="showQRDialog" />
          </div>
        </div>
        <inner-loading :visible="loading" />
    </div>
</template>

<script>
    import orderHistory from "@imagina/qlogistic/_components/orders/orderHistory";
    import updateDialog from "@imagina/qlogistic/_components/orders/updateDialog";
    import qrDialog from "@imagina/qlogistic/_components/orders/qrDialog";
    export default {
        name: "ordersShow",
        components:{
            orderHistory,
            updateDialog,
            qrDialog
        },
        watch:{
          '$route.params'(){
            this.init()
          }
        },
        computed:{
          userData(){
            return this.$store.state.quserAuth.userData
          }
        },
        data(){
            return {
                order: {},
                itemId: null,
                showUpdateDialog: false,
                showQRDialog: false,
                loading: false,
                success: false,
                orderItemId: null,
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
                this.success = false
                this.loading = true
                this.itemId = this.$route.params ? this.$route.params.id : null
                await this.getData()
                this.loading = false
                this.success = true
            },
            async getData(){
                let params = {
                    params:{
                        include: 'items,items.qrs,items.packagingType,orderStatus,originBusiness,originCity,destinationBusiness,destinationCity,destinationCity.province',
                        filter: {},
                    }
                }
                if(this.userData.business !== null){
                  params.params.filter.user = this.userData.id
                  params.params.filter.originBusiness = this.userData.business.id
                }else if(this.userData.businesses.length > 0){
                  let business = this.userData.businesses
                  let bdata = []
                  for (let x in business){
                    bdata.push(business[x].id)
                  }
                  params.params.filter.originBusiness = bdata.join(',')
                }
                await this.$crud.show('apiRoutes.qlogistic.orders', this.itemId, params).then(response =>{
                    this.order = response.data
                }).catch(error =>{
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            }
        }
    }
</script>

<style scoped>

</style>
