var app = getApp();
// pages/class/room/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    detail: '',
    allData:''
  },
  onlyInto:function(e){
    let items = e.currentTarget.dataset.items;
    wx.navigateTo({
      url: "/pages/user/head/contact/de1a?items=" + JSON.stringify(items)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that = this;
    let item = JSON.parse(opt.items);
    let user = wx.getStorageSync('user');
    item.carouse = item.carouse.split(",");
    // console.log(item)
    that.setData({
      detail: item
    });

    wx.request({
      url: app.globalData.hpUrl + 'Cooperation/selectCooperation',
      data: {
        cooperationid: item.id,
        usernumber: user.usernumber,
      },
      success: function (res) {
        let result = res.data;
        // let res
        // console.log(result)
        if (result){
          that.setData({
            allData: result
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