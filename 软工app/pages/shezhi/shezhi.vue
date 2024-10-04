<template>
	<view class="container">
		<view class="box1">
			<text class="biaoti">
				设置
			</text>	
			<text class="fanhui" @click="fanhui">
				返回
			</text>
		</view>
		<view class="wode">
			
			<image class ="wode_image" src="../../static/logo.png">
				
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
		<view class="xiugai">
			<text class="xuanxiang">
				账号与安全
			</text>
		</view>
		<view class="renzhen">
			<text class="xuanxiang">
				通知设置
			</text>
		</view>	
		<view class="shezhi" >
			<text class="xuanxiang">
				隐私设置
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
			fanhui()
			{
				uni.switchTab({
					url:"/pages/tabbar/wode/wode"
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
		flex-direction: row;
		
		
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
	.fanhui{
		font-size: 20px;
		padding-top: 70px;
		padding-left: 230px;
	}
</style>
