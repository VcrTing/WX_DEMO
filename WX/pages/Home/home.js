
let show_tool = false
let flag = true
const serverErrorImg = '/lib/imgs/usefull/serverError.png'
const serverErrorImg_16x9 = '/lib/imgs/usefull/serverError_16x9.png'
const emptyData_16x9 = '/lib/imgs/usefull/emptyData_16x9.png'
const emptyData_3x4 = '/lib/imgs/usefull/emptyData_3x4.png'

//获取应用实例
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),

      home_slider: [ ],
      blog: [ ],
      service_bg: "/lib/imgs/new/service - bg.png",
      product_list: [
        {
          id: 1,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: "/lib/imgs/new/product - 1.png",
          status: 1
        },
        {
          id: 2,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: "/lib/imgs/new/product - 2.png",
          status: 1
        },
        {
          id: 3,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: "/lib/imgs/new/product - 3.png",
          status: 1
        }
      ],
      about_bg: '/lib/imgs/new/about - bg.png',
      about_img: '/lib/imgs/new/about - img.png',

      point_top: "top",
      point_show: "block",

      markers: [{
        iconPath: '/lib/icons/map icon.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],

      contact_us: {
        tel: '0796-45536',
        latitude: 23.099994,
        longitude: 113.324520
      }
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
      // 首页轮播图
      const slider_list = []
      let url = `${app.globalData.api.HOME_SLIDER}?status=true`
      
      wx.request({
        url: url,
        success: (res) => {
          const code = res.statusCode
          const data = res.data
          if (data.length >= 1) {
            for (const i in data) {
              slider_list.push(data[i].img)
            }
          } else {
            slider_list.push(emptyData_16x9)
          }
          this.setData({
            home_slider: slider_list
          })
        },
        fail: (res) => {
          this.setData({
            home_slider: [serverErrorImg]
          })
        }
      })

      // 博客
      url = `${app.globalData.api.BLOG}?status=true&ordering=-add_time&limit=2&offset=0`
      
      wx.request({
        url: url,
        success: (res) => {
          const code = res.statusCode
          const data = res.data.results
          if (data.length >= 1) {
            this.setData({
              blog: data
            })
          } else {
            this.setData({
              blog: [
                {}, {}
              ]
            })
          }
        },
        fail: (res) => {
          const data = [
            {
              id: 0,
              title: '',
              img: serverErrorImg_16x9
            },
            {
              id: 0,
              title: '',
              img: serverErrorImg_16x9
            }
          ]
          this.setData({
            blog: data
          })
        }
      })
      // onLoad
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      const memberId = app.globalData.memberId
      const userInfo = app.globalData.userInfo
      const url = `${app.globalData.api.MEMBER}${memberId}/`
      let gender = '';
      (userInfo.gender == 1) ? gender='male' : gender='female';

      try {
        wx.request({
          url: url,
          method: 'PUT',
          data: {
            'nickName': userInfo.nickName,
            'avatarUrl': userInfo.avatarUrl,
            'gender': gender,
            'country': userInfo.country,
            'province': userInfo.province,
            'city': userInfo.city
          },
          success: (res) => {
            const code = res.statusCode
            if (code != 200) {
              console.log('用户信息更新失败！！！')
            }
          },
          fail: (res) => {
            console.log('服务器错误，本次用户信息更新失败！！！')
          }
        })
      } catch(err) {
        console.log('服务器错误，本次用户信息存储失败！！！')
      }
    },
  
    /**
     * 生命周期函数--监听页面`  显示
     */
    onShow: function () {

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
     * 退出登录
     */
    logOut: function () {
  
    },

    /**
     * 打电话
     */
    callPhone: function(e) {
      wx.makePhoneCall({
        phoneNumber: this.data.contact_us.tel,
      })
    },

    /**
     * 去博客界面
     */
    goActivity: function(e) {
      const id = e.currentTarget.dataset.id;
      if (id) {
        const url = `/pages/Posts/posts?id=${id}`
        wx.navigateTo({
          url: url
        })
      } else {
        wx.showToast({
          title: 'Warning, There are no blogs to show for it',
          icon: 'none',
          duration: 3000,
          mask: true
        })
      }
    },

    /**
     * 锚点
     */
    scrollTop: function(e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    /*
    scrollTop: function(e) {
      let target = e.currentTarget.dataset.opt;
      this.setData({
        point_top: target
      });
      this.setData({
        point_show: "none"
      });
      flag = true;
    },
    scorllListen: function(e) {
      if ((flag) && (e.detail.scrollTop > 296)) {
        this.setData({
          point_show: "block"
        });
        flag = false;
      }
    }
    */
    on_userInfo: function(e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.userInfo)
      console.log(e.detail.rawData)
    },
    /**
     * 地图
     */
    regionchange: function(e) {
      
    }
  })