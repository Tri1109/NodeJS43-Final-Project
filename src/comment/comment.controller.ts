import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, ForbiddenException, UseGuards, NotFoundException, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt_node"))
@ApiTags("Comment")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Create new comment' })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const { rating } = createCommentDto;

    if (rating === undefined || rating === null || rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const userId = req.user.userId;
    createCommentDto.user_id = userId;

    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get comment by ID' })
  @Get('/get-comment/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update comment' })
  @Put('/update-comment/:id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req) {
    const userId = req.user.userId; // Lấy userId từ token

    // Lấy thông tin comment hiện tại
    const existingComment = await this.commentService.findOne(+id);

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Kiểm tra nếu người dùng hiện tại không phải là người tạo comment
    if (userId !== existingComment.user_id) {
      throw new ForbiddenException('You are not allowed to update this comment');
    }

    // Kiểm tra rating từ 1 đến 5
    const { rating } = updateCommentDto;
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Gọi service để cập nhật comment
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @Delete('/delete-comment/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @ApiOperation({ summary: 'Get comment by room ID' })
  @Get('/get-comment-by-room/:room_id')
  findByRoomId(@Param('room_id') room_id: string) {
    return this.commentService.findByRoomId(+room_id);
  }
}
