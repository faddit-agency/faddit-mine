const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');

// 모든 작업지시서 조회
router.get('/', workOrderController.getAllWorkOrders);

// 단일 작업지시서 조회
router.get('/:id', workOrderController.getWorkOrderById);

// 새 작업지시서 생성
router.post('/', workOrderController.createWorkOrder);

// 작업지시서 업데이트
router.put('/:id', workOrderController.updateWorkOrder);

// 작업지시서 삭제
router.delete('/:id', workOrderController.deleteWorkOrder);

// 작업지시서 상태 변경
router.patch('/:id/status', workOrderController.updateWorkOrderStatus);

// 사이즈 스펙 추가
router.post('/:id/size-specs', workOrderController.addSizeSpec);

// 수량 정보 추가
router.post('/:id/quantities', workOrderController.addQuantity);

module.exports = router; 