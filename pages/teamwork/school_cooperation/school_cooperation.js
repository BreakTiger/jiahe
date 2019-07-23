var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    schoolCooperationData : [],
    cooper: []
  },
  //发送合作意向按钮button
  add_btn: function (e) {
    // console.log(e)
    let that = this
    // console.log(that.data.schoolCooperationData.id)
    let user = wx.getStorageSync('user')
    // console.log(user.usernumber)
    let id = that.data.schoolCooperationData.id
    // console.log(id)
    if (user.usernumber == id){
      wx.showToast({
        title: '自己不可以给自己发送哦',
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
          itemid: id
        },
        success: function (res) {
          // console.log(res)
          // console.log(res.data)
          let result = res.data.data
          if(res.data.code == 402004){
            wx.showToast({
              title: '已发送过意向',
            })
          } else if(res.data.code == 200){
              wx.showToast({
                title: '发送成功',
              })
          } else {
              wx.showToast({
                title: '发送失败',
              })
          }
          // console.log(result)
          that.setData({
            coopeyArray: result
          })
        }
      })
    }

  },
  //合作意向 详情页面请求
  cooper: function (e) {
    let user = wx.getStorageSync('user')
    let that= this
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(id)
    if (that.data.schoolCooperationData.usernumber == user.usernumber){
    wx.navigateTo({
      url: '/pages/user/comm/cooper/cooper?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  }else{
    // console.log(1)
  }

  },
  //跳转立即沟通
  goCommunication: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(str)
    wx.navigateTo({
      url: '/pages/index/communication/communication?jsonStr=' + str ,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // console.log(options.jsonStr)
    let item = JSON.parse(options.jsonStr)
    var that = this
    that.setData({
      schoolCooperationData: item
    })
    let user = wx.getStorageSync('user')
    // console.log(that.data.schoolCooperationData.id)
  //合作意向请求
    wx.request({
      url: app.globalData.hpUrl + 'api/project/intention/select?itemid=' + that.data.schoolCooperationData.id ,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          cooper: result
        })
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
    let that = this
    wx.getStorageSync('user')
    let user = wx.getStorageSync('user')
    this.setData({
      user: user
    })
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