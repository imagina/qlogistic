<template>
  <q-card class="q-pa-lg" style="border-radius: 10px">
    <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.business') }}</div>
    <q-separator class="q-my-md" />
    <highCharts :options="chartOptions"></highCharts>
    <inner-loading :visible="loading"/>
  </q-card>
</template>
<script>
  import {Chart} from 'highcharts-vue';
  export default {
    name: 'BusinessChart',
    components: {
      highCharts: Chart
    },
    computed:{
      userData(){
        return this.$store.state.quserAuth.userData
      }
    },
    data(){
      return {
        loading: false,
        chartOptions: {
          chart: {
            type: "bar",
            height: 9 / 16 * 100 + "%", // 16:9 ratio
          },
          title: {
            text: ""
          },
          xAxis: {
            categories: [],
            title: {
              text: null
            }
          },
          yAxis: {
            gridLineWidth:0,//Set this to zero
            min: 0,
            title: {
              text: this.$tr('qlogistic.layout.orders'),
              align: "middle"
            },
            labels: {
              overflow: "justify"
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: "Empresas",
              data: []
            }
          ]
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.init()
      })
    },
    methods:{
      async init(){
        this.loading = true
        await this.getBusiness()
        this.loading = false
      },
      async getBusiness(){
        let params = {
          params: {
            include: 'orders',
            filter: {
              allTranslations: true,
              types:[1]
            }
          }
        }
        await this.$crud.index('apiRoutes.qlogistic.business',params).then(response => {
          let business = this.$clone(response.data)
          let businessSeries = {
            name: this.$tr('qlogistic.layout.orders'),
            data: []
          }
          for(let x in business){
            businessSeries.data.push(business[x].orders ? business[x].orders.length : 0)
            this.chartOptions.xAxis.categories.push(business[x].name)
          }
          this.chartOptions.series = [businessSeries]
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      },
    },
  }
</script>
