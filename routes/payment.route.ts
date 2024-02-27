import { Router } from "express";
import { requestPayment } from "../controllers/payments/payment.controller";
import { protect } from "../auth.middleware";

const router = Router()

router.post('/request', protect, requestPayment)

export default router