import { Router } from "express";
import { getAllTransactions, getUser, getWalletBalance } from "../controllers/auth/account.controller";
import { login, logout, register } from "../controllers/auth/auth.controller";
import { protect } from "../auth.middleware";

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/getUser', getUser)
router.post('/logout', logout)
router.post('/getWallet', protect, getWalletBalance)
router.get('/getTxns', protect, getAllTransactions)

export default router