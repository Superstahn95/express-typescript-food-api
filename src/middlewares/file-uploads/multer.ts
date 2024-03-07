import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import { Request } from "express";
import { getImageExtension } from "../../utils";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    //setting a destination for my file
    //it is going to be a meal folder for now but pending other changes
    //if there is need to upload images or files for other features
    callback(null, "public/upload/meal");
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    callback: FilenameCallback
  ) {
    if (
      process.env.NODE_ENVIRONMENT &&
      process.env.NODE_ENVIRONMENT === "development"
    ) {
      console.log(file);
    }
    const imageExtension: string | boolean = getImageExtension(file.mimetype);
    if (!imageExtension) {
      callback(
        createHttpError(422, "Invalid request (File type is not supported)"),
        // @ts-ignore
        false
      );
      return;
    }
    callback(null, `${file.fieldname}-${uuidv4()}${imageExtension}`);
  },
});

//function for uploading files to our public directory
export const uploadImage = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10, // accept files up 10 mgb
  },
});

export const customMulterConfig = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 10, // accept files up 10 mgb
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) {
    const imageExtension: string | boolean = getImageExtension(file.mimetype);
    if (!imageExtension) {
      callback(
        // @ts-ignore
        createHttpError(422, "Invalid request (File type is not supported)"),
        false
      );
      return;
    }
    callback(null, true);
  },
});
