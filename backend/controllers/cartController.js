import e from "express"
import userModel from "../models/userModel.js"


//add to cart funciton
const addToCart = async(req,res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else{
            cartData[req.body.itemId] +=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added To Cart"})
    } catch (error) {
         console.log(error)
         res.json({success:false,message:"Error"})
    }
}

//findById is equivalent to findOne({ _id: req.body.userId }).
//remove item from cart
const removeFromCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId]-=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({succes:true,message:"Removed from Cart"})
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:"Error"})
    }
}



//fetch user cart data
const getCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {getCart,removeFromCart,addToCart}

