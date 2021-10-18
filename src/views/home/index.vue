<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        round
        type="info"
        >搜索</van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" :swipeable="true" >
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
    .search-btn {
      width: 277px;
      height: 32px;
      border: none;
      background-color: #5babfb;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .channel-tabs {
    /deep/ .van-tab {
      // border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px;
      height: 3px;
      background-color: #3296fa;
    }
  }
}
</style>
