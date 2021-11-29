// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",

})
const db = cloud.database()
const $ = db.command.aggregate
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).where({
      _id:event._id
    })
    .update({
      data: {
        key: _.inc(1)
      },
    })
  } catch(e) {
    console.error(e)
  }
}
