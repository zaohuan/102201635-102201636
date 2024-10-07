<template>
	<view class="container">
		<view class="box3">
		  <view class="back-btn" @click="goBack">
		    <text class="back-icon">返回</text>
		  </view>
		  <text class="biaoti2">项目详情</text>
		</view>
		
		<view class="ddetails" v-if="projectData">
			<text>项目名称：{{ projectData.name }}</text>
			<text>项目简介：{{ projectData.description }}</text>
			<text>项目分类：{{ projectData.category }}</text>
			<text>项目人数规模：{{ projectData.scale }}</text>
			<text>是否缺人：{{ projectData.que }}</text>
			<text>项目状态：{{ projectData.state}}</text>
		</view>
		<view v-else>
			<text>没有项目数据</text>
		</view>
	</view>	
			
			
				
			
			
	

</template>

<script>
export default {
  data() {
    return {
      projectData: null
    };
  },
  onLoad() {
    // 获取存储的项目数据
    uni.getStorage({
      key: 'projectData',
      success: (res) => {
        this.projectData = res.data; // 将数据存储到项目数据中
      },
      fail: () => {
        console.log('没有找到项目数据');
      }
    });
  },
  methods:{
	  goBack() {
	    uni.navigateBack({
	      delta: 1
	    });
	  },
  }
};
</script>

<style>
	.container{
			width:100%;
			display: flex;
			flex-direction: column;
		}
	.box1{
			width: 100%;
			height: 120px;
			background: #FFFFFF;
			display: flex;
			
		}
		
	.biaoti{
			font-size: 55rpx;
			font-weight: 700;
			padding-left: 25px;
			padding-top: 60px;
			padding-bottom:25px;
		}
	.ddetails{
		margin:20px;
		display: flex;
		flex-direction: column;
		word-wrap: break-word;
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
	.box3{
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
</style>
