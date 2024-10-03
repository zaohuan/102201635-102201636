<template>
	<view>
		<view class="box1">
			<text class="biaoti">
				首页
			</text>
			
		</view>
	</view>
	
	<view>
		<uni-section>
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索人/群/项目" clearButton="auto" cancelButton="none" @confirm="search" />
		</uni-section>
		<Daohang />
	</view>
	
	<view class ="tuijian">
		<view class="tuijian_box tuijian_box2">
			<view class="tuijian_T">
				推荐项目
			</view>
		</view>
		<Tuijian />
	</view>
	
</template>

<script>
	import Daohang from "../../../uni_modules/daohang/daohang.vue"
	import Tuijian from "../../../uni_modules/tuijian/tuijian.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			Daohang,
			Tuijian
		}
	}
</script>

<style>
	.box1{
		width: 100%;
		height: 50px;
		background: #FFFFFF;
		
		padding-left: 30px;
		padding-top: 65px;
		padding-bottom:15px;
		
		
	}
	.biaoti{
		font-size: 55rpx;
	}
	.tuijian_box2{
		display:flex;
		width:100%;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;
		padding:0 15px;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
		
	}
		
	.tuijian_T{
		font-size: 20px;
		font-weight: 700;
	}
</style>

