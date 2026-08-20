<template>
	<view>
		<image
		  src="/static/Alliance.jpg"
		  mode="aspectFill"
		  class="large-img"
		  @load="onImageLoad"
		  @error="onError"
		/>
		<up-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle"></up-back-top>
	</view>
</template>

<script setup>
	import { ref, reactive} from 'vue'
	
</script>
<style>
	page{
		background-color: rgb(240, 240, 240);
	}
	.large-img{
		width: 100%;
		height: 900rpx;
		padding: 0;
	}
</style>
<style lang="scss" scoped>
	
	
</style>
