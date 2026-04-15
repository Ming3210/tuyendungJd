import React from 'react';
import { Row, Col, Input, Button, Form, message } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    message.success('Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất.');
    form.resetFields();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 font-sf-pro-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Liên hệ với chúng tôi</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Bạn có câu hỏi hoặc cần hỗ trợ? Đội ngũ Rikkei Jobs luôn sẵn sàng lắng nghe và trả lời mọi thắc mắc của bạn.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <Row>
            {/* Contact Info Side */}
            <Col xs={24} lg={10} className="bg-[#bc2228] p-10 lg:p-14 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Thông tin liên hệ</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <EnvironmentOutlined className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">Trụ sở chính</h3>
                      <p className="text-white/80 leading-relaxed">Tầng 3, Tòa nhà Sudico, Phố Mễ Trì, Phường Mỹ Đình 1, Quận Nam Từ Liêm, Thành phố Hà Nội</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <PhoneOutlined className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">Điện thoại</h3>
                      <p className="text-white/80">024 3783 1111 (Giờ hành chính)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MailOutlined className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">Email Hỗ trợ</h3>
                      <p className="text-white/80">support@rikkeijobs.vn</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Pattern or Social Icons could go here */}
              <div className="mt-16 pt-8 border-t border-white/20">
                <p className="font-semibold text-white/90">Kết nối với Rikkei Jobs qua các nền tảng mạng xã hội để cập nhật tin tức mới nhất.</p>
              </div>
            </Col>

            {/* Contact Form Side */}
            <Col xs={24} lg={14} className="p-10 lg:p-14">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Gửi lời nhắn</h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label={<span className="font-semibold text-gray-700">Họ và tên</span>}
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                      <Input placeholder="Nguyễn Văn A" className="rounded-xl border-gray-300 hover:border-red-400 focus:border-red-500 py-3" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label={<span className="font-semibold text-gray-700">Địa chỉ Email</span>}
                      rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                      ]}
                    >
                      <Input placeholder="example@email.com" className="rounded-xl border-gray-300 hover:border-red-400 focus:border-red-500 py-3" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="subject"
                  label={<span className="font-semibold text-gray-700">Chủ đề</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
                >
                  <Input placeholder="Bạn cần hỗ trợ về vấn đề gì?" className="rounded-xl border-gray-300 hover:border-red-400 focus:border-red-500 py-3" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="font-semibold text-gray-700">Nội dung tin nhắn</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn' }]}
                >
                  <Input.TextArea 
                    rows={6} 
                    placeholder="Viết nội dung chi tiết tại đây..." 
                    className="rounded-xl border-gray-300 hover:border-red-400 focus:border-red-500 p-4"
                  />
                </Form.Item>

                <Form.Item className="mb-0 mt-6 md:mt-10">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="bg-[#bc2228] hover:bg-red-700 h-14 px-10 text-lg font-bold rounded-xl w-full sm:w-auto shadow-md shadow-red-200"
                  >
                    <SendOutlined /> Gửi Tin Nhắn
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3216892697855!2d105.77660201103732!3d21.019808388049615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345511b85352c1%3A0xe6bfbc0c6e1ed3fb!2zU09MQSBNYW5zaW9uIEjDoCDEkMO0bmcgLSBUdXnhu4duIEThu6VuZyBSaWtrZWlzb2Z0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '1rem' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
