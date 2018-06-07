//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // detectData: app.globalData.detectData,
    imageData: '',
    detectResult: {},
    requestInfo: app.globalData.requestInfo,
    resultInfo: {},
    pageLoaded: false
  },
  onLoad: function () {
    let _detectResult = app.globalData.detectData.result.face_list[0]
    this.setData({
      // detectData: app.globalData.detectData,
      imageData: app.globalData.imageData,
      detectResult: _detectResult
    })
    this.getResult({
      gender: _detectResult.gender.type === 'male' ? '1' : '2',
      score: _detectResult.beauty
    })
  },
  onReady: function () {
    this.setData({
      pageLoaded: true
    })
  },
  getResult (args) {
    wx.request({
      url: this.data.requestInfo.baseUrl + this.data.requestInfo.getResult,
      method: 'POST',
      data: {
        gender: args.gender,
        score: args.score
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: ({data}) => {
        console.log('>>>> result: ', data)
        if (data.status === 200) {
          this.setData({
            resultInfo: data.data
          })
        }
      }
    })
  }
})
