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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const path = require("path");
const passport_1 = require("@nestjs/passport");
const file_upload_service_1 = require("../shared/file-upload.service");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    create(createLocationDto) {
        return this.locationService.create(createLocationDto);
    }
    findAll() {
        return this.locationService.findAll();
    }
    findOne(id) {
        return this.locationService.findOne(+id);
    }
    update(id, updateLocationDto) {
        return this.locationService.update(+id, updateLocationDto);
    }
    remove(id) {
        return this.locationService.remove(+id);
    }
    getLocationsWithPagination(pageIndex, pageSize) {
        const page = parseInt(pageIndex, 10) || 1;
        const size = parseInt(pageSize, 10) || 10;
        return this.locationService.getLocationsWithPagination(page, size);
    }
    async uploadImage(id, file) {
        if (!file) {
            throw new common_1.NotFoundException('No file uploaded');
        }
        const targetFilePath = `/imgs/location/${file.filename}`;
        try {
            const location = await this.locationService.findOne(+id);
            if (!location) {
                throw new common_1.NotFoundException(`Location with ID ${id} not found`);
            }
            return await this.locationService.uploadImage(+id, targetFilePath);
        }
        catch (error) {
            const tempFilePath = path.join(process.cwd(), `/public/imgs/location/${file.filename}`);
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            if (error.status && error.status !== 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException('Server error', 500);
        }
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new location' }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all locations' }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get location by ID' }),
    (0, common_1.Get)('/get-location/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update location detail' }),
    (0, common_1.Put)('/update-location/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete location' }),
    (0, common_1.Delete)('/delete-location/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get locations with pagination' }),
    (0, common_1.Get)('/pagination'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getLocationsWithPagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload location image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: update_location_dto_1.UploadLocationImageDto
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('locationImg', { storage: (0, file_upload_service_1.getStorageOptions)('location') })),
    (0, common_1.Post)('/upload/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "uploadImage", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt_node")),
    (0, swagger_1.ApiTags)('Location'),
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map