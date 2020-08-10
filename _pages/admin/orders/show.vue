<template>
    <div class="flex flex-center relative-position">
        <div class="row full-width q-pb-md q-px-sm">
            <div class="col-12">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section>
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
                                                    <div class="text-h6 text-secondary">Estado: Recibido</div>
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
        <div class="row full-width q-pa-sm">
            <div class="col-12 col-md-6">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section>
                        <div class="row q-pa-sm">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12 q-my-sm">
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">Origen:</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Nombre de la Empresa</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">Empresa</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Lorem Ipsum, Ibagué - Tolima</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">Dirección</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">Destino:</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Manizales - Caldas</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">Destino</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Nombre Institución</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">Red Hospitalaria</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1 text-bold text-uppercase q-pl-sm">Info Adicional:</div>
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />30</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">N°. de Piezas</div>
                                        <q-separator class="q-my-md" />
                                        <div class="text-subtitle1"><q-icon name="fas fa-circle" color="black" size="3px" class="q-mr-sm" />Embalaje</div>
                                        <div class="text-caption text-primary text-bold q-pl-sm">Embalaje</div>
                                    </div>
                                    <div class="col-12 q-my-md">
                                        <div class="text-subtitle2 text-bold text-primary">Observaciones</div>
                                        <div class="text-caption text-justify">
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                            magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                                            quis nostrud exerci tation ullamcorper suscipit lobortis nisl
                                            ut aliquip ex in vulputate velit esse molestie consequat,
                                            feugiat nulla facilisis at vero eros et accumsan et iusto .
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-right desktop-only">
                                <q-btn class="q-mr-sm" label="Generar QR" icon="fas fa-print" rounded color="primary" @click="()=>{showQRDialog = true}" />
                                <q-btn :label="$tr('ui.label.update')" icon="fas fa-save" rounded color="positive" @click="()=>{showUpdateDialog = true}" />
                            </div>
                            <q-page-sticky position="bottom-right" :offset="[18, 60]" class="mobile-only">
                                <q-btn class="q-mr-sm" label="Generar QR" icon="fas fa-print" rounded color="primary" @click="()=>{showQRDialog = true}" />
                                <q-btn :label="$tr('ui.label.update')" icon="fas fa-save" rounded color="positive" @click="()=>{showUpdateDialog = true}" />
                            </q-page-sticky>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-6">
                <div class="row q-px-lg">
                    <div class="col-12">
                        <div class="text-h6 text-primary text-bold q-mt-xl q-mx-md">Historial</div>
                        <orderHistory :id="itemId" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <updateDialog :item-id="itemId" v-model="showUpdateDialog" />
                <qrDialog :item-id="itemId" v-model="showQRDialog" />
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
        data(){
            return {
                form: {},
                itemId: null,
                showUpdateDialog: false,
                showQRDialog: false,
                loading: false,
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
                this.loading = true
                this.itemId = this.$route.params ? this.$route.params.id : null
                await this.getData()
                this.loading = false
            },
            async getData(){
                await this.$crud.index('apiRoutes.qlogistic.orders', this.itemId).then(response =>{
                    this.form = response.data
                }).catch(error =>{

                })
            }
        }
    }
</script>

<style scoped>

</style>