<template>
    <q-dialog v-model="show" no-esc-dismiss no-backdrop-dismiss no-route-dismiss content-class="q-container">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%">
            <q-toolbar class="bg-primary text-white" v-if="success">
                <q-toolbar-title>
                    <span class="q-py-md">#{{ history.order.id.toString().padStart(5,'0') }}</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg" v-if="success">
                <div class="row">
                    <div class="col-12 text-secondary">
                        <q-icon name="fas fa-check-circle" color="secondary" class="q-mr-sm" /> {{ history.orderStatus.name }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs">
                            <div v-if="history.shippingType > 0"><b>{{ $tr('qlogistic.layout.form.shipping') }}:</b> {{ shippingTypes[history.shippingType] }}</div>
                            <div><b>{{ $tr('qlogistic.layout.form.originCity') }}:</b> {{ history.order.originBusiness.city.name }}</div>
                            <div v-if="history.transportBusiness"><b>{{ $tr('qlogistic.layout.form.shippingBusiness') }}:</b> {{ history.transportBusiness.name  }}</div>
                            <div><b>{{ $tr('qlogistic.layout.form.destinationCity') }}:</b> {{ history.order.city.name  }}</div>
                        </div>
                        <div class="q-pa-xs">
                            <div><b>{{ $tr('ui.label.hour') }}: {{ $trd(history.createdAt, {type: 'time'}) }}</b></div>
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
                </div>
            </q-card-section>
            <inner-loading :visible="loading" />
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "orderHistoryModal",
        props:{
            value: {default: false},
            itemId: {default: false},
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
                await this.getData()
                this.loading = false
                this.success = true
            },
            async getData(){
                let configName = 'apiRoutes.qlogistic.orderStatusHistories'
                let params = {
                    params:{
                        include: 'order,order.originBusiness,order.destinationBusiness,orderStatus,order.city,order.originBusiness.city,order.destinationBusiness.city,user',
                    },
                    refresh: true,
                }
                await this.$crud.show(configName, this.itemId, params).then(response => {
                    this.history = response.data
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                })
            }
        }
    }
</script>

<style scoped>

</style>
