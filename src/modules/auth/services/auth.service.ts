import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ok } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return ok({ isSuccess: true, code: 200, message: 'ثبت‌ نام موفق بود', data: user });
  }

  async login(loginDto: LoginDto) {
    const result = (await this.validateUser(loginDto.email, loginDto.password));
    if (result.isSuccess && result.data) {
      const payload = { sub: result.data.id, email: result.data.email, role: result.data.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return ok(result);
    }
  }
  

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { isSuccess: false, code: 404, message: 'ایمیل یافت نشد', data: null };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { isSuccess: false, code: 401, message: 'رمز عبور نادرست است', data: null };
    return { isSuccess: true, code: 200, message: 'احراز هویت موفق بود', data: user };
  }
}
