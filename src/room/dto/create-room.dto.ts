import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty()
    room_name: string;

    @ApiProperty()
    guest_capacity?: number;

    @ApiProperty()
    bedrooms?: number;

    @ApiProperty()
    beds?: number;

    @ApiProperty()
    bathrooms?: number;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    price?: number;

    @ApiProperty()
    washing_machine?: boolean;

    @ApiProperty()
    iron?: boolean;

    @ApiProperty()
    tv?: boolean;

    @ApiProperty()
    air_conditioner?: boolean;

    @ApiProperty()
    wifi?: boolean;

    @ApiProperty()
    kitchen?: boolean;

    @ApiProperty()
    parking?: boolean;

    @ApiProperty()
    pool?: boolean;

    @ApiProperty()
    image?: string;

    @ApiProperty()
    location_id: number;
}
