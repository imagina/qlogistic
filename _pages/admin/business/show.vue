<template>
    <div class="flex flex-center relative-position">
        <div class="full-width" v-if="Object.keys(form).length > 0">
            <div class="row full-width q-pb-md">
                <div class="col-12 q-pa-sm">
                    <q-card class="q-pa-md" style="border-radius: 10px">
                        <q-card-section>
                            <div class="row q-col-gutter-sm">
                                <div class="col-12 col-md-5" v-if="$q.platform.is.desktop">
                                    <q-img :src="form.mainImage.path" v-if="form.mainImage" />
                                </div>
                                <div :class="'col-12'+($q.platform.is.desktop?' col-md-7':'')">
                                    <q-list>
                                        <q-item>
                                            <q-item-section avatar style="width: 30px" class="items-baseline">
                                                <div class="col-12 q-py-md">
                                                    <q-icon name="fas fa-building" size="xs" color="primary" class="q-mt-sm" />
                                                </div>
                                            </q-item-section>
                                            <q-item-section class="items-baseline">
                                                <div class="row q-py-md full-width">
                                                    <div class="col-12">
                                                        <div class="text-h6 text-primary q-mb-md">{{ form.name || 'Nombre Empresa' }}</div>
                                                        <div class="row q-col-gutter-md">
                                                            <div :class="'col-12'+($q.platform.is.mobile?' col-md-5':'')">
                                                                <div class="q-py-md" v-if="$q.platform.is.mobile">
                                                                    <q-img :src="form.mainImage.path" v-if="form.mainImage" />
                                                                </div>
                                                            </div>
                                                            <div :class="'col-12'+($q.platform.is.mobile?' col-md-7':'')">
                                                                <div>
                                                                    <q-btn type="a" size="sm" flat dense color="secondary" icon="fab fa-facebook" :href="form.facebookUrl || ''" target="_blank" />
                                                                    <q-btn type="a" size="sm" flat dense color="secondary" icon="fab fa-instagram" :href="form.instagramUrl || ''" target="_blank" />
                                                                    <q-btn type="a" size="sm" flat dense color="secondary" icon="fab fa-twitter" :href="form.twitterUrl || ''" target="_blank" />
                                                                    <q-btn type="a" size="sm" flat dense color="secondary" icon="fab fa-linkedin-in" :href="form.youtubeUrl || ''" target="_blank" />
                                                                </div>
                                                                <q-separator class="q-my-md" />
                                                                <div class="text-caption text-justify">
                                                                    {{ form.description }}
                                                                </div>
                                                            </div>
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
                            <div class="text-h6 text-primary q-mb-md">{{ $tr('ui.label.contact') }}</div>
                            <q-separator class="q-my-md" />
                            <div class="row q-pa-sm">
                                <div class="col-12">
                                    <q-list>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="far fa-address-card" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('qlogistic.layout.form.businessId') }}</div>
                                                <div class="text-caption">{{ form.nit || '' }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-map-marker-alt" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('qlogistic.layout.form.province') }}</div>
                                                <div class="text-caption">{{ form.city.province ? form.city.province.name : '' }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-map-marker-alt" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('ui.form.city') }}</div>
                                                <div class="text-caption">{{ form.city ? form.city.name : '' }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-map-marker-alt" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('ui.form.address') }}</div>
                                                <div class="text-caption">{{ form.coords }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-phone" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('ui.form.phone') }}</div>
                                                <div class="text-caption">{{ form.phone }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-envelope" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('ui.form.email') }}</div>
                                                <div class="text-caption">{{ form.email }}</div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-my-md">
                                            <q-item-section avatar>
                                                <q-icon name="fas fa-globe" color="primary" />
                                            </q-item-section>
                                            <q-item-section>
                                                <div class="text-caption text-bold text-primary">{{ $tr('qlogistic.layout.form.webUrl') }}</div>
                                                <div class="text-caption">{{ form.webUrl }}</div>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 col-md-6 q-pa-sm">
                    <recentOrders />
                </div>
            </div>
        </div>
        <div v-else>
            <not-result/>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 35]">
            <q-btn no-caps rounded dense icon="fas fa-plus" class="q-pa-sm mobile-only" size="sm" color="primary" :to="{name: 'qlogistic.orders.create'}">
                <q-tooltip>
                    {{ $tr('qlogistic.layout.ordersCreate') }}
                </q-tooltip>
            </q-btn>
            <q-btn no-caps rounded icon="fas fa-plus" class="q-pa-sm desktop-only" size="sm" color="primary" :label="$tr('qlogistic.layout.ordersCreate')" :to="{name: 'qlogistic.orders.create'}" />
            <div>&nbsp;</div>
            <q-btn no-caps rounded icon="fas fa-clipboard-list" class="q-pa-sm desktop-only" size="sm" color="positive" :label="$tr('qlogistic.layout.ordersShow')" :to="{name: 'qlogistic.orders.index'}" />
        </q-page-sticky>
        <q-page-sticky position="top-right" :offset="[18, 18]" class="mobile-only">
            <q-btn rounded dense icon="fas fa-edit" class="q-pa-sm" size="sm" color="secondary" v-if="this.$attrs.edit" :to="this.$attrs.edit.to">
                <q-tooltip>
                    {{ $tr('ui.label.edit') }}
                </q-tooltip>
            </q-btn>
        </q-page-sticky>
        <inner-loading :visible="loading"/>
    </div>
</template>

<script>
    import recentOrders from "@imagina/qlogistic/_components/business/recentOrders";
    import NotResult from "@imagina/qlogistic/_components/master/notResults";
    export default {
        name: "businessShow",
        components:{
            NotResult,
            recentOrders
        },
        computed:{
          userData(){
              return this.$store.state.quserAuth.userData
          }
        },
        data(){
            return {
                form: {},
                loading: false,
                success: false,
                itemId: null,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            async init(){
                let attrs = this.$attrs
                if(this.userData.business)
                    attrs.edit.label = 'ui.label.create'
                this.$root.$emit('dataToHeader',attrs)
                this.getData()
            },
            async getData(){
                this.success = false
                this.loading = true
                if(this.userData.business) {
                    let configName = 'apiRoutes.qlogistic.business'
                    let params = {
                        params: {
                            include: 'city,users,city.province',
                            filter: {
                                allTranslations: true,
                            }
                        }
                    }
                    //Request
                    await this.$crud.show(configName, this.userData.business.id, params).then(response => {
                        if (Object.keys(response.data).length > 0) {
                            let dataForm = this.$clone(response.data)
                            this.form = this.$clone(dataForm)
                            this.itemId = dataForm.id
                        }
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    })
                }
                this.success = true
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
