<template>
  <div id="masterFooter" class="fixed-bottom">
    <!-- === FOOTER === -->
    <q-footer class="no-shadow mobile-only">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row q-container">
            <div class="col-4">
              <q-btn size="10px" flat no-caps color="white" :to="{name: 'app.home'}" :class="'full-width text-center no-border-radius'+(this.$route.name==='app.home'?' btn-active':'')">
                  <div class="col-12 text-center q-pt-xs">
                    <q-icon name="fas fa-th" />
                  </div>
                  <div class="col-12 text-center">
                    Panel
                  </div>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn size="10px" flat no-caps color="white" :to="{name: 'qlogistic.orders.index'}" :class="'full-width text-center no-border-radius'+(this.$route.name==='logistic.orders.index'?' btn-active':'')">
                  <div class="col-12 text-center q-pt-xs">
                    <q-icon name="fas fa-clipboard-list" />
                  </div>
                  <div class="col-12 text-center">
                    Ordenes
                  </div>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn size="10px" flat no-caps color="white" :to="{name: 'user.profile.me'}" :class="'full-width text-center no-border-radius'+(this.$route.name==='user.profile.me'?' btn-active':'')">
                  <div class="col-12 text-center q-pt-xs">
                    <q-icon name="fas fa-user" />
                  </div>
                  <div class="col-12 text-center">
                    Perfil
                  </div>
              </q-btn>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="stylus">
    #masterFooter
        .q-footer
            background-color #09395F
            .q-toolbar
                height 47px
                min-height 47px
                .btn-active
                    background-color #086EC1
</style>
