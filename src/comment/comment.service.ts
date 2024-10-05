import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) { }

  // Tạo comment mới
  async create(createCommentDto: CreateCommentDto) {
    try {
      const roomExists = await this.prismaService.room.findUnique({
        where: { room_id: createCommentDto.room_id },
      });

      if (!roomExists) {
        throw new NotFoundException(`Room with ID ${createCommentDto.room_id} does not exist`);
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
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy tất cả comment
  async findAll() {
    try {
      return await this.prismaService.comment.findMany();
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy comment theo id
  async findOne(id: number) {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: { comment_id: id },
      });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return comment;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Cập nhật comment
  async update(id: number, updateCommentDto: UpdateCommentDto) {
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
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Xóa comment
  async remove(id: number) {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: { comment_id: id },
      });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      await this.prismaService.comment.delete({
        where: { comment_id: id },
      });
      return { message: 'Comment deleted successfully' };
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }

  // Lấy comment theo room_id
  async findByRoomId(room_id: number) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: { room_id: room_id },
      });
      if (comments.length === 0) {
        throw new NotFoundException(`No comments found for Room ID ${room_id}`);
      }
      return comments;
    }
    catch (error) {
      console.log(error)
      if (error.status && error.status != 500)
        throw new HttpException(error.response, error.status)

      throw new HttpException("Server error", 500)
    }
  }
}
