import { PrismaService } from 'prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        location_id: number;
        location_name: string;
        city: string;
        country: string;
        image: string | null;
    }>;
    update(id: number, updateLocationDto: UpdateLocationDto): Promise<{
        message: string;
        location: {
            location_id: number;
            location_name: string;
            city: string;
            country: string;
            image: string | null;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getLocationsWithPagination(pageIndex: number, pageSize: number): Promise<{
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
    uploadImage(locationId: number, imagePath: string): Promise<{
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
