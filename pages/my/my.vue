<template>
	<view class="content">
		<view class="top-box">
			<view class="set-box">
				<view class="set-left">
					<uni-icons type="calendar" size="30" color="#fff"></uni-icons>
					<view class="txt">签到</view>
				</view>
				<view class="set-right">
					<uni-icons type="gear" size="30" color="#fff"></uni-icons>
					<uni-icons type="chat" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="users" @click="setFun">
				<view class="u-top">
					<template v-if="!userInfo.nickName">
						<img src="../../static/logo.png" mode="aspectFill" class="src" />
						<view class="title">
							注册/登录
						</view>
					</template>
					<template v-else>
						<img :src="userInfo.avatarUrl" mode="aspectFill" class="src" />
						<view class="title">
							{{userInfo.nickName}}
						</view>
					</template>
				</view>
				<view class="u-bottom">
					<view class="u-item">
						<view class="u-num">11</view>
						<view class="u-title">点赞</view>
					</view>
					<view class="u-item">
						<view class="u-num">12</view>
						<view class="u-title">喜欢</view>
					</view>
					<view class="u-item">
						<view class="u-num">13</view>
						<view class="u-title">浏览</view>
					</view>
					<view class="u-item">
						<view class="u-num">14</view>
						<view class="u-title">收藏</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-box">
			<view class="lists">
				<uni-list>
					<uni-list-item
						:show-extra-icon="true"
						:extra-icon="extraIcon1"
						showArrow
						title="个人信息"
						clickable
					>
					</uni-list-item>
					<uni-list-item
						:show-extra-icon="true"
						:extra-icon="extraIcon2"
						showArrow title="我的购物车"
						clickable
					>
					</uni-list-item>
					<uni-list-item
						:show-extra-icon="true"
						:extra-icon="extraIcon3"
						showArrow title="用户反馈"
						clickable
					>
					</uni-list-item>
					<uni-list-item
						:show-extra-icon="true"
						:extra-icon="extraIcon4"
						showArrow title="我的邮件"
						clickable
					>
					</uni-list-item>
					<uni-list-item
						:show-extra-icon="true"
						:extra-icon="extraIcon5"
						showArrow title="分享有礼"
						clickable
					>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<up-popup :show="show" @close="close" closeable @open="open" round="20">
			<view class="popup">
				<view class="title">
					获取您的昵称、头像
				</view>
				<view class="flex">
					<view class="label">获取用户头像：</view>
					<button class="avatar-warpper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="avatar" :src="userInfo.avatarUrl"></image>
					</button>
				</view>
				<view class="flex">
					<view class="label">获取用户昵称：</view>
					<input @input="changeName" type="nickName" />
				</view>
				<button size="default" type="primary" @click="userSubmit">确定</button>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import {login, getUserInfo} from '@/api/api.js'

const userInfo = reactive({
	nickName:'',
	avatarUrl: ''
})

const show = ref(false);

onLoad(async() => {
	// 免登逻辑
	if (uni.getStorageSync('token') && !uni.getStorageSync('userInfo')){
		const {avatarUrl, nickName} = await getUserInfo()
		userInfo.avatarUrl = avatarUrl
		userInfo.nickName = nickName
	} else if(uni.getStorageSync('token') && uni.getStorageSync('userInfo')){
		const {avatarUrl, nickName} = JSON.parse(uni.getStorageSync('userInfo'))
		userInfo.avatarUrl = avatarUrl
		userInfo.nickName = nickName
	}
})

const setFun = ()=>{
	uni.showModal({
		title:"温馨提示",
		content:'亲，授权微信登录后才能正常使用小程序',
		success(res) {
			if(res.confirm){
				show.value = true
				uni.login({
					success: async (res)=> {
						// console.log(res,'success');
						const {token} = await login(res.code)
						// console.log(token,'token');
						uni.setStorageSync('token', token)
						const { avatarUrl, nickName } = await getUserInfo()
						userInfo.avatarUrl = avatarUrl
						userInfo.nickName = nickName
					}
				})
			}
		}
	})
}

const open = () =>{
	show.value = true
}
const close = () =>{
	show.value = false
}

const onChooseAvatar = (e) => {
  // #ifdef MP-WEIXIN
  // 仅在微信小程序中执行
  if (typeof wx !== 'undefined' && wx.canIUse('button.chooseAvatar')) {
    userInfo.avatarUrl = e.detail.avatarUrl
  } else {
    // 开发环境下的模拟数据
    userInfo.avatarUrl = '/static/logo.png'
    console.log('当前环境不支持chooseAvatar API，使用默认头像')
  }
  // #endif
  // #ifndef MP-WEIXIN
  userInfo.avatarUrl = e.detail?.avatarUrl || '/static/logo.png'
  // #endif
}

const changeName = (e) =>{
	userInfo.nickName = e.detail.value
}

const userSubmit = () =>{
	uni.setStorageSync('userInfo', JSON.stringify(userInfo))
	show.value = false
}

const extraIcon1 = reactive({
	color: '#666666',
	size: '22',
	type: 'auth'
})
const extraIcon2 = reactive({
	color: '#666666',
	size: '22',
	type: 'cart'
})
const extraIcon3 = reactive({
	color: '#666666',
	size: '22',
	type: 'chatboxes'
})
const extraIcon4 = reactive({
	color: '#666666',
	size: '22',
	type: 'email'
})
const extraIcon5 = reactive({
	color: '#666666',
	size: '22',
	type: 'gift'
})

</script>

<style scoped lang="scss">
	.content{
		height: 100vh;
		background-color: #f5f5f5;
		.top-box{
			width: 100%;
			position: relative;
			z-index: 1;
			overflow: hidden;
			padding: 40rpx 20rpx 40rpx;
			box-sizing: border-box;
		}
		.top-box::after{
			content: '';
			width: 140%;
			height: 200px;
			position: absolute;
			z-index: -1;
			top: 0;
			left: -20%;
			background-color: #00aaff;
			border-radius: 0 0 50% 50%;
		}
		.set-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.set-left{
				width: 18%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.txt{
				color: #fff;
				font-size: 30rpx;
			}
			.set-right{
				
			}
		}
		.users{
			margin-top: 35rpx;
			padding: 30rpx;
			box-sizing: 280rpx;
			background-color: #fff;
			box-shadow: 1rpx 10rpx 20rpx #ececec;
			border-radius: 16rpx;
			.u-top{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 30rpx;
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.title{
					font-size: 30rpx;
					font-weight: 700;
					color: #333;
				}
			}
			.u-bottom{
				display: flex;
				justify-content: space-around;
				align-items: center;
				.u-item{
					text-align: center;
					.u-title{
						color: #757575;
						font-size: 25rpx;
						margin-top: 10rpx;
					}
					.u-num{
						color: #333;
						font-size: 33rpx;
						font-weight: 700;
					}
				}
			}
		}
		.popup{
			padding: 20rpx;
			border-radius: 20rpx 20rpx 0 0;
			.title{
				margin-bottom: 20rpx;
				font-size: 40rpx;
				text-align: center;
			}
			.flex{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px solid #f5f5f5;
				padding: 24rpx 0;
			}
			image{
				width: 70rpx;
				height: 70rpx;
			}
			.avatar-warpper{
				border: none;
				border-radius: 10rpx;
				width: 70rpx;
				height: 70rpx;
				margin-left: 20rpx;
				padding: 0;
			}
		}
		.list-box{
			// margin: -10rpx auto 0;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 12rpx;
			// background-color: pink;
		}
	}
</style>