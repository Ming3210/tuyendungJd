import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message, Checkbox } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginUser } from '../../../store/slices/authSlice';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      message.error('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    try {
      const response = await dispatch(loginUser({ usernameOrEmail: email, password })).unwrap();
      const user = response.user;

      if (user.lock) {
        message.error('Tài khoản của bạn đã bị khóa.');
        return;
      }

      if (remember) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      message.success('Đăng nhập thành công!');

      if (user.role === 'admin') {
        window.location.href = '/admin.html';
      } else {
        const redirect = searchParams.get('redirect');
        if (redirect) {
          navigate(decodeURIComponent(redirect));
        } else {
          navigate('/home-page');
        }
      }
    } catch (error: any) {
      message.error(error.message || 'Sai tên đăng nhập hoặc mật khẩu!');
    }
  };

  return (
    <div className="flex min-h-screen w-full h-[680px]">
      {/* Left side: Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-12 bg-gray-50 relative overflow-hidden">
        <div className="mb-1 absolute top-[-100px] left-0 w-[490px] h-[300px] pointer-events-none">
          <img className="w-[550px]" src="/src/assets/decor.svg" alt="" />
        </div>

        <div className="flex relative mb-8 left-[110px] z-10">
          <img src="/src/assets/rikkei.svg" alt="Rikkei" className="h-8" />
          <img src="/src/assets/jobs.svg" alt="Jobs" className="h-8 ml-1" />
        </div>

        <div className="mx-auto w-[451px] z-10">
          <h2 className="text-3xl font-bold mb-2">Đăng nhập</h2>
          <p className="text-gray-600 font-sf-pro-display mb-8">
            Cùng phát triển con đường sự nghiệp với Rikkei Jobs
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-sf-pro-display mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border rounded-md relative h-10">
                <UserOutlined className="text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2 border-none rounded-md outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label className="block font-sf-pro-display text-gray-700 mb-1" htmlFor="password">
                Mật khẩu
              </label>
              <div className="flex items-center border rounded-md relative h-10">
                <LockOutlined className="text-gray-400 absolute left-3" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full pl-10 pr-4 py-2 border-none rounded-md outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="text-gray-700 font-sf-pro-display"
              >
                Ghi nhớ đăng nhập
              </Checkbox>
              <a href="#" className="text-red-500 font-sf-pro-display">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md font-sf-pro-display transition duration-200 shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#bc2228] hover:bg-red-700'}`}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="text-center font-sf-pro-display text-gray-600 mt-8">
            Bạn chưa có tài khoản?{' '}
            <Link className="text-red-500 font-sf-pro-display" to="/register">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-1/2 relative bg-gray-200">
        <div
          className="w-full h-full bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://s3-alpha-sig.figma.com/img/aa61/7314/6c58510196398d3f31c24c25353a36a2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GFaNKyVNJF6f23X9b5Vtr5exJab~uvDzGe1XtwwRY3c~gplubOvWxG4rAA45SmzC7DOE6uZQeegeEtZw5lIACIlj2HO~03HIksO25-7TTLwygUdCM1CQlJlK7psnEIJ0AIHseFHzzbYVm2Xn6kW38aaTODmgK1WCNSlYGAhb37njMSz3ndCByskwJeYpC9zSOJUuwcxa~XGccf5na5fTrQCqHg4~M4RDUQkYMeqVVN9JnF6bfw2W5PQmkAujvQIM47WftO55Rkfk6hSDEpCA-Bp93hHtzIi71pXdm0qH0bFbnfP8oL5oQ73sYXVqh~5UmTB7Z17EAiVLCdCtjcrj4w__)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
