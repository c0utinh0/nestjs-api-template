import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentUserDto } from 'src/auth/current-user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('/me')
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard)
  async findMe(@CurrentUser() user: CurrentUserDto): Promise<UserResponseDto> {
    return this.userService.findMe(user.userId);
  }
}
