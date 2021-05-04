<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="value=> notes = value"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
      <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
      <div class="note-detail-tc" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ curNote.createdAtFriendly }}</span>
          <span> 更新日期:{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <label>
            <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">
            <!--  keydown 键盘输入时监听          -->
          </label>
        </div>
        <div class="editor">
          <label>
            <textarea v-show="!isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"
                      @keydown="statusText='正在输入...'" placeholder="输入内容,支持 markdown 的语法"></textarea>
          </label>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NoteSidebar from "@/components/NoteSidebar"
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapGetters,mapActions,mapMutations} from 'vuex'
let md = new MarkdownIt();


export default {
  components: {
    NoteSidebar
  },
  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },
  created() {
   this.checkLogin({path:'/login'})
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote',
      'curBook'
    ]),
    previewContent() {
      // content为空需要进行处理
      return md.render(this.curNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      "setCurNote"
    ]),
    ...mapActions([
      "updateNote",
      "deleteNote",
      "checkLogin"
    ]),
    //节流
    onUpdateNote: _.debounce(function() {
      if(!this.curNote.id) return
      this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })
    }, 300),
    // 300ms内用户输入的内容会合并成一个

    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(data => {
          // this.$message.success(data.msg)
          // 提示放入回收站弹窗
          // this.notes.splice(this.notes.indexOf(this.curNote), 1)
          // 删除之后要把notes从数组中删除
          this.$router.replace({path: '/note'})
          // 删除之后路由跳转到note页面 不停留在原页面
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId:to.query.noteId})
    next()
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
