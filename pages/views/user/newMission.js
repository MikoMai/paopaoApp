const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    integral:0,
    content:''

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
  // 标题 
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 积分 
  integralInput: function (e) {
    this.setData({
      integral: e.detail.value
    })
  },
  // 标题 
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  save: function (e) {
    let that = this;
    if (this.data.title.length == 0 ) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000
      })
      return;
    } 
    if(this.data.content.length == 0){
      wx.showToast({
        title: '请输入任务内容',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let userInfo=wx.getStorageSync("userInfo")
    let para={
      title: that.data.title,
      content: that.data.content,
      integral: that.data.integral,
      createByUser:userInfo
    }
      wx.request({
        url: app.globalData.requestUrl + "/mission/saveMissionByUser",
        header: {
          "Content-Type": 'application/json'
        },
        method: "post",
        data: JSON.stringify(para),
        complete: function (res) {
          if (res.data.code == 200) {
            wx.showModal({
              title: '提示',
              content: '创建成功',
              showCancel:false,
              success: function (res) {
              }
            })
            
          }else{
             wx.showToast({ 
               title: res.data.msg, 
               icon: 'none', 
               duration: 2000 
               }) 
          }
        }
      })
    
  }
})