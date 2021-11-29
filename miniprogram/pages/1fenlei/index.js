// pages/3imagess/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alllist:[],
    bus_list:[],
    outdoor_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getAll()/**获取所有联表的数据 */
  },
  
  /**获得所有联表的数据 */
  getAll:function () {
    const db = wx.cloud.database()
    var that = this
    wx.cloud.callFunction({
      /**查询多张表的云函数 */
      name:'lookup_all_e',
      success(res) {
        console.log("云函数获取数据成功！", res.result.list)
        // console.log("云函数获取数据成功！", res.result.list[0].bus_list)
        let bus=[]
        let out=[]
        let bus_list =[]
        let outdoor_list =[]
        /* 将获取到的所有数据赋值到每一个表的数组里 */
        for(var i = 0;i<res.result.list.length;i++){
          /**因为是左连接查询，数据只能对应到某字段，所以这里判断 所对应输出的数组不为空，相当于过滤空数组 */
            if((res.result.list[i].bus_list).length!==0){
              bus_list.push(res.result.list[i].bus_list)/**将获得的数据给到 bus_list */
            }
            if((res.result.list[i].outdoor_list).length!==0){
              outdoor_list.push(res.result.list[i].outdoor_list)
            }
        }
        /**将所有的表的数据记录放到统一的表里，方便操作 */
        let alllist= []
        /**上面bus_list数组的值已经放在一条记录0里面，所以可以直接bus_list[0]获取所有的记录*/
        alllist.push(bus_list[0],outdoor_list[0])
        console.log('alllist',alllist);
        console.log('bus_list',bus_list[0]);
        console.log('outdoor_list',outdoor_list[0]);
        // console.log('bus_list',bus_list.filter(o=> o.length!==0));

        /**.filter(Boolean)); 将空值（undefined、null、""、0、false、NaN）进行过滤 */
        that.setData({
          bus_list:bus_list,
          outdoor_list:outdoor_list,
          alllist:alllist
        })
      },
      fail(res) {
        console.log("云函数获取数据失败！", res.result.list)
      }
  })
  },
  /**获取侧边栏分类标题 */
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