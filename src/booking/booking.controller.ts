import { Controller, Get, Post, Body, Param, Delete, Put, ForbiddenException, NotFoundException, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Booking")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt_node'))
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  // API tạo mới booking với kiểm tra số lượng khách
  @ApiOperation({ summary: 'Create new booking' })
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const userId = req.user.userId;
    createBookingDto.user_id = userId;

    // Kiểm tra số lượng khách phải lớn hơn 0
    if (createBookingDto.guest_count <= 0) {
      throw new BadRequestException('Guest count must be greater than 0');
    }

    return this.bookingService.create(createBookingDto);
  }

  // API lấy tất cả booking
  @ApiOperation({ summary: 'Get all bookings' })
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  // API lấy thông tin booking theo booking_id
  @ApiOperation({ summary: 'Get booking by ID' })
  @Get('/get-booking/:id')
  async findOne(@Param('id') id: string) {
    const booking = await this.bookingService.findOne(+id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  // API cập nhật booking chỉ cho phép người tạo booking cập nhật
  @ApiOperation({ summary: 'Update booking' })
  @Put('/update-booking/:id')
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Req() req) {
    const userId = req.user.userId;

    const existingBooking = await this.bookingService.findOne(+id);

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (updateBookingDto.guest_count <= 0) {
      throw new BadRequestException('Guest count must be greater than 0');
    }

    // Kiểm tra nếu người dùng hiện tại không phải là người tạo booking
    if (userId !== existingBooking.user_id) {
      throw new ForbiddenException('You are not allowed to update this booking');
    }

    return this.bookingService.update(+id, updateBookingDto);
  }

  // API xóa booking chỉ cho phép người tạo booking
  @ApiOperation({ summary: 'Delete booking' })
  @Delete('/delete-booking/:id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    const existingBooking = await this.bookingService.findOne(+id);

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (userId !== existingBooking.user_id) {
      throw new ForbiddenException('You are not allowed to delete this booking');
    }

    return this.bookingService.remove(+id);
  }

  // API lấy danh sách booking theo user_id 
  @ApiOperation({ summary: 'Get booking by user ID' })
  @Get('/get-booking-by-user/:user_id')
  async findByUserId(@Param('user_id') user_id: string) {
    const bookings = await this.bookingService.findByUserId(+user_id);
    if (!bookings.length) {
      throw new NotFoundException(`No bookings found for User ID ${user_id}`);
    }
    return bookings;
  }
}
