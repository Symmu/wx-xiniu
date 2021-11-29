// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",
})
const db = cloud.database()
var $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('user').aggregate()
  .lookup({
    from: 'image',
    localField: 'C',
    foreignField: 'aa',
    as: 'imageList',
  }) 
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$imageList', 0]), '$$ROOT' ])
  })
  .project({
    imageList: 0
  })
// .match({C:'1'})
  .end()
 
}