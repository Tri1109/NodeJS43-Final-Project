import { CreateLocationDto } from './create-location.dto';
declare const UpdateLocationDto_base: import("@nestjs/common").Type<Partial<CreateLocationDto>>;
export declare class UpdateLocationDto extends UpdateLocationDto_base {
    location_name?: string;
    city?: string;
    country?: string;
    image?: string;
}
export declare class UploadLocationImageDto {
    locationImg: any;
}
export {};
