import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UploadedFile, UseInterceptors, HttpCode, Put, NotFoundException, HttpException, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto, UploadLocationImageDto } from './dto/update-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';
import { getStorageOptions } from 'src/shared/file-upload.service';


@ApiBearerAuth()
@UseGuards(AuthGuard("jwt_node"))
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService
  ) { }

  @ApiOperation({ summary: 'Create new location' })
  @Post()
  @HttpCode(201)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get all locations' })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: 'Get location by ID' })
  @Get('/get-location/:id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update location detail' })
  @Put('/update-location/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete location' })
  @Delete('/delete-location/:id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }

  @ApiOperation({ summary: 'Get locations with pagination' })
  @Get('/pagination')
  @HttpCode(200)
  getLocationsWithPagination(@Query('pageIndex') pageIndex: string, @Query('pageSize') pageSize: string) {
    const page = parseInt(pageIndex, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;

    return this.locationService.getLocationsWithPagination(page, size);
  }


  @ApiOperation({ summary: 'Upload location image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadLocationImageDto
  })
  @UseInterceptors(FileInterceptor('locationImg', { storage: getStorageOptions('location') })) // Sử dụng storage với đường dẫn 'location'
  @Post('/upload/:id')
  @HttpCode(200)
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const targetFilePath = `/imgs/location/${file.filename}`; // Đường dẫn file đã upload

    try {
      const location = await this.locationService.findOne(+id);
      if (!location) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      return await this.locationService.uploadImage(+id, targetFilePath);
    } catch (error) {
      // Xóa file đã upload nếu có lỗi xảy ra
      const tempFilePath = path.join(process.cwd(), `/public/imgs/location/${file.filename}`);
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      if (error.status && error.status !== 500) throw new HttpException(error.response, error.status);
      throw new HttpException('Server error', 500);
    }
  }
}
