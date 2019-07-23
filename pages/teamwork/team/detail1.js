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
    user:''
  },
  // 合作意向
  teamworkFn:function(e){
    let detail=this.data.detail;
    let user = wx.getStorageSync('user');
    // console.log(detail.id)
    // console.log(user.usernumber)
    if (user.academy) {
      // console.log(detail)
      wx.request({
        url: app.globalData.hpUrl + 'Cooperation/cooperationUserAdd',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          cooperationid: detail.id,
          usernumber: user.usernumber,
        },
        success: function (res) {
          let result = res.data;
          // let res
          // console.log(res)
          if (result) {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 800
            })

            setTimeout(function () {
              wx.switchTab({
                url: "/pages/user/index"
              })
            }, 800);

          }


        }

      })


    } else {
      wx.showToast({
        title: '先填写简历',
        icon: 'success',
        duration: 800
      })

      setTimeout(function () {
        wx.navigateTo({
          url: "/pages/user/teach/person"
        })
      }, 800);

    }
  
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
    let that = this;
    let item = JSON.parse(opt.items);
    let user = wx.getStorageSync('user');
    item.carouse = item.carouse.split(",");
    // console.log(item)
    that.setData({
      detail: item,
      user: user
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