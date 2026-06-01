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
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        <div className="flex flex-col xl:flex-row gap-10 lg:gap-16">
        {/* Avatar Section */}
        <div className="relative w-full xl:w-64 flex flex-col items-center xl:items-start shrink-0">
          <p className="mb-4 font-bold text-lg text-gray-900">Ảnh đại diện</p>
          <div className="relative group rounded-full p-2 border-2 border-dashed border-gray-200 hover:border-[#bc2228] transition-colors">
            <img
              src={avatarPreview || 'https://via.placeholder.com/200'}
              alt="Company Avatar"
              className={`w-40 h-40 xl:w-48 xl:h-48 rounded-full object-cover shadow-sm transition-all ${isEditing ? 'cursor-pointer group-hover:opacity-80' : ''}`}
              onClick={() => isEditing && fileInputRef.current?.click()}
            />
            {isEditing && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-white w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 z-10"
              >
                <UploadCloud className="w-5 h-5 text-gray-700" />
              </div>
            )}
            {!isEditing && (
              <div className="absolute bottom-2 right-2 bg-emerald-500 w-10 h-10 flex items-center justify-center rounded-full border-2 border-white shadow-lg z-10">
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
            <p className="text-center xl:text-left mt-4 text-xs text-gray-500">
              Định dạng PNG hoặc JPG (Tối đa 5MB)
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full max-w-4xl">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
            {isEditing ? (
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-xl font-bold w-full max-w-md h-12 rounded-xl"
                placeholder="Tên doanh nghiệp"
              />
            ) : (
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 m-0 leading-tight">{currentEnterprise.title}</h1>
            )}
            
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="text-[#bc2228] bg-red-50 hover:bg-red-100 py-2 md:py-2.5 px-4 rounded-xl flex items-center gap-2 transition font-bold text-sm ml-auto shrink-0 shadow-sm border border-red-100"
              >
                <Edit2 className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Mã số thuế</h3>
              {isEditing ? (
                <Input
                  value={formData.businessLicense}
                  onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                  placeholder="Mã số thuế"
                  className="h-11 rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-[15px]">{currentEnterprise.businessLicense || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Lĩnh vực hoạt động</h3>
              {isEditing ? (
                <Input
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="Ví dụ: IT, Bất động sản..."
                  className="h-11 rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-[15px]">{currentEnterprise.industry || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Quy mô công ty</h3>
              {isEditing ? (
                <Input
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  placeholder="Ví dụ: 100-500 nhân viên"
                  className="h-11 rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-[15px]">{currentEnterprise.companySize || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Số điện thoại</h3>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Số điện thoại liên hệ"
                  className="h-11 rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-[15px]">{currentEnterprise.phone || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Email liên hệ</h3>
              {isEditing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email"
                  className="h-11 rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-semibold text-[15px]">{currentEnterprise.email || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Website</h3>
              {isEditing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://"
                  className="h-11 rounded-lg"
                />
              ) : (
                <a href={currentEnterprise.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline truncate block text-[15px]">
                  {currentEnterprise.website || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Facebook</h3>
              {isEditing ? (
                <Input
                  value={formData.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="h-11 rounded-lg"
                />
              ) : (
                <a href={currentEnterprise.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline truncate block text-[15px]">
                  {currentEnterprise.facebookUrl || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Linkedin</h3>
              {isEditing ? (
                <Input
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/..."
                  className="h-11 rounded-lg"
                />
              ) : (
                <a href={currentEnterprise.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline truncate block text-[15px]">
                  {currentEnterprise.linkedinUrl || 'Chưa cập nhật'}
                </a>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100 mt-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Địa chỉ</h3>
              {isEditing ? (
                <Input.TextArea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Địa chỉ chi tiết..."
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  className="rounded-lg"
                />
              ) : (
                <p className="text-gray-900 font-medium">{currentEnterprise.address || 'Chưa cập nhật'}</p>
              )}
            </div>
            
             <div className="col-span-1 md:col-span-2 space-y-2 mt-2">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Mô tả công ty</h3>
              {isEditing ? (
                <Input.TextArea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Giới thiệu về công ty..."
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  className="rounded-lg"
                />
              ) : (
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                   <p className="text-gray-900 leading-relaxed font-medium whitespace-pre-wrap">{currentEnterprise.description || 'Chưa cập nhật'}</p>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 justify-end mt-10 pt-6 border-t border-gray-100">
              <Button onClick={handleEditToggle} size="large" className="w-[120px] font-bold rounded-xl flex items-center justify-center gap-2 border-gray-200">
                <X className="w-4 h-4" /> Hủy
              </Button>
              <Button onClick={handleSave} type="primary" size="large" className="w-[160px] bg-[#bc2228] hover:bg-red-700 font-bold rounded-xl shadow-md border-none inline-flex items-center justify-center">
                Lưu thay đổi
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EnterpriseDetail;
