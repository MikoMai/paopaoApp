// pages/views/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filters: {
      title: ''
    },
    array:[],
    app:getApp()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.iniData();
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
  iniData:function(){
    let para = {
      page: 1,
      pageSize:20,
      title: this.data.filters.title
    };
    let that=this;
    wx.request( { 
     url: this.data.app.globalData.requestUrl+"/news/getNewsPage", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
     data:para , 
     complete: function( res ) { 
       
      that.setData( { 
        array:res.data.data.content
      }); 
      if( res == null || res.data == null ) { 
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 1000
        })
       return; 
      } 
     } 
    }) 
  },
})