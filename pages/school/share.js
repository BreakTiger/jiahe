var app = getApp();

//导入Api文件
import SlideApi from '../../api/SlideApi.js';
import Tips from '../../utils/Tips.js';

import ShareApi from '../../api/shareApi.js';
import DemandApi from '../../api/demandApi.js';

//构造方法
const slideApi = new SlideApi();
const shareApi = new ShareApi();
const demandApi = new DemandApi();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    itemType: 1,
    shareSchool: [],
    shareData: [],
    //标题切换
    selected: true,
    selected1: false,
    region: ['全国', '全国', '全国'],
    phoneNumber: 0,
    page: 1,
    pageSize: 10,
    pageTottomText: '',
    pageN: 2,
    item: []
  },
  //地理位置选择
  bindRegionChange: function (e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    // console.log(that.data.region[2])
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/school/select',
      data: {
        page: 1,
        size: 10,
        address: that.data.region[2],
        typenum: 1
      },
      success: function (res) {
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareSchool: result
        })
      }
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/school/select',
      data: {
        page: 1,
        size: 10,
        address: that.data.region[2],
        typenum: 2
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareData: result
        })
        // console.log(that.data.teacher)
      }
    })

  },
  // 拨打电话
  phoneFn: function (e) {
    let phone = e.currentTarget.dataset.phone;
    let user = wx.getStorageSync('user');
    if (user.user_identity != 'principal'){

    }else {
      // console.log(phone);
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
   
  

  },
  // 标题切换
  selected: function (e) {
    let that = this
    this.setData({
      selected1: false,
      selected: true,
      itemType: 1
    })
    let num = that.data.itemType
    // console.log(num)
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/school/select',
      data: {
        page: 1,
        size: 10,
        address: '全国',
        typenum: 1
      },
      success: function (res) {
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareSchool: result
        })
        // console.log(that.data.teacher)
      }
    })
  },
  selected1: function (e) {
    var that = this
    this.setData({
      selected: false,
      selected1: true,
      itemType: 2
    })
    let num = that.data.itemType
    // console.log(num)
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/school/select',
      data: {
        page: 1,
        size: 10,
        address: '全国',
        typenum: 2
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareData: result
        })
      }
    })
  },

  loadNextPage: function () {
    Tips.loading();
    this.sharePage.next().then(data => {
      Tips.loaded();
      this.setData({
        shareData: data.list
      })
    });
    this.demandPage.next().then(data => {
      Tips.loaded();
      this.setData({
        needData: data.list
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //分享学校和需求学校请求    
    let num = that.data.itemType
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/school/select',
      data: {
        page: 1,
        size: 10,
        address: '全国',
        typenum: 1
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          shareSchool: result
        })
      }
    })

    /*
   初始化时，载入API中的页面接口，并将其定义到我们定义的俩个变量中，
   以便于初始化完成后，可以使用上面定义的loadNextPage函数方法
   */
    this.sharePage = shareApi.page();
    this.demandPage = demandApi.page();
    this.loadNextPage();
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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
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
    let pageN = this.data.pageN;
    console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
    //分享学校查询分页*****************************************
    wx.request({
      url: app.globalData.hpUrl + 'api/school/select',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国',
        typenum: 1
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
            let item = that.data.shareSchool.concat(result)
            that.setData({
              shareSchool: item
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
    if (that.data.region != '全国') {
      //分享学校地区分页&&&&&&
      wx.request({
        url: app.globalData.hpUrl + 'api/school/select',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          page: pageN,
          size: 10,
          address: that.data.region[2],
          typenum: 1
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
              let item = that.data.shareSchool.concat(result)
              that.setData({
                shareSchool: item
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
      //我要加盟查询地区分页&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
      wx.request({
        url: app.globalData.hpUrl + 'api/school/select',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          page: pageN,
          size: 10,
          address: that.data.region[2],
          typenum: 2
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
              let item = that.data.shareSchool.concat(result)
              that.setData({
                shareSchool: item
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
    //我要加盟查询分页*****************************************
    wx.request({
      url: app.globalData.hpUrl + 'api/school/select',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: pageN,
        size: 10,
        address: '全国',
        typenum: 2
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
            let item = that.data.shareSchool.concat(result)
            that.setData({
              shareSchool: item
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
  },


})