<template>
  <div class="search-suggestion">
      <van-cell
        icon="search"
        center
        v-for="(item, index) in suggestion"
        :key="index"
        @click="$emit('search', item)"
      >
        <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  methods: {
    highLight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      const tpl = `<span style="color: red">${this.searchText}</span>`
      return str.replace(reg, tpl)
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.searchText)
        let suggestion = data.data.options
        this.suggestion = suggestion[0] === null ? suggestion = [] : suggestion
      }, 200),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
