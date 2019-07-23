//app.js
import ShopApi from '/api/ShopApi.js';
import Config from './config.js';

const shopApi = new ShopApi();
App({
  globalData: {
    userInfo: null,
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
    hpUrl: Config.hpUrl,
    imgUrl: Config.imgUrl,
    headerTop: Config.headerTop,
    openid: '',
    user: '',
    init: false
  },
  shopApi: shopApi,




  onLaunch: function(e) {
    // console.log(wx.getStorageSync('user'))
    wx.login({
      success: res => {
        var that = this;
        if (res.code) {
          // console.log(res.code)
          var code1 = res.code;
          wx.request({
            // url: that.globalData.headerTop + 'Wx/wxopenid',
            url: that.globalData.hpUrl + 'api/wx/openid',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              js_code: code1,
              appid: Config.appId,
              secret: Config.secret
            },
            success: function(res) {
              // console.log(res)
              console.log('openid', res)
              console.log('openid', res.data.data)
              var result = JSON.parse(res.data.data)
              console.log(result.openid)
              var openid = result.openid
              // var openid = res.data.openid
              // console.log(openid)
              that.globalData.openid = openid
            }
          })
        }
      }
    });


    var that = this;

    // 展示本地存储能力

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    globalData: {

    }
  },
})