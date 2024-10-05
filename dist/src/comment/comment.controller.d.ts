import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, req: any): Promise<{
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
    findOne(id: string): Promise<{
        comment_id: number;
        user_id: number;
        room_id: number;
        comment_date: Date;
        content: string | null;
        rating: number | null;
    }>;
    update(id: string, updateCommentDto: UpdateCommentDto, req: any): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
    findByRoomId(room_id: string): Promise<{
        comment_id: number;
        user_id: number;
        room_id: number;
        comment_date: Date;
        content: string | null;
        rating: number | null;
    }[]>;
}
