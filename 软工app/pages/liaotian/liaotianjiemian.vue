<template>
	<view>
		<view>
		  <view style="background-color: black;padding-left: 20px;width: 100%;height: 20%;">
		  			  
		  </view>
		  <image src="../../static/logo.png" style="width: 50px; height: 50px;" @tap="toggleView"></image>
			
		  <!-- 覆盖全屏的弹出view -->
		 
		    <!-- 内容区域 -->
		    <view v-if="showView" style="position: fixed;margin-left: 80px; width: 80%; height: 200px; background-color: #fff; padding: 20px; border-radius: 10px;">
		      <text>覆盖全屏的弹出内容</text>
		      <button @tap="toggleView" style="margin-top: 20px;">关闭</button>
		    </view>
		  </view>
		
	</view>
</template>

<script>
export default {
  data() {
    return {
      showView: false
    };
  },
  methods: {
    toggleView() {
      this.showView = !this.showView;
    }
  }
};
</script>

<style>

</style>
