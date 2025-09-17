import userModel from '../models/userModel.js'

export const getUserData = async (req, res) => {
    const { userId } = req;
    // if(!userId){
    //     return res.json({success:false,message:"No account found. Register now"})
    // }
    try {
        const user = await userModel.findById(userId);
        if (!userId) {
            return res.json({ success: false, message: "No account found. Register now" })
        }
        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified ? true : false
            }
        })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}