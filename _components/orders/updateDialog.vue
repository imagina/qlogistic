<template>
    <q-dialog v-model="show" content-class="q-container" v-bind="this.$q.platform.is.mobile?{fullHeight: true,maximized: true}:{}">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%" class="relative-position">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <q-btn flat round dense icon="fas fa-arrow-left" v-close-popup class="mobile-only q-mr-sm" />
                    <span class="q-py-md">Actualizar Orden</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup class="desktop-only" />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg relative-position">
                <div class="full-width" v-if="success">
                    <div class="row">
                        <div class="col-12">
                            <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                        </div>
                    </div>
                    <q-form @submit="create" autocorrect="off" autocomplete="off" ref="formContent" @validation-error="$alert.error($tr('ui.message.formInvalid'))" v-if="locale.success">
                        <div class="row q-col-gutter-md">
                            <div class="col-12 text-right">
                                <span class="text-subtitle2 text-primary q-pa-sm text-bold"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Modificar Estado:</span>
                                <q-btn-dropdown :disable="orderHistoryId!=false" rounded no-caps color="secondary" :label="selectedStatus.name">
                                    <q-list>
                                        <q-item tag="label" v-ripple clickable v-for="(status,index) in statuses" :key="index" v-close-popup>
                                            <q-item-section>
                                                <q-item-label>
                                                    <q-radio v-close-popup :label="status.name" :val="status.id" v-model="locale.formTemplate.orderStatusId" @click.native="()=> selectedStatus = status" />
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown>
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                          <div class="col-12">
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
                                    <q-icon v-if="options != null" name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />{{ options.selectedQRS ? options.selectedQRS[item.id].length : 0 }} / {{ item.quantity }}
                                  </div>
                                  <div class="text-caption text-primary text-bold q-pl-sm">{{ $tr('qlogistic.layout.form.pieces') }}</div>
                                </div>
                                <div class="col-3">
                                  <q-btn class="q-mr-sm" v-if="item.qrs && options != null" icon="fas fa-qrcode" rounded color="primary" @click="()=>{orderItemId = item.id;selectedItems = options.selectedQRS ? options.selectedQRS[item.id] : [];showQRDialog = true}">
                                    <q-tooltip>
                                      {{ $tr('qlogistic.layout.scanQR') }}
                                    </q-tooltip>
                                  </q-btn>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <q-separator class="q-my-md" />
                        <div class="row" v-if="locale.form.orderStatusId === 3">
                            <div class="col-12">
                                <q-option-group inline type="radio" v-model="locale.formTemplate.shippingType" :options="shippingTypes" />
                            </div>
                            <div class="col-12">
                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.transportBusiness') }}:</div>
                                <q-select
                                        :readonly="orderHistoryId!=false"
                                        outlined
                                        dense
                                        use-chips
                                        :loading="businessLoading"
                                        v-model="locale.formTemplate.transportBusinessId"
                                        :options="businessOptions"
                                        :label="$tr('qlogistic.layout.form.transportSelection')"
                                        map-options
                                        emit-value
                                        use-input
                                        @filter="(val, update)=>update(()=>{businessOptions = $helper.filterOptions(val,business,locale.formTemplate.transportBusinessId)})"
                                        option-label="label"
                                        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                />
                            </div>
                            <q-separator class="q-my-lg" />
                        </div>
                        <div class="row" v-if="locale.form.orderStatusId === 5">
                            <div class="col-12">
                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.deliveredTo') }}:</div>
                                <q-input  outlined dense :label="$tr('qlogistic.layout.form.deliveredToName')"
                                          v-model="locale.formTemplate.deliveredTo"
                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                            </div>
                            <div class="col-12">
                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.phone') }}:</div>
                                <q-input  outlined dense :label="$tr('ui.form.phone')"
                                          v-model="locale.formTemplate.phone"
                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                            </div>
                            <div class="col-12">
                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.businessPosition') }}:</div>
                                <q-input  outlined dense :label="$tr('qlogistic.layout.form.businessPosition')"
                                          v-model="locale.formTemplate.businessPosition"
                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                            </div>
                            <q-separator class="q-my-md" />
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="text-subtitle2 text-bold text-primary q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.observations2') }}:</div>
                                <q-input  outlined dense :label="$tr('qlogistic.layout.form.observations2')" type="textarea"
                                          v-model="locale.formTemplate.observations"
                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                            </div>
                        </div>
                        <div class="row" v-if="locale.form.orderStatusId === 5">
                          <q-separator class="q-my-md" />
                          <div class="col-12">
                            <div class="col-12">
                              <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.signature') }}:</div>
                              <q-field borderless v-model="locale.formTemplate.signature" :rules="[val => !!val || $tr('ui.message.fieldRequired')]" >
                                <signature v-model="locale.formTemplate.signature" />
                              </q-field>
                            </div>
                          </div>
                        </div>
                        <div class="row" v-if="locale.form.orderStatusId === 3 || locale.form.orderStatusId === 5">
                            <div class="text-subtitle2 text-bold text-primary q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.addPhotos') }}:</div>
                            <media-form
                                  v-model="locale.formTemplate.mediasMulti"
                                  entity="Modules\Ilogistics\Entities\OrderStatusHistory"
                                  :entityId="itemId || null"
                                  zone='gallery'
                                  multiple
                            />
                        </div>
                        <div class="row q-py-md">
                            <div class="col-12 text-right">
                                <q-btn rounded color="positive" icon="fas fa-paper-plane" label="Enviar" type="submit" />
                            </div>
                        </div>
                    </q-form>
                </div>
                <qrScanDialog :item-id="orderItemId" :selected-items="selectedItems" v-model="showQRDialog" @select="selectQRS" />
            </q-card-section>
            <inner-loading :visible="loading" />
        </q-card>
    </q-dialog>
</template>

<script>
    import mediaForm from '@imagina/qmedia/_components/form'
    import qrScanDialog from '@imagina/qlogistic/_components/orders/qrScanDialog'
    import { mapGeolocationActions, mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'
    import signature from '@imagina/qlogistic/_components/signature/signature'
    export default {
        name: "updateDialog",
        components:{
            mediaForm,
            qrScanDialog,
            signature
        },
        props:{
            value: {default: false},
            itemId: {default: false},
            orderHistoryId: {default: false},
        },
        watch: {
            value(newValue) {
                this.show = this.value
            },
            show(newValue) {
                this.$emit('input', this.show)
                this.initForm()
            },
            'locale.form.shippingType'(){
              this.getBusiness()
            }
        },
        computed:{
          dataLocale(){
              return {
                  fields: {
                      businessPosition: null,
                      transportBusinessId: null,
                      deliveredTo: null,
                      phone: null,
                      signature: null,
                      observations: null,
                      orderStatusId: 1,
                      orderId: this.itemId,
                      userId: this.userData.id,
                      shippingType: 0,
                      options:{
                        selectedQRS: []
                      },
                      locations:[],
                      mediasMulti: {},
                  }
              }
          },
          userData(){
            return this.$store.state.quserAuth.userData
          },
          ...mapGeolocationGetters([
            'isPermissionKnown',
            'isPermissionGranted',
            'isPermissionPrompt',
            'isPermissionDenied',
            'hasPosition',
            'coords',
          ])
        },
        data(){
            return {
                locale: {},
                show: false,
                success: false,
                loading: false,
                businessLoading: false,
                order:{},
                selectedStatus: {},
                statuses: [],
                business:[],
                businessOptions:[],
                orderItemId: null,
                showQRDialog: false,
                options: {
                  selectedQRS: [],
                },
                selectedItems:[],
                pollingTimer: null,
                shippingTypes: [
                  { label: this.$tr('qlogistic.layout.form.typeTerrestrial'), value: '4' },
                  { label: this.$tr('qlogistic.layout.form.typeAir'), value: '5' },
                ],
            }
        },
        methods: {
            async initForm() {
                this.show = this.value//Assign props value to show modal
                this.success = false
                this.loading = true
                this.getLocationPermisssions()
                await this.getOrder()
                await this.getStatuses()
                this.locale = this.$clone(this.dataLocale)//Add fields
                if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
                await this.getHistory()
                this.success = true
                this.loading = false
                setTimeout(()=>{
                  if(this.locale.form)
                    this.locale.form.userId = this.userData.id
                  this.getBusiness()
                },200)
            },
            async getOrder(){
              let params = {
                refresh: true,
                params:{
                  include: 'items,items.qrs,items.packagingType,orderStatus,originBusiness,originCity,destinationBusiness,destinationCity,destinationCity.province',
                  filter: {},
                }
              }
              await this.$crud.show('apiRoutes.qlogistic.orders', this.itemId, params).then(response =>{
                this.order = response.data
              }).catch(error =>{
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              })
            },
            async getHistory(){
              let params = {
                refresh: true,
                params:{
                  include: 'locations,signatures'
                }
              }
              if(this.orderHistoryId!=false){
                await this.$crud.show('apiRoutes.qlogistic.orderStatusHistories', this.orderHistoryId, params).then(response =>{
                  let dataForm = this.$clone(response.data)
                  this.locale.form = this.$clone(dataForm)
                  this.locale.form.transportBusinessId = parseInt(dataForm.transportBusinessId)
                  this.locale.form.signature = dataForm.signatures.length > 0  ? dataForm.signatures[0].signature: null
                  this.options = dataForm.options
                  if(this.options.length === 0){
                    this.options = {
                      selectedQRS: []
                    }
                    this.locale.form.options = {
                      selectedQRS: []
                    }
                    for(let x in this.order.items){
                      this.options.selectedQRS[this.order.items[x].id] = []
                      this.locale.form.options.selectedQRS[this.order.items[x].id] = []
                    }
                  }
                  for(let x in this.statuses){
                    if(this.statuses[x].id == dataForm.orderStatusId){
                      this.selectedStatus = this.statuses[x]
                    }
                  }
                }).catch(error =>{
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
              }else{
                for(let x in this.order.items){
                  this.options.selectedQRS[this.order.items[x].id] = []
                }
              }
            },
            async getStatuses(){
              let params = {
                params:{
                  filter:{
                    allTranslations: true,
                  }
                }
              }
              await this.$crud.index('apiRoutes.qlogistic.orderStatuses',params).then(response => {
                this.statuses = response.data
                this.selectedStatus = this.statuses[0]
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              })
            },
            async getBusiness() {
                let params = {
                  params:{
                    filter:{
                      allTranslations: true,
                      types: [3, this.locale.form ? this.locale.form.shippingType : 4],
                    }
                  }
                }
                await this.$crud.index('apiRoutes.qlogistic.business',params).then(response => {
                    this.business = this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.businessOptions = this.$clone(this.business)
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            },
            async create(){
                if (this.$refs.localeComponent.validateForm()) {
                    this.loading = true
                    let configName = 'apiRoutes.qlogistic.orderStatusHistories'
                    let formData = this.$clone(this.getDataForm())
                    formData.locations = []
                    formData.options = this.options
                    formData.locations.push({coords: this.coords})
                    if(this.isPermissionDenied){
                      this.doQueryPermission()
                    }
                    if(this.orderHistoryId) {
                      this.$crud.update(configName, this.orderHistoryId, formData).then(response => {
                        this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                        this.$emit('updated')
                        this.loading = false
                        this.show = false
                      }).catch(error => {
                        this.loading = false
                        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                      })
                    }else{
                      this.$crud.create(configName, formData).then(response => {
                        this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                        this.$emit('created')
                        this.loading = false
                        this.show = false
                      }).catch(error => {
                        this.loading = false
                        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                      })
                    }
                }
            },
            getDataForm() {
                let response = this.locale.form
                let locations = response.locations
                for (var item in response) {
                    let valueItem = response[item]
                    if (valueItem == null || valueItem == undefined)
                        delete response[item]
                }
                //response.selectable = JSON.stringify(response.selectable)
                return response
            },
            selectQRS(data){
              this.showQRDialog = false
              let dataQ = this.$clone(data)
              this.options.selectedQRS[dataQ.id] = dataQ.checked
              this.locale.form.options.selectedQRS[dataQ.id] = dataQ.checked
            },
            doQueryPermission () {
              this.queryPermission()
                  .then(() => {
                    if (this.isPermissionDenied) {
                      // poll permission as the user might allow them in a separate tab
                      this.pollingTimer = setTimeout(() => this.doQueryPermission(), 2000)
                    } else if (this.pollingTimer) {
                      clearTimeout(this.pollingTimer)
                    }
                  })
            },
            getLocationPermisssions () {
              this.samplePosition()
                  .catch(() => { })
                  .finally(() => {
                    // update permissions (as the user might have enabled them)
                    this.doQueryPermission()
                  })
            },
            ...mapGeolocationActions([
              'samplePosition',
              'queryPermission'
            ])
        },
    }
</script>

<style scoped>

</style>
