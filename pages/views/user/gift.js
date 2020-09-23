const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
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
      pageSize:99,
      name:""
    };
    let that=this;
    wx.request( { 
     url: app.globalData.requestUrl+"/gift/getGiftPage", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
     data:para , 
     complete: function( res ) { 
       console.log(res)
      if( res == null || res.data == null ) { 
        console.error( '网络请求失败' ); 
        return; 
       } 
      that.setData( { 
        array:res.data.data.content
      }); 
    
     } 
    }) 
  },
  takeGift:function(e){
    let that=this;
    let userInfo=wx.getStorageSync("userInfo");

    wx.showModal({
      title: '提示',
      content: '是否兑换',
      success: function (res) {
        if (res.confirm) {
          wx.request( { 
            url: app.globalData.requestUrl+"/gift/takeGift", 
            header: { 
             "Content-Type": "application/x-www-form-urlencoded"
            }, 
            method: "get", 
            data:{userId:userInfo.id,giftId:e.target.dataset.value.id} , 
            complete: function( res ) { 
             if( res == null || res.data == null ) { 
              wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 1000
              })
               return; 
              } 
              if( res.data.code !=200) { 
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000
                })
                return; 
               } 
               wx.showToast({
                 title: '兑换成功',
                 icon: 'none',
                 duration: 1000
               })
            } 
           }) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})