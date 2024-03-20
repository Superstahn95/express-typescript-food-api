import { unlink, stat, PathLike, Stats } from "fs";

export const deleteFile = (filePath: PathLike) => {
  console.log("trying to delete a file");
  stat(filePath, (err: NodeJS.ErrnoException | null, stats: Stats) => {
    if (
      process.env.NODE_ENVIRONMENT &&
      process.env.NODE_ENVIRONMENT === "development"
    ) {
      console.log(stats);
    }
    //if we get an error
    if (
      err &&
      process.env.NODE_ENVIRONMENT &&
      process.env.NODE_ENVIRONMENT === "development"
    ) {
      console.log("failed to find file... check below error message");
      console.log(err);
    } else {
      //once there is no error and file path is found, delete file using unlink method in the fs module
      unlink(filePath, (err: NodeJS.ErrnoException | null) => {
        if (
          err &&
          process.env.NODE_ENVIRONMENT &&
          process.env.NODE_ENVIRONMENT === "development"
        ) {
          console.log("Something went wrong and file couldn't be deleted");
          return console.log(err);
        }
        if (
          process.env.NODE_ENVIRONMENT &&
          process.env.NODE_ENVIRONMENT === "development"
        ) {
          console.log("File deleted successfully");
        }
      });
    }
  });
};

// stat(path: PathLike, callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void): void
