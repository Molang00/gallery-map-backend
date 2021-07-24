import { extname } from 'path';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, bool: boolean) => any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, arg: string) => any,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  // callback(null, `${randomName}`);
  callback(null, `${randomName}${fileExtName}`);
};
