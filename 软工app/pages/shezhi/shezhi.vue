<template>
	<view class="container">
		<view :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="box3" :style="{ marginTop: statusBarHeight + 'px' }">
		  <view class="back-btn" @click="goBack">
			<text class="back-icon">返回</text>
		  </view>
		  <text class="biaoti2">设置</text>
		</view>
		<view class ="shezhiops">
			<view class="a">
				<text class="xuanxiang"  @click="zhanghao">
					账号与安全
				</text>
			</view>
			<view class="b">
				<text class="xuanxiang">
					通知设置
				</text>
			</view>	
			<view class="c" >
				<text class="xuanxiang">
					隐私设置
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0
			}
		},
		methods: {
			goBack() {
			  uni.navigateBack({
				delta: 1
			  });
			},
			zhanghao() {
			  uni.navigateTo({
			    url: "/pages/zhanghao/zhanghao"
			  });
			}
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight;
		}
	}
</script>

<style>
.container {
		display: flex;
		flex-direction: column;
		align-items: center;
}
.box3 {
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  display: flex;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  position: fixed;
}
.biaoti2 {
  font-size: 55rpx;
  font-weight: 700;
}
.back-btn {
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
}
.back-icon {
  font-size: 35rpx;
  color: #000000;
}
.shezhiops{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80px;
		width: 100%;
		padding: 0 20px;
}
	.a,
	.b,
	.c {
		background-color: #FFFFFF;
		border-radius: 50px;
		margin: 10px 0;
		width: calc(100% - 40px);
		height: 50px;
		display: flex;
		justify-content: center;
	}
.xuanxiang {
		font-size: 20px;
		padding-top: 10px;
}


</style>
