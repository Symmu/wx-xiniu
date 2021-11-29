// pages/11imagess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems:[
      // {
      //   id:1,
      //   difference:'洗护',
      //   children: [
      //     { 
      //       child_id: 1, 
      //       name: '洁面皂', 
      //       image: "../../images/close.png" 
      //     }, 
      //     { 
      //       child_id: 2, 
      //       name: '卸妆', 
      //       image: "../../images/close.png"  
      //     }
      //   ]
      // },
      // {
      //   id:2,
      //   difference:'生鲜'
      // },
      // {
      //   id:3,
      //   difference:'食品'
      // },
      // {
      //   id: 4,
      //   difference: '女装'
      // },
      // {
      //   id: 5,
      //   difference: '百货'
      // },
      // {
      //   id: 6,
      //   difference: '母婴'
      // },
      // {
      //   id: 7,
      //   difference: '手机'
      // },
      // {
      //   id: 8,
      //   difference: '鞋靴'
      // },
      // {
      //   id: 9,
      //   difference: '运动'
      // },
      // {
      //   id: 10,
      //   difference: '美家'
      // },
      // {
      //   id: 11,
      //   difference: '男装'
      // },
      // {
      //   id: 12,
      //   difference: '水果'
      // },
      // {
      //   id: 13,
      //   difference: '电子'
      // }
    ],
    curNav:1,
    curIndex:0
  },
 
  switchRightTab:function(e){
    let id = e.target.dataset.id,index=e.target.dataset.index;
    this.setData({
      curNav:id,
      curIndex:index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('bus_advertising').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          cateItems:res.data.reverse(),
        })
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})