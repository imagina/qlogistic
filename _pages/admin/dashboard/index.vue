<template>
  <div class="flex flex-center relative-position">
    <!-- TODO -->
    <div class="row justify-end full-width q-py-sm" v-if="$auth.hasAccess('ibusiness.businesses.me') || $auth.hasAccess('profile.user.create')">
      <div class="col-4 col-lg-3 q-px-sm">
          <orders label="Total de Ordenes" />
      </div>
      <div class="col-4 col-lg-3 q-px-sm">
        <orders label="Ordenes en Progreso" status="1,2,3,4" color="negative" />
      </div>
      <div class="col-4 col-lg-3 q-px-sm">
        <orders label="Ordenes Completadas" status="5" color="orange" />
      </div>
    </div>
    <div class="row q-col-gutter-y-md full-width q-py-md" v-if="$auth.hasAccess('ibusiness.businesses.me') || $auth.hasAccess('profile.user.create')">
      <div class="col-12 col-md-6 q-px-sm">
        <div class="row q-col-gutter-y-md">
          <div class="col-12">
            <activeOrders />
          </div>
          <div class="col-12">
              <orderAverages />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-px-sm">
          <div class="row q-col-gutter-y-md">
              <div class="col-12" v-if="$auth.hasAccess('profile.user.create')">
                <featuredSupporters />
              </div>
              <div class="col-12" v-if="$auth.hasAccess('ibusiness.businesses.create')">
                <businessChart />
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

</style>

<script>
  import orders from '@imagina/qlogistic/_components/dashboard/orders'
  import orderAverages from '@imagina/qlogistic/_components/dashboard/orderAverages'
  import businessChart from '@imagina/qlogistic/_components/dashboard/businessChart'
  import activeOrders from "@imagina/qlogistic/_components/dashboard/activeOrders";
  import featuredSupporters from "@imagina/qlogistic/_components/dashboard/featuredSupporters";
  export default {
    name: 'PageIndex',
    components: {
      orders,
      activeOrders,
      featuredSupporters,
      orderAverages,
      businessChart
    },
    mounted(){
      this.$nextTick(()=>{
        this.$root.$emit('dataToHeader',this.$attrs)
        this.init()
      })
    },
    data(){
      return {

      }
    },
    methods:{
      async init(){
      },
    }
  }
</script>
