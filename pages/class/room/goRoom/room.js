var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    roomData: [],
    roomId: ''
  },
  roomDetele: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(str)
    wx.navigateTo({
      url: '/pages/class/room/goRoom/roomDetele/roomDetele?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // console.log(options.jsonStr)
    let id = JSON.parse(options.jsonStr)
    console.log(id)
    console.log(id.id)
    var that = this
    that.setData({
      // roomData: id,
      roomId: id.id
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
    var that = this 
    let id = that.data.roomData.id
    console.log(id)
    wx.request({
      url: app.globalData.hpUrl + '/api/room/find?id=' +  that.data.roomId,
      success: function (res) {
        console.log(res)
        console.log(res.data)
        let result = res.data.data[0]
        console.log(result)
        that.setData({
          roomData: result
        })
      }
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