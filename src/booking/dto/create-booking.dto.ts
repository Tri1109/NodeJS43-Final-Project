import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    room_id: number;

    @ApiProperty({ example: '2024-09-30T15:00:00Z', description: 'Check-in date in ISO format' })
    checkin_date: string;

    @ApiProperty({ example: '2024-10-05T12:00:00Z', description: 'Check-out date in ISO format' })
    checkout_date: string;

    @ApiProperty()
    guest_count: number;
}
