import {
    Router
} from "express";
import UserController from "../controller/userController.js";

const router = Router()
const userController = new UserController()


router.post("/create", userController.create.bind(userController))
router.post("/update/:id", userController.update.bind(userController))
router.delete("/delete/:id", userController.delete.bind(userController))
router.get("/get/:id", userController.getOne.bind(userController))
router.get("/get", userController.getMany.bind(userController))


export default router