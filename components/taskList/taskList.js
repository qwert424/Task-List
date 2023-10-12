// components/taskList/taskList.js
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        task: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleDelete() {
            // 删除任务
            wx.showModal({
                title: '确定删除',
                content: '是否删除该任务',
                complete: (res) => {
                    if (res.cancel) {
                        wx.showToast({
                            title: '取消删除',
                            icon: "error"
                        })
                    }
                    if (res.confirm) {
                        const index = app.globalData.taskList.findIndex(item => item.content === this.data.task.content)
                        app.globalData.taskList.splice(index, 1)
                        this.triggerEvent('renovate')
                        wx.showToast({
                            title: '删除成功',
                            icon: "success"
                        })
                    }
                }
            })
        },
        handleChange() {
            // 切换状态
            this.setData({
                'task.ifComplete':!this.data.task.ifComplete
            })
            app.globalData.taskList.find(item=>item.content===this.data.task.content).ifComplete=this.data.task.ifComplete
            wx.setStorage({
                key: 'taskList',
                data: app.globalData.taskList
            })
            this.triggerEvent('renovate')
        }
    },

    externalClasses: ["class"],

    /**
     * 组件的配置
    */
    options: {
        virtualHost: true//虚拟化组件节点 使自定义组件内部的第一层节点由自定义组件本身完全决定
    },
})