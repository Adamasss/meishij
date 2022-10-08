<template>
	<div>
		<DetailHeader :menuInfo="menuInfo"></DetailHeader>
		<DetailContent :menuInfo="menuInfo"></DetailContent>
	</div>
</template>

<script>
import { getMenuInfo } from "@/apis";
import DetailHeader from "./detail-header.vue";
import DetailContent from "./detail-content.vue";
export default {
	data() {
		return {
			menuInfo: {
				raw_material: {
					main_material: [],
					accessories_material: [],
				},
				userInfo: {},
				steps: [],
			},
		};
	},
	components: { DetailHeader, DetailContent },
	methods: {},
	watch: {
		$route: {
			handler() {
				let { menuId } = this.$route.query;
				if (menuId) {
					getMenuInfo({ menuId }).then((res) => {
						this.menuInfo = res.data.info;
						console.log(this.menuInfo);
					});
				}
			},
			immediate: true,
		},
	},
};
</script>
<style></style>
