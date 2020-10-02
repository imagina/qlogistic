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
                    <q-btn @click="drawer.filter = !drawer.filter" flat icon="fas fa-filter" color="primary">
                      <q-tooltip>
                        {{ $tr('ui.label.filter') }}
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="full-width text-right q-py-md" v-if="attribs.edit">
                <q-btn rounded icon="fas fa-edit" :label="attribs.edit.label ? $tr('ui.label.edit') : $tr(attribs.edit.label)" color="secondary" :to="attribs.edit.to" />
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="bg-grey-3 mobile-only shadow-1 q-pa-none" style="height: 40px;min-height: 40px" v-if="attribs.search">
        <q-toolbar-title style="height: 40px;min-height: 40px">
          <div class="row">
            <div class="col-10 q-px-sm">
              <q-input dense input-class="text-primary q-pa-none" borderless @blur="search" @keyup.enter="search" v-model="searchValue">
                <template v-slot:append>
                  <q-icon v-if="searchValue === ''" name="search" color="primary" />
                  <q-icon v-else name="clear" color="primary" class="cursor-pointer" @click="searchValue = ''" />
                </template>
              </q-input>
            </div>
            <div class="col-2 text-right">
              <q-btn @click="drawer.filter = !drawer.filter" icon="fas fa-filter" color="primary" class="no-border-radius no-shadow" size="16px">
                <q-tooltip>
                  {{ $tr('ui.label.filter') }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- MENU -->
    <q-drawer bordered id="menu_master" class="no-shadow bg-primary" content-class="bg-primary" v-model="drawer.menu">
      <!-- === LOGO === -->
      <div class="text-center q-pa-xl full-width" style="background-color: #074E89">
        <router-link :to="{ name: 'app.home'}" tag="a">
          <q-img :src="logo" />
        </router-link>
      </div>
      <!--= MENU =-->
      <menu-list :menu="menu"/>
    </q-drawer>

    <q-drawer bordered id="menuFilter" v-model="drawer.filter" side="right">
        <div class="q-pa-sm full-width">
            <div class="row">
              <div class="col-12 q-py-sm">
                <div class="text-primary text-h5">
                  {{ $tr('qlogistic.layout.label.orderFilter') }}
                </div>
              </div>
              <div class="col-12 q-py-sm">
                <dynamic-field v-model="filter.originBusiness" :field="{
                    type: 'select',
                    props:{
                      label: $tr('qlogistic.layout.form.originBusiness'),
                      clearable: true,
                    },
                    loadOptions: { //Async load options form request, only in types [select, multiSelect]
                        apiRoute: 'apiRoutes.qlogistic.business', //apiRoute to request
                        requestParams:{
                          filter:{
                            types:[1]
                          }
                        },
                        select: {label: 'name', id: 'id'}, //Define fields to config select
                    },
                }" />
              </div>
              <div class="col-12 q-py-sm">
                <dynamic-field type="select" v-model="filter.destinationBusiness" :field="{
                    type: 'select',
                    props:{
                      label: $tr('qlogistic.layout.form.destinationBusiness'),
                      clearable: true,
                    },
                    loadOptions: { //Async load options form request, only in types [select, multiSelect]
                        apiRoute: 'apiRoutes.qlogistic.business', //apiRoute to request
                        requestParams:{
                          filter:{
                            types:[2]
                          }
                        },
                        select: {label: 'name', id: 'id'}, //Define fields to config select
                    },
                }" />
              </div>
              <div class="col-12 q-py-sm">
                <dynamic-field type="select" v-model="filter.status" :field="{
                    type: 'select',
                    props:{
                      label: $tr('ui.form.status'),
                      clearable: true,
                    },
                    loadOptions: { //Async load options form request, only in types [select, multiSelect]
                        apiRoute: 'apiRoutes.qlogistic.orderStatuses', //apiRoute to request
                        select: {label: 'name', id: 'id'}, //Define fields to config select
                    },
                }" />
              </div>
              <div class="col-12 q-py-sm" v-if="$auth.hasAccess('profile.user.manage')">
                <dynamic-field type="select" v-model="filter.addedBy" :field="{
                    type: 'select',
                    props:{
                      label: $tr('ui.label.user'),
                      clearable: true,
                    },
                    loadOptions: { //Async load options form request, only in types [select, multiSelect]
                        apiRoute: 'apiRoutes.quser.users', //apiRoute to request
                        select: {label: 'fullName', id: 'id'}, //Define fields to config select
                    },
                }" />
              </div>
              <div class="col-12 q-py-sm text-center">
                  <q-btn @click="()=>{$root.$emit('filter',filter);drawer.filter = false}" icon="fas fa-filter" color="primary">
                    <q-tooltip>
                      {{ $tr('qlogistic.layout.label.filterOrders') }}
                    </q-tooltip>
                  </q-btn>
              </div>
            </div>
        </div>
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
        this.attribs = {}
        this.drawer.filter = false
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
          notification: false,
          filter: false,
        },
        filter:{
          originBusiness: null,
          destinationBusiness: null,
          status: null,
          addedBy: null,
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
        //this.$root.$emit('searchElement',this.searchValue)
        if(this.searchValue!=='') {
          this.$router.push({name: 'qlogistic.orders.searchShow', params: {id: this.searchValue}})
        }else{
          this.$router.back()
        }
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
