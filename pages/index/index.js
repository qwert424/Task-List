// pages/index/index.js

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputContent: "",//input内容
        list: [],//任务列表
    },
    handleInput() { },
    handleTapAdd() {
        // 添加任务
        const item = app.globalData.taskList.find(item => item.content === this.data.inputContent)
        if(item){
            wx.showToast({
              title: '已存在相同任务',
            })
            return;
        }
        if (this.data.inputContent) {
            wx.showToast({
                title: '添加成功',
                icon: "success"
            })
            // 1、更新全局列表
            app.globalData.taskList.unshift({
                content: this.data.inputContent,
                ifComplete: false,
            })
            // 2、更新自己列表
            // 3、本地保存
            this.handleChange()
        } else {
            wx.showToast({
                title: '不能为空!',
                icon: "error"
            })
        }
    },
    handleTapAll() {
        // 完成全部
        const ifAllComplete = app.globalData.taskList.find(item => !item.ifComplete);
        if (!ifAllComplete) {
            wx.showToast({
                title: '已全部完成',
                icon: "error"
            })
            return;
        }
        wx.showModal({
            title: '确定完成',
            content: '是否全部完成任务列表',
            complete: (res) => {
                if (res.cancel) {
                    wx.showToast({
                        title: '取消修改',
                        icon: 'error'
                    })
                }
                if (res.confirm) {
                    app.globalData.taskList.forEach(item => item.ifComplete = true)
                    this.handleChange();
                    wx.showToast({
                        title: '修改成功',
                        icon: "success"
                    })
                }
            }
        })
    },
    handleDelete() {
        // 删除全部
        wx.showModal({
            title: '确定删除',
            content: '是否删除全部任务列表',
            complete: (res) => {
                if (res.cancel) {
                    wx.showToast({
                        title: '取消删除',
                        icon: 'error'
                    })
                }
                if (res.confirm) {
                    app.globalData.taskList = [];
                    this.handleChange();
                    wx.showToast({
                        title: '删除成功',
                        icon: "success"
                    })
                }
            }
        })
    },
    handleChange() {
        // 修改状态
        this.setData({
            list: app.globalData.taskList,
            inputContent: ''
        })
        wx.setStorage({
            key: 'taskList',
            data: app.globalData.taskList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.handleChange()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})