// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",

})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    // return await db.collection('image').doc(fileID).remove()
     return await db.collection(event.collection).get()
  } catch(e) {
    console.error(e)
  }
}