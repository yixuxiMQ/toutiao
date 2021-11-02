<template>
    <van-cell
      class="comment-item"
      center
    >
        <van-image
            slot="icon"
            round
            fit="cover"
            :src="comment.aut_photo"
            class="avatar"
        />
        <div slot="title">
            <div class="name-wrap">
                <div class="name">{{ comment.aut_name }}</div>
                <div @click="onCommentLike">
                    <van-icon
                        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
                        :class="{liked: comment.is_liking}"
                    />
                    <span>{{ comment.like_count }}</span>
                </div>
            </div>
            <div class="content">{{ comment.content }}</div>
            <div>
                <span class="pubdate">{{comment.pubdate | dateTime('MM-DD hh:mm')}}</span>
                <van-button
                    round
                    size="mini"
                    class="reply-btn"
                    @click="$emit('reply-click', comment)"
                >{{ comment.reply_count }}回复</van-button>
            </div>
        </div>
    </van-cell>
</template>

<script>
import {
  addCommentLike,
  deleteCommentLike
} from '@/api/comment.js'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      if (this.comment.is_liking) {
        await deleteCommentLike(this.comment.com_id)
        this.comment.like_count--
      } else {
        await addCommentLike(this.comment.com_id)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
    .avatar {
        width: 36px;
        height: 36px;
        margin-right: 13px;
    }

    .name-wrap {
        display: flex;
        justify-content: space-between;
        .name {
            font-size: 14px;
            color: #406599;
        }
    }

    .content {
        font-size: 16px;
        counter-reset: #222;
    }

    .pubdate {
        font-size: 10px;
        margin-right: 10px;
    }

    .liked {
        color: red;
    }
}
</style>
