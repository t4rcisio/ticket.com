import {
    Router
} from "express";
import RoomController from "../controller/roomController.js";

const router = Router()
const roomControlle = new RoomController()


router.post("/create", roomControlle.create.bind(roomControlle))
router.get("/get", roomControlle.getMany.bind(roomControlle))
router.post("/update/:id", roomControlle.update.bind(roomControlle))
router.delete("/delete/:id", roomControlle.delete.bind(roomControlle))
router.get("/get/:id", roomControlle.getOne.bind(roomControlle))


export default router