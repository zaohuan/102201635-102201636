<template>
	<view class="container">
		<view :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="box5" :style="{ marginTop: statusBarHeight + 'px' }">
			<view class="back-btn" @click="fanhui">
				<text class="back-icon">返回</text>
			</view>
			<text class="biaoti2">我的项目</text>
		</view>
		<uni-collapse style="margin-top:80px ;" v-if="createdProjects.length > 0">
		    <uni-collapse-item :show-animation="true" title="我创建的项目">
		        <uni-list :border="true" v-if="createdProjects.length > 0">
					<uni-list-item 
						v-for="(project, index) in createdProjects" 
						:key="index"
						:title="project.data.name" 
						:note="getShortDescription(project.data.description)" 
						:clickable="true" 
						@click="navigateToDetails(project._id)">
					</uni-list-item>
		        </uni-list>
		    </uni-collapse-item>
		</uni-collapse>
	</view>	
</template>


<script>
export default {
  data() {
      return {
          createdProjects: [], // 存储我创建的项目
		  statusBarHeight: 0
      };
  },
  onShow(){
	  this.getProjects();
  },
  methods: {
    async getProjects() {
      const db = uniCloud.database();
      
      const usernameRes = await uni.getStorage({
        key: 'username'
      });
      const username = usernameRes.data; 
      
      if (username) {
        const createdRes = await db.collection('projects')
          .where({
              'data.username': username 
          })
          .get();
          
        this.createdProjects = createdRes.result.data;
      } else {
        console.error('未获取到用户名');
      }
    },
    getShortDescription(description) {
      if (description.length > 15) {
        return description.substring(0, 15) + '...';
      } else {
        return description;
      }
    },
    navigateToDetails(projectId) {
      uni.navigateTo({
        url: `/pages/projectDetails/projectDetails?id=${projectId}`
      });
    },
    fanhui() {
      uni.switchTab({
        url: "/pages/tabbar/wode/wode"
      });
    }
  },
  mounted() {
  	const systemInfo = uni.getSystemInfoSync();
  	this.statusBarHeight = systemInfo.statusBarHeight;
  }
};
</script>


<style>
.container{
		width:100%;
		display: flex;
		flex-direction: column;
	}

.biaoti2 {
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
	.box5{
	    width: 100%;
	    height: 80px;
	    background: #FFFFFF;
	    display: flex;
	    
	    justify-content: center;
	    align-items: center;
	    position: fixed;
		top: 0;
		z-index: 1000;
	}
</style>
