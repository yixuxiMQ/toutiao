<template>
  <div class="article-list">
    <van-pull-refresh
        v-model="isRefreshLoading"
        @refresh="onRefresh"
        :success-text="refreshSuccessText"
        :success-duration="1500"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
        <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
        <article-item
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
        ></article-item>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now()
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false

      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now()
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
      this.refreshSuccessText = `刷新了${results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}
</style>
