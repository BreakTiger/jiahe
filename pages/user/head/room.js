//获取应用实例
var app = getApp()


// 下拉组合参数
var pickerViewTN = 0;
var showN = true;
var moveYN = 200;
// 日期
var pickerViewTd = 0;
var showd = true;
var moveYd = 200;

// pages/zhuche/hong/hong.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    haves: [],
    // actindex:[1,2],
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: '',

    picList: [],
    // 红娘注册
    // 表单相关数据------------------
    // 图片盒子

    // 判断按钮修改和删除的显示
    adrchange: false,
    // 判断能否保存
    ajxtrue: true,
    address: '',
    // 选中的标签参数
    cheStr:'',

    // 日期

  

    // 滑块组数据
    showN: showN,
    textHave1: '',
    textHave2: '',
    textHave3: '',
    perHaveN: '',
    perHaveS: [
      ["日", "月", "年"],
    ],
    perNum: '',
    label: [],
    arrnum: [],

    // 图片列表
    imgbox: [],
    imgbox2: [],
    region: ['浙江省', '杭州市', '江干区'],
  },
  //地理位置选择
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // checkboxChange: function (e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  // },
  onclicks: function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(e)
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
  checkedFn: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.seindex;
    let haves = this.data.haves;
    let cheArr=[]
    haves[index].checked = !haves[index].checked;
    // console.log(haves)
    that.setData({
      haves: haves
    });
    for (let i = 0; i < haves.length; i++) {
      if (haves[i].checked==true){
        cheArr.push(haves[i].text);
     }
      
    }
    cheArr = cheArr.join(',')
    // console.log(cheArr)

    that.setData({
      cheStr: cheArr
    });
  },
  // 禁止修改
  forbidFn: function () {
    wx.showToast({
      title: '不可修改',
      icon: 'success',
      duration: 1000
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
  // 删除照片
  imgDelete2: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox2 = this.data.imgbox2;
    imgbox2.splice(index, 1)
    that.setData({
      imgbox2: imgbox2
    });

  },
  // 头部图片盒子临存
  addPic2: function (e) {
    var imgbox = this.data.imgbox2;
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
          imgbox2: imgbox
        });

      }
    })
  },

  // 提交请求
  teformSubmit: function (e) {
    console.log(e)
    let that = this
    var arrs = this.data.label
    //console.log(arrs)
    var array = ''
    for (var i = 0; i < arrs.length; i++) {
      if (arrs[i].status == false) {
        console.log(arrs[i].labelname)
        if (array) {
          array = array + ',' + arrs[i].labelname
          //console.log(array)
          that.setData({
            arrnum: array
          })

        } else {
          array = arrs[i].labelname;
          console.log(array)
            that.setData({
              arrnum: array
            })
        }
      } else {
        console.log(1)
      }
    }
    //console.log(array)
    //console.log(e)
    let imgMy = this.data.imgMy;
    let user = wx.getStorageSync('user');
    // console.log(user)
    let che = e.detail.value;
    let cheStr = this.data.cheStr;
    let imgbox = this.data.imgbox;
    let imgbox2 = this.data.imgbox2;
    let roomlabel = che.roomlabel;
    
    
    // console.log(imgbox);
    // console.log(imgbox2);
    // console.log(che);
    if (che.jobname != '' && che.address != '' && che.experience != '' && che.price != '' && imgbox.length != 0 && imgbox2.length != 0 && che.duty != '' && che.roomlabel != '') {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/room/add/text',
        data: {
          usernumber: user.usernumber,
          price: che.price,
          address: che.address,
          introduce: che.introduce,
          roomlabel: that.data.arrnum,
          roomname: che.roomname
        },
        success: function (res) {
          console.log('文字上传结果',res)
          console.log('room',res.data.code)
          let id = res.data.data
          console.log(id)
          for (let i = 0; i < imgbox.length; i++){
            wx.uploadFile({
              url: app.globalData.hpUrl + 'api/room/add/image',
              filePath: imgbox[i],
              name: 'files',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              formData: {
                typenum: 'slider', 
                roomid: id
              },
              success: function (res) {
                console.log(res)
              },
              fail: function() {
                console.log(1)
              }
            })
          }
          for (let i = 0; i < imgbox2.length; i++) {
            wx.uploadFile({
              url: app.globalData.hpUrl + 'api/room/add/image',
              filePath: imgbox2[i],
              name: 'files',
              method:"POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              formData:{
                typenum: 'detail',
                roomid: id
              },
              success: function (res) {
                console.log(res)
              }
            })
          }
          if (res.data.code == 200) {
            wx.showToast({
              title: '发布成功',
            })
            wx.switchTab({
              url: "/pages/user/index"
            })
          }else {
            wx.showToast({
              title: '发布失败',
            })
          }
        }
      });
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
  onLoad: function (opt) {
    let that = this;
    let user = wx.getStorageSync('user')
    //获取教室标签    
    wx.request({
      url: app.globalData.hpUrl + 'api/label',
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

  },


  //地址控制函数---------------------------


  //--------------------------------------------------------
  // 滑块组
  //合并函数---------------------------
  pickerChangeN(e) {
    let that = this;
    let val = e.detail.value;
    let perNum = this.data.perNum;
    let perHaveS = this.data.perHaveS;
    // let perHave1 = this.data.perHave1;
    console.log(e.detail.value)
    let index = e.detail.value[0];

    // that.setData({
    //   textHave1: perHave1[index]
    // })
    perNum = parseInt(perNum);
    switch (perNum) {
      case 1:
        (function () {
          // console.log("*************")
          that.setData({
            textHave1: perHaveS[perNum - 1][index]
          })
        })()
        break;
      case 2:
        (function () {
          that.setData({
            textHave2: perHaveS[perNum - 1][index]
          })
        })()
        break;
      case 3:
        (function () {
          that.setData({
            textHave3: perHaveS[perNum - 1][index]
          })
        })()
        break;
    }
  },
  //移动按钮点击事件
  translateN: function (e) {
    let perHaveN;
    let perHaveS = this.data.perHaveS;
    let num = e.currentTarget.dataset.cheid;

    perHaveN = perHaveS[num - 1];
    // console.log(perHaveN)
    this.setData({
      perHaveN: perHaveN,
      perNum: num,
      valueN: [0]
    })
    // 控制模态弹框
    if (pickerViewTN == 0) {
      moveYN = 0;
      showN = false;
      pickerViewTN = 1;
    } else {
      moveYN = 200;
      showN = true;
      pickerViewTN = 0;
    }
    animationEventsN(this, moveYN, showN, num);
  },
  //隐藏弹窗浮层
  hiddenFloatViewN(e) {
    // console.log(e);
    moveYN = 200;
    showN = true;
    pickerViewTN = 0;
    animationEventsN(this, moveYN, showN);
  },
  //------------***********************
})

//合并-----动画事件
function animationEventsN(that, moveYN, showN, num) {

  // console.log("moveYN:" + moveYN + "\nshowN:" + showN);
  // console.log(num);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveYN + 'vh').step()

  that.setData({
    animationN: that.animation.export(),
    showN: showN
  })

}



