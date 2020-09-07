<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          apiRoute: 'apiRoutes.qlogistic.business',
          permission: 'ibusiness.businesses',
          create: {
            title: this.$tr('qlogistic.layout.newBusiness'),
            to: {name: 'qlogistic.businesses.create'}
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'rigth'},
              {name: 'nit', label: this.$tr('qlogistic.layout.form.businessId'), field: 'nit', align: 'rigth'},
              {
                name: 'city', label: this.$tr('ui.form.city'), field: 'city', align: 'rigth',
                format: val => val ? val.name + ' '+val.province.name : '-',
              },
              {
                name: 'type', label: this.$tr('ui.form.type'), field: 'type', align: 'rigth',
                format: val => val ? val.name : '-',
              },
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'city,city.province,type',
            }
          },
          update: {
            title: this.$tr('qlogistic.layout.updateBusiness'),
            to: 'qlogistic.businesses.edit'
          },
          delete: true,
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    }
  }
</script>
