<template>
    <q-dialog v-model="show" no-esc-dismiss no-backdrop-dismiss no-route-dismiss content-class="q-container">
        <q-card style="border-radius: 10px;max-width: 480px;width:100%">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>
                    <span class="q-py-md">#0011</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section style="max-height: 85vh" class="scroll q-pa-lg">
                <div class="row">
                    <div class="col-12 text-secondary">
                        <q-icon name="fas fa-check-circle" color="secondary" class="q-mr-sm" /> Envío Nacional
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs">
                            <div><b>Ciudad Origen:</b> Ibagué</div>
                            <div><b>Envío:</b> Terrestre</div>
                            <div><b>Empresa de Envío:</b> Nombre</div>
                            <div><b>Ciudad Destino:</b> Manizales</div>
                        </div>
                        <div class="q-pa-xs">
                            <div><b>Hora: 08:00 am</b></div>
                        </div>
                        <div class="q-pa-xs">
                            <div><b>Modificado por:</b> Andrés Cruz</div>
                        </div>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs text-primary text-bold">
                            Observaciones
                        </div>
                        <div class="q-pa-xs text-justify">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                            magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                            quis nostrud exerci tation adipiscing elit, sed diam nonummy
                            nibh euismod tincidunt ut laoreet dolore magna .
                        </div>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="col-12">
                        <div class="q-pa-xs text-primary text-bold">
                            Soporte Fotográfico
                        </div>
                        <div class=" row q-pa-xs q-col-gutter-sm">
                            <div class="col-4">
                                <q-img src="statics/img001.jpg" />
                            </div>
                            <div class="col-4">
                                <q-img src="statics/img001.jpg" />
                            </div>
                            <div class="col-4">
                                <q-img src="statics/img001.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
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
            }
        }
    }
</script>

<style scoped>

</style>