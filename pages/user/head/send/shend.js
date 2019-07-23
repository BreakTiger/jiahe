var app = getApp();
// pages/detail/detail1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    teacherData: ''
  },
  //立即沟通
  add_commun: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/index/communication/communication?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    console.log(options.jsonStr)
    let id = JSON.parse(options.jsonStr)
    that.setData({
      teacherData: id
    })
    // console.log(that.data.teacherData)
    // let myDate = new Date();
    // let item = JSON.parse(options.items);
    // console.log(item)
    // that.setData({
    //   toDay: myDate.getFullYear(),
    //   teacherData: item

    // });


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