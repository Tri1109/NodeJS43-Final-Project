import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<{
        message: string;
        location: {
            location_id: number;
            location_name: string;
            city: string;
            country: string;
            image: string | null;
        };
    }>;
    findAll(): Promise<{
        location_id: number;
        location_name: string;
        city: string;
        country: string;
        image: string | null;
    }[]>;
    findOne(id: string): Promise<{
        location_id: number;
        location_name: string;
        city: string;
        country: string;
        image: string | null;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        message: string;
        location: {
            location_id: number;
            location_name: string;
            city: string;
            country: string;
            image: string | null;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getLocationsWithPagination(pageIndex: string, pageSize: string): Promise<{
        pageIndex: number;
        pageSize: number;
        totalLocations: number;
        totalPages: number;
        locations: {
            location_id: number;
            location_name: string;
            city: string;
            country: string;
            image: string | null;
        }[];
    }>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        location: {
            location_id: number;
            location_name: string;
            city: string;
            country: string;
            image: string | null;
        };
    }>;
}
