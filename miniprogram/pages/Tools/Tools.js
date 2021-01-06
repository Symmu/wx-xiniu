
const app = getApp()

Page({
  data: {
    servers:[]
  },

  onLoad: function () {
    var listService = [
      {
        // title: '',
        items: [{
          isBind: true,
          name: '今日新闻',
          url: '../all_t/news/news',
          icon: '../../images/xw.png',
        },
        {
          isBind: true,
          name: '身体指数器',
          url: '../all_t/body/body',
          icon: '../../images/st.png',
        },
        {
          isBind: true,
          name: '备忘录',
          url: '../all_t/memo/memo',
          icon: '../../images/bwl.png',
        }
        ]
      },
      {
        items: [{
          name: '星座运势',
          url: '../all_t/constellation/constellation',
          icon: '../../images/xz.png',
        },
        {
          isBind: true,
          name: '石头剪刀布',
          url: '../all_t/S_win/S_win',
          icon: '../../images/cq.png',
        }, 
        // {
        //   isBind: true,
        //   name: '2048',
        //   url: '../all_t/2048/2048',
        //   icon: '../../images/ga.png',
        //   // code: '11'
        // },
        ]
      },
   
    ]
    this.setData({
      servers: listService
    })
  },

  /**
   * 当点击Item的时候传递过来
   */
  bindNavigator: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  },
  onShareAppMessage(){
    
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
})

