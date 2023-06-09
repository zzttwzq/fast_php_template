import TabsView from '@/layouts/tabs/TabsView'
import PageView from '@/layouts/PageView'

// 全局路由配置
// 内容路由需要添加在 首页 下面，如果要显示在侧边栏则需要添加 
// meta: {
//   invisible: true
// }
const routesConfig = [{
        path: '/login',
        name: '登录页',
        component: () =>
            import ('@/pages/login/Login')
    },
    {
        path: '*',
        name: '404',
        component: () =>
            import ('@/pages/exception/404'),
    },
    {
        path: '/403',
        name: '403',
        component: () =>
            import ('@/pages/exception/403'),
    }, {
        path: '/',
        name: '首页',
        component: TabsView,
        redirect: '/login',
        children: [{
                path: '/home',
                name: '首页',
                meta: {
                    icon: 'user'
                },
                component: () =>
                    import ('@/pages/home/'),
            },

            {
                path: "/learn1",
                name: "学习内容",
                meta: {
                    icon: "user"
                },
                component: PageView,
                children: [{
                    path: "/list",
                    name: "学习内容",
                    meta: {
                        icon: "user"
                    },
                    component: () =>
                        import ("@/pages/Learn/"),
                }]
            },

            //### 自动生成的Router
            //### 自动生成的Routers
        ]
    },
];

const options = {
    routes: routesConfig
}

export default options