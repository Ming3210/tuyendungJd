import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { Upload, Button, Card, Divider, Tag, Modal, message } from 'antd';
import { InboxOutlined, FilePdfOutlined, CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const CvProfile: React.FC = () => {
  const [cvList, setCvList] = useState<any[]>([
    {
      id: 1,
      name: 'CV_Nguyen_Van_A_Frontend.pdf',
      status: 'active',
      date: '12/04/2026',
      size: '1.2 MB'
    }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mockUploadProps = {
    name: 'file',
    multiple: false,
    action: '#', // Mock action since we don't have backend yet
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done' || status === 'error') {
        // Pretend it succeeded
        message.success(`${info.file.name} tệp đã tải lên thành công.`);
        setCvList([
          ...cvList,
          {
            id: Date.now(),
            name: info.file.name,
            status: 'active',
            date: new Date().toLocaleDateString('vi-VN'),
            size: `${(info.file.size / 1024 / 1024).toFixed(2)} MB`
          }
        ]);
      }
    },
    beforeUpload: () => {
      // Prevent actual upload since backend doesn't exist yet
      setTimeout(() => {
        message.success('Tệp tải lên thành công (Dữ liệu giả lập)');
      }, 1000);
      return false; // Stop auto upload
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xóa CV này?',
      content: 'Bạn có chắc chắn muốn xóa CV này vĩnh viễn?',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => {
        setCvList(cvList.filter(cv => cv.id !== id));
        message.success('Đã xóa CV thành công');
      }
    });
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 font-sf-pro-display">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 items-center justify-between flex">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 m-0">Quản lý Hồ sơ & CV</h1>
              <p className="text-gray-500 mt-2">Quản lý các hồ sơ CV của bạn để ứng tuyển nhanh chóng.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Tải lên CV mới</h2>
            <Dragger {...mockUploadProps} className="bg-red-50/30 border border-dashed border-red-200 hover:border-red-400">
              <p className="ant-upload-drag-icon text-red-600">
                <InboxOutlined className="text-5xl" />
              </p>
              <p className="ant-upload-text text-lg font-semibold text-gray-700">
                Nhấp hoặc kéo thả tệp vào khu vực này để tải lên
              </p>
              <p className="ant-upload-hint text-gray-500">
                Hỗ trợ tệp định dạng PDF, DOCX (Tối đa 5MB)
              </p>
            </Dragger>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">CV đã lưu trữ ({cvList.length})</h2>
          
          <div className="space-y-4">
            {cvList.map((cv) => (
              <div key={cv.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                    <FilePdfOutlined className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg m-0 flex items-center gap-2">
                      {cv.name}
                      {cv.status === 'active' && <CheckCircleOutlined className="text-green-500 text-sm" />}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>Cập nhật: {cv.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Dung lượng: {cv.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="primary" 
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border-none shadow-none font-semibold flex items-center gap-2"
                  >
                    <EyeOutlined /> Xem
                  </Button>
                  <Button 
                    danger 
                    type="text" 
                    className="hover:bg-red-50 flex items-center gap-2 font-semibold"
                    onClick={() => handleDelete(cv.id)}
                  >
                    <DeleteOutlined /> Xóa
                  </Button>
                </div>
              </div>
            ))}

            {cvList.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                <FilePdfOutlined className="text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500">Bạn chưa có CV nào. Hãy tải lên CV đầu tiên của bạn!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default CvProfile;
