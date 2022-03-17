import prisma from "../prisma.js"



class Controller {


    constructor(table) {
        this.table = table
        this.client = prisma["user"]
    }


    async getOne(request, response) {
        const {
            id
        } = request.params
        try {
            const clientData = await this.client.findUnique({
                where: {
                    id
                }
            })
            response.json(clientData)

        } catch (error) {
            response.send(error)
        }
    }


    async getMany(request, response) {
        let clientData
        try {
            clientData = await this.client.findMany({})
        } catch (error) {
            clientData = error
        } finally {
            response.send(clientData)
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
        } catch (error) {
            clientData = error
        } finally {
            response.send(clientData)
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
            clientData = error
        } finally {
            response.send(clientData)
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
            clientData = error
        } finally {
            response.send(clientData)
        }
    }




}



export default Controller