import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createCommentDto: CreateCommentDto): Promise<{
        message: string;
        comment: {
            comment_id: number;
            user_id: number;
            room_id: number;
            comment_date: Date;
            content: string | null;
            rating: number | null;
        };
    }>;
    findAll(): Promise<{
        comment_id: number;
        user_id: number;
        room_id: number;
        comment_date: Date;
        content: string | null;
        rating: number | null;
    }[]>;
    findOne(id: number): Promise<{
        comment_id: number;
        user_id: number;
        room_id: number;
        comment_date: Date;
        content: string | null;
        rating: number | null;
    }>;
    update(id: number, updateCommentDto: UpdateCommentDto): Promise<{
        message: string;
        comment: {
            comment_id: number;
            user_id: number;
            room_id: number;
            comment_date: Date;
            content: string | null;
            rating: number | null;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findByRoomId(room_id: number): Promise<{
        comment_id: number;
        user_id: number;
        room_id: number;
        comment_date: Date;
        content: string | null;
        rating: number | null;
    }[]>;
}
