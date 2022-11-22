import {PrismaClient} from "@prisma/client"

const client = new PrismaClient()

interface IUsuario {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}

interface ISchemaUsuario{
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    telephone: string | null;
}

const DATA = {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    telephone: "1234567890"
}
async function main() {
    await client.$connect();
    await createUser(DATA)
    await getUsers()
    await deleteAllUsers()
}

async function deleteAllUsers() {
    await client.usuarios.deleteMany()
}

async function getUsers(): Promise<void>{
    const users: ISchemaUsuario[] = await client.usuarios.findMany()
    console.log(typeof users)
    console.log(users)
}

async function createUser(data: IUsuario): Promise<any> {
    const users: ISchemaUsuario = await client.usuarios.create({
        data: data
    });
}

main()
  .catch(async (e) => {
    console.error(e)
})
  .finally(async () => {
    await client.$disconnect()
    process.exit(1)
})