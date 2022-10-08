<template>
	<div style="margin-top: 18px; background-color: white; padding-top: 20px">
		<p style="font-size: 20px; margin: 0 0 16px 20px">
			{{ menuInfo.title }}的做法
		</p>
		<ul style="border-top: 1px solid darkgray">
			<li v-for="(item, index) in menuInfo.steps" :key="item.index">
				{{ index + 1 }}
				<p>{{ item.describe }}</p>
				<el-image
					style="width: 486px; height: 864px"
					:src="item.img_url"
					fit="fill"
					alt="菜品图片"
				></el-image>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ["menuInfo"],
	data() {
		return {};
	},
	methods: {},
};
</script>

<style></style>
