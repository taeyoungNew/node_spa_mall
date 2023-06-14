const express = require("express");
const router = express.Router();

// /routes/goods.js
const Goods = require("../schemas/goods")
const Cart = require("../schemas/cart")

const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
];

// 
router.get("/goods/", (req, res) => {
    const allGoods = Goods.find({})
    console.log(allGoods);
    // res.status(200).json({allGoods})
});


router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;
    let result = null;
    // for(const data in goods) {
    //     console.log(goods[data].goodsId)
    //     if(goods[data].goodsId === Number(goodsId)) {
    //         result = goods[data] 
    //     }
    // }
    result = goods.filter((good) => {
        console.log(good);
        return good.goodsId === Number(goodsId) ?  good : null
    })
    // console.log(result)
    res.status(200).json({result})
})


// 장바구니에 담는 api 
router.post("/goods/:goodsId/cart", async(req, res) => {
  const goodsId = req.params.goodsid;
  const quantity = req.body.quantity;
  // 장바구니에 담으려는 상품의 id를 받아서 현재 장바구니안에 담은 상품들의 id와 
  // 비교하여 같은 상품이 있는 경우 400에러메세지를 반환한다.
  const existsCart = await Cart.find({goodsId});
  console.log("장바구니 담기", existsCart);

  if(existsCart.length) {
    return res.status(400).json({
      success:false,
      errMsg: "이미 장바구니에 해당하는 상품이 존재합니다."
    })
  };
  // 장바구니에 존재하지 않는 상품이면 장바구니 컬렉션에 해당 장바구니에 담고싶은 상품의 id와 수량을 저장한다.
  await Cart.create({goodsId, quantity});

  res.json({result: "장바구니에 담았습니다."})
})

// 장바구니의 수량을 수정하는 api
router.put("/goods/:goodsId/cart", async(req, res) => {
  const goodsId = req.params.goodsId;
  const quantity = req.body.quantity;

  // 수정할 상품의 id가 장바구니컬렉션안에 존재할 경우
  const existsCarts = await Cart.find({goodsId})
  if(existsCarts.length) {
    // 해당 id를 가진 상품의 수량을 body로 받은 수량으로 바꿔준다.
    await Cart.updateOne(
      {goodsId: goodsId},
      {$set: {quantity: quantity}}
    )
  }
  res.status(200).json({success:true})
})


// 장바구니안에 있는 상품을 제거하기
router.delete("/goods/:goodsId/cart", async(req, res) => {
  const goodsId = req.params.goodsId;
  console.log(goodsId)
  const existsCarts = await Cart.find({goodsId})
  console.log(existsCarts)
  if(existsCarts.length) {
    await Cart.deleteOne({goodsId})
  }
  res.json({result: "success"})
})


// 상품등록
router.post("/goods/", async (req, res) => {
  // 객체구조분해할당으로 key에 맞는 변수에 클라이언트에서 온 req.body안의 데이터를 할당한다.
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  // goodsId가 데이터베이스에 존재하는지 부터 검증
  // unique값이기 때문 중복 X
  const goods = await Goods.find({goodsId});
  if(goods.length) { // 존재한다면 아래와 같은 에러메세지를 반환
    return res.status(400).json({
      success:false,
      errorMessage: "이미 존재하는 GoodsId입니다."
    })
  }
  // 중복이 없다면
  const createGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price})

  res.json({goods : createGoods})
})
module.exports =  router