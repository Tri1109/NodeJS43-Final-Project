import { Controller, Get, Post, Body, Param, Delete, Query, UploadedFile, UseInterceptors, HttpCode, Put, NotFoundException, HttpException, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto, UploadRoomImageDto } from './dto/update-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';
import { getStorageOptions } from 'src/shared/file-upload.service';


@ApiBearerAuth()
@UseGuards(AuthGuard("jwt_node"))
@ApiTags('Room')
@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService,
  ) { }

  @ApiOperation({ summary: 'Create new room' })
  @Post()
  @HttpCode(201)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @ApiOperation({ summary: 'Get all rooms' })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.roomService.findAll();
  }

  @ApiOperation({ summary: 'Get room by ID' })
  @Get('/get-room/:id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get rooms by location' })
  @Get('/get-room-by-location/:location_id')
  @HttpCode(200)
  async findRoomsByLocationId(@Param('location_id') location_id: string) {
    const rooms = await this.roomService.findRoomsByLocationId(+location_id);
    if (!rooms.length) {
      throw new NotFoundException(`No rooms found for Location ID ${location_id}`);
    }
    return rooms;
  }

  @ApiOperation({ summary: 'Update room detail' })
  @Put('/update-room/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Delete room' })
  @Delete('/delete-room/:id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @ApiOperation({ summary: 'Get rooms with pagination' })
  @Get('/pagination')
  @HttpCode(200)
  getRoomsWithPagination(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string) {
    const page = parseInt(pageIndex, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;

    return this.roomService.getRoomsWithPagination(page, size);
  }

  @ApiOperation({ summary: 'Upload room image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadRoomImageDto
  })
  @UseInterceptors(FileInterceptor('roomImg', { storage: getStorageOptions('room') })) // Sử dụng storage với đường dẫn 'room'
  @Post('/upload/:id')
  @HttpCode(200)
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const targetFilePath = `/imgs/room/${file.filename}`; // Đường dẫn file đã upload

    try {
      const room = await this.roomService.findOne(+id);
      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      return await this.roomService.uploadImage(+id, targetFilePath);
    } catch (error) {
      // Xóa file đã upload nếu có lỗi xảy ra
      const tempFilePath = path.join(process.cwd(), `/public/imgs/room/${file.filename}`);
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      if (error.status && error.status !== 500) throw new HttpException(error.response, error.status);
      throw new HttpException('Server error', 500);
    }
  }
}
