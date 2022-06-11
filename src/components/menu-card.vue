<template>
  <!-- 超出时换行flex-wrap:wrap 默认不换行no-wrap -->
  <el-row
    ref="list"
    type="flex"
    justify="space-between"
    :gutter="20"
    style="flex-wrap: wrap; overflow: auto"
  >
    <el-col
      class="list"
      v-for="item in menuList"
      :key="item.menuId"
      :style="{ width: width, margin: margin }"
    >
      <router-link to="/" style="color: black">
        <el-image
          style="width: 100%; height: 220px; border-radius: 5px"
          :src="item.product_pic_url"
          fit="fill"
        ></el-image>
        <div style="text-indent: 1em">
          <h6 style="font-size: 1em; margin-top: 10px">
            {{ item.title }}
          </h6>
          <p class="comment">{{ item.comments_len }} 评论</p>
          <p class="admin">{{ item.name }}</p>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: "1200px",
    },
    margin: {
      type: String,
      default: "10px",
    },
  },
};
</script>

<style lang="stylus">
.list {
  border-radius: 5px;
  width: 19%;
  height: 320px;
  background-color: white;
}

.comment {
  font-size: 0.8em;
  margin-top: 8px;
  text-align: left;
  color: darkgray;
}

.admin {
  font-size: 14px;
  margin-top: 8px;
  text-align: left;
  color: red;
}
</style>