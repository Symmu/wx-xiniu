
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",

})
const db = cloud.database()
exports.main = async (event, context) => {
  var fileID = event.index1
  try {
    // return await db.collection('image').doc(fileID).remove()
     return await db.collection('image').where({
      //done: true
      fileID:fileID
    }).get()
  } catch(e) {
    console.error(e)
  }
}


