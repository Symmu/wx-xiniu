// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   imgUrls: [],
   fileid :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const db = wx.cloud.database()
    // 查询当前用户所有的 upload
    
    db.collection('image').get({
      success: res => {
        that.setData({
          imgUrls: res.data,
          })
        var arr = res.data;
        let _arr = []
        for (var i = 0; i < arr.length; i++) {
          _arr.push(
            arr[i].fileID //存入文件夹的字段名 fileID
          )
        }
        that.setData({
          fileid: _arr,
          })
          console.log(that.data.fileid)
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  // 上传图片
 doUpload: function () {
  let _this = this;
  // 选择图片
  wx.chooseImage({
    const:9,//一次最多上传1张
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      wx.showLoading({
        title: '上传中',
      })
      const filePath = res.tempFilePaths[0]
      console.log(filePath )

  //给上传图片设置好存储路径
      const name = Math.random() * 1000000;
      console.log(name) 
      const cloudPath = 'image/'+name+filePath.match(/\.[^.]+?$/)[0] //存储路径名
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          let fileID = res.fileID;
          console.log('[上传文件] 成功：', fileID)
    //将成功上传的图片存入image数据库中
          const db = wx.cloud.database();
          db.collection("image").add({
            data: {
              fileID: fileID
            },
            success: function () {
              //添加成功后更新imgurls，即能够在页面中显示新添加的图片
              _this.data.imgUrls.push(fileID);
              _this.setData({imgUrls: _this.data.imgUrls
              });
              wx.showToast({
                title: '图片存储成功',
                'icon': 'none',
                duration: 3000
              }),
                console.log("255");
            },
            fail: function () {
              wx.showToast({
                title: '图片存储失败',
                'icon': 'none',
                duration: 3000
              })
            }
          });            
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },
    fail: e => {
      console.error(e)
    }
  })
},
 //点击图片预览图片
 b_ima:function(e ){
   var that = this
  //图片预览
  var current = e.target.dataset.src;
  // var imgList = [];
  //   //把图片的_id 存入imgList
  //   imgList.push(that.data.fileid);
  //   console.log(imgList)
  wx.previewImage({
    current: current,//当前点击的图片链接
    urls: that.data.fileid//图片数组
    
  })
},
onRemove: function() {
  var that = this
//调取下云函数开始
wx.cloud.callFunction({
  name: 'delPic',
  // data: { index1:fileID},
  success: res => {
    //that.onLoad()
    
  },
  fail: err => {
    console.error('[云函数] [login] 调用失败', err)
    wx.hideLoading();
    wx.navigateTo({
      url: '../index/index',
    })
  }
}) //调取函数结束

    },
  shuaxin:function(){
    this.onLoad()
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
  var that= this
  // that.onLoad()
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