<template>
	<view class="container">
		<view class="box1">
			<text class="biaoti">
				项目详情
			</text>	
			<text class="fanhui" @click="fanhui">
				返回
			</text>
		</view>
		
		<view class="details" v-if="projectData">
			<uni-section class="mb-10" title="基础用法" sub-title="副标题"></uni-section>
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
	  fanhui()
	  {
	  	uni.navigateTo({
	  		url:"/pages/myProject/myProject"
	  	})
	  }
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
.details{
	margin-top: 20px;
	display: flex;
	flex-direction: column;
}
.fanhui{
		font-size: 20px;
		padding-top: 70px;
		padding-left: 190px;
	}
</style>
