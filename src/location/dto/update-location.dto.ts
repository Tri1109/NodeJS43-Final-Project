import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
    @ApiProperty({ required: false })
    location_name?: string;

    @ApiProperty({ required: false })
    city?: string;

    @ApiProperty({ required: false })
    country?: string;

    @ApiProperty({ required: false })
    image?: string;
}

export class UploadLocationImageDto {
    @ApiProperty({ type: 'string', format: 'binary', description: 'File hình ảnh của vị trí' })
    locationImg: any;
}
