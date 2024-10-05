import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findAll(): Promise<{
        user_id: number;
        name: string;
        email: string;
        password: string;
        phone_number: string | null;
        birth_date: string | null;
        gender: string | null;
        role: string | null;
    }[]>;
    findOne(id: string): Promise<{
        user_id: number;
        name: string;
        email: string;
        password: string;
        phone_number: string | null;
        birth_date: string | null;
        gender: string | null;
        role: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
    searchByName(name: string): Promise<{
        user_id: number;
        name: string;
        email: string;
        password: string;
        phone_number: string | null;
        birth_date: string | null;
        gender: string | null;
        role: string | null;
    }[]>;
    getUsersWithPagination(pageIndex: string, pageSize: string): Promise<{
        pageIndex: number;
        pageSize: number;
        totalUsers: number;
        totalPages: number;
        users: {
            user_id: number;
            name: string;
            email: string;
            password: string;
            phone_number: string | null;
            birth_date: string | null;
            gender: string | null;
            role: string | null;
        }[];
    }>;
}
