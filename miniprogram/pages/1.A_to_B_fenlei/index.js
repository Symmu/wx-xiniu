Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTops: 0,  // 要滚动的高度
    tabCur: 0,  // 当前项
    rightCur: 0,  // 用于实现左边联动右边
    alllist:[],   //所有表联查的数据
    // bus_list:[],  //单个表bus的数据
    // outdoor_list:[]  //单个表outdoor的数据
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask:true,
    })
    this.getAll()
  },
  onShow: function () {
    
  },
  //所有表联查的数据
  getAll:function () {
    var that = this
    wx.cloud.callFunction({
      /**查询多张表的云函数 */
      name:'lookup_all_e',
      success(res) {
        console.log("云函数获取数据成功！", res.result.list)
        // console.log("云函数获取数据成功！", res.result.list[0].bus_list)
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
        // console.log('bus_list',bus_list[0]);
        // console.log('outdoor_list',outdoor_list[0]);
        // console.log('bus_list',bus_list.filter(o=> o.length!==0));
        /**.sort(function (a, b) {return (a.id - b.id)}) 排序 */
        /**.filter(Boolean)); 将空值（undefined、null、""、0、false、NaN）进行过滤 */
        that.setData({
          // bus_list:bus_list,
          // outdoor_list:outdoor_list,
          alllist:alllist
        })
        wx.hideLoading();
      },
      fail(res) {
        console.log("云函数获取数据失败！", res.result.list)
      }
  })
  },
  //数据传递到下一个页面
  navigator:function(e){
    var that =this
    var list =this.data.alllist.flat()
    var index =JSON.stringify(e.currentTarget.dataset.item)//将对象转为字符串
    console.log('点击了list',list);
    console.log('点击了e',index);
    wx.navigateTo({//---wx.  传当前页面的数据到另外一个页面！！！
      url: "/pages/1.B_fenlei/index?index=" +encodeURIComponent(index),//这里传递的是对象
    })
  },
  // 切换左边菜单并联动右边
  tabNav(e) {
    let index = e.currentTarget.dataset.index;
    console.log("点击了",index);
    this.setData({
      tabCur: index,
      rightCur: index,
      // 实现左边自动滑动到某个位置 4表示自动滑动到 第五项 （4为索引值）
      scrollTops: (index - 4) * 50
    })
  },
  /**
   * 滑动右边对应左边菜单切换
   * 1、拿到该元素的高度，设定它的top和bottom
   * 2、判断滑动的距离是否大于 设定的top并小于设定的bottom，然后对应左边菜单的滑动
   */
  scrollLink(e) {
    let list = this.data.alllist
    let itemHeight = -250;
    for (let i = 0; i < list.length; i++) {
      //拿到每个元素
      let els = wx.createSelectorQuery().select("#scroll-" + i);
      els.fields({
        size: true
      }, function (res) {
        list[i].top = itemHeight;
        itemHeight += res.height;
        list[i].bottom = itemHeight
      }).exec()
    }
    this.setData({
      list
    })

    // 拿到滚动的高度
    let scrollTop = e.detail.scrollTop;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        this.setData({
          tabCur: i,
          scrollTops: (i - 4) * 50
        })
        return false
      }
    }
  }
})