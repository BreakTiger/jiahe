var app = getApp()
// pages/register/forget/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    zhengTrue: false,
    yanzheng:'',
    huozheng:'',
    linPhone:'',
    linPassword: '',
    // 验证码
    yanzheng: '',
    ajxtrue: false,
    getText:'获取验证码',
    getChange:true,
  },
  yanZhengInput: function (e) {
    var that = this;
    var yanzheng = e.detail.value;
    var huozheng = this.data.huozheng
    console.log(e.detail.value)
    that.setData({
      yanzheng: yanzheng,
      zhengTrue: false,
    })
    if (yanzheng.length >= 4) {
      if (yanzheng == huozheng) {
        that.setData({
          zhengTrue: true,
        })
      } else {
        that.setData({
          zhengTrue: false,
        })
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    }

  },
  yanzhengBtn: function () {
    // console.log(app.globalData.userId);
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var phone = this.data.linPhone;
    var password = this.data.linPassword
    // console.log(phone)
    // console.log(password)
    var user = wx.getStorageSync('user');
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
      if (getChange) {
        that.setData({
          getChange: false
        })
        var time = setInterval(function () {
          var str = '(' + n + ')' + '重新获取'
          that.setData({
            getText: str
          })
          if (n <= 0) {
            that.setData({
              getChange: true,
              getText: '重新获取'
            })
            clearInterval(time);
          }

          n--;
        }, 1000);
        wx.request({
          url: app.globalData.hpUrl +'api/sendnote/' + phone,
          success: function (res) {
            // console.log(res)
            var result = res.data.random
            // console.log(result)
            that.setData({
              huozheng: result,
            })
          }
        })
      }
    }

  },
  // 表单判断
  blurPhoner: function (e) {
    var phone = e.detail.value;
    var that = this;
    this.setData({
      linPhone: phone
    })
    if (!(/^1[34578]\d{9}$/.test(phone))) {

      this.setData({
        ajxtrue: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
    }
  },
  // 登入表单提交
  formSubmitto: function (e) {
    console.log(e)
    var zhengTrue = this.data.zhengTrue;
    console.log(this.data.zhengTrue)
    var that=this;
    var ajxtrue = this.data.ajxtrue;
    var stor = wx.getStorageInfoSync('user')
    // console.log(res)
    var openId = app.globalData.userId;
    // var username = e.detail.value.username;
    // console.log(app.globalData.userId)
    var phone = e.detail.value.phone;
    var nchange = e.detail.value.nchange;
    // console.log(e.detail.value)
    if (ajxtrue){
      if (phone != '' && nchange != '') {
        if ((/^1[34578]\d{9}$/.test(phone))) {
          if (zhengTrue) { 
            setTimeout(function () {
              wx.redirectTo({
                url: "/pages/zhuche/forget/back?phone=" + that.data.linPhone
              })
            }, 500);
          } else {
            wx.showModal({
              content: '输入验证码有误',
              showCancel: false,
              success: function (res) {
              }
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '手机号有误',
            showCancel: false,
            success: function (res) {
            }
          })
        }
      } else {
        wx.showToast({
          title: '请填充完整',
          icon: 'success',
          duration: 2000
        })
      }

    }else{
      if (phone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'success',
          duration: 2000
        })
      } else
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
    }
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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