import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    email?: string;

    @ApiProperty({ required: false })
    password?: string;

    @ApiProperty({ required: false })
    phone_number?: string;

    @ApiProperty({ required: false })
    birth_date?: string;

    @ApiProperty({ required: false })
    gender?: string;
}
