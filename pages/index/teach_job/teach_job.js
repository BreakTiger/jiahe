var app = getApp();
var status = true; //点击发送按钮弹出框的变量
Page({
 
  toastHide: function (event) {
    status = true
    this.setData({ status: status })

  },

  data: {
    resume: [],
    jobData: [], 
    status: status, //点击发送按钮弹出框
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: ''　　　　
  },
  //点击 发送简历 弹出框
  add: function (event) {
    var that = this
    let user = wx.getStorageSync('user')　　
    console.log(that.data.jobData)
    console.log('传入的请求的数据'+that.data.jobData.id + '校长'+that.data.jobData.user.id)
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.hpUrl + 'api/send/resume',
      method: "POST",
      data: {
        usernumber: user.usernumber,
        positionid: that.data.jobData.id,
        principalid: that.data.jobData.user.id
      },
      success: function (res) {
        let result = res.data.data
        console.log('简历发送结果' + res.data)
        console.log(res.data.code)

        that.setData({
          resume: result
        });
        if (res.data.code == 200) {
          wx.showToast({
            title: '简历发送成功',
          })
          wx.navigateTo({
            url: '/pages/index/index',
          })
        } else if (res.data.code == 402004){
          wx.showModal({
            title: '提示',
            content: '该职位已发送简历',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })  
        }else{
          wx.showToast({
            title: '发送失败',
          })
        }

      }
    })



  },
  //跳转立即沟通
  goCommunication: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    // console.log('aaa')
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
  //考编信息跳转
  goCompiling: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    // console.log(str)
     wx.navigateTo({
      url: '/pages/index/examination/examination?jsonStr=' + str ,
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
    //  console.log(options.jsonStr)
     let id = JSON.parse(options.jsonStr)
    //  let id = options.id
    // console.log(id)
    that.setData({
      jobData: id
    })
    console.log(that.data.jobData)
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