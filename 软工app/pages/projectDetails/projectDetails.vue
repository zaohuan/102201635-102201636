<template>
  <view class="container">
    <view class="box1">
      <text class="biaoti">{{ project.data.name }}</text>
      <view class="details">
        <text>描述: {{ project.data.description }}</text>
        <text>分类: {{ project.data.category }}</text>
        <text>规模: {{ project.data.scale }}</text>
        <text>状态: {{ project.data.state }}</text>
        <text>是否缺人: {{ project.data.que }}</text>
      </view>
    </view>
    <view class="button-container">
      <button @click="editProject(project._id)">修改项目</button>
      <button>加入项目</button>
    </view>
  </view>
</template>



<script>
export default {
  data() {
    return {
      project: {} // 存储项目的详细信息
    };
  },

  onLoad(options) {
    const projectId = options.id; // 获取传递过来的项目 ID
    this.getProjectDetails(projectId);
  },
	onShow() {
	    const projectId = this.$options.route.params.id; // 获取项目 ID
	    if (projectId) {
			console.log('id',projectId)
	        this.getProjectDetails(projectId);
	    } else {
	        console.error('项目 ID 未传递');
	    }
	},


  methods: {
	  editProject(projectId){
		  console.log('id',projectId);
		  uni.navigateTo({
			   url: `/pages/editprojectDetails/editprojectDetails?id=${projectId}`
		  	
		  })
	  },
    // 获取项目详情
    async getProjectDetails(id) {
      const db = uniCloud.database();
	  
      const res = await db.collection('projects').doc(id).get(); // 根据项目 ID 查询详情
      if (res.result.data.length > 0) {
        this.project = res.result.data[0]; // 将项目详情赋值给 project 变量
      } else {
        console.error('未找到该项目');
      }
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.box1 {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.biaoti {
  font-size: 24px;
  font-weight: bold;
}

.details {
  margin-top: 10px;
}

.details text {
  display: block;
  margin-bottom: 8px;
}

.button-container {
  margin-top: 20px; /* 给按钮一个顶部间距 */
  display: flex;
  flex-direction: column; /* 按钮垂直排列 */
}

button {
  margin-bottom: 10px; /* 按钮之间的间距 */
  background-color: #007AFF; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  padding: 10px; /* 按钮内边距 */
  border: none; /* 去掉按钮边框 */
  border-radius: 4px; /* 按钮圆角 */
  cursor: pointer; /* 鼠标悬停时的指针样式 */
 }
</style>
