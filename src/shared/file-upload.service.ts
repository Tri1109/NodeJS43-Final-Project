import { diskStorage } from 'multer';

export const getStorageOptions = (destination: string) => {
    return diskStorage({
        destination: `./public/imgs/${destination}`,
        filename: (req, file, cb) => {
            const filename = `${new Date().getTime()}_${file.originalname}`;
            cb(null, filename);
        },
    });
}