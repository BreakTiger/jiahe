var app = getApp()
// 地址相关数据---------------------
var area = require('../../../utils/area.js')
//数据缓存
var noiogin = require('../../../utils/noiogin.js')
// pages/zhuche/hong/hong.js
Page({


  data: {
    picListxin: '',
    nnn: 3,
    // 头像
    imgMy: '',
    userimages: '',
    // userimages:'',
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: '',

    picList: [],
  
    //修改二维码
    imgbox: [],
    imgnum: 0,
    //性别选择的一级联动
    sexArray: ['男', '女'],
    sexIndex: 0,
    //出生日期的一级联动
    date: '2016-09-01',
    //求职状态一级联动
    examplesArray: ["在职", "离职", "退休"],
    examplesIndex: 0,
    //学历选择一级联动
    collegeArray: ["高中", "中专", "大专", "本科", "硕士", "博士", "海归", "其它"],
    collegeIndex: 0,
    //所在区域三级联动
    region: ['浙江省', '杭州市', '江干区'],
    mycode:'',
    myaddress: ['浙江省', '杭州市', '江干区'] 

  },
  //选择性别的一级联动
  schoolSex: function (e) {
    // console.log('性别，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },

  //出生日期的一级联动
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //求职状态一级联动
  examples: function (e) {
    // console.log('求职状态 ', e.detail.value)
    this.setData({
      examplesIndex: e.detail.value
    })
  },
  //学历一级联动
  college: function (e) {
    // console.log('求职状态 ', e.detail.value)
    this.setData({
      collegeIndex: e.detail.value
    })
  },
  //所在区域一级联动
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      myaddress: e.detail.value,
      region: e.detail.value
    })
  },
  // 禁止修改
  forbidFn: function () {
    wx.showToast({
      title: '不可修改',
      icon: 'success',
      duration: 1000
    })
  },
  //修改二维码
  gotoShowImg: function (e) {
    let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
         // console.log(res.tempFilePaths) // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths[0];
          let imgnum = tempFilePaths.length
          that.setData({
            mycode: tempFilePaths
          })
         // console.log(tempFilePaths)//
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
    let that = this;
    let imgMy = this.data.imgMy;
    // console.log(imgMy)
    let che = e.detail.value
    // console.log(che)
    var imgbox = this.data.imgbox //二维码
    var imgnum = this.data.imgnum
    let usernumber = wx.getStorageSync('user').usernumber
    // console.log(usernumber)
    //console.log(che, '二维码', imgbox)
    if (che.teachername != '' && che.sex != '' && che.birthday != '' && che.occustate != '' && che.schoolage != '' && che.education != '' && che.subject != '' && che.teacherage !='' && che.address != '' && che.advantage != '' && che.academy != '' && che.major != '' && che.bianzhi != '' && che.introduce != '') {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: app.globalData.hpUrl + 'api/perfect',
        data: {
          usernumber: usernumber,
          teachername: che.teachername,
          sex: che.sex,
          birthday: che.birthday,
          occustate: che.occustate,
          address: che.address,
          academy: che.academy,
          major: che.major,
          subject: che.subject,
          introduce: che.introduce,
          teacherage: che.teacherage,
          education: che.education,
          idcard: 1234564654564,
          advantage: che.advantage,
          bianzhi: che.bianzhi
        },
        success: function (res) {
          var result = res.data;
          // console.log(res)
          // console.log(imgbox)
          noiogin.userInfo(usernumber)
          wx.showToast({
            title: '上传成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: "/pages/user/index"
            })
          }, 1000)
          // console.log(usernumber)
          if (imgbox == '') {

          } else {
            // 图片上传
            wx.uploadFile({
              url: app.globalData.hpUrl + 'api/upload/ercode?usernumber=' + usernumber,
              filePath: imgbox,
              name: 'files',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: {
              },
              success: function (res) {
                // console.log('上传成功')
                // console.log(JSON.parse(res.data))

              },
              fail: function (res) {
                // console.log(res)
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
    wx.request({
    url: app.globalData.hpUrl + 'api/user/' + user.usernumber,
      success: function (res) {
        // console.log('我信息',res.data.data)
        // console.log(res.data)
        var address = res.data.data.address;
        var a = address.split('-')
        let result = res.data.data
        //性别
        var sexIndex = 0
        if(result.sex == '男'){
          sexIndex = 0
        }else{
          sexIndex = 1
        }
        //求职状态
        var examplesIndex = 0
        if (result.occustate == '在职'){
          examplesIndex = 0
        } else if (result.occustate = '离职'){
          examplesIndex = 1
        }else {
          examplesIndex = 2
        }
        //学历
        var collegeIndex = 0
        if (result.education == '高中'){
          collegeIndex = 0
        } else if (result.education == '中专'){
          collegeIndex = 1
        } else if (result.education == '大专'){
          collegeIndex = 2
        } else if (result.education == '本科') {
          collegeIndex = 3
        } else if (result.education == '硕士') {
          collegeIndex = 4
        } else if (result.education == '博士'){
          collegeIndex = 5
        } else if (result.education == '海归') {
          collegeIndex = 6
        }else{
          collegeIndex = 7
        }
        //时间
        var birthday = res.data.data.birthday
          that.setData({
            user: result,
            mycode: result.ercode,
            region: a,
            sexIndex : sexIndex,
            examplesIndex: examplesIndex,
            collegeIndex: collegeIndex,
            date: birthday
          })
  
      }
    })
    // console.log(this.data.user)
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

