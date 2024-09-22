import { UserRoles } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: UserRoles[];
}
