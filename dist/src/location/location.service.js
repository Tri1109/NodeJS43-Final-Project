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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LocationService = class LocationService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createLocationDto) {
        try {
            const existingLocation = await this.prismaService.location.findFirst({
                where: { location_name: createLocationDto.location_name },
            });
            if (existingLocation) {
                throw new common_1.BadRequestException('Location name already exists');
            }
            const newLocation = await this.prismaService.location.create({
                data: createLocationDto,
            });
            return { message: 'Location created successfully', location: newLocation };
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
            return await this.prismaService.location.findMany();
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
            const location = await this.prismaService.location.findUnique({
                where: { location_id: id },
            });
            if (!location) {
                throw new common_1.NotFoundException(`Location with ID ${id} not found`);
            }
            return location;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async update(id, updateLocationDto) {
        try {
            const location = await this.prismaService.location.findUnique({
                where: { location_id: id },
            });
            if (!location) {
                throw new common_1.NotFoundException(`Location with ID ${id} not found`);
            }
            const updatedLocation = await this.prismaService.location.update({
                where: { location_id: id },
                data: updateLocationDto,
            });
            return { message: 'Location updated successfully', location: updatedLocation };
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
            const location = await this.prismaService.location.findUnique({
                where: { location_id: id },
            });
            if (!location) {
                throw new common_1.NotFoundException(`Location with ID ${id} not found`);
            }
            await this.prismaService.location.delete({
                where: { location_id: id },
            });
            return { message: 'Location deleted successfully' };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async getLocationsWithPagination(pageIndex, pageSize) {
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
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async uploadImage(locationId, imagePath) {
        const updatedLocation = await this.prismaService.location.update({
            where: { location_id: locationId },
            data: {
                image: imagePath,
            },
        });
        return { message: 'Image uploaded and location updated successfully', location: updatedLocation };
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map