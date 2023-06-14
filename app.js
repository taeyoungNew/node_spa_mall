const express = require('express');
const app = express()
const port = 3000

const cartsRouter = require('./routes/cart')
const goodsRouter = require('./routes/goods')
// mongodb실행
const connect = require("./schemas")
connect()


// 전역미들웨어에 req안에있는 bodyparser를 쓰겠다는 선언
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter])

app.post("/", (req, res) => {
  console.log(req.body)

  // res.send("기본 URI에 POST메소드가 정상적으로 실행되었습니다.")영
  const obj = {
    "key" : `${req.body}`,
    "name" : "민태영"
  }
  res.json(obj)
})

app.get("/", (req, res) => {
  console.log(req.query)

  res.send("정상적으로 반환되었습니다.")
})



app.get("/:id", (req, res) => {
  console.log(req.params)
  res.send(`:id ${req.params} URI에 정상적으로 반환되었습니다.`);
})


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
})


// /api를 주소창에 입력하면 routes폴더안에 있는 모듈로 가게 된다. 
// app.use("/api", goodsRouter)



app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요')
})