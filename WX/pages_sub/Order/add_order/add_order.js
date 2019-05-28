
const app = getApp()

Page({

  data: {

    index: 0,
    array: ['Product 01', 'Product 02', 'Product 03'],

    now_date: '2019-5-7',
    now_time: '09:23',

    form_date: '2019-5-7',
    form_time: '09:23',
    form_mark: '',
    form_name: '',
    form_emial: '',
    form_gender: 'female',
    form_service: 'Product 01',
    submit_flage: false,

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
    },

    page_bg: `${app.globalData.media.img.order.add_order_page}`
  },
  formName(e) {
    this.setData({
      form_name: e.detail.value
    })
  },
  formEmail(e) {
    this.setData({
      form_email: e.detail.value
    })
  },
  formGender(e) {
    this.setData({
      form_gender: e.detail.value
    })
  },
  formService(e) {
    this.setData({
      index: e.detail.value,
      form_service: this.data.array[e.detail.value]
    })
  },
  formDate(e) {
    this.setData({
      now_date: e.detail.value,
      start_date: e.detail.value,
      form_date: e.detail.value
    })
  },
  formTime(e) {
    this.setData({
      now_time: e.detail.value,
      start_time: e.detail.value,
      form_time: e.detail.value
    })
  },
  formMark(e) {
    this.setData({
      form_mark: e.detail.value
    })
  },
  submit(e) {
    const is_name = this._valide_name(this)
    const is_email = this._valide_email(this)
    const is_mark = this._valide_mark(this)
    if (is_name != true) {
      wx.showModal({
        title: 'Warning of Name',
        content: is_name
      })
      return
    }
    if (is_email != true) {
      wx.showModal({
        title: 'Warning of Email',
        content: is_email
      })
      return
    }
    if (is_mark != true) {
      wx.showModal({
        title: 'Warning of Mark',
        content: is_mark
      })
      return
    }
    this.setData({
      submit_flage: true
    })
    this.go_submit(this)
  },

  go_submit(self) {
    const order_data = {
      'order_date': self.data.form_date,
      'order_time': self.data.form_time,
      'order_content': self.data.form_mark,
      'order_title': self.data.form_service,
      'member': app.globalData.memberId
    }
    const member_data = {
      'name': self.data.form_name,
      'email': self.data.form_email,
      'gender': self.data.form_gender,
      'member': app.globalData.memberId
    }
    if (self.data.submit_flage) {
      try {
        wx.request({
          url: app.globalData.api.ORDER,
          method: 'POST',
          data: order_data,
          success: (res) => {
            const status = res.data.status
            const order = res.data

            wx.request({
              url: app.globalData.api.MEMBER_MSG_CREATE,
              method: 'POST',
              data: member_data,
              success: (res) => {
                const status = res.data.status
                const member_msg = res.data.res
                const order_belong_data = {
                  'member_msg': member_msg.id,
                  'order': order.id,
                  'member': app.globalData.memberId
                }

                wx.request({
                  url: app.globalData.api.ORDER_BELONG,
                  method: 'POST',
                  data: order_belong_data,
                  success: (res) => {
                    wx.redirectTo({
                      url: `/pages_sub/Order/add_success/add_success?order_number=${order.order_number}`,
                    })
                  }
                })
              }
            })
          },
          fail: (res) => {
            wx.showModal({
              title: 'Error',
              content: 'Sorry, server error and unable to log this order.'
            })
          }
        })
      } catch(err) {
        console.log('Submit Order Fail')
      }
    }
  },

  _valide_name(self) {
    const name = self.data.form_name
    if (!name | name == undefined) {
      return 'The name is between 2 characters and 60 characters.'
    } else {
      const len = name.length
      const char = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/;
      if (len< 2) {
        return 'The name length must be greater than 2.'
      } else if (len> 60) {
        return 'The name length must be less than 60.'
      } 
      if (!isNaN(name)) {
        return 'The name should not contain Numbers.'
      }
      if (char.test(name)) {
        return 'Names should not contain special characters.'
      }
    }
    return true
  },
  _valide_email() {
    const email = this.data.form_email;
    const char = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!char.test(email)) {
      return 'The email address you entered is not in the correct format.'
    }
    return true
  },
  _valide_mark() {
    const mark = this.data.form_mark
    if (!mark | mark == undefined) {
      return 'You should write down some Mark.'
    } else {
      const len = mark.length
      if (len< 8) {
        return 'The Mark length must be greater than 8.'
      } else if (len> 240) {
        return 'The Mark length must be less than 240.'
      } 
    }
    return true
  },

  regionchange(e) {
    console.log(e.type)
  },

  callPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.contact_us.tel,
    })
  },

})