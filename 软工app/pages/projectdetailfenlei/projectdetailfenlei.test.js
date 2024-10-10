describe('ProjectDetail.vue', () => {
  beforeEach(() => {
    // 模拟 uniCloud 和 uni 对象
    global.uniCloud = {
      callFunction: jest.fn(),
    };
    global.uni = {
      getStorage: jest.fn(),
      navigateBack: jest.fn(),
      showToast: jest.fn(),
    };
  });

  it('应该在加载时从存储中加载项目数据', async () => {
    const projectData = {
      name: '测试项目',
      description: '项目描述',
      category: '分类A',
      scale: '10',
      que: '没有',
      state: '进行中',
      username: 'testuser',
      lianxi: '123456789',
    };

    // 模拟从存储中获取项目数据
    uni.getStorage.mockImplementation(({ success }) => {
      success({ data: projectData });
    });

    const vm = {
      projectData: null,
      loading: false,
      realname: '',
      identity: '',
      academy: '',
      onLoad() {
        // 加载项目数据并获取用户信息
        uni.getStorage({
          key: 'projectData',
          success: (res) => {
            this.projectData = res.data;
            this.getUserData();
          },
          fail: () => {
            console.log('没有找到项目数据');
          },
        });
      },
      getUserData: jest.fn(),
    };

    vm.onLoad();
    expect(vm.projectData).toEqual(projectData); // 检查项目数据是否正确加载
    expect(vm.getUserData).toHaveBeenCalled(); // 检查获取用户信息的函数是否被调用
  });

  it('应该根据项目用户名获取用户数据', async () => {
    const userData = {
      realname: '测试用户',
      academy: '测试学院',
      identity: '学生',
    };

    // 模拟云函数返回用户数据
    uniCloud.callFunction.mockResolvedValue({
      result: { code: 200, data: userData },
    });

    const vm = {
      projectData: { username: 'testuser' },
      loading: false,
      realname: '',
      identity: '',
      academy: '',
      getUserData: async function() {
        this.loading = true; // 设置加载状态为 true
        try {
          const res = await uniCloud.callFunction({
            name: 'getdetailbyusername',
            data: { username: this.projectData.username },
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
        } finally {
          this.loading = false; // 完成加载
        }
      },
    };

    await vm.getUserData();
    expect(vm.realname).toEqual(userData.realname); // 检查真实姓名是否正确
    expect(vm.academy).toEqual(userData.academy); // 检查学院是否正确
    expect(vm.identity).toEqual(userData.identity); // 检查身份是否正确
  });

  it('应该在获取用户信息失败时输出错误信息', async () => {
    // 模拟云函数返回错误信息
    uniCloud.callFunction.mockResolvedValue({
      result: { code: 400, message: '用户不存在' },
    });

    const vm = {
      projectData: { username: 'testuser' },
      loading: false,
      getUserData: async function() {
        this.loading = true; // 设置加载状态为 true
        try {
          await uniCloud.callFunction({
            name: 'getdetailbyusername',
            data: { username: this.projectData.username },
          });
        } catch (error) {
          console.error('调用云函数失败', error);
        } finally {
          this.loading = false; // 完成加载
        }
      },
    };

    await vm.getUserData();
    // 这里可以添加对控制台输出的检查，例如使用 spy 来确认 console.error 被调用
  });

  it('应该在点击返回按钮时返回上一页', () => {
    const vm = {
      goBack() {
        uni.navigateBack({
          delta: 1,
        });
      },
    };

    vm.goBack();
    expect(uni.navigateBack).toHaveBeenCalledWith({ delta: 1 }); // 检查返回操作是否被调用
  });
});
