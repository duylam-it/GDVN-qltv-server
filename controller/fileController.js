import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function uploadBookImages(req, res) {
  const files = req.files;
  if (!files) throw new Error('No files to upload');

  res.json({
    success: true,
    data: Array.from(files, ({ filename }) => filename).join(',')
  });
}

export function getFiles(req, res) {
  const { images } = req.body;
  const data = [];

  for (const image of images) {
    const bitmap = fs.readFileSync(path.join(__dirname, '../', 'public', 'uploads', image));
    const base64 = Buffer.from(bitmap).toString('base64');
    data.push({
      basename: path.basename(image),
      extname: path.extname(image),
      base64
    });
  }

  res.json({
    success: true,
    data
  });
}

export function test(req, res) {
  res.sendFile(path.join(__dirname, '../', 'public', 'uploads', 'book-1659433161032.png'));
}
