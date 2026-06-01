import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 z-10">
        <h2 className="text-xl font-semibold mb-3">Thông báo (Disclaimer)</h2>
        <p className="mb-4">
          Đây là bản deploy thử nghiệm. Chức năng đã đầy đủ nhưng nhiều ảnh đã để lâu nên có thể hiển thị lỗi hoặc không tải được. Xin thông
          cảm! Cảm ơn bạn đã ghé thăm và trải nghiệm sản phẩm của chúng tôi. Nếu bạn gặp bất kỳ vấn đề nào, vui lòng liên hệ với chúng tôi để được hỗ trợ. ^o^
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tôi hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
