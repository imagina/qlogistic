<template>
    <div class="flex flex-center relative-position" v-if="showSearch === false">
        <div class="row q-pa-sm full-width justify-center">
            <div class="col-12 col-md-8">
                <q-card class="q-pa-xs text-white bg-primary" style="border-radius: 10px">
                    <q-card-section>
                        <div class="row">
                            <div class="col-9 col-md-10">
                                <q-icon name="fas fa-clipboard-list" size="14px" color="white" class="q-mr-md" /> <span class="text-body2">Orden:</span>
                            </div>
                            <div class="col-3 col-md-2 text-right">
                                # {{ itemId.toString().padStart(5,'0') }}
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row q-pa-sm full-width q-pb-md justify-center">
            <div class="col-12 col-md-8">
                <q-card style="border-radius: 10px">
                    <q-card-section class="q-pa-none">
                        <orderHistory :id="itemId" />
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
    <div class="flex flex-center relative-position" v-else>
        <div class="row full-width">
            <div class="col-12">
                <q-card class="q-pa-md" style="border-radius: 10px">
                    <q-card-section>
                        <div class="text-subtitle1 text-bold text-primary q-mb-md">
                            <q-icon name="fas fa-clipboard-list" size="16px" /> {{ $tr('ui.form.code') }}
                        </div>
                        <div class="text-center q-pa-lg">
                            <p>
                                <qrRead @input="redirectTo" v-if="showQR" @error="showQR = false" />
                                <q-input v-else dense outlined v-model="itemId" @blur="$router.push({name: 'qlogistic.orders.searchShow',params:{id: itemId}})" />
                            </p>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderHistory from "@imagina/qlogistic/_components/orders/orderHistory";
    import qrRead from '@imagina/qlogistic/_components/qr/read'
    export default {
        name: "search",
        components: {OrderHistory, qrRead},
        watch:{
            '$route'(){
                this.init()
            }
        },
        data(){
            return {
                itemId: null,
                showSearch: true,
                showQR: true,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            init(){
                this.$root.$emit('dataToHeader',this.$attrs)
                /*this.$root.$off('searchElement')
                this.$root.$on('searchElement',this.search)*/
                this.itemId = this.$route.params.id || null
                if(this.itemId!==null) {
                    this.showSearch = false
                    this.search()
                }else{
                    this.showSearch= true
                }
            },
            async search(){
                let params = {
                    params:{
                        include: 'items'
                    }
                }
                await this.$crud.show('apiRoutes.qlogistic.orders', this.itemId, params).then(response =>{
                    this.showSearch = false
                }).catch(error =>{
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.showSearch = true
                })
            },
            redirectTo(response){
                this.$router.push({name: 'qlogistic.orders.searchShow',params:{id: response}})
            }
        }
    }
</script>

<style scoped>

</style>
