import multer from 'multer';

const storage = multer.memoryStorage();

// single upload
export const singleUpload = multer({storage}).single('file')

// Multiple upload upto 5 images
export const MultipleUpload = multer({storage}).array('file',5)