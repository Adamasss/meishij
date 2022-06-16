<template>
	<div>
		<el-carousel
			height="400px"
			type="card"
			direction="horizontal"
			:autoplay="true"
			:interval="3000"
			:loop="true"
			trigger="hover"
			indicator-position="outside"
			arrow="hover"
		>
			<el-carousel-item v-for="item in banner" :key="item.menuId">
				<el-image
					style="width: 100%; height: 100%"
					:src="item.product_pic_url"
					fit="fill"
				></el-image>
			</el-carousel-item>
		</el-carousel>
		<div>
			<p class="title">内容精选</p>

			<menu-card
				:menuList="menuList"
				ref="list"
				width="19%"
				margin="10px"
			></menu-card>
			<p style="text-align: center" v-show="isloading">
				<i class="el-icon-loading"></i>
				loading...
			</p>
		</div>
	</div>
</template>

<script>
import { getBanner, getMenu } from "@/apis";
import { throttle } from "throttle-debounce";
import menuCard from "@/components/menu-card.vue";

export default {
	components: { menuCard },
	data() {
		return {
			banner: [], // banner数据列表
			menuList: [], // 菜单列表
			isloading: false,
			page: 1, // 页码
		};
	},
	methods: {
		// 滚动
		scroll() {
			// 正在加载时不再重复调用数据
			if (this.isloading) {
				return;
			}
			// 获取浏览器内部窗口的高度
			const h = window.document.documentElement.clientHeight;
			// 获取列表底部距视口顶部的高度
			const l = this.$refs.list.$el.getBoundingClientRect().bottom;

			if (h - l > 0) {
				// 触底
				this.isloading = true;
				// 获取第二页的内容
				this.page++;

				// 防抖与节流
				getMenu({
					page: this.page,
				}).then((res) => {
					// 隐藏提示
					this.isloading = false;
					// 将数据放到menuList列表内
					// ...展开运算符
					this.menuList.push(...res.data.list);
				});
			}
		},
	},
	// 挂载完成
	async mounted() {
		const result = await getBanner();
		this.banner = result.data.list;

		// 获取菜单数据
		const menu = await getMenu({ page: this.page });
		this.menuList = menu.data.list;

		// 节流
		this.throttle = throttle(1000, this.scroll.bind(this));
		window.addEventListener("scroll", this.throttle);
	},
};
</script>

<style lang="stylus" scoped>
.title {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
