import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser"
import accoutRouter from "./routes/account.route"
import paymentRouter from "./routes/payment.route"


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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

app.listen(8000, () => console.log("listening at 8000"))

export default app