import express from "express";
import helmet from "helmet";
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors"
import router from "./router/router.js"
import logger from "./utils/logger.js";
import auth from "./utils/auth.js"

const port = process.env.PORT || 3000;
const app = express()


dotenv.config();
app.use(express.json())
app.use(cors())
app.use(auth)
app.use(morgan("dev"));
app.use(morgan("combined", {
    stream: logger.stream
}))
app.use(helmet());
app.use(router)



app.get("/", (request, response) => {
    response.send("Welcome to Tickets.com ");
})


app.listen(port, () => {
    logger.info(`Server running on ${port} -> http://localhost:${port}/`)
})