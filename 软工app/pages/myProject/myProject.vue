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
		<uni-collapse v-if="createdProjects.length > 0">
		    <uni-collapse-item :show-animation="true" title="我创建的项目">
		        <uni-list :border="true" v-if="createdProjects.length > 0">
		            <uni-list-item 
		                v-for="(project, index) in createdProjects" 
		                :key="index"
		                :title="project.data.name" 
		                :note="project.data.description" 
						clickable="true" 
						@click="navigateToDetails(project._id)">
		            </uni-list-item>
		        </uni-list>
		    </uni-collapse-item>
		
		   <!-- <uni-collapse-item :show-animation="true" title="我加入的项目">
		        <uni-list :border="true">
		            <uni-list-item 
		                v-for="(project, index) in joinedProjects" 
		                :key="index" 
		                :title="project.projectName" 
		                :note="project.projectDetails"
		                clickable="true">
		            </uni-list-item>
		        </uni-list>
		    </uni-collapse-item> -->
		</uni-collapse>
		
	</view>	
			
			
				
			
			
	

</template>

<script>
export default {
  data() {
      return {
          createdProjects: [], // 存储我创建的项目
          joinedProjects: [] // 存储我加入的项目
      };
  },
 
  mounted() {
      
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
		      
		      console.log('查询时的用户名', username); 
		  
		      
		  
		      //确保用户名不为空
		      if (username) {
		          // 查询我创建的项目
		          const createdRes = await db.collection('projects')
		              .where({
		                  'data.username': username // 使用转换为字符串的 username
		              })
		              .get();
		          
		          // 把查询到的项目数据赋值给 createdProjects
		          this.createdProjects = createdRes.result.data;
		          
		          // 输出查询到的项目数据，检查是否获取到项目
		          console.log('查询到的项目:', this.createdProjects);
		      } else {
		          console.error('未获取到用户名');
		      }
		  },
  
          // // 假设加入的项目通过项目表中的 "members" 字段存储成员信息
          // const joinedRes = await db.collection('projects')
          //     .where({
          //         members: userID // 根据成员列表中的 userID 查询加入的项目
          //     })
          //     .get();
          // this.joinedProjects = joinedRes.result.data;
      
		navigateToDetails(projectId) {
		      uni.navigateTo({
		        url: `/pages/projectDetails/projectDetails?id=${projectId}` // 传递项目的 id
		      });
		    },
      // 返回按钮
      fanhui() {
          uni.switchTab({
              url: "/pages/tabbar/wode/wode"
          });
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
