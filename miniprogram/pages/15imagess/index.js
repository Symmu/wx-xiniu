// pages/15imagess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:  [],
    scrollTops: 0,  // 要滚动的高度
    tabCur: 0,  // 当前项
    rightCur: 0,  // 用于实现左边联动右边
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // //调用云函数
     var that = this
    wx.cloud.callFunction({
      name:"lookup_all",
      success(res) {
        that.setData({
          list:res.result.list
        })
        console.log("云函数获取数据成功！", res.result.list)
      },
      fail(res) {
        console.log("云函数获取数据失败！", res.result.list)
      }
    })
  },

 // 切换左边菜单并联动右边
 tabNav(e) {
  let index = e.currentTarget.dataset.index;
  console.log("点击了",index);
  this.setData({
    tabCur: index,
    rightCur: index,
    // 实现左边自动滑动到某个位置 4表示自动滑动到 第五项 （4为索引值）
    scrollTops: (index - 4) * 50
  })
},
/**
 * 滑动右边对应左边菜单切换
 * 1、拿到该元素的高度，设定它的top和bottom
 * 2、判断滑动的距离是否大于 设定的top并小于设定的bottom，然后对应左边菜单的滑动
 */
scrollLink(e) {
  let list = this.data.list
  let itemHeight = -250;
  for (let i = 0; i < list.length; i++) {
    //拿到每个元素
    let els = wx.createSelectorQuery().select("#scroll-" + i);
    els.fields({
      size: true
    }, function (res) {
      list[i].top = itemHeight;
      itemHeight += res.height;
      list[i].bottom = itemHeight
    }).exec()
  }

  this.setData({
    list
  })

  // 拿到滚动的高度
  let scrollTop = e.detail.scrollTop;
  for (let i = 0; i < list.length; i++) {
    if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
      this.setData({
        tabCur: i,
        scrollTops: (i - 4) * 50
      })
      return false
    }
  }
}
})