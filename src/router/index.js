import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'
import HelloWorld from "@/components/HelloWorld"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: HelloWorld
    },
    {
      path: '/Login',
      component: Login
    }, {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note/',
      component: NoteDetail
    },
    {
      path: '/trash/',
      component: TrashDetail
    }
  ]
})
