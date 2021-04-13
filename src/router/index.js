import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import Trash from '@/components/Trash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Login'
    },
    {
      path: '/Login',
      component: Login
    }, {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note/:noteId',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      component: Trash
    }
  ]
})
