<template>
    <view>
		<view :style="{ height: statusBarHeight + 'px' }"></view>
        <view class="box1" style="{ marginTop: statusBarHeight + 'px' }">
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
                statusBarHeight: 0 
            }
        },
		mounted(){
			 const systemInfo = uni.getSystemInfoSync();
			 this.statusBarHeight = systemInfo.statusBarHeight; 
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
        padding-left: 60%;
        padding-top: 17%;
    }
    .biaoti{
        font-size: 55rpx;
        font-weight: 700;
        padding-left: 10%;
        padding-top: 15%;
        padding-bottom:25px;
		white-space: nowrap;
    }
</style>
