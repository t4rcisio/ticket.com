import {
    Router
} from "express";

import userRouter from "./userRouter.js"
import movieRouter from "./movieRouter.js"
import roomRouter from "./roomRouter.js";
import sessionRouter from "./sessionRouter.js"
const router = Router()

router.use("/user", userRouter)
router.use("/movie", movieRouter)
router.use("/room", roomRouter)
router.use("/session", sessionRouter)
export default router