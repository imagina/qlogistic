<template>
  <q-layout view="lHh LpR lff" class="bg-grey-1">
    <!-- HEADER -->
    <header-component v-if="appState.loadPage" />

    <!-- ROUTER VIEW -->
    <q-page-container>
      <q-pull-to-refresh @refresh="refreshPage">
        <router-view v-if="appState.loadPage" class="layout-padding"/>
      </q-pull-to-refresh>
    </q-page-container>

    <!-- FOOTER -->
    <footer-componen v-if="appState.loadPage" />
  </q-layout>
</template>

<script>
  /*Components*/
  import headerComponent from '@imagina/qlogistic/_components/master/header'
  import footerComponen from '@imagina/qlogistic/_components/master/footer'

  export default {
    meta () {
      let routetitle = ((this.$route.meta && this.$route.meta.title) ? this.$route.meta.title : '')
      let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
      let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
      let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path

      return {
        title: `${this.$tr(routetitle)} | ${siteName}`,
        meta: {
          description: { name: 'description', content: siteDescription || siteName },
        },
        link: [{ rel: 'icon', href: iconHref, id: 'icon' }],
      }
    },
    components: {headerComponent, footerComponen},
    mounted () {
      this.$nextTick(async function () {
      })
    },
    data () {
      return {
      }
    },
    computed: {
      appState () {
        return this.$store.state.app
      }
    },
    methods: {
      async refreshPage(done){
        await this.$store.dispatch('app/REFRESH_PAGE')
        done()
      }
    }
  }
</script>
