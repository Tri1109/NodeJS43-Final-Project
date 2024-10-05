import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'User Sign Up' })
  @ApiBody({ type: SignUpDto })
  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() userSignUp: SignUpDto) {
    return this.authService.signUp(userSignUp);
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  @HttpCode(200)
  login(@Body() userLogin: LoginDto) {
    return this.authService.login(userLogin);
  }
}
