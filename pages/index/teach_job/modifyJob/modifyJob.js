var app = getApp();
Page({

  data: {
    resume: [],
    jobData: [],
    status: status, //点击发送按钮弹出框
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: ''
  },
  //考编信息跳转
  goCompiling: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(str)
    wx.navigateTo({
      url: '/pages/index/examination/examination?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  //修改职位信息
  job: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(str)
    wx.navigateTo({
      url: '/pages/index/teach_job/modifyJob/job?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let user = wx.getStorageSync('user')
    console.log(options)
     console.log(options.jsonStr)
    let id = JSON.parse(options.jsonStr)
    //  let id = options.id
    console.log(id)
    that.setData({
      jobData: id
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