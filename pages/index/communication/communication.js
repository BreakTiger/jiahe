var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxcode: [],
    qubie: [],
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    phoneNumbe: [],
    user: ''
  },
  // 致电沟通
  callPhone: function () {
    let that = this
    let user = wx.getStorageSync('user');
    if ( user.user_identity != 'principal'){

    }else
    {
      if (that.data.wxcode.user) {
        wx.makePhoneCall({
          phoneNumber: that.data.wxcode.user.phone
        })
        console.log('1' + that.data.wxcode.user.phone)
      }else if (that.data.wxcode.principal) {
        wx.makePhoneCall({
          phoneNumber: that.data.wxcode.principal.phone,
        })
        console.log('2' + that.data.wxcode.principal.phone)
      }
      else {
        wx.makePhoneCall({
          // phoneNumber: that.data.wxcode.phone
        })
        console.log('3' + that.data.phoneNumber)
      }
    }

    

  },
  previewImage: function (e) {
    var that = this
    
    var scene_img = that.data.wxcode.user.ercode
    console.log(scene_img.split(','))
    wx.previewImage({
      current: "scene_img",
      urls: that.data.wxcode.user.ercode.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })



  },
  previewImage_one: function () {
    var that = this

    var scene_img = that.data.wxcode.principal.ercode
    console.log(scene_img.split(','))
    wx.previewImage({
      current: "scene_img",
      urls: scene_img.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
  },
  previewImage_two: function () {
    var that = this

    var scene_img = that.data.wxcode.ercode
    console.log(scene_img.split(','))
    wx.previewImage({
      current: "scene_img",
      urls: scene_img.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    console.log(JSON.parse(options.jsonStr))
    let id = JSON.parse(options.jsonStr)
    console.log(id)
    that.setData({
      wxcode: id
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
    // let that = this
    // wx.getStorageSync('user')
    // let user = wx.getStorageSync('user')
    // this.setData({
    //   user: user
    // })
    // console.log(user)
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