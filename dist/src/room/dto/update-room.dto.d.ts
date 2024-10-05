import { CreateRoomDto } from './create-room.dto';
declare const UpdateRoomDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
    room_name: string;
    guest_capacity?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    description?: string;
    price?: number;
    washing_machine?: boolean;
    iron?: boolean;
    tv?: boolean;
    air_conditioner?: boolean;
    wifi?: boolean;
    kitchen?: boolean;
    parking?: boolean;
    pool?: boolean;
    image?: string;
    location_id: number;
}
export declare class UploadRoomImageDto {
    roomImg: any;
}
export {};
