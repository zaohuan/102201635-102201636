<template>
  <view class="container">
    <!-- 显示加载状态 -->
    <view v-if="loading" class="loading">加载中...</view>

    <!-- 显示项目详情 -->
    <view v-else>
      <view class="boxx">
        <text class="biaotii">{{ project?.data?.name || '未找到项目名称' }}</text>
        <view class="details" v-if="project && project.data">
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
  </view>
</template>
<script>
export default {
  data() {
    return {
      project: null, // 存储项目的详细信息
      loading: false // 控制加载中状态
    };
  },
  
  onLoad(options) {
    const projectId = options.id; 
    if (projectId) {
      this.getProjectDetails(projectId); 
    } else {
      console.error('项目 ID 未传递');
    }
  },

  methods: {
    editProject(projectId) {
      uni.navigateTo({
        url: `/pages/editprojectDetails/editprojectDetails?id=${projectId}`
      });
    },
    // 获取项目详情
    async getProjectDetails(id) {
      this.loading = true; // 开始加载
      const db = uniCloud.database();
      try {
        const res = await db.collection('projects').doc(id).get(); 
        if (res.result.data.length > 0) {
          this.project = res.result.data[0]; 
        } else {
          console.error('未找到该项目');
        }
      } catch (error) {
        console.error('获取项目详情时出错', error);
      } finally {
        this.loading = false; // 完成加载
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

.boxx {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.biaotii {
  font-size: 24px;
  font-weight: bold;
}

.details {
  margin-top: 10px;
}

.details text {
  display: block;
  margin-bottom: 8px;
  word-wrap: break-word;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

button {
  margin-bottom: 10px;
  background-color: #007AFF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
