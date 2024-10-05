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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(createBookingDto, req) {
        const userId = req.user.userId;
        createBookingDto.user_id = userId;
        if (createBookingDto.guest_count <= 0) {
            throw new common_1.BadRequestException('Guest count must be greater than 0');
        }
        return this.bookingService.create(createBookingDto);
    }
    findAll() {
        return this.bookingService.findAll();
    }
    async findOne(id) {
        const booking = await this.bookingService.findOne(+id);
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async update(id, updateBookingDto, req) {
        const userId = req.user.userId;
        const existingBooking = await this.bookingService.findOne(+id);
        if (!existingBooking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        if (updateBookingDto.guest_count <= 0) {
            throw new common_1.BadRequestException('Guest count must be greater than 0');
        }
        if (userId !== existingBooking.user_id) {
            throw new common_1.ForbiddenException('You are not allowed to update this booking');
        }
        return this.bookingService.update(+id, updateBookingDto);
    }
    async remove(id, req) {
        const userId = req.user.userId;
        const existingBooking = await this.bookingService.findOne(+id);
        if (!existingBooking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        if (userId !== existingBooking.user_id) {
            throw new common_1.ForbiddenException('You are not allowed to delete this booking');
        }
        return this.bookingService.remove(+id);
    }
    async findByUserId(user_id) {
        const bookings = await this.bookingService.findByUserId(+user_id);
        if (!bookings.length) {
            throw new common_1.NotFoundException(`No bookings found for User ID ${user_id}`);
        }
        return bookings;
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new booking' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get booking by ID' }),
    (0, common_1.Get)('/get-booking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update booking' }),
    (0, common_1.Put)('/update-booking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete booking' }),
    (0, common_1.Delete)('/delete-booking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get booking by user ID' }),
    (0, common_1.Get)('/get-booking-by-user/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findByUserId", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)("Booking"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt_node')),
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map