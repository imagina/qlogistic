<template>
    <q-dialog v-model="show" no-backdrop-dismiss no-route-dismiss content-class="q-container" v-bind="this.$q.platform.is.mobile?{fullHeight: true,maximized: true}:{}">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <q-btn flat round dense icon="fas fa-arrow-left" v-close-popup class="mobile-only q-mr-sm" />
                    <span class="q-py-md">Generar Codigo QR</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup class="desktop-only" />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
                <div class="row q-col-gutter-md">
                    <div class="col-12 text-center" id="printQR">
                        <qr :text="itemId" />
                    </div>
                    <div class="col-12 q-py-sm">
                        <q-btn class="q-mr-sm" icon="fas fa-print" rounded color="primary" @click="printQR">
                            <q-tooltip>
                                Imprimir
                            </q-tooltip>
                        </q-btn>
                    </div>
                </div>
            </q-card-section>
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
            }
        },
        methods:{
            initForm(){
                this.show = this.value//Assign props value to show modal
            },
            printQR(){
                this.$htmlToPaper('printQR')
            }
        }
    }
</script>

<style scoped>

</style>