import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(userSignUp: SignUpDto): Promise<{
        message: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            password: string;
            phone_number: string | null;
            birth_date: string | null;
            gender: string | null;
            role: string | null;
        };
    }>;
    login(userLogin: LoginDto): Promise<{
        access_token: string;
        user: {
            user_id: number;
            name: string;
            email: string;
            password: string;
            phone_number: string | null;
            birth_date: string | null;
            gender: string | null;
            role: string | null;
        };
    }>;
}
