import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { message } from 'antd';
import bcrypt from 'bcryptjs';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    email: '',
    userName: '',
    password: '',
    rePassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const passwordsMatch = formState.password === formState.rePassword;
  
  // NOTE: In a real app we'd check usernames/emails against backend here via Redux or API.
  const isUsernameAvailable = formState.userName !== ''; 
  const isEmailAvailable = formState.email !== '';

  const validateForm = () => {
    if (!formState.email || !formState.password || !formState.rePassword) {
      message.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      message.error("Email không hợp lệ");
      return false;
    }

    if (formState.password.length < 6) {
      message.error("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formState.password !== formState.rePassword) {
      message.error("Mật khẩu xác nhận không khớp");
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formState.password, salt);

      const userData = {
        firstName: null,
        lastName: null,
        email: formState.email,
        userName: formState.userName,
        status: "inActive",
        createAt: null,
        updateAt: null,
        password: hashedPassword,
        avatar: "https://placehold.co/400",
        address: null,
        phone: null,
        role: "user",
        deleteAt: null,
        permissionList: null,
        foreignLanguage: null,
        yearsOfExperience: null,
        skills: null,
        gender: null,
        birthdate: null,
        position: null,
        level: null,
        fullName: null,
        saveJob: [],
        lock: false,
      };

      // Real API usage would dispatch the register thunk here.
      // For mock purposes:
      message.success("Đăng ký thành công");
      navigate("/login");
    } catch (error: any) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="flex min-h-screen w-full h-[680px]">
      <div className="flex flex-col justify-center w-full md:w-1/2 p-12 bg-white relative overflow-hidden">
        
        <div className="mx-auto w-[451px] z-10 relative">
          <div>
            <img
              className="absolute top-[-174px] left-[1px] w-[490px] h-[300px] pointer-events-none"
              src="/src/assets/decor.svg"
              alt=""
            />
          </div>

          {/* Logo container */}
          <div className="flex items-center mb-8 relative z-10">
            <img src="/src/assets/rikkei.svg" alt="Rikkei" className="h-8" />
            <img src="/src/assets/jobs.svg" alt="Jobs" className="h-8 ml-1" />
          </div>

          {/* Form content */}
          <h2 className="text-[32px] font-bold text-[#101828] mb-2 relative z-10">Đăng ký</h2>
          <p className="text-[#667085] text-base mb-8 relative z-10">
            Cùng phát triển con đường sự nghiệp với Rikkei Jobs
          </p>

          <form onSubmit={handleRegister} className="relative z-10">
            {/* Username */}
            <div className="mb-5 relative">
              <label
                className="block text-gray-900 font-sf-pro-display mb-1"
                htmlFor="userName"
              >Tên đăng nhập</label>
              <div className="flex items-center border border-[#D0D5DD] rounded-lg">
                <UserOutlined className="text-gray-400 w-5 h-5 ml-3 mr-2" />
                <input
                  value={formState.userName}
                  onChange={e => setFormState({...formState, userName: e.target.value})}
                  type="text"
                  id="userName"
                  placeholder="tên đăng nhập"
                  className="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                className="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center border border-[#D0D5DD] rounded-lg">
                <UserOutlined className="text-[#667085] w-5 h-5 ml-3 mr-2" />
                <input
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  className="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828] placeholder-[#667085]"
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="flex items-center border border-[#D0D5DD] rounded-lg relative">
                <LockOutlined className="text-[#667085] w-5 h-5 ml-3 mr-2" />
                <input
                  value={formState.password}
                  onChange={e => setFormState({...formState, password: e.target.value})}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="********"
                  className="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828]"
                />
                
                {showPassword ? (
                  <EyeOutlined
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 text-[#667085] cursor-pointer"
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 text-[#667085] cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                className="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
                htmlFor="Repassword"
              >
                Xác nhận mật khẩu
              </label>
              <div className="flex items-center border border-[#D0D5DD] rounded-lg relative">
                <LockOutlined className="text-[#667085] w-5 h-5 ml-3 mr-2" />
                <input
                  value={formState.rePassword}
                  onChange={e => setFormState({...formState, rePassword: e.target.value})}
                  type={showRePassword ? 'text' : 'password'}
                  id="Repassword"
                  placeholder="********"
                  className="w-full py-2.5 px-2 pr-10 rounded-lg outline-none text-[#101828]"
                />
                
                {formState.rePassword && (
                   passwordsMatch 
                   ? <CheckOutlined className="absolute right-10 text-green-500" />
                   : <CloseOutlined className="absolute right-10 text-red-500" />
                )}

                {showRePassword ? (
                  <EyeOutlined
                    onClick={() => setShowRePassword(false)}
                    className="absolute right-3 text-[#667085] cursor-pointer"
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setShowRePassword(true)}
                    className="absolute right-3 text-[#667085] cursor-pointer"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#BC2228] text-white py-2.5 rounded-lg font-sf-pro-display hover:bg-[#a61d22] transition duration-200"
            >
              Đăng ký
            </button>
            <p className="text-center font-sf-pro-display text-gray-600 mt-6 relative z-10">
              Đã có có tài khoản?{' '}
              <Link className="text-red-500 font-sf-pro-display" to="/login">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div
        className="hidden md:block w-1/2 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://s3-alpha-sig.figma.com/img/3534/ab76/cb2d49b52daf07fc61fafb25f1930020?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pbQSLgabg0hjK9B~SJ7lMKfT~9N2C6jDt6Ai7MUS2tsl4HDxu~Qn2z3BqHGoWWGk8xy6f-YDHq4V8Ff~Er1cKJWNi41KzsC3WQw3YoYeMTNj0syRGWDwudiFZOPgq48HpA9Rgx3-vQwR92kfUalNjt~gA33VEu1wnJmKlwYoYfDSLXuRcggqq57SEcyhSQ1DcxMvNuZ-CZnjKDyz2wo8TiS2x5Rkn2yF~u2GznYwqle33nDK8WyIElSvWglLRL0xJPwGaNEUwPBr~b5DBj4Of3s5FoYCqb5o2mop3~ejnddTrvsMDBYsYrcc~FqcDkZX0GzcvWRNRKBPJJ~mVUM8kQ__)',
        }}
      ></div>
    </div>
  );
};

export default Register;
