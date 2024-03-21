import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('asdasd123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'plmiranda@rdretailgroup.com.ph' },
    update: {},
    create: {
      email: 'plmiranda@rdretailgroup.com.ph',
      name: 'Patrick Miranda',
      password
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })