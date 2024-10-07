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
    <view class="options">
      <view class="xiangmu" @click="xiangmu">
        <text class="xuanxiang">我的项目</text>
      </view>
      <view class="renzhen" @click="renzheng">
        <text class="xuanxiang">完善/修改个人信息</text>
      </view>  
      <view class="shezhi" @click="shezhi">
        <text class="xuanxiang">设置</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',  
      realname: '',  
      academy: '',   
      identity: ''   
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
  onShow() {
    uni.getStorage({
      key: 'userInfo',
      success: (res) => {
        if (res.data) {
          this.username = res.data.username; 
          this.getUserData();  
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
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.box1 {
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		display: flex;
	}

    .biaoti{
        font-size: 55rpx;
        font-weight: 700;
        padding-left: 10%;
        padding-top: 15%;
        padding-bottom:25px;
		white-space: nowrap;
    }

	.wode {
		display: flex;
		flex-direction: row;
		margin-top: 20px;
		background-color: #FFFFFF;
		width: calc(100% - 40px);
		height: 166px;
		border-radius: 50px;
		align-items: center;
	}

	.wode_image {
		padding-left: 15px;
		width: 80px;
		height: 80px;
	}

	.info {
		width: 250px;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
	}

	.detailshow {
		font-size: 20px;
		padding: 5px;
	}

	.options {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 40px;
		width: 100%;
		padding: 0 20px;
	}

	.xiangmu,
	.renzhen,
	.shezhi {
		background-color: #FFFFFF;
		border-radius: 50px;
		margin: 10px 0;
		width: calc(100% - 40px);
		height: 50px;
		display: flex;
		justify-content: center;
	}

	.xuanxiang {
		font-size: 20px;
		padding-top: 10px;
	}
</style>
