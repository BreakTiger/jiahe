var app = getApp();
// pages/user/teach/rent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    schools:[1,2,3,4,5,6]
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
    let user = wx.getStorageSync('user');
    // console.log(user.usernumber)
    wx.request({
      url: app.globalData.hpUrl + 'Room/selectByUsernumber', //仅为示例，并非真实的接口地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        usernumber: user.usernumber,
      },
      success: function (res) {
        let result = res.data;
       
        if (result){
          // item.details = item.details.split(",");
          // result.slider = result.slider.split(",");
          for (let i = 0; i < result.length;i++){
      result[i].slider = result[i].slider.split(",");
          }
          // console.log(result)
          that.setData({
            schools: result
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