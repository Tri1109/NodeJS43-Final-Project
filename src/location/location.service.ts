import { Injectable, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) { }

  // Thêm Location mới
  async create(createLocationDto: CreateLocationDto) {
    try {
      // Sử dụng findFirst để tìm kiếm theo location_name
      const existingLocation = await this.prismaService.location.findFirst({
        where: { location_name: createLocationDto.location_name }, // Tìm theo tên location
      });

      if (existingLocation) {
        throw new BadRequestException('Location name already exists');
      }

      const newLocation = await this.prismaService.location.create({
        data: createLocationDto,
      });

      return { message: 'Location created successfully', location: newLocation };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy tất cả Location
  async findAll() {
    try {
      return await this.prismaService.location.findMany();
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy Location theo ID
  async findOne(id: number) {
    try {
      const location = await this.prismaService.location.findUnique({
        where: { location_id: id },
      });

      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      return location;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Cập nhật Location
  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const location = await this.prismaService.location.findUnique({
        where: { location_id: id },
      });

      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      const updatedLocation = await this.prismaService.location.update({
        where: { location_id: id },
        data: updateLocationDto,
      });

      return { message: 'Location updated successfully', location: updatedLocation };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Xóa Location
  async remove(id: number) {
    try {
      const location = await this.prismaService.location.findUnique({
        where: { location_id: id },
      });

      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      await this.prismaService.location.delete({
        where: { location_id: id },
      });

      return { message: 'Location deleted successfully' };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Phân trang Location
  async getLocationsWithPagination(pageIndex: number, pageSize: number) {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const take = pageSize;

      const totalLocations = await this.prismaService.location.count();
      const locations = await this.prismaService.location.findMany({
        skip: skip,
        take: take,
      });

      const totalPages = Math.ceil(totalLocations / pageSize);

      return {
        pageIndex,
        pageSize,
        totalLocations,
        totalPages,
        locations,
      };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Upload hình ảnh cho Location
  async uploadImage(locationId: number, imagePath: string) {
    // Cập nhật đường dẫn hình ảnh trong cơ sở dữ liệu
    const updatedLocation = await this.prismaService.location.update({
      where: { location_id: locationId },
      data: {
        image: imagePath,  // Cập nhật đường dẫn hình ảnh
      },
    });

    return { message: 'Image uploaded and location updated successfully', location: updatedLocation };
  }
}
