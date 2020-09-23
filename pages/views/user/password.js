const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword:'',
    newPassword1:'',
    newPassword2:''

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
   oldPasswordInput: function (e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },

  // 获取输入密码 
  newPassword1Input: function (e) {
    this.setData({
      newPassword1: e.detail.value
    })
  },
  newPassword2Input: function (e) {
    this.setData({
      newPassword2: e.detail.value
    })
  },
  changePassword(){
    if (this.data.oldPassword.length == 0 || this.data.newPassword1.length == 0|| this.data.newPassword2.length == 0) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let userInfo=wx.getStorageSync("userInfo");
    if (this.data.oldPassword != userInfo.password) {
      wx.showToast({
        title: '旧密码不正确',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if ( this.data.newPassword1 != this.data.newPassword2) {
      wx.showToast({
        title: '新密码不一致',
        icon: 'none',
        duration: 1000
      })
      return;
    }

    if ( this.data.newPassword1.length<6 ) {
      wx.showToast({
        title: '密码长度不能少于6位',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.request( { 
      url: app.globalData.requestUrl+"/user/updatePassword", 
      header: { 
       "Content-Type": "application/x-www-form-urlencoded"
      }, 
      method: "get", 
      data:{id:userInfo.id,password:this.data.newPassword1} , 
      complete: function( res ) { 
       if( res == null || res.data == null ) { 
        console.error( '网络请求失败' ); 
        return; 
       } 
       wx.showModal({
        title: '提示',
        content: '修改成功,请重新登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.removeStorageSync('userInfo');
            //页面跳转
            wx.redirectTo({
              url: '/pages/index/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      } 
     }) 
  }

})