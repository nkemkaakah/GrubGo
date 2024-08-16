import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://nkemkaomeiza:xMjFKQdi7X9cpUTU@cluster0.skfpnnq.mongodb.net/food-del').then(()=>console.log("DB Connected"))

}