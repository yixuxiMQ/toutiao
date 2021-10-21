<template>
  <div class="channel-edit">
      <van-cell center :border="false">
        <div
          slot="title"
          class="channel-title"
        >
            我的频道
        </div>
        <van-button
            class="channel-edit-btn"
            round
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
        >
            {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
            :class="{ active: active === index }"
            v-for="(channel, index) in userChannels"
            :key="index"
            :text="channel.name"
            :icon="(isEdit && index !== 0) ? 'close' :''"
            @click="onUserChannelClick(channel, index)"
        />
      </van-grid>
      <van-cell center :border="false">
        <div slot="title">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            @click="onAdd(item)"
        />
      </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    async onAdd (item) {
      this.userChannels.push(item)

      if (this.user) {
        await addUserChannels({
          channels: [
            {
              id: item.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        setItem('userChannels', this.userChannels)
      }
    },

    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },

    async deleteChannel (channel, index) {
      if (index < this.active) {
        this.$emit('updateActive', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      if (this.user) {
        await deleteUserChannels(channel.id)
      } else {
        setItem('userChannels', this.userChannels)
      }
    },

    switchChannel (index) {
      this.$emit('updateActive', index)
      this.$emit('closePop')
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find(item => {
          return item.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding-top: 54px;
    .channel-title {
        font-size: 16px;
        color: #333;
    }

    .channel-edit-btn {
        width: 60px;
    }

    /deep/ .van-grid-item__content {
        position: relative;
        width: 80px;
        height: 43px;
        background-color: #f4f5f6;
        .van-icon {
            position: absolute;
            top: -8px;
            right: -8px;
            font-size: 15px;
        }
        .van-grid-item__text {
            margin-top: 0;
        }
    }

    .active {
        /deep/ .van-grid-item__text {
            color: red;
        }
    }

}
</style>
