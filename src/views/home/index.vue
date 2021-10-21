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
      <div
        slot="nav-right"
        class="wap-navplaceholder"></div>
      <div
        class="wap-nav-wrap"
        slot="nav-right"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <!-- 频道编辑 -->
      <channel-edit
        :userChannels="channels"
        :active="active"
        @closePop="isChannelEditShow = false"
        @updateActive="active = $event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录
        const localChannels = getItem('userChannels')
        // 请求本地，如果本地没有，请求线上
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
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
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px;
      height: 3px;
      background-color: #3296fa;
    }
  }

  .wap-navplaceholder {
    width: 33px;
    flex-shrink: 0;
    border-bottom: 1px solid #edeff3;
  }

  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 42px;
    width: 33px;
    line-height: 42px;
    background-color: #fff;
    opacity: .9;
    text-align: center;
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-image: linear-gradient(#eee, #999, #eee) 0 1;
  }
}
</style>
