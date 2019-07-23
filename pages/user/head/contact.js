var app = getApp()
// pages/user/head/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    publist: [],
    //查询自己发布的校际合作
    interCoo: [],
    user: '',
    statusData: []
  },
  newCooperation: function () {
     wx.navigateTo({
        url: '/pages/user/allSchool/newCooperation/newCooperation',
      })
    },
  //校际合作状态修改
  close: function (e) {
    // console.log(e)
    let user = wx.getStorageSync('user')
    let id = e.currentTarget.dataset.id.id
    let that = this
    wx.request({
      url: app.globalData.hpUrl + 'api/project/update/' + id,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          statusData: result
        }) 
      }
  })
    //查询自己发布的校际合作信息
    wx.request({
      url: app.globalData.hpUrl + 'api/hezuo/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          interCoo: result
        })
      }
    })
},
  //青少年培训中心的详情页面
  goTogether_detail: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/comm/together/together?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  //校企科研合作项目一
  goEnterprise_detail: function () {
    wx.navigateTo({
      url: '/pages/user/comm/enterprise_detail/enterprise_detail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that = this
    let user = wx.getStorageSync('user');
    //会员信息请求
    wx.request({
      url: app.globalData.hpUrl + 'api/user/member/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        let result = res.data;
        // console.log(result)
        that.setData({
          publist: result
        });
      }
    });
    //查询自己发布的校际合作信息
    wx.request({
      url: app.globalData.hpUrl + 'api/hezuo/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          interCoo: result
        })
      }
    })

  },
 
  //判断是否充值的情况
  pubfaInto: function () {
    let that = this
    let user = wx.getStorageSync('user')
    // console.log(user)
    if (that.data.publist.code == 402002 || that.data.publist.code == 503008) {
      wx.showModal({
        title: '提示',
        content: '您暂无使用权或权限已到期',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/user/comm/payment'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      that.data.publist.code = 200
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