<template>
	<div id="app">
		<!-- 头部 -->
		<MyHeader></MyHeader>
		<!-- 主题内容 -->
		<div class="content">
			<router-view></router-view>
		</div>
		<!-- 尾部 -->
		<MyFooter></MyFooter>
	</div>
</template>

<script>
import MyHeader from "./components/my-header.vue";
import MyFooter from "./components/my-footer.vue";
export default {
	components: {
		MyHeader,
		MyFooter,
	},
};
</script>

<style lang="stylus">
#app {
	width: 100%;
  background-color: antiquewhite;
}

.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
