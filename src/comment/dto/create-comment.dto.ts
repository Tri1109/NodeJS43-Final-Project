import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    room_id: number;

    @ApiProperty({ required: false })
    content?: string;

    @ApiProperty({ required: true })
    rating: number;
}
