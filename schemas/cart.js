// 장바구니 스키마
const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  // 장바구니에 넣을시 goodsId로 상품의 디테일한 내용을 가져온다.
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  // 수량
  quantity: {
    type: Number,
    required: true
  }
})

// "Cart"는 컬렉션 네임이다.
module.exports = mongoose.model("Cart", cartSchema)