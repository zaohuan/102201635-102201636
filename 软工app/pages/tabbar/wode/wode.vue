<template>
  <view class="container">
    <view class="box1">
      <text class="biaoti">我的</text>	
    </view>
    <view class="wode">
      <image class="wode_image" src="../../../static/logo.png"></image>
      <view class="info">
        <text class="detailshow">昵称: {{ username }}</text>
        <text class="detailshow">姓名: {{ realname }}</text>
        <text class="detailshow">学院: {{ academy }}</text>
        <text class="detailshow">身份: {{ identity }}</text>
      </view>
    </view>
    <view class="xiangmu" @click="xiangmu">
      <text class="xuanxiang">我的项目</text>
    </view>
    <view class="renzhen">
      <text class="xuanxiang" @click="renzheng">完善/修改个人信息</text>
    </view>	
    <view class="shezhi" @click="shezhi">
      <text class="xuanxiang">设置</text>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      username: '',  // 用户名
      realname: '',  // 用户真实姓名
      academy: '',   // 用户学院
      identity: ''   // 用户身份
    };
  },
  methods: {
    shezhi() {
      uni.navigateTo({
        url: "/pages/shezhi/shezhi"
      });
    },
    xiangmu() {
      uni.navigateTo({
        url: "/pages/myProject/myProject"
      });
    },
    renzheng() {
      uni.navigateTo({
        url: "/pages/wanshan/wanshan"
      });
    },
    async getUserData() {
      try {
        const res = await uniCloud.callFunction({
          name: 'getdetailbyusername',
          data: {
            username: this.username  
          }
        });

        if (res.result.code === 200 && res.result.data) {
          const userData = res.result.data;
          // 将查询到的用户信息绑定到data
          this.realname = userData.realname;
          this.academy = userData.academy;
          this.identity = userData.identity;
        } else {
          console.error('获取用户信息失败', res.result.message);
        }
      } catch (error) {
        console.error('调用云函数失败', error);
      }
    }
  },
  mounted() {
    // 获取本地存储中的用户信息
    uni.getStorage({
      key: 'userInfo',
      success: (res) => {
        if (res.data) {
          this.username = res.data.username; // 获取用户名
          this.getUserData();  // 调用方法获取其他信息
        }
      },
      fail: () => {
        console.error('获取本地用户信息失败');
      }
    });
  }
};

</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
	}
	.box1{
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		display: flex;
		
	}
	
	.biaoti{
		font-size: 55rpx;
		font-weight: 700;
		padding-left: 25px;
		padding-top: 60px;
		padding-bottom:25px;
	}
	
	.touxiang{
		position: absolute;
	}
	.wode{
		display: flex;
		flex-direction: row;
		margin-top: 20px;
		margin-left:15px;
		background-color: #FFFFFF;
		width:380px;
		height: 166px;
		border-radius:50px;
	}
	.wode_image{
		padding-left: 15px;
		padding-top: 42px;
		width:80px;
		height: 80px;
	}
	.info{
		width: 250px;
		height: 80px;
		padding-left: 20px;
		padding-top: 15px;
		display: flex;
		flex-direction: column;
	}
	.detailshow{
		font-size: 20px;
		padding: 5px;
	}
	.xiangmu{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
	}
	.renzhen{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
	}
	.shezhi{
		background-color: #FFFFFF;
		border-radius: 50px;
		margin-top: 40px;
		margin-left: 30px;
		width:330px;
		height:50px;
		display: flex;
		justify-content: center;
		
	}
	.xuanxiang{
		font-size: 20px;
		padding-top: 10px;
	}
</style>
