// 몽고디비를 node에 연결
const mongoose = require("mongoose")

const connect = () => {
  mongoose
  // localhost를 빼고 127.0.0.1:27017
    .connect("mongodb://127.0.0.1:27017/spa_mall")
    .catch(err => console.log(err))
}

mongoose.connection.on("error", err => {
  console.error("몽고티비 연결 에러", err)
})

module.exports = connect