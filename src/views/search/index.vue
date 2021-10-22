<template>
  <div class="search-container">
      <form action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch(searchText)"
            @cancel="$router.back()"
            @focus="isResultShow = false"
        />
      </form>

      <SearchResult
        v-if="isResultShow"
        :search-text="searchText"
      />
      <SearchSuggestion
        v-else-if="searchText"
        :search-text="searchText"
        @search="onSearch"
      />
      <SearchHistory
        v-else
        :search-history="searchHistories"
        @search="onSearch"
        @updateHistories="searchHistories = $event"
      />
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchPage',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: [],
      isHistoryShow: true
    }
  },
  created () {
    this.loadSearchhistories()
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('searchHistories', this.searchHistories)
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str

      const index = this.searchHistories.indexOf(str)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(str)
      // 没登录
      //   setItem('searchHistories', this.searchHistories)
      this.isResultShow = true
    },

    loadSearchhistories () {
      const localSearchHistories = getItem('searchHistories')
      console.log(localSearchHistories)
      //   if (this.user) {
      //     try {
      //       const { data } = await getSearchHistories()
      //       localSearchHistories = [...new Set([...localSearchHistories], ...data.data.keywords)]
      //     } catch (error) {
      //       console.log(error.message)
      //     }
      //   }

      this.searchHistories = localSearchHistories
    }
  }
}
</script>

<style lang="less" scoped>

</style>
