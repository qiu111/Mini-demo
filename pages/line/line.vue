<template>
	<view class="line">
		<view class="map-box">
			<map style="width: 100%;height: 900rpx;"
				:latitude="projectInfo.location[0]"
				:longitude="projectInfo.location[1]"
				:markers="projectInfo.markers">
			</map>
		</view>
		<view class="infos">
			<view class="tit">
				当前游玩项目：{{projectInfo.title}}
			</view>
			<view class="starts">
				<text>项目推荐：</text>
				<up-rate :count="count" v-model="projectInfo.count"></up-rate>
			</view>
			<view class="scroll-view">
				<up-scroll-list :indicator="true"
				indicatorColor="#fff0f0"
				indicatorActiaColor="#f56c6c">
					<view class="items" v-for="(item,index) in projectInfo.other" :key="item.id">
						<image class="img" :src="item.url" mode="aspectFill"></image>
						<view class="title">
							{{item.name}}
						</view>
					</view>
				</up-scroll-list>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getInfo } from '@/api/api.js'
	
	const projectInfo = ref([])
	const count = ref(5)
	
	
	onLoad((props) =>{
		getInfo({id: props.id}).then((res)=>{
			projectInfo.value = res
			// console.log(projectInfo.value);
		})
	})
	
	
	
</script>

<style lang="scss">
	.infos{
		padding: 20rpx;
		box-sizing: border-box;
		.tit{
			font-size: 34rpx;
			font-weight: 600;
			color: #333;
		}
		.starts{
			font-size: 28rpx;
			margin: 20rpx 0 40rpx;
			display: flex;
		}
		.items{
			margin-right: 20rpx;
			text-align: center;
		}
		.img{
			width: 320rpx;
			height: 200rpx;
			border-radius: 14rpx;
		}
		.title{
			font-size: 28rpx;
			font-weight: 600;
			color: #333;
		}
		
	}

</style>