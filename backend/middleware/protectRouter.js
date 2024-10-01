import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ENV_VARS } from "../config/envVars.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"]

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token " })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User Not Found" })
        }

        req.user = user

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}