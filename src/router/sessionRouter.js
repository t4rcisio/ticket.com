import {
    Router
} from "express";
import SessionController from "../controller/sessionController.js";


const router = Router()
const sessionController = new SessionController()


router.post("/create", sessionController.create.bind(sessionController))
router.get("/get", sessionController.getMany.bind(sessionController))
router.post("/update/:id", sessionController.update.bind(sessionController))
router.delete("/delete/:id", sessionController.delete.bind(sessionController))
router.get("/get/:id", sessionController.getOne.bind(sessionController))


export default router