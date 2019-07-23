var app = getApp();
// pages/detail/detail0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    detail: '',
    idcard: ''
  },
  // 判断简历有没有写
  sendFn: function (e) {
    let user = wx.getStorageSync('user');
    if (user.academy) {
      this.sendTo();
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
  sendTo: function (e) {
    let user = wx.getStorageSync('user');
    let detail = this.data.detail;
    // console.log(detail);

    wx.request({
      url: app.globalData.hpUrl + 'Resume/sendresume',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        positionid: detail.id,
        principalusernumber: detail.usernumber,
        usernumber: user.usernumber,
        academy: user.academy,
        area: user.area,
        birthday: user.birthday,
        education: user.education,
        idcard: user.idcard,
        introduce: user.introduce,
        major: user.major,
        name: user.name,
        occustate: user.occustate,
        phone: user.phone,
        schoolage: user.schoolage,
        sex: user.sex,
        status: user.status,
        subject: user.subject,
      },
      success: function (res) {
        let result = res.data;
        // let res
        // console.log(res)
        if (result) {
          wx.switchTab({
            url: "/pages/user/index"
          })
        }


      }

    })

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
    let idcard = user.idcard;
    let myDate = new Date();
    // console.log(item)
    that.setData({
      detail: item,
      idcard: idcard
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