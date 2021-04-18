<template>
  <div id="note" class="detail">
    <note-sidebar  @update:notes="value=> notes = value"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ curNote.createdAtFriendly }}</span>
          <span> 更新日期:{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <label>
            <input type="text" v-model:value="curNote.title" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">
            <!--  keydown 键盘输入时监听          -->
          </label>
        </div>
        <div class="editor">
          <label>
            <textarea v-show="true" v-model:value="curNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入内容,支持 markdown 的语法"></textarea>
          </label>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from "@/components/NoteSidebar"
import Bus from '@/helpers/bus'
import _ from 'lodash'
import Notes from '@/apis/notes'
export default {
  components: {
    NoteSidebar
  },
  data() {
    return {
      curNote: {},
      notes: [],
      statusText:'笔记未改动'
    }
  },
  created() {
    Auth.getInfo().then(
      res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Bus.$once('update:notes',value=>{
      this.curNote = value.find(note=> note.id == this.$route.query.noteId) ||{}
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  },
  methods:{
    //节流
    updateNote: _.debounce(function() {
      Notes.updateNote({ noteId: this.curNote.id },
        { title: this.curNote.title, content: this.curNote.content })
        .then(data=>{
          this.statusText = '已保存'
        }).catch(data=>{
        this.statusText = '保存出错'
      })
    },300),
    // 300ms内用户输入的内容会合并成一个
    deleteNote(){
      Notes.deleteNote({noteId:this.curNote.id})
      .then(data=>{
        this.$message.success(data.msg)
        // 提示放入回收站弹窗
        this.notes.splice(this.notes.indexOf(this.curNote),1)
        // 删除之后要把notes从数组中删除
        this.$router.replace({path:'/note'})
        // 删除之后路由跳转到note页面 不停留在原页面
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
