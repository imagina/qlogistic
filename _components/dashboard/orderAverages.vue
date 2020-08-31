<template>
  <q-card class="q-pa-lg" style="border-radius: 10px">
    <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.orderAverage') }}</div>
    <q-separator class="q-my-md" />
    <highCharts :options="chartOptions"></highCharts>
    <inner-loading :visible="loading"/>
  </q-card>
</template>
<script>
  import {Chart} from 'highcharts-vue';
  export default {
    name: 'OrderAverages',
    components: {
      highCharts: Chart
    },
    mounted(){
      this.$nextTick(()=>{
        this.init()
      })
    },
    data(){
      return {
        loading: false,
        chartOptions: {
          chart: {
            type: "column",
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
              text: this.$tr('qlogistic.layout.orderAverage'),
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
              name: "Promedio de Ordenes por Mes",
              data: []
            }
          ]
        },
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
        await this.getMonthAverage()
        this.loading = false
      },
      async getMonthAverage(){
        let month = new Date();
        let monthNames = []
        let monthSeries = {
          name: this.$tr('qlogistic.layout.orderAverage'),
          data: []
        }
        for(let x=0;x<=month.getMonth();x++){
          let monthName = this.$trd(new Date(month.getFullYear(),x,1),{type: 'month'})
          monthNames.push(monthName)
          let monthNumber = x+1
          let params = {
            params:{
              filter:{
                date:{
                  from: month.getFullYear()+'-'+monthNumber.toString().padStart(2,'0')+'-01',
                  to: month.getFullYear()+'-'+monthNumber.toString().padStart(2,'0')+'-31',
                }
              }
            }
          }
          await this.$crud.index('apiRoutes.qlogistic.orders',params).then(response =>{
            monthSeries.data.push(response.data.length)
          }).catch(error => {
            dataOrders.push(0)
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })
        }
        console.log(monthSeries)
        console.log(monthNames)
        this.chartOptions.xAxis.categories = monthNames
        this.chartOptions.series = monthSeries
      }
    },
  }
</script>
