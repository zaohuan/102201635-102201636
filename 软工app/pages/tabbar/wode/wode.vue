<template>
	<view class="container">
		<view class="box1">
			<text class="biaoti">
				我的
			</text>	
		</view>
		<view class="wode">
			
			<image class ="wode_image" src="../../../static/logo.png">
				
			</image>
			<view class="info">
				<text class="name">
					姓名
				</text >
				<text class="xueyuan">
					学院
				</text>
				<text class="id">
					学号
				</text>
			</view>
			
		</view>
		<view class="xiangmu" @click="xiangmu">
			<text class="xuanxiang">
				我的项目
			</text>
		</view>
		<view class="xiugai">
			<text class="xuanxiang">
				修改个人信息
			</text>
		</view>
		<view class="renzhen">
			<text class="xuanxiang">
				身份认证
			</text>
		</view>	
		<view class="shezhi" @click="shezhi">
			<text class="xuanxiang">
				设置
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			shezhi(){
				uni.navigateTo({
					url:"/pages/shezhi/shezhi"
				})
			},
			xiangmu(){
					uni.navigateTo({
						url:"/pages/myProject/myProject"
					})
				}
			}
		
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
	}
	.box1{
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		display: flex;
		
		
		
	}
	
	.biaoti{
		font-size: 55rpx;
		font-weight: 700;
		padding-left: 25px;
		padding-top: 60px;
		padding-bottom:25px;
	}
	
	.image1{
		
		width: 360px;
		height: 166px;
		padding-left: 15px;
		padding-top:15px;
	}
	.touxiang{
		position: absolute;
	}
	.wode{
		display: flex;
		flex-direction: row;
		margin-top: 20px;
		margin-left:15px;
		background-color: #FFFFFF;
		width:360px;
		height: 166px;
		border-radius:50px;
	}
	.wode_image{
		padding-left: 44px;
		padding-top: 42px;
		width:80px;
		height: 80px;
	}
	.info{
		width: 80px;
		height: 80px;
		padding-left: 50px;
		padding-top: 15px;
		display: flex;
		flex-direction: column;
	}
	.name{
		font-size: 20px;
		padding-left: 10px;
		padding-top: 10px;
	}
	.xueyuan{
		font-size: 20px;
		padding-left: 10px;
		padding-top: 15px;
	}
	.id{
		font-size: 20px;
		padding-left: 10px;
		padding-top: 15px;
	}
	.xiangmu{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
	}
	.xiugai{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
		
	}
	.renzhen{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
	}
	.shezhi{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
		
	}
	.xuanxiang{
		font-size: 20px;
		padding-top: 10px;
	}
</style>
