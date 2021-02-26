import { createStore } from 'vuex'
import MutationTypes from '@/store/mutation-types'

export default createStore({
  state: {
    source: [],
    activePage: null,
    activeRecord: null
  },
  mutations: {
    // 添加一页
    [MutationTypes.ADD_PAGE] (state, payload) {
      state.source.push(payload.page)
    },
    // 移除一页
    [MutationTypes.REMOVE_PAGE] (state, payload) {
      const pageIndex = state.source.findIndex(page => page.id === payload.id)
      if (~pageIndex) {
        state.source.splice(pageIndex, 1)
      }
    },
    // 设置激活页
    [MutationTypes.SET_ACTIVE_PAGE] (state, payload) {
      const { index, id } = payload
      if (index && index >= 0) {
        state.activePage = state.source[index]
      }
      if (id) {
        state.activePage = state.source.find(page => page.id === id)
      }
    },
    // 更新页信息
    [MutationTypes.UPDATE_PAGE] (state, payload) {
      const { index, id, page } = payload
      if (index && index >= 0) {
        state.source.splice(index, 1, page)
      }
      if (id) {
        const target = state.source.find(item => item.id === id)
        Object.assign(target, page)
      }
    },
    // 添加一条记录
    [MutationTypes.ADD_RECORD] (state, payload) {
      if (!state.activePage) return
      state.activePage.children.push(payload.record)
    },
    // 移除一条记录
    [MutationTypes.REMOVE_RECORD] (state, payload) {
      if (!state.activePage) return
      const recordIndex = state.activePage.children.findIndex(record => record.id === payload.id)
      if (~recordIndex) {
        state.activePage.children.splice(recordIndex, 1)
      }
    },
    // 设置激活记录
    [MutationTypes.SET_ACTIVE_RECORD] (state, payload) {
      if (!state.activePage) return
      const { index, id } = payload
      if (index && index >= 0) {
        state.activeRecord = state.activePage.children[index]
      }
      if (id) {
        state.activeRecord = state.activePage.children.find(record => record.id === id)
      }
    },
    // 更新记录
    [MutationTypes.UPDATE_RECORD] (state, payload) {
      if (!state.activePage) return
      const { index, id, record } = payload
      if (index && index >= 0) {
        state.activePage.children.splice(index, 1, record)
      }
      if (id) {
        const target = state.activePage.children.find(item => item.id === id)
        Object.assign(target, record)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
