<template>
    <div class="flex flex-center relative-position">
        <div class="full-width" v-if="success">
            <div class="row">
                <div class="col-12">
                    <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                </div>
            </div>
            <q-form @submit="save" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" ref="formContent" @validation-error="$alert.error($tr('ui.message.formInvalid'))" v-if="locale.success">
                <div class="row full-width q-py-sm">
                    <div class="col-12">
                        <q-card class="q-pa-md" style="border-radius: 10px">
                            <q-card-section>
                                <div class="row">
                                    <div class="col-12 col-md-3 q-pa-lg">
                                        <div class="text-subtitle1 text-uppercase text-bold">{{ $tr('qlogistic.layout.businessInfo') }}:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-md">
                                            <div class="col-6 col-md-5">
                                                <media-form
                                                    v-model="locale.formTemplate.mediasSingle"
                                                    entity="Modules\Ibusiness\Entities\Business"
                                                    :entityId="itemId || null"
                                                    zone='mainimage'
                                                />
                                            </div>
                                            <div class="col-6 col-md-7">
                                                <q-expansion-item
                                                    icon="fas fa-user-friends"
                                                    header-class="text-primary"
                                                    :label="$trp('ui.label.socialNetwork')"
                                                    dense
                                                    dense-toggle
                                                    expand-separator
                                                    expand-icon="fas fa-chevron-down"
                                                    expanded-icon="fas fa-chevron-up"
                                                    expand-icon-class="text-primary"
                                                >
                                                    <q-input dense v-model="locale.formTemplate.facebookUrl">
                                                        <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="primary" name="fab fa-facebook" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                        </template>
                                                    </q-input>
                                                    <q-input dense v-model="locale.formTemplate.instagramUrl">
                                                        <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="primary" name="fab fa-instagram" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                        </template>
                                                    </q-input>
                                                    <q-input dense v-model="locale.formTemplate.twitterUrl">
                                                        <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="primary" name="fab fa-twitter" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                        </template>
                                                    </q-input>
                                                    <q-input dense v-model="locale.formTemplate.youtubeUrl">
                                                        <template v-slot:prepend>
                                                        <span class="text-subtitle1">
                                                            <q-icon color="primary" name="fab fa-linkedin-in" class="q-mr-sm" size="xs" />/
                                                        </span>
                                                        </template>
                                                    </q-input>
                                                </q-expansion-item>
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
                                                         type="textarea" v-model="locale.formTemplate.description"/>
                                            </div>
                                            <!---<div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.label.user') }}</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        multiple
                                                        :loading="userLoading"
                                                        v-model="locale.formTemplate.users"
                                                        :options="usersOptions"
                                                        :label="$tr('ui.label.user')"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{usersOptions = $helper.filterOptions(val,users,locale.formTemplate.users)})"
                                                        option-label="label"
                                                />
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md" />
                                <div class="row q-col-gutter-md">
                                    <div class="col-12 col-md-3 q-pa-xl">
                                        <div class="text-subtitle1 text-uppercase text-bold">{{ $tr('ui.label.address') }}:</div>
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
                                                        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
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
                                                        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.address') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('ui.form.address')" v-model="locale.formTemplate.coords"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.phone') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('ui.form.phone')" v-model="locale.formTemplate.phone"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.email') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.email')" v-model="locale.formTemplate.email" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.webUrl') }}</div>
                                                <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.webUrl')"
                                                         v-model="locale.formTemplate.webUrl"
                                                 />
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
    import mediaForm from '@imagina/qmedia/_components/form'
    export default {
        name: "businessEdit",
        components:{
            mediaForm,
        },
        data(){
            return {
                success: false,
                itemId: null,
                locale: {},
                loading: false,
                loadingCategory: false,
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
                    fields: {
                        nit: null,
                        email: null,
                        phone: null,
                        users: [],
                        userId: this.userData.id,
                        cityId: null,
                        provinceId: null,
                        webUrl: null,
                        facebookUrl: null,
                        instagramUrl: null,
                        twitterUrl: null,
                        youtubeUrl: null,
                        coords: null,
                        mediasSingle: {},
                        typeId: 1,
                    },
                    fieldsTranslatable: {
                        description: null,
                        name: null,
                    }
                }
            },
            userData(){
                return this.$store.state.quserAuth.userData
            }
        },
        mounted(){
            this.$nextTick(async ()=>{
                this.$root.$emit('dataToHeader',this.$attrs)
                await this.init()
            })
        },
        methods:{
            async init(){
                this.success = false
                this.loading = true
                this.locale = this.$clone(this.dataLocale)//Add fields
                if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
                await this.getUsers()
                await this.getProvinces()
                await this.getData()
                await this.getCities()
                this.loading = false
                this.success = true
            },
            //get business data
            async getData() {
                if (this.userData.business) {
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
                            this.locale.form = this.$clone(dataForm)
                            this.locale.form.provinceId = parseInt(this.$clone(dataForm.city.provinceId))
                            this.locale.form.cityId = parseInt(this.$clone(dataForm.cityId))
                            this.locale.form.users = []
                            this.itemId = dataForm.id
                            for (let user of dataForm.users) {
                                this.locale.form.users.push(user.id)
                            }
                        }
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    })
                }
            },
            //Search users
            async getUsers() {
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
            async getProvinces() {
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
            async getCities(){
                this.cityLoading = true
                let configName = 'apiRoutes.qlocations.cities'
                let params = {
                    params: {
                        filter: {allTranslations: true}
                    }
                }
                if(typeof this.locale.form != 'undefined'){
                    params.params.filter.province = this.locale.form.provinceId
                    //Request
                    this.$crud.index(configName,params).then(response => {
                        this.cities =  this.$array.select(response.data, { label: 'name', id: 'id' })
                        this.citiesOptions = this.$clone(this.cities)
                        this.cityLoading = false
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    })
                }else{
                    this.cityLoading = false
                }
            },
            async save(){
                if (await this.$refs.localeComponent.validateForm()) {
                    this.loading = true
                    let configName = 'apiRoutes.qlogistic.business'
                    if (this.itemId === null) {
                        this.$crud.create(configName, this.getDataForm()).then(response => {
                            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                            this.itemId = response.data.id
                            this.loading = false
                            this.$store.dispatch('quserAuth/AUTH_UPDATE')
                        }).catch(error => {
                            this.loading = false
                            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                        })
                    } else {
                        this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
                            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
                            this.loading = false
                            this.$store.dispatch('quserAuth/AUTH_UPDATE')
                        }).catch(error => {
                            this.loading = false
                            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                        })
                    }
                }
            },
            getDataForm() {
                let response = this.locale.form
                for (var item in response) {
                    let valueItem = response[item]
                    if (valueItem == null || valueItem == undefined)
                        delete response[item]
                }
                //response.selectable = JSON.stringify(response.selectable)
                return response
            },
        }
    }
</script>

<style lang="stylus">
    .img-fluid
        width 100%
        height auto
</style>
