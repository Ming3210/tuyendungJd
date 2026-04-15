import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEnterpriseById, updateEnterpriseProfile, Enterprise } from '../../store/slices/enterpriseSlice';
import api from '../../services/api';
import { Button, Input, App } from 'antd';
import { Edit2, UploadCloud, X, Check } from 'lucide-react';

const EnterpriseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentEnterprise } = useAppSelector((state) => state.enterprise);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Enterprise>>({});
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnterpriseById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEnterprise) {
      setFormData(currentEnterprise);
      setAvatarPreview(currentEnterprise.avatar || '');
    }
  }, [currentEnterprise]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setFormData(currentEnterprise || {});
      setAvatarPreview(currentEnterprise?.avatar || '');
      setAvatarFile(null);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof Enterprise, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
      message.error("Chỉ chấp nhận file PNG hoặc JPG");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const submitData = { ...formData } as Enterprise;

      // If there's a new avatar file selected, upload it first to get a real URL
      if (avatarFile) {
        const uploadForm = new FormData();
        uploadForm.append('file', avatarFile);
        uploadForm.append('folder', 'enterprise-avatars');
        try {
          const uploadRes = await api.post('/api/upload', uploadForm, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          submitData.avatar = uploadRes.data.url || uploadRes.data;
        } catch (uploadErr) {
          message.error('Tải ảnh lên thất bại. Vui lòng thử lại.');
          return;
        }
      }

      await dispatch(updateEnterpriseProfile(submitData)).unwrap();
      message.success('Cập nhật thành công');
      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      message.error('Cập nhật thất bại');
    }
  };

  if (!currentEnterprise) return <div className="p-10 text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-full">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[100px]">
        {/* Avatar Section */}
        <div className="relative w-full md:w-[200px] gap-[24px] flex flex-col items-center md:items-start shrink-0">
          <p className="mb-2 md:mb-0 font-[600] text-[18px] font-sf-pro-display">Ảnh đại diện</p>
          <div className="relative group">
            <img
              src={avatarPreview || 'https://via.placeholder.com/200'}
              alt="Company Avatar"
              className={`w-[200px] h-[200px] rounded-full object-cover transition-opacity ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
              onClick={() => isEditing && fileInputRef.current?.click()}
            />
            {isEditing && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-[10px] right-0 bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-gray-50"
              >
                <UploadCloud className="w-5 h-5 text-gray-600" />
              </div>
            )}
            {!isEditing && (
              <div className="absolute bottom-[10px] right-0 bg-green-500 w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 border-white shadow-md">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          {isEditing && (
            <p className="text-center md:text-left mt-4 text-sm text-gray-500 font-sf-pro-display">
              Định dạng PNG hoặc JPG (Tối đa 5MB)
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-[12px] mb-8">
            {isEditing ? (
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-xl font-bold w-[300px] font-sf-pro-display"
                placeholder="Tên doanh nghiệp"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 font-sf-pro-display">{currentEnterprise.title}</h1>
            )}
            
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="text-[#bc2228] bg-red-50 hover:bg-red-100 py-[8px] px-[14px] rounded-lg flex items-center gap-2 transition font-sf-pro-display font-medium text-sm ml-4"
              >
                <Edit2 className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Mã số thuế</h3>
              {isEditing ? (
                <Input
                  value={formData.businessLicense}
                  onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                  placeholder="Mã số thuế"
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.businessLicense || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Lĩnh vực hoạt động</h3>
              {isEditing ? (
                <Input
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="Ví dụ: IT, Bất động sản..."
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.industry || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Quy mô công ty</h3>
              {isEditing ? (
                <Input
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  placeholder="Ví dụ: 100-500 nhân viên"
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.companySize || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Số điện thoại</h3>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Số điện thoại liên hệ"
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.phone || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Email liên hệ</h3>
              {isEditing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email"
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.email || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Website link</h3>
              {isEditing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://"
                />
              ) : (
                <a href={currentEnterprise.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-sf-pro-display truncate block">
                  {currentEnterprise.website || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Facebook link</h3>
              {isEditing ? (
                <Input
                  value={formData.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              ) : (
                <a href={currentEnterprise.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-sf-pro-display truncate block">
                  {currentEnterprise.facebookUrl || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Linkedin link</h3>
              {isEditing ? (
                <Input
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/..."
                />
              ) : (
                <a href={currentEnterprise.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-sf-pro-display truncate block">
                  {currentEnterprise.linkedinUrl || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Địa chỉ</h3>
              {isEditing ? (
                <Input.TextArea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Địa chỉ chi tiết..."
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display">{currentEnterprise.address || 'Chưa cập nhật'}</p>
              )}
            </div>
            
             <div className="col-span-1 md:col-span-2 space-y-1">
              <h3 className="text-gray-500 text-sm font-sf-pro-display mb-1">Mô tả công ty</h3>
              {isEditing ? (
                <Input.TextArea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Giới thiệu về công ty..."
                  autoSize={{ minRows: 4, maxRows: 10 }}
                />
              ) : (
                <p className="text-gray-900 font-medium font-sf-pro-display whitespace-pre-wrap">{currentEnterprise.description || 'Chưa cập nhật'}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 justify-end mt-10 pt-6 border-t border-gray-100">
              <Button onClick={handleEditToggle} size="large" className="w-[120px] font-sf-pro-display flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Hủy
              </Button>
              <Button onClick={handleSave} type="primary" size="large" className="w-[160px] bg-[#bc2228] hover:bg-red-700 font-sf-pro-display shadow-md">
                Cập nhật
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetail;
