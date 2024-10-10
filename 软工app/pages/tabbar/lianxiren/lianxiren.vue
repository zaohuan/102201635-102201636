<template>
    <view>
		<view :style="{ height: statusBarHeight + 'px' }"></view>
        <view class="box1" style="{ marginTop: statusBarHeight + 'px' }">
            <view v-if="showView" class="gongneng">
                <button class="gongnengbutton1">搜索联系人</button>
                <button class="gongnengbutton2">添加联系人</button>
            </view>
            <text class="biaoti">联系人</text>
            <image class="sandian2" src="../../../static/sandian.png" @tap="toggleView"></image>
        </view>      

        <uni-collapse>
            <uni-collapse-item :show-animation="true" title="我的好友">
                <uni-list :border="true">
                    <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" :clickable="true" @click="liaotian"></uni-list-chat>
                    <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" :clickable="true" @click="liaotian"></uni-list-chat>
                    <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" :clickable="true" @click="liaotian"></uni-list-chat>
                    <uni-list-chat :avatar-circle="true" title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" :clickable="true" @click="liaotian"></uni-list-chat>
                </uni-list>
            </uni-collapse-item>

            <uni-collapse-item :show-animation="true" title="我的群组">
                <uni-list :border="true">
                    <uni-list-chat title="uni-app" :avatar-list="avatarList" badge-positon="left"></uni-list-chat>
                    <uni-list-chat title="uni-app" :avatar-list="avatarList" badge-positon="left">
                        <view class="chat-custom-right"></view>
                    </uni-list-chat>
                </uni-list>	
            </uni-collapse-item>
        </uni-collapse>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				statusBarHeight: 0 ,
                showView: false,
                avatarList: [
                    { url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png' },
                    { url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png' },
                    { url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png' }
                ]
            }
        },
		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight; 
		},
        methods: {
            liaotian() {
                console.log("chufa")
                uni.navigateTo({
                    url: "/pages/liaotian/liaotianjiemian"
                })
            },
            toggleView() {
              this.showView = !this.showView;
            }
        }
    }
</script>

<style lang="scss">
    .box1{
        width: 100%;
        height: 120px;
        background: #FFFFFF;
        display: flex;
        
    }
    .sandian2{
        width: 27px;
        height: 27px;
        padding-left: 52%;
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
    .gongneng {
        position: fixed;
        display: flex;
        flex-direction: column;
    }
    .gongnengbutton1 {
        margin-left: 150%;
        margin-top:50%;
        width: 100%;
		height: 50px;
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #ccc;
        border-radius: 5px;

    }
	.gongnengbutton2 {
	    margin-left: 150%;
	    width: 100%;
		height: 50px;
	    background-color: #ffffff;
	    color: #000000;
	    border: 1px solid #ccc;
	    border-radius: 5px;
	
	}
</style>
