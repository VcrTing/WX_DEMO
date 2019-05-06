//Api
const 
  BASE_URL = 'http://127.0.0.1:8000',// 'http://nodejs.up5d.com',
  API_NAME = '/api'

const API = BASE_URL + API_NAME

// 网络请求配置项
const api = {
  OPENID: BASE_URL + '/web/wx/openId',
  LOGIN: API + '/member/login/',
  ORDER: API + '/order/',
  ORDER_BELONG: API + '/order_belong/',
  MEMBER_MSG: API + '/member_msg/',
  MEMBER_MSG_CREATE: API + '/member_msg/create_or_update/',
  HOME_SLIDER: API + '/home_slider/',
  BLOG: API + '/blog/',
  SHOW_BLOG: BASE_URL + '/web/blog/'
}

// APP
App({
  onLaunch: function () {
    const self = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.userInfo()

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: api.OPENID,
          data: {
            'code': res.code
          },
          success: (res) => {
            const status = res.data.status
            res = res.data.res
            const openid = res.openid
            const session_key = res.session_key
            
            if (status) {
              // 去网页后台注册并且登陆用户，获取token，才能访问后台服务器的关键功能
              wx.request({
                url: api.LOGIN,
                method: 'POST',
                data: {
                  username: openid,
                  password: openid
                },
                success: (res) => {
                  const status = res.data.status
                  const is_new = res.data.is_new
                  res = res.data.res
                  self.globalData.memberId = res.id
                }
              })
            }
          } 
        })
      }
    })
    this.systemInfo()
  },
  /**
   * 获取用户数据
   */
  userInfo: function(e) {
    wx.login({
      success: (e) => {
        wx.getUserInfo({
          success: (res) => {
            this.globalData.userInfo = res.userInfo
            typeof e == "function" && e(this.globalData.userInfo)
            // console.log('UserInfo', this.globalData.userInfo)
          }
        })
      }
    })
  },
  systemInfo: (e) => {
    wx.getSystemInfo({
      success: function (res) {
        /*
        console.log(res.model)    //  手机型号
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        console.log(res.system) //  操作系统版本
        */
      }
    })
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
*/