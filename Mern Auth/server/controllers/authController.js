import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' })
    }
    try {

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name, email, password: hashedPassword
        })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 3600 * 1000
        })
        // sending welcome email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "I will hack all your information",
            text: `welcom here. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOption)

        return res.json({ success: true })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

export const logIn = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "both Email and Password are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "Email is not true" });

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) return res.json({ success: false, message: "invalid Password" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 3600 * 1000
        })
        return res.json({ success: true })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }

}

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({ success: true, message: "Logged Out" })
    }
    catch (err) {
        return res.json({
            success: false, message: err.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const  userId  = req.userId;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 3600 * 1000

        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Welcome to my project. Your verification otp is ${otp} this otp will be expired at ${new Date(user.verifyOtpExpireAt).toLocaleString()}`
        }
        await transporter.sendMail(mailOptions);

    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }

    return res.json({ success: true, message: "OTP sent to email" });

}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId=req.userId;
    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (await user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = ''
        user.verifyOtpExpireAt = 0

        await user.save();
        return res.json({ success: true, message: 'Emial verifyed successfully' });
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}


export const isAuthenticated = async (req, res) => {
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({success:false,message:"No token found"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        return res.json({success:true,message:"Authenticated",userId:decode.id})
    } catch (err) {
        
    }
}


export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) res.json({ success: false, message: "Please enter your email" });
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.json({ success: false, message: "User not found" });

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpiredAt = (Date.now() + 15 * 60 * 1000);
        user.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `Reset otp`,
            text: `Your OTP is ${otp}. Use this OTP to proceed with resetting your password`
        }
        await transporter.sendMail(mailOption)

        return res.json({ success: true, message: "Otp send to your email" })
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

// Reset User Password

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Please enter all" });
    }
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        if(!user.resetOtp === '' || user.resetOtp!==otp){
            return res.json({success:false, message:"Your OTP is incorrect"})
        }
        if(user.resetOtpExpiredAt<Date.now()){
            return res.json({success:false,message:"OTP Expired"})
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword
        user.resetOtp='';
        user.resetOtpExpiredAt=0;

        await user.save()
        return res.json({success:true,message:"Password has been reset successfully"})
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}