<template>
  <div id="masterHeader">
    <!-- HEADER -->
    <q-header class="no-shadow bg-grey-3 text-primary">
      <q-toolbar>
        <!--= BUTTON MENU =-->

        <q-btn flat dense round
               v-if="attribs.back && $q.platform.is.mobile"
               :to="attribs.back.to"
               aria-label="Back" icon="fas fa-arrow-left">
          <q-tooltip>
            Ir Atrás
          </q-tooltip>
        </q-btn>

        <q-btn flat dense round
               v-else
               @click="drawer.menu = !drawer.menu"
               aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <!--= TITLE =-->
        <q-toolbar-title class="items-center">
          <!--Toogle Menu-->
          <q-btn :label="$tr(attribs.headerTitle || $route.meta.title)" flat
                 @click="drawer.menu = !drawer.menu"
                 class="btn-page-title"
                 v-if="$q.platform.is.mobile"/>
        </q-toolbar-title>

        <!--== Button User ==-->
        <q-no-ssr>
          <q-btn :to="{name: 'user.profile.me'}" flat no-caps v-if="quserState.authenticated">
            <q-avatar size="25px">
              <img :src="quserState.userData.mainImage">
            </q-avatar>
            <div class="q-ml-xs">{{quserState.userData.firstName}}</div>
          </q-btn>
        </q-no-ssr>

        <!--== Button Config ==-->
        <!--<q-btn round dense flat icon="fas fa-cog"
               @click="drawer.config = !drawer.config">
        </q-btn>-->
      </q-toolbar>
      <q-toolbar class="bg-white desktop-only shadow-1">
        <q-toolbar-title>
          <div class="q-px-xl row">
            <div class="col-12 q-py-md col-md-7">
              {{ $tr(attribs.headerTitle || $route.meta.title) }}
            </div>
            <div class="col-12 col-md-5">
              <div class="row" v-if="attribs.search">
                <div class="col-9 col-lg-10 q-py-md">
                <q-input :label="$tr(attribs.search.title)" dense outlined rounded @change="search" v-model="searchValue">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
                </div>
                <div class="col-3 col-lg-2 q-px-sm">
                  <div class="filter-btn full-height flex flex-center">
                    <q-btn flat icon="fas fa-filter" color="primary" />
                  </div>
                </div>
              </div>
              <div class="full-width text-right q-py-md" v-if="attribs.edit">
                <q-btn rounded icon="fas fa-edit" :label="$tr('ui.label.edit')" color="secondary" :to="attribs.edit.to" />
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="bg-grey-3 mobile-only shadow-1 q-pa-none" style="height: 40px;min-height: 40px" v-if="attribs.search">
        <q-toolbar-title style="height: 40px;min-height: 40px">
          <div class="row">
            <div class="col-10 q-px-sm">
              <q-input dense input-class="text-primary q-pa-none" borderless @change="search" v-model="searchValue">
                <template v-slot:append>
                  <q-icon v-if="searchValue === ''" name="search" color="primary" />
                  <q-icon v-else name="clear" color="primary" class="cursor-pointer" @click="searchValue = ''" />
                </template>
              </q-input>
            </div>
            <div class="col-2 text-right">
              <q-btn icon="fas fa-filter" color="primary" class="no-border-radius no-shadow" size="16px" />
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- MENU -->
    <q-drawer bordered id="menu_master" class="no-shadow" v-model="drawer.menu">
      <!-- === LOGO === -->
      <div class="text-center q-pa-xl full-width" style="background-color: #074E89">
        <router-link :to="{ name: 'app.home'}" tag="a">
          <q-img :src="logo" />
        </router-link>
      </div>
      <!--= MENU =-->
      <menu-list :menu="menu"/>
    </q-drawer>
  </div>
</template>
<script>
  //import configList from './configList'
  import menuList from './recursiveItem'

  export default {
    props: {},
    components: {
      //configList,
      menuList
    },
    watch: {
      $route (to, from){
        this.attribs = null
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.$root.$on('dataToHeader',this.datatoHeader)
      })
    },
    data() {
      return {
        attribs:{},
        projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        drawer: {
          menu: false,
          config: false,
          notification: false
        },
        menu: config('sidebar'),
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
        searchValue: '',
      }
    },
    computed: {
      quserState() {
        return this.$store.state.quserAuth
      }
    },
    methods: {
      //Show drawer specific
      toggleDrawer(name, show) {
        //Hidden all drawers
        for (var drawer in this.drawer) {
          this.drawer[drawer] = false
        }
        this.drawer[name] = show//Show only drawer specific
      },
      datatoHeader(attrs){
        this.attribs = attrs
      },
      search(){
        this.$root.$emit('searchElement',this.searchValue)
      }
    }
  }
</script>
<style lang="stylus">
  #masterHeader
    img
      max-width 100% !important

    .q-toolbar-title
      padding 0 5px

      .btn-page-title
        padding 5px

        .q-icon
          background-color white
          border-radius 50%
          height 25px
          width 25px
          color white
          font-size 15px
          padding 5px
          margin-right 5px
          transition .5s

          &.on-right
            margin-left 5px
          @media screen and (max-width: $breakpoint-xs)
            display none

        &.menu-openend
          .q-icon
            transform rotate(90deg)

    .q-layout-drawer-delimiter
      box-shadow $shadow-1

    .button-profile-image
      height 25px
      width 25px
      border-radius 50%
      background-repeat no-repeat
      background-position center
      background-size cover
      margin-right 5px

  #menu_master
    .q-drawer
      //background-color $primary
    #listMenu
      hr
        background-color $primary
      .q-expansion-item__container
        .q-expansion-item__content
          padding 0 0 0 7px
          border-left 8px solid $primary
      .q-item
        padding 20px
        background-color $primary
        color: white
        border-top 1px solid #086EC1
        .q-icon
          color: #09395F
        &:hover
          background-color #086EC1

        &.item-is-active
          background-color #086EC1
  .filter-btn
    border-left 1px solid $grey-4

</style>
