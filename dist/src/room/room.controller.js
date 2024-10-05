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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const path = require("path");
const passport_1 = require("@nestjs/passport");
const file_upload_service_1 = require("../shared/file-upload.service");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    create(createRoomDto) {
        return this.roomService.create(createRoomDto);
    }
    findAll() {
        return this.roomService.findAll();
    }
    findOne(id) {
        return this.roomService.findOne(+id);
    }
    async findRoomsByLocationId(location_id) {
        const rooms = await this.roomService.findRoomsByLocationId(+location_id);
        if (!rooms.length) {
            throw new common_1.NotFoundException(`No rooms found for Location ID ${location_id}`);
        }
        return rooms;
    }
    update(id, updateRoomDto) {
        return this.roomService.update(+id, updateRoomDto);
    }
    remove(id) {
        return this.roomService.remove(+id);
    }
    getRoomsWithPagination(pageIndex, pageSize) {
        const page = parseInt(pageIndex, 10) || 1;
        const size = parseInt(pageSize, 10) || 10;
        return this.roomService.getRoomsWithPagination(page, size);
    }
    async uploadImage(id, file) {
        if (!file) {
            throw new common_1.NotFoundException('No file uploaded');
        }
        const targetFilePath = `/imgs/room/${file.filename}`;
        try {
            const room = await this.roomService.findOne(+id);
            if (!room) {
                throw new common_1.NotFoundException(`Room with ID ${id} not found`);
            }
            return await this.roomService.uploadImage(+id, targetFilePath);
        }
        catch (error) {
            const tempFilePath = path.join(process.cwd(), `/public/imgs/room/${file.filename}`);
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            if (error.status && error.status !== 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException('Server error', 500);
        }
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new room' }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all rooms' }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get room by ID' }),
    (0, common_1.Get)('/get-room/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get rooms by location' }),
    (0, common_1.Get)('/get-room-by-location/:location_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('location_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findRoomsByLocationId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update room detail' }),
    (0, common_1.Put)('/update-room/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete room' }),
    (0, common_1.Delete)('/delete-room/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get rooms with pagination' }),
    (0, common_1.Get)('/pagination'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRoomsWithPagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload room image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: update_room_dto_1.UploadRoomImageDto
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('roomImg', { storage: (0, file_upload_service_1.getStorageOptions)('room') })),
    (0, common_1.Post)('/upload/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "uploadImage", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt_node")),
    (0, swagger_1.ApiTags)('Room'),
    (0, common_1.Controller)('/room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map