var app = getApp();
import Config from '../../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    payList: [],
    detail: '',
    selectIndex: 0,
    seriarlChe: '',
    money: ''
  },
  //平台协议详情
  paydetail: function() {
    wx.navigateTo({
      url: '/pages/user/comm/paydetail/paydetail',
    })


  },
  // 底部支付按钮
  goPay: function() {
    var dateTime = new Date();
    var timestamp1 = Date.parse(new Date());
    console.log(timestamp1)
    let that = this;
    let user = wx.getStorageSync('user');
    let detail = this.data.detail;
    // console.log(detail)
    // 订单生成返回数据,弹出是否支付模态
    // 头部数据
    wx.showModal({
      title: '微信支付',
      content: '确定支付吗?',
      success: function(res) {
        that.pay(timestamp1);
        // that.payInto();

      }
    })
  },
  // 订单生成支付函数 
  payInto: function() {
    let that = this;
    let user = wx.getStorageSync('user');
    let detail = this.data.money;
    // console.log(detail.id)
    // console.log(user.usernumber)
    wx.request({
      url: app.globalData.hpUrl + 'api/user/recharge',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        usernumber: user.usernumber,
        mealid: detail.id,
      },
      success: function(res) {
        // console.log('充值情况',res)
        console.log('充值情况', res.data.code)
        // console.log(res.data.data)
        if (res.data.code == 200) {
          wx.showToast({
            title: '支付成功',
          })
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/user/index',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '套餐充值不成功',
          })
        }
      }
    });
  },
  // 支付
  pay: function(a) {
    console.log(a)
    let that = this;
    let user = wx.getStorageSync('user');
    let openid = app.globalData.openid;
    // console.log(that.data.money.money)
    // console.log(that.data.money)
    //----------------------------------------------------------
    // 微信支付请求
    self = this;
    wx.showToast({
      title: '请求中.....',
      icon: 'loading',
      duration: 1000
    })
    wx.request({
      url: app.globalData.hpUrl + 'api/wx/pay',
      data: {
        appid: Config.appId,
        mch_id: '1496772312',
        key: '3304021978111433052219701030693X',
        openid: openid,
        out_trade_no: a,
        body: '嘉禾英语',
        total_fee: that.data.money.money
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log('支付res', res)
        var json = res.data.data
        var dateTime = new Date();
        var timestamp1 = Date.parse(new Date());
        var pk = json.package;
        // console.log(pk)
        wx.requestPayment({
          'appId': json.appId,
          'timeStamp': json.timeStamp,
          'nonceStr': json.nonceStr,
          'package': pk,
          'signType': 'MD5',
          'paySign': json.paySign,
          'success': function(res) {
            // console.log(res)
            that.payInto()
          },
          'fail': function(res) {
            console.log(res)
            wx.showToast({
              title: '支付失败',
            })
          },
        })
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let user = wx.getStorageSync('user');
    console.log(user)
    //支付套餐请求查询套餐请求
    wx.request({
      url: app.globalData.hpUrl + 'api/user/member/meal/?usernumber=' + user.usernumber,
      success: function(res) {
        // console.log('111',res.data)
        // console.log(res.data.data)
        let result = res.data.data
        // console.log(result.money)
        console.log(result)
        that.setData({
          payList: result,
          money: result[0]
        });
      }
    })
  },
  selectFn: function(e) {
    let money = e.currentTarget.dataset.money;
    let selectIndex = e.currentTarget.dataset.selectindex;
    console.log(selectIndex)
    this.setData({
      selectIndex: selectIndex,
      money: money
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})