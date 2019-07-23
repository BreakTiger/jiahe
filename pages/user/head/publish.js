var app = getApp()
// pages/user/head/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    publist:[],
    //查询收到的简历
    job: [],
    region: ['全国', '杭州市', '江干区'],
    statusData: []
  },
  //数学老师代课详情
  teach_job: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/head/modifyJob?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  // 付完费之后的代课职位
  goNewJob () {
    wx.navigateTo({
      url: '/pages/user/allSchool/newJob/newJob',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否是会员
    // console.log(options)
    let that = this
    let user = wx.getStorageSync('user');
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
    //查询自己发布的职位
    wx.request({
      url: app.globalData.hpUrl + 'api/position/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          job: result
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
    }else{
      that.data.publist.code = 200
    }

  },

//代课职位状态改变
  close:function (e) {
  // console.log(e)
  let user = wx.getStorageSync('user')
  let id = e.currentTarget.dataset.id.id
    let that = this
    wx.request({
      url: app.globalData.hpUrl + 'api/position/update/' + id ,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          statusData: result
        })  
        wx.request({
          url: app.globalData.hpUrl + 'api/position/xiao/select?usernumber=' + user.usernumber,
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
            let result = res.data.data
            // console.log(result)
            that.setData({
              job: result
            })
          }
        })
        
         
     
      

      }
    })
  },

  onReady: function () {
  
  },

 
  onShow: function () {
    let that = this 
    let user = wx.getStorageSync('user')
    //查询自己发布的职位
    wx.request({
      url: app.globalData.hpUrl + 'api/position/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          job: result
        })
      }
    })
    // console.log(user.usernumber)
  },


  onHide: function () {
  
  },

  onUnload: function () {
  
  },


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