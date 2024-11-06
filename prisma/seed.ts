import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()

async function main() {
    const users = await prisma.users.create({
        data: {
            id: '410544b2-4001-4271-9855-fec4b6a6442a',
            name: 'User',
            email: 'user@nextmail.com',
            password: '123456',
        },
    })

    console.log(users)

    const customers = await prisma.customers.createMany({

        data: [
            {
                id: 0,
                name: 'Evil Rabbit',
                email: 'evil@rabbit.com',
                image_url: '/customers/evil-rabbit.png',
            },
            {
                id: 1,
                name: 'Delba de Oliveira',
                email: 'delba@oliveira.com',
                image_url: '/customers/delba-de-oliveira.png',
            },
            {
                id: 2,
                name: 'Lee Robinson',
                email: 'lee@robinson.com',
                image_url: '/customers/lee-robinson.png',
            },
            {
                id: 3,
                name: 'Michael Novotny',
                email: 'michael@novotny.com',
                image_url: '/customers/michael-novotny.png',
            },
            {
                id: 4,
                name: 'Amy Burns',
                email: 'amy@burns.com',
                image_url: '/customers/amy-burns.png',
            },
            {
                id: 5,
                name: 'Balazs Orban',
                email: 'balazs@orban.com',
                image_url: '/customers/balazs-orban.png',
            },
        ],
    })


    console.log(customers)


    const  invoices = await prisma. invoices.createMany({

        data: [
            {
              customer_id: 0,
              amount: 15795,
              status: 'pending',
              date: '2022-12-06',
            },
            {
              customer_id: 1,
              amount: 20348,
              status: 'pending',
              date: '2022-11-14',
            },
            {
              customer_id: 4,
              amount: 3040,
              status: 'paid',
              date: '2022-10-29',
            },
            {
              customer_id: 3,
              amount: 44800,
              status: 'paid',
              date: '2023-09-10',
            },
            {
              customer_id:5,
              amount: 34577,
              status: 'pending',
              date: '2023-08-05',
            },
            {
              customer_id: 2,
              amount: 54246,
              status: 'pending',
              date: '2023-07-16',
            },
            {
              customer_id: 0,
              amount: 666,
              status: 'pending',
              date: '2023-06-27',
            },
            {
              customer_id: 3,
              amount: 32545,
              status: 'paid',
              date: '2023-06-09',
            },
            {
              customer_id: 4,
              amount: 1250,
              status: 'paid',
              date: '2023-06-17',
            },
            {
              customer_id: 5,
              amount: 8546,
              status: 'paid',
              date: '2023-06-07',
            },
            {
              customer_id: 1,
              amount: 500,
              status: 'paid',
              date: '2023-08-19',
            },
            {
              customer_id:5,
              amount: 8945,
              status: 'paid',
              date: '2023-06-03',
            },
            {
              customer_id: 2,
              amount: 1000,
              status: 'paid',
              date: '2022-06-05',
            },
          ],
          
    })


    console.log( invoices)



    const  revenue = await prisma. revenue.createMany({

       data: [
        { month: 'Jan', revenue: 2000 },
        { month: 'Feb', revenue: 1800 },
        { month: 'Mar', revenue: 2200 },
        { month: 'Apr', revenue: 2500 },
        { month: 'May', revenue: 2300 },
        { month: 'Jun', revenue: 3200 },
        { month: 'Jul', revenue: 3500 },
        { month: 'Aug', revenue: 3700 },
        { month: 'Sep', revenue: 2500 },
        { month: 'Oct', revenue: 2800 },
        { month: 'Nov', revenue: 3000 },
        { month: 'Dec', revenue: 4800 },
      ],
    })

    console.log( revenue)

}





main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })