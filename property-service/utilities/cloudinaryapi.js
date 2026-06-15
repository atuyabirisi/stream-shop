import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dukeimnah",
  api_key: 165483617154612,
  api_secret: "kWpzgIuBdR0Fb386crIJgdAy_S8",
});

const uploadImage = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "articles" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });

export default uploadImage;
