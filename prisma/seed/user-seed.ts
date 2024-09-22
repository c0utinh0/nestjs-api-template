import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
      data: {
        name: "Admin",
        lastname: "Admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(10)),
        role: ['ADMIN']
      }
    });

    await prisma.user.create({
      data: {
        name: "User",
        lastname: "User",
        email: "user@user.com",
        password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(10)),
        role: ['USER']
      }
    });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
