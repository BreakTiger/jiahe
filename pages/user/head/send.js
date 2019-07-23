var app = getApp();
// pages/user/head/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    tuiData:''
  
  },
  // 进入详情页1
  detailInto1: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/user/head/send/shend?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
    // let items = e.currentTarget.dataset.items;
    // wx.navigateTo({
    //   url: '/pages/user/head/send/shend?items=' + JSON.stringify(items)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that=this;
    let user = wx.getStorageSync('user');
    // console.log(user.usernumber)
  
       wx.request({
         url: app.globalData.hpUrl + 'api/resume/put/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        let result = res.data.data;
        // console.log(result)
        // let res
        // console.log(res)
        if (result) {
          that.setData({
            tuiData: result
          });
        }
      }

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

})