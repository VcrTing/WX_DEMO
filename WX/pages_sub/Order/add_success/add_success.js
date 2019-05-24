
const app = getApp()

Page({

  data: {
    order_number: ''
  },

  onLoad: function (options) {
    this.setData({
      order_number: options.order_number
    })
    const url = `${app.globalData.api.ORDER}?order_number=${options.order_number}`
    wx.request({
      url: url,
      success: (res) => {
        res = res.data[0]
        const list = app.read('wx_order')
        list.splice(0, 0, res)
        app.save('wx_order', list)
      }
    })
  },

  go_order: function (e) {
    wx.switchTab({
      url: '/pages/Order/order',
    })
  }
})