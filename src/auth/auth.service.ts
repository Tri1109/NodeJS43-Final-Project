import { Injectable, BadRequestException, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    // Đăng ký người dùng mới
    async signUp(userSignUp: SignUpDto) {
        const { email, password, name, phone_number, birth_date, gender } = userSignUp;

        try {
            // Regular Expression để kiểm tra email phải kết thúc bằng @gmail.com
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            // Kiểm tra định dạng email
            if (!emailRegex.test(email)) {
                throw new BadRequestException('Email must be a valid Gmail address (e.g., user@gmail.com)');
            }

            // Kiểm tra xem email đã tồn tại chưa
            const userExists = await this.prisma.user.findUnique({
                where: { email },
            });

            if (userExists) {
                throw new BadRequestException('Email is already in use');
            }

            // Kiểm tra xem password có tồn tại và hợp lệ không
            if (!password) {
                throw new BadRequestException('Password cannot be blank');
            }

            // Mã hóa mật khẩu
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Thêm người dùng mới vào cơ sở dữ liệu
            const newUser = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone_number,
                    birth_date,
                    gender,
                    role: 'user',
                },
            });

            return { message: 'Registered successfully', user: newUser };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new HttpException(error.response, error.status);

            throw new HttpException("Server error", 500);
        }
    }

    // Đăng nhập người dùng
    async login(userLogin: LoginDto) {
        const { email, password } = userLogin;

        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new UnauthorizedException('Email does not exist');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Password is incorrect');
            }

            const token = await this.jwtService.signAsync(
                { userId: user.user_id, email: user.email },
                { secret: process.env.JWT_SECRET, expiresIn: '5h' },
            );

            return { access_token: token, user };
        }
        catch (error) {
            console.log(error)
            if (error.status && error.status != 500)
                throw new HttpException(error.response, error.status)

            throw new HttpException("Server error", 500)
        }
    }
}
