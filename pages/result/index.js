//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detectData: app.globalData.detectData
  },
  onLoad: function () {
    this.setData({
      detectData: app.globalData.detectData
    })
  }
})
