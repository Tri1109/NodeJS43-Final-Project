import { Injectable, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) { }

  // Tạo booking mới
  async create(createBookingDto: CreateBookingDto) {
    try {
      const checkinDate = new Date(createBookingDto.checkin_date);
      const checkoutDate = new Date(createBookingDto.checkout_date);

      // Kiểm tra xem các ngày có hợp lệ không
      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        throw new BadRequestException('Invalid date format for check-in or check-out date');
      }

      // Kiểm tra nếu ngày check-in sau ngày check-out
      if (checkinDate >= checkoutDate) {
        throw new BadRequestException('Check-in date must be before check-out date');
      }

      const roomExists = await this.prismaService.room.findUnique({
        where: { room_id: createBookingDto.room_id },
      });

      if (!roomExists) {
        throw new NotFoundException(`Room with ID ${createBookingDto.room_id} does not exist`);
      }

      const newBooking = await this.prismaService.booking.create({
        data: {
          user_id: createBookingDto.user_id,
          room_id: createBookingDto.room_id,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          guest_count: createBookingDto.guest_count,
        },
      });
      return { message: 'Booking created successfully', booking: newBooking };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy tất cả booking
  async findAll() {
    try {
      return await this.prismaService.booking.findMany();
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy booking theo id
  async findOne(id: number) {
    try {
      const booking = await this.prismaService.booking.findUnique({
        where: { booking_id: id },
      });
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      return booking;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Cập nhật booking
  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const checkinDate = new Date(updateBookingDto.checkin_date);
      const checkoutDate = new Date(updateBookingDto.checkout_date);

      // Kiểm tra xem các ngày có hợp lệ không
      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        throw new BadRequestException('Invalid date format for check-in or check-out date');
      }

      // Kiểm tra nếu ngày check-in sau ngày check-out
      if (checkinDate >= checkoutDate) {
        throw new BadRequestException('Check-in date must be before check-out date');
      }

      const roomExists = await this.prismaService.room.findUnique({
        where: { room_id: updateBookingDto.room_id },
      });

      if (!roomExists) {
        throw new NotFoundException(`Room with ID ${updateBookingDto.room_id} does not exist`);
      }

      const updatedBooking = await this.prismaService.booking.update({
        where: { booking_id: id },
        data: {
          room_id: updateBookingDto.room_id,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          guest_count: updateBookingDto.guest_count,
        },
      });
      return { message: 'Booking updated successfully', booking: updatedBooking };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Xóa booking
  async remove(id: number) {
    try {
      const booking = await this.prismaService.booking.findUnique({
        where: { booking_id: id },
      });
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }

      await this.prismaService.booking.delete({
        where: { booking_id: id },
      });
      return { message: 'Booking deleted successfully' };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy danh sách booking theo user_id
  async findByUserId(user_id: number) {
    try {
      const bookings = await this.prismaService.booking.findMany({
        where: { user_id: user_id },
      });
      if (!bookings.length) {
        throw new NotFoundException(`No bookings found for User ID ${user_id}`);
      }
      return bookings;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }
}
