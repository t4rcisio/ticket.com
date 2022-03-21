import jsonwebtoken from "jsonwebtoken"
import logger from "./logger.js"
import dotenv from "dotenv"


dotenv.config()

const Login = (request, response, next) => {

    if (request.url === "/user/create" || request.url == "/user/login")
        return next()

    let data
    if (typeof sessionStorage !== undefined)
        data = request.headers[process.env.BROWSER_KEY];

    else
        data = sessionStorage.getItem(process.env.BROWSER_KEY)

    if (!data)
        return response.send("Unalthenticated").status(400)

    const [, hash] = data.split(" ")
    const browserToken = hash

    if (!browserToken)
        return response.send("Unaltorized")

    try {
        const token = jsonwebtoken.verify(browserToken, process.env.WEBTOKENSEED)
    } catch (error) {
        logger.warn(`INAUTHENTIC TOKEN : ${error}`)
        return response.send("Unaltorized").status(401)
    }


    next()
}

export default Login