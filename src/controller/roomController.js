import Controller from "./controller.js";
import Joi from "joi";



const schema = Joi.object({
    Reference: Joi.string().required(),
    Capacibility: Joi.number().required(),
})


class RoomController extends Controller {

    constructor() {
        super("room")
    }

    async create(request, response) {

        const {
            Reference,
            Capacibility
        } = request.body

        if (!Reference || !Capacibility)
            response.send('Missing data')


        request.data = {
            Reference,
            Capacibility
        }

        const mSchema = schema.validate({
            Reference,
            Capacibility
        })

        if (mSchema.error)
            return response.send("Data error").json(mSchema).status(400)

        await super.create(request, response)

    }

    async update(request, response) {

        const {
            id
        } = request.params

        if (!id)
            response.send("Missing params {id}")

        const {
            Reference,
            Capacibility
        } = request.body

        if (!Reference || !Capacibility)
            response.send('Missing data')


        request.data = {
            Reference,
            Capacibility
        }

        const mSchema = schema.validate({
            Reference,
            Capacibility
        })

        if (mSchema.error)
            return response.send("Data error").json(mSchema).status(400)


        await super.update(request, response)
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


export default RoomController