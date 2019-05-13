//Api
const 
  BASE_URL = 'http://nodejs.up5d.com',
  API_NAME = '/api'

const API = BASE_URL + API_NAME

const APP_ID = 'wx6771d33c47ab8dc5'
const APP_SECRET = '8110a69b3c7d52ba7cd0a8484d4b41b9'

// 网络请求配置项
const api = {
  OPENID: BASE_URL + '/web/wx/openId',
  LOGIN: API + '/member/login/',
  MEMBER: API + '/member/',
  MEMBER_MSG: API + '/member_msg/',
  MEMBER_MSG_CREATE: API + '/member_msg/create_or_update/',
  ORDER: API + '/order/',
  ORDER_BELONG: API + '/order_belong/',
  BLOG: API + '/blog/',
  SHOW_BLOG: BASE_URL + '/web/blog/',
  HOME_SLIDER: API + '/home_slider/'
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
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
              const session_key = res.session_key

              try {
                // 去网页后台注册并且登陆用户，获取token，才能访问后台服务器的关键功能
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

                        // 上传用户信息
                        let gender = '';
                        (userInfo.gender == 1) ? gender='male' : gender='female';
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
              } catch(err) {

              }
            } 
          })
        } catch(err) {
          console.log('服务器错误，服务需重启！！！')
        }
      }
    })
    // onLaunch
  },
  globalData: {
    userInfo: null,
    memberId: null,
    token: null,
    api: api
  }
})

// 笔记

/* 本地存储的用法
wx.setStorage({
  key: 'openid',
  data: openid,
})
*/

/* 获取用户信息
wx.getSetting({
  success: res => {
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    }
  }
})

// 获取用户数据
userInfo: function(e) {
  wx.login({
    success: (e) => {
      wx.getUserInfo({
        success: (res) => {
          this.globalData.userInfo = res.userInfo
          typeof e == "function" && e(this.globalData.userInfo)
          console.log('UserInfo', this.globalData.userInfo)
        }
      })
    }
  })
},

// 获取手机信息
systemInfo: (e) => {
  wx.getSystemInfo({
    success: function (res) {
      console.log(res.model)    //  手机型号
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
      console.log(res.system) //  操作系统版本
    }
  })
},

*/
