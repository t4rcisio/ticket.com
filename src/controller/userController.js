import bcrypt from "bcryptjs";
import controller from "./controller.js"


class UserController extends controller {

    constructor() {
        super('User')
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

        const nBirthday = new Date(Date.parse(Birthday))
        const hash = this.hashPassword(Password)

        /*
        Insert "data" as parameter to store data without change generic controller functions
        */
        request.data = {
            Name,
            Email,
            Password: hash,
            Birthday: nBirthday,
            Phone
        }
        await super.create(request, response)
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

        const nBirthday = new Date(Date.parse(Birthday))
        const hash = this.hashPassword(Password)

        /*
        Insert "data" as parameter to store data without change generic controller functions
        */

        request.data = {
            Name,
            Email,
            Password: hash,
            Birthday: nBirthday,
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