<template>
  <div class="update-gender">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        :default-index="localGender"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onChange"
      />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.localGender = index
    },

    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.localGender
      })
      this.$emit('close')
      this.$emit('input', this.localGender)
      this.$toast.success('保存成功')
    }
  }

}
</script>

<style lang="less" scoped>

</style>
