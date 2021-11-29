// pages/3imagess/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    allList:[],
    busList:[],
    bus_cenxi_list:[],
    bus_longxu_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const db = wx.cloud.database()
    var $ = db.command.aggregate
    var that = this
    wx.cloud.callFunction({
      name:'lookups',
      data:{
        collection:'bus',
        from:'bus_cenxi',
        localField:'bus_cenxi.title',
        foreignField:'bus.title',
        as:'bus_cenxi_list',
        
        from2:'bus_longxu',
        localField2:'bus_longxu.title',
        foreignField2:'bus.title',
        as2:'bus_longxu_list',
        
        count:('bus'),
        // match:{title,images},
        replaceRoot:{newRoot: $.mergeObjects([ $.arrayElemAt(['$bus_cenxi_list','$bus_longxu_list', 0]), '$$ROOT' ])},
        project:{Array:0}
      },
      success:res=>{
      // console.log("a",buslist);
      console.log("b",res.result.list)
      // console.log("c",res.result.list[1].title)
      that.setData({
        busList:res.result.list,
        bus_cenxi_list:res.result.list[0].bus_cenxi_list,
        bus_longxu_list:res.result.list[0].bus_longxu_list
      })
    }
  })

    // //调用云函数
    // wx.cloud.callFunction({
    //   name:"lookups",
    //   success(res) {
    //     console.log("云函数获取数据成功！", res)
    //     // var allList =[] 
    //     // console.log(allList);
    //   },
    //   fail(res) {
    //     console.log("云函数获取数据失败！", res)
    //   }
    // })

// var that = this
    // const db = wx.cloud.database()
    // db.collection('image').get({
    //   success: function(res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     that.setData({
    //       imageList:res.data.reverse(),
    //     })
    //     console.log(res.data)
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


  //  this.huoqu()
  },

  // huoqu:function(e){
  //   var fileID = e.currentTarget.dataset.fileID
  //   console.log(fileID);
  // },
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