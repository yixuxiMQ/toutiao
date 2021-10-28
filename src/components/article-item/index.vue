<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
  >
      <div
        class="title van-multi-ellipsis--l3"
        slot="title"
      >{{ article.title }}</div>
      <div slot="label">
          <div
            class="cover-wrap"
            v-if="article.cover.type === 3">
              <div
                class="cover-wrap-item"
                v-for="(cover, index) in article.cover.images"
                :key="index">
                  <van-image
                    class="cover-item"
                    fit="cover"
                    :src="cover"
                  />
              </div>
          </div>
          <div class="label-wrap">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime }}</span>
          </div>
      </div>
      <van-image
       class="right-cover"
        v-if="article.cover.type === 1"
        fit="cover"
        :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }

}
</script>

<style scoped lang="less">
.article-item {
    width: 375px;
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }
    .cover-wrap {
        display: flex;
        padding: 15px 0;
        .cover-wrap-item {
            flex: 1;
            height: 73px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item {
                width: 100%;
                height: 73px;
            }
        }
        // flex-wrap: nowrap;
    }
    /deep/.van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .right-cover {
        width: 116px;
        height: 73px;
    }

    .label-wrap {
        font-size: 11px;
        color: #b4b4b4;
        span {
            margin-right: 12px;
        }
    }
}
</style>
