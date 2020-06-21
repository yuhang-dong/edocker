// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import VueRouter from 'vue-router'

const routes = [
  { 
    path: '/', 
    component:  resolve => require(['@/views/Login.vue'], resolve)
  },
  {
    path: '/main',
    component: resolve => require(['@/views/Detail.vue'],resolve),
    children:[
      {
        path: "/",
        name: "containerMain",
        component: resolve => require(['@/components/Container.vue'],resolve),
      },
      {
        path: "/details/:id",
        name: "containerDetails",
        component: resolve => require(['@/components/ContainerDetails.vue'],resolve),
      },
      {
        path: "/images",
        name: "images",
        component: resolve => require(['@/components/Image.vue'],resolve),
      }
    ]
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router