<template>
    <q-dialog v-model="show" content-class="q-container" v-bind="this.$q.platform.is.mobile?{fullHeight: true,maximized: true}:{}">
        <q-card style="border-radius: 10px;max-width: 600px;width:100%">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <q-btn flat round dense icon="fas fa-arrow-left" v-close-popup class="mobile-only q-mr-sm" />
                    <span class="q-py-md">Códigos QR de {{ Object.keys(orderItem).length > 0 ? orderItem.packagingType.name + ' - ' + orderItem.description  : '' }} ({{ checkedItems.length }} / {{ orderItem.qrs?orderItem.qrs.length:0 }})</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup class="desktop-only" />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
              <div class="row">
                <div class="col-12" v-if="Object.keys(orderItem).length > 0">
                  <div class="row">
                    <q-list class="col-6" v-if="orderItem.qrs" v-for="(item, i) in orderItem.qrs" :key="i">
                      <q-item tag="label" v-ripple>
                        <q-item-section avatar>
                          <q-checkbox :val="i" v-model="checkedItems" />
                        </q-item-section>
                        <q-item-section>
                          <q-img :src="item.code" style="width: 100px;margin: 0 auto" />
                          <p class="text-center text-caption">
                            FL#{{ orderItem.orderId.toString().padStart(5,'0') }} | {{ orderItem.id.toString().padStart(5,'0') }}  | {{ (i+1) }} / {{ orderItem.qrs.length }}
                          </p>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div class="row">
                    <div class="col-12 text-right">
                      <q-btn :disable="checkedItems.length <= 0 " icon="fas fa-print" rounded color="primary" @click="printQR">
                        <q-tooltip>
                          Imprimir
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                  <div class="hidden" id="printQR">
                    <div style="width: 100%">
                      <div v-for="index in checkedItems" style="width: 100%;display: inline-block;text-align: center">
                        <img :src="orderItem.qrs[index].code" style="width: 200px" />
                        <p style="text-align: center">
                          FL#{{ orderItem.orderId.toString().padStart(5,'0') }} | {{ orderItem.id.toString().padStart(5,'0') }}  | {{ (index+1) }} / {{ orderItem.qrs.length }}
                        </p>
                        <p style="text-align: center">Monitoreado por: FASTLOG SAS / Contacto: 3114658262 - 3204035218 - Ibague</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <inner-loading :visible="loading" />
        </q-card>
    </q-dialog>
</template>

<script>
    import qr from '@imagina/qlogistic/_components/qr/show'
    export default {
        name: "qrDialog",
        components:{
            qr
        },
        props:{
            value: {default: false},
            itemId: {default: false},
        },
        watch: {
            value(newValue) {
                this.show = this.value
            },
            show(newValue) {
                this.$emit('input', this.show)
                this.initForm()
            },
        },
        data(){
            return {
                show: false,
                checkedItems: [],
                orderItem: {},
                loading: false,
                projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
            }
        },
        methods:{
            async initForm(){
                this.loading = true
                this.checkedItems = []
                this.show = this.value//Assign props value to show modal
                let params = {
                  refresh: true,
                  params:{
                    include: 'qrs,packagingType',
                  }
                }
                await this.$crud.show('apiRoutes.qlogistic.orderItems',this.itemId, params).then(response =>{
                  this.orderItem = response.data
                  this.loading = false
                }).catch(error =>{
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                })
            },
            printQR(){
                this.$htmlToPaper('printQR')
            }
        }
    }
</script>

<style scoped>

</style>
