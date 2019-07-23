var app = getApp();
// pages/user/teach/jian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    allData: [],
  },
  // 进入详情页0
  detailInto: function (e) {
    // console.log(e.currentTarget.dataset.items)
    let items = e.currentTarget.dataset.items;
    wx.navigateTo({
      url: '/pages/user/teach/jian/jian?items=' + JSON.stringify(items)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let user = wx.getStorageSync('user');
    let that=this;
    wx.request({
      url: app.globalData.hpUrl + 'Resume/teacherSelectResume',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        usernumber: user.usernumber,
      },
      success: function (res) {
        let result = res.data;
        // console.log(result)
        that.setData({
          allData: result
        });
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