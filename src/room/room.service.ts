import { Injectable, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoomService {

  constructor(
    private prismaService: PrismaService
  ) { }

  // Thêm phòng mới
  async create(createRoomDto: CreateRoomDto) {
    try {
      // Kiểm tra nếu tên phòng đã tồn tại
      const roomExists = await this.prismaService.room.findFirst({
        where: { room_name: createRoomDto.room_name },
      });

      if (roomExists) {
        throw new BadRequestException('Room name is already in use');
      }

      // Kiểm tra xem location_id có tồn tại trong bảng Location hay không
      const locationExists = await this.prismaService.location.findUnique({
        where: { location_id: createRoomDto.location_id }
      });

      if (!locationExists) {
        throw new BadRequestException(`Location with ID ${createRoomDto.location_id} does not exist`);
      }

      // Tạo phòng mới
      const newRoom = await this.prismaService.room.create({
        data: createRoomDto,
      });

      return { message: 'Room created successfully', room: newRoom };
    }
    catch (error) {
      console.log(error);
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status);

      throw new HttpException("Server error", 500);
    }
  }

  // Lấy tất cả phòng
  async findAll() {
    try {
      return await this.prismaService.room.findMany();
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy thông tin phòng theo ID
  async findOne(id: number) {
    try {
      const room = await this.prismaService.room.findUnique({
        where: { room_id: id },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      return room;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy danh sách Room dựa vào location_id
  async findRoomsByLocationId(location_id: number) {
    try {
      return await this.prismaService.room.findMany({
        where: { location_id: location_id },
      });
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Cập nhật thông tin phòng
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      const room = await this.prismaService.room.findUnique({
        where: { room_id: id },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      const locationExists = await this.prismaService.location.findUnique({
        where: { location_id: updateRoomDto.location_id }
      });

      if (!locationExists) {
        throw new BadRequestException(`Location with ID ${updateRoomDto.location_id} does not exist`);
      }

      const updatedRoom = await this.prismaService.room.update({
        where: { room_id: id },
        data: {
          ...updateRoomDto,
          location_id: updateRoomDto.location_id
        },
      });

      return { message: 'Room updated successfully', room: updatedRoom };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Xóa phòng
  async remove(id: number) {
    try {
      const room = await this.prismaService.room.findUnique({
        where: { room_id: id },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      await this.prismaService.room.delete({
        where: { room_id: id },
      });

      return { message: 'Room deleted successfully' };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Phân trang tìm kiếm phòng
  async getRoomsWithPagination(pageIndex: number, pageSize: number) {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const take = pageSize;

      const totalRooms = await this.prismaService.room.count();
      const rooms = await this.prismaService.room.findMany({
        skip: skip,
        take: take,
      });

      const totalPages = Math.ceil(totalRooms / pageSize);

      return {
        pageIndex,
        pageSize,
        totalRooms,
        totalPages,
        rooms,
      };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Upload hình ảnh phòng và cập nhật vào database
  async uploadImage(roomId: number, imagePath: string) {
    // Cập nhật đường dẫn hình ảnh trong cơ sở dữ liệu
    const updatedRoom = await this.prismaService.room.update({
      where: { room_id: roomId },
      data: {
        image: imagePath,  // Cập nhật đường dẫn hình ảnh
      },
    });

    return { message: 'Image uploaded and room updated successfully', room: updatedRoom };
  }
}
