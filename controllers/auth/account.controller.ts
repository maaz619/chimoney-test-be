import { NextFunction, Request, Response } from "express"
import { API_KEY, CHIMONEY_API_BASE_URL, client } from "../../utils"

const getWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subId } = req.body
        const response = await fetch(`${CHIMONEY_API_BASE_URL}wallets/list`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify({ subAccount: subId })
        })
        const result = await response.json()
        if (response.status === 200)
            res.status(200).json({ result })
    } catch (error) {
        res.json(error)
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data: { user } } = await client.auth.getUser(req.body.token)
        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
}

const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`${CHIMONEY_API_BASE_URL}accounts/transactions`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            }
        })
        const result = await response.json()
        if (response.status === 200)
            res.status(200).json({ result })
    } catch (error) {
        res.json(error)
    }
}

const searchAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId
        const user = await fetch(`${CHIMONEY_API_BASE_URL}accounts/transactions`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify(userId)
        })
        const result = await user.json()
        if (user.status === 200)
            res.status(200).json({ result })
    } catch (error) {
        res.json(error)
    }
}

export { getWalletBalance, getAllTransactions, getUser }