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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RoomService = class RoomService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createRoomDto) {
        try {
            const roomExists = await this.prismaService.room.findFirst({
                where: { room_name: createRoomDto.room_name },
            });
            if (roomExists) {
                throw new common_1.BadRequestException('Room name is already in use');
            }
            const locationExists = await this.prismaService.location.findUnique({
                where: { location_id: createRoomDto.location_id }
            });
            if (!locationExists) {
                throw new common_1.BadRequestException(`Location with ID ${createRoomDto.location_id} does not exist`);
            }
            const newRoom = await this.prismaService.room.create({
                data: createRoomDto,
            });
            return { message: 'Room created successfully', room: newRoom };
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
            return await this.prismaService.room.findMany();
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
            const room = await this.prismaService.room.findUnique({
                where: { room_id: id },
            });
            if (!room) {
                throw new common_1.NotFoundException(`Room with ID ${id} not found`);
            }
            return room;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findRoomsByLocationId(location_id) {
        try {
            return await this.prismaService.room.findMany({
                where: { location_id: location_id },
            });
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async update(id, updateRoomDto) {
        try {
            const room = await this.prismaService.room.findUnique({
                where: { room_id: id },
            });
            if (!room) {
                throw new common_1.NotFoundException(`Room with ID ${id} not found`);
            }
            const locationExists = await this.prismaService.location.findUnique({
                where: { location_id: updateRoomDto.location_id }
            });
            if (!locationExists) {
                throw new common_1.BadRequestException(`Location with ID ${updateRoomDto.location_id} does not exist`);
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
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async remove(id) {
        try {
            const room = await this.prismaService.room.findUnique({
                where: { room_id: id },
            });
            if (!room) {
                throw new common_1.NotFoundException(`Room with ID ${id} not found`);
            }
            await this.prismaService.room.delete({
                where: { room_id: id },
            });
            return { message: 'Room deleted successfully' };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async getRoomsWithPagination(pageIndex, pageSize) {
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
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async uploadImage(roomId, imagePath) {
        const updatedRoom = await this.prismaService.room.update({
            where: { room_id: roomId },
            data: {
                image: imagePath,
            },
        });
        return { message: 'Image uploaded and room updated successfully', room: updatedRoom };
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
//# sourceMappingURL=room.service.js.map