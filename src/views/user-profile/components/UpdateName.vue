<template>
  <div class="update-name">
      <van-nav-bar
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      />
      <div class="name-filed-wrap">
        <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
        />
      </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.userName
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        await updateUserProfile({
          name: this.localName
        })
        this.$emit('close')
        this.$emit('update-name', this.localName)
        this.$toast.success('保存成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.name-filed-wrap {
    padding: 10px;
}
</style>
