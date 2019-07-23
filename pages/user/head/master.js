//获取应用实例
var app = getApp()
var noiogin = require('../../../utils/noiogin.js')
Page({

  /**
   * 页面的初始数据
   */

  data: {
    picListxin: '',
    nnn: 3,
    // 头像
    imgMy: '',
    userimages: '',
    //修改二维码
    imgnum: 0, 
    // userimages:'',
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: '',
    master: [],
    picList: [],
    //公办学校 私立学校-------------
    classArray: ['公办', '民办'],
    classIndex: 0,
    //建校时间选择
    date: '2016-09-01',
    //学校人数
    studentArray: ['100','300','500','700'],
    studentIndex: 0,
    //有无分校
    schoolArray: ['有', '无'],
    schoolIndex: 0,
    // 可否考编
    editorArray: ['可', '否'],
    editorIndex: 0,
    region: ['浙江省','杭州市','江干区'],
    //二维码
    imgbox: '',
    myaddress: ['浙江省', '杭州市', '江干区22'],  //选择的地址
    mycode:''
  },

  //私立学校 公办学校 选择的一级联动
  goclassChange: function (e) {
    var that = this
    console.log(e)
    console.log('学校类型发送选择改变，携带值为', e.detail.value)
    this.setData({
      classIndex: e.detail.value
    })
    console.log( '学校类型'+that.data.classIndex)
  },
  //建校时间选择
  bindDateChange: function (e) {
    console.log('建校时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //学生人数 选择的一级联动
  goStudentChange: function (e) {
    console.log('学生人数发送选择改变，携带值为', e.detail.value)
    this.setData({
      studentIndex: e.detail.value
    })
  },
  // //私立学校 公办学校 选择的一级联动
  goStudentChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      studentIndex: e.detail.value
    })
  },
  // 有无分校 选择的一级联动
  goSchoolChange: function (e) {
    console.log('有无分校发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  // 可否考编 选择的一级联动
  goEditorChange: function (e) {
    console.log('可否考编发送选择改变，携带值为', e.detail.value)
    this.setData({
      editorIndex: e.detail.value
    })
  },
  // 学校类型的一级联动
  goTeachchChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      teachIndex: e.detail.value
    })
  },
  // 经营区域
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    this.setData({
      myaddress: e.detail.value,
      region: e.detail.value
    })
    //console.log(that.data.myaddress)
  },
  // 禁止修改
  forbidFn: function () {
    wx.showToast({
      title: '不可修改',
      icon: 'success',
      duration: 1000
    })
  },
  //二维码
  selectImg : function () {
    let that = this
    let user = this.data.user;
    let imgbox = []
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilePaths = res.tempFilePaths[0];
          console.log('genxtup', tempFilePaths, 'genx', tempFilePaths)
          that.setData({
            mycode: tempFilePaths
          })
          let imgnum = tempFilePaths.length
          imgbox = res.tempFilePaths[0];
          that.setData({
            imgbox: tempFilePaths,
            imgnum: imgnum
          })
        },
      })

  },
  // 提交请求
  teformSubmit: function (e) {
    console.log(e)
    let that = this
    let imgMy = this.data.imgMy;
    let user = wx.getStorageSync('user');
    console.log(user)
    let che = e.detail.value;
    console.log('提交信息', che.schooltype);
    console.log('y用户', user.usernumber)
    if (che.schoolname != '' && che.principalname != '' && che.schooltype != '' && che.establish != '' && che.session != '' && che.studentnum != '' && che.area != '' && che.branch != '' && che.kaobian != '' && che.address && che.zcaddress != '' && che.introduce != '' ) {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/perfect',
        data: {
          usernumber: user.usernumber,
          schoolname: che.schoolname,
          principalname: che.principalname,
          schooltype: che.schooltype,
          area: che.area,
          establish: che.establish,
          session: che.session,
          studentnum: che.studentnum,
          branch: che.branch,
          address: che.address,
          zcaddress: che.zcaddress,
          introduce: che.introduce,
          kaobiandt: che.kaobiandt
        },
        success: function (res) {
          //console.log(res)
          let result = res.data.data;

          console.log('请求结果',result)
          // 进行用户数据缓存
          noiogin.userInfo(user.usernumber)
          // console.log(imgbox)
          setTimeout(function () {
            wx.switchTab({
              url: "/pages/user/index"
            })
          }, 1000)
          // 图片上传
          if(that.data.imgbox != ''){
            console.log('选择图片')
            wx.uploadFile({
              url: app.globalData.hpUrl + 'api/upload/ercode?usernumber=' + user.usernumber ,
              filePath: that.data.imgbox,
              name: 'files',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: {
              },
              success: function (res) {
                console.log('图片上传',res)                   
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }else{
            console.log('没有选择图片')
          }
        if(res.data.code){
          wx.showToast({
            title: '修改成功',
          })
        }else{
          wx.showToast({
            title: '修改失败',
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
    wx.request({
      url: app.globalData.hpUrl + 'api/user/' + user.usernumber,
      success: function (res) {
        console.log('初次用户信息',res.data)
        var address = res.data.data.address;
        var a = address.split('-')
        let result = res.data.data
        //学校类型
        var classIndex = 0;
        if (result.schooltype == '公办'){
          classIndex = 0
        } else if(result.schooltype == '民办'){
          classIndex = 1
        }else{
          classIndex = 0
        }
        //学校人数
        var studentIndex = 0 
        if (result.studentnum == 100){
          studentIndex = 0
        } else if (result.studentnum == 300){
          studentIndex = 1
        } else if (result.studentnum == 500){
          studentIndex = 2
        } else if (result.studentnum == 700){
          studentIndex = 3
        }else {
          studentIndex = 0
        }
        //有无分校
        var schoolIndex = 0
        if (result.branch == '有'){
          schoolIndex = 0
        }else{
          schoolIndex = 1
        }
        //可否考编
        var editorIndex = 0
        if (result.Kaobian == '可'){
          editorIndex = 0
          }else{
          editorIndex = 1
          }
        var establish = res.data.data.establish
        console.log(res.data.data.establish)
      
          that.setData({
            user: result,
            mycode: result.ercode,
            region: a,
            classIndex: classIndex,
            studentIndex: studentIndex,
            schoolIndex: schoolIndex,
            editorIndex: editorIndex,
            date: establish
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




})


















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
  // console.log(show)
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

