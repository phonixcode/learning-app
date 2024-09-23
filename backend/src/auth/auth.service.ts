import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<any> {
    // Check for existing username and email
    const existingUserByUsername = await this.usersService.findByUsername(createUserDto.username);
    if (existingUserByUsername) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
  
    try {
      const existingUserByEmail = await this.usersService.findByEmail(createUserDto.email);
      if (existingUserByEmail) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error; 
      }
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    // Create user
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  
    // Return token and user data
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };
  
    return {
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
