<template>
  <view class="container">
    <view class="welcome-text">
      <text>欢迎使用我们的应用</text>
    </view>
    <view class="button-group">
      <button @click="navigateToLogin">登录</button>
      <button @click="navigateToRegister">注册</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    // 跳转到登录页面
    navigateToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    // 跳转到注册页面
    navigateToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
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
  flex-direction: column;
}

.welcome-text {
  margin-bottom: 50px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  width: 200px;
  padding: 15px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
}
</style>
