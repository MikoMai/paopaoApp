const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filters: {
      title: ''
    },
    array:[],

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
    let that=this;
    let para = {
      userId: app.globalData.userInfo.id,
    };
    wx.request( { 
     url: app.globalData.requestUrl+"/mission/getAllMissionByUser", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
     //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }, 
     data:para , 
     complete: function( res ) { 
       console.log(res)
      that.setData( { 
        array:res.data.data
      }); 
      if( res == null || res.data == null ) { 
       console.error( '网络请求失败' ); 
       return; 
      } 
     } 
    }) 
  },
  seeDetail(event){
     console.log(event); 
    // wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
    //   url: "/pages/views/paopao/detail?id"
    // })
  }
})