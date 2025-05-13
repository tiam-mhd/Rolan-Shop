import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsOptional() // چون فقط admin می‌تونه موقع ساخت نقش بده
  role?: UserRole;
}
