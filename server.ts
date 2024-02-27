import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser"
import accoutRouter from "./routes/account.route"
import paymentRouter from "./routes/payment.route"
import { config } from "dotenv";
config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const base_uri = process.env.NODE_ENV === "prod" ? "https://chimoney-test-fe.vercel.app/" : "http://localhost:3000"

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', base_uri);
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Preflight request (OPTIONS) response
        return res.status(200).end();
    }

    next();
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from BE")
    console.log(req.cookies)
})

app.use('/', [accoutRouter, paymentRouter])

app.listen(process.env.PORT || 5000, () => console.log("listening at 8000"))

export default app