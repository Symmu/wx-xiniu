// pages/3imagess/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    allList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('image').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          imageList:res.data.reverse(),
        })
        console.log(res.data)
      }
    })
    //调用云函数
    // wx.cloud.callFunction({
    //   name:"lookup",
    //   success(res) {
    //     console.log("云函数获取数据成功！", res)
    //   },
    //   fail(res) {
    //     console.log("云函数获取数据失败！", res)
    //   }
    // })



    // const db = wx.cloud.database()
    // db.collection('image').aggregate()
    //   .lookup({
    //     from: 'user',
    //     localField: 'fileID',
    //     foreignField: 'name',
    //     as: 'alllist',
    //   })
    //   .end()
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err))


   this.huoqu()
  },

  huoqu:function(e){
    var fileID = e.currentTarget.dataset.fileID
    console.log(fileID);
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