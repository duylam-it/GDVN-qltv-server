import mongoose from 'mongoose';

export default mongoose.model(
  'Book',
  new mongoose.Schema(
    {
      code: { type: 'String', required: 'code is required' }, // Mã
      name: { type: 'String', required: 'name is required' }, // Tên
      image: { type: ['String'], required: 'image is required' }, // Hình
      author: { type: 'String', required: 'author is required' }, // Tác giả
      language: { type: 'String', required: 'language is required' }, // Ngôn ngữ
      topic: { type: 'String', required: 'topic is required', ref: 'Topic' }, // Chủ đề
      category: { type: 'String', required: 'category is required', ref: 'Category' }, // Loại
      publishingCompany: { type: 'String', required: 'publishingCompany is required' }, // Nhà xuất bản
      releaseDate: { type: 'String' }, // Ngày phát hành
      numberOfPages: { type: 'Number', required: 'numberOfPages is required' }, // Số trang
      location: { type: 'String' }, // Vị trí
      borrowCount: { type: 'Number', default: 0 }, // Lượt mượn
      status: { type: 'String', default: 'Nguyên vẹn' }, // Tình trạng
      description: { type: 'String', required: 'description is required' }
    },
    { timestamps: true }
  )
);
