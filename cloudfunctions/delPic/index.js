
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
    }).remove()
  } catch(e) {
    console.error(e)
  }
}



// const cloud = require('wx-server-sdk')
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
// const db = cloud.database()
// exports.main = async(event, context) => {
//   let {
//     type,
//     fileID
//   } = event
//   try {
//     if (type == 'all') {
//       const _ = db.command
//       return await db.collection('image').where({
//         fileID: _.exists(true) //只要字段存在，就删除
//       }).remove()
//     } else {
//       return await db.collection('image').where({
//         fileID: fileID
//       }).remove()
//     }

//   } catch (e) {
//     console.error(e)
//   }
// }