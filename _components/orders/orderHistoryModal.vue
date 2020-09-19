<template>
    <q-dialog v-model="show" content-class="q-container">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <span class="q-py-md">#{{ history.order ? history.order.id.toString().padStart(5,'0') : '00000' }}</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
                <div class="row" v-if="success">
                    <div class="col-12 text-secondary">
                        <q-icon name="fas fa-check-circle" color="secondary" class="q-mr-sm" /> {{ history.orderStatus.name }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs">
                            <div v-if="history.shippingType > 0"><b>{{ $tr('qlogistic.layout.form.shipping') }}:</b> {{ shippingTypes[history.shippingType] }}</div>
                            <div><b>{{ $tr('qlogistic.layout.form.originCity') }}:</b> {{ history.order.originCity.name }}</div>
                            <div v-if="history.transportBusiness"><b>{{ $tr('qlogistic.layout.form.shippingBusiness') }}:</b> {{ history.transportBusiness.name  }}</div>
                            <div><b>{{ $tr('qlogistic.layout.form.destinationCity') }}:</b> {{ history.order.destinationCity.name  }}</div>
                        </div>
                        <div class="q-pa-xs">
                            <div>{{ $trd(history.updatedAt, {type: 'long'}) }}</div>
                        </div>
                        <div class="q-pa-xs">
                            <div><b>{{ $tr('qlogistic.layout.form.editedBy') }}:</b> {{ history.user.fullName }}</div>
                        </div>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs text-primary text-bold">
                            {{ $tr('qlogistic.layout.form.observations2') }}
                        </div>
                        <div class="q-pa-xs text-justify">
                            {{ history.observations }}
                        </div>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12" v-if="history.gallery.length > 0">
                        <div class="q-pa-xs text-primary text-bold">
                            {{ $tr('qlogistic.layout.form.photoSupport') }}
                        </div>
                        <div class=" row q-pa-xs q-col-gutter-sm">
                            <div class="col-4" v-for="(image,i) in history.gallery" :key="i">
                                <q-img :src="image.path" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                      <gmap-map
                          :center="center"
                          :zoom="12"
                          style="width: 100%; height: 300px"
                      >
                        <gmap-marker
                            :key="index"
                            v-for="(marker, index) in markers"
                            :position="marker"
                            :clickable="true"
                            :draggable="false"
                            @click="center=marker"
                        ></gmap-marker>
                      </gmap-map>
                    </div>
                </div>
            </q-card-section>
            <inner-loading :visible="loading" />
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapGeolocationActions, mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'
    export default {
        name: "orderHistoryModal",
        props:{
            value: {default: false},
            itemId: {default: false},
        },
        computed:{
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
        watch: {
            value(newValue) {
                this.show = this.value
                this.initForm()
            },
            show(newValue) {
                this.$emit('input', this.show)
            },
        },
        data(){
            return {
              show: false,
              history: {},
              success: false,
              loading: false,
              markers: [],
              center: {},
              shippingTypes:[
                  "",
                  this.$tr('qlogistic.layout.form.typeTerrestrial'),
                  this.$tr('qlogistic.layout.form.typeAir'),
              ],
            }
        },
        methods:{
            async initForm(){
                this.loading = true
                this.success = false
                this.getLocationPermisssions()
                await this.getData()
                this.loading = false
                this.success = true
            },
            async getData(){
                let configName = 'apiRoutes.qlogistic.orderStatusHistories'
                let params = {
                    params:{
                        include: 'order,order.originBusiness,order.destinationBusiness,orderStatus,order.originCity,order.destinationCity,user,locations,transportBusiness',
                    },
                    refresh: true,
                }
                await this.$crud.show(configName, this.itemId, params).then(response => {
                    this.history = response.data
                    this.center = {lat: this.coords.latitude, lng: this.coords.longitude}
                    for(let x in this.history.locations){
                      this.markers.push({lat: this.history.locations[x].coords.latitude, lng: this.history.locations[x].coords.longitude})
                    }
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                })
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
          }
    }
</script>

<style scoped>

</style>
