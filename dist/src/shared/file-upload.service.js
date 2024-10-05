"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageOptions = void 0;
const multer_1 = require("multer");
const getStorageOptions = (destination) => {
    return (0, multer_1.diskStorage)({
        destination: `./public/imgs/${destination}`,
        filename: (req, file, cb) => {
            const filename = `${new Date().getTime()}_${file.originalname}`;
            cb(null, filename);
        },
    });
};
exports.getStorageOptions = getStorageOptions;
//# sourceMappingURL=file-upload.service.js.map