//posts.js
//获取应用实例
const app = getApp()

Page({
    data: {
        id: 0,
        blog: {},
        blog_url: ''
    },
    onLoad: function (options) {
        const id = options.id 
        this.setData({
            id: id
        })
        let url = `${app.globalData.api.SHOW_BLOG}${id}/`
        
        this.setData({
            blog_url: url
        })
    },
    onReady: function() {
        console.log('good!!!')
    }
})
