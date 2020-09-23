const app=getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo:null,
    date: ""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo=wx.getStorageSync("userInfo");
    let that=this;
    wx.request( { 
      url: app.globalData.requestUrl+"/user/getUser", 
      header: { 
       "Content-Type": "application/x-www-form-urlencoded"
      }, 
      method: "get", 
      data:{userId:userInfo.id} , 
      complete: function( res ) { 
        console.log(res)
       if( res == null || res.data == null ) { 
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 1000
        })
         return; 
        } 
        that.setData({
          myinfo:res.data.data,
          date: userInfo.birthday
        })
      } 
     }) 
   
  },
  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
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
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    wx.navigateTo({
      url: '../user/password',
    })
  },
  bindDateChange: function(e) {
    this.data.myinfo.birthday= e.detail.value;
    this.setData({
      date: e.detail.value,
    })
  },
})