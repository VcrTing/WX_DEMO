
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
        let list = app.read('wx_order')
        try {
          list.splice(0, 0, res)
        } catch (e) {
          list = []
          list.push(res)
        }
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