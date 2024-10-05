<template>
    <view>
        <view>
            <view class="box2">
                <view class="back-btn" @click="goBack">
                    <text class="back-icon">返回</text>
                </view>
                <text class="biaoti2">搜索结果</text>
            </view>
        </view>
        <view v-if="results.length > 0">
            <view v-for="(item, index) in results" :key="index" class="result-item">
                <view>{{ item.data.name }}</view> 
					<view>{{ item.data.description }}</view>
						<view>{{ item.data.category }}</view>
							<view>{{ item.data.scale }}</view>
								<view>{{ item.data.state }}</view> 
									<view>{{ item.data.que }}</view>
            </view>
        </view>
        <view v-else class="nores_box">
            <text class="nores">没有找到相关结果</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            results: [] 
        };
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        async fetchResults(keyword) { 
            try {
                const res = await uniCloud.callFunction({
                    name: 'searchproject', 
                    data: { keyword: keyword }
                });
                console.log('云函数返回:', res);
                if (res.result.code === 200) {
                    this.results = res.result.data;
                } else {
                    console.error('Search Error:', res.result.message);
                }
            } catch (error) {
                console.error('Function call error:', error);
            }
        }
    },
    mounted() {
        const keyword = this.$route.query.keyword || '';
        console.log('搜索关键词:', decodeURIComponent(keyword));
        if (keyword) {
            this.fetchResults(decodeURIComponent(keyword)); 
        }
    }
};
</script>

<style>
	.result-item {
		margin: 10rpx 10rpx;
		padding: 10rpx;
		border: 5px solid #ccc;
		border-radius: 15px;
	}
	.box2 {
		width: 100%;
		height: 80px;
		background: #FFFFFF;
		display: flex;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		justify-content: center;
		align-items: center;
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
	.nores_box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;	
		height: 500rpx;
	}
	.nores {
		font-size: 50rpx;
		font-weight: 700;
		color: #999;
	}
</style>
