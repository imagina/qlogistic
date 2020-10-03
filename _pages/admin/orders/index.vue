<template>
    <div class="flex flex-center relative-position">
        <div class="row full-width q-px-sm" v-if="orders.length > 0">
            <div class="col-12 q-pa-sm text-right">
              <q-btn icon="fas fa-download" color="primary" @click="downloadReport">
                  <q-tooltip>
                    {{ $tr('qlogistic.layout.label.download') }}
                  </q-tooltip>
              </q-btn>
            </div>
            <div class="col-12 q-pa-sm">
              <div class="flex flex-center">
                <q-pagination
                    v-model="currentPage"
                    :max="page.lastPage"
                    :input="true"
                />
              </div>
            </div>
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
                                                    <b>{{ $tr('qlogistic.layout.form.origin') }}: </b> {{ order.originCity.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-lg-4 text-center-md">
                                            <b>{{ $tr('qlogistic.layout.form.destination') }}: </b> {{ order.destinationBusiness.name }}, {{ order.destinationCity.name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 lt-md flex content-end">
                                    <q-btn :class="'order-btn-view-'+order.id" color="positive" :label="$tr('qlogistic.layout.viewOrder')" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                                    &nbsp;
                                    <q-btn class="q-ml-sm" v-if="$auth.hasAccess('ilogistics.orders.destroy')" :class="'order-btn-delete-'+order.id" color="negative" icon="fas fa-trash" @click="deleteOrder(order.id)">
                                      <q-tooltip>
                                        {{ $tr('ui.label.delete') }}
                                      </q-tooltip>
                                    </q-btn>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 text-center gt-sm">
                            <div class="q-py-sm">
                                <q-chip :label="order.orderStatus.name"/>
                            </div>
                            <div class="q-pt-sm">
                                <q-btn :class="'order-btn-view-'+order.id" color="positive" label="Ver Orden" :to="{name: 'qlogistic.orders.show',params:{id: order.id}}" />
                                <q-btn class="q-ml-sm" v-if="$auth.hasAccess('ilogistics.orders.destroy')" :class="'order-btn-delete-'+order.id" color="negative" icon="fas fa-trash" @click="deleteOrder(order.id)">
                                  <q-tooltip>
                                    {{ $tr('ui.label.delete') }}
                                  </q-tooltip>
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
            <div class="col-12 q-pa-sm">
              <div class="flex flex-center">
                <q-pagination
                    v-model="currentPage"
                    :max="page.lastPage"
                    :input="true"
                />
              </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12 q-py-sm">
                <not-results />
            </div>
        </div>
        <inner-loading :visible="loading" />
        <q-page-sticky position="bottom-right" :offset="[18, 50]">
          <q-btn no-caps rounded dense icon="fas fa-plus" class="q-pa-sm mobile-only" size="sm" color="primary" :to="{name: 'qlogistic.orders.create'}">
            <q-tooltip>
              {{ $tr('qlogistic.layout.ordersCreate') }}
            </q-tooltip>
          </q-btn>
        </q-page-sticky>
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
        watch:{
          'currentPage'(){
            this.init()
          }
        },
        data(){
            return {
                orders:[
                ],
                filter: {},
                loading: false,
                currentPage: 1,
                takePage: 10,
                page: {
                  currentPage: 1,
                  perPage: 3,
                  lastPage: 1,
                  total: 10
                },
                requestParams: {}
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.$root.$emit('dataToHeader',this.$attrs)
                this.$root.$on('filter',this.init)
                this.init()
            })
        },
        methods:{
            async init(filter = {}){
                this.loading = true
                this.filter = filter
                await this.getData()
                this.loading = false
            },
            async getData(){
                let params = {
                    params:{
                        include: 'originBusiness,destinationBusiness,orderStatus,originCity,destinationCity',
                        filter: this.filter,
                        page: this.currentPage,
                        take: this.takePage,
                    }
                }
                if(this.userData.business !== null){
                    params.params.filter.originBusiness = this.userData.business.id
                }else if(this.userData.businesses.length > 0){
                    let business = this.userData.businesses
                    let bdata = []
                    for (let x in business){
                        bdata.push(business[x].id)
                    }
                    params.params.filter.originBusiness = bdata.join(',')
                }
                this.requestParams = params
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                    this.page = response.meta.page
                }).catch(error => {
                    console.error(error)
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            },
            deleteOrder(id){
              this.$q.dialog({
                title: this.$tr('ui.label.delete')+' '+this.$tr('qlogistic.sidebar.adminOrderShow'),
                preventClose: true,
                message: this.$tr('ui.message.deleteRecord'),
                color: 'negative',
                ok: this.$tr('ui.label.delete'),
                cancel: this.$tr('ui.label.cancel'),
              }).onOk(response => {//If comfirn delete action
                this.loading = true
                let configName = 'apiRoutes.qlogistic.orders'
                //Request
                this.$crud.delete(configName, id, {params: {}}).then(async response => {
                  this.$alert.success({message: this.$tr('ui.message.recordDeleted'), pos: 'bottom'})
                  await this.getData()//Get data
                  this.loading = false
                }).catch((error) => {
                  this.$alert.error({message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom'})
                  this.loading = false
                })
              }).onCancel(response => {
              })
            },
            downloadReport(){
              let requestParams = []
              for(let x in this.requestParams.params){
                if(x !== 'page' && x !== 'take'){
                  let obj = typeof this.requestParams.params[x] == 'object' ? JSON.stringify(this.requestParams.params[x]) : this.requestParams.params[x]
                  requestParams.push(x+'='+obj)
                }
              }
              let stringParams = requestParams.join('&')
              let downloadRoute = config('apiRoutes.qlogistic.orders')+'/download?'+stringParams
              window.open(downloadRoute,'_blank')
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
