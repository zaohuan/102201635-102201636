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
    <button @click="createProject">创建项目</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectScale: '',
      selectedCategory: null,
      selectedState: null,
      selectedQue: null,
      categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
      states: ['准备中', '进行中', '已完结'],
      ques: ['是', '否'],
	  lianxi:null,
    };
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
    onCategoryChange(e) {
      this.selectedCategory = e.detail.value;
    },
    onStateChange(e) {
      this.selectedState = e.detail.value;
    },
    onQueChange(e) {
      this.selectedQue = e.detail.value;
    },
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    async createProject() {
      if (!this.projectName || !this.projectDescription || 
          (this.selectedCategory === null && this.selectedCategory !== 0) || 
          !this.projectScale || 
          (this.selectedState === null && this.selectedState !== 0) || 
          (this.selectedQue === null && this.selectedQue !== 0)||!this.lianxi) {
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
        state: this.states[this.selectedState],
        que: this.ques[this.selectedQue],
		lianxi:this.lianxi,
      };

      try {
        const usernameRes = await uni.getStorage({
          key: 'username'
        });
        const username = usernameRes.data; 
        projectData.username = username;
        console.log(projectData);
        
        await uniCloud.callFunction({
          name: 'createProject',
          data: projectData
        });

        uni.showToast({
          title: '项目创建成功',
          icon: 'success'
        });

        uni.setStorage({
          key: 'projectData',
          data: projectData,
          success: () => {
            uni.navigateTo({
              url: '/pages/projectdetail/projectdetail'
            });
          }
        });

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
      return res.result;
    },
    resetForm() {
      this.projectName = '';
      this.projectDescription = '';
      this.projectScale = '';
      this.selectedCategory = null;
      this.selectedState = null;
      this.selectedQue = null;
	  this.lianxi=null;
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
