var app = getApp();
// pages/class/room/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    // banners:[1,2,3],
    haves: [],
    detail: '',
    idcard: '',
    seriarlChe:''
    // content:[]
  },
  // 打电话
  daTel: function (e) {

    // console.log(e.currentTarget.dataset.daphone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.daphone
    })
  },
  rentFn: function () {
    let that = this;
    let user = wx.getStorageSync('user');
    let detail = this.data.detail;
    if (user.academy) {
      // console.log(detail)
      // 订单生成返回数据,弹出是否支付模态
      // 头部数据
      wx.showModal({
        title: '微信支付',
        content: '确定支付吗?',
        success: function (res) {
          if (res.confirm) {
            that.payInto();
            // that.pay();
          } else if (res.cancel) {

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
  // 订单生成支付函数 
  payInto: function () {
    let that = this;
    let user = wx.getStorageSync('user');
    let detail = this.data.detail;
    // console.log(detail.id)
    // console.log(user.usernumber)
    wx.request({
      url: app.globalData.hpUrl + 'Room/orderroomAdd',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        usernumber:user.usernumber,
        classroomid:detail.id,
      },
      success: function (res) {
        var result = res.data;
        // console.log(res)
        let bianhao = res.data;
        that.setData({
          seriarlChe: bianhao
        })
        that.pay(bianhao);
      }
    });



  },

  // 支付
  pay: function (a) {
    let discountsDelete = this.data.discountsDelete;
    let that = this;
    let detail = this.data.detail;
    // var allAdd = that.data.allAdd
    // console.log(allAdd)
    let sumTure = parseInt(this.data.sumTure);
    // console.log(detail.price)
    let user = wx.getStorageSync('user');
    let seriarlChe = this.data.seriarlChe;
    let openid = app.globalData.openid;
    let phone = user.userphone;
    //----------------------------------------------------------
    // 微信支付请求
    self = this;
    wx.showToast({
      title: '请求中.....',
      icon: 'loading',
      duration: 1000
    })
    // console.log(a)
    // console.log(openid)
    // console.log(detail.price)
    wx.request({
      url: app.globalData.hpUrl + 'Wxpay/payJoinfee',
      data: {
        openid: openid,
        total_fee: detail.price,
        body: '嘉禾',
        out_trade_no:a
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        var dateTime = new Date();
        var timestamp1 = Date.parse(new Date());
        var json = res.data;
        // console.log(json)
        // console.log(json.appId)
        // console.log(json.timeStamp)
        // console.log(json.nonceStr)

        var pk = json.package;
        // console.log(pk)
        wx.requestPayment({
          'appId': json.appId,
          'timeStamp': json.timeStamp,
          'nonceStr': json.nonceStr,
          'package': pk,
          'signType': 'MD5',
          'paySign': json.paySign,
          'success': function (res) {
            // console.log(res)
            wx.showToast({
              title: '支付成功',
            })
          },
          'fail': function (res) {
            console.log(res)
            wx.showToast({
              title: '支付失败',
            })
            // 删除未支付订单
            wx.request({
              url: app.globalData.hpUrl + 'Room/orderDelete',
              data: {
                ordernumber: a
              },
              success: function (res) {
                // console.log(res)
              }
            })

          },
        })
      },
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
    // console.log(item)
    item.details = item.details.split(",");
    item.slider = item.slider.split(",");
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