//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    toView: 'a1',
    activeId: 'a1',
    category: [],
    // content: [
    //   {
    //     difference: '- 新品 -', 
    //     options: [
    //       { src: '../../images/xw.png',id: '001',text: 'redmi8'},
    //       { src: '../../images/xw.png', id: '002', text: 'redmi8A' },
    //       { src: '../../images/xw.png', id: '003', text: '小米9pro 5G'},
    //       { src: '../../images/xw.png', id: '004', text: 'redmi8'},
    //       { src: '../../images/xw.png', id: '005',text: 'redmi8' }
    //     ],
    //     id: 'a1'
    //   },
      // {
      //   difference: '- 众筹 -',
      //   options: [
      //     { src: '../../images/close.png', id: '006', text: 'redmi8' },
      //     { src: '../../images/close.png', id: '007' ,text: 'redmi8'},
      //     { src: '../../images/close.png', id: '008', text: 'redmi8' },
      //     { src: '../../images/close.png', id: '009',text: 'redmi8' }
      //   ],
      //   id: 'a2'
      // },
      // {
      //   difference: '- 小米手机 -',
      //   options: [
      //     { src: '../../images/cq.png', id: '006', text: 'redmi8' },
      //     { src: '../../images/cq.png', id: '007', text: 'redmi8' },
      //     { src: '../../images/cq.png', id: '008', text: 'redmi8' },
      //     { src: '../../images/cq.png', id: '009', text: 'redmi8' }
      //   ],
      //    id: 'a3'
      // },
      // {
      //   difference: '- redmi手机 -',
      //   options: [
      //     { src: '../../images/background.png', id: '006', text: 'redmi8' },
      //     { src: '../../images/background.png', id: '007', text: 'redmi8' },
      //     { src: '../../images/background.png', id: '008', text: 'redmi8' },
      //     { src: '../../images/background.png', id: '009', text: 'redmi8' }
      //   ],
      //   id: 'a4'
      // }

    // ],
  },
  //事件处理函数
  onLoad: function () {
    var that = this
    const db = wx.cloud.database()
    db.collection('bus_advertising').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          category:res.data.reverse(),
        })
        console.log(res.data)
      }
    })

    this.setData({
      toView: 'a1',
      heightArr: []
    })
    let query = wx.createSelectorQuery();
    query.selectAll('.catefory-main').boundingClientRect((rect)=> {
      rect.forEach(ele => {
        this.calculateHeight(ele.height);
      })
    }).exec();
  },
  clickItem(e) {
    this.setData({
      activeId: e.currentTarget.dataset.id,
      toView: e.currentTarget.dataset.id
    })
  },
  // scroll(e) {
  //   let scrollHeight = e.detail.scrollTop;
  //   let index = this.calculateIndex(this.data.heightArr,scrollHeight);
  //   this.setData({
  //     activeId: 'a'+index
  //   })

  // },
  // 计算滚动的区间
  // calculateHeight(height) {
  //   if(!this.data.heightArr.length) {
  //     this.data.heightArr.push(height)
  //   }else {
  //     this.data.heightArr.forEach(ele => {
  //       height += ele
  //     })
  //     this.data.heightArr.push(height);
  //   }
  // },
  // 计算左边选中的下标
  // calculateIndex(arr, scrollHeight) {
  //   let index= '';
  //   for(let i =0;i<arr.length;i++) {
  //     if (scrollHeight >= 0 && scrollHeight < arr[0]){
  //       index = 0;
  //     }else if(scrollHeight >= arr[i-1] && scrollHeight < arr[i]){
  //       index = i;
  //     }
  //   }
  //   return index+1;
  // }
})