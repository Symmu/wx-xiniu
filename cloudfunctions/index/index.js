
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",

})
const db = cloud.database()
exports.main = async (event, context) => {
  var index = event.index
  try {
     return await db.collection(event.collection).where({
      index:index
    }).get()
  } catch(e) {
    console.error(e)
  }
}
