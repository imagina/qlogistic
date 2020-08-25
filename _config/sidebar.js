const pages = config('pages') // Get Pages from config

//E-commerce
export default [
    pages.qlogistic.businessShow,
    {
        title: "qlogistic.sidebar.adminGroup",
        icon: "fas fa-clipboard-list",
        translatable: false,
        children:[
            pages.qlogistic.ordersCreate,
            pages.qlogistic.ordersSearch,
            pages.qlogistic.ordersIndex,
        ]
    },
]
