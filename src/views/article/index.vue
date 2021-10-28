<template>
  <div class="article-container">
      <van-nav-bar
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />

      <h1 class="title">{{ article.title }}</h1>

      <van-cell
        center
        class="user-info"
      >
          <div
            slot="title"
            class="name"
          >{{ article.aut_name }}</div>
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div
            slot="label"
            class="pubdate"
          >{{ article.pubdate | relativeTime }}</div>
          <van-button
            :loading="isFollowLoading"
            class="followbtn"
            :type="article.is_followed ? 'default' : 'info'"
            round
            size="mini"
            :icon="article.is_followed ? '' : 'plus'"
            @click="onFollow"
          >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content">
      </div>

      <div class="article-bottom">
          <van-button
            type="default"
            size="small"
            round
            class="comment-bnt"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            badge="123"
            color="#777"
          ></van-icon>
          <van-icon
            :name="article.is_collected ? 'star' : 'star-o'"
            :color="article.is_collected ? 'orange' : ''"
            @click="onCollect"
          ></van-icon>
          <van-icon
            :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
            :color="article.attitude === 1 ? 'red' : '#777'"
            @click="onLike"
          ></van-icon>
          <van-icon
            name="share"
            color="#777"
          ></van-icon>
      </div>
  </div>
</template>

<script>
import './github-markdown-light.css'
import {
  getArticlesContent,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  // 组件中获取动态路由参数：
  // 方式一：this.$route.params.xxx
  // 方式二：props 传参
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticlesContent(this.articleId)

      this.article = data.data
      // 数据已经更新，但是试图还未更新，所以使用nextTick
      this.$nextTick(() => {
        this.handlePreviewImg()
      })
    },

    handlePreviewImg () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '收藏成功' : '取消收藏'}`)
    },

    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '点赞成功' : '取消点赞'}`)
    }
  }
}
</script>

<style lang="less" scoped>
.app-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 46px 0 0 0;
}

.user-info {
    .name {
        font-size: 12px;
        color: #333;
    }

    .pubdate {
        font-size: 11px;
        color: #b4b4b4;
    }

    .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }

    .followbtn {
        width: 85px;
        height: 29px;
    }
}

ul {
    list-style: unset;
}

.markdown-body {
    padding: 14px;
    margin-bottom: 44px;
}

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
    .van-icon {
        font-size: 20px;
    }
}
</style>
