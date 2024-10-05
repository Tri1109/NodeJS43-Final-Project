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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BookingService = class BookingService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createBookingDto) {
        try {
            const checkinDate = new Date(createBookingDto.checkin_date);
            const checkoutDate = new Date(createBookingDto.checkout_date);
            if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
                throw new common_1.BadRequestException('Invalid date format for check-in or check-out date');
            }
            if (checkinDate >= checkoutDate) {
                throw new common_1.BadRequestException('Check-in date must be before check-out date');
            }
            const roomExists = await this.prismaService.room.findUnique({
                where: { room_id: createBookingDto.room_id },
            });
            if (!roomExists) {
                throw new common_1.NotFoundException(`Room with ID ${createBookingDto.room_id} does not exist`);
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
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findAll() {
        try {
            return await this.prismaService.booking.findMany();
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
            const booking = await this.prismaService.booking.findUnique({
                where: { booking_id: id },
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
            }
            return booking;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async update(id, updateBookingDto) {
        try {
            const checkinDate = new Date(updateBookingDto.checkin_date);
            const checkoutDate = new Date(updateBookingDto.checkout_date);
            if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
                throw new common_1.BadRequestException('Invalid date format for check-in or check-out date');
            }
            if (checkinDate >= checkoutDate) {
                throw new common_1.BadRequestException('Check-in date must be before check-out date');
            }
            const roomExists = await this.prismaService.room.findUnique({
                where: { room_id: updateBookingDto.room_id },
            });
            if (!roomExists) {
                throw new common_1.NotFoundException(`Room with ID ${updateBookingDto.room_id} does not exist`);
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
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async remove(id) {
        try {
            const booking = await this.prismaService.booking.findUnique({
                where: { booking_id: id },
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
            }
            await this.prismaService.booking.delete({
                where: { booking_id: id },
            });
            return { message: 'Booking deleted successfully' };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findByUserId(user_id) {
        try {
            const bookings = await this.prismaService.booking.findMany({
                where: { user_id: user_id },
            });
            if (!bookings.length) {
                throw new common_1.NotFoundException(`No bookings found for User ID ${user_id}`);
            }
            return bookings;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map