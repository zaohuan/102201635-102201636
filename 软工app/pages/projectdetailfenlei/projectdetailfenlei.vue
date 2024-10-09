<template>
	<view class="container">
		<view class="box3">
		  <view class="back-btn" @click="goBack">
		    <text class="back-icon">返回</text>
		  </view>
		  <text class="biaoti2">项目详情</text>
		</view>
		<view v-if="loading" class="loading">加载中...</view>
		<view class="ddetails" v-if="l1">
			<text>项目名称：{{ projectData.name }}</text>
			<text>项目简介：{{ projectData.description }}</text>
			<text>项目分类：{{ projectData.category }}</text>
			<text>项目人数规模：{{ projectData.scale }}</text>
			<text>是否缺人：{{ projectData.que }}</text>
			<text>项目状态：{{ projectData.state}}</text>
			<text>创建人：{{projectData.username}}</text>
			<text>联系方式：{{projectData.lianxi}}</text>
			<text>创建人真实姓名：{{realname}}</text>
			<text>创建人所在学院：{{academy}}</text>
			<text>创建人身份：{{identity}}</text>
		</view>
		
		
	</view>	
			
			
				
			
			
	

</template>

<script>
export default {
  data() {
    return {
      projectData: null,
	  loading: false, // 加载状态
	  l1:false,
	  realname: '',
	  identity:'',
	  academy:'',
    };
  },
  onLoad() {
    // 获取存储的项目数据
	 
	
    uni.getStorage({
      key: 'projectData',
      success: (res) => {
        this.projectData = res.data; // 将数据存储到项目数据中
		this.getUserData();
		
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
	  async getUserData() {
		this.loading = true;
		this.l1=false;
	    try {
	      const res = await uniCloud.callFunction({
	        name: 'getdetailbyusername',
	        data: {
	          username: this.projectData.username
			  }
	      });
	  
	      if (res.result.code === 200 && res.result.data) {
	        const userData = res.result.data;
	        this.realname = userData.realname;
	        this.academy = userData.academy;
	        this.identity = userData.identity;
	      } else {
	        console.error('获取用户信息失败', res.result.message);
	      }
	    } catch (error) {
	      console.error('调用云函数失败', error);
	    }finally{
			this.loading = false;  // 完成加载
			this.l1=true;
		}
	  },
  },
  
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
	.loading {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 500rpx; 
	    font-size: 50rpx;
	    color: #999;
		
	}
</style>
