<template>
    <view>
        <view class="image1">
            <view class="icon-container" @click="navigateToPage(1)">
                <image class="icon" :src="src1"></image>
                <text class="icon-text">自然科学</text>
            </view>
            <view class="icon-container" @click="navigateToPage(2)">
                <image class="icon" :src="src2"></image>
                <text class="icon-text">工程技术</text>
            </view>
            <view class="icon-container" @click="navigateToPage(3)">
                <image class="icon" :src="src3"></image>
                <text class="icon-text">医学健康</text>
            </view>
        </view>
        <view class="image2">
            <view class="icon-container" @click="navigateToPage(4)">
                <image class="icon" :src="src4"></image>
                <text class="icon-text">社会科学</text>
            </view>
            <view class="icon-container" @click="navigateToPage(5)">
                <image class="icon" :src="src5"></image>
                <text class="icon-text">人文历史</text>
            </view>
            <view class="icon-container" @click="navigateToPage(6)">
                <image class="icon" :src="src6"></image>
                <text class="icon-text">交叉学科</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src1: "/static/1.png",
                src2: "/static/2.png",
                src3: "/static/3.png",
                src4: "/static/4.png",
                src5: "/static/5.png",
                src6: "/static/6.png"
				}
			},
		methods: {
	        navigateToPage(pageIndex) {
	            let targetUrl = '';
	            // 根据图片点击跳转到不同页面
	            switch(pageIndex) {
	                case 1:
	                    targetUrl = '/pages/daohang1/daohang1';
	                    break;
	                case 2:
	                    targetUrl = '/pages/daohang2/daohang2';
	                    break;
	                case 3:
	                    targetUrl = '/pages/daohang3/daohang3';
	                    break;
	                case 4:
	                    targetUrl = '/pages/daohang4/daohang4';
	                    break;
	                case 5:
	                    targetUrl = '/pages/daohang5/daohang5';
	                    break;
	                case 6:
	                    targetUrl = '/pages/daohang6/daohang6';
	                    break;
	                default:
	                    console.error('未知的页面索引');
	                    return;
	            }
	            // 跳转到目标页面
	            uni.navigateTo({
	                url: targetUrl
				});
			}
		}
}
</script>

<style>
    .image1, .image2 {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap; 
        width: 100%; 
        margin: 10px 0; 
        justify-content: space-between;
    }

    .icon-container {
        display: flex;
        flex-direction: column; 
        align-items: center;
        width: 30%; 
    }

    .icon {
        width: 100%; 
        height: 200rpx;
        border-radius: 30px; 
    }

    .icon-text {
        margin-top: 5px;
        text-align: center; 
    }
</style>