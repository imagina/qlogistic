<template>
    <div class="flex flex-center relative-position">
        <div class="row" v-if="itemCreated > 0">

        </div>
        <div class="full-width" v-else-if="success">
            <div class="row q-py-sm">
                <div class="col-12">
                    <locales v-model="locale" ref="localeComponent" :form="$refs.formContent" />
                </div>
            </div>
            <q-form @submit="create" autocorrect="off" autocomplete="off" ref="formContent" @validation-error="$alert.error($tr('ui.message.formInvalid'))" v-if="locale.success">
                <div class="row full-width q-pb-md">
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
                                                            <div class="text-h6 text-primary">Creación de Orden</div>
                                                        </div>
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </div>
                                <div class="row q-col-gutter-md q-pa-lg">
                                    <div class="col-12 col-md-3 q-pa-lg">
                                        <div class="text-subtitle1 text-uppercase text-bold">ORIGEN:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-md">
                                            <div class="col-12">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Empresa de Origen</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="businessLoading"
                                                        v-model="locale.formTemplate.originBusinessId"
                                                        :options="businessOptions"
                                                        label="Nombre Empresa"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{businessOptions = $helper.filterOptions(val,business,locale.formTemplate.originBusinessId)})"
                                                        option-label="label"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md"/>
                                <div class="row q-col-gutter-md q-pa-lg">
                                    <div class="col-12 col-md-3 q-pa-lg">
                                        <div class="text-subtitle1 text-uppercase text-bold">DESTINO:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-md">
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Departamento</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="provinceLoading"
                                                        :options="provincesOptions"
                                                        v-model="locale.formTemplate.provinceId"
                                                        label="Departamento"
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
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Red Hospitalaria</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="hospLoading"
                                                        :options="hospOptions"
                                                        label="Red Hospitalaria"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{hospOptions = $helper.filterOptions(val,hosp,locale.formTemplate.hospitalaryId)})"
                                                        option-label="label"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md"/>
                                <div class="row q-col-gutter-md q-pa-lg">
                                    <div class="col-12 col-md-3 q-pa-lg">
                                        <div class="text-subtitle1 text-uppercase text-bold">INFO ADICIONAL:</div>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <div class="row q-col-gutter-md">
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Paciente:</div>
                                                <q-input rounded  outlined dense label="Paciente"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerName"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">N°. de Cédula:</div>
                                                <q-input rounded  outlined dense label="N°. de Cédula"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.customerDni"/>
                                            </div>
                                            <!--<div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">N°. de Piezas:</div>
                                                <q-input rounded  outlined dense label="N°. de Piezas"
                                                         :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="text-primary text-caption text-bold q-px-md q-py-sm">Embalaje:</div>
                                                <q-select
                                                        rounded
                                                        outlined
                                                        dense
                                                        use-chips
                                                        :loading="hospLoading"
                                                        :options="hospOptions"

                                                        label="Embalaje"
                                                        map-options
                                                        emit-value
                                                        use-input
                                                        @filter="(val, update)=>update(()=>{hospOptions = $helper.filterOptions(val,hosp,locale.formTemplate.hospitalaryId)})"
                                                        option-label="label"
                                                />
                                            </div>-->
                                        </div>
                                        <div class="col-12">
                                            <div class="text-primary text-caption text-bold q-px-md q-py-sm">Obsevaciones de Entrega y/o Recolección:</div>
                                            <q-input rounded  outlined dense label="Observaciones" type="textarea"
                                                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]" v-model="locale.formTemplate.observations"/>
                                        </div>
                                        <div class="col-12 q-mt-md text-right">
                                            <q-btn rounded no-caps color="positive" icon="fas fa-print" label="Generar Orden" type="submit" />
                                        </div>
                                    </div>
                                </div>
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
    export default {
        name: "create",
        data(){
            return {
                locale: {},
                loading: false,
                loadingCategory: false,
                success: false,
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
            }
        },
        computed:{
            dataLocale(){
                return {
                    fields:{
                        customerDni: null,
                        observations: null,
                        customerName: null,
                        originBusinessId: null,
                        orderStatusId: 1,
                        cityId: null,
                        provinceId: null,
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
                this.getBusiness()
                this.getProvinces()
                this.loading = false
                this.success = true
            },

            //Search provinces
            getBusiness() {
                this.businessLoading = true
                let configName = 'apiRoutes.qlogistic.business'
                let params = {
                    params: {
                        filter: {
                            allTranslations: true,
                        }
                    }
                }
                /*if(typeof this.locale.form.countryId != 'undefined'){
                  params.params.filter.country = this.locale.form.countryId
                }*/
                //Request
                this.$crud.index(configName,params).then(response => {
                    this.business = this.$array.select(response.data, { label: 'name', id: 'id' })
                    this.businessOptions = this.$clone(this.business)
                    this.businessLoading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.businessLoading = false
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
            async create(){
                if (await this.$refs.localeComponent.validateForm()) {
                    this.loading = true
                    let configName = 'apiRoutes.qlogistic.orders'
                    this.$crud.create(configName, this.getDataForm()).then(response => {
                        this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
                        this.itemCreated = response.data.id
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