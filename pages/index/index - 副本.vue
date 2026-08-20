<template>
	<view class="content">
		<up-search placeholder="搜索" v-model="keyword" bg-color="#e3e3e3"></up-search>
		<up-swiper v-if="bannerList.length"
		:list="bannerList"
		keyName="image"
		show-title="title"
		radius="8" :autoplay="true" height="160"></up-swiper>
		<up-notice-bar :text="text"></up-notice-bar>
		<view class="list">
			<up-waterfall v-model="flowList" columns="2">
				<template v-slot:left="{leftList}">
					<view class="demo-water" v-for="(item, index) in leftList" :key="index" @click="goDetail(item)">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.times}}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{item.tag[0]}}
							</view>
							<view class="demo-tag-test">
								{{item.tag[1]}}
							</view>
						</view>
						<view class="isDot" v-if="item.isDot">
							{{item.isDot}}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-water" v-for="(item, index) in rightList" :key="index" @click="goDetail(item)">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.times}}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{item.tag[0]}}
							</view>
							<view class="demo-tag-test">
								{{item.tag[1]}}
							</view>
						</view>
						<view class="isDot" v-if="item.isDot">
							{{item.isDot}}
						</view>
					</view>
				</template>
			</up-waterfall>
		</view>
		<up-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle"></up-back-top>
	</view>
</template>

<script setup>
	import { getBanner, getHomeList } from '../../api/api.js';
	import { onLoad,onReachBottom,onPageScroll } from '@dcloudio/uni-app'
	import { ref, reactive} from 'vue'
	
	const keyword = ref('搜索')
	const bannerList = ref([])
	const text = ref('项目数据仅为测试数据，非真实数据')
	const flowList = ref([])
	const scrollTop = ref(0);
	
	onLoad(() => {
		getBanner().then( res =>{
			// console.log(res)
			bannerList.value = res.bannerList
		})
		getHomeList().then(res =>{
			// console.log(res)
			flowList.value = res
		})
	})
	onReachBottom(()=>{
		// console.log("触底")
		setTimeout(()=>{
			addRandomData()
		}, 1000)
	})
	onPageScroll((e)=>{
		scrollTop.value = e.scrollTop;
	})
	const addRandomData = ()=>{
		for(let i = 0; i<10;i++){
			let index = uni.$u.random(0, flowList.value.length -1)
			let item = JSON.parse(JSON.stringify(flowList.value[index]))
			item.id = uni.$u.guid()
			flowList.value.push(item)
		}
	}
	
	const goDetail = (item) =>{
		const can = JSON.stringify(item)
		uni.navigateTo({
			url: `/pages/detail/detail?item=${encodeURIComponent(can)}`
		})
	}
	
</script>
<style>
	page{
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped>
	.content{
		padding: 20rpx;
	}
	.list{
		margin: 20rpx 0;
		.demo-water{
			margin: 10px 0;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 16rpx;
			position: relative;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}
		.demo-title{
			font-size: 30rpx;
			margin-top: 10rpx;
			color: #303133;
		}
		.demo-price{
			font-size: 24rpx;
			color: #777;
			margin-top: 10rpx;
		}
		.demo-tag{
			display: flex;
			margin-top: 10rpx;
			.demo-tag-owner{
				border: 1rpx solid rgb(252, 163, 129); 
				color: #ffa00;
				font-size: 20rpx;
				display: flex;
				align-items: center;
				padding: 4rpx 14rpx;
				border-radius: 50rpx;
			}
			.demo-tag-test{
				border: 1rpx solid #00aaff;
				color: #ffa00;
				font-size: 20rpx;
				display: flex;
				align-items: center;
				padding: 4rpx 14rpx;
				border-radius: 50rpx;
			}
		}
		.isDot{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			color: #fff;
			line-height: 32rpx;
			background-color: red;
			text-align: center;
			border-radius: 10rpx;
			padding: 4rpx 10rpx;
		}
		
		
	}
	
	
</style>
