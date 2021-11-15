<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        center
        class="my-base-info"
      >
        <template #icon>
          <van-image
            class="avatar"
            round
            :src="userInfo.photo"
            fit="cover"
          />
        </template>
        <template #title>
          <span class="custom-title">{{ userInfo.name }}</span>
        </template>
        <van-button
          class="update-btn"
          size="small"
          round
          to="/user/profile"
        >编辑资料</van-button>
      </van-cell>

      <van-grid :border="false">
        <van-grid-item class="my-data-info">
          <div slot="text" class="data-wrap">
            <div class="number">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="my-data-info">
          <div slot="text" class="data-wrap">
            <div class="number">{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="my-data-info">
          <div slot="text" class="data-wrap">
            <div class="number">{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="my-data-info">
          <div slot="text" class="data-wrap">
            <div class="number">{{ userInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })">
        <img class="mobile" src="./手机.png" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid
      :column-num="2"
      :border="false"
      class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="underway-o" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="" />
    <van-cell
      class="mb-4"
      title="小智同学"
      is-link
      to="/user/chat" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.data
    },

    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => { // 确认
          // on confirm
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => { // 取消
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('./banner.png') no-repeat center;
    background-size: cover;
    .my-base-info {
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;
      .avatar {
        box-sizing: border-box;
        height: 66px;
        width: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .custom-title {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .my-base-info::after {
      border: none;
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .my-data-info {
      height: 65px;
      color: #fff;
      .data-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .number {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
  }

  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .van-icon-star-o {
        color: #eb5253;
      }
      .van-grid-item__text {
        color: #333;
        font-size: 14px;
      }
      .van-icon-underway-o {
        color: #ff9d1d;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #db6262;
  }

  .mb-4 {
    margin-bottom: 4px;
  }
}

</style>
