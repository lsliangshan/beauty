//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imagePath: 'http://tmp/wx3a2e54b52093ad4e.o6zAJs-TlVVCAT21omSrdiJviC2w.j7cTEA8i0oble662a46fc01d4ce457e95906308dbacf.png',
    imageSize: {
      width: 300,
      height: 300
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getImageFromAlbum () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: res => {
        console.log('====>', res.tempFiles[0])
        this.setData({
          imagePath: res.tempFilePaths[0]
        })

        this.imageToBase64();
      }
    })
  },
  getImageFromCamera () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: res => {
        console.log('====>', res)
        this.setData({
          imagePath: res.tempFilePaths[0]
        })
      }
    })
  },
  previewImage () {
    wx.previewImage({
      urls: [this.data.imagePath]
    })
  },
  imagePathLoaded (evt) {
    console.log('.... image path loaded: ', evt)
    this.setData({
      imageSize: {
        width: evt.detail.width,
        height: evt.detail.height
      }
    })
  },
  imageToBase64 () {
    let canvas = wx.createCanvasContext('previewCanvas');
    canvas.drawImage(this.data.imagePath, 0, 0, this.data.imageSize.width / 2, this.data.imageSize.height / 2);
    canvas.draw(false, () => {
      wx.canvasGetImageData({
        canvasId: 'previewCanvas',
        x: 0,
        y: 0,
        width: this.data.imageSize.width / 2,
        height: this.data.imageSize.height / 2,
        success: (res) => {
          console.log('.....to base 64: ', wx.arrayBufferToBase64(res.data))
        }
      })
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
