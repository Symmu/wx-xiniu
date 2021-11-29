// pages/9imagess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime:0,   //点击开始时间
    endTime:0,　 //点击结束时间
    isShow:false,
  },

    //手指触摸开始赋值
    touchStart: function (e) {
　　    this.startTime = e.timeStamp;
        console.log('开始触摸');
　　},
　　//手指触摸结束赋值
　　touchEnd: function (e) {
　　　　this.endTime = e.timeStamp;
      console.log('手指触摸结束');
      this.setData({
        isShow:false
      })
　　},
　　// nophonefull 不管点击还是长按都会触发的事件
　　nophonefull: function () {
　　　　//通过判断手指触摸时间来判断是否是点击事件，当时间差小于350时，为点击事件
　　　　if (this.endTime - this.startTime < 350) {
　　　　　　//这里可以做点击事件的处理啦
          console.log('是点击事件');
　　　　}
　　},
　　//只有长按事件才会触发　
　　bingLongTap : function(e){
　　　　//这里可以做长按事件要处理的
      console.log('长按事件');
        this.setData({
          isShow:true
        })
　　},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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