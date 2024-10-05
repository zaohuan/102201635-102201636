<template>
    <view>
        <view>
            <view class="box1">
                <text class="biaoti">首页</text>
            </view>
            <uni-search-bar
                class="uni-mt-10"
                radius="5"
                placeholder="搜索人/群/项目"
                clearButton="auto"
                cancelButton="none"
                @confirm="search"
                v-model="searchKeyword"
            />
            <Daohang />
        </view>
        <view class="tuijian">
            <view class="tuijian_box tuijian_box2">
                <view class="tuijian_T">推荐项目</view>
            </view>
            <Tuijian />
        </view>
    </view>
</template>

<script>
import Daohang from "../../../uni_modules/daohang/daohang.vue";
import Tuijian from "../../../uni_modules/tuijian/tuijian.vue";

export default {
    data() {
        return {
            searchKeyword: '', 
        };
    },
    methods: {
        search() {
            if (this.searchKeyword.trim()) {
                uni.navigateTo({
                    url: `/pages/sousuo/sousuo?keyword=${encodeURIComponent(this.searchKeyword)}` 
                });
            } else {
                uni.showToast({
                    title: '请输入搜索关键词',
                    icon: 'none',
                });
            }
        },
    },
    components: {
        Daohang,
        Tuijian	
    },
};
</script>

<style>
    .tuijian_box2 {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0 15px;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
    }

    .tuijian_T {
        font-size: 20px;
        font-weight: 700;
    }

    .box1 {
        width: 100%;
        height: 120px;
        background: #FFFFFF;
        display: flex;
    }

    .biaoti {
        font-size: 55rpx;
        font-weight: 700;
        padding-left: 25px;
        padding-top: 60px;
        padding-bottom: 25px;
    }
</style>
