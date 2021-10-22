<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
      right-icon="close"
      center
    >
      <div v-if="isDeleteShow">
        <span
          class="delete"
          @click="$emit('updateHistories', [])"
        >全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        slot="right-icon"
        name="delete"
        v-else
        @click="isDeleteShow = true"
      />
    </van-cell>

    <van-cell
      :title="history"
      center
      v-for="(history, index) in searchHistory"
      :key="index"
      @click="deleteItem(history, index)"
    >
      <van-icon
        name="close"
        v-if="isDeleteShow"
      />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    deleteItem (history, index) {
      if (this.isDeleteShow === true) {
        this.searchHistory.splice(index, 1)
        // setItem('searchHistories', this.searchHistory)
        return
      }

      this.$emit('search', history)
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .delete {
    margin-right: 10px;
  }
}
</style>
