// pages/views/paopao/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:getApp(),
    mission:{title:'',content:"",integral:0,phone:""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.request( { 
     url: this.data.app.globalData.requestUrl+"/mission/getMission", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
     //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }, 
     data:{missionId:options.id} , 
     complete: function( res ) { 
       console.log(res);
      that.setData( { 
        mission:res.data.data
      }); 
      if( res == null || res.data == null ) { 
       console.error( '网络请求失败' ); 
       return; 
      } 
     } 
    }) 

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

  }
})