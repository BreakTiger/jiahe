var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    array:['','整合上市','异业合作'],
    index: 1,
    job: [],
    imgbox: '',
    imgnum: '',
    schoolImg: ''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
  },
  //上传图片
  cooImg: function () {
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
        that.setData({
          schoolImg: tempFilePaths
        })
        let imgnum = tempFilePaths.length
        imgbox = res.tempFilePaths[0];
        console.log(imgbox)
        that.setData({
          imgbox: imgbox,
          imgnum: imgnum
        })
      },
    })

  },
  //form表单提交
  formCoo: function (e) {
    console.log(e)
    let that = this
    let che = e.detail.value;
    console.log(che.itemname)
    console.log(che.plan)
    console.log(che.itemtype)
    
    if (che.itemtype != '' && che.itemname != '' && che.plan != '' && that.data.imgbox != '') {
      let user = wx.getStorageSync('user')
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/project/add',
        data: {
          usernumber: user.usernumber,
          itemtype: che.itemtype,
          itemname: che.itemname,
          plan: che.plan
        },
        success: function (res) {
          console.log(res)
          var result = res.data;
          console.log(result)
          that.setData({
            job: result
          })
          // console.log(that.data.job)
          // console.log(that.data.imgbox)
           let user = wx.getStorageSync('user')
          console.log(user.id)
          if (that.data.imgbox != '') {
            wx.uploadFile({
                header: {
                "Content-Type": "application/x-www-form-urlencoded"
                    },
                url: app.globalData.hpUrl + 'api/project/image' ,
                method: "POST",
                filePath: that.data.imgbox,
                name: 'files',
                formData: {
                  itemid : that.data.job.data
                },
                 success: function (res) {
                   console.log(res.data)
                  console.log('上传成功')
                   console.log(JSON.parse(res.data))
                   that.setData({
                     user:user
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
          setTimeout(function () {
            wx.switchTab({
              url: "/pages/user/index"
            })
          }, 1000)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let user = wx.getStorageSync('user')
    // that.setData({
    //   schoolImg: user.ercode
    // })
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