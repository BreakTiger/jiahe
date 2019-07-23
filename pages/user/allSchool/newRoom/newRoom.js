var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    //上传教室图片
    label: [],
    imgbox: '',
    imgbox1: '',
    imgnum: '',
    imgnum1: '',
    region: ['浙江省', '杭州市', '江干区'],
  },
  //地理位置选择
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onclicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.label;
    console.log(arrs)
    if (arrs[index].status == false) {
      arrs[index].status = true;
    } else {
      arrs[index].status = false;
    }
    this.setData({
      label: arrs
    })
    // console.log(e)
  },
  //教室详情图片上传
  detailsImg: function () {
    let user = this.data.user;
    let imgbox1 = []
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.onShow()
        let tempFilePaths = res.tempFilePaths[0];
        user.detailimage = tempFilePaths
        // 进行用户数据缓存
        that.setData({
          user: user
        })
        let imgnum1 = tempFilePaths.length
        imgbox1 = res.tempFilePaths[0];
        console.log(imgbox1)
        that.setData({
          imgbox1: imgbox1,
          imgnum1: imgnum1,
          user: user
        })
      },
    })
  },
  //教室图片上传
  classroomImg: function (e) {
    let user = this.data.user;
    let imgbox = []
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.onShow()
        let tempFilePaths = res.tempFilePaths[0];
        user.sliderimage = tempFilePaths
        // 进行用户数据缓存
        that.setData({
          user: user
        })
        let imgnum = tempFilePaths.length
        imgbox = res.tempFilePaths[0];
        console.log(imgbox)
        that.setData({
          imgbox: imgbox,
          imgnum: imgnum,
          user: user
        })
      },
    })

  },
  //表单提交
  formRoom: function (e) {
    console.log(e)
    let that = this
    let che = e.detail.value;
    if (che.jobname != '' && che.address != '' && che.experience != '' && che.education != '' && che.duty != '') {
      let user = wx.getStorageSync('user')
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/room/add/text',
        data: {
          usernumber: user.usernumber,
          price: che.price,
          roomlabel: che.roomlabel,
          introduce: che.introduce,
          address: che.address,
        },
        success: function (res) {
          console.log(res)
          var result = res.data;
          that.setData({
            job: result
          })
               console.log(result)
                let user = wx.getStorageSync('user')
                setTimeout(function () {
                  wx.switchTab({
                    url: "/pages/user/index"
                  })
                }, 1000)
                if (that.data.imgbox != '') {
                  wx.uploadFile({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: app.globalData.hpUrl + 'api/room/add/image' ,
                    method: "POST",
                    filePath: that.data.imgbox,
                    name: 'files',
                    formData: {
                    },
                    success: function (res) {
                      console.log(res.data)
                      console.log('上传成功')
                      console.log(JSON.parse(res.data))
                      user.sliderimage = result.data
                      user.detailimage = result.data
                      // 进行用户数据缓存
                      that.setData({
                        user: user
                      })
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  })
                }
          if (result.code == 200) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1500
            })
          }
    }
    })
    } else {
      wx.showToast({
        title: '请填充完整',
        icon: 'success',
        duration: 1500
      })
    }
  },
  onLoad: function (options) {
    let that = this
    //获取教室标签    
    wx.request({
      url: app.globalData.hpUrl + 'api/label' ,
      success: function (res) {
        console.log(res)
        console.log(res.data)
        let result = res.data.data
        console.log(result)
        that.setData({
          label: result
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
    let that = this
    wx.getStorageSync('user')
    let user = wx.getStorageSync('user')
    this.setData({
      user: user
    })
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