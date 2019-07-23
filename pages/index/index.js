
var app = getApp();

var alert = require('../../utils/alert.js')

import SlideApi from '../../api/SlideApi.js';
import JobApi from '../../api/JobApi.js';
import TeacherApi from '../../api/TeacherApi.js';
import Tips from '../../utils/Tips.js';
const slideApi = new SlideApi();
const jobApi = new JobApi();
const teacherApi = new TeacherApi();
Page({
 

  data: {
    //轮播图
    slider: [],
    swiperCurrent: 0,
    //首页代课职位
    job: [],
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    //代课职位 代课名师
    selected: true,
    selected1: false,
    jobData: [],
    teacherData: [],
    //地区选择
    region: ['全国', '全国', '全国'],
    page: 1,
    pageSize: 10,
    pageTottomText: '',
    pageN: 2,
   item:[],
   init: false,
    // 隐藏区域条件

  },
  //地理位置选择
    bindRegionChange: function (e) {
      let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    // console.log(that.data.region[2])   
    // console.log(e.detail.value[2])
    //首页代课职位请求
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/position',
      data: {
        page: 1,
        size: 10,
        address: e.detail.value[2]
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          job: result
        })
      }
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/teacher',
      data: {
        page: 1,
        size: 10,
        address: e.detail.value[2]
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          teacherData: result
        })
      }
    })
  },
  //点击轮播图详情
  clickBanner: function (e) {
    var that = this
    console.log(e)
    var banner = e.currentTarget.dataset.banner;
    console.log('banner',banner)
    let str = JSON.stringify(banner);
    let user = wx.getStorageSync('user');
      wx.navigateTo({
        url: '/pages/index/banner_detail/banner_detail?jsonStr=' + str
      })
    },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //进入代课职位详情
  teach_job: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    let user = wx.getStorageSync('user');
      wx.navigateTo({
        url: '/pages/index/teach_job/teach_job?jsonStr=' + str,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },
  //进入代课老师详情页
  teacher_detail: function (e) {
    let user = wx.getStorageSync('user');
    if (user.user_identity != 'teacher'){
      // console.log(e)
      // console.log(e.currentTarget.dataset.id)
      var that = this;
      let id = e.currentTarget.dataset.id
      let str = JSON.stringify(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '../index/teacher_detail/teacher_detail?jsonStr=' + str,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
    }else{

    }

  },
  //进入考编的详情页
  changeToExamination: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    // console.log(id)
    let str = JSON.stringify(id);
    wx.navigateTo({
      url: '/pages/index/examination/examination?jsonStr=' + str,
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  /**
   * 上划加载
   */
  onReachBottom: function (event) {    
  },


  onLoad: function (options) {    
    let that = this
    //首页轮播请求
    wx.request({
      url: app.globalData.hpUrl + 'api/slider',
      data: {
        status: 1
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          slider: res.data.data,
        })
      }
    })
    //首页代课职位请求
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/position',
      data: {
        page: 1,
        size: 10,
        address: '全国'
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          job: result
        })
      }
    })
    //首页代课名师请求
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/teacher',
      data: {
        page: 1,
        size: 10,
        address: '全国'
      },
      success: function (res) {
        // console.log(res)
        console.log(res.data)
        let result = res.data.data
        console.log('请求的教师数据',res.data.data)
        that.setData({
          teacherData: result
        })
      }
    })

      // let openid = app.globalData.openid;

      let user = wx.getStorageSync('user');

      if (user) {
        that.setData({
          user: user
        });
      } else {
        wx.navigateTo({
          url: "/pages/zhuche/zhuche"
        })
      }
  },
  

  onReady: function () {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let openid = app.globalData.openid;
    let that = this
    let user = wx.getStorageSync('user');

    if (user) {
      that.setData({
        user: user
      });
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }


  },
  //-----------  下拉刷新 -----------
  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新1')
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageTottomText: ''
    });
    let user = wx.getStorageSync('user');
    let that = this;
    let pageN = this.data.pageN;
    // let item = this.data.teacherData;
    console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
   
    // 选择地区老师分页查询&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
   if(that.data.region[2] != '全国'){
     console.log('地区分页')
     wx.request({
       url: app.globalData.hpUrl + 'api/teacher',
       method: "POST",
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       data: {
         page: pageN,
         size: 10,
         address: that.data.region[2]
       },
       success: function (res) {
         let result = res.data.data;
         // 判断分页
         if (result.length != 0) {
           console.log('地区筛选')
           pageN += 1;
           that.setData({
             pageN: pageN
           })
             setTimeout(function () {
               let item = that.data.teacherData.concat(result)
               that.setData({
                 teacherData: item
               });
               console.log('地区分页',item)
             }, 1000);
           }
          else {
           that.setData({
             pageTottomText: getApp().globalData.endText,
           });
         }
       }
     })
     // 地区选择代课职位分页查询&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
     wx.request({
       url: app.globalData.hpUrl + 'api/position',
       method: "POST",
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       data: {
         page: pageN,
         size: 10,
         address: that.data.region[2]
       },
       success: function (res) {
         let arr = []
         let result = res.data.data;
         // 判断分页
         if (result.length != 0) {
           pageN += 1;
           that.setData({
             pageN: pageN
           });
           setTimeout(function () {
             let item = that.data.job.concat(result)
             that.setData({
               job: item
             });
           }, 1000);
           console.log('2分页数据', that.data.item)
         } else {
           that.setData({
             pageTottomText: getApp().globalData.endText,
           });
         }
       }
     })
  }else{
    console.log('全国分页数据')
    wx.request({
      url: app.globalData.hpUrl + 'api/teacher',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国'
      },
      success: function (res) {
        let arr = [];
        console.log(res.data.data)
        let result = res.data.data;
        // shops: res.data.data
        // 判断分页
        if (result.length != 0) {
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          setTimeout(function () {
            let item = that.data.teacherData.concat(result)
            console.log(item)
            that.setData({
              teacherData: item
            });
          }, 1000);
        } else {
          that.setData({
            pageTottomText: getApp().globalData.endText,
          });
        }
        //----------------------------------------------
      }
    })
    //全国代课职位分页查询***********************************
    wx.request({
      url: app.globalData.hpUrl + 'api/position',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国'
      },
      success: function (res) {
        let arr = []
        let result = res.data.data;
        // 判断分页
        if (result.length != 0) {
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          setTimeout(function () {
            let item = that.data.job.concat(result)
            that.setData({
              job: item
            });
          }, 3000);
          console.log('2分页数据', that.data.job)
        } else {
          that.setData({
            pageTottomText: getApp().globalData.endText,
          });
        }
      }
    })

  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



})
