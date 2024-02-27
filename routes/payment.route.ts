import { Router } from "express";
import { requestPayment, sendMoneyWithEmail } from "../controllers/payments/payment.controller";
import { protect } from "../auth.middleware";

const router = Router()

router.post('/request', protect, requestPayment)
router.post('/sendViaEmail', protect, sendMoneyWithEmail)

export default router