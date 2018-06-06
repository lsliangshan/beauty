//index.js
//获取应用实例
var countDown = require('../../behaviors/countdown.js')
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    countdown: {
      type: Number,
      value: 1,
      observer: (newVal, oldVal) => {}
    }
  },
  data: {},
  behaviors: [countDown],
  ready: function () {
    this.setData({
      countdown: this.data.countdown - 10
    })
    var numAnim = this.countDown(24.02, 99.99);
    if (!numAnim.error) {
      numAnim.start();
    } else {
      console.error(numAnim.error);
    }
    // this.myBehaviorMethod();
    // wx.request({
    //   url: 'http://192.168.189.89:3000/Bd/index/token',
    //   method: 'GET',
    //   success: ({data}) => {
    //     console.log('======', data)
    //     wx.showModal({
    //       content: data.data.access_token
    //     })
    //   }
    // })
  },
  externalClasses: ['custom-style']
})
