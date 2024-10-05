import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt_node"))
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get('/get-user/:id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @Put('/update-user/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete('/delete-user/:id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: 'Search user by name' })
  @Get('search/:name')
  @HttpCode(200)
  searchByName(@Param('name') name: string) {
    return this.userService.searchByName(name);
  }

  @ApiOperation({ summary: 'Get users with pagination' })
  @Get('pagination')
  @HttpCode(200)
  getUsersWithPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string
  ) {

    const page = parseInt(pageIndex, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;  // Mặc định mỗi trang có 10 bản ghi nếu không cung cấp

    return this.userService.getUsersWithPagination(page, size);
  }


}
