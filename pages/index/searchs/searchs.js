var app = getApp();
//cid不能乱改，下面有函数sonSort的二级选择有用到
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    pageN: 2,
    // 底部加载信息
    pageTottomText: '',
    shoplist: [],
    searchText: '',
  },
  // -------------------------------------------------------
  // 商品详情页跳转函数
  detailInto: function (e) {
    var change = e.currentTarget.dataset.id;
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + change + '&&item=' + JSON.stringify(item)
    })
  },
  
  //--------------------------
  // 搜索框控制函数
  bindseInput: function (e) {
    let that = this;
    that.setData({
      searchText: e.detail.value
    });
  },
  // 请求数据
  reData: function (e) {
    let that = this;
    let searchText = this.data.searchText;
    // console.log(searchText)
    if (searchText!=''){
      wx.request({
        url: app.globalData.hpUrl + 'index.php/Home/Goods/selectGoodsLike', //仅为示例，并非真实的接口地址
        data:
        {
          key: searchText,
          page: 1
        },

        success: function (res) {
          console.log(res.data)

          that.setData({
            shoplist: res.data.data
          });
        }
      })
    }
  },
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
    this.setData({
      pageTottomText: ''
    });
    let that = this;
    let pageN = this.data.pageN;
    let shops = this.data.shops;
    // console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
    //------------------------------------------------------------------
    // 名字
    var sq = this.data.selectnum.sq;
    // console.log(sq)
    // 面料或辅料
    var st = this.data.selectnum.st;
    // 期货或现货
    var so = this.data.selectnum.so;
    console.log(this.data.selectnum)
    // 参数转换
    if (st == 0) {
      st = ''
    }
    if (so == 0) {
      so = ''
    }

    wx.request({
      url: app.globalData.hpUrl + 'queryProduct', //仅为示例，并非真实的接口地址
      data:
      {
        name: sq,
        status: st,
        statu: so,
        page: pageN
      },
      success: function (res) {
        var arr = [];
        // console.log(res.data)
        var result = res.data;
        //----------------------------------------------
        // 判断分页
        if (result.length != 0) {
          pageN += 1;
          that.setData({
            pageN: pageN
          });
          //----------------------------------------------
          setTimeout(function () {
            shops = shops.concat(result)
            that.setData({
              shops: shops
            });
          }, 1000);
          //----------------------------------------------
        } else {
          that.setData({
            pageTottomText: getApp().globalData.endText,
          });
        }
      }
    })

    //----------------------------------------------------------------
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})