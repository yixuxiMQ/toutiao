<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-form
      validate-first
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed">
      <van-field
        v-model="user.mobile"
        left-icon="shouji"
        icon-prefix="toutiao"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="isCountDownShow = false" />
            <van-button
              v-else
              :loading="isSendSmsLoading"
              loading-type="spinner"
              class="send-btn"
              size="small"
              round
              @click.prevent="onSendSms" >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17691005475',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请填写有效的手机号'
          }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '请填写有效的验证码'
          }
        ]
      },
      isCountDownShow: false, // 倒计时
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功')

        this.$store.commit('setUser', data.data)
        this.$store.commit('removeCachePage', 'LayoutIndex')
        this.$router.back()
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },

    onFailed (err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },

    async onSendSms () {
      try {
        // 校验手机号
        await this.$refs['login-form'].validate('mobile')
        // 点击发送验证码后，显示为loading状态，防止用户重复点击
        this.isSendSmsLoading = true
        // 验证成功后，请求发送验证码
        await sendSms(this.user.mobile)
        // 请求发送验证码成功后，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }

        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    margin: 0;
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
