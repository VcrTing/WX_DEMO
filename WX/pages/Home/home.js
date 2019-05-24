
let show_tool = false
let flag = true

const serverErrorImg = '/lib/imgs/usefull/serverError.png'
const serverErrorImg_16x9 = '/lib/imgs/usefull/serverError_16x9.png'
const emptyData_16x9 = '/lib/imgs/usefull/emptyData_16x9.png'
const emptyData_3x4 = '/lib/imgs/usefull/emptyData_3x4.png'

const app = getApp()

Page({
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),

      home_slider: [ ],
      blog: [ ],
      activity_bg: `${app.globalData.media.img.home.activity}`,
      product_list: [
        {
          id: 1,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: `${app.globalData.media.img.home.product_1}`,
          status: 1
        },
        {
          id: 2,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: `${app.globalData.media.img.home.product_2}`,
          status: 1
        },
        {
          id: 3,
          name: "Product Name",
          description: "Attract as much attention as possible.",
          image: `${app.globalData.media.img.home.product_3}`,
          status: 1
        }
      ],
      about_bg: `${app.globalData.media.img.home.about_us_detail}`,
      about_img: `${app.globalData.media.img.home.about_us}`,

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
  
    onLoad: function (options) {
      
      const slider_list = []
      let url = `${app.globalData.api.HOME_SLIDER}?status=true`
      
      wx.request({
        url: url,
        success: (res) => {
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

      url = `${app.globalData.api.BLOG}?status=true&ordering=-add_time&limit=2&offset=0`
      wx.request({
        url: url,
        success: (res) => {
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
    upd_member: function(userInfo, url) {
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
            }
          },
          fail: (res) => {
          }
        })
      } catch(err) {
      }
    },
    callPhone: function(e) {
      wx.makePhoneCall({
        phoneNumber: this.data.contact_us.tel,
      })
    },

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
    scrollTop: function(e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    regionchange: function(e) {
      
    }
  })