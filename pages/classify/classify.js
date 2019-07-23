var app = getApp(); 
// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    // 面辅料区分参数
    keyListId:1,
    keyselecte:true,
    mlmenu:[
      { menu: "状态"},
      { menu: "颜色"},
      { menu: "品名"}, 
      { menu: "面料组织"},
      { menu: "季节"}
    ],
    curNav: 0,
    mrlist:[],
    shops:[],
    frlist: [],
  
  },

  //-----------------------------------------------
  // 商品详情页跳转函数
  detailInto: function (e) {
    // console.log()
    var change = e.currentTarget.dataset.id;
    var item = e.currentTarget.dataset.item;
    //console.log(item)
    wx.navigateTo({
      url: '../detail/detail?id=' + change
    })
  },
  // 面料辅料标题焦点控制函数
  keyList: function (e) {
    var that=this;
    var keylist = this.data.keylist
    var idx = e.currentTarget.dataset.idx;
    var keyselecte = this.data.keyselecte;
    var keyListId = this.data.keyListId;
    keyListId = idx;
    keyselecte = (idx == 1 ? true : false);
    
    this.setData({
      keyListId: keyListId,
      keyselecte: keyselecte
    })
    // 数据请求
    wx.request({
      url: app.globalData.hpUrl + 'queryItem',
      data: {
        statu: keyListId
      },
      success: function (res) {
        console.log(res.data)
        if (keyListId==1){
          that.setData({
            mrlist: res.data,
          })
        }else{
          that.setData({
            frlist: res.data,
          })

        }
        
      }
    })

  },
  //-----------------------------------------------
  // 左侧菜单栏焦点控制函数
  keyMenu: function (e) {
    let that = this;
    // let textid = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let textid = Number(index)+1;
    // console.log()
    
    // console.log(textid);
    that.setData({
      curNav: index,
    })
    wx.request({
      url: app.globalData.hpUrl + '/index.php/Home/Goodstype/selecLikeGoods',
      data: {
        id: textid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          shops: res.data,
        })
      }
    })
  },
  //
  searchInto:function(e){
    var change = e.currentTarget.dataset.inner;
    var statu = e.currentTarget.dataset.statu;
    wx.navigateTo({
      url: '../index/search/search?key=' + change + '&&statu=' + statu
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
   
         // 1，关键词列表
      wx.request({
         url: app.globalData.hpUrl + '/index.php/Home/Goodstype/selectGoodsTypeAll', 
        success: function (res) {
          // console.log(res.data)
          that.setData({
            mlmenu: res.data,
          })
        }
    })
      wx.request({
        url: app.globalData.hpUrl + '/index.php/Home/Goodstype/selecLikeGoods',
        data: {
          id: 1
        },
        success: function (res) {
          // console.log(res.data)
          that.setData({
            shops: res.data,
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