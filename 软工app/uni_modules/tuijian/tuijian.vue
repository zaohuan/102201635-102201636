<template>
	<view>
		<view class ="tuijianbox"v-for="(item, index) in data" :key="index">
			<view class="tuijianima">
				<image :src="item.ima"></image>
			</view>
			<view class="tuijianname">
				{{item.name}}
				<view class="tuijiandes">
					{{item.des}}
				</view>
			</view>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],  
			};
		},
		mounted() {
			console.log('页面加载，开始获取云数据库数据');
			this.getDataFromDB(); 
		},
		methods: {
			getDataFromDB() {
				const db = uniCloud.database(); 
				db.collection('tuijianxiangmu') 
					.where({}) 
					.get() 
					.then(res => {
						console.log('获取到的数据:', res.result.data); 
						this.data = res.result.data;
						if (this.data.length === 0) {
							console.warn('没有数据可显示');
						}
					})
					.catch(err => {
						console.error('获取数据时发生错误:', err); 
					});
			}
		}
	}
</script>

<style lang="scss">
	.tuijianbox{
		display: flex;
		padding: 10rpx;
		margin: 10rpx;
		border-radius: 15rpx;
		box-shadow: 0 0 5rpx 1rpx rgba($color:#000000,$alpha:0.1);
		box-sizing: border-box;
		align-items: center;
		background-color: #ffffff;	
	}
	.tuijianima{
		flex-shrink: 0;
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		margin: 10rpx;
		image{
			width:100%;
			height: 100%;
			border-radius: 100%;
		}
	}
	.tuijianname{
		width: 100%;
		box-sizing:border-box;
		font-size: 50rpx;
		overflow: hidden;
	}
	.tuijiandes{
		width: 100%;
		box-sizing: border-box;
		justify-content: space-between;
		color:#666;
		font-size: 30rpx;
	}
</style>
