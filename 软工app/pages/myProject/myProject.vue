<template>
	<view class="container">
		<view class="box1">
			<text class="biaoti">
				我的项目
			</text>	
			<text class="fanhui" @click="fanhui">
				返回
			</text>
		</view>
		<uni-collapse>
		    <uni-collapse-item :show-animation="true" title="我创建的项目">
		        <uni-list :border="true">
		           
		        </uni-list>
		    </uni-collapse-item>
		
		    <uni-collapse-item :show-animation="true" title="我加入的项目">
		        <uni-list :border="true">
		            
		        </uni-list>
		    </uni-collapse-item>
		</uni-collapse>
		
	</view>	
			
			
				
			
			
	

</template>

<script>
export default {
  data() {
    return {
     
    };
  },
 
  methods:{
	  fanhui()
	  {
	  	uni.switchTab({
	  		url:"/pages/tabbar/wode/wode"
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
