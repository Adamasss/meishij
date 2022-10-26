<template>
	<div
		style="
			background-color: white;
			margin-top: 20px;
			width: 100%;
			padding-top: 10px;
		"
	>
		<p style="font-size: 20px; margin: 0px 0px 10px 20px">
			{{ menuInfo.title }}的讨论
		</p>
		<div
			style="
				width: 100%;
				border: 1px 0px 1px 0px solid darkgray;
				margin-bottom: 20px;
			"
		>
		
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
