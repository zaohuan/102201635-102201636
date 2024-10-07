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

        <!-- 显示加载状态 -->
        <view v-if="loading" class="loading">加载中...</view>

        <!-- 显示结果 -->
        <view v-else-if="results.length > 0" class="results-container">
            <view v-for="(item, index) in results" :key="index" class="result-item">
                <view>项目名称：{{ item.data.name }}</view>
                <view>项目简介：{{ item.data.description.length > 15 ? item.data.description.slice(0, 15) + '...' : item.data.description }}</view>
                <view>项目类别：{{ item.data.category }}</view>
                <view>项目人数：{{ item.data.scale }}</view>
                <view>项目状态：{{ item.data.state }}</view>
                <view>招募状态：{{ item.data.que }}</view>
            </view>
        </view>

        <!-- 没有结果时的提示 -->
        <view v-else class="nores_box">
            <text class="nores">没有找到相关结果</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            results: [],
            loading: false
        };
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        async fetchResults(keyword) { 
            this.loading = true; // 开始加载
            
            try {
                const res = await uniCloud.callFunction({
                    name: 'searchproject', 
                    data: { keyword: keyword }
                });
                // Check the response from the cloud function
                console.log('云函数返回:', res);
                if (res.result.code === 200) {
                    this.results = res.result.data;
                } else {
                    console.error('Search Error:', res.result.message);
                }
            } catch (error) {
                console.error('Function call error:', error);
            } finally {
                this.loading = false; // 完成加载
            }
        }
    },
    onLoad(options) {
        // Use onLoad to access page parameters
        const keyword = options.keyword || ''; 
        console.log('搜索关键词:', decodeURIComponent(keyword)); // Check keyword
        
        if (keyword) {
            this.fetchResults(decodeURIComponent(keyword)); 
        } else {
            console.warn('没有找到相关关键词。'); // Warning for no keyword
        }
    }
};
</script>

<style>
.results-container {
    margin-top: 80px; 
}
.result-item {
    margin: 25rpx 10rpx;
    padding: 10rpx;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #ffffff;
}
.box2 {
    width: 100%;
    height: 80px;
    background: #FFFFFF;
    display: flex;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
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
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500rpx; 
    font-size: 50rpx;
    color: #999;
}
</style>
