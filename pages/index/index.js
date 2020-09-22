//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '跑跑跑',
    userInfo: {},
    hasUserInfo: false,
    name: "",
    password: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
        url: "/pages/views/main/main"
      })
    }
  },
  // 获取输入账号 
  accountInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function (e) {
    let that = this;
    if (this.data.name.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: app.globalData.requestUrl + "/user/login",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "get",
        //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }, 
        data: {
          name: that.data.name,
          password: that.data.password
        },
        complete: function (res) {
          if (res.data.code == 200) {
            app.globalData.hasUserInfo = true;
            app.globalData.userInfo = res.data.data;
            that.setData({
              userInfo: res.data.data,
              hasUserInfo: true
            });
            wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
              url: "/pages/views/main/main"
            })
          }else{
             wx.showToast({ 
               title: '账号或密码错误', 
               icon: 'none', 
               duration: 2000 
               }) 
          }
        }
      })

    }

  }
})
