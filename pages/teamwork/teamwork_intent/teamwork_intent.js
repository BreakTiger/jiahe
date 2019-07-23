var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    schoolData:[],
    schoolimg:''
  },
  //发布整合申请
  add_shenqing: function () {
    let that = this
    let user = wx.getStorageSync('user')
    // console.log(user)
    // console.log(user.usernumber)
    let id = that.data.schoolData.id
    // console.log(id)
    if (user.usernumber == id){
      wx.showToast({
        title: '自己不能给自己发送哦',
        icon: 'success',
        duration: 2000
      })
      }else {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/project/intention/add',
        data: {
          usernumber: user.usernumber,
          itemid: that.data.schoolData.id
        },
        success: function (res) {
          // console.log(res)
          // console.log(res.data)
          let result = res.data.data
          // console.log(result)
          that.setData({
            coopeyArray: result
          })
          if(res.data.code == 200){
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          }else if(res.data.code == 402004){
            wx.showToast({
              title: '不能重复发送哦',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '发送失败',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })

      }






   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log(JSON.parse(options.jsonStr))
    let id = JSON.parse(options.jsonStr)

    var that = this
    that.setData({
      schoolData: id
    })
    let openid = app.globalData.openid;

    let user = wx.getStorageSync('user');

    if (user) {
      that.setData({
        user: user
      });
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }
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
    let that = this
    wx.getStorageSync('user')
    let user = wx.getStorageSync('user')
    this.setData({
      user: user
    })
    let openid = app.globalData.openid;

    if (user) {
      that.setData({
        user: user
      });
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }
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