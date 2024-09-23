import { Controller, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { LocalAuthGuard } from './local.strategy';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    if (!user.username || !user.password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }

    const validatedUser = await this.authService.validateUser(user.username, user.password);
    if (!validatedUser) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(validatedUser);
  }


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
