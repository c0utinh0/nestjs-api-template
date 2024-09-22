import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-In.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const existingUser = await this.userService.findOneByEmail(body.email);
    if (existingUser) {
      return new BadRequestException('Email already registered');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);

    body.password = hash;

    return this.userService.createUser(body);
  }

  async signIn(body: SignInDto) {
    const user = await this.userService.findOneAuth(body.email, body.password);

    const payload = { sub: user.id, email: user.email, roles: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      data: user,
    };
  }
}
