<template>
  <div class="update-photo">
      <img :src="image" ref="image"/>
      <van-nav-bar
        class="nav-bar"
        left-text="取消"
        right-text="确认"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      crop (event) {
        this.viewMode = 1
        this.dragMode = 'move'
        this.aspectRatio = 1
        this.cropBoxMovable = false
        this.cropBoxResizable = false
        this.movable = false
      }
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => resolve(blob))
      })
    },

    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })

      const file = await this.getCroppedCanvas()
      const formData = new FormData()
      formData.append('photo', file)
      await updateUserPhoto(formData)
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style>
img {
    width: 100%;
    display: block;
    max-width: 100%;
}
.nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
}
</style>
