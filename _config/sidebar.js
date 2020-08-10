const pages = config('pages') // Get Pages from config

//E-commerce
export default [
    pages.qlogistic.businessShow,
    {
        title: "Ordenes",
        icon: "fas fa-clipboard-list",
        children:[
            pages.qlogistic.ordersCreate,
            pages.qlogistic.ordersSearch,
            pages.qlogistic.ordersIndex,
        ]
    },
]