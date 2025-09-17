import jwt from 'jsonwebtoken'

//user Authentication middleWare
const authUser=async (req,res,next) => {
    try {
        const {token}=req.headers
        if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    console.log("token_decode",token_decode)
    req.userId=token_decode.id
    next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}




export default authUser