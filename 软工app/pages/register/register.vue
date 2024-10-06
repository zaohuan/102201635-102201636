<template>
  <view class="container">
    <view class="form">
      <input 
        v-model="username" 
        placeholder="请输入用户名" 
        id="username" 
        name="username" 
      />
      <input 
        v-model="password" 
        placeholder="请输入密码" 
        type="password" 
        id="password" 
        name="password" 
      />
      <input 
        v-model="confirmPassword" 
        placeholder="请确认密码" 
        type="password" 
        id="confirmPassword" 
        name="confirmPassword" 
      />
      <button @click="register">注册</button>
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
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.errorMessage = '所有字段不能为空';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = '密码和确认密码不一致';
        return;
      }

      try {
        const response = await uniCloud.callFunction({
          name: 'registeruser',
          data: {
            username: this.username,
            password: this.password
          }
        });
        
        console.log('Response:', response); // 打印响应
        if (response.result.code === 200) {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          });
          uni.navigateTo({
            url: '/pages/login/login'
          });
        } else {
          this.errorMessage = response.result.message;
        }
      } catch (error) {
        console.error('Registration error:', error); // 打印错误信息
        this.errorMessage = '注册失败，请重试';
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
  padding: 10px;
  justify-content:center;
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
