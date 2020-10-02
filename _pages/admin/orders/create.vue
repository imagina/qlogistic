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
                                                                :readonly="!$auth.hasAccess('ilogistics.orders.manageothers')"
                                                                input-class="origin-business-id"
                                                                @blur="()=>{getOriginBusiness();getUsers()}"
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
                                                                @filter="(val, update)=>update(()=>{businessOptions = $helper.filterOptions(val,business,locale.formTemplate.originBusinessId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                    </div>
                                                    <div class="col-12" v-if="$auth.hasAccess('ilogistics.orders.manageothers')">
                                                      <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.label.user') }}</div>
                                                        <q-select
                                                          input-class="user-id"
                                                          rounded
                                                          outlined
                                                          dense
                                                          use-chips
                                                          :loading="userLoading"
                                                          v-model="locale.formTemplate.userId"
                                                          :options="usersOptions"
                                                          :label="$tr('ui.label.user')"
                                                          map-options
                                                          emit-value
                                                          use-input
                                                          @filter="(val, update)=>update(()=>{usersOptions = $helper.filterOptions(val,users,locale.formTemplate.userId)})"
                                                          option-label="label"
                                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                      />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                      <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.province') }}</div>
                                                      <q-select
                                                          input-class="origin-province-id"
                                                          rounded
                                                          outlined
                                                          dense
                                                          use-chips
                                                          :loading="originProvinceLoading"
                                                          :options="originProvincesOptions"
                                                          v-model="locale.formTemplate.originProvinceId"
                                                          :label="$tr('qlogistic.layout.form.province')"
                                                          map-options
                                                          emit-value
                                                          use-input
                                                          @blur="getOriginCities"
                                                          @filter="(val, update)=>update(()=>{originProvincesOptions = $helper.filterOptions(val,originProvinces,locale.formTemplate.originProvinceId)})"
                                                          option-label="label"
                                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                      />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                      <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlocations.layout.form.city') }}</div>
                                                      <q-select
                                                          input-class="origin-city-id"
                                                          rounded
                                                          outlined
                                                          dense
                                                          use-chips
                                                          :loading="originCityLoading"
                                                          :options="originCitiesOptions"
                                                          v-model="locale.formTemplate.originCityId"
                                                          :label="$tr('qlocations.layout.form.city')"
                                                          map-options
                                                          emit-value
                                                          use-input
                                                          @filter="(val, update)=>update(()=>{originCitiesOptions = $helper.filterOptions(val,originCities,locale.formTemplate.originCityId)})"
                                                          option-label="label"
                                                          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                      />
                                                  </div>
                                                  <div class="col-12">
                                                    <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.address') }}</div>
                                                    <q-input rounded  outlined dense :label="$tr('ui.form.address')" v-model="locale.formTemplate.originAddress"
                                                             :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
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
                                                <div class="col-12">
                                                  <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.destinationBusiness') }}:</div>
                                                  <q-select
                                                      @blur="getDestinationBusiness"
                                                      input-class="destination-business-id"
                                                      rounded
                                                      outlined
                                                      dense
                                                      use-chips
                                                      :loading="hospLoading"
                                                      :options="hospOptions"
                                                      :label="$tr('qlogistic.layout.form.destinationBusiness')"
                                                      v-model="locale.formTemplate.destinationBusinessId"
                                                      map-options
                                                      emit-value
                                                      use-input
                                                      @filter="(val, update)=>update(()=>{hospOptions = $helper.filterOptions(val,hosp,locale.formTemplate.destinationBusinessId)})"
                                                      option-label="label"
                                                      :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                  />
                                                </div>
                                                <div class="row q-col-gutter-md">
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.province') }}</div>
                                                        <q-select
                                                                input-class="destination-province-id"
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                :loading="destinationProvinceLoading"
                                                                :options="destinationProvincesOptions"
                                                                v-model="locale.formTemplate.destinationProvinceId"
                                                                :label="$tr('qlogistic.layout.form.province')"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @blur="getDestinationCities"
                                                                @filter="(val, update)=>update(()=>{destinationProvincesOptions = $helper.filterOptions(val,destinationProvinces,locale.formTemplate.destinationProvinceId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlocations.layout.form.city') }}</div>
                                                        <q-select
                                                                input-class="destination-city-id"
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                :loading="destinationCityLoading"
                                                                :options="destinationCitiesOptions"
                                                                v-model="locale.formTemplate.destinationCityId"
                                                                :label="$tr('qlocations.layout.form.city')"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @filter="(val, update)=>update(()=>{destinationCitiesOptions = $helper.filterOptions(val,destinationCities,locale.formTemplate.destinationCityId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                        />
                                                    </div>
                                                    <div class="col-12">
                                                      <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('ui.form.address') }}</div>
                                                      <q-input name="address" rounded  outlined dense :label="$tr('ui.form.address')" v-model="locale.formTemplate.destinationAddress"
                                                               :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
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
                                                        <q-input name="customerName" rounded  outlined dense :label="$tr('qlogistic.layout.form.patient')"
                                                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerName"/>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.patientDni') }}:</div>
                                                        <q-input name="customerDni" rounded  outlined dense :label="$tr('qlogistic.layout.form.patientDni')"
                                                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerDni"/>
                                                    </div>
                                                </div>
                                                <div class="col-12 q-py-sm">
                                                    <div class="row">
                                                        <div class="col-8 col-md-9">
                                                            <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.package') }}:</div>
                                                        </div>
                                                        <div class="col-4 col-md-3 text-right">
                                                            <q-btn class="item-add-btn" dense color="positive" icon="fas fa-plus" @click="()=> locale.form.orderItems.push(dataOrderItem)">
                                                                <q-tooltip>
                                                                    {{ $tr('qlogistic.layout.addItem') }}
                                                                </q-tooltip>
                                                            </q-btn>
                                                        </div>
                                                    </div>
                                                    <q-field borderless v-model="locale.formTemplate.orderItems" :rules="[val => val.length > 0 || $tr('ui.message.fieldRequired')]" >
                                                      <div class="col-12">
                                                        <div class="row q-col-gutter-sm q-py-sm" v-for="(item,i) in locale.formTemplate.orderItems" :key="i">
                                                          <div class="col-3 col-md-4">
                                                            <!---<q-input rounded  outlined dense :label="$tr('ui.form.name')" v-model="item.name"
                                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>-->
                                                            <q-select
                                                                :input-class="'package-type-'+i"
                                                                rounded
                                                                outlined
                                                                dense
                                                                use-chips
                                                                :options="item.packageOptions"
                                                                :label="$tr('ui.form.type')"
                                                                v-model="item.packagingTypeId"
                                                                map-options
                                                                emit-value
                                                                use-input
                                                                @filter="(val, update)=>update(()=>{item.packageOptions = $helper.filterOptions(val,item.packages,item.packagingTypeId)})"
                                                                option-label="label"
                                                                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                            />
                                                          </div>
                                                          <div class="col-3 col-md-4">
                                                            <q-input :name="'packageDescription'+i" rounded  outlined dense :label="$tr('ui.label.description')" v-model="item.description"
                                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]" />
                                                          </div>
                                                          <div class="col-3">
                                                            <q-input :name="'packageQuantity'+i" rounded  outlined dense :label="$tr('ui.form.quantity')" v-model="item.quantity"
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
                                                    </q-field>
                                                </div>
                                                <div class="col-12">
                                                    <div class="text-primary text-caption text-bold q-px-md q-py-sm">{{ $tr('qlogistic.layout.form.observations') }}:</div>
                                                    <q-input name="observations" rounded  outlined dense :label="$tr('qlogistic.layout.form.observations')" type="textarea"
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
                originProvinces: [],
                originCities: [],
                originProvincesOptions: [],
                originCitiesOptions: [],
                destinationProvinces: [],
                destinationCities: [],
                destinationProvincesOptions: [],
                destinationCitiesOptions: [],
                hospLoading: false,
                hosp:[],
                hospOptions:[],
                originProvinceLoading: false,
                originCityLoading: false,
                destinationProvinceLoading: false,
                destinationCityLoading: false,
                itemCreated: 0,
                userBusinessId: null,
                destinationBusiness: null,
                originBusiness: null,
                packageTypes:[],
            }
        },
        computed:{
            dataLocale(){
                return {
                    fields: {
                        customerDni: null,
                        observations: null,
                        customerName: null,
                        originBusinessId: this.userData.business ? this.userData.business.id : this.userData.businesses.length > 0 ? this.userData.businesses[0].id : null,
                        destinationBusinessId: null,
                        orderStatusId: 1,
                        originCityId: null,
                        originProvinceId: null,
                        originAddress: null,
                        destinationCityId: null,
                        destinationProvinceId: null,
                        destinationAddress: null,
                        orderItems:[],
                        userId: this.$auth.hasAccess('ilogistics.orders.manageothers') ? null : this.userData.id,
                        addedById: this.userData.id,
                    },
                    fieldsTranslatable:{
                    }
                }
            },
            dataOrderItem(){
                return {
                    packagingTypeId: null,
                    description: null,
                    quantity: 1,
                    packageOptions: this.packageTypes,
                    packages: this.packageTypes,
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
                await this.getOriginBusiness()
                await this.getDestinations()
                await this.getPackageTypes()
                this.loading = false
            },

            async getBusinessData(){
                let businessData = this.userData.business || null
                if(businessData) {
                    this.business = this.$array.select([businessData], {label: 'name', id: 'id'})
                }else{
                    if(!this.$auth.hasAccess('ilogistics.orders.manageothers')) {
                        this.business = this.$array.select(this.userData.businesses, {label: 'name', id: 'id'})
                        if(this.userData.businesses.length>0)
                            this.locale.form.originBusinessId = this.$clone(this.userData.businesses[0].id)
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
                            types: [1]
                        }
                    }
                }
                //Request
                if(this.$auth.hasAccess('ibusiness.businesses.index')){
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
                }
            },
            //Search origin business
            async getOriginBusiness() {
              if(this.locale.form.originBusinessId!==null) {
                let configName = 'apiRoutes.qlogistic.business'
                let params = {
                  refresh: true,
                  params: {
                    include: 'city',
                    filter: {
                      allTranslations: true,
                    }
                  }
                }
                await this.$crud.show(configName, this.locale.form.originBusinessId, params).then(async response => {
                  this.originBusiness = this.$clone(response.data)
                  this.locale.form.originAddress = this.originBusiness.coords
                  this.locale.form.originProvinceId = parseInt(this.originBusiness.city.provinceId)
                  await this.getOriginCities()
                  this.locale.form.originCityId = parseInt(this.originBusiness.cityId)
                }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
              }
            },

            //Search destination business
            async getDestinationBusiness() {
              if(this.locale.form.destinationBusinessId!==null) {
                let configName = 'apiRoutes.qlogistic.business'
                let params = {
                  refresh: true,
                  params: {
                    include: 'city',
                    filter: {
                      allTranslations: true,
                    }
                  }
                }
                await this.$crud.show(configName, this.locale.form.destinationBusinessId, params).then(async response => {
                  this.destinationBusiness = this.$clone(response.data)
                  this.locale.form.destinationAddress = this.destinationBusiness.coords
                  this.locale.form.destinationProvinceId = parseInt(this.destinationBusiness.city.provinceId)
                  await this.getDestinationCities()
                  this.locale.form.destinationCityId = parseInt(this.destinationBusiness.cityId)
                }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
              }
            },

            //Search provinces
            async getDestinations() {
                let configName = 'apiRoutes.qlogistic.business'
                let params = {
                    params: {
                        filter: {
                            allTranslations: true,
                            types: [2],
                        }
                    }
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
                this.originProvinceLoading = true
                this.destinationProvinceLoading = false
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
                    this.originProvinces = this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.originProvincesOptions = this.$clone(this.originProvinces)
                    this.destinationProvinces = this.$clone(this.originProvinces)
                    this.destinationProvincesOptions = this.$clone(this.originProvinces)
                    this.destinationProvinceLoading = false
                    this.originProvinceLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.destinationProvinceLoading = false
                    this.originProvinceLoading = false
                })
            },

            //Search cities
            async getOriginCities(){
                this.originCityLoading = true
                let configName = 'apiRoutes.qlocations.cities'
                let params = {
                    params: {
                        filter: {allTranslations: true}
                    }
                }
                if(typeof this.locale.form.originProvinceId != 'undefined'){
                    if(this.locale.form.originProvinceId !== null)
                      params.params.filter.province = this.locale.form.originProvinceId
                }
                //Request
                await this.$crud.index(configName,params).then(response => {
                    this.originCities =  this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.originCitiesOptions = this.$clone(this.originCities)
                    this.originCityLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            },

            //Search cities
            async getDestinationCities(){
              this.destinationCityLoading = true
              let configName = 'apiRoutes.qlocations.cities'
              let params = {
                params: {
                  filter: {allTranslations: true}
                }
              }
              if(typeof this.locale.form.destinationProvinceId != 'undefined'){
                if(this.locale.form.destinationProvinceId !== null)
                  params.params.filter.province = this.locale.form.destinationProvinceId
              }
              //Request
              await this.$crud.index(configName,params).then(response => {
                this.destinationCities =  this.$array.select(response.data, { label: 'name', id: 'id' })
                this.destinationCitiesOptions = this.$clone(this.destinationCities)
                this.destinationCityLoading = false
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              })
            },

            //Search cities
            async getPackageTypes(){
              let configName = 'apiRoutes.qlogistic.packagingTypes'
              let params = {
                params: {
                  filter: {allTranslations: true}
                }
              }
              //Request
              await this.$crud.index(configName,params).then(response => {
                this.packageTypes =  this.$array.select(response.data, { label: 'name', id: 'id' })
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              })
            },

            async create(){
                if (await this.$refs.localeComponent.validateForm()) {
                    this.loading = true
                    let configName = 'apiRoutes.qlogistic.orders'
                    let form = this.getDataForm()
                    await this.$crud.create(configName, form).then(response => {
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
