var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    kaobian: [],
    user: ''
  },
  //跳转立即沟通
  goCommunication: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    // console.log(id)
    let str = JSON.stringify(id);
    console.log(str)
    wx.navigateTo({
      // url: "../toJudge/toJudge?jsonStr=" + str,
      url: '/pages/index/communication/communication?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { } 
    })
  },

  onLoad: function (options) {
    // console.log(options)
    var that = this
    let id = JSON.parse(options.jsonStr)
    console.log(id)
    that.setData({
      kaobian: id
    })
  },


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