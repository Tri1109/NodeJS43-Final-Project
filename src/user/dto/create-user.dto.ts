import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ required: false })
    phone_number?: string;

    @ApiProperty({ required: false })
    birth_date?: string;

    @ApiProperty({ required: false })
    gender?: string;
}
