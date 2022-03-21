import bcrypt from "bcryptjs";
import controller from "./controller.js"
import Joi from "joi";
import jsonwebtoken from "jsonwebtoken";

const schema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().required(),
    Password: Joi.string().required(),
    Birthday: Joi.date().required(),
    Phone: Joi.string().alphanum()
})

const loginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
})



class UserController extends controller {

    constructor() {
        super('user')
    }

    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    async create(request, response) {
        const {
            Name,
            Email,
            Password,
            Phone,
            Birthday
        } = request.body;

        if (!Name || !Email || !Password || !Birthday)
            return response.send("Bad request").status(400)

        const mBirthday = new Date(Date.parse(Birthday))

        const mPassword = this.hashPassword(Password)

        const mSchema = schema.validate({
            Name,
            Email,
            Password: mPassword,
            Phone,
            Birthday: mBirthday
        })

        if (mSchema.error)
            return response.send("Error data").json(mSchema).status(400)

        /*
        Insert "data" as parameter to store data without change generic controller functions
        */
        request.data = {
            Name,
            Email,
            Password: mPassword,
            Birthday: mBirthday,
            Phone
        }
        return await super.create(request, response)
    }

    async update(request, response) {

        const {
            id
        } = request.params

        if (!id)
            response.send("Request params")

        const {
            Name,
            Email,
            Password,
            Phone,
            Birthday
        } = request.body;

        const mBirthday = new Date(Date.parse(Birthday))
        const mPassword = this.hashPassword(Password)

        const mSchema = schema.validate({
            Name,
            Email,
            Password: mPassword,
            Phone,
            Birthday: mBirthday
        })

        if (mSchema.error)
            return response.send("Error data").json(mSchema).status(400)

        request.data = {
            Name,
            Email,
            Password: mPassword,
            Birthday: mBirthday,
            Phone
        }

        await super.update(request, response)
    }

    async delete(request, response) {
        const {
            id
        } = request.params

        if (!id)
            response.send("Request params {id}")

        await super.delete(request, response)
    }

    async login(request, response) {

        const {
            Email,
            Password
        } = request.body
        const mSchema = loginSchema.validate({
            Email,
            Password
        })

        if (mSchema.error)
            return response.send("Error data").json(mSchema).status(400)

        request.data = {
            Email
        }
        const userlogin = await super.search(request, response)
        if (!userlogin)
            response.send("Incorrect Email or Password").status(403)


        const hash = bcrypt.compareSync(Password, userlogin.Password)

        if (!hash)
            response.send("Incorrect Email or Password").status(403)

        const payload = {
            id: userlogin.id
        }

        const token = jsonwebtoken.sign(payload, process.env.WEBTOKENSEED, {
            expiresIn: "3h"
        })

        if (typeof sessionStorage !== undefined)
            return response.setHeader(process.env.BROWSER_KEY, "Bearer " + token).send(`Bearer ${token}`).status(200)

        sessionStorage.setItem(process.env.BROWSER_KEY, token)

        response.send(`Bearer ${token}`).status(200)
    }

}

export default UserController

/*model User {
  id          String      @id @default(uuid())
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  Name        String
  Email       String      @unique
  Password    String
  Phone       String?
  bithday     DateTime
  permissions Permissions @default(USER)
} */