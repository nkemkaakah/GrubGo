import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from 'multer'

//multer is a middleware in express js

const foodRouter = express.Router()
//using router to create methods such as get, post

//image storage engine

const storage = multer.diskStorage({
    //folder name for storing the image
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)





export default foodRouter