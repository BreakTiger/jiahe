var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    item: [],
    title: '',
    text: '',
    itemArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    let item = JSON.parse(options.jsonStr)
    console.log('轮播详情',item)
    this.setData({
      item: item
    })
    console.log('轮播详情',that.data.item.introduceid)
    //点击轮播图详情
    wx.request({
      url: app.globalData.hpUrl + 'api/introduce/' + item.introduceid, 
      success: function (res) {
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        let result = res.data.data;
        that.setData({
          itemArray: result
        });
        console.log(that.data.itemArray)
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