// import library
import express, { Router} from "express"

// import functional
import Register from "../function/register"
import Login from "../function/login"
import Game from "../function/game"
import RenewToken from "../function/renewToken"
import ManageFacebook from "../function/manageFacebook"
import Email from "../function/email"
import VerifyEmail from "../function/verifyEmail"
import UpdatePassword from "../function/updatePassword"


// import middleware
import checkAccessToken from "../middleware/check-accessToken"
import checkUser from "../middleware/check-user"
import checkRefreshToken from "../middleware/check-refreshToken"

const router:Router = express.Router()
router.post("/register",Register)
router.post("/login",Login)
router.post("/email",Email)
router.get("/email",VerifyEmail)
router.post("/password",UpdatePassword)

router.get("/user",checkAccessToken,checkUser,Game)
router.get("/renew",checkRefreshToken,RenewToken)
router.post("/facebook",ManageFacebook)

export default router
