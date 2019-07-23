var app = getApp();
// pages/user/head/contact/de1a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    detail: ''
  },
  // 打电话
  daTel: function (e) {
    // console.log(e.currentTarget.dataset.daphone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.daphone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that=this;
    let item = JSON.parse(opt.items);
    let user = wx.getStorageSync('user');
    // item.carouse = item.carouse.split(",");
    // console.log(item)

    wx.request({
      url: app.globalData.hpUrl + 'User/selectUserinformation',
      data: {
        usernumber: item.usernumber,
      },
      success: function (res) {
        let result = res.data;
        // let res
        // console.log(result)
        if (result) {
          that.setData({
            detail: result
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