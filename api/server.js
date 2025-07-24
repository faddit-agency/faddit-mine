const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-docs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', () => {
  console.log('MongoDB에 성공적으로 연결되었습니다.');
});

// 라우트
app.use('/api/work-orders', require('./routes/workOrders'));
app.use('/api/files', require('./routes/files'));
app.use('/api/users', require('./routes/users'));

// 정적 파일 제공
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Fashion Docs API 서버가 실행 중입니다.' });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 