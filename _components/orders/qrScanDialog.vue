<template>
  <q-dialog v-model="show" content-class="q-container" v-bind="$q.platform.is.mobile?{fullHeight: true,maximized: true}:{}">
    <q-card style="border-radius: 10px;max-width: 600px;width:100%">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <q-btn flat round dense icon="fas fa-arrow-left" v-close-popup v-if="$q.platform.is.mobile" class="q-mr-sm" />
          <span class="q-py-md">Códigos QR de {{ Object.keys(orderItem).length > 0 ? orderItem.packagingType.name + ' - ' + orderItem.description : '' }} ({{ checkedItems.length }} / {{ orderItem.qrs?orderItem.qrs.length:0 }})</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup v-if="$q.platform.is.desktop" />
      </q-toolbar>
      <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
        <div class="row">
          <qr-read @input="scanQR" v-if="showQR" @error="showQR = false" />
          <q-list class="col-12" v-for="(data, i) in decodedData" :key="i" v-if="showQR">
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-checkbox disable :val="data.position" v-model="checkedItems" />
              </q-item-section>
              <q-item-section>
                <p class="text-center text-caption">
                  FL#{{ data.orderId.toString().padStart(5,'0') }} | {{ data.id.toString().padStart(5,'0') }}  | {{ data.position }} / {{ orderItem.qrs.length }}
                </p>
              </q-item-section>
              <q-item-section avatar class="text-right">
                <q-btn icon="fas fa-trash" color="negative" @click.native="()=>{ decodedData.splice(i,1); checkedItems.splice(i,1) }">
                  <q-tooltip>
                    {{ $tr('ui.label.delete') }}
                  </q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="row" v-if="showQR===false">
          <div class="col-12" v-if="Object.keys(orderItem).length > 0">
            <div class="row">
              <q-list class="col-12" v-if="orderItem.qrs" v-for="(item, i) in orderItem.qrs" :key="i">
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-checkbox :val="i+1" v-model="checkedItems" />
                  </q-item-section>
                  <q-item-section>
                    <p class="text-center text-caption">
                      FL#{{ orderItem.orderId.toString().padStart(5,'0') }} | {{ orderItem.id.toString().padStart(5,'0') }}  | {{ (i+1) }} / {{ orderItem.qrs.length }}
                    </p>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <div class="row q-py-md">
          <div class="col-12 text-right">
            <q-btn :disable="checkedItems.length <= 0 " icon="fas fa-hand-pointer" rounded color="primary" @click="selectQR">
              <q-tooltip>
                {{ $tr('ui.label.select') }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <inner-loading :visible="loading" />
    </q-card>
  </q-dialog>
</template>

<script>
import qr from '@imagina/qlogistic/_components/qr/show'
import qrRead from "@imagina/qlogistic/_components/qr/read";
export default {
  name: "qrScanDialog",
  components:{
    qrRead,
    qr
  },
  props:{
    value: {default: false},
    itemId: {default: false},
    selectedItems: {default:[]}
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
      showQR: true,
      decodedData : [],
      error: null
    }
  },
  methods:{
    async initForm(){
      this.loading = true
      this.decodedData = []
      this.checkedItems = []
      this.show = this.value//Assign props value to show modal
      let params = {
        params:{
          include: 'qrs,packagingType',
        }
      }
      await this.$crud.show('apiRoutes.qlogistic.orderItems',this.itemId, params).then(response =>{
        this.orderItem = response.data
        for(let x in this.orderItem.qrs){
          for(let y in this.selectedItems){
            let z = parseInt(x)+1
            let n = parseInt(this.selectedItems[y])
            if(n==z){
              this.checkedItems.push(z)
              let decDataObj = {
                orderId: this.orderItem.orderId,
                id: this.itemId,
                packagingType: this.orderItem.packagingTypeId,
                description: this.orderItem.description,
                position: z,
              }
              this.decodedData.push(decDataObj)
            }
          }
        }
        this.loading = false
      }).catch(error =>{
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        this.loading = false
      })
    },
    selectQR(){
      let items = {
        id: this.itemId,
        checked: this.checkedItems
      }
      this.$emit('select',items)
    },
    scanQR(data){
        console.warn(data);
        let decData = data.split(' | ')
        let decDataObj = {
          orderId: decData[0],
          id: decData[1],
          packagingType: decData[2],
          description: decData[3],
          position: decData[4],
        }
        if(decDataObj.orderId==this.orderItem.orderId && decDataObj.id==this.orderItem.id){
          let exists = false
          for(let x in this.decodedData){
            if(this.decodedData[x].id==decDataObj.id && this.decodedData[x].orderId==decDataObj.orderId && this.decodedData[x].position==decDataObj.position){
              exists = true
            }
          }
          if(exists==false) {
            this.decodedData.push(decDataObj)
            this.checkedItems.push(decDataObj.position)
          }else{
            this.$alert.warning({message: this.$tr('qlogistic.layout.message.qrCodeAlreadySelected'), pos: 'bottom'})
          }
        }else{
          this.$alert.error({message: this.$tr('ui.message.notFound'), pos: 'bottom'})
        }
    }
  }
}
</script>

<style scoped>

</style>
