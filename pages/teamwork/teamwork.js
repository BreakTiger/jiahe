var app = getApp();

//传递---------------
import SchoolApi from '../../api/SchoolApi.js';
import SchoolCooperationApi from '../../api/SchoolCooperationApi.js';
import Tips from '../../utils/Tips.js';
const schoolApi = new SchoolApi();
const schoolCooperationApi = new SchoolCooperationApi();
// pages/index/menu/menu0.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 定位地址
    dingwei: { x: '', y: '', address: '' },
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    // 页面相关数据
    allData: [],
    tuiData: [],
    pageN: 2,
    //切换框
    selected: true,
    selected1: false,
    //------------
    schoolData:[],
    schoolCooperationData:[],
    itemType: 1,
    //地区选择
    region: ['全国', '全国', '全国'],
    //整合上市请求
    integration:[],
    integrationCoo: [],
    //分页查询
    page: 1,
    pageSize: 10,
    pageTottomText: '',
    pageN: 2,
    item: []
  },
  bindRegionChange: function (e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
     wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/project/select',
      data: {
        page: 1,
        size: 10,
        address: that.data.region[2],
        itemtype: 1
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          integration: result
        })
        // console.log(that.data.teacher)
      }
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/project/select',
      data: {
        page: 1,
        size: 10,
        address: that.data.region[2],
        itemtype: 2
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          integrationCoo: result
        })
        // console.log(that.data.teacher)
      }
    })
  },
  //-----------------

  /**
   * 上划加载
   */
  onReachBottom: function (event) {
    //this.loadNextPage();
    // console.log('next');
  },
  //切换框
  selected: function (e) {
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({
      selected1: false,
      selected: true,
      itemType: 1
    })
    let that = this
    let type = that.data.itemType
    // console.log(type)
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/project/select',
      data: {
        page: 1,
        size: 10,
        address: '全国',
        itemtype: 1
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          integration: result
        })
        // console.log(that.data.teacher)
      }
    })
  },
  selected1: function (e) {
    // let index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({
      selected: false,
      selected1: true,
      itemType: 2
    })
    // console.log(this.data.itemType)
    let that = this
    let type = that.data.itemType
    // console.log(type)
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/project/select',
      data: {
        page: 1,
        size: 10,
        address: '全国',
        itemtype: 2
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          integrationCoo: result
        })
        // console.log(that.data.teacher)
      }
    })
  },
  //进入整合上市详情页
  goIntent: function (e) {
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let id = e.currentTarget.dataset.id
    // console.log(index)
    let str = JSON.stringify(e.currentTarget.dataset.id);
    let user = wx.getStorageSync('user');
    if(user.usernumber){
      wx.navigateTo({
        url: '../teamwork/teamwork_intent/teamwork_intent?jsonStr=' + str,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
    }else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }
 
  },
  //进入异业合作详情
  goSchool_cooperation: function (e) {  
    // console.log(e)
    var that = this;
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    let user = wx.getStorageSync('user');
    if(user.usernumber){
      wx.navigateTo({
        url: '/pages/teamwork/school_cooperation/school_cooperation?jsonStr=' + str,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }

  },
  // 进入详情页0
  detailInto: function (e) {
    let items = e.currentTarget.dataset.items;
    let user = wx.getStorageSync('user');
    if (user.usernumber) {
      wx.navigateTo({
        url: '/pages/teamwork/team/detail0?items=' + JSON.stringify(items)
      })
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }

  },
  // 进入详情页1
  detailInto1: function (e) {
    let user = wx.getStorageSync('user');
    let items = e.currentTarget.dataset.items;
    if (user.usernumber) {
      wx.navigateTo({
        url: '/pages/teamwork/team/detail1?items=' + JSON.stringify(items)
      })
    } else {
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }

  },
  //-------------

  onLoad: function (options) {
      let that = this;
      //整合上市请求
      let type = that.data.itemType
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/project/select',
        data: {
          page: 1,
          size: 10,
          address: '全国',
          itemtype: type
        },
        success: function (res) {
          // console.log(res)
          // console.log(res.data)
          let result = res.data.data
          // console.log(result)
          that.setData({
            integration: result
          })
          // console.log(that.data.teacher)
        }
      })

  


  },
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //-----------  下拉刷新 -----------
    //下拉刷新
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
  //  location

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      pageTottomText: ''
    });
    let user = wx.getStorageSync('user');
    let that = this;
    let pageN = this.data.pageN;;
    console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
    //整合上市查询分页*****************************************
    wx.request({
      url: app.globalData.hpUrl + 'api/project/select',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国',
        integration: 1
      },
      success: function (res) {
        let arr = []
        console.log('分页数据', res)
        console.log('分页数据', res.data)
        console.log('分页数据', res.data.data)
        let result = res.data.data;
        // shops: res.data.data
        // 判断分页
        if (result.length != 0) {
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          setTimeout(function () {
            let item = that.data.integration.concat(result)
            that.setData({
              integration: item
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
    //异业合作查询分页*****************************************
    wx.request({
      url: app.globalData.hpUrl + 'api/project/select',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国',
        integration: 2
      },
      success: function (res) {
        let arr = []
        console.log('分页数据', res)
        console.log('分页数据', res.data)
        console.log('分页数据', res.data.data)
        let result = res.data.data;
        // shops: res.data.data
        // 判断分页
        if (result.length != 0) {
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          setTimeout(function () {
            let item = that.data.integrationCoo.concat(result)
            that.setData({
              integrationCoo: item
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
    if(that.data.region != '全国'){
      //地区整合上市查询分页*****************************************
      wx.request({
        url: app.globalData.hpUrl + 'api/project/select',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          page: pageN,
          size: 10,
          address: that.data.region[2],
          integration: 1
        },
        success: function (res) {
          let arr = []
          let result = res.data.data;
          // shops: res.data.data
          // 判断分页
          if (result.length != 0) {
            pageN += 1;
            that.setData({
              pageN: pageN
            });
            setTimeout(function () {
              let item = that.data.integration.concat(result)
              that.setData({
                integration: item
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
      //地区整合上市查询分页*****************************************
      wx.request({
        url: app.globalData.hpUrl + 'api/project/select',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          page: pageN,
          size: 10,
          address: that.data.region[2],
          integration: 2
        },
        success: function (res) {
          let arr = []
          let result = res.data.data;
          // shops: res.data.data
          // 判断分页
          if (result.length != 0) {
            pageN += 1;
            that.setData({
              pageN: pageN
            });
            setTimeout(function () {
              let item = that.data.integrationCoo.concat(result)
              that.setData({
                integrationCoo: item
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

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




})

