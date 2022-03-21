import {
    Router
} from "express";
import MovieController from "../controller/movieController.js"

const movieController = new MovieController()
const router = Router()


router.post("/create", movieController.create.bind(movieController))
router.get("/get", movieController.getMany.bind(movieController))
router.get("/get/:id", movieController.getOne.bind(movieController))
router.post("/update/:id", movieController.update.bind(movieController))
router.delete("/delete/:id", movieController.delete.bind(movieController))


export default router