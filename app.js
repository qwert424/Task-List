// app.js
App({
  onLaunch() {
    wx.getStorage({
      key: "taskList",
      success:(res)=> {
          this.globalData.taskList=res.data
      }
    })
  },
  globalData: {
    taskList: [
    ]
  }
})
