import jwt from "jsonwebtoken"
import "dotenv/config"

const authMiddleware = async (req,res,next)=>{
    const {token} = req.headers;
    if (!token){
        return res.json({success:false,message:"Not Authorized, please Login Again"})
    }
    try {
        console.log(token);
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(Error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware