var app = getApp();
var noiogin = require('../../utils/noiogin.js')
Page({
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user:'',
    //修改头像
    imgbox1: '',
    //我的 教师查询职位
    teacherJob: [],
    //会员到期时间
    endData: []
  },//------------------------------------------------------------------------------------------------------------------------------
  // 普通用户个人信息
  puInto: function () {
    wx.navigateTo({
      url: "/pages/user/pu/person"
    })
  },
  //考编详情页
  changeToExamination: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    // console.log(id)
    let str = JSON.stringify(id);
    // console.log(str)
    wx.navigateTo({
      url: '/pages/index/examination/examination?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  // 我收到的简历
  sendInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/send"
    })
  },
  // 校际合作
  contactInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/contact"
    })
  },
  // 共享办学
  schoolInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/school"
    })
  },
  //我的共享教室
  roomInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/classroom"
      // url: "/pages/user/head/room"
    })
  },
  //我的职位发布
  showInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/publish"
    })
  },
  // 校长的
  masterInto: function () {
    wx.navigateTo({
      url: "/pages/user/head/master"
    })
  },
  // 老师的
  //投递详情页
  teach_job: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo({
      // url: '/pages/user/comm/delivery/delivery?jsonStr=' + str,
      url: '/pages/index/teacher_detail/teacher_detail?jsonStr=' +str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  // 个人简历进入
  personInto: function () {
    wx.navigateTo({
      url: "/pages/user/teach/person"
    })
  },
  // 简历投递进入
  jianInto: function () {
    wx.navigateTo({
      url: "/pages/user/teach/jian"
    })
  },
  // 教室进入
  classInto: function () {
    wx.navigateTo({
      url: "/pages/user/teach/rent"
    })
  },
  onLoad: function () {
    let that = this
    wx.getStorageSync('user')
    let user = wx.getStorageSync('user')
        // 进行用户数据缓存
    noiogin.userInfo(user.usernumber)
    console.log(noiogin.userInfo)
    // that.setData({
    //   user: user
    // })
    console.log(user)
    // console.log(user.usernumber)
    //我的页面 老师查询我的投递简历 
    wx.request({
      url: app.globalData.hpUrl + 'api/resume/send/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          teacherJob: result
        })
      }
    })
    wx.getStorageSync('user')
    var userinfo = wx.getStorageSync('user')
    if(userinfo.id){
      // console.log(1)
    }else{
      // console.log(2)
      wx.navigateTo({
        url: '/pages/zhuche/zhuche',
      })
    };
    this.setData({
      user: user
    })
    //查看会员是否到期
    wx.request({
      url: app.globalData.hpUrl + 'api/user/member/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        console.log(res.data)
        let result = res.data
        console.log(result.code)
        that.setData({
          endDate: result
        })
      }
    })









  },
  onShow: function () {
    let that = this
    wx.getStorageSync('user')
    let user = wx.getStorageSync('user')
    // 进行用户数据缓存
    noiogin.userInfo(user.usernumber)
    console.log(noiogin.userInfo)
    console.log(1)
    console.log(user)
    that.setData({
      user: user
    })
    //查看会员是否到期
    wx.request({
      url: app.globalData.hpUrl + 'api/user/member/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data
        // console.log(result.code)
        that.setData({
          endDate: result
        })
      }
    })
    // console.log(user)
    // if (user) {
    //   that.setData({
    //     user: user
    //   });
    // } else {
    //   wx.navigateTo({
    //     url: "/pages/zhuche/zhuche"
    //   })
    // }

    // console.log(user)

    wx.request({
      url: app.globalData.hpUrl + 'api/resume/send/' + user.usernumber,
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          teacherJob: result
        })
      }
    })

  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {

  },
  // 头像修改函数
  headImg: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要修改头像吗',
      success: function (res) {
        if (res.confirm) {
          that.headUpdate()
        } else if (res.cancel) {
        }
      }
    })
  },
  headUpdate: function () {
    // let user = this.data.user;
    // console.log(user)
    let imgbox1 = []
    let that = this;
    let user = wx.getStorageSync('user')
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        imgbox1 = tempFilePaths[0];
        that.setData ({
          imgbox1 :  tempFilePaths
        })
        // imgbox1 != ''
        // console.log(imgbox1[0])
        // console.log(imgbox1)
        // console.log(user.usernumber)
        if (imgbox1 != '') {
          wx.uploadFile({
            url: app.globalData.hpUrl + 'api/user/upload?usernumber=' + user.usernumber,
            filePath: imgbox1,
            name: 'files',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
            },
            success: function (res) {
              // console.log(JSON.parse(res.data))
              var result = JSON.parse(res.data)
              console.log(result.data)
              that.onShow()
              user.teacherimage = result.data
              user.principalimage = result.data
              // 进行用户数据缓存
              noiogin.userInfo(user.usernumber)
              // console.log(that.data.user)
               that.setData({
                 user: user
               })
              //  console.log(that.data.user)
            }

          })
        }
      }
    })
  },

  // --------------------------------------------------

})
