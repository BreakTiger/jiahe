// pages//share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherData:[]
  },
  //跳转立即沟通
  goCommunication: function (options) {
    wx.navigateTo({
      url: '/pages/index/communication/communication'

    })
  },
  add_commun: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
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
    let id = JSON.parse(options.jsonStr)
    var that = this
    that.setData({
      teacherData: id
    })
    // console.log(that.data.teacherData)
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