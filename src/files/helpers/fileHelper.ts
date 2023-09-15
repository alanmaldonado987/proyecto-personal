export const FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log({ file });

  if (!file) return callback(new Error('El archivo no se encontró'), false);

  const fileType = file.originalname.split('.')[1];

  console.log(fileType, ': filetype');

  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
  console.log(file.size);

  if (validExtension.includes(fileType)) {
    return callback(null, true);
  }

  callback(null, false);
};
