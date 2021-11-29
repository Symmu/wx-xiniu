const app = getApp()
Page({
  data: {
    currentDot: 0,
    banner: []
  },
  onLoad: async function () {
    console.log("onenid: ",this.openid = await getApp().getOpenid())
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('image').where({
      _openid:this.openid
    })
    .get({
      success: function(res) {
        console.log(res.data.reverse())
        that.setData({
          banner:res.data.reverse(),
         })
      }
    })
  
  },
  
  shuaxin:function(){
    this.onLoad()
  },

  ViewImage(e) {
    let index = e.currentTarget.dataset.index
    //banner为自己要展示图片的数组    
    let banner = this.data.banner
    let imgAry = []
    for(var i = 0;i<banner.length;i++){
      imgAry.push(banner[i].fileID)
    }
    console.log(imgAry);
      wx.previewImage({
        urls: imgAry,
        current: index
     })
  },


  // 设置轮播图当前所在滑块的 index
  swiperIdxHandle(e) {
    this.setData({
      currentDot: e.detail.current
    })
  },
  b_ima:function(e){
    wx.navigateTo({
      url: '../all_t/upload/upload',
    })
  },
  onShareAppMessage(){
    
  }
})