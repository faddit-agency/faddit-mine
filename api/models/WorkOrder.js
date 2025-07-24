const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['남성', '여성', '공용'],
    required: true
  },
  category: {
    type: String,
    enum: ['상의', '하의', '아우터', '신발'],
    required: true
  },
  apparel: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  seasonType: {
    type: String,
    enum: ['S/S', 'F/W'],
    required: true
  },
  // 추가 정보
  productName: String,
  sampleNumber: String,
  productNumber: String,
  manufacturer: String,
  requestDate: Date,
  deliveryDate: Date,
  contact1: String,
  contact2: String,
  contact3: String,
  contactInfo: String,
  
  // 파일 정보
  technicalDrawing: String,
  workNotes: String,
  labelPosition: String,
  fabric: String,
  pattern: String,
  
  // 사이즈 스펙
  sizeSpecs: [{
    measurement: String,
    xs: Number,
    s: Number,
    m: Number,
    l: Number,
    xl: Number,
    xxl: Number
  }],
  
  // 수량 정보
  quantities: [{
    color: String,
    xs: Number,
    s: Number,
    m: Number,
    l: Number,
    xl: Number,
    xxl: Number,
    total: Number
  }],
  
  // 부자재
  subMaterials: [{
    name: String,
    color: String,
    specification: String,
    quantity: Number
  }],
  
  // 원단 정보
  fabricInfo: [{
    location: String,
    company: String,
    color: String,
    sizePrice: String,
    blendRatio: String,
    yield: String
  }],
  
  // 메타데이터
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'completed', 'archived'],
    default: 'draft'
  },
  tags: [String],
  
  // 타임스탬프
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 업데이트 시 updatedAt 자동 설정
workOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('WorkOrder', workOrderSchema); 