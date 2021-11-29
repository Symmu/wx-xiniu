// pages/1.1.1fenlei/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    // console.log(JSON.parse(decodeURIComponent(options.index)));
    // let object=JSON.parse(decodeURIComponent(options.index));//将上个页面传过来的字符串解析成对象
    // that.setData({index:object});
    this.panduan()
  },
  //获取上个页面的数据，并对表的type进行判断
  panduan:function(options){
    //获取上个页面的数据
    var that = this
    console.log(JSON.parse(decodeURIComponent(that.options.index)));
    let object=JSON.parse(decodeURIComponent(that.options.index));//将上个页面传过来的字符串解析成对象
    this.setData ({index:object})
    //判断上一个页面传过来的数据type，并对点击的页面添加自增1
    switch (object.type) {
      case '公交车广告':
        wx.cloud.callFunction({
          name:'update',
          data:{
            collection:'bus_advertising',
            _id:object._id,
          },
          success: res => {
            console.log('公交车广告\n状态码：',res.result.stats.updated,'\n自增量：',object.key+1)
          },
          fail: err => {
            console.log(err)
          }
        })
        break;
      case '户外广告':
        wx.cloud.callFunction({
          name:'update',
          data:{
            collection:'outdoor_advertsing',
            _id:object._id
          },
          success: res => {
            console.log('户外广告\n状态码：',res.result.stats.updated,'\n自增量：',object.key+1)
          },
          fail: err => {
            console.log(err)
          }
        })
        break;
      default:
        break;
    }
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