import { PrismaService } from 'prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createBookingDto: CreateBookingDto): Promise<{
        message: string;
        booking: {
            booking_id: number;
            room_id: number;
            user_id: number;
            checkin_date: Date;
            checkout_date: Date;
            guest_count: number | null;
        };
    }>;
    findAll(): Promise<{
        booking_id: number;
        room_id: number;
        user_id: number;
        checkin_date: Date;
        checkout_date: Date;
        guest_count: number | null;
    }[]>;
    findOne(id: number): Promise<{
        booking_id: number;
        room_id: number;
        user_id: number;
        checkin_date: Date;
        checkout_date: Date;
        guest_count: number | null;
    }>;
    update(id: number, updateBookingDto: UpdateBookingDto): Promise<{
        message: string;
        booking: {
            booking_id: number;
            room_id: number;
            user_id: number;
            checkin_date: Date;
            checkout_date: Date;
            guest_count: number | null;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findByUserId(user_id: number): Promise<{
        booking_id: number;
        room_id: number;
        user_id: number;
        checkin_date: Date;
        checkout_date: Date;
        guest_count: number | null;
    }[]>;
}
