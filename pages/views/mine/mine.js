const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filters: {
      title: ''
    },
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    array:[],
    userInfo:wx.getStorageSync("userInfo")

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo( {
        success: function( res ) {
            that.setData( {
                winWidth: res.windowWidth,
                winHeight: res.windowHeight
            });
        }

    });
 
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
    this.iniData();
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
      userId: that.data.userInfo.id,
    };
    wx.request( { 
     url: app.globalData.requestUrl+"/mission/getAllMissionByFinishUser", 
     header: { 
      "Content-Type": "application/x-www-form-urlencoded"
     }, 
     method: "get", 
     data:para , 
     complete: function( res ) { 
       console.log(res)
      that.setData( { 
        array:res.data.data
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
  seeDetail(event){
     console.log(event); 
    // wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
    //   url: "/pages/views/paopao/detail?id"
    // })
  },
  //  tab切换逻辑
  swichNav: function( e ) {

    var that = this;

    if( this.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        that.setData( {
            currentTab: e.target.dataset.current
        })
    }
},

bindChange: function( e ) {

    var that = this;
    let para = {
      userId: that.data.userInfo.id,
    };
    if(e.detail.current==0){
    wx.request( { 
     url: app.globalData.requestUrl+"/mission/getAllMissionByFinishUser", 
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
    }else{
      wx.request( { 
        url: app.globalData.requestUrl+"/mission/getAllMissionByCreateUser", 
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
    }
},
})