<template>
    <view>
        <view>
            <view class="box2">
                <view class="back-btn" @click="goBack">
                    <text class="back-icon">返回</text>
                </view>
                <text class="biaoti2">
                    人文历史
                </text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
}
</script>

<style>
    .box2{
        width: 100%;
        height: 80px;
        background: #FFFFFF;
        display: flex;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        justify-content: center;
        align-items: center;
        position: relative; 
    }
    .biaoti2{
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
</style>
