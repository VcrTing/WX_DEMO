//Api
const 
  BASE_URL = 'http://127.0.0.1:8000',// 'https://backend.svr.szmentor.ltd',
  API_NAME = '/api'

const API = BASE_URL + API_NAME
const MEDIA_URL = `${BASE_URL}/media/`

const APP_ID = 'wxfc13a3aac523a680'
const APP_SECRET = '2f3009540b4bec094fdc28e2a6bb9c17'

const api = {
  LOGIN: API + '/member/login/',
  MEMBER: API + '/member/',
  MEMBER_MSG: API + '/member_msg/',
  MEMBER_MSG_CREATE: API + '/member_msg/create_or_update/',
  ORDER: API + '/order/',
  ORDER_BELONG: API + '/order_belong/',
  BLOG: API + '/blog/',
  SHOW_BLOG: BASE_URL + '/web/blog/',

  OPENID: BASE_URL + '/web/wx/openId',
  HOME_SLIDER: API + '/home_slider/'
}

const img_url = MEDIA_URL + 'pageIMG'
const media = {
  img: {
    home: {
      activity: `${img_url}/activity_BG.jpg`,
      product_1: `${img_url}/product_1.jpg`,
      product_2: `${img_url}/product_2.jpg`,
      product_3: `${img_url}/product_3.jpg`,
      about_us: `${img_url}/about_us.jpg`,
      about_us_detail: `${img_url}/about_us_detail.jpg`
    },
    order: {
      add_order_page: `${img_url}/add_order_page.jpg`
    }
  }
}

// APP
App({
  onLaunch: function () {
    var self = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        try {

          wx.request({
            url: api.OPENID,
            data: {
              'code': res.code,
              'appId': APP_ID,
              'appSecret': APP_SECRET
            },
            success: (res) => {
              res = res.data.res
              const openid = res.openid

              try {

                wx.request({
                  url: api.LOGIN,
                  method: 'POST',
                  data: {
                    'username': openid,
                    'password': openid
                  },
                  success: (res) => {
                    res = res.data.res
                    self.globalData.memberId = res.id
                    const memberId = res.id

                    wx.setStorage({
                      key: 'memberId',
                      data: memberId
                    })

                    wx.getUserInfo({
                      success: (res) => {
                        const userInfo = res.userInfo
                        this.globalData.userInfo = res.userInfo
                        typeof e == "function" && e(this.globalData.userInfo)

                        let gender = '';
                        (userInfo.gender == 1) ? gender = 'male' : gender = 'female';

                        const user_data = {
                          'nickName': userInfo.nickName,
                          'avatarUrl': userInfo.avatarUrl,
                          'gender': gender,
                          'country': userInfo.country,
                          'province': userInfo.province,
                          'city': userInfo.city
                        }
                        console.log('user:', user_data)
                        wx.request({
                          url: `${api.MEMBER}${memberId}/`,
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
                      }
                    })
                  }
                })
              } catch (err) {

              }
            }
          })
        } catch (err) {
          console.log('服务器错误，服务需重启！！！')
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    memberId: null,
    token: null,
    api: api,
    media: media
  },
  save: function(name, value) {
    wx.setStorageSync(name, value)
  },
  read: function(name) {
    return wx.getStorageSync(name)
  }
})