<template>
	<view>
		<view class="box1">
			<text class="biaoti">
				消息
			</text>
			<image class="sandian"  src="../../../static/sandian.png">
				
			</image>
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
			
		}
	}
</script>

<style>
	.box1{
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		display: flex;
		
		
		
	}
	.sandian{
		width: 27px;
		height: 27px;
		padding-left: 269px;
		padding-top: 70px;
	}
	.biaoti{
		font-size: 55rpx;
		font-weight: 700;
		padding-left: 25px;
		padding-top: 60px;
		padding-bottom:25px;
	}
</style>
