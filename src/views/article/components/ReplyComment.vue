<template>
  <div class="reply-comment" v-if="show">
      <van-popup
        v-model="show"
        position="bottom"
        class="popup-wrap"
      >
        <van-nav-bar :title="`${comment.reply_count}条回复`">
            <van-icon
                name="cross"
                slot="left"
                @click="show = false"
            />
        </van-nav-bar>
        <comment-item
            :comment="comment"
        />

        <comment-list
            :source="comment.com_id"
            type="c"
        ></comment-list>

        <div class="article-bottom">
          <van-button
            type="default"
            size="small"
            round
            class="comment-bnt"
            @click="onShowPopup"
          >写评论</van-button>
        </div>
        <post-comment
            ref="onShowPopup"
            :target="comment.com_id"
            :articleId="articleId"
            :list="replyCommentList"
            @post-success="onPostSuccess"
        ></post-comment>
      </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import PostComment from './PostComment'

export default {
  name: 'ReplyComment',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false,
      replyCommentList: []
    }
  },
  methods: {
    onReplyShow () {
      this.show = true
    },

    onShowPopup () {
      this.$refs.onShowPopup.onShowPopup()
    //   console.log(this.$refs)
    },

    onPostSuccess (comment) {
      this.replyCommentList.unshift(comment)
      this.comment.reply_count++
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-bnt {
        width: 160px;
    }
}
</style>
