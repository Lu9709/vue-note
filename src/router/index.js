import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)
// 路由懒加载
export default new Router({
  routes: [
    {
      path:'/',
      alias:'/notebooks',
      component: ()=>import('@/components/NotebookList.vue')
      //重定向别名
    },
    {
      path: '/Login',
      component: ()=>import('@/components/Login.vue')
    }, {
      path: '/notebooks',
      component: ()=>import('@/components/NotebookList.vue')
    },
    {
      path: '/note',
      component: ()=>import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: ()=>import('@/components/TrashDetail.vue')
    }
  ]
})
