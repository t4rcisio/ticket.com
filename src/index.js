const {
    PrismaClient
} = require("@prisma/client");


const prisma = new PrismaClient();

/*
async function createUser(Name, Email, Password, bithday, id_, Phone) {
    const data = await prisma.user.create({
        data: {
            Name,
            Email,
            Password,
            bithday,
            Phone
        }
    })
}

const data = createUser("Tarcisio", "tarcisio@gmail.com", "123456" , new Date(), "33988745548");
*/
(async () => {
    const data = await prisma.user.findMany({
        select: {
            Name: true
        }
    });
    console.log(data);
})()