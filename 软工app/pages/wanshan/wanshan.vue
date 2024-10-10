<template>
  <view>
	<view :style="{ height: statusBarHeight + 'px' }"></view>
    <view class="box6" :style="{ top: statusBarHeight + 'px' }">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">返回</text>
      </view>
      <text class="biaoti2">个人信息</text>
    </view>
    <view class="container">
      <view class="form-item">
        <text>姓名：</text>
        <input v-model="realname" placeholder="请输入姓名" />
      </view>
      <view class="form-item">
        <text>学院：</text>
        <picker :value="selectacademy" :range="academy" @change="onacademyChange">
          <view class="picker">
            {{ academy[selectacademy] || '请选择选择学院' }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text>身份：</text>
        <picker :value="selectidentity" :range="identity" @change="onidentityChange">
          <view class="picker">
            {{ identity[selectidentity] || '请选择选择身份' }}
          </view>
        </picker>
      </view>
      <button @click="submitForm">确认</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      realname: '',
      selectacademy: null, // 初始化为 null
      selectidentity: null, // 初始化为 null
      academy: ['计算机与大数据学院', '化工学院', '电气工程与自动化学院', '机械工程与自动化学院', '土木工程学院', '环境与安全工程学院', '经济与管理学院', '物理与信息学院', '人文社会科学学院', '其他学院'],
      identity: ['学生', '老师'],
	  statusBarHeight: 0
    };
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    onacademyChange(e) {
      this.selectacademy = e.detail.value; // 更新选择的学院
    },
    onidentityChange(e) {
      this.selectidentity = e.detail.value; // 更新选择的身份
    },
    async submitForm() {
      if (!this.realname || this.selectacademy === null || this.selectidentity === null) {
        uni.showToast({
          title: '请填写所有字段',
          icon: 'none'
        });
        return;
      }

      const userData = {
        username: this.username,
        realname: this.realname,
        academy: this.academy[this.selectacademy],
        identity: this.identity[this.selectidentity]
      };

      try {
        const response = await uniCloud.callFunction({
          name: 'detailidentity',
          data: userData
        });

        if (response.result.code === 200) {
          uni.showToast({
            title: '修改成功',
            icon: 'success'
          });
          uni.setStorage({
            key: 'userInfo',
            data: userData
          });
          this.resetForm();
          uni.switchTab({
            url: '/pages/tabbar/wode/wode'
          });
        } else {
          uni.showToast({
            title: response.result.message,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error(error);
        uni.showToast({
          title: '确认失败，稍后再试',
          icon: 'none'
        });
      }
    },
    resetForm() {
      this.realname = '';
      this.selectacademy = null; // 重置为 null
      this.selectidentity = null; // 重置为 null
    }
  },
  mounted() {
    uni.getStorage({
      key: 'userInfo',
      success: (res) => {
        if (res.data) {
          this.username = res.data.username;
          this.realname = res.data.realname;
          this.selectacademy = this.academy.indexOf(res.data.academy);
          this.selectidentity = this.identity.indexOf(res.data.identity);
		  const systemInfo = uni.getSystemInfoSync();
		  this.statusBarHeight = systemInfo.statusBarHeight;
        }
      },
      fail: () => {
        console.error('获取用户信息失败');
      }
    });
  }
};
</script>

<style>
.container {
  padding: 20px;
  margin-top: 80px;
  
}
.form-item {
  margin-bottom: 15px;
}
.picker {
  justify-content: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
}
.box6 {
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  display: flex;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  position: fixed;
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

</style>
