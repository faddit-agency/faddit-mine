const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 사용자 프로필 조회
router.get('/profile', async (req, res) => {
  try {
    // 실제 구현에서는 인증된 사용자 ID를 사용
    const userId = req.user?.id || '64f8b2c1a3d4e5f6a7b8c9d0'; // 임시 사용자 ID
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '사용자 정보 조회 중 오류가 발생했습니다.', error: error.message });
  }
});

// 사용자 저장용량 업데이트
router.patch('/storage', async (req, res) => {
  try {
    const { storageUsed } = req.body;
    const userId = req.user?.id || '64f8b2c1a3d4e5f6a7b8c9d0'; // 임시 사용자 ID
    
    const user = await User.findByIdAndUpdate(
      userId,
      { storageUsed },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: '저장용량 업데이트 중 오류가 발생했습니다.', error: error.message });
  }
});

// 사용자 마지막 로그인 업데이트
router.patch('/last-login', async (req, res) => {
  try {
    const userId = req.user?.id || '64f8b2c1a3d4e5f6a7b8c9d0'; // 임시 사용자 ID
    
    const user = await User.findByIdAndUpdate(
      userId,
      { lastLogin: Date.now() },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: '로그인 시간 업데이트 중 오류가 발생했습니다.', error: error.message });
  }
});

module.exports = router; 