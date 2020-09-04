<template>
    <div :class="'row order-content text-white bg-'+color" v-if="$q.screen.width > 640">
        <div class="col-3 col-md-5 q-pa-md text-right text-h4" style="background-color: rgba(0,0,0,0.3)">
            {{ orders.length }}
        </div>
        <div class="col-9 col-md-7 q-pa-md text-caption">
            {{ label }}
        </div>
    </div>
    <div :class="'row order-content text-white bg-'+color" v-else>
        <div class="col-6 q-pa-xs text-right text-h6" style="background-color: rgba(0,0,0,0.3)">
            {{ orders.length }}
        </div>
        <div class="col-6 q-pa-xs" style="font-size: 8px">
            {{ label }}
        </div>
    </div>
</template>
<script>
    export default {
        name: "orders",
        props: {
            status: {
                default: null
            },
            label: {
                default: "Total de Ordenes"
            },
            color:{
                default: "primary"
            }
        },
        computed:{
            userData(){
                return this.$store.state.quserAuth.userData
            }
        },
        data(){
            return {
                orders:[],
                loading: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods:{
            init(){
                this.loading = true
                this.getData()
                this.loading = false
            },
            async getData(){
                let params = {
                    params:{
                        include: 'orderStatus',
                        filter:{
                            status: this.status,
                            user: this.userData.id
                        }
                    }
                }
                await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
                    this.orders = response.data
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                })
            }
        }
    }
</script>

<style lang="stylus">
    .order-content
        border-radius 10px
        div:first-child
            border-top-left-radius: 10px
            border-bottom-left-radius: 10px
</style>
