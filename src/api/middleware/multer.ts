import multer from "multer";
import config from "@/config";

const uploadPath = config.UPLOADS_PATH;
const allowedFileTypes = /jpeg|jpg|png/;

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
});

const fileFilter = (file, callback) => {
    const mimetype = allowedFileTypes.test(file.mimetype);

    if(mimetype) {
        return callback(null, true)
    }

    callback(`Wrong file type`);
}

export const uploadOne = (field: string) => multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (request, file, callback) => {
        fileFilter(file, callback);
    }
}).single(field);
