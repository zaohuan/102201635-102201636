<template>
  <view class="container">
    <view class="form-item">
      <text>项目名称：</text>
      <input v-model="projectName" placeholder="请输入项目名称" />
    </view>
    
    <view class="form-item">
      <text>项目简介：</text>
      <uni-easyinput 
        type="textarea" 
        autoHeight
		:maxlength="-1"
        v-model="projectDescription" 
        placeholder="请输入项目简介" 
      ></uni-easyinput>
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
      <input 
        type="number" 
        v-model="projectScale" 
        placeholder="请输入目前参与项目的人数(请输入数字)" 
        @input="validateScale" 
      />
    </view>
    
    <view class="form-item">
      <text>是否缺人：</text>
      <picker value="selectedQue" :range="ques" @change="onQueChange">
        <view class="picker">
          {{ ques[selectedQue] || '请选择' }}
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
    <view class="form-item">
      <text>联系方式：</text>
      <input v-model="lianxi" placeholder="请输入联系方式" />
    </view>
    <button @click="updateProject">修改项目</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectScale: '',
      categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
      states: ['准备中', '进行中', '已完结'],
      ques: ['是', '否'],
      selectedCategory: undefined,
      selectedState: undefined,
      selectedQue: undefined,
      projectId: '' ,// 用于存储项目ID
	  lianxi:'',
    };
  },
  onLoad(options) {
    this.projectId = options.id; // 获取传递过来的项目 ID
    this.getProjectDetails(this.projectId); // 加载项目的详细信息
  },
  methods: {
	  validateScale() {
	      const isValid = /^[0-9]*$/.test(this.projectScale);
	      if (!isValid) {
	        uni.showToast({
	          title: '请输入有效的数字',
	          icon: 'none'
	        });
	        this.projectScale = this.projectScale.replace(/[^0-9]/g, ''); // 只保留数字
	      }
	    },
    async getProjectDetails(id) {
      const res = await uniCloud.callFunction({
        name: 'getProjectDetails',
        data: { id }
      });
      if (res.result) {
        const project = res.result;
        this.projectName = project.data.name;
        this.projectDescription = project.data.description;
        this.selectedCategory = this.categories.indexOf(project.data.category);
        this.projectScale = project.data.scale;
        this.selectedState = this.states.indexOf(project.data.state);
        this.selectedQue = this.ques.indexOf(project.data.que);
		this.lianxi = project.data.lianxi;
      }
    },
    async updateProject() {
      if (!this.projectName || !this.projectDescription || this.selectedCategory === undefined || !this.projectScale || this.selectedState === undefined || this.selectedQue === undefined||!this.lianxi) {
        uni.showToast({
          title: '请填写所有字段',
          icon: 'none'
        });
        return;
      }
      
      const projectData = {
        id: this.projectId,
        name: this.projectName,
        description: this.projectDescription,
        category: this.categories[this.selectedCategory],
        scale: this.projectScale,
        state: this.states[this.selectedState],
        que: this.ques[this.selectedQue],
		lianxi:this.lianxi,
      };

      try {
        await uniCloud.callFunction({
          name: 'updateProject',
          data: projectData
        });
        uni.showToast({
          title: '项目修改成功',
          icon: 'success'
        });
        uni.navigateTo({
          url: '/pages/myProject/myProject' // 修改成功后跳转到 myproject 页面
        });
      } catch (error) {
        console.error(error);
        uni.showToast({
          title: '项目修改失败',
          icon: 'none'
        });
      }
    },
    onCategoryChange(e) {
      this.selectedCategory = e.detail.value;
    },
    onStateChange(e) {
      this.selectedState = e.detail.value;
    },
    onQueChange(e) {
      this.selectedQue = e.detail.value;
    },
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
  background-color: #007AFF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
