<template>
    <div class="flex flex-center relative-position">
        <div class="full-width">
            <q-form class="form-content" @submit="create" autocorrect="off" autocomplete="off" ref="formContent" @validation-error="$alert.error($tr('ui.message.formInvalid'))">
                <div class="row" v-if="success">
                    <div class="col-12">
                        <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                    </div>
                    <div class="col-12 q-pb-md" v-if="locale.success">
                        <div class="row">
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
                                                                    <div class="text-h6 text-primary">{{ $tr('qlogistic.layout.orderCreation') }}</div>
                                                                </div>
                                                            </div>
                                                        </q-item-section>
                                                    </q-item>
                                                </q-list>
                                            </div>
                                        </div>
                                        <div class="row q-col-gutter-md q-pa-lg">
                                            <div class="col-12 col-md-3 q-pa-lg">
                                                <div class="text-subtitle1 text-uppercase text-bold">{{ $tr('qlogistic.layout.form.origin') }}:</div>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <div class="row q-col-gutter-md">
                                                    <div class="col-12">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.originBusiness') }}</div>
                                                        <q-select
                                                                input-class="origin-business-id"
                                                                v-if="business.length > 0"
                                                                :readonly="!$auth.hasAccess('ilogistics.orders.manageothers') || this.userBusinessId != null"
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                :loading="businessLoading"
                                                                v-model="locale.formTemplate.originBusinessId"
                                                                :options="businessOptions"
                                                                :label="$tr('qlogistic.layout.form.originBusinessName')"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @blur="getUsers"
                                                                @filter="(val, update)=>update(()=>{businessOptions = $helper.filterOptions(val,business,locale.formTemplate.originBusinessId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                        <div v-else>
                                                            {{ $tr('qlogistic.layout.message.businessNotFound') }} <q-btn rounded color="secondary" :label="$tr('ui.label.edit')" icon="fas fa-edit" :to="{name: 'qlogistic.business.edit'}" />
                                                        </div>
                                                    </div>
                                                    <div class="col-12" v-if="$auth.hasAccess('ilogistics.orders.manageothers')">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.label.user') }}</div>
                                                        <q-select
                                                                input-class="user-id"
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                multiple
                                                                :loading="userLoading"
                                                                v-model="locale.formTemplate.userId"
                                                                :options="usersOptions"
                                                                :label="$tr('ui.label.user')"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @filter="(val, update)=>update(()=>{usersOptions = $helper.filterOptions(val,users,locale.formTemplate.users)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <q-separator class="q-my-md"/>
                                        <div class="row q-col-gutter-md q-pa-lg">
                                            <div class="col-12 col-md-3 q-pa-lg">
                                                <div class="text-subtitle1 text-uppercase text-bold">{{ $tr('qlogistic.layout.form.destination') }}:</div>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <div class="row q-col-gutter-md">
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.province') }}</div>
                                                        <q-select
                                                                input-class="province-id"
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
                                                                input-class="city-id"
                                                                @blur="getDestinations"
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
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.hospitalary') }}:</div>
                                                        <q-select
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                :loading="hospLoading"
                                                                :options="hospOptions"
                                                                :label="$tr('qlogistic.layout.form.hospitalary')"
                                                                v-model="locale.formTemplate.destinationBusinessId"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @filter="(val, update)=>update(()=>{hospOptions = $helper.filterOptions(val,hosp,locale.formTemplate.destinationBusinessId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <q-separator class="q-my-md"/>
                                        <div class="row q-col-gutter-md q-pa-lg">
                                            <div class="col-12 col-md-3 q-pa-lg">
                                                <div class="text-subtitle1 text-uppercase text-bold">{{ $tr('qlogistic.layout.form.additionalInfo') }}:</div>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <div class="row q-col-gutter-md">
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.patient') }}:</div>
                                                        <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.patient')"
                                                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerName"/>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.patientDni') }}:</div>
                                                        <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.patientDni')"
                                                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerDni"/>
                                                    </div>
                                                </div>
                                                <div class="col-12 q-py-sm">
                                                    <div class="row">
                                                        <div class="col-8 col-md-9">
                                                            <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.package') }}:</div>
                                                        </div>
                                                        <div class="col-4 col-md-3 text-right">
                                                            <q-btn dense color="positive" icon="fas fa-plus" @click="()=> locale.form.orderItems.push(dataOrderItem)">
                                                                <q-tooltip>
                                                                    {{ $tr('qlogistic.layout.addItem') }}
                                                                </q-tooltip>
                                                            </q-btn>
                                                        </div>
                                                    </div>
                                                    <div class="row q-col-gutter-sm q-py-sm" v-for="(item,i) in locale.formTemplate.orderItems" :key="i">
                                                        <div class="col-3 col-md-4">
                                                            <q-input rounded  outlined dense :label="$tr('ui.form.name')" v-model="item.name"
                                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                                        </div>
                                                        <div class="col-3 col-md-4">
                                                            <q-input rounded  outlined dense :label="$tr('ui.label.description')" v-model="item.description"
                                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]" />
                                                        </div>
                                                        <div class="col-3">
                                                            <q-input rounded  outlined dense :label="$tr('ui.form.quantity')" v-model="item.quantity"
                                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]" type="number"/>
                                                        </div>
                                                        <div class="col-3 col-md-1">
                                                            <div class="col-12 text-right">
                                                                <q-btn dense color="negative" icon="fas fa-trash" @click="deleteItem(i)">
                                                                    <q-tooltip>
                                                                        {{ $tr('qlogistic.layout.deleteItem') }}
                                                                    </q-tooltip>
                                                                </q-btn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.observations') }}:</div>
                                                    <q-input rounded  outlined dense :label="$tr('qlogistic.layout.form.observations')" type="textarea"
                                                             :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.observations"/>
                                                </div>
                                                <div class="col-12 q-mt-md text-right">
                                                    <q-btn :disable="business.length <= 0" rounded no-caps color="positive" icon="fas fa-print" :label="$tr('qlogistic.layout.generateOrder')" type="submit" />
                                                </div>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>
                    </div>
                </div>
            </q-form>
        </div>
        <inner-loading :visible="loading" />
    </div>
</template>

<script>
    export default {
        name: "create",
        data(){
            return {
                locale: {},
                loading: false,
                loadingCategory: false,
                success: false,
                userLoading: false,
                users: [],
                usersOptions: [],
                businessLoading: false,
                business:[],
                businessOptions:[],
                provinces: [],
                cities: [],
                countriesOptions: [],
                provincesOptions: [],
                citiesOptions: [],
                hospLoading: false,
                hosp:[],
                hospOptions:[],
                provinceLoading: false,
                cityLoading: false,
                itemCreated: 0,
                userBusinessId: null,
            }
        },
        computed:{
            dataLocale(){
                return {
                    fields: {
                        customerDni: null,
                        observations: null,
                        customerName: null,
                        originBusinessId: null,
                        destinationBusinessId: null,
                        orderStatusId: 1,
                        cityId: null,
                        provinceId: null,
                        orderItems:[],
                        userId: this.$auth.hasAccess('ilogistics.orders.manageothers') ? null : this.$store.state.quserAuth.userData.id,
                    },
                    fieldsTranslatable:{
                    }
                }
            },
            dataOrderItem(){
                return {
                    name: null,
                    description: null,
                    quantity: 1,
                }
            },
            userData(){
                return this.$store.state.quserAuth.userData
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.$root.$emit('dataToHeader',this.$attrs)
                this.init()
            })
        },
        methods:{
            deleteItem(i){
                this.locale.form.orderItems.splice(i,1)
            },
            async init(){
                this.success = false
                this.loading = true
                this.locale = this.$clone(this.dataLocale)//Add fields
                if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
                this.success = true
                await this.getBusinessData()
                await this.getBusiness()
                await this.getProvinces()
                await this.getDestinations()
                if(this.userBusinessId!==null) {
                    this.locale.form.originBusinessId = this.userBusinessId
                    await this.getUsers()
                }
                this.success = true
                this.loading = false
            },

            async getBusinessData(){
                let businessData = this.userData.business || null
                if(businessData) {
                    this.business = this.$array.select([businessData], {label: 'name', id: 'id'})
                    this.userBusinessId = this.$clone(businessData.id)
                }else{
                    if(!this.$auth.hasAccess('ilogistics.orders.manageothers')) {
                        this.business = this.$array.select(this.userData.businesses, {label: 'name', id: 'id'})
                        if(this.userData.businesses.length>0)
                            this.userBusinessId = this.$clone(this.userData.businesses[0].id)
                    }
                }
            },
            //Search provinces
            async getBusiness() {
                let configName = 'apiRoutes.qlogistic.business'
                let params = {
                    params: {
                        filter: {
                            allTranslations: true,
                            type: 1
                        }
                    }
                }
                //Request
                if(this.$auth.hasAccess('ilogistics.orders.manageothers')){
                    this.businessLoading = true
                    await this.$crud.index(configName,params).then(response => {
                        this.business = this.$array.select(response.data, { label: 'name', id: 'id' })
                        this.businessOptions = this.$clone(this.business)
                        this.businessLoading = false
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                        this.businessLoading = false
                        this.hospLoading= false
                    })
                }else{
                    let businessData = this.$clone(this.userData.business)
                    if(businessData) {
                        this.business = this.$array.select([businessData], {label: 'name', id: 'id'})
                        this.businessOptions = this.$clone(this.business)
                    }else{
                        this.business = []
                        this.businessOptions = []
                    }
                    //this.locale.form.originBusinessId = this.$clone(this.userData.business.id)
                }
            },

            //Search provinces
            async getDestinations() {
                if(this.locale.form.provinceId !== null || this.locale.form.cityId !== null) {
                    let configName = 'apiRoutes.qlogistic.business'
                    let params = {
                        params: {
                            filter: {
                                allTranslations: true,
                                type: 2,
                            }
                        }
                    }

                    if (this.locale.form.provinceId !== null) {
                        params.params.filter.province = this.locale.form.provinceId
                    }
                    if (this.locale.form.cityId !== null) {
                        params.params.filter.city = this.locale.form.cityId
                    }
                    this.hospLoading = true
                    await this.$crud.index(configName, params).then(response => {
                        this.hosp = this.$array.select(response.data, {label: 'name', id: 'id'})
                        this.hospOptions = this.$clone(this.hosp)
                        this.hospLoading = false
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                        this.hospLoading = false
                    })
                }
            },

            //Search users
            async getUsers() {
                if(this.locale.form.originBusinessId){
                    this.userLoading = true
                    let configName = 'apiRoutes.qlogistic.business'
                    let params = {
                        params: {
                            include: 'users',
                            filter: {
                                allTranslations: true,
                            }
                        }
                    }
                    //Request
                    await this.$crud.show(configName,this.locale.form.originBusinessId,params).then(response => {
                        this.users = this.$array.select(response.data.users, { label: 'fullName', id: 'id' })
                        this.usersOptions = this.$clone(this.users)
                        this.userLoading = false
                    }).catch(error => {
                        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                        this.userLoading = false
                    })
                }else{
                    this.users = []
                    this.usersOptions = []
                }
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
               await this.$crud.index(configName,params).then(response => {
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
                if(typeof this.locale.form.provinceId != 'undefined'){
                    params.params.filter.province = this.locale.form.provinceId
                }
                //Request
                await this.$crud.index(configName,params).then(response => {
                    this.cities =  this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.citiesOptions = this.$clone(this.cities)
                    this.cityLoading = false
                    this.getDestinations()
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            },
            async create(){
                if (await this.$refs.localeComponent.validateForm()) {
                    this.loading = true
                    let configName = 'apiRoutes.qlogistic.orders'
                    await this.$crud.create(configName, this.getDataForm()).then(response => {
                        this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                        this.$router.push({name: 'qlogistic.orders.index'})
                        this.loading = false
                    }).catch(error => {
                        this.loading = false
                        this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
                    })
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

<style scoped>

</style>
