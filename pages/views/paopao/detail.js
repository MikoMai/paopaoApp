// pages/views/paopao/detail.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:getApp(),
    mission:{title:'',content:"",integral:0,phone:""},
    showButton:1,
    finishButton:0,
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData( { 
       userInfo:wx.getStorageSync("userInfo")
    }); 
    wx.request( { 
     url: this.data.app.globalData.requestUrl+"/mission/getMission", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
  
     data:{missionId:options.id} , 
     complete: function( res ) { 
       console.log(res);
      that.setData( { 
        mission:res.data.data,
        showButton:options.show,
        finishButton:res.data.data.missionStatus!=3?options.finish:0
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

  takeMission:function(e){
    let that=this;
wx.request( { 
  url: this.data.app.globalData.requestUrl+"/mission/takeMission", 
  header: { 
   "Content-Type": "application/x-www-form-urlencoded"
  }, 
  method: "get", 
  data:{userId:that.data.userInfo.id,missionId:e.target.dataset.value.id} , 
  complete: function( res ) { 
    if (res.data.code == 200) {
       wx.showToast({ 
         title: '操作成功', 
         icon: 'none', 
         duration: 2000 
         }) 
        wx.navigateBack({
          delta: 1
        })
    }
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
  finishMission:function(e){
    wx.request( { 
      url: this.data.app.globalData.requestUrl+"/mission/updateMissionStatus", 
      header: { 
       "Content-Type": "application/x-www-form-urlencoded"
      }, 
      method: "get", 
      data:{missionStatus:3,missionId:e.target.dataset.value.id} , 
      complete: function( res ) { 
        if (res.data.code == 200) {
           wx.showToast({ 
             title: '操作成功', 
             icon: 'none', 
             duration: 2000 
             }) 
            wx.navigateBack({
              delta: 1
            })
        }
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
      }
  
})