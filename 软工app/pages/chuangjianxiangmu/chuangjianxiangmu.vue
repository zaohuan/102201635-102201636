<template>
	
  <view class="container">
	
    <view class="form-item">
      <text>项目名称：</text>
      <input v-model="projectName" placeholder="请输入项目名称" />
    </view>
    <view class="form-item">
      <text>项目简介：</text>
      <input v-model="projectDescription" placeholder="请输入项目简介" />
    </view>
    <view class="form-item">
      <text>项目分类：</text>
       <picker value="selectedCategory" :range="categories" @change="onCategoryChange">
              <view class="picker">
                {{ categories[selectedCategory] || '请选择项目分类' }}
              </view>
        </picker>
    </view>
    <view class="form-item">
      <text>项目人数规模：</text>
      <input v-model="projectScale" placeholder="请输入目前参与项目的人数" />
    </view>
	<view class="form-item">
	  <text>是否缺人：</text>
	  <picker value="selectedQue" :range="ques" @change="onQueChange">
	         <view class="picker">
	           {{ ques[selectedQue] || '请选择项目状态' }}
	         </view>
	   </picker>
	</view>
	<view class="form-item">
	  <text>项目状态：</text>
	  <picker value="selectedState" :range="states" @change="onStateChange">
	         <view class="picker">
	           {{ states[selectedState] || '请选择项目状态' }}
	         </view>
	   </picker>
	</view>
	
    <button @click="createProject">创建项目</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectCategory: '',
      projectScale: '',
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文艺术', '交叉学科'], // 限定六个类别
	  states:['准备中','进行中','已完结'],
	  ques:['是','否'],
	  projectState: '',
    };
  },
  methods: {
	onCategoryChange(e) {
	        this.selectedCategory = e.detail.value; // 更新选择的类别
	    },
	onStateChange(e) {
		    this.selectedState = e.detail.value; // 更新选择的类别
		},
	onQueChange(e) {
		    this.selectedQue = e.detail.value; // 更新选择的类别
		},	
		goBack() {
		    uni.navigateBack({
		        delta: 1
		    });
		},
    async createProject() {
      if (!this.projectName || !this.projectDescription || !this.selectedCategory && this.selectedCategory !== 0 || !this.projectScale ||!this.selectedState && this.selectedState !==0 ||!this.selectedQue && this.selectedQue !==0) {
        uni.showToast({
          title: '请填写所有字段',
          icon: 'none'
        });
        return;
      }
	const nameExists = await this.checkProjectName(this.projectName);
	  if (nameExists) {
	    uni.showToast({
	      title: '项目名称已存在，请使用其他名称',
	      icon: 'none'
	    });
	    return;
	  }
      const projectData = {
        name: this.projectName,
        description: this.projectDescription,
        category: this.categories[this.selectedCategory],
        scale: this.projectScale,
		state:this.states[this.selectedState],
		que:this.ques[this.selectedQue],
      };

      try {
		 // 获取用户名
		    const usernameRes = await uni.getStorage({
		      key: 'username'
		    });
			const username = usernameRes.data; // 获取用户名
			 // 将用户名添加到项目数据中
			    projectData.username = username;
				console.log(projectData);
        await uniCloud.callFunction({
          name: 'createProject', // 云函数名称
          data: projectData
        });
        uni.showToast({
          title: '项目创建成功',
          icon: 'success'
        });
		 uni.setStorage({
		    key: 'projectData', // 存储的键
		    data: projectData, // 存储的值
		    success: () => {
		      // 跳转到 ProjectList 页面
		      uni.navigateTo({
		        url: '/pages/projectdetail/projectdetail' // 确保路径正确
		      });
		    }
		  });
	
        // 重置表单
        this.resetForm();
      } catch (error) {
        console.error(error);
        uni.showToast({
          title: '项目创建失败',
          icon: 'none'
        });
      }
	  
    },
	async checkProjectName(name) {
	  const res = await uniCloud.callFunction({
	    name: 'checkProjectName',
	    data: { name }
	  });
	  return res.result; // 返回是否存在
	  },
    resetForm() {
      this.projectName = '';
      this.projectDescription = '';
      this.projectCategory = 0;
      this.projectScale = '';
	  this.projectState =0;
	  this.projectQue =0;
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.form-item {
  margin-bottom: 15px;
}
input {
  padding: 10px;
  justify-content: center;
  margin: 10px 0;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.picker {
  justify-content: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
}
</style>
