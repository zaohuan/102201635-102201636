<template>
    <view>
        <view>
            <view class="box1">
                <text class="biaoti">首页</text>
                <image class="jia" src="../../../static/jia.png" @tap="toggleView"></image>
            </view>
            <view v-if="showView" class="menu-overlay">
                <view class="menu-content">
                    <text class="chuang" @tap="chuang">创建项目</text>
                    
                    <button @tap="toggleView" style="margin-top: 40px;">关闭</button>
                </view>
            </view>
            <uni-search-bar
                class="uni-mt-10"
                radius="5"
                placeholder="搜索人/群/项目"
                clearButton="auto"
                cancelButton="none"
                @confirm="search"
                v-model="searchKeyword"
            />
            <Daohang />
        </view>
		<view class="recommended-section">
		      <view class="tuijian_T">
				  推荐项目
				  <image class="change-btn" @click="loadNextBatch" src="../../../static/huanyipi.jpg"></image>
			  </view>
		      
		      <view class="project-list">
		        <uni-list>
		          <uni-list-item @click="jump"
		            v-for="(project, index) in recommendedProjects" 
		            :key="index" 
		            :title="project.data.name" 
		            :note="project.data.description.length > 15 ? project.data.description.slice(0, 15) + '...' : project.data.description"
		            :clickable="true">
		          </uni-list-item>
		        </uni-list>
		      </view>  
		</view>
        <view class="tuijian">
            <view class="tuijian_box tuijian_box2">
                <view class="tuijian_T">示例项目</view>
            </view>
            <Tuijian />
        </view>
		
    </view>
</template>

<script>
import Daohang from "../../../uni_modules/daohang/daohang.vue";
import Tuijian from "../../../uni_modules/tuijian/tuijian.vue";

export default {
    data() {
        return {
            searchKeyword: '', 
            showView: false,
			allProjects: [], // 全部可供推荐的项目
			      recommendedProjects: [], // 当前显示的推荐项目
			      currentIndex: 0, // 用来控制推荐项目的批次
			      batchSize: 3 // 每次显示 3 个项目
        };
    },
	mounted(){
		 this.fetchAllProjects(); // 页面加载时获取所有可推荐的项目
	},
    methods: {
		jump(){
			uni.navigateTo({
			  url: '/pages/projectdetailfenlei/projectdetailfenlei'
			});
		},
        toggleView() {
            this.showView = !this.showView;
            console.log('Toggle View:', this.showView);
        },
        chuang() {
            uni.navigateTo({
                url: "/pages/chuangjianxiangmu/chuangjianxiangmu"
            });
        },
        search() {
            if (this.searchKeyword.trim()) {
                uni.navigateTo({
                    url: `/pages/sousuo/sousuo?keyword=${encodeURIComponent(this.searchKeyword)}`
                });
            } else {
                uni.showToast({
                    title: '请输入搜索关键词',
                    icon: 'none',
                });
            }
        },
		// 获取所有推荐项目（从云数据库中获取）
		      async fetchAllProjects() {
		          const db = uniCloud.database();
		    
		          // 查询所有项目（排除状态为“已完结”的项目）
		          const res = await db.collection('projects')
		            .where({
		              $or: [
		                { 'data.state': "进行中" },
		                { 'data.state': "准备中" }
		              ]
		            })
		            .get();
					console.log('res',res);
		          if (res.result.data.length > 0) {
		            this.allProjects = res.result.data;
		    
		            // 根据项目状态进行排序，优先推荐“准备中”的项目
		            this.allProjects.sort((a, b) => {
		              const priority = {
		                '准备中': 1,
		                '进行中': 2,
		                '已完结': 3 // 不会被选中
		              };
		              return priority[a.state] - priority[b.state];
		            });
		    
		            this.loadNextBatch(); // 加载初始的推荐项目
		          } else {
		            uni.showToast({ title: '没有可推荐的项目', icon: 'none' });
		          }
		        },
		    
		    // 加载下一批推荐项目
		    loadNextBatch() {
		      if (this.allProjects.length === 0) {
		        uni.showToast({ title: '没有可推荐的项目', icon: 'none' });
		        return;
		      }
		
		      // 从当前索引开始获取 3 个项目
		      const startIndex = this.currentIndex;
		      const endIndex = startIndex + this.batchSize;
		
		      this.recommendedProjects = this.allProjects.slice(startIndex, endIndex);
		
		      // 更新当前索引，循环显示下一批
		      if (endIndex >= this.allProjects.length) {
		        this.currentIndex = 0; // 如果已经显示完所有项目，则从头开始
		      } else {
		        this.currentIndex = endIndex;
		      }
		    },
		  
    },
    components: {
        Daohang,
        Tuijian    
    },
};
</script>

<style>
    .menu-overlay {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .menu-content {
        display: flex;
        flex-direction: column;
        width: 80%;
        height: 200px;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
    }
    .tuijian_box2 {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0 15px;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
    }

    .tuijian_T {
        font-size: 20px;
        font-weight: 700;
    }

    .box1 {
        width: 100%;
        height: 120px;
        background: #FFFFFF;
        display: flex;
    }

    .biaoti {
        font-size: 55rpx;
        font-weight: 700;
        padding-left: 10%;
        padding-top: 15%;
        padding-bottom: 25px;
        white-space: nowrap;
    }

    .jia {
        width: 23px;
        height: 23px;
        padding-left: 60%;
        padding-top: 17%;
    }

    .chuang {
        font-size: 25px;
        padding-top: 15px;
        text-align: center;
    }

    

    button {
        width: 100%;
        padding: 10px;
        background-color: #007aff;
        color: #fff;
        border: none;
        border-radius: 5px;
    }
	.recommended-section {
	  position: relative; /* 设置为相对定位以放置按钮 */
	  padding: 20px;
	}
	
	.tuijian_T {
	  font-size: 20px;
	  font-weight: bold;
	  margin-bottom: 10px;
	}
	
	.project-list {
	  margin-top: 20px;
	}
	
	.change-btn {
	  position: absolute;  /* 设置按钮为绝对定位 */
	  margin-top: 0%;  /*顶部对齐 */
	      margin-left: 55%;       /* 右侧对齐 */
	  padding: 10px 20px;
	  
	  
	  border: none;
	  border-radius: 5px;
	  height: 20px;
	  width: 20px;
	  font-size: 16px;
	}
</style>
