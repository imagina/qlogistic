export default {
    dashboard:{
        name: 'app.home',
        path: '/',
        title: 'qlogistic.sidebar.dashboard',
        icon: "fas fa-th",
        page: () => import('@imagina/qlogistic/_pages/admin/dashboard/index'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
    },
    businessShow: {
        permission: 'ibusiness.businesses.edit',
        activated: true,
        path: '/logistic/myBusiness',
        name: 'qlogistic.business.show',
        page: () => import('@imagina/qlogistic/_pages/admin/business/show'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.myBusiness',
        icon: 'fas fa-building',
        authenticated: true,
        props: {
            edit: {
                to: {
                    name: 'qlogistic.business.edit'
                }
            }
        }
    },
    businesses: {
        permission: 'ibusiness.businesses.manage',
        activated: true,
        path: '/logistic/businesses/index',
        name: 'qlogistic.businesses.index',
        page: () => import('@imagina/qlogistic/_pages/admin/businesses/index'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.businesses',
        icon: 'fas fa-building',
        authenticated: true,
    },
    businessesCreate: {
        permission: 'ibusiness.businesses.create',
        activated: true,
        path: '/logistic/businesses/create',
        name: 'qlogistic.businesses.create',
        page: () => import('@imagina/qlogistic/_pages/admin/businesses/form'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.businessesCreate',
        icon: 'fas fa-building',
        authenticated: true,
    },
    businessesEdit: {
        permission: 'ibusiness.businesses.edit',
        activated: true,
        path: '/logistic/businesses/:id',
        name: 'qlogistic.businesses.edit',
        page: () => import('@imagina/qlogistic/_pages/admin/businesses/form'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.businessesEdit',
        icon: 'fas fa-building',
        authenticated: true,
    },
    businessEdit: {
        permission: 'ibusiness.businesses.edit',
        activated: true,
        path: '/logistic/myBusiness/edit',
        name: 'qlogistic.business.edit',
        page: () => import('@imagina/qlogistic/_pages/admin/business/edit'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.myBusinessEdit',
        icon: 'fas fa-building',
        authenticated: true,
        props: {
            back: {
                to: {
                    name: 'qlogistic.business.show'
                }
            }
        }
    },
    ordersIndex:{
        permission: 'ilogistics.orders.index',
        activated: true,
        path: '/logistic/orders/index',
        name: 'qlogistic.orders.index',
        page: () => import('@imagina/qlogistic/_pages/admin/orders/index'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.adminOrders',
        icon: 'fas fa-circle',
        authenticated: true,
        props: {
            search: {
                title: 'Buscar Orden'
            },
            headerTitle: 'Órdenes / Listado'
        }
    },
    ordersCreate:{
        permission: 'ilogistics.orders.create',
        activated: true,
        path: '/logistic/orders/create',
        name: 'qlogistic.orders.create',
        page: () => import('@imagina/qlogistic/_pages/admin/orders/create'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.adminOrderCreate',
        icon: 'fas fa-circle',
        authenticated: true,
        props: {
            search: {
                title: 'Buscar Orden'
            },
            headerTitle: 'Órdenes / Crear Orden'
        }
    },
    ordersSearch:{
        permission: null,
        activated: true,
        path: '/logistic/orders/search',
        name: 'qlogistic.orders.search',
        page: () => import('@imagina/qlogistic/_pages/admin/orders/search'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.adminOrderSearch',
        icon: 'fas fa-circle',
        authenticated: true,
        props: {
            search: {
                title: 'qlogistic.sidebar.adminOrderSearch',
            },
            headerTitle: 'Órdenes / Buscar Orden'
        }
    },
    ordersSearchShow:{
        permission: null,
        activated: true,
        path: '/logistic/orders/search/:id',
        name: 'qlogistic.orders.searchShow',
        page: () => import('@imagina/qlogistic/_pages/admin/orders/search'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.adminOrderSearch',
        icon: 'fas fa-circle',
        authenticated: true,
        props: {
            search: {
                title: 'qlogistic.sidebar.adminOrderSearch',
            },
            headerTitle: 'Órdenes / Buscar Orden'
        }
    },
    ordersShow:{
        permission: null,
        activated: true,
        path: '/logistic/orders/:id',
        name: 'qlogistic.orders.show',
        page: () => import('@imagina/qlogistic/_pages/admin/orders/show'),
        layout: () => import('@imagina/qlogistic/_layouts/admin/master'),
        title: 'qlogistic.sidebar.adminOrderShow',
        icon: 'fas fa-circle',
        authenticated: true,
        props: {
            search: {
                title: 'qlogistic.sidebar.adminOrderSearch',
            },
        }
    },
}
