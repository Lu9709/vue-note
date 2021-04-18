<template>
  <div id="note" class="detail">
    <note-sidebar  @update:notes="value=> notes = value"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ curNote.createdAtFriendly }}</span>
          <span> 更新日期:{{ curNote.updatedAtFriendly }}</span>
          <span>{{ curNote.statusText }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <label>
            <input type="text" v-model="curNote.title" placeholder="输入标题">
          </label>
        </div>
        <div class="editor">
          <label>
            <textarea v-show="true" :value="curNote.content" placeholder="输入内容,支持 markdown 的语法"></textarea>
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
export default {
  components: {
    NoteSidebar
  },
  data() {
    return {
      curNote: {},
      notes: []
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
