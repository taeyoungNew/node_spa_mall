const express = require("express")
const router = express.Router()
const Cart = require("../schemas/cart")   // Cart schema가져오기
const Goods = require("../schemas/goods") // Goods schema 가져오기

// localhost:3000/api/carts GET method
router.get("/cart", async(req, res) => {
  // Cart안에 있는 모든 데이터를 가져온다.
  const carts = await Cart.find({})

  // 장바구니 안에 있는 모든 상품의 id값을 찾는다.
  const goodsId = carts.map((cart) => {
    return cart.goodsId;
  })

  // 데이터베이스에 저장된 전체상품의 목록중 장바구니안에 있는 id값과 동인한 상품의 정보들을 가져온다.
  const goods = await Goods.find({goodsId: goodsId})
  // Goods에 해당하는 모든 정보를 가지고 올건데
  // 만약 goodsIds변수안에 존재하는 값일 때만 조회하라

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId)
    }
  })

  res.json({"carts": results})
})  

module.exports = router