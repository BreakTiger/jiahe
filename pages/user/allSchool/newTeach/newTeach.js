var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    //学校类型
    array: ['','我要加盟','资质学校'],
    index: 1 ,
    imgnum: '',
    // 判断按钮修改和删除的显示
    adrchange: false,
    // 判断能否保存
    ajxtrue: true,
    address: '',
     imgbox: [],
    imgbox2: [],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 删除照片
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });

  },
  // 头部图片盒子临存
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var picid = e.currentTarget.dataset.pic;
    var that = this;
    var n = 4;
    if (4 > imgbox.length > 0) {
      n = 4 - imgbox.length;
    } else if (imgbox.length == 4) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (4 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });

      }
    })
  },
  //教室图片更改
  classRoomImg: function () {
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

//form表单提交
  formTeach: function (e){
    console.log(e)
    let that = this
    let che = e.detail.value;
    if (che.typenum != '' && che.remark != '' && that.data.imgbox != '' ) {
      let user = wx.getStorageSync('user')
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/school/add',
        data: {
          usernumber: user.usernumber,
          typenum: che.typenum,
          remark: che.remark
        },
        success: function (res) {
          console.log(res)
          var result = res.data;
          that.setData({
            job: result
          })
          console.log(result)
         let id = result
         console.log(res.data.data)
         let teacherid=res.data.data
         for (let i = 0; i < that.data.imgbox.length; i++) {
           wx.uploadFile({
             url: app.globalData.hpUrl + 'api/school/image',
             filePath: that.data.imgbox[i],
             name: 'files',
             header: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             method: "POST",
             formData: {
               schoolid: teacherid
             },
             success: function (res) {
               console.log(res)
             }
           })
         }
         wx.showToast({
           title: '发布成功',
           icon: 'success',
           duration: 1500
         })
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
  
  },

  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });

  },
  // 头部图片盒子临存
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var picid = e.currentTarget.dataset.pic;
    var that = this;
    var n = 4;
    if (4 > imgbox.length > 0) {
      n = 4 - imgbox.length;
    } else if (imgbox.length == 4) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (4 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });

      }
    })
  }












})


