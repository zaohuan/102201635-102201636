<template>
  <view class="container">
    <view class="form">
      <input v-model="username" placeholder="请输入用户名" />
      <input v-model="password" placeholder="请输入密码" type="password" />
      <button @click="login">登录</button>
      <text v-if="errorMessage">{{ errorMessage }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = '用户名和密码不能为空';
        return;
      }

      try {
        // 调用云函数或数据库检查用户
        const response = await uniCloud.callFunction({
          name: 'loginuser',
          data: {
            username: this.username,
            password: this.password
          }
        });
        
        if (response.result.code === 200) {
          // 登录成功，存储用户信息
          uni.setStorage({
            key: 'userInfo', // 存储的键
            data: response.result.userInfo, // 存储的值
            success: () => {
              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });
              uni.switchTab({
                url: '/pages/tabbar/shouye/shouye'
              });
            }
          });
        } else {
          this.errorMessage = response.result.message;
        }
      } catch (error) {
        this.errorMessage = '登录失败，请重试';
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 80%;
  max-width: 300px;
}

input {
  width: 100%;
  padding: 10px;
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

text {
  color: red;
}
</style>
