import React, { useEffect } from 'react';
import { Upload, Button, message, Modal } from 'antd';
import { InboxOutlined, FilePdfOutlined, CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserCvs, addCv, deleteCv } from '../../../store/slices/userSlice';
import { viewDocument } from '../../../utils/fileUtils';

const { Dragger } = Upload;

const CvView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cvs } = useAppSelector((state) => state.user);
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserCvs(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: ".pdf,.docx",
    beforeUpload: (file: any) => {
      const isAllowed = file.type === 'application/pdf' || 
                        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isAllowed) {
        message.error(`${file.name} không phải định dạng PDF hoặc DOCX!`);
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Tệp phải nhỏ hơn 5MB!');
      }
      return isAllowed && isLt5M ? true : Upload.LIST_IGNORE;
    },
    customRequest: async (options: any) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'cvs');

      try {
        const response = await api.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const downloadURL = response.data.url || response.data;
        onSuccess({ url: downloadURL }, file);
      } catch (error: any) {
        console.error("Lỗi khi tải lên:", error);
        onError(error);
      }
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        const urlObj = info.file.response;
        const uploadUrl = typeof urlObj === 'string' ? urlObj : urlObj.url;
        
        const newCv = {
          userId: currentUser?.id,
          name: info.file.name,
          title: info.file.name.replace('.pdf', ''),
          pdf: info.file.name,
          pdfDataUrl: uploadUrl,
          language: 'Tiếng Việt',
          languageId: 1, // Default to Vietnamese per data.sql
          date: new Date().toISOString(),
          status: false,
        };

        dispatch(addCv(newCv as any))
          .unwrap()
          .then(() => {
            message.success(`${info.file.name} tệp đã tải lên và lưu trữ thành công.`);
            if (currentUser?.id) {
               dispatch(fetchUserCvs(currentUser.id)); // Refresh list
            }
          })
          .catch((err) => {
            message.error("Lưu trữ CV thất bại: " + err.message);
          });

      } else if (status === 'error') {
        message.error(`${info.file.name} tải lên thất bại. Hệ thống không thể kết nối tới server upload.`);
      }
    }
  };

  const handleDelete = (id: string | number) => {
    Modal.confirm({
      title: 'Xóa CV này?',
      content: 'Bạn có chắc chắn muốn xóa CV này vĩnh viễn?',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(deleteCv(id))
          .unwrap()
          .then(() => {
            message.success('Đã xóa CV thành công');
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi xóa CV');
          });
      }
    });
  };

  // Helper function to force PDF viewing or handle DOCX
  const handleView = (url: string) => {
    viewDocument(url);
  };

  return (
    <div className="font-sf-pro-display">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 m-0">Quản lý Hồ sơ & CV</h1>
        <p className="text-gray-500 mt-2">Quản lý các hồ sơ CV của bạn để ứng tuyển nhanh chóng.</p>
      </div>

      <div className="bg-red-50/50 rounded-xl border border-red-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Tải lên CV mới</h2>
        <Dragger {...uploadProps} className="bg-white border border-dashed border-red-300 hover:border-red-500">
          <p className="ant-upload-drag-icon text-red-600">
            <InboxOutlined className="text-4xl" />
          </p>
          <p className="ant-upload-text font-semibold text-gray-700">
            Nhấp hoặc kéo thả tệp vào khu vực này để tải lên
          </p>
          <p className="ant-upload-hint text-gray-500">
            Hỗ trợ tệp định dạng PDF, DOCX (Tối đa 5MB)
          </p>
        </Dragger>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4">CV đã lưu trữ ({cvs.length})</h2>
      
      <div className="space-y-4">
        {cvs.map((cv: any) => (
          <div key={cv.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-red-300 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 text-red-600 border border-gray-100 rounded-xl flex items-center justify-center">
                <FilePdfOutlined className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base m-0 flex items-center gap-2">
                  {cv.pdf || cv.title || 'CV chưa đặt tên'}
                  {cv.status === true && <CheckCircleOutlined className="text-green-500 text-sm" />}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>Cập nhật: {new Date(cv.date || cv.createAt || Date.now()).toLocaleDateString('vi-VN')}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Ngôn ngữ: {cv.language || 'Không rõ'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                type="default" 
                className="text-gray-600 font-semibold flex items-center shadow-sm"
                onClick={() => handleView(cv.pdfDataUrl)}
                disabled={!cv.pdfDataUrl}
              >
                <EyeOutlined /> Xem
              </Button>
              <Button danger type="text" className="font-semibold flex items-center hover:bg-red-50" onClick={() => handleDelete(cv.id)}>
                <DeleteOutlined /> Xóa
              </Button>
            </div>
          </div>
        ))}

        {cvs.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <FilePdfOutlined className="text-3xl text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Bạn chưa có CV nào. Hãy tải lên CV đầu tiên của bạn!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CvView;
