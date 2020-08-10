<template>
    <div class="flex flex-center relative-position">
        <div class="full-width" v-if="success">
            <div class="row">
                <div class="col-12">
                    <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                </div>
            </div>
            <q-form @submit="save" autocorrect="off" autocomplete="off" ref="formContent" @validation-error="$alert.error($tr('ui.message.formInvalid'))" v-if="locale.success">
                <div class="row full-width q-py-sm">
                    <div class="col-12">
                        <q-card class="q-pa-md" style="border-radius: 10px">
                            <q-card-section>
                                <div class="row">
                                    <div class="col-12 col-md-3 q-pa-lg">
                                        <div class="text-subtitle1 text-uppercase text-bold">Informacion Empresa:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-md">
                                            <div class="col-6 col-md-5">

                                            </div>
                                            <div class="col-6 col-md-7">
                                                <q-input dense v-model="locale.formTemplate.facebookUrl">
                                                    <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="black" name="fab fa-facebook" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                    </template>
                                                </q-input>
                                                <q-input dense v-model="locale.formTemplate.instagramUrl">
                                                    <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="black" name="fab fa-instagram" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                    </template>
                                                </q-input>
                                                <q-input dense v-model="locale.formTemplate.twitterUrl">
                                                    <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="black" name="fab fa-twitter" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                    </template>
                                                </q-input>
                                                <q-input dense v-model="locale.formTemplate.youtubeUrl">
                                                    <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="black" name="fab fa-linkedin-in" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                    </template>
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="row q-col-gutter-x-md q-py-sm">
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.businessName') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.businessName')" v-model="locale.formTemplate.name"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.businessId') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.businessId')"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.nit" />
                                            </div>
                                            <div class="col-12">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.description') }}</div>
                                                <q-input rounded  outlined dense :label="`${$tr('ui.form.description')}`"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]" type="textarea"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Usuario</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="userLoading"
                                                        v-model="locale.formTemplate.userId"
                                                        :options="usersOptions"
                                                        label="Usuario"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{usersOptions = $helper.filterOptions(val,users,locale.formTemplate.userId)})"
                                                        option-label="label"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md" />
                                <div class="row q-col-gutter-md">
                                    <div class="col-12 col-md-3 q-pa-xl">
                                        <div class="text-subtitle1 text-uppercase text-bold">Contacto:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-x-md">
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.province') }}</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="provinceLoading"
                                                        :options="provincesOptions"
                                                        v-model="locale.formTemplate.provinceId"
                                                        :label="$tr('qlogistic.layout.form.province')"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @blur="getCities"
                                                        @filter="(val, update)=>update(()=>{provincesOptions = $helper.filterOptions(val,provinces,locale.formTemplate.provinceId)})"
                                                        option-label="label"
                                                />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlocations.layout.form.city') }}</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="cityLoading"
                                                        :options="citiesOptions"
                                                        v-model="locale.formTemplate.cityId"
                                                        :label="$tr('qlocations.layout.form.city')"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{citiesOptions = $helper.filterOptions(val,cities,locale.formTemplate.cityId)})"
                                                        option-label="label"
                                                />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.address') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('ui.form.address')"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.phone') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('ui.form.phone')" v-model="locale.formTemplate.phone"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.email') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.email')" v-model="locale.formTemplate.email"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.webUrl') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.webUrl')"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="text-right q-mt-sm col-12 desktop-only">
                                        <q-btn rounded color="positive" :loading="loading" type="submit"
                                               icon="fas fa-save" :label="$tr('ui.label.save')"/>
                                    </div>
                                </div>
                                <q-page-sticky position="bottom-right" :offset="[18, 18]" class="mobile-only">
                                    <q-btn rounded dense color="positive" :loading="loading" type="submit" size="sm" icon="fas fa-save" class="q-pa-sm">
                                        <q-tooltip>
                                            {{ $tr('ui.label.save') }}
                                        </q-tooltip>
                                    </q-btn>
                                </q-page-sticky>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </q-form>
        </div>
        <inner-loading :visible="loading" />
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
                locale: {},
                loading: false,
                loadingCategory: false,
                success: false,
                userLoading: false,
                users:[],
                usersOptions:[],
                provinces: [],
                cities: [],
                countriesOptions: [],
                provincesOptions: [],
                citiesOptions: [],
                provinceLoading: false,
                cityLoading: false,
            }
        },
        computed:{
            dataLocale(){
                return {
                    fields:{
                        nit: null,
                        description: null,
                        name: null,
                        email: null,
                        phone: null,
                        userId: null,
                        cityId: null,
                        provinceId: null,
                        webUrl: null,
                        facebookUrl: null,
                        instagramUrl: null,
                        twitterUrl: null,
                        youtubeUrl: null,
                    },
                    fieldsTranslatable:{
                    }
                }
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
                this.success = false
                this.loading = true
                this.locale = this.$clone(this.dataLocale)//Add fields
                if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
                this.getUsers()
                this.getProvinces()
                this.loading = false
                this.success = true
            },
            //Search users
            getUsers() {
                this.userLoading = true
                let configName = 'apiRoutes.quser.users'
                let params = {
                    params: {
                        filter: {
                            allTranslations: true,
                            country: 48,
                        }
                    }
                }
                /*if(typeof this.locale.form.countryId != 'undefined'){
                  params.params.filter.country = this.locale.form.countryId
                }*/
                //Request
                this.$crud.index(configName,params).then(response => {
                    this.users = this.$array.select(response.data, { label: 'fullName', id: 'id' })
                    this.usersOptions = this.$clone(this.users)
                    this.userLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.userLoading = false
                })
            },

            //Search provinces
            getProvinces() {
                this.provinceLoading = true
                let configName = 'apiRoutes.qlocations.provinces'
                let params = {
                    params: {
                        filter: {
                            allTranslations: true,
                            country: 48,
                        }
                    }
                }
                /*if(typeof this.locale.form.countryId != 'undefined'){
                  params.params.filter.country = this.locale.form.countryId
                }*/
                //Request
                this.$crud.index(configName,params).then(response => {
                    this.provinces = this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.provincesOptions = this.$clone(this.provinces)
                    this.provinceLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.provinceLoading = false
                })
            },

            //Search cities
            getCities(){
                this.cityLoading = true
                let configName = 'apiRoutes.qlocations.cities'
                let params = {
                    params: {
                        filter: {allTranslations: true}
                    }
                }
                if(typeof this.locale.form.provinceId != 'undefined'){
                    params.params.filter.province = this.locale.form.provinceId
                }
                //Request
                this.$crud.index(configName,params).then(response => {
                    this.cities =  this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.citiesOptions = this.$clone(this.cities)
                    this.cityLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            },
            getBusiness(){

            },
            save(){

            },
        }
    }
</script>

<style scoped>

</style>