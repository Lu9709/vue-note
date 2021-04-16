<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate">
        <i class="iconfont icon-plus"></i> 新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表{{notebooks.length}}</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">3天前</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteBooks from '@/apis/notebooks'

export default {
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo().then(
      res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      }
    )
    NoteBooks.getAll().then(res=>{
      this.notebooks = res.data
    })
  },
  methods: {
    onCreate() {
      let title = window.prompt('创建笔记本')
      if(title.trim()===''){ //trim去除空字符串
        alert('笔记本名不能为空')
        return
      }
      NoteBooks.addNoteBook({title})
      .then(res=>{
        console.log(res)
        this.notebooks.unshift(res.data) //unshift添加至数组头
        alert(res.msg)
      })
    },
    onEdit(notebook) {
      console.log('onEdit',notebook)
      let title = window.prompt('修改标题',notebook.title) //第二个参数展示默认值
      NoteBooks.updateNotebook(notebook.id,{title})
      .then(res =>{
        console.log(res)
        notebook.title = title //直接修改编辑的notebook的title 不然要重新刷新页面才会渲染
        alert(res.msg)
      })
    },
    onDelete(notebook) {
      console.log('onDelete',notebook)
      let isConfirm = window.confirm('你确定要删除吗?')
      if(isConfirm){
        NoteBooks.deleteNotebook(notebook.id)
        .then(res=>{
          console.log(res)
          this.notebooks.splice(this.notebooks.indexOf(notebook),1)
          //获取notebook的下标然后splice
          alert(res.msg)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
