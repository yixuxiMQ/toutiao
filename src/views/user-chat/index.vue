<template>
  <div class="user-chat">
      <van-nav-bar
        class="app-nav-bar"
        title="小智同学"
        left-arrow
        @click-left="$router.back()"
      />

      <van-cell-group
        class="content-wrap"
        ref="message-list"
      >
        <van-cell
          :title="item.msg"
          v-for="(item, index) in messages"
          :key="index"
        />
      </van-cell-group>

      <van-cell-group class="send-message-wrap">
          <van-field
            v-model="message"
            placeholder="请输入消息"
            :border="false"
          />
          <van-button
            size="small"
            type="primary"
            class="send-message-btn"
            @click="onSend"
          >发送</van-button>
      </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'userChat',
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-messages') || []
    }
  },
  created () {
    const socket = io('http://toutiao.itheima.net/v1_0/socket.io/')
    this.socket = socket
    socket.on('connect', () => {
      console.log('成功建立连接')
    })

    socket.on('disconnect', () => {
      console.log('连接断开')
    })

    socket.on('message', data => {
      console.log(data)
      this.messages.push(data)
    })
  },
  watch: {
    messages () {
      setItem('chat-messages', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      const message = this.message.trim()
      if (!message) {
        return
      }
      const data = {
        msg: message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },

    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style scoped lang="less">
.content-wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
}

.send-message-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.send-message-btn {
    width: 60px;
}
</style>
