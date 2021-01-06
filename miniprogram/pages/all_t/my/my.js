

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  fuzhi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var fileID = options.fileID
   // console.log(fileID)
    const db = wx.cloud.database()
    db.collection('image').where({
      fileID:fileID
    }).get({
      success: function(res) {
        that.setData({
          fuzhi:res.data
        })
        // res.data 包含该记录的数据
        console.log(res.data)
      }
    })
  },
  onRemove: function(e) {
    var fd = e.currentTarget.dataset.fd
    var that = this
  //调取下云函数开始
  wx.cloud.callFunction({
    name: 'delPic',
     data: { index1:fd},
    success: res => {
      wx.showToast({
        title: '删除成功',
        duration: 2000,
        mask: true,
        success: (res) => {
          console.log(" 删除成功")   
        },
        fail: (res) => {
          console.log(" 删除失败！！")
          wx.showToast({
            title: '删除失败',
            duration: 2000,
            mask: true,
          })
        },
        complete: (res) => {},
      })
     // that.onLoad()
},
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      wx.hideLoading();
    }
  }) //调取函数结束
  wx.navigateBack({
    url: '../../person/person',
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