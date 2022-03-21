import prisma from "../prisma.js"
import logger from "../utils/logger.js"



class Controller {


    constructor(table) {
        this.table = table
        this.client = prisma[table]
    }


    async search(request, response) {
        let clientData
        try {
            clientData = await this.client.findUnique({
                where: request.data
            })
        } catch (error) {
            return false
        }
        return clientData
    }


    async getOne(request, response) {
        const {
            id
        } = request.params
        let clientData
        try {
            clientData = await this.client.findUnique({
                where: {
                    id
                }
            })
            response.json(clientData)

        } catch (error) {
            logger.error(`${error}`)
            response.send("Error to read data, check log file to more errorrmation")
        }
    }


    async getMany(request, response) {
        let clientData
        try {
            clientData = await this.client.findMany({})
            response.send(clientData)
        } catch (error) {
            logger.error(`${error}`)
            response.send("Error to read data, check log file to more errorrmation")
        }
    }

    /*
        Request must be modificated to insert "data" parameter to store processed schema
    */
    async create(request, response) {
        let clientData
        try {
            clientData = await this.client.create({
                data: request.data
            })
            response.send(clientData)
        } catch (error) {
            logger.error(`${error}`)
            return response.send("Error to store data, check log file to more errorrmation")
        }
    }

    async update(request, response) {
        let clientData
        const {
            id
        } = request.params
        try {
            clientData = await this.client.update({
                data: request.data,
                where: {
                    id
                }
            })
        } catch (error) {
            logger.error(`${error}`)
            response.send("Error to store data, check log file to more errorrmation")
        }
    }

    async delete(request, response) {
        let clientData
        const {
            id
        } = request.params
        try {
            clientData = await this.client.delete({
                where: {
                    id
                }
            })

        } catch (error) {
            logger.error(`${error}`)
            response.send("Error to store data, check log file to more errorrmation")
        }
    }




}



export default Controller