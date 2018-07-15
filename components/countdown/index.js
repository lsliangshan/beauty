//index.js
//获取应用实例
var utils = require('../../utils/util');
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
  behaviors: [],
  ready: function () {
    let ctx = wx.createCanvasContext('countdownCanvas', this);
    utils.countUp.start(ctx, 0, this.data.countdown.toFixed(2), 2, 1.5, {
      canvas: {
        fontSize: 30,
        color: '#ffffff'
      }
    });

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
  detached: function () {
    utils.countUp.reset()
  },
  externalClasses: ['custom-style']
})
