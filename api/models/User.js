const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  profileImage: {
    type: String,
    default: null
  },
  loginMethod: {
    type: String,
    enum: ['kakao', 'google', 'email'],
    required: true
  },
  storageUsed: {
    type: Number,
    default: 0
  },
  storageLimit: {
    type: Number,
    default: 1073741824 // 1GB in bytes
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 저장용량 사용률 계산
userSchema.virtual('storageUsagePercentage').get(function() {
  return (this.storageUsed / this.storageLimit) * 100;
});

// JSON 변환 시 가상 필드 포함
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema); 