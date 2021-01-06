// pages/2imagess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    //顶部轮播图
    imgUrls: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=63967211,2305810881&fm=27&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3265697507,322543478&fm=27&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=985354164,1752304932&fm=26&gp=0.jpg'
    ],
    //第二部分数据数组
    contentImgUrls:[
      {
        title:'塞尔达公主',
        url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2716688360,1326705556&fm=27&gp=0.jpg'
      },{
        title:'卓拉公主-弥法老婆',
        url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2527034280,2956682531&fm=27&gp=0.jpg'
      },{
        title:'塞尔达公主',
        url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=689739696,3300191086&fm=27&gp=0.jpg'
      },{
        title:'塞尔达公主',
        url:'http://img4.imgtn.bdimg.com/it/u=4258802685,2724420509&fm=26&gp=0.jpg'
      }
    ],
    //死三部分数据
    HotImgUrls: [
      {
        //头像地址,文字标题,文字内容,图片地址
        head:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1037527703,3129433808&fm=27&gp=0.jpg',
        title:'海拉尔平原的冒险',
        content: '海拉尔区是隶属内蒙古自治区呼伦贝尔市的一个市辖区，是呼伦贝尔市政治、经济、文化中心。该区位于内蒙古自治区东北部，区域范围为东经119°30′48〃— 120°35′36〃；北纬49°5′44〃—19°27′15〃，面积1440平方公里。',
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1532027772,1266945951&fm=27&gp=0.jpg'
      }, 
      {
        head: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1037527703,3129433808&fm=27&gp=0.jpg',
        title: '拯救塞尔达公主吧',
        content: '卓拉公主-弥法老婆',
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2404695142,3634522143&fm=27&gp=0.jpg'
      }, 
      {
        head: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1037527703,3129433808&fm=27&gp=0.jpg',
        title: '快速开地图塔',
        content: '塞尔达公主',
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2225874892,982427892&fm=26&gp=0.jpg'
      }, 
      {
        head: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1037527703,3129433808&fm=27&gp=0.jpg',
        title: '滑翔伞获得攻略',
        content: '塞尔达公主',
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216945098,3102493232&fm=26&gp=0.jpg'
      }
    ],
    indicatorDots: true, //显示面板显示点
    autoplay: false,  //自动切换
    interval: 5000,  //切换时间
    duration: 1000  //动画时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
          imageList:res.data.reverse(),
         })
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