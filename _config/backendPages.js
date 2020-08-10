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
        permission: null,
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
    businessEdit: {
        permission: null,
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
        permission: null,
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
        permission: null,
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