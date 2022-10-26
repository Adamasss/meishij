<template>
	<div style="margin-top: 18px; background-color: white; padding-top: 20px">
		<p style="font-size: 20px; margin: 0 0 16px 20px">
			{{ menuInfo.title }}的做法
		</p>
		<ul style="border-top: 1px solid darkgray">
			<li v-for="(item, index) in menuInfo.steps" :key="item.index">
				<p>
					<span
						style="
							font-size: 25px;
							color: #ff0000;
							margin-left: 30px;
							padding-right: 30px;
							font-style: oblique;
						"
					>
						{{ index + 1 }}. </span
					><span style="font-size: 12px; color: gray">{{ item.describe }}</span>
				</p>
				<el-image
					style="margin-top: 10px; margin-left: 90px"
					:src="item.img_url"
					fit="fill"
					alt="菜品图片"
				></el-image>
			</li>
		</ul>
		<div>
			<p style="margin: 10px 0px 10px 20px; font-size: 20px">烹饪技巧</p>
			<div style="width: 100%; border-top: 1px solid darkgray">
				<p
					style="
						margin: 10px 0px 0px 90px;
						padding-bottom: 20px;
						font-size: 10px;
					"
				>
					{{ menuInfo.skill }}
				</p>
			</div>
		</div>
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
