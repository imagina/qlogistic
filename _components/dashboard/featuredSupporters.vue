<template>
    <q-card class="q-pa-lg relative-position" style="border-radius: 10px">
        <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.featuredSupporters') }}</div>
        <q-separator class="q-my-md" />
        <q-list v-if="users.length >0 ">
            <q-item class="q-my-md" v-for="(user,index) in users" :key="index">
                <q-item-section avatar class="q-pr-sm">
                    <q-avatar style="width: 80px;height: 80px">
                        <img :src="user.mediumImage" />
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-subtitle1 text-bold">
                        {{ user.fullName }}
                    </q-item-label>
                    <q-item-label class="text-primary text-caption text-bold">
                        Ordenes Procesadas: {{ user.addedOrders.length || 0 }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <div v-else>
            <notResults />
        </div>
        <inner-loading :visible="loading" />
    </q-card>
</template>

<script>
    import notResults  from '@imagina/qlogistic/_components/master/notResults'
    export default {
        name: "featuredSupporters",
        components:{
          notResults
        },
        data(){
            return {
                users: [],
                loading: false
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
                let configName = 'apiRoutes.quser.users'
                let params = {
                    params: {
                        include: 'addedOrders',
                        filter: {
                            allTranslations: true,
                            roleSlug: 'fastlog-colaborador'
                        }
                    }
                }
                //Request
                this.$crud.index(configName,params).then(response => {
                    this.users = response.data
                    this.loading = false
                }).catch(error => {
                    this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
