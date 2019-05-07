//posts.js
//获取应用实例
const app = getApp()

Page({
    data: {
        blog: {
            img: '/lib/imgs/usefull/serverError_16x9.png',
            title: 'Warning, There are no blogs to show for it',
            content: 'It could be a WeChat program error, it could be a server error, or you need to check your network connection.'
        },
        blog_url: '',
        is_ok: false,
        is_loading: true,
        loading_img: '/lib/imgs/new/loading.gif'
    },
    onLoad: function (options) {
        const id = options.id 

        let url = `${app.globalData.api.SHOW_BLOG}${id}/`
        try {
            wx.request({
                url: `${app.globalData.api.BLOG}${id}/`,
                success: (res) => {
                    this.setData({
                        blog_url: url,
                        is_ok: true
                    })
                },
                fail: (res) => {
                    console.log('无法展示该博客～')
                    setTimeout(() => {
                        this.setData({
                            is_loading: false
                        })
                    }, 1000)
                }
            })
        } catch(err) {
            console.log('Blog Fail')
        }
    },
    onReady: function() {
        console.log('good!!!')
    }
})
