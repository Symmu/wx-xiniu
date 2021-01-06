// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('image').aggregate()
  .lookup({
    from: 'wx_user',
    localField: 'fileID',
    foreignField: 'time',
    as: 'allList',
  })
.end()
}
//模糊查询
// return await db.collection('member')
//       .aggregate()
//       .lookup({
//         from: 'business',
//         localField: 'business_id',
//         foreignField: '_id',
//         as: 'list',
// }).skip(event.size).limit(event.limit).end()
// .match({
// // 查询条件
// })

// // 云函数入口函数
// exports.main = async (event, context) => {
//   // const wxContext = cloud.getWXContext()
//   return cloud.database().collection('image').aggregate()
//   .lookup({
//     from: 'user',
//     localField: 'fileID',
//     foreignField: 'name',
//     as: 'allList',
//   })
//   .end()
//   .then(res => console.log(res))
//   .catch(err => console.error(err))
// }

