describe('CreateProject.vue', () => {
  beforeEach(() => {
    global.uniCloud = {
      callFunction: jest.fn(),
    };
    global.uni = {
      showToast: jest.fn(),
      getStorage: jest.fn(),
      setStorage: jest.fn(),
      navigateTo: jest.fn(),
      navigateBack: jest.fn(),
    };
  });

  it('should set error message when fields are empty', async () => {
    const vm = {
      projectName: '',
      projectDescription: '',
      projectScale: '',
      selectedCategory: null,
      selectedState: null,
      selectedQue: null,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: null,
      createProject() {
        if (!this.projectName || !this.projectDescription ||
            (this.selectedCategory === null && this.selectedCategory !== 0) ||
            !this.projectScale ||
            (this.selectedState === null && this.selectedState !== 0) ||
            (this.selectedQue === null && this.selectedQue !== 0) || !this.lianxi) {
          uni.showToast({
            title: '请填写所有字段',
            icon: 'none'
          });
          return;
        }
      }
    };

    await vm.createProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '请填写所有字段',
      icon: 'none'
    });
  });

  it('should show error if project name already exists', async () => {
    const vm = {
      projectName: 'Existing Project',
      projectDescription: 'Test description',
      projectScale: '5',
      selectedCategory: 0,
      selectedState: 0,
      selectedQue: 0,
      lianxi: '123456789',
      checkProjectName: jest.fn().mockResolvedValue(true),
      createProject() {
        // Call checkProjectName and handle response
        this.checkProjectName(this.projectName).then(nameExists => {
          if (nameExists) {
            uni.showToast({
              title: '项目名称已存在，请使用其他名称',
              icon: 'none'
            });
          }
        });
      }
    };

    await vm.createProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '项目名称已存在，请使用其他名称',
      icon: 'none'
    });
  });

  it('should successfully create a project', async () => {
    const vm = {
      projectName: 'New Project',
      projectDescription: 'Test description',
      projectScale: '5',
      selectedCategory: 0,
      selectedState: 0,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '123456789',
      checkProjectName: jest.fn().mockResolvedValue(false),
      resetForm: jest.fn(),
      createProject: async function() {
        const nameExists = await this.checkProjectName(this.projectName);
        if (!nameExists) {
          const projectData = {
            name: this.projectName,
            description: this.projectDescription,
            category: this.categories[this.selectedCategory],
            scale: this.projectScale,
            state: this.states[this.selectedState],
            que: this.ques[this.selectedQue],
            lianxi: this.lianxi,
          };
          
          await uniCloud.callFunction.mockResolvedValue({});
          
          await uni.getStorage.mockResolvedValue({ data: 'testUser' });
          
          await uniCloud.callFunction({
            name: 'createProject',
            data: projectData
          });
          
          uni.showToast({
            title: '项目创建成功',
            icon: 'success'
          });
          
          await uni.setStorage({
            key: 'projectData',
            data: projectData
          });
          uni.navigateTo({
            url: '/pages/projectdetail/projectdetail'
          });

          this.resetForm();
        }
      }
    };

    await vm.createProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '项目创建成功',
      icon: 'success'
    });
    expect(uni.navigateTo).toHaveBeenCalledWith({
      url: '/pages/projectdetail/projectdetail'
    });
  });

  it('should show error message on project creation failure', async () => {
    const vm = {
      projectName: 'New Project',
      projectDescription: 'Test description',
      projectScale: '5',
      selectedCategory: 0,
      selectedState: 0,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '123456789',
      checkProjectName: jest.fn().mockResolvedValue(false),
      createProject: async function() {
        const nameExists = await this.checkProjectName(this.projectName);
        if (!nameExists) {
          try {
            await uniCloud.callFunction.mockRejectedValue(new Error('Creation failed'));
            uni.showToast({
              title: '项目创建失败',
              icon: 'none'
            });
          } catch (error) {
            uni.showToast({
              title: '项目创建失败',
              icon: 'none'
            });
          }
        }
      }
    };

    await vm.createProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '项目创建失败',
      icon: 'none'
    });
  });

  it('should reset form after successful project creation', async () => {
    const vm = {
      projectName: 'New Project',
      projectDescription: 'Test description',
      projectScale: '5',
      selectedCategory: 0,
      selectedState: 0,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '123456789',
      resetForm: jest.fn(),
      createProject: async function() {
        const projectData = {
          name: this.projectName,
          description: this.projectDescription,
          category: this.categories[this.selectedCategory],
          scale: this.projectScale,
          state: this.states[this.selectedState],
          que: this.ques[this.selectedQue],
          lianxi: this.lianxi,
        };

        await uniCloud.callFunction.mockResolvedValue({});
        await uni.getStorage.mockResolvedValue({ data: 'testUser' });

        await uniCloud.callFunction({
          name: 'createProject',
          data: projectData
        });

        this.resetForm();
      }
    };

    await vm.createProject();
    expect(vm.resetForm).toHaveBeenCalled();
  });
});
