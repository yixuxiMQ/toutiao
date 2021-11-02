<template>
  <div class="post-comment">
      <van-popup
        v-model="show"
        position="bottom"
        class="popup-wrap"
      >
        <div class="file-wrap">
            <van-field
                v-model.trim="message"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入评论"
                show-word-limit
            />
            <van-button
                size="mini"
                class="post-btn"
                @click="onPost"
                :disabled="!message"
            >发布</van-button>
        </div>
      </van-popup>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: String,
      required: true
    },
    articleId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      show: false,
      message: ''
    }
  },
  methods: {
    onShowPopup () {
      this.show = true
    },

    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      const { data } = await postComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId ? this.articleId : null
      })
      this.$emit('post-success', data.data.new_obj)
      this.show = false
      this.$toast.success('发布成功')
      this.message = ''
      this.$emit('updateComment')
    }
  }
}
</script>

<style lang="less" scoped>
.file-wrap {
    padding: 14px;
    display: flex;
    align-items: center;
    .post-btn {
        width: 50px;
    }
}
</style>
