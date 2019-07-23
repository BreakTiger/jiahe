var app = getApp();
// pages/index/edition/edition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    throughLove: { phone: '', password: '' },
    hpUrl: app.globalData.hpUrl,
    // （网页数据）
    getText1: '获取验证码',
    getText2: '获取验证码',
    edmenu: [
      { menunm: '登录' },
      { menunm: '注册' }
    ],
    edmenuShow: 0,
    // 登录
    // 验证手机号
    loginPhone: false,
    loginPwd: false,

    hongyzphone: '',
    // 红娘注册
    // 验证手机号
    lovePhone: false,
    lovePwd: true,
    loveChange: true,
    // 验证码是否正确
    zhengLove: true,
    huoLove: '',

    selectIndex: 1,
    selectArr: [1, 2],
    user: ''

  },
  backHome: function (e) {
    console.log(e)
    wx.switchTab({
      url: '/pages/index/index'
    })
    // wx.navigateTo({
    //   // url: '/pages/zhuche/password/password',
    //   url: '/pages/zhuche/forget/back',
    // })
  },
  selectFn: function (e) {
    let selectIndex = e.currentTarget.dataset.selectindex;
    console.log(selectIndex)
    this.setData({
      selectIndex: selectIndex
    })
  },
  forgetInto: function () {
    wx.navigateTo({
      url: '/pages/zhuche/forget/forget'
    })
  },
  // 焦点控制函数
  keyMenu: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    this.setData({
      edmenuShow: index
    })

  },
  // 登录手机验证
  loginPhone: function (e) {
    let phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        loginPhone: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 1000
        })
      }
    } else {
      this.setData({
        loginPhone: true
      })
    }
  },
  //登录输入密码
  loginPassword: function (e) {
    let that = this;

    this.setData({
      loginPassword: e.detail.value
    })
    // console.log(e.detail.value.length)
    // console.log(e.detail.value);
    let value = e.detail.value
    let strkong = /^[0-9a-zA-Z]{0,25}$/g;
    if (strkong.test(value)) {
      that.setData({
        loginPwd: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '密码由0~25位由数字和26个英文字母混合而成',
        showCancel: false,
        success: function (res) {
          that.setData({
            loginPwd: false
          })
        }

      })

    }
  },
  // 登录请求
  formLogin: function (e) {
    let that = this;
    // console.log(e.detail.value)
    let loginChe = e.detail.value;
    let loginPhone = this.data.loginPhone;
    if (loginPhone == true) {
      if (loginChe.phone != '' && loginChe.pwd != '') {
        // // 导航
        if (that.data.loginPwd) {
          //---------
          // 请求开始
          wx.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            url: app.globalData.hpUrl + 'api/login',
            data: {
              phone: loginChe.phone,
              password: loginChe.pwd,
            },
            success: function (res) {
              console.log(res)
              var result = res.data;

              console.log(res)
              if (result) {
                if (result.code == 401003) {
                  wx.showModal({
                    title: '提示',
                    content: '用户不存在！',
                    showCancel: false,
                    success: function (res) {
                    }
                  })
                  
                } else {
                  wx.request({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    url: app.globalData.hpUrl + 'api/login',  
                    data: {
                      phone: loginChe.phone,
                      password: loginChe.pwd,
                    },
                    success: function (res) {
                      console.log('登陆结果',res)
                      let result = res.data.data;
                      console.log(result)
                      if (res.data.code == 200) {
                        wx.setStorageSync('user', result)
                        wx.showToast({
                          title: '登录成功',
                          icon: 'success',
                          duration: 1000
                        })
                        wx.switchTab({
                          url: "/pages/user/index"
                        })
                      }else{
                        wx.showToast({
                          title: '登陆失败',
                        })
                      }
                     
                    }
                  })

                }

              } else {
                wx.showModal({
                  title: '提示',
                  content: '密码错误！',
                  showCancel: false,
                  success: function (res) {
                  }
                })

              }

            }
          });

          //---------
        } else {
          wx.showModal({
            title: '提示',
            content: '密码由0~25位由数字和26个英文字母混合而成',
            showCancel: false,
            success: function (res) {
              that.setData({
                truePwd: false
              })
            }

          })
        }

      } else {
        wx.showToast({
          title: '请填充完整',
          icon: 'success',
          duration: 1500
        })
      }
    } else {
      if (loginChe.phone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'success',
          duration: 1500
        })
      } else
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 1500
        })
    }
  },



  //-------------------
  // 手机验证
  lovePhone: function (e) {
    let phone = e.detail.value;
    console.log(phone)
    this.setData({
      hongyzphone: phone
    })
    // console.log(hongyzphone)
    if (!(/^1[34578]\d{9}$/.test(phone))) {  // /^[1][3,4,5,7,8][0-9]{9}$/
      this.setData({
        lovePhone: false
      })
       console.log(phone.length)
      if (phone.length >= 11) {

        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 1000
        })
      }
    } else {
      this.setData({
        lovePhone: true

      })
    }
  },

  //输入密码
  lovePassword: function (e) {
    let that = this;

    this.setData({
      lovePassword: e.detail.value
    })
    // console.log(e.detail.value.length)
    // console.log(e.detail.value);
    let value = e.detail.value
    let strkong = /^[0-9a-zA-Z]{0,25}$/g;
    if (strkong.test(value)) {
      that.setData({
        lovePwd: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '密码由0~25位由数字和26个英文字母混合而成',
        showCancel: false,
        success: function (res) {
          that.setData({
            lovePwd: false
          })
        }

      })

    }
  },
  // 验证码按钮
  yanLoveBtn: function () {

    // console.log(app.globalData.userId);
    let loveChange = this.data.loveChange;
    // console.log(loveChange)
    let lovePhone = this.data.lovePhone;
    console.log(lovePhone)
    let phone = this.data.hongyzphone;
    console.log(phone)
    // console.log(_makePhoneCallObject)
    let n = 59;
    let that = this;
    // console.log("*")
    if (!lovePhone) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    } else {
      if (loveChange) {
        this.setData({
          loveChange: false
        })
        let lovetime = setInterval(function () {
          let str = '(' + n + ')' + '重新获取'
          that.setData({
            getText2: str
          })
          if (n <= 0) {
            that.setData({
              loveChange: true,
              getText2: '重新获取'
            })
            clearInterval(lovetime);
          }
          n--;
        }, 1000);
        wx.request({
          url: app.globalData.hpUrl + 'api/sendnote/'+phone,
          data: {
           
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            var result = res.data.random;
            // console.log(res.data)
            that.setData({
              huoLove: result,
            })
          }
        })
      }
    }

  },
  // 验证码输入
  yanLoveInput: function (e) {
    // console.log("*")
    let that = this;
    let yanLove = e.detail.value;
    let huoLove = this.data.huoLove;

    // let huoLove = '1234';
    // console.log(yanLove)
    that.setData({
      yanLove: yanLove,
      zhengLove: false,
    })
    if (yanLove.length >= 4) {
      if (yanLove == huoLove) {
        that.setData({
          zhengLove: true,
        })
      } else {
        that.setData({
          zhengLove: false,
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
  // 注册请求
  formLover: function (e) {
    console.log(e)
    let that = this;
    // console.log(e.detail.value)
    let loveChe = e.detail.value;
    console.log(loveChe)
    let type = this.data.id 
    let phone = this.data.hphone;  //手机号
    let pwd = this.data.hpwd    //密码
    let zhengLove = this.data.zhengLove; 
    let lovePhone = this.data.lovePhone;
    console.log(zhengLove) //false
    let selectArr = this.data.selectArr;
    console.log(this.data.selectArr)
    console.log(selectArr)  
    let selectIndex = this.data.selectIndex;
    console.log(selectIndex)
    // && loveChe.hchange != ''
    if (lovePhone == true) {
      if (loveChe.hphone != '' && loveChe.hpwd != '') {
        // // 导航
        if (that.data.lovePwd) {
          console.log(that.data.lovePwd) //true
          if (zhengLove) {
            console.log(zhengLove)
            wx.request({
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              url: app.globalData.hpUrl + 'api/register',
              data: {
                rtype: that.data.selectIndex,
                phone: loveChe.hphone,
                password: loveChe.hpwd
              },
              success: function (res) {
                console.log(res)
                var result = res.data;
                console.log(result)
                // console.log(res)
                if (result.code == 200) {
                  wx.setStorageSync('user', result.data)
                  wx.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 1000
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: "/pages/user/index"
                    })
                  }, 1000);

                } else if (result.code == 401001){
                     wx.showToast({
                          title: '该账户已注册',
                          icon: 'success',
                          duration: 1000
                        })
               
                }
              }
            });

          } else {
            wx.showModal({
              content: '输入验证码有误',
              showCancel: false,
              success: function (res) {
              }
            })
          }

          // 请求结束
          //---------
        } else {
          wx.showModal({
            title: '提示',
            content: '密码由0~25位由数字和26个英文字母混合而成',
            showCancel: false,
            success: function (res) {
              that.setData({
                truePwd: false
              })
            }

          })
        }

      } else {
        wx.showToast({
          title: '请填充完整',
          icon: 'success',
          duration: 1500
        })
      }
    } else {
      if (loveChe.phone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'success',
          duration: 1500
        })
      } else
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 1500
        })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that = this;
    if (opt.che) {
      that.setData({
        edmenuShow: opt.che,
      });
    }
  },


})