<template>
  <div class="commemt-list">
    <div>{{ type === 'a' ? '文章评论' : '所有回复' }}</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <comment-item
          v-for="(comment, index) in list"
          :key="index"
          :title="comment.content"
          :comment="comment"
          @reply-click="$emit('reply-click', $event)"
        />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 数组或对象的默认值必须通过函数返回
      default: () => []
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getComments({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })

      this.$emit('update-total-count', data.data.total_count)
      // 将数据放入列表中
      const { results } = data.data
      this.list.push(...results)

      // 关闭本次loading
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
