<template>
  <div class="flex flex-center relative-position">
    <div class="row justify-end full-width q-py-sm">
      <div class="col-4 col-lg-3 q-px-sm">
          <orders label="Total de Ordenes" />
      </div>
      <div class="col-4 col-lg-3 q-px-sm">
        <orders label="Ordenes en Progreso" :status="1" color="negative" />
      </div>
      <div class="col-4 col-lg-3 q-px-sm">
        <orders label="Ordenes Completadas" :status="2" color="orange" />
      </div>
    </div>
    <div class="row q-col-gutter-y-md full-width q-py-md">
      <div class="col-12 col-md-6 q-px-sm">
        <div class="row q-col-gutter-y-md">
          <div class="col-12">
            <activeOrders />
          </div>
          <div class="col-12">
            <q-card class="q-pa-lg" style="border-radius: 10px">
              <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.orderAverage') }}</div>
              <q-separator class="q-my-md" />
              <highCharts :options="chartOptionsOrders"></highCharts>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-px-sm">
          <div class="row q-col-gutter-y-md">
              <div class="col-12">
                <featuredSupporters />
              </div>
              <div class="col-12">
                <q-card class="q-pa-lg" style="border-radius: 10px">
                    <div class="text-h6 text-primary q-mb-md">{{ $tr('qlogistic.layout.business') }}</div>
                    <q-separator class="q-my-md" />
                    <highCharts :options="chartOptionsOrders2"></highCharts>
                </q-card>
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
  import activeOrders from "@imagina/qlogistic/_components/dashboard/activeOrders";
  import featuredSupporters from "@imagina/qlogistic/_components/dashboard/featuredSupporters";
  import {Chart} from 'highcharts-vue';
  export default {
    name: 'PageIndex',
    components: {
      orders,
      activeOrders,
      featuredSupporters,
      highCharts: Chart
    },
    mounted(){
      this.$nextTick(()=>{
        this.$root.$emit('dataToHeader',this.$attrs)
      })
    },
    data(){
      return {
        chartOptionsOrders: {
          chart: {
            type: "column",
            height: 9 / 16 * 100 + "%" // 16:9 ratio
          },
          title: {
            text: ""
          },
          xAxis: {
            categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            title: {
              text: null
            }
          },
          yAxis: {
              gridLineWidth:0,//Set this to zero
              min: 0,
              title: {
                  text: "Ordenes",
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
              data: [107, 31, 635, 203, 20]
            }
          ]
        },
        chartOptionsOrders2: {
            chart: {
                type: "bar",
                height: 9 / 16 * 100 + "%" // 16:9 ratio
            },
            title: {
                text: ""
            },
            xAxis: {
                categories: ["", "", "", "", ""],
                title: {
                    text: null
                }
            },
            yAxis: {
                gridLineWidth:0,//Set this to zero
                min: 0,
                title: {
                    text: "Empresas",
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
                    data: [100, 20, 300, 203, 50]
                }
            ]
        }
      }
    }
  }
</script>
