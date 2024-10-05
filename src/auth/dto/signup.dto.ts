import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone_number?: string;

    @ApiProperty()
    birth_date?: string;

    @ApiProperty()
    gender?: string;
}
