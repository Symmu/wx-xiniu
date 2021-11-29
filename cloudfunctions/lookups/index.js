// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'jzs-mxoen'})
const db = cloud.database()
var $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).aggregate()
    .count(event.count)
    // .match(event.match)
    .replaceRoot(event.replaceRoot)
    .project(event.project)
    .lookup({
      from:event.from,
      localField: event.localField,
      foreignField: event.foreignField,
      as: event.as
    })
    // 三表查询
    .lookup({
      from:event.from2,
      localField: event.localField2,
      foreignField: event.foreignField2,
      as: event.as2
    })
    .end()
  } catch (e) {
    console.error(e)
  }
}