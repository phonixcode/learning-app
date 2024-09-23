import { IsString, IsEnum, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'A valid email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsEnum(Role)
  role: Role = Role.Learner;
}
