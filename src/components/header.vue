<template>
	<div style="background-color: white">
		<!-- default-active的值与子项中index的值相对应 -->
		<el-menu
			mode="horizontal"
			router
			:default-active="activeRouter"
			style="width: 1200px; margin: 0 auto"
		>
			<el-menu-item index="home" :route="{ name: 'home' }">首页</el-menu-item>
			<el-menu-item index="recipe" :route="{ name: 'recipe' }"
				>菜谱大全</el-menu-item
			>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeRouter: "home",
		};
	},
	methods: {},
	watch: {
		$route: {
			handler(val) {
				this.activeRouter = val.name;
			},
			immediate: true, // 立即执行
		},
	},
};
</script>

<style></style>
