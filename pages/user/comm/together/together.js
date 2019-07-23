var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    schoolData : [],
    cooper : []
  },
  //合作详情
  cooper: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/comm/cooper/cooper?jsonStr=' + str,
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
    // console.log(options)
    // console.log(options.jsonStr)
    let id = JSON.parse(options.jsonStr)
    //  let id = options.id
    // console.log(id)
    that.setData({
      schoolData: id
    })
    //合作意向请求
    wx.request({
      url: app.globalData.hpUrl + 'api/project/intention/select?itemid=' + that.data.schoolData.id ,
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
  //合作意向页面
  cooper: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/comm/cooper/cooper?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
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
    
  }
})