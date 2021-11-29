// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",
})
const db = cloud.database()
const $ = db.command.aggregate
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('guanggao').aggregate()
  .lookup({
    from: "bus_advertising",
    localField: "type",
    foreignField: "type",
    as: "bus_list"
  })
  .lookup({
    from: "outdoor_advertsing",
    localField: "type",
    foreignField: "type",
    as: "outdoor_list"
  })
  .replaceRoot({//指定一个已有字段作为输出的根节点
    newRoot: $.mergeObjects([ $.arrayElemAt(['$bus_list', 0]),$.arrayElemAt(['$outdoor_list', 0]), '$$ROOT' ]),
  })
  .project({//指定包含某个已有字段，0为舍弃 _id 字段，1为指定包含某个已有字段
    // _id:0,
    bus_list:1,
    outdoor_list:1,
  })
  .sort({
    id:1,//根据id的值进行排序，1为从小到大，-1为从大到小
  })
  // .match({
  //   bus_list:_.size(1),
  //   outdoor_list:_.size(1)
  // })
  .end()
  .then(res => res)
  .catch(err => res)
}

