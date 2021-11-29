// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",
})
const db = cloud.database()
var $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
try {
  return await db.collection('guanggao').aggregate()
  .lookup({
    from: "bus_advertising",
    localField: "difference",
    foreignField: "difference",
    as: "bus_advertising_list"
  })
  .lookup({
    from: "outdoor_advertsing",
    localField: "difference",
    foreignField: "difference",
    as: "outdoor_advertsing_list"
  })
  .replaceRoot({//指定一个已有字段作为输出的根节点
    newRoot: $.mergeObjects([ $.arrayElemAt(['$bus_advertising_list', 0]),$.arrayElemAt(['$outdoor_advertsing_list', 0]), '$$ROOT' ]),
  })
  .sort({
    id:1,//根据id的值进行排序，1为从小到大，-1为从大到小
  })
  .project({//指定包含某个已有字段，0为舍弃 _id 字段，1为指定包含某个已有字段
    // _id:0,
    bus_advertising_list:0,
    outdoor_advertsing_list:0,
  })
  .end()
} catch (error) {
}
}

