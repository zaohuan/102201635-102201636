<template>
    <view>
        <view>
            <view class="box2">
                <view class="back-btn" @click="goBack">
                    <text class="back-icon">返回</text>
                </view>
                <text class="biaoti2">
                    工程技术
                </text>
            </view>
        </view>
		<!-- 显示加载状态 -->
		<view v-if="loading" class="loading">加载中...</view>
		
		 <!-- 显示结果 -->
		<view v-else-if="results.length > 0"  class="results-container">
		    <view v-for="(item, index) in results" :key="index" class="result-item" @click="navigateToDetails(item)">
		        <view>项目名称：{{ item.data.name }}</view> 
				<!-- 项目简介查询结果只显示部分即可 -->
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
            results: [],  // 用来存储查询到的项目数据
            loading: false // 加载状态
        };
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        async fetchProjects() {
            this.loading = true;  // 开始加载

            const db = uniCloud.database();  // 获取数据库实例
            const collection = db.collection('projects'); 
            
            try {
                // 查询数据库，获取 category 对应 的项目
                const res = await collection.where({
                    'data.category': '工程技术'
                }).get();

                //console.log('数据库查询结果:', res);
                
                if (res.result.data && res.result.data.length > 0) {
                    this.results = res.result.data;  // 设置项目数据
                } else {
                    //console.error('没有找到相关项目');
                }
            } catch (error) {
                //console.error('查询错误:', error);
            } finally {
                this.loading = false;  // 完成加载
            }
        },
		navigateToDetails(item) {
					  const projectData = {
					    name: item.data.name,
					    description: item.data.description,
					    category: item.data.category,
					    scale: item.data.scale,
					  		state:item.data.state,
					  		que:item.data.que ,
							username:item.data.username,
						  lianxi:item.data.lianxi,
					  };
		        // 异步存储项目信息
		        uni.setStorage({
		           key: 'projectData', // 存储的键
		           data: projectData, // 存储的值
		           success: () => {
		             // 跳转到 ProjectList 页面
		             uni.navigateTo({
		               url: '/pages/projectdetailfenlei/projectdetailfenlei' // 确保路径正确
		             });
		           }
		         });
		    }
    },
    mounted() {
        this.fetchProjects();  
    }

};
</script>

<style>
	.result-item {
		margin: 25rpx 10rpx;
		padding: 10rpx;
		border: 1px solid #ccc;
		border-radius: 15px;
		background-color: #ffffff;
	
	}
    .box2{
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
	.loading {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 500rpx; 
	    font-size: 50rpx;
	    color: #999;
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
	.results-container {
	    margin-top: 80px; 
	}
</style>
