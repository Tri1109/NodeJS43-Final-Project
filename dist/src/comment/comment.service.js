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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommentService = class CommentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCommentDto) {
        try {
            const roomExists = await this.prismaService.room.findUnique({
                where: { room_id: createCommentDto.room_id },
            });
            if (!roomExists) {
                throw new common_1.NotFoundException(`Room with ID ${createCommentDto.room_id} does not exist`);
            }
            const newComment = await this.prismaService.comment.create({
                data: {
                    user_id: createCommentDto.user_id,
                    room_id: createCommentDto.room_id,
                    comment_date: new Date(),
                    content: createCommentDto.content,
                    rating: createCommentDto.rating,
                },
            });
            return { message: 'Comment created successfully', comment: newComment };
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
            return await this.prismaService.comment.findMany();
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
            const comment = await this.prismaService.comment.findUnique({
                where: { comment_id: id },
            });
            if (!comment) {
                throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
            }
            return comment;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async update(id, updateCommentDto) {
        try {
            const updatedComment = await this.prismaService.comment.update({
                where: { comment_id: id },
                data: {
                    content: updateCommentDto.content,
                    rating: updateCommentDto.rating,
                    comment_date: new Date(),
                },
            });
            return { message: 'Comment updated successfully', comment: updatedComment };
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
            const comment = await this.prismaService.comment.findUnique({
                where: { comment_id: id },
            });
            if (!comment) {
                throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
            }
            await this.prismaService.comment.delete({
                where: { comment_id: id },
            });
            return { message: 'Comment deleted successfully' };
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
    async findByRoomId(room_id) {
        try {
            const comments = await this.prismaService.comment.findMany({
                where: { room_id: room_id },
            });
            if (comments.length === 0) {
                throw new common_1.NotFoundException(`No comments found for Room ID ${room_id}`);
            }
            return comments;
        }
        catch (error) {
            console.log(error);
            if (error.status && error.status != 500)
                throw new common_1.HttpException(error.response, error.status);
            throw new common_1.HttpException("Server error", 500);
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map