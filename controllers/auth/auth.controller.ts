import { NextFunction, Request, Response } from "express"
import { API_KEY, CHIMONEY_API_BASE_URL, client } from "../../utils"

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const newSubUser = await fetch(CHIMONEY_API_BASE_URL + "sub-account/create", {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify({ name, email })

        })
        const subId = await newSubUser.json()
        if (subId.status !== "success")
            return res.status(400).json({
                code: 400,
                message: "cannot sign up before the subId creation"
            })
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    subId: subId.data.id
                }
            }
        })

        if (error) {
            res.status(error.status as number).send(error)
        }
        res.status(200).json({ doc: data })
    } catch (error) {
        next(error)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: true,
        }
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            res.status(error.status as number).json({ error })
        }
        res.cookie('jwt', data.session?.access_token, cookieOptions)
        res.status(200).json({ user: data.user, token: data.session?.access_token })
    } catch (error) {
        return next(error)
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    // const { error } = await client.auth.signOut()
    // if (error) return res.status(error.status as number).send(error.message)
    res.clearCookie("jwt")
    res.status(200).json({
        status: "success",
    });
}

export { register, login, logout }