import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers
    if (!token) {
       return res.json({success:false,message:"Not authorized, Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token
        req.body.userId = token_decode.id; // Adding the decoded user ID to the request body
        next(); // Passing control to the next middleware or route handler
    } catch (error) {
        console.log(error); // Logging any errors
        res.json({ success: false, message: "Error" }); // Sending an error response
    }
}

export default authMiddleware