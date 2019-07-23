var app = getApp();
// pages/user/head/classroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
   
    mindex: 0,
    schools: [],
    roomlist: [],
    alert: 0,
    alertLlist: ['发布教室', '已出租','关闭教室'],
    selected: 0,
    index:0,
    publist: [],
    room: [],
    statusData: [],
    statusList: [],
    status: ''
  },
  selected: function (e) {
    console.log(e)
    let that = this
    let id = e.currentTarget.dataset.id
    let item = that.data.statusList.id.id
    let index = e.currentTarget.dataset.index
    let room= that.data.room
    
    let user = wx.getStorageSync('user')
    // let list = that.data.statusList
    if (index == 0) { //发布教室
        that.setData({
          selected: 0,
          alert: 0
        })
        //修改发布教室状态
        wx.request({
          url: app.globalData.hpUrl + 'api/room/update/' + item + '/'+1,
          success: function (res) {
            console.log(res)
            console.log(res.data)
            let result = res.data.data
            console.log(result)
            that.setData({
              statusData: result
            })
          }
        })
        //教室请求
        wx.request({
          url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
            let result = res.data.data
            // console.log(result)
            that.setData({
              room: result
            })
          }
        })
    } else if (index == 1){  //已出租
      that.setData({
        selected: 1,
        alert: 0
      })
      //修改发布教室状态
      wx.request({
        url: app.globalData.hpUrl + 'api/room/update/' + item+'/'+2,
        success: function (res) {
          console.log(res)
          console.log(res.data)
          let result = res.data.data
          console.log(result)
          that.setData({
            statusData: result
          })
        }
      })
      //教室请求
      wx.request({
        url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
        success: function (res) {
          // console.log(res)
          // console.log(res.data)
          let result = res.data.data
          // console.log(result)
          that.setData({
            room: result
          })
        }
      })
    
    }else { //关闭教室
      that.setData({
        selected: 2,
        alert: 0
      })
      //修改发布教室状态
      wx.request({
        url: app.globalData.hpUrl + 'api/room/update/' + item + '/' + 3,
        success: function (res) {
          console.log(res)
          console.log(res.data)
          let result = res.data.data
          console.log(result)
          that.setData({
            statusData: result
          })
        }
      })
      //教室请求
      wx.request({
        url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
        success: function (res) {
          // console.log(res)
          // console.log(res.data)
          let result = res.data.data
          // console.log(result)
          that.setData({
            room: result
          })
          console.log(that.data.s)
        }
      })

    } 
  },
  goAlert :function (e){
    // console.log(e)
    let that = this
    that.setData({
      alert: 1
    })
    let user = wx.getStorageSync('user')
    //获取每一个教室的信息
    let id = e.currentTarget.dataset
    console.log(id)
    that.setData({
      statusList: id
    })
    console.log(id)
  },
  itemclick: function (e){
    let that = this
    let user = wx.getStorageSync('user')
    let id = e.currentTarget.dataset.id.id
    wx.request({
      url: app.globalData.hpUrl + 'api/room/update/' + id,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          statusData: result
        })
        //教室请求
        wx.request({
          url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
            let result = res.data.data
            // console.log(result)
            that.setData({
              room: result
            })
          }
        })
      }
    })
  },
  //跳转添加
  addRoom: function () {
    wx.navigateTo({
      // url: '/pages/user/allSchool/newRoom/newRoom'
      url: '/pages/user/head/room'
    })
      },
  //跳转到教室详情页面
  goClassroom_detail: function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/class/room/goRoom/room?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
      // })
    })
    // wx.navigateTo({
    //   url: '/pages/class/room/goRoom/room',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    //判断是否是会员
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
    //教室请求
    // console.log(user.usernumber)
    wx.request({
      url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        console.log(res.data.data)
        let result = res.data.data
        console.log(result)
        that.setData({
          room: result
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


  onShow: function () {
    var that = this
    let user = wx.getStorageSync('user')
    //教室请求
    wx.request({
      url: app.globalData.hpUrl + 'api/room/xiao/select?usernumber=' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          room: result
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