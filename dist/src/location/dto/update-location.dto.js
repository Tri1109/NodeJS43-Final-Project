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
exports.UploadLocationImageDto = exports.UpdateLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_location_dto_1 = require("./create-location.dto");
class UpdateLocationDto extends (0, swagger_1.PartialType)(create_location_dto_1.CreateLocationDto) {
}
exports.UpdateLocationDto = UpdateLocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "location_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "image", void 0);
class UploadLocationImageDto {
}
exports.UploadLocationImageDto = UploadLocationImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'File hình ảnh của vị trí' }),
    __metadata("design:type", Object)
], UploadLocationImageDto.prototype, "locationImg", void 0);
//# sourceMappingURL=update-location.dto.js.map