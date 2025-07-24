const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 디렉토리 생성
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 제한
  },
  fileFilter: function (req, file, cb) {
    // 허용된 파일 타입
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('지원하지 않는 파일 형식입니다.'));
    }
  }
});

// 파일 업로드
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: '파일이 성공적으로 업로드되었습니다.',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({ message: '파일 업로드 중 오류가 발생했습니다.', error: error.message });
  }
});

// 여러 파일 업로드
router.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }
    
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));
    
    res.json({
      message: '파일들이 성공적으로 업로드되었습니다.',
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ message: '파일 업로드 중 오류가 발생했습니다.', error: error.message });
  }
});

// 파일 삭제
router.delete('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: '파일이 성공적으로 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '파일을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '파일 삭제 중 오류가 발생했습니다.', error: error.message });
  }
});

// 파일 정보 조회
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      res.json({
        filename: filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        url: `/uploads/${filename}`
      });
    } else {
      res.status(404).json({ message: '파일을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '파일 정보 조회 중 오류가 발생했습니다.', error: error.message });
  }
});

module.exports = router; 