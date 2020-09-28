
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:'',
    checkPasswrod:'',
    birthday:'',
    phone:'',
    sex:0,
    sexArray: [{
      id: 1,
      value: '男'
    }, {
      id: 0,
      value: '女'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
   // 获取输入密码 
   passwordCheckInput: function (e) {
    this.setData({
      checkPasswrod: e.detail.value
    })
  },
   // 电话
   phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入密码 
  birthdayInput: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sexArray = this.data.sexArray
    for (let i = 0, len = sexArray.length; i < len; ++i) {
      sexArray[i].checked = sexArray[i].id == e.detail.value
    }
    console.log(e.detail.value)
    this.setData({
      sex:e.detail.value
    })
  },
  register: function (e) {
    let that = this;
    if (this.data.name.length == 0 ) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000
      })
      return;
    } 
    if(this.data.password.length == 0){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (this.data.password!=this.data.checkPasswrod) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1000
      })
      return;
    } 
    if (this.data.phone.length == 0 ) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    } 
      wx.request({
        url: app.globalData.requestUrl + "/user/register",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "get",
        data: {
          name: that.data.name,
          password: that.data.password,
          phone: that.data.phone,
          birthday: that.data.birthday,
          sex:that.data.sex
        },
        complete: function (res) {
          if (res.data.code == 200) {
            wx.showModal({
              title: '提示',
              content: '注册成功跳转登录页',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  //页面跳转
            wx.redirectTo({
              url: '/pages/index/index',
            })
                } 
              }
            })
            
          }else{
             wx.showToast({ 
               title: '注册失败', 
               icon: 'none', 
               duration: 2000 
               }) 
          }
        }
      })
    
  }
})