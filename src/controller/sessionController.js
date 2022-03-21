import Controller from "./controller.js";
import Joi from "joi";



const schema = Joi.object({
    SessionDate: Joi.date().required(),
    Price: Joi.number().required(),
    RoomId: Joi.string().id().required(),
    MovieId: Joi.string().id().required()
})



class SessionController extends Controller {

    constructor() {
        super("session")
    }


    async create(request, response) {

        const {
            SessionDate,
            RoomId,
            Price,
            MovieId
        } = request.body

        const mSessionDate = new Date(Date.parse(SessionDate))

        const mSchema = schema.validate({
            SessionDate: mSessionDate,
            Price,
            RoomId,
            MovieId
        })

        if (mSchema.error)
            return response.send(mSchema.error).status(400)


        request.data = {
            SessionDate: mSessionDate,
            Price,
            RoomId,
            MovieId
        }

        await super.create(request, response)
    }


    async update(request, response) {

        const {
            id
        } = request.params

        if (!id)
            response.send("Missing params {id}").status(400)


        const {
            SessionDate,
            RoomId,
            Price,
            MovieId
        } = request.body

        const mSessionDate = new Date(Date.parse(SessionDate))

        const schemaData = schema.validate({
            SessionDate: mSessionDate,
            RoomId,
            Price,
            MovieId
        })

        if (schemaData.error)
            return response.send("Format data error").status(400).json(schemaData)

        request.data = {
            SessionDate: mSessionDate,
            RoomId,
            Price,
            MovieId
        }

        await super.create(request, response)
    }


    async delete(request, response) {
        const {
            id
        } = request.params

        if (!id)
            response.send("Missing params {id}")

        await super.delete(request, response)
    }

}



export default SessionController