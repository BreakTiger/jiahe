var app = getApp();
// pages/detail/detail1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    detail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that = this;
    let myDate = new Date();
    let item = JSON.parse(opt.items);
    // console.log(item)
    that.setData({
      toDay: myDate.getFullYear(),
      detail: item

    });

  
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