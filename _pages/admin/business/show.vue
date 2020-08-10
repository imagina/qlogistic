<template>
    <div class="flex flex-center relative-position">
        <div class="row full-width q-pb-md">
            <div class="col-12 q-pa-sm">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section>
                        <div class="row">
                            <div class="col-12 col-md-5 desktop-only">
                                <q-img :src="form.mainImage.path" v-if="form.mainImage" />
                            </div>
                            <div class="col-12 col-md-7">
                                <q-list>
                                    <q-item>
                                        <q-item-section avatar style="width: 30px" class="items-baseline">
                                            <div class="col-12 q-py-md">
                                                <q-icon name="fas fa-building" size="xs" color="primary" class="q-mt-sm" />
                                            </div>
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="row q-py-md">
                                                <div class="col-12">
                                                    <div class="text-h6 text-primary q-mb-md">{{ form.name || 'Nombre Empresa' }}</div>
                                                    <div class="q-py-md mobile-only">
                                                        <q-img :src="form.mainImage.path" v-if="form.mainImage" />
                                                    </div>
                                                    <div>
                                                        <q-btn size="sm" flat dense color="secondary" icon="fab fa-facebook" />
                                                        <q-btn size="sm" flat dense color="secondary" icon="fab fa-instagram" />
                                                        <q-btn size="sm" flat dense color="secondary" icon="fab fa-twitter" />
                                                        <q-btn size="sm" flat dense color="secondary" icon="fab fa-linkedin-in" />
                                                    </div>
                                                    <q-separator class="q-my-md" />
                                                    <div class="text-caption text-justify">
                                                        {{ form.description || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex in vulputate velit esse molestie consequat, feugiat nulla facilisis at vero eros et accumsan et iusto.' }}
                                                    </div>
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
        <div class="row full-width q-py-sm">
            <div class="col-12 col-md-6 q-pa-sm">
                <q-card class="q-pa-lg" style="border-radius: 10px">
                    <q-card-section>
                        <div class="text-h6 text-primary q-mb-md">Información de Contacto</div>
                        <q-separator class="q-my-md" />
                        <div class="row q-pa-sm">
                            <div class="col-12">
                                <q-list>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="far fa-address-card" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">NIT</div>
                                            <div class="text-caption">{{ form.nit || '000000000000000' }}</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-map-marker-alt" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">Departamento</div>
                                            <div class="text-caption">{{ form.province ? form.province.name : 'Tolima' }}</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-map-marker-alt" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">{{ $tr('ui.form.city') }}</div>
                                            <div class="text-caption">{{ form.city ? form.city.name : 'Ibagué' }}</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-map-marker-alt" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">Dirección</div>
                                            <div class="text-caption">Calle 20 4-56</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-phone" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">{{ $tr('ui.form.phone') }}</div>
                                            <div class="text-caption">{{ form.phone || '00000000000000' }}</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-envelope" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">{{ $tr('ui.form.email') }}</div>
                                            <div class="text-caption">{{ form.email || 'mail@miempresa.com' }}</div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="q-my-md">
                                        <q-item-section avatar>
                                            <q-icon name="fas fa-globe" color="primary" />
                                        </q-item-section>
                                        <q-item-section>
                                            <div class="text-caption text-bold text-primary">Sitio Web</div>
                                            <div class="text-caption">{{ form.webUrl || 'www.nombreempresa.com' }}</div>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-6 q-pa-sm">
                <recentOrders :id="itemId" />
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn no-caps rounded dense icon="fas fa-plus" class="q-pa-sm mobile-only" size="sm" color="primary" :to="{name: 'qlogistic.orders.create'}">
                <q-tooltip>
                    Crear Orden
                </q-tooltip>
            </q-btn>
            <q-btn no-caps rounded icon="fas fa-plus" class="q-pa-sm desktop-only" size="sm" color="primary" label="Crear Orden" :to="{name: 'qlogistic.orders.create'}" />
            <div>&nbsp;</div>
            <q-btn no-caps rounded icon="fas fa-clipboard-list" class="q-pa-sm desktop-only" size="sm" color="positive" label="Ver Órdenes" />
        </q-page-sticky>
        <q-page-sticky position="top-right" :offset="[18, 18]" class="mobile-only">
            <q-btn rounded dense icon="fas fa-edit" class="q-pa-sm" size="sm" color="secondary" v-if="this.$attrs.edit" :to="this.$attrs.edit.to">
                <q-tooltip>
                    {{ $tr('ui.label.edit') }}
                </q-tooltip>
            </q-btn>
        </q-page-sticky>
    </div>
</template>

<script>
    import recentOrders from "@imagina/qlogistic/_components/business/recentOrders";
    export default {
        name: "businessShow",
        components:{
            recentOrders
        },
        data(){
            return {
                form: {}
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            async init(){
                this.$root.$emit('dataToHeader',this.$attrs)
            },
            async getData(){

            }
        }
    }
</script>

<style scoped>

</style>