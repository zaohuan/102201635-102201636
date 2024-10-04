<template>
	<view>
		<view class="box1">
			<text class="biaoti">
				联系人
			</text>
			<image class="sandian"  src="../../../static/sandian.png" @tap="toggleView">
			</image>
		</view>
		<view v-if="showView" style="position: fixed;margin-left: 180px; width: 40%; height: 50px; background-color: #fff; padding: 20px; border-radius: 10px;border: #000;">
		  <text>
			  搜索联系人
		  </text>
		 
		</view>
			
		
		<uni-collapse>
		    <uni-collapse-item :show-animation="true" title="我的好友">
		        <uni-list :border="true">
		            <!-- 显示圆形头像 -->
		            <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"  clickable="true" @click="liaotian"></uni-list-chat>
		            <!-- 右侧带角标 -->
		            <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"   clickable="true" @click="liaotian"></uni-list-chat>
		            <!-- 头像显示圆点 -->
		            <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"   clickable="true" @click="liaotian"></uni-list-chat>
		            <!-- 头像显示角标 -->
		            <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"   clickable="true" @click="liaotian"></uni-list-chat>
		        </uni-list>
		    </uni-collapse-item>
		
		    <uni-collapse-item :show-animation="true" title="我的群组">
		        <uni-list :border="true">
		            <uni-list-chat title="uni-app" :avatar-list="avatarList"   badge-positon="left" badge-text="dot"></uni-list-chat>
		            <!-- 自定义右侧内容 -->
		            <uni-list-chat title="uni-app" :avatar-list="avatarList"   badge-positon="left" badge-text="dot">
		                <view class="chat-custom-right">
		                    <text class="chat-custom-text">刚刚</text>
		                    <uni-icons type="star-filled" color="#999" size="18"></uni-icons>
		                </view>
		            </uni-list-chat>
		        </uni-list>
		    </uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showView: false,
				avatarList: [{
								url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
							}, {
								url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
							}, {
								url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
							}]
			}
		},
		methods: {
			liaotian(){
				console.log("chufa")
				uni.navigateTo(
				{
					url:"/pages/liaotian/liaotianjiemian"
				})
			},
			toggleView() {
			  this.showView = !this.showView;
			}
	},
}
</script>

<style lang="scss">
	.box1{
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		display: flex;
		
		
		
	}
	.sandian{
		width: 27px;
		height: 27px;
		padding-left: 240px;
		padding-top: 70px;
	}
	.biaoti{
		font-size: 55rpx;
		font-weight: 700;
		padding-left: 25px;
		padding-top: 60px;
		padding-bottom:25px;
	}
	
	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
	.tianjia{
		position:fixed;
	}
</style>
