//获取应用实例
var app = getApp()
// 地址相关数据---------------------
var area = require('../../../utils/area.js')
// var conf = require('../../../utils/date.js')

var areaInfo = [];//所有省市区县数据

var provinces = [];//省

var citys = [];//城市

var countys = [];//区县

var index = [0, 0, 0];

var cellId;
var pickerViewT = 0;
var show = true;
var showDate = false;
var moveY = 200;

// 下拉组合参数
var pickerViewTN = 0;
var showN = true;
var moveYN = 200;
// 日期
var pickerViewTd = 0;
var showd =true;
var moveYd = 200;

// pages/zhuche/hong/hong.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    picListxin:'',
    nnn: 3,
    // 头像
    imgMy: '',
    userimages:'',
    // userimages:'',
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
    // 日期
    showd:showd,
    // 地址相关数据------------------
    show: show,
    provinces: provinces,
    citys: citys,
    countys: countys,
    value: [0, 0, 0],
    valuetext: '',

    // 滑块组数据
    showN: showN,
    textHave1: '',
    textHave2: '',
    textHave3: '',
    perHaveN: '',
    perHaveS: [
      ["男","女" ],
      ["在职", "离职"],
      ["高中", "中专", "大专", "本科", "硕士", "博士", "海归", "其它"],
    ],
    perNum: '',
       //日期相关参数
    cur_year: '',
    cur_month: '',
    picker_year: '',
    picker_month: '',
    picker_days: '',
    picker_value: [0, 0, 0],
  
  },
  // 禁止修改
  forbidFn: function () {
    wx.showToast({
      title: '不可修改',
      icon: 'success',
      duration: 1000
    })
  },
  // 头部图片盒子临存
  addMy: function (e) {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        // console.log(picList)
        // console.log(tempFilePaths[0])
        that.setData({
          imgMy: tempFilePaths[0]
        });

      }
    })
  },

  // 提交请求
  teformSubmit: function (e) {
    let that = this;
    let imgMy = this.data.imgMy;
    let user = wx.getStorageSync('user');
    let che = e.detail.value;
    // console.log(che)
    if (che.username!='') {
      // console.log(user.usernumber)
      // console.log(che);
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'User/perfectInformation',
        data: {
          name:che.name,
          usernumber: user.usernumber,
        },
        success: function (res) {
          let result = res.data;

          // console.log(res)
          if (result) {
            wx.request({
              url: app.globalData.hpUrl + 'User/selectUserinformation', //仅为示例，并非真实的接口地址
              data: {
                usernumber: user.usernumber,
              },
              success: function (res) {
                let result = res.data;
                // console.log(result)
                if (result) {
                  wx.setStorageSync('user', result)
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: "/pages/user/index"
                    })
                  }, 1000);
                } else {
                  wx.showToast({
                    title: '操作无效',
                    icon: 'success',
                    duration: 1000
                  })
                }

              }
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

    if (user.id) {
      // console.log(user);
      let picList;
      if (user.userimg){
        picList = user.userimg.split(",")
      }
      
      // console.log(picList)
      that.setData({
        user: user,
        picList: picList
      });
    }

    // 地址
    //获取省市区县数据
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      //获取省份数据
      getProvinceData(that);
    });

    // 日期获取数据
    let date = new Date();
    let cur_year = date.getFullYear();
    let cur_month = date.getMonth() + 1;
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
    });
    this.chooseYearAndMonth()
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
  //滑动事件
  bindChange: function (e) {
    var val = e.detail.value;
    var valuetext = this.data.valuetext
    // console.log(e)
    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      getCityArr(val[0], this);//获取地级市数据
      getCountyInfo(val[0], val[1], this);//获取区县数据
    } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        getCountyInfo(val[0], val[1], this);//获取区县数据
      }
    }
    index = val;

    // console.log(index + " => " + val);
    valuetext = provinces[val[0]].name + " " + citys[val[1]].name + " " + countys[val[2]].name;
    // console.log(valuetext);
    //更新数据
    // console.log(city)
    this.setData({
      value: [val[0], val[1], val[2]],
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name,
      valuetext: valuetext
    })

  },
  //移动按钮点击事件
  translate: function (e) {
    if (pickerViewT == 0) {
      moveY = 0;
      show = false;
      pickerViewT = 1;
    } else {
      moveY = 200;
      show = true;
      pickerViewT = 0;
    }
    
    // this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);

  },
  //隐藏弹窗浮层
  hiddenFloatView(e) {
    // console.log(e);
    moveY = 200;
    show = true;
    pickerViewT = 0;
    animationEvents(this, moveY, show);

  },
  // 滚动函数
  pickerChange(e) {
    let that = this;
    let val = e.detail.value;
    let choose_year = this.data.picker_year[val[0]];
    let choose_month = this.data.picker_month[val[1]];
    let choose_day = this.data.picker_days[val[2]];
    that.setData({
      choose_year: choose_year,
      choose_month: choose_month,
      choose_day: choose_day
    })
  },
// 日期---------------------------
  //日期移动按钮点击事件
  translateDate: function (e) {
    let cur_year = this.data.cur_year;
    let cur_month = this.data.cur_month;
    this.chooseYearAndMonth()
    // 控制模态弹框
    if (pickerViewTd == 0) {
      moveYd = 0;
      showd = false;
      pickerViewTd = 1;
    } else {
      moveYd = 200;
      showd = true;
      pickerViewTd = 0;
    }
    animationEventsd(this, moveYd, showd);

  },
  //日期隐藏弹窗浮层
  hiddenFloatViewDate(e) {
    // console.log(e);
    moveYd = 200;
    showd = true;
    pickerViewTd = 0;
    animationEventsd(this, moveYd, showd);

  },
  // 获取当年当月对应的日子(1)获取天数
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 点击头部2017年12月获取初始数据，用来获取年和月
  chooseYearAndMonth() {
    // 获取当前的年月
    let cur_year = this.data.cur_year;
    let cur_month = this.data.cur_month;
    // let day_all = new Date(cur_year, cur_month, 0).getDate();
    // console.log(day_all)
    let picker_year = [],
      picker_month = [],
      picker_days = [];
    for (let i = 1950; i <= new Date().getFullYear(); i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }

    let thisMonthDays = this.getThisMonthDays(cur_year, cur_month);
    // console.log(thisMonthDays)
    for (let i = 1; i <= thisMonthDays; i++) {
      picker_days.push(i);
    }
    // 获取当前的年月的下标
    let idx_year = picker_year.indexOf(cur_year);
    let idx_month = picker_month.indexOf(cur_month);
    // console.log(picker_year)
    this.setData({
      picker_value: [idx_year, idx_month, 0],
      picker_year: picker_year,
      picker_month: picker_month,
      picker_days: picker_days,
      showPicker: true,
    });
  },
  // 滚动函数
  pickerChangeDate(e) {
    let that = this;
    let val = e.detail.value;
    let choose_year = this.data.picker_year[val[0]];
    let choose_month = this.data.picker_month[val[1]];
    let choose_day = this.data.picker_days[val[2]];
    that.setData({
      choose_year: choose_year,
      choose_month: choose_month,
      choose_day: choose_day
    })
  },
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
//-------------------------
//日期动画事件
function animationEventsd(that, moveYd, showd) {
  // console.log("moveYd:" + moveYd + "\nshowd:" + showd);
  that.animationd = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animationd.translateY(moveYd + 'vh').step()

  that.setData({
    animationd: that.animationd.export(),
    showd: showd
  })

}
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




















//地址动画事件
function animationEvents(that, moveY, show) {
  // console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()
  console.log(show)
  that.setData({
    animation: that.animation.export(),
    show: show
  })

}

// ---------------- 分割线 ---------------- 

//获取省份数据
function getProvinceData(that) {
  // console.log('1')
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  // console.log(provinces)
  that.setData({
    provinces: provinces
  })

  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    // province: "北京市",
    // city: "市辖区",
    // county: "东城区",
    province: "",
    city: "",
    county: "",
    valuetext: ''
  })

}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = { name: '' };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = { name: '' };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}
// 日历--------------------------------------------------------------------------------------------

