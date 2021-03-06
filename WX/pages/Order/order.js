
const app = getApp()

Page({
  
    data: {
        no_order: true,
        order_list: [],
        is_loading: true,
        loading_img: '/lib/imgs/new/loading.gif',

        modal: '',
        this_order: {},
        need_auth: false,
        open_modal: false,
        allow_loading: false,
        open_auth_modal: false
    },

    onLoad: function (options) {
      
    },
  
    onShow: function () {
      wx.getUserInfo({
        success: (res) => {
          this.loading_data()
        },
        fail: (res) => {
          this.setData({
            open_auth_modal: true,
            need_auth: true
          })
        }
      })
    },

    getAuthorize() { //弹出授权窗函数
      if (this.data.need_auth) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: (res) => {
                  const u = res.userInfo
                  const memberId = app.globalData.memberId
                  app.globalData.userInfo = u
                  app.saveUserInfo(u, memberId)
                  this.loading_data()
                }
              });
              this.setData({
                open_auth_modal: false
              })
            } else {
              this.setData({
                open_auth_modal: true
              })
            }
          }
        })
      }
    },
    
    saveOrderList: function (list) {
      app.save('wx_order', list)
    },
    readOrderList: function () {
      return app.read('wx_order')
    },

    orderDetail: function (e) {
      const index = e.currentTarget.dataset.index;
      const order = this.data.order_list[index]

      this.setData({
        this_order: order
      })

      var animation = wx.createAnimation({
        timingFunction: "ease",
      })
      animation.translateY(0).step({duration: 2000})
      this.setData({
        modal: animation.export(),
        open_modal: true
      })
    },

    closeModal: function (e) {
      var animation = wx.createAnimation({
        timingFunction: "ease",
      })
      animation.translateY(-1334).step({duration: 2000})
      this.setData({modal: animation.export()})

      setTimeout(() => {
        this.setData({
          open_modal: false
        })
      }, 400)
    },

    del_order: function (e) {
      let id = e.currentTarget.dataset.id;
      let self = this;
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            try {
              wx.request({
                url: `${app.globalData.api.ORDER}${id}/`,
                method: 'DELETE',
                success: (res) => {
                  self.closeModal()
                  self._del_order(id)
                },
                fail: (res) => {
                  wx.showToast({
                    title: 'Server Error',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                }
              })
            } catch(err) {
              console.log('Delete Fail')
            }
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    _del_order: function (id) {
      let order_lists = this.data.order_list;
      for (let item of order_lists) {
        if (item.id == id) {
          item.status = false;
        }
      }
      this.setData({
        order_list: order_lists,
      })
      this.saveOrderList(order_lists)
      wx.showToast({
        title: 'Trashed !!!',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    },
    
    loading_data: function () {
      setTimeout(() => {
        const memberId = app.globalData.memberId
        const url = `${app.globalData.api.ORDER}?member=${memberId}&status=true&ordering=-id`
      
        try {
          wx.request({
            url: url,
            method: 'GET',
            success: (res) => {
              res = res.data
              if (res.length > 0) {
                this.setData({
                  order_list: res,
                  no_order: false
                })
                this.saveOrderList(res)
              }
            },
            fail: (res) => {
              wx.showModal({
                title: 'Error',
                content: 'Sorry, The network connection has been disconnected.',
              })
              const now_order = this.readOrderList()
              if (now_order.length > 0) {
                this.setData({
                  order_list: now_order,
                  no_order: false
                })
              }
            },
            complete: (res) => {
              setTimeout(() => {
                this.setData({
                  is_loading: false
                })
              }, 20)
            }
          })
        } catch(err) {
          console.log('Loading Order Fail')
          const now_order = this.readOrderList()
          if (now_order.length > 0) {
            this.setData({
              order_list: now_order,
              no_order: false
            })
          }
        }
      }, 200)
    },
    
    reload: function (e) {
      wx.switchTab({
        url: "/pages/Order/order",
        success: (res) => {
          wx.showToast({
            title: 'Reload Success',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      })
    }
})
