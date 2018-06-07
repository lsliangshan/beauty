//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imagePath: '',
    requestInfo: app.globalData.requestInfo,
    showMask: false
  },
  getImageFromAlbum () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: res => {
        this.doDetect(res.tempFilePaths[0])
        // wx.showLoading({
        //   title: '识别中...',
        // })
        // this.setData({
        //   imagePath: res.tempFilePaths[0]
        // })
        // this.imageToBase64(res.tempFilePaths[0]);
      }
    })
  },
  getImageFromCamera () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: res => {
        this.doDetect(res.tempFilePaths[0])
      }
    })
  },
  doDetect (path) {
    wx.showLoading({
      title: '识别中...',
    })
    this.setData({
      showMask: true,
      imagePath: path
    })
    this.imageToBase64(path);
  },
  previewImage () {
    wx.previewImage({
      urls: [this.data.imagePath]
    })
  },
  imageToBase64 (image) {
    const that = this
    wx.uploadFile({
      url: this.data.requestInfo.baseUrl + this.data.requestInfo.getBase64,
      filePath: image,
      name: 'file',
      success: ({data}) => {
        that.detectFace({
          at: '24.40957c802dfeb4217c35f19fe6b273ec.2592000.1530706870.282335-11348934',
          image: JSON.parse(data).data
        })
      }
    });
  },
  detectFace (args) {
    wx.request({
      url: this.data.requestInfo.baseUrl + this.data.requestInfo.detectFace,
      method: 'POST',
      data: {
        at: args.at,
        image: args.image
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: ({data}) => {
        this.setData({
          showMask: false
        })
        app.globalData.imageData = args.image
        app.globalData.detectData = data.data
        wx.hideLoading()
        if (data.data.result && data.data.result.face_list && data.data.result.face_list.length > 0) {
          wx.navigateTo({
            url: '../result/index'
          })
        }
      }
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
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      // 用户取消授权
      return
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
