const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "unibul-press-ltd",
  api_key: "295548178325693",
  api_secret: "qXY-wZ1p3cNpMPiksF9NvfjftvQ"
});

function uploadFileBuffer(fileBuffer) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream((error, result) => {
        if (error) {
          reject(error.message);
        }
        resolve(result.url);
      })
      .end(fileBuffer);
  });
}

module.exports = {
  uploadFileBuffer
};
