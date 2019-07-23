var app = getApp()
// pages/user/head/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    publist: [],
    shareSchool: [],
    share: []
  },
  //教室发布
  newTeach : function () {
    let user = wx.getStorageSync('user');
    if (user.schooltype == '公办') {
      wx.showModal({
        title: '提示',
        content: '公办学校不可以发布哦',
        success: function (res) {
          if (res.confirm) {
            console.log('确定')
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/user/allSchool/newTeach/newTeach',
      })
    }

  },
  //跳转到教室详情
  goSchool_detail: function (e){
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    let that = this;
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/comm/school_detail/school_detail?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  // 发布进入
  // 详情
  sharInto: function (e) {
    let items = e.currentTarget.dataset.items;
    wx.navigateTo({
      url: "/pages/user/head/school/share?items=" + JSON.stringify(items)
    })
  },
  close: function (e) {
    // console.log(e)
    let user = wx.getStorageSync('user')
    let id = e.currentTarget.dataset.id.id
    let that = this
    wx.request({
      url: app.globalData.hpUrl + 'api/school/update/' + id,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          statusData: result
        }) 
        //查看自己发布的共享办学信息
        wx.request({
          url: app.globalData.hpUrl + 'api/school/xiao/select?usernumber=' + user.usernumber,
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
            let result = res.data.data
            // console.log(result)
            that.setData({
              shareSchool: result
            })
          }
        })
      }
    }) 
  },
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
    })
    // console.log(user.usernumber)
  //查看自己发布的共享办学信息
    wx.request({
      url: app.globalData.hpUrl + 'api/school/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareSchool: result
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