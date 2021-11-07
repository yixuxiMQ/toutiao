<template>
  <div class="user-profile">
      <van-nav-bar
        title="个人信息"
        class="app-nav-bar"
        left-arrow
        @click-left="$router.back()"
      />

      <van-cell
        title="头像"
        is-link
        center
        @click="$refs.file.click()"
      >
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            hidden
            ref="file"
            @change="onFileChange"
          />
          <van-image
            width="25"
            height="25"
            round
            fit="cover"
            :src="user.photo"
          />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isEditNameShow = true"
      ></van-cell>
      <van-cell
        title="性别"
        is-link
        :value="user.gender === 1 ? '女' : '男'"
        @click="isEditGenderShow = true"
      ></van-cell>
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
        @click="isEditBirthdayShow = true"
      ></van-cell>
      <!-- 昵称 -->
      <van-popup
        v-model="isEditNameShow"
        v-if="isEditNameShow"
        position="bottom"
        class="van-popup"
        :style="{ height: '100%' }"
      >
        <update-name
          :userName="user.name"
          @close="isEditNameShow = false"
          @update-name="user.name = $event"
        ></update-name>
      </van-popup>
      <!-- 性别 -->
      <van-popup
        v-if="isEditGenderShow"
        v-model="isEditGenderShow"
        position="bottom"
        class="van-popup"
      >
        <update-gender
          v-model="user.gender"
          @close="isEditGenderShow = false"
        ></update-gender>
      </van-popup>
      <!-- 生日 -->
      <van-popup
        v-if="isEditBirthdayShow"
        v-model="isEditBirthdayShow"
        position="bottom"
        class="van-popup"
      >
        <update-birthday
          v-model="user.birthday"
          @close="isEditBirthdayShow = false"
        ></update-birthday>
      </van-popup>
      <!-- 头像 -->
      <van-popup
        v-if="isEditPhotoShow"
        v-model="isEditPhotoShow"
        position="bottom"
        class="update-photo-popup"
        :style="{ height: '100%' }"
      >
        <update-photo
          :file="file"
          @close="isEditPhotoShow = false"
          @update-photo="user.photo = $event"
        ></update-photo>
      </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/UpdateName'
import UpdateGender from './components/UpdateGender'
import UpdateBirthday from './components/UpdateBirthday'
import UpdatePhoto from './components/UpdatePhoto'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      file: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },

    onFileChange () {
      const oFile = this.$refs.file.files[0]
      this.file = oFile
      this.isEditPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}

.update-photo-popup {
  display: flex;
  align-items: center;
  background-color: #000;
}
</style>
