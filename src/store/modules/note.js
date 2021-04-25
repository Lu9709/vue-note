import Note from '@/apis/notes'
import { Message } from 'element-ui'

const state = {
  notes: null,
  curNoteId: null
}

const getters = {
  notes: state => state.notes || [],

  curNote: state => {
    if(!Array.isArray(state.notes)) return {}
    if(!state.curNoteId) return state.notes[0]
    return state.notes.find(note => note.id == state.curNoteId) || {}
  }
}

const mutations = {
  setNote(state, payload) {
    state.notes = payload.notes
  },

  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },

  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  },

  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  },

  setCurNote(state, payload) {
    state.curNoteId = payload.curNoteId
  }

}

const actions = {
  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId })
      .then(res => {
        commit('setNote', { notes: res.data })
      })
  },

  addNote({ commit }, { notebookId, title, content }) {
    return Note.addNote({ notebookId }, { title, content })
      .then(res => {
        console.log('add success...', res)
        commit('addNote', { note: res.data })
      })
  },

  updateNote({ commit }, { noteId, title, content }) {
    return Note.updateNote({ noteId }, { title, content })
      .then(res => {
        commit('updateNote', { noteId, title, content })
      })
  },

  deleteNote({ commit }, { noteId }) {
    return Note.deleteNotebook({ noteId })
      .then(res => {
        commit('deleteNotebook', { noteId })
        Message.success(res.msg)
      })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
