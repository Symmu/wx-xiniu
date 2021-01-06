
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    _userInfo: [],//这是一个空的数组，等下获取到云数据库的数据将存放在其中
    isLogin:false,
    disabled:true,
  },
  onLoad: function() {
  
  },
  bindGetUserInfo(e){
    let userInfo = e.detail.userInfo;
    if(!this.data.isLogin && userInfo) {
      db.collection('wx_user').add({
        data : {
          userPhoto:userInfo.avatarUrl,
          nickName: userInfo.nickName,
          country:userInfo.country,
          city:userInfo.city,
          time : new Date()
        }
      }).then((res)=>{
        db.collection('wx_user').doc(res._openid).get().then((res)=>{
          // 设置为全局可用
          app.userInfo = Object.assign( app.userInfo , res.data[0]);
        })
        // console.log(userInfo);
        
      })
      this.setData({
        userPhoto : userInfo.avatarUrl,
        nickName : userInfo.nickName,
        country : userInfo.country,
        city : userInfo.city,
        isLogin : true
      })
    }
  },

  onReady: function () {
    wx.cloud.callFunction({
      name : 'login',
      data : {}
    }).then((res)=>{
      db.collection('wx_user').where({
        _openid : res.result.openid
      }).get().then((res)=>{
        if(res.data.length){
          app.userInfo = Object.assign( app.userInfo , res.data[0]);
          // console.log(app.userInfo); 
          this.setData({
            userPhoto : app.userInfo.userPhoto,
            nickName : app.userInfo.nickName,
            country : app.userInfo.country,
            city : app.userInfo.city,
            isLogin : true
          });
        }else{
          this.setData({
            disabled:false
          })
        }
      })
    })
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  onLoad: async function () {
    console.log("onenid: ",this.openid = await getApp().getOpenid())
  },

  onFind:function(){
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
        _userInfo:res.data.reverse(),
       })
    }
  })


  //调取下云函数开始
  // wx.cloud.callFunction({
  //   name: 'find',
  //   // data: { index1:fileID},
  //   success: res => {
  //     that.setData({
  //       _userInfo:res.result.data.reverse(),
  //     })
  //   },
  //   fail: err => {
  //     console.error('[云函数] [login] 调用失败', err)
  //     wx.showToast({
  //       title: '获取失败',
  //       duration: 2000,
  //       mask: true,
  //     })
  //     wx.hideLoading();
  //     wx.navigateTo({
  //       url: '../person/person',
  //     })
  //   }
  // }) //调取函数结束

},

  
  // if(disabled2==ture){
  //   this.setData({
  //     disabled2:false
  //   })
  // }else{
  //   this.setData({
  //     disabled2:true
  //   })
  // }

})