
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        order_list: [],
        is_loading: true,
        loading_img: '/lib/imgs/new/loading.gif'
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面`  显示
     */
    onShow: function () {
      const memberId = wx.getStorageSync('memberId') || undefined
      if (memberId) {
        this.loading_data()
      } else {
        setTimeout(() => {
          this.loading_data()
        }, 1000)
      }
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    /**
     * 打开订单详情模态框
     */
    orderDetail: function (e) {

    },

    /**
     * 删除订单
     */
    del_order: function(e) {
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
    _del_order: function(id) {
      let order_lists = this.data.order_list;
      for (let item of order_lists) {
        if (item.id == id) {
          item.status = false;
        }
      }
      this.setData({
        order_list: order_lists
      })
      wx.showToast({
        title: 'Trashed !!!',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    },
    
    /**
     * 取消加载
     */
    loading_data: function() {
      setTimeout(() => {
        const memberId = wx.getStorageSync('memberId')
        const url = `${app.globalData.api.ORDER}?member=${memberId}&status=true`
      
        try {
          wx.request({
            url: url,
            method: 'GET',
            success: (res) => {
              if (res.data.length > 0) {
                this.setData({
                  order_list: res.data
                })
                console.log(this.data.order_list)
              } else {
                wx.showToast({
                  title: 'You dont have an order yet',
                  icon: 'none',
                  duration: 5000,
                  mask: true
                })
              }
            },
            fail: (res) => {
              wx.showModal({
                title: 'Error',
                content: 'Sorry, the inquiry order is wrong.',
              })
            },
            complete: (res) => {
              setTimeout(() => {
                this.setData({
                  is_loading: false
                })
              }, 618)
            }
          })
        } catch(err) {
          console.log('Loading Order Fail')
        }
      }, 1382)
    },
    /**
     * 重新加载
     */
    reload: function(e) {
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

/**
 * [
          {
            id: 1,
            title: "To see a doctor",
            content: "At 2:30, I made an appointment with Mr. Chen from the people's hospital. I hope the doctor can give me a satisfactory answer as to whether the previous illness is true or not. After two years, I will make a settlement for this lingering shadow!!!",
            pub_time: "2017-3-24",
            image: "/lib/imgs/new/order - 1.jpeg",
            status: 1
          },
          {
            id: 2,
            title: "A medical",
            content: "At 10:30, I made an appointment with Mr. Chen from the people's hospital to have a physical examination. I hope everything goes well!",
            pub_time: "2017-3-22",
            image: "/lib/imgs/new/order - 2.jpeg",
            status: 1
          },
          {
            id: 3,
            title: "Go to people's hospital, fill medicine again, do physical examination next time",
            content: "At 10:00 am, I made an appointment with Mr. Chen from the people's hospital to make up the medicine I took last time.",
            pub_time: "2017-3-16",
            image: "/lib/imgs/new/order - 3.jpeg",
            status: 1
          },
        ],
 */