import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(createBookingDto: CreateBookingDto, req: any): Promise<{
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
    findOne(id: string): Promise<{
        booking_id: number;
        room_id: number;
        user_id: number;
        checkin_date: Date;
        checkout_date: Date;
        guest_count: number | null;
    }>;
    update(id: string, updateBookingDto: UpdateBookingDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    findByUserId(user_id: string): Promise<{
        booking_id: number;
        room_id: number;
        user_id: number;
        checkin_date: Date;
        checkout_date: Date;
        guest_count: number | null;
    }[]>;
}
