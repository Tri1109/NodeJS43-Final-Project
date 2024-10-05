import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        user_id: number;
        name: string;
        email: string;
        password: string;
        phone_number: string | null;
        birth_date: string | null;
        gender: string | null;
        role: string | null;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: number): Promise<{
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
    getUsersWithPagination(pageIndex: number, pageSize: number): Promise<{
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
