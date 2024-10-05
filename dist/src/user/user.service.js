"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        const { email, password, name, phone_number, birth_date, gender } = createUserDto;
        try {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailRegex.test(email)) {
                throw new common_1.BadRequestException('Email must be a valid Gmail address (e.g., user@gmail.com)');
            }
            const userExists = await this.prismaService.user.findUnique({
                where: { email },
            });
            if (userExists) {
                throw new common_1.BadRequestException('Email is already in use');
            }
            if (!password) {
                throw new common_1.BadRequestException('Password cannot be blank');
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await this.prismaService.user.create({
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
            return { message: 'User created successfully', user: newUser };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findAll() {
        try {
            return await this.prismaService.user.findMany();
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findOne(id) {
        try {
            if (!id || isNaN(id)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const user = await this.prismaService.user.findUnique({
                where: { user_id: id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async update(id, updateUserDto) {
        const { password } = updateUserDto;
        try {
            const user = await this.prismaService.user.findUnique({
                where: { user_id: id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            if (password) {
                const saltRounds = 10;
                updateUserDto.password = await bcrypt.hash(password, saltRounds);
            }
            const updatedUser = await this.prismaService.user.update({
                where: { user_id: id },
                data: updateUserDto,
            });
            return { message: 'User updated successfully', user: updatedUser };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async remove(id) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { user_id: id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            await this.prismaService.user.delete({
                where: { user_id: id },
            });
            return { message: 'User deleted successfully' };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async searchByName(name) {
        const removeVietnameseTones = (str) => {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d").replace(/Đ/g, "D");
        };
        const cleanedName = name.replace(/[^a-zA-Z0-9\sđĐ]/g, '').trim().toLowerCase();
        const normalizedCleanedName = removeVietnameseTones(cleanedName);
        if (!normalizedCleanedName) {
            throw new common_1.BadRequestException('Invalid name input');
        }
        try {
            const users = await this.prismaService.user.findMany({
                where: {
                    AND: [
                        {
                            name: {
                                contains: normalizedCleanedName,
                            },
                        },
                    ],
                },
            });
            if (users.length === 0) {
                throw new common_1.NotFoundException(`No users found with name: ${name}`);
            }
            return users;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async getUsersWithPagination(pageIndex, pageSize) {
        try {
            const skip = (pageIndex - 1) * pageSize;
            const take = pageSize;
            const totalUsers = await this.prismaService.user.count();
            const users = await this.prismaService.user.findMany({
                skip: skip,
                take: take,
            });
            const totalPages = Math.ceil(totalUsers / pageSize);
            return {
                pageIndex,
                pageSize,
                totalUsers,
                totalPages,
                users,
            };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map