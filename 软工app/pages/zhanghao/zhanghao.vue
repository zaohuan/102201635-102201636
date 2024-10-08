<template>
  <view>
    <view class="box3">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">返回</text>
      </view>
      <text class="biaoti2">账号与安全</text>
    </view>
    <view class="containerr">
      <view class="form-item">
        <text>新密码：</text>
        <input v-model="newPassword" type="password" placeholder="请输入新密码" />
      </view>
      <view class="form-item">
        <text>确认密码：</text>
        <input v-model="confirmPassword" type="password" placeholder="请确认新密码" />
      </view>
      <button class="xiugaimima" @click="updatePassword">修改密码</button>
      <text v-if="errorMessage">{{ errorMessage }}</text>
      
      <!-- 添加退出账号功能 -->
      <button class="logout-btn" @click="logout">退出账号</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    async updatePassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.errorMessage = '请填写所有字段';
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = '两次密码输入不一致';
        return;
      }
      const usernameRes = uni.getStorageSync('username');
      if (!usernameRes) {
        this.errorMessage = '用户未登录';
        return;
      }

      try {
        const response = await uniCloud.callFunction({
          name: 'updatePassword', 
          data: {
            username: usernameRes,
            newPassword: this.newPassword 
          }
        });

        if (response.result.code === 200) {
          uni.showToast({
            title: '密码修改成功',
            icon: 'success'
          });
          this.newPassword = '';
          this.confirmPassword = '';

          // 修改成功后跳转到 welcome 页面
          uni.redirectTo({
            url: '/pages/welcome/welcome'
          });
        } else {
          this.errorMessage = response.result.message;
        }
      } catch (error) {
        this.errorMessage = '修改密码失败，请重试';
      }
    },

    // 退出账号功能
    logout() {
      uni.showModal({
        title: '确认退出',
        content: '您确定要退出当前账号吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除本地存储的用户信息
            uni.removeStorageSync('username');

            // 跳转到 welcome 页面
            uni.redirectTo({
              url: '/pages/welcome/welcome'
            });
          }
        }
      });
    }
  }
};
</script>

<style>
.box3 {
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
.form-item {
    margin: 20px 15px;
}
.containerr {
    padding: 20px;
}
input {
    padding: 10px;
    justify-content: center;
    margin: 10px 0;
    border: 1px solid #ccc;
}
.xiugaimima {
    width: 40%;
    padding: 10px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 5px;
}

.logout-btn {
    width: 40%;
    padding: 10px;
    background-color: #ff3b30;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
}
</style>
