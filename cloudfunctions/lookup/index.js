// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "jzs-mxoen",
})
const db = cloud.database()
var $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('image').aggregate()
  .lookup({
    from: 'wx_user',
    localField: 'nickName',
    foreignField: 'fileID',
    as: 'ksbbList',
  })
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$ksbbList', 0]), '$$ROOT' ])
  })
  .project({
    ksbbList: 0
  })
  // .project({fileID:0})
  // .where({
  //       fileID:db.RegExp({
  //         regexp:'cloud://jzs-mxoen.6a7a-jzs-mxoen-1303182013/upload/165318.5521653082.jpg',
  //         options:'i',})
  //       })
  // .match({content: '小引资只能小发展,大引资才能大发引资才能大发展。小发展,大困难;大发展,小困难;不发展,最困难的观念。'})
  
  .end()
}
// exports.main = async (event, context) => {

//   return await db.collection('image').aggregate()
//   .lookup({
//     from: 'wx_user',
//     localField: 'fileID',
//     foreignField: 'time',
//     as: 'allList',
//   })
// .end()
// }



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

