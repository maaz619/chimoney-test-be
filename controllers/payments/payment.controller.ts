import { NextFunction, Request, Response } from "express"
import { API_KEY, CHIMONEY_API_BASE_URL } from "../../utils"

const requestPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { valueInUSD, payerEmail, redirect_url, meta } = req.body
        const response = await fetch(`${CHIMONEY_API_BASE_URL}payment/initiate`, {
            'method': "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify({
                valueInUSD,
                meta,
                payerEmail,
                redirect_url,
            })
        })
        const result = await response.json()
        if (response.status === 200 || response.ok)
            res.status(200).json({ result })
        else
            res.status(400).json({
                status: "failed",
                message: "payment initation failed",
                data: result.data,
            })
    } catch (error) {
        res.json(error)
    }
}

const sendMoneyWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subId, valueInUSD, receiverEmail, meta } = req.body
        const initSend = await fetch(`${CHIMONEY_API_BASE_URL}payment/chimoney`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify({
                subId,
                valueInUSD,
                receiverEmail,
            })
        })
        const result = await initSend.json()
    } catch (error) {

    }
}

export { requestPayment }