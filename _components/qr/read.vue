<template>
    <div class="row">
        <div class="col-12">
            <p class="text-positive">{{ response }}</p>
            <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
        <div class="col-12 q-pa-sm">
            <!--<q-btn icon="fas fa-camera" @click="switchCamera" />-->
            <p class="text-negative">{{ error }}</p>
        </div>
    </div>
</template>
<script>
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
    export default {
        name: "read",
        components: {
            QrcodeStream,
            QrcodeDropZone,
            QrcodeCapture
        },
        data(){
            return {
                error: '',
                response: '',
            }
        },
        methods:{
            onDecode (result) {
               this.$emit('input',result)
            },

            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser"
                    } else {
                        this.error = "ERROR: "+error
                    }
                    this.$emit('error')
                }
            }
        }
    }
</script>

<style scoped>

</style>
