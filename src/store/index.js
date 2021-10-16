import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 防止页面刷新丢失数据，为了持久化数据
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
