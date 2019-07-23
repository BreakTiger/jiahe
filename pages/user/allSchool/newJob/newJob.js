var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hpUrl: app.globalData.hpUrl,
  //地理位置选择
  region: ['浙江省', '杭州市', '江干区'],
  //教龄选择
  ageArray: ['一年','两年','三年','四年','五年','五年以上'],
  ageIndex: 0,
  //学历要求
  eduArray: ['专科', '本科', '硕士', '博士','海归','其他'],
  eduIndex: 0,
  job: []
  },
  //地理选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //教龄选择
  ageChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ageIndex: e.detail.value
    })
  },
  //学历选择
  eduChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eduIndex: e.detail.value
    })
  },
  //submit提交
  formJob: function (e) {
    console.log(e)
    let that = this
    let che = e.detail.value;
    if (che.jobname != '' && che.address != '' && che.experience != '' && che.education != '' && che.duty != '' ) {
      let user = wx.getStorageSync('user')
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/position/add',
        data: {
          usernumber: user.usernumber,
          jobname: che.jobname,
          address: che.address,
          experience: che.experience,
          education: che.education,
          duty: che.duty
        },
        success: function (res) {
          console.log(res)
          var result = res.data;
          that.setData({
            job: result
          }) 
          if(result.code == 200) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.switchTab({
                url: "/pages/user/index"
              })
            }, 1000);

          }
          }
     
        })
      // });
    } else {
      wx.showToast({
        title: '请填充完整',
        icon: 'success',
        duration: 1500
      })
    }










  },
  onLoad: function (options) {
    
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