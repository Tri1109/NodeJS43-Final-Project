import { Injectable, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  // Tạo user mới
  async create(createUserDto: CreateUserDto) {
    const { email, password, name, phone_number, birth_date, gender } = createUserDto;

    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

      if (!emailRegex.test(email)) {
        throw new BadRequestException('Email must be a valid Gmail address (e.g., user@gmail.com)');
      }
      const userExists = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (userExists) {
        // Trả về lỗi nếu email đã tồn tại
        throw new BadRequestException('Email is already in use');
      }

      if (!password) {
        throw new BadRequestException('Password cannot be blank');
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
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy tất cả người dùng
  async findAll() {
    try {
      return await this.prismaService.user.findMany();
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy một người dùng theo ID
  async findOne(id: number) {
    try {
      // Kiểm tra xem id có hợp lệ hay không
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid user ID');
      }

      const user = await this.prismaService.user.findUnique({
        where: { user_id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Cập nhật thông tin người dùng
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;

    try {
      const user = await this.prismaService.user.findUnique({
        where: { user_id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
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
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Xóa người dùng
  async remove(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { user_id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.prismaService.user.delete({
        where: { user_id: id },
      });

      return { message: 'User deleted successfully' };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Tìm kiếm người dùng theo tên
  async searchByName(name: string) {
    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str: string): string => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
        .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    // Loại bỏ ký tự đặc biệt, khoảng trắng dư thừa và chuyển đổi thành chữ thường
    const cleanedName = name.replace(/[^a-zA-Z0-9\sđĐ]/g, '').trim().toLowerCase();
    const normalizedCleanedName = removeVietnameseTones(cleanedName);  // Loại bỏ dấu tiếng Việt

    if (!normalizedCleanedName) {
      throw new BadRequestException('Invalid name input');
    }

    try {
      const users = await this.prismaService.user.findMany({
        where: {
          // Sử dụng hàm Prisma `contains` với tên đã chuẩn hóa (không dấu)
          AND: [
            {
              name: {
                contains: normalizedCleanedName,  // Tìm kiếm theo tên không dấu
              },
            },
          ],
        },
      });

      if (users.length === 0) {
        throw new NotFoundException(`No users found with name: ${name}`);
      }

      return users;
    } catch (error) {
      console.log(error);
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status);

      throw new HttpException("Server error", 500);
    }
  }

  // Lấy người dùng với phân trang
  async getUsersWithPagination(pageIndex: number, pageSize: number) {
    try {
      // Tính toán số lượng bản ghi cần bỏ qua và số lượng cần lấy
      const skip = (pageIndex - 1) * pageSize;
      const take = pageSize;

      // Tổng số người dùng
      const totalUsers = await this.prismaService.user.count();

      // Lấy danh sách người dùng dựa trên phân trang
      const users = await this.prismaService.user.findMany({
        skip: skip,
        take: take,
      });

      // Tổng số trang
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
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }
}
