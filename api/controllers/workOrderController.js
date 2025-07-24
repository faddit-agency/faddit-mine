const WorkOrder = require('../models/WorkOrder');

// 모든 작업지시서 조회
exports.getAllWorkOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, category } = req.query;
    
    let query = {};
    
    // 검색 필터
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { item: { $regex: search, $options: 'i' } }
      ];
    }
    
    // 상태 필터
    if (status) {
      query.status = status;
    }
    
    // 카테고리 필터
    if (category) {
      query.category = category;
    }
    
    const workOrders = await WorkOrder.find(query)
      .populate('createdBy', 'name email')
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await WorkOrder.countDocuments(query);
    
    res.json({
      workOrders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count
    });
  } catch (error) {
    res.status(500).json({ message: '작업지시서 조회 중 오류가 발생했습니다.', error: error.message });
  }
};

// 단일 작업지시서 조회
exports.getWorkOrderById = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ message: '작업지시서 조회 중 오류가 발생했습니다.', error: error.message });
  }
};

// 새 작업지시서 생성
exports.createWorkOrder = async (req, res) => {
  try {
    const workOrderData = {
      ...req.body,
      createdBy: req.user.id // 인증된 사용자 ID
    };
    
    const workOrder = new WorkOrder(workOrderData);
    await workOrder.save();
    
    res.status(201).json(workOrder);
  } catch (error) {
    res.status(400).json({ message: '작업지시서 생성 중 오류가 발생했습니다.', error: error.message });
  }
};

// 작업지시서 업데이트
exports.updateWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    res.json(workOrder);
  } catch (error) {
    res.status(400).json({ message: '작업지시서 업데이트 중 오류가 발생했습니다.', error: error.message });
  }
};

// 작업지시서 삭제
exports.deleteWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findByIdAndDelete(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    res.json({ message: '작업지시서가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '작업지시서 삭제 중 오류가 발생했습니다.', error: error.message });
  }
};

// 작업지시서 상태 변경
exports.updateWorkOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    res.json(workOrder);
  } catch (error) {
    res.status(400).json({ message: '상태 변경 중 오류가 발생했습니다.', error: error.message });
  }
};

// 사이즈 스펙 추가
exports.addSizeSpec = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    workOrder.sizeSpecs.push(req.body);
    await workOrder.save();
    
    res.json(workOrder);
  } catch (error) {
    res.status(400).json({ message: '사이즈 스펙 추가 중 오류가 발생했습니다.', error: error.message });
  }
};

// 수량 정보 추가
exports.addQuantity = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ message: '작업지시서를 찾을 수 없습니다.' });
    }
    
    workOrder.quantities.push(req.body);
    await workOrder.save();
    
    res.json(workOrder);
  } catch (error) {
    res.status(400).json({ message: '수량 정보 추가 중 오류가 발생했습니다.', error: error.message });
  }
}; 