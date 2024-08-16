import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




//app config
const app = express()
//defining prot number
const port = 4000

//middleware
app.use(express.json()) // for parsing app/json
app.use(cors())

//db connection
connectDB()

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//http method to request data from sever
app.get("/",(req,res)=>{
    res.send("API Working")
})

//run the express server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://nkemkaomeiza:xMjFKQdi7X9cpUTU@cluster0.skfpnnq.mongodb.net/?