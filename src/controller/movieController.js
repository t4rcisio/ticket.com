import Controller from "./controller.js";
import Joi from "joi";


const schema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().max(5000).required(),
    Duration: Joi.number().required(),
    Language: Joi.string(),
    Subtitles: Joi.string(),
    Age_rating: Joi.string(),
})


class MovieController extends Controller {


    constructor() {
        super("movie")
    }

    async create(request, response) {

        const {
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        } = request.body

        const mSchema = schema.validate({
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        })

        if (mSchema.error)
            return response.send(mSchema.error).status(400)

        request.data = {
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        }

        await super.create(request, response)

    }

    async update(request, response) {

        const {
            id
        } = request.params

        if (!id)
            response.send("Missing data {id}").status(400)

        const {
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        } = request.body

        const mSchema = schema.validate({
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        })

        if (mSchema.error)
            return response.send(mSchema.error).status(400)

        request.data = {
            Name,
            Description,
            Duration,
            Language,
            Subtitles,
            Age_rating
        }

        await super.create(request, response)

    }

    async delete(request, response) {
        const {
            id
        } = request.params

        if (!id)
            response.send("Missing data {id}").status(400)

        await super.delete(request, response)
    }


}


export default MovieController

/*model Movie {
  id          String     @id @default(uuid())
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  Name        String
  Description String
  Duration    Int
  Language    Language   @default(pt_BR)
  Subtitles   Subtitle   @default(none)
  Age_rating  Age_rating @default(General_Audiences)
  Session     Session[]
} */