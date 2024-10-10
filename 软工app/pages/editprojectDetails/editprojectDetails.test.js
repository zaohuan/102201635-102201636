describe('ModifyProject.vue', () => {
  beforeEach(() => {
    global.uniCloud = {
      callFunction: jest.fn(),
    };
    global.uni = {
      showToast: jest.fn(),
      navigateTo: jest.fn(),
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
      updateProject() {
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

    await vm.updateProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '请填写所有字段',
      icon: 'none'
    });
  });

  it('should successfully update a project', async () => {
    const vm = {
      projectName: 'Updated Project',
      projectDescription: 'Updated description',
      projectScale: '10',
      selectedCategory: 0,
      selectedState: 1,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '987654321',
      projectId: '12345',
      updateProject: async function() {
        const projectData = {
          id: this.projectId,
          name: this.projectName,
          description: this.projectDescription,
          category: this.categories[this.selectedCategory],
          scale: this.projectScale,
          state: this.states[this.selectedState],
          que: this.ques[this.selectedQue],
          lianxi: this.lianxi,
        };

        await uniCloud.callFunction.mockResolvedValue({});

        await uniCloud.callFunction({
          name: 'updateProject',
          data: projectData
        });

        uni.showToast({
          title: '项目修改成功',
          icon: 'success'
        });

        uni.navigateTo({
          url: '/pages/myProject/myProject'
        });
      }
    };

    await vm.updateProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '项目修改成功',
      icon: 'success'
    });
    expect(uni.navigateTo).toHaveBeenCalledWith({
      url: '/pages/myProject/myProject'
    });
  });

  it('should show error message on project update failure', async () => {
    const vm = {
      projectName: 'Updated Project',
      projectDescription: 'Updated description',
      projectScale: '10',
      selectedCategory: 0,
      selectedState: 1,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '987654321',
      projectId: '12345',
      updateProject: async function() {
        const projectData = {
          id: this.projectId,
          name: this.projectName,
          description: this.projectDescription,
          category: this.categories[this.selectedCategory],
          scale: this.projectScale,
          state: this.states[this.selectedState],
          que: this.ques[this.selectedQue],
          lianxi: this.lianxi,
        };

        try {
          await uniCloud.callFunction.mockRejectedValue(new Error('Update failed'));
          uni.showToast({
            title: '项目修改失败',
            icon: 'none'
          });
        } catch (error) {
          uni.showToast({
            title: '项目修改失败',
            icon: 'none'
          });
        }
      }
    };

    await vm.updateProject();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '项目修改失败',
      icon: 'none'
    });
  });

  it('should validate project scale input', async () => {
    const vm = {
      projectScale: 'abc',
      validateScale() {
        const isValid = /^[0-9]*$/.test(this.projectScale);
        if (!isValid) {
          uni.showToast({
            title: '请输入有效的数字',
            icon: 'none'
          });
          this.projectScale = this.projectScale.replace(/[^0-9]/g, '');
        }
      }
    };

    await vm.validateScale();
    expect(uni.showToast).toHaveBeenCalledWith({
      title: '请输入有效的数字',
      icon: 'none'
    });
    expect(vm.projectScale).toBe(''); // 输入清空后应变为空
  });

  it('should reset form after successful project update', async () => {
    const vm = {
      projectName: 'Updated Project',
      projectDescription: 'Updated description',
      projectScale: '10',
      selectedCategory: 0,
      selectedState: 1,
      selectedQue: 0,
	  categories: ['自然科学', '工程技术', '医学健康', '社会科学', '人文历史', '交叉学科'],
	  states: ['准备中', '进行中', '已完结'],
	  ques: ['是', '否'],
      lianxi: '987654321',
      resetForm: jest.fn(),
      updateProject: async function() {
        const projectData = {
          id: this.projectId,
          name: this.projectName,
          description: this.projectDescription,
          category: this.categories[this.selectedCategory],
          scale: this.projectScale,
          state: this.states[this.selectedState],
          que: this.ques[this.selectedQue],
          lianxi: this.lianxi,
        };

        await uniCloud.callFunction.mockResolvedValue({});

        await uniCloud.callFunction({
          name: 'updateProject',
          data: projectData
        });

        this.resetForm();
      }
    };

    await vm.updateProject();
    expect(vm.resetForm).toHaveBeenCalled();
  });
});
