<template>
    <vue-qr :text="text" :callback="test" :qid="id" :colorDark="selectedColor"></vue-qr>
</template>

<script>
    import VueQr from 'vue-qr'
    import { colors } from 'quasar'
    export default {
        name: "qrShow",
        components: {
            VueQr
        },
        props:{
            text:{
                required: true,
            },
            id:{
                default: '',
            },
            color:{
                default: colors.getBrand('primary')
            },
        },
        watch:{
          color(){
            this.getColor()
          }
        },
        data(){
            return {
                selectedColor: ''
            }
        },
        mounted(){
          this.$nextTick(()=>{
            this.getColor()
          })
        },
        methods:{
            getColor(){
                if(colors.getBrand(this.color))
                    this.selectedColor = colors.getBrand(this.color)
                else
                    this.selectedColor = this.color
            },
            test(url,id){
                this.$emit('input',{url: url, id: id})
            }
        }
    }
</script>

<style scoped>

</style>