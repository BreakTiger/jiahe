var app = getApp();


//导入接口Api,tips,并创建一个新的classroomApi构造方法，用于调用Api其中的方法
import ClassroomApi from '../../api/classroomApi.js';
import Tips from '../../utils/Tips.js';
const classroomApi = new ClassroomApi();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    region: ['全国', '全国', '全国'],
    //教室请求
    room: [],
    //分页请求
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
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/room',
      data: {
        page: 1,
        size: 10,
        address: that.data.region[2]
      },
      success: function (res) {
        console.log(res)
        let result = res.data.data
        console.log(result)
        that.setData({
          room: result
        })
      }
    })

  },
  //进入room详情页
  goRoom: function (e) {
    // console.log(e.currentTarget.dataset.id)s
    var that = this
    let id = e.currentTarget.dataset.id
    let str = JSON.stringify(e.currentTarget.dataset.id);
    let user = wx.getStorageSync('user');
    if (user.usernumber) {
      wx.navigateTo({
        url: '/pages/class/room/goRoom/goRoom?jsonStr=' + str,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
    }else{
      wx.navigateTo({
        url: "/pages/zhuche/zhuche"
      })
    }


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //教室请求
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      url: app.globalData.hpUrl + 'api/room',
      data: {
        page: 1,
        size: 10,
        address: '全国'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        let result = res.data.data
        // console.log(result)
        that.setData({
          room: result
        })
      }
    })


  
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
    //分页查询***********************************
    wx.request({
      url: app.globalData.hpUrl + 'api/room',
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
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 900
        })
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
            let arr = that.data.room.concat(result)
            that.setData({
              room: arr
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
    //地区分页查询
    wx.request({
      url: app.globalData.hpUrl + 'api/room',
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
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          setTimeout(function () {
            let item = that.data.room.concat(result)
            that.setData({
              room: item
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
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {



  },
 
 
 
})




