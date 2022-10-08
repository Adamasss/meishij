<template>
	<div>
		<el-row
			style="background-color: white; margin-top: 50px"
			justify="space-between"
		>
			<el-col :span="8">
				<el-image
					style="width: 100%; height: 100%; display: block"
					:src="menuInfo.product_pic_url"
					fit="fill"
					alt="菜品图片"
				></el-image>
			</el-col>
			<el-col :span="16">
				<div
					style="
						height: 90px;
						display: flex;
						justify-content: space-between;
						align-content: center;
						align-items: center;
					"
				>
					<p style="margin-left: 20px; font-size: 30px">
						{{ menuInfo.title }}
					</p>
					<button style="background-color: red" @click="store">
						<p style="font-size: 20px">收藏</p>
					</button>
				</div>
				<el-row
					type="flex"
					:gutter="24"
					style="flex-wrap: wrap; margin: 0; padding: 0"
				>
					<el-col
						:span="8"
						style="width: 200px; height: 90px; border: 1px solid darkgray"
						v-for="item in menuInfo.properties_show"
						:key="item.index"
					>
						<p
							style="
								margin-top: 30px;
								padding-left: 20px;
								font-size: 10px;
								color: darkgray;
							"
						>
							{{ item.parent_name }}
						</p>
						<p style="padding-left: 20px; font-size: 20px; color: red">
							{{ item.name }}
						</p>
					</el-col>
				</el-row>
				<div
					style="
						margin-top: 30px;
						margin-left: 18px;
						display: flex;
						align-content: center;
						align-items: center;
					"
				>
					<el-avatar :size="62" :src="menuInfo.userInfo.avatar"></el-avatar>
					<div style="line-height: 24px">
						<p style="font-size: 10px; color: red">
							{{ menuInfo.userInfo.name }}
						</p>
						<p style="font-size: 10px">
							<span> 菜谱：{{ menuInfo.userInfo.following_len }} </span> /
							<span> 关注：{{ menuInfo.userInfo.work_menus_len }} </span> /
							<span> 粉丝：{{ menuInfo.userInfo.follows_len }} </span>
						</p>
						<p style="font-size: 8px; color: darkgray">
							{{ menuInfo.userInfo.createdAt }}
						</p>
					</div>
				</div>
			</el-col>
		</el-row>
		<div
			style="
				background-color: white;
				margin-top: 20px;
				padding-left: 22px;
				padding-bottom: 16px;
			"
		>
			<p style="padding-top: 20px; margin-bottom: 48px; font-size: 10px">
				{{ menuInfo.product_story }}
			</p>
			<p style="padding-bottom: 18px; font-size: 20px">用料</p>
			<div
				style="display: flex; align-content: center; margin-bottom: 44px"
				v-if="menuInfo.raw_material.main_material.name !== ''"
			>
				<p
					style="
						font-size: 12px;
						width: 44px;
						height: 22px;
						border: 1px solid darkgray;
						line-height: 22px;
						text-align: center;
						background-color: #f5f5f5;
						color: #999999;
						margin-right: 8px;
					"
				>
					主料
				</p>
				<ul
					style="
						display: flex;
						align-content: center;
						margin-bottom: 44px;
						flex-wrap: wrap;
					"
				>
					<li
						v-for="main in menuInfo.raw_material.main_material"
						:key="main.index"
						style="height: 48px; margin-right: 8px; border: 1px solid darkgray"
					>
						<p style="font-size: 10px; line-height: 48px; text-align: center">
							{{ main.name }} {{ main.specs }}
						</p>
					</li>
				</ul>
			</div>
			<div
				style="display: flex; align-content: center"
				v-if="menuInfo.raw_material.accessories_material[0].name !== ''"
			>
				<p
					style="
						font-size: 12px;
						width: 44px;
						height: 22px;
						border: 1px solid darkgray;
						line-height: 22px;
						text-align: center;
						background-color: #f5f5f5;
						color: #999999;
						margin-right: 8px;
					"
				>
					辅料
				</p>
				<ul style="display: flex; align-content: center; flex-wrap: wrap">
					<li
						v-for="accessories in menuInfo.raw_material.accessories_material"
						:key="accessories.index"
						style="
							width: 64px;
							height: 48px;
							margin-right: 8px;
							border: 1px solid darkgray;
						"
					>
						<p style="font-size: 10px; line-height: 48px; text-align: center">
							{{ accessories.name }} {{ accessories.specs }}
						</p>
					</li>
				</ul>
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
	methods: {
		store() {
			console.log(1);
		},
	},
};
</script>

<style></style>
