
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
      this.loading_data()
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
            wx.request({
              url: `${app.globalData.api.ORDER}${id}/`,
              method: 'DELETE',
              success: (res) => {
                self._del_order(id)
              }
            })
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
        const memberId = app.globalData.memberId
        const url = `${app.globalData.api.ORDER}?member=${memberId}&status=true`
        wx.request({
          url: url,
          method: 'GET',
          success: (res) => {
            if (res.data) {
              this.setData({
                order_list: res.data
              })
            }
          },
          complete: (res) => {
            setTimeout(() => {
              this.setData({
                is_loading: false
              })
            }, 618)
          }
        })
      }, 1382)
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