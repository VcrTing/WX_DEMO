const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    username: '',
    password: '',
    user: {}
  },
  form_username(e) {
    this.setData({
      username: e.detail.value
    })
  },
  form_password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  register(e) {
    const username = this.data.username
    const password = this.data.password
    wx.request({
      url: 'http://127.0.0.1:8000/api/member/register/',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: (res) => {
        console.log('register res:', res)
      }
    })
  },
  login(e) {
    console.log(this.password)
    const username = this.data.username
    const password = this.data.password
    wx.request({
      url: 'http://127.0.0.1:8000/api/member/login/',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: (res) => {
        console.log('register res:', res)
      }
    })
  },
  all_user(e) {
    wx.request({
      url: 'http://127.0.0.1:8000/api/member/',
      method: 'GET',
      data: {
        
      },
      success: (res) => {
        console.log('register res:', res)
      }
    })
  }
})
