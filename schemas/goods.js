const mongoose = require("mongoose")

// 스키마: 제품등록시 어떠한 구성으로 등록을 할지에 대한 내용을 정의
const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,   // 데이타 타입을 정의
    required: true, // 필수의 유무
    unique: true    // 고유값인지 중복X 아닌지 
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  thumbnailUrl: {
    type: String, 
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
})


module.exports = mongoose.model("Goods", goodsSchema)