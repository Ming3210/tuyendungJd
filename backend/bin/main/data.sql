-- =============================================
-- SEED DATA FOR nhom5_db
-- =============================================

-- USERS
INSERT IGNORE INTO users (id, first_name, last_name, full_name, email, user_name, status, password, address, phone, role, is_lock, gender, level, skills, years_of_experience, avatar, position, birthdate) VALUES
(1, 'Nguyen', 'An', 'Nguyen Van An', 'admin@gmail.com', 'admin', 'active', '$2a$10$ZsLgDJc.fXJgO9Ii95AUt.SxmnNj7bM9bDVG9ieHGKbyzRJPSH38S', 'Ha Noi', '0901234567', 'admin', false, 'male', 'Lead', 'Java, Spring Boot', 5, 'https://placehold.co/400', 'Project Manager', '1990-01-15'),
(2, 'Tran', 'Binh', 'Tran Thi Binh', 'binh@gmail.com', 'trbinh', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0912345678', 'user', false, 'female', 'Senior', 'React, Vue.js', 4, 'https://placehold.co/400', 'Frontend Developer', '1993-03-20'),
(3, 'Le', 'Cuong', 'Le Van Cuong', 'cuong@gmail.com', 'levc', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Da Nang', '0923456789', 'user', false, 'male', 'Mid', 'Node.js, MongoDB', 3, 'https://placehold.co/400', 'Backend Developer', '1995-07-10'),
(4, 'Pham', 'Duong', 'Pham Thi Duong', 'duong@gmail.com', 'phtd', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0934567890', 'user', false, 'female', 'Junior', 'Python, Django', 2, 'https://placehold.co/400', 'Full-stack Developer', '1997-11-05'),
(5, 'Hoang', 'Em', 'Hoang Van Em', 'em@gmail.com', 'hvem', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Can Tho', '0945678901', 'partner', false, 'male', 'Senior', 'C++, Embedded', 6, 'https://placehold.co/400', 'Embedded Engineer', '1989-05-25'),
(6, 'Vu', 'Phuong', 'Vu Thi Phuong', 'phuong@gmail.com', 'vtp', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hai Phong', '0956789012', 'partner', false, 'female', 'Lead', 'DevOps, Docker', 7, 'https://placehold.co/400', 'DevOps Engineer', '1988-09-15'),
(7, 'Nguyen', 'Giang', 'Nguyen Thi Giang', 'giang@gmail.com', 'ntg', 'inActive', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0967890123', 'user', false, 'female', 'Fresher', 'HTML, CSS, JS', 1, 'https://placehold.co/400', 'Frontend Developer', '2001-02-28'),
(8, 'Do', 'Hung', 'Do Van Hung', 'hung@gmail.com', 'dvhung', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0978901234', 'user', false, 'male', 'Junior', 'Android, Kotlin', 2, 'https://placehold.co/400', 'Mobile Developer', '1999-06-12'),
(9, 'Bui', 'Lan', 'Bui Thi Lan', 'lan@gmail.com', 'btlan', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Da Nang', '0989012345', 'user', false, 'female', 'Mid', 'iOS, Swift', 3, 'https://placehold.co/400', 'iOS Developer', '1996-08-18'),
(10, 'Trinh', 'Minh', 'Trinh Van Minh', 'minh@gmail.com', 'tvm', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0990123456', 'user', false, 'male', 'Senior', 'Data Science, Python', 5, 'https://placehold.co/400', 'Data Scientist', '1992-04-30'),
(11, 'Ly', 'Ngoc', 'Ly Thi Ngoc', 'ngoc@gmail.com', 'ltn', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0901122334', 'user', false, 'female', 'Junior', 'UI/UX, Figma', 1, 'https://placehold.co/400', 'UX Designer', '2000-12-01'),
(12, 'Dang', 'Oanh', 'Dang Thi Oanh', 'oanh@gmail.com', 'dtoanh', 'inActive', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Can Tho', '0912233445', 'user', false, 'female', 'Fresher', 'Testing, QA', 1, 'https://placehold.co/400', 'QA Engineer', '2002-03-15'),
(13, 'Ngo', 'Phuc', 'Ngo Van Phuc', 'phuc@gmail.com', 'nvphuc', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0923344556', 'partner', false, 'male', 'Lead', 'AWS, Cloud', 8, 'https://placehold.co/400', 'Cloud Architect', '1987-07-22'),
(14, 'Dinh', 'Quynh', 'Dinh Thi Quynh', 'quynh@gmail.com', 'dtq', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hai Phong', '0934455667', 'user', false, 'female', 'Mid', 'PHP, Laravel', 3, 'https://placehold.co/400', 'Backend Developer', '1994-10-10'),
(15, 'Cao', 'Son', 'Cao Van Son', 'son@gmail.com', 'cvson', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0945566778', 'user', false, 'male', 'Senior', '.NET, C#', 6, 'https://placehold.co/400', '.NET Developer', '1991-01-08');

-- ENTERPRISES
INSERT IGNORE INTO enterprises (id, title, email, company_size, phone_number, industry, introduction, website_url, facebook_url, linkedin_url, twitter_url, business_license, address, user_id, avatar, status) VALUES
(1, 'FPT Software', 'hr@fpt.com', '10000', '02437273700', 'IT', 'FPT Software la cong ty phan mem hang dau Viet Nam', 'https://fpt-software.com', 'https://facebook.com/fptsoftware', 'https://linkedin.com/company/fpt', 'https://twitter.com/fpt', 'BL001', '17 Duy Tan, Ha Noi', 5, 'https://placehold.co/400', 'verified'),
(2, 'VNG Corporation', 'recruit@vng.com', '5000', '02839400000', 'IT', 'VNG la tap doan cong nghe hang dau Dong Nam A', 'https://vng.com.vn', 'https://facebook.com/vng', 'https://linkedin.com/company/vng', 'https://twitter.com/vng', 'BL002', '182 Le Dai Hanh, Q11, HCM', 6, 'https://placehold.co/400', 'verified'),
(3, 'Tiki Corporation', 'jobs@tiki.vn', '3000', '02818004141', 'E-Commerce', 'Tiki la san thuong mai dien tu hang dau Viet Nam', 'https://tiki.vn', 'https://facebook.com/tiki', 'https://linkedin.com/company/tiki', 'https://twitter.com/tiki', 'BL003', '52 Ut Tich, Q. Tan Binh, HCM', 13, 'https://placehold.co/400', 'verified'),
(4, 'Momo E-wallet', 'hr@momo.vn', '2000', '02873000800', 'Fintech', 'MoMo la vi dien tu so 1 Viet Nam', 'https://momo.vn', 'https://facebook.com/momo', 'https://linkedin.com/company/momo', 'https://twitter.com/momo', 'BL004', '163 Tran Trong Cuong, HCM', 5, 'https://placehold.co/400', 'verified'),
(5, 'Shopee Vietnam', 'jobs@shopee.vn', '8000', '19001221', 'E-Commerce', 'Shopee la nen tang mua sam truc tuyen hang dau', 'https://shopee.vn', 'https://facebook.com/shopee', 'https://linkedin.com/company/shopee', 'https://twitter.com/shopee', 'BL005', '14 Cong Truong Me Linh, Q1, HCM', 6, 'https://placehold.co/400', 'verified'),
(6, 'Grab Vietnam', 'hr@grab.com', '6000', '02871088888', 'Logistics', 'Grab la nen tang giao thong va giao do an hang dau', 'https://grab.com', 'https://facebook.com/grab', 'https://linkedin.com/company/grab', 'https://twitter.com/grab', 'BL006', '58 Nguyen Dinh Chieu, Q3, HCM', 13, 'https://placehold.co/400', 'verified'),
(7, 'Viettel Digital', 'recruit@viettel.com', '15000', '18008089', 'Telecom', 'Viettel la tap doan vien thong lon nhat Viet Nam', 'https://viettel.com.vn', 'https://facebook.com/viettel', 'https://linkedin.com/company/viettel', 'https://twitter.com/viettel', 'BL007', '1 Giang Van Minh, Ba Dinh, HN', 5, 'https://placehold.co/400', 'verified'),
(8, 'VNPT Technology', 'hr@vnpt.vn', '12000', '18001166', 'Telecom', 'VNPT la tap doan buu chinh vien thong quoc gia', 'https://vnpt.com.vn', 'https://facebook.com/vnpt', 'https://linkedin.com/company/vnpt', 'https://twitter.com/vnpt', 'BL008', '57 Huynh Thuc Khang, HN', 6, 'https://placehold.co/400', 'pending'),
(9, 'Techcombank', 'jobs@techcombank.com', '9000', '18006677', 'Finance', 'Techcombank la ngan hang tu nhan hang dau Viet Nam', 'https://techcombank.com', 'https://facebook.com/techcombank', 'https://linkedin.com/company/techcombank', 'https://twitter.com/tcb', 'BL009', '191 Ba Trieu, Hai Ba Trung, HN', 13, 'https://placehold.co/400', 'verified'),
(10, 'NashTech Global', 'hr@nashtechglobal.com', '2500', '02489899899', 'IT', 'NashTech la cong ty phan mem voi doi ngu chuyen gia', 'https://nashtechglobal.com', 'https://facebook.com/nashtech', 'https://linkedin.com/company/nashtech', 'https://twitter.com/nashtech', 'BL010', '29 Ly Tu Trong, Q1, HCM', 5, 'https://placehold.co/400', 'verified');

-- CV LANGUAGES
INSERT IGNORE INTO cv_languages (id, language, code, status) VALUES
(1, 'Tiếng Anh', 'en', true),
(2, 'Tiếng Nhật', 'jp', true),
(3, 'Tiếng Việt', 'vn', true),
(4, 'Tiếng Hàn', 'kr', false),
(5, 'Tiếng Trung', 'cn', false),
(6, 'Tiếng Đức', 'de', false),
(7, 'Tiếng Pháp', 'fr', false);

-- CVs
INSERT IGNORE INTO cvs (id, language_id, language, title, pdf, pdf_data_url, user_id, date, status) VALUES
(1, 1, 'Tiếng Anh', 'CV Backend Developer', 'cv_backend_an.pdf', 'https://firebasestorage.googleapis.com/sample1.pdf', 1, '2024-10-01', true),
(2, 1, 'Tiếng Anh', 'CV Senior Frontend', 'cv_frontend_binh.pdf', 'https://firebasestorage.googleapis.com/sample2.pdf', 2, '2024-10-05', true),
(3, 2, 'Tiếng Nhật', 'CV IT Engineer', 'cv_cuong_jp.pdf', 'https://firebasestorage.googleapis.com/sample3.pdf', 3, '2024-10-10', true),
(4, 1, 'Tiếng Anh', 'CV Python Developer', 'cv_duong_en.pdf', 'https://firebasestorage.googleapis.com/sample4.pdf', 4, '2024-10-12', true),
(5, 3, 'Tiếng Việt', 'CV Ky Su Nhung', 'cv_em_vn.pdf', 'https://firebasestorage.googleapis.com/sample5.pdf', 5, '2024-10-15', true),
(6, 1, 'Tiếng Anh', 'CV DevOps Engineer', 'cv_phuong_en.pdf', 'https://firebasestorage.googleapis.com/sample6.pdf', 6, '2024-10-18', true),
(7, 1, 'Tiếng Anh', 'CV Junior Frontend', 'cv_giang_en.pdf', 'https://firebasestorage.googleapis.com/sample7.pdf', 7, '2024-10-20', false),
(8, 2, 'Tiếng Nhật', 'CV Mobile Developer', 'cv_hung_jp.pdf', 'https://firebasestorage.googleapis.com/sample8.pdf', 8, '2024-10-22', true),
(9, 1, 'Tiếng Anh', 'CV iOS Developer', 'cv_lan_en.pdf', 'https://firebasestorage.googleapis.com/sample9.pdf', 9, '2024-10-25', true),
(10, 1, 'Tiếng Anh', 'CV Data Scientist', 'cv_minh_en.pdf', 'https://firebasestorage.googleapis.com/sample10.pdf', 10, '2024-10-28', true),
(11, 3, 'Tiếng Việt', 'CV UX Designer', 'cv_ngoc_vn.pdf', 'https://firebasestorage.googleapis.com/sample11.pdf', 11, '2024-11-01', true),
(12, 1, 'Tiếng Anh', 'CV QA Engineer', 'cv_oanh_en.pdf', 'https://firebasestorage.googleapis.com/sample12.pdf', 12, '2024-11-03', false),
(13, 1, 'Tiếng Anh', 'CV Cloud Architect', 'cv_phuc_en.pdf', 'https://firebasestorage.googleapis.com/sample13.pdf', 13, '2024-11-05', true),
(14, 3, 'Tiếng Việt', 'CV PHP Developer', 'cv_quynh_vn.pdf', 'https://firebasestorage.googleapis.com/sample14.pdf', 14, '2024-11-08', true),
(15, 1, 'Tiếng Anh', 'CV DotNet Developer', 'cv_son_en.pdf', 'https://firebasestorage.googleapis.com/sample15.pdf', 15, '2024-11-10', true);

-- CERTIFICATE TYPES
INSERT IGNORE INTO certificate_types (id, type, language, status, code) VALUES
(1, 'TOEIC', 'Tiếng Anh', true, 'en'),
(2, 'IELTS', 'Tiếng Anh', true, 'en'),
(3, 'JLPT', 'Tiếng Nhật', true, 'jp'),
(4, 'TOPIK', 'Tiếng Hàn', true, 'kr'),
(5, 'HSK', 'Tiếng Trung', true, 'cn'),
(6, 'DELF', 'Tiếng Pháp', true, 'fr'),
(7, 'TestDaF', 'Tiếng Đức', true, 'de');

-- CERTIFICATE TYPE VALUES
INSERT IGNORE INTO certificate_type_value (certificate_type_id, value) VALUES
(1, '300-400'), (1, '400-500'), (1, '500-600'), (1, '600-700'), (1, '700-800'), (1, '800-900'), (1, '900-990'),
(2, '3.0-4.0'), (2, '4.0-5.0'), (2, '5.0-6.0'), (2, '6.0-7.0'), (2, '7.0-8.0'), (2, '8.0-9.0'),
(3, 'N5'), (3, 'N4'), (3, 'N3'), (3, 'N2'), (3, 'N1'),
(4, 'TOPIK I'), (4, 'TOPIK II'),
(5, 'HSK1'), (5, 'HSK2'), (5, 'HSK3'), (5, 'HSK4'), (5, 'HSK5'), (5, 'HSK6'),
(6, 'A1'), (6, 'A2'), (6, 'B1'), (6, 'B2'), (6, 'C1'), (6, 'C2'),
(7, 'A2'), (7, 'B1'), (7, 'B2'), (7, 'C1');

-- USER CERTIFICATES
INSERT IGNORE INTO user_certificates (id, certificate_type, certificate_value, received_date, expiration_date, user_id, certificate_id) VALUES
(1, 'TOEIC', '750', '2022-06-15', '2024-06-15', 1, 1),
(2, 'JLPT', 'N2', '2021-12-01', '2099-12-31', 1, 3),
(3, 'IELTS', '7.0', '2023-03-20', '2025-03-20', 2, 2),
(4, 'TOEIC', '850', '2022-09-10', '2024-09-10', 2, 1),
(5, 'JLPT', 'N3', '2023-07-15', '2099-12-31', 3, 3),
(6, 'IELTS', '6.5', '2022-11-05', '2024-11-05', 4, 2),
(7, 'TOPIK', 'TOPIK II', '2023-04-01', '2099-12-31', 5, 4),
(8, 'TOEIC', '600', '2023-08-20', '2025-08-20', 6, 1),
(9, 'IELTS', '5.5', '2023-01-15', '2025-01-15', 7, 2),
(10, 'JLPT', 'N4', '2022-07-10', '2099-12-31', 8, 3),
(11, 'HSK', 'HSK4', '2023-05-20', '2099-12-31', 9, 5),
(12, 'TOEIC', '700', '2022-10-15', '2024-10-15', 10, 1),
(13, 'IELTS', '7.5', '2023-06-01', '2025-06-01', 11, 2),
(14, 'TOEIC', '500', '2023-09-10', '2025-09-10', 12, 1),
(15, 'JLPT', 'N1', '2020-12-01', '2099-12-31', 13, 3),
(16, 'IELTS', '8.0', '2022-04-15', '2024-04-15', 14, 2),
(17, 'TOEIC', '900', '2021-06-20', '2023-06-20', 15, 1),
(18, 'HSK', 'HSK5', '2022-11-10', '2099-12-31', 3, 5),
(19, 'TOPIK', 'TOPIK I', '2023-03-15', '2099-12-31', 9, 4),
(20, 'DELF', 'B2', '2022-08-25', '2099-12-31', 2, 6);

-- JOBS (description, rank, benefitsDescription, required stored as JSON strings)
INSERT IGNORE INTO jobs (id, title, quantity, gender, skills, salary_current, salary, province, district, image, address, working_time, deadline, industry, enterprise_id, flight, update_date, description, `rank`, benefits_description, required) VALUES
(1,  'Java Backend Developer', 5, 'Không yêu cầu', 'Nâng cao', 'VND', '20-30 triệu', 'Hà Nội', 'Hoàn Kiếm', 'https://placehold.co/600x400', '17 Duy Tan', 'Full time', '30/06/2025', 'IT', '1', 'verified', '2025-01-10', '["Phát triển API RESTful với Spring Boot","Thiết kế CSDL MySQL","Làm việc Agile sprint 2 tuần"]', '["Junior","Mid"]', '["Lương tháng 13, thưởng KPI","Bảo hiểm sức khỏe cao cấp","Hỗ trợ cert quốc tế"]', '["Thành thạo Java 11+, Spring Boot","Hiểu RESTful API, Microservices","Kinh nghiệm Git, Maven/Gradle"]'),
(2,  'React Frontend Developer', 3, 'Không yêu cầu', 'Trung cấp', 'VND', '15-22 triệu', 'Hồ Chí Minh', 'Quận 1', 'https://placehold.co/600x400', '182 Le Dai Hanh', 'Full time', '25/06/2025', 'IT', '2', 'verified', '2025-01-12', '["Xây dựng UI với ReactJS TypeScript","Tích hợp API quản lý state Redux","Đảm bảo responsive cross-browser"]', '["Junior","Mid"]', '["Môi trường startup năng động","Stock option sau 1 năm","WFH 2 ngày/tuần"]', '["Thành thạo ReactJS TypeScript","Kinh nghiệm Redux React Query","CSS Tailwind hoặc Material UI"]'),
(3,  'DevOps Engineer', 2, 'Không yêu cầu', 'Chuyên sâu', 'VND', '30-45 triệu', 'Hồ Chí Minh', 'Quận 3', 'https://placehold.co/600x400', '52 Ut Tich', 'Full time', '15/07/2025', 'IT', '3', 'verified', '2025-01-15', '["Triển khai CI/CD Jenkins GitLab","Quản lý Docker Kubernetes","Giám sát Prometheus Grafana"]', '["Senior","Lead"]', '["Lương cạnh tranh review 2 lần/năm","Teambuilding hàng quý","Nghỉ phép linh hoạt"]', '["Thành thạo Docker Kubernetes","Kinh nghiệm Jenkins hoặc GitLab CI","Linux administration"]'),
(4,  'Data Analyst', 4, 'Không yêu cầu', 'Nâng cao', 'VND', '18-28 triệu', 'Hà Nội', 'Cầu Giấy', 'https://placehold.co/600x400', '163 Tran Trong Cuong', 'Full time', '20/07/2025', 'IT', '4', 'verified', '2025-01-18', '["Phân tích dữ liệu kinh doanh Python/R","Tạo báo cáo dashboard PowerBI","Hỗ trợ team ra quyết định"]', '["Junior","Mid"]', '["Data-driven culture","Phụ cấp ăn trưa và đi lại","Gaming room gym membership"]', '["Thành thạo Python SQL","Kinh nghiệm PowerBI Tableau","Tư duy phân tích logic tốt"]'),
(5,  'UI/UX Designer', 3, 'Không yêu cầu', 'Trung cấp', 'VND', '15-25 triệu', 'Hà Nội', 'Hoàn Kiếm', 'https://placehold.co/600x400', '14 Cong Truong Me Linh', 'Full time', '10/07/2025', 'Design', '5', 'verified', '2025-01-20', '["Thiết kế wireframe prototype Figma","Nghiên cứu UX tối ưu trải nghiệm","Phối hợp với dev team"]', '["Junior","Mid"]', '["Môi trường sáng tạo đa dạng","MacBook Pro cho designer","Budget học tập 5tr/năm"]', '["Thành thạo Figma Adobe XD","Kiến thức UX research","Portfolio thiết kế đẹp"]'),
(6,  'Python ML Engineer', 2, 'Không yêu cầu', 'Chuyên sâu', 'VND', '35-50 triệu', 'Hồ Chí Minh', 'Quận Bình Thạnh', 'https://placehold.co/600x400', '58 Nguyen Dinh Chieu', 'Full time', '30/07/2025', 'IT', '6', 'verified', '2025-01-22', '["Xây dựng mô hình ML TensorFlow/PyTorch","Tiền xử lý dữ liệu lớn","Triển khai model vào production"]', '["Senior","Lead"]', '["Research budget dồi dào","Conference allowance","Flexible working hours"]', '["Thành thạo Python TensorFlow hoặc PyTorch","Kiến thức feature engineering","Bằng Thạc sĩ ưu tiên"]'),
(7,  'iOS Mobile Developer', 3, 'Không yêu cầu', 'Nâng cao', 'VND', '22-35 triệu', 'Hà Nội', 'Hoàng Mai', 'https://placehold.co/600x400', '1 Giang Van Minh', 'Full time', '05/07/2025', 'IT', '7', 'verified', '2025-01-25', '["Phát triển iOS với Swift/SwiftUI","Tích hợp API xử lý bất đồng bộ","Debug tối ưu performance"]', '["Mid","Senior"]', '["Dự án app triệu người dùng","Visa hỗ trợ công tác","Health + dental insurance"]', '["Thành thạo Swift SwiftUI","Hiểu UIKit CoreData Combine","Publish ít nhất 1 app lên AppStore"]'),
(8,  'Android Developer', 4, 'Không yêu cầu', 'Trung cấp', 'VND', '18-28 triệu', 'Đà Nẵng', 'Hải Châu', 'https://placehold.co/600x400', '57 Huynh Thuc Khang', 'Full time', '12/07/2025', 'IT', '8', 'pending', '2025-01-28', '["Phát triển app Android với Kotlin","Tích hợp Firebase push notification","Publish app lên Google Play"]', '["Junior","Mid"]', '["Cơ hội onsite nước ngoài","Lương thưởng cạnh tranh","Bữa ăn trưa miễn phí"]', '["Thành thạo Kotlin Android SDK","Kinh nghiệm REST API Firebase","Hiểu về material design"]'),
(9,  'Full-stack .NET Developer', 2, 'Không yêu cầu', 'Nâng cao', 'VND', '25-40 triệu', 'Hà Nội', 'Ba Đình', 'https://placehold.co/600x400', '191 Ba Trieu', 'Full time', '20/06/2025', 'IT', '9', 'verified', '2025-02-01', '["Phát triển web ASP.NET Core EF Core","Thiết kế microservices","Code review mentoring junior"]', '["Senior","Lead"]', '["Dự án tài chính quy mô lớn","Lộ trình thăng tiến rõ ràng","Bảo hiểm toàn diện"]', '["Thành thạo C# ASP.NET Core","Kinh nghiệm Entity Framework Core","Hiểu SOLID Design Patterns"]'),
(10, 'Cloud Infrastructure Engineer', 2, 'Không yêu cầu', 'Chuyên sâu', 'VND', '40-60 triệu', 'Hồ Chí Minh', 'Quận 1', 'https://placehold.co/600x400', '29 Ly Tu Trong', 'Full time', '15/08/2025', 'IT', '10', 'verified', '2025-02-05', '["Quản lý hạ tầng AWS/Azure/GCP","Tối ưu chi phí hiệu năng cloud","Thiết kế kiến trúc high availability"]', '["Lead"]', '["AWS credits + training","Hỗ trợ thi cert AWS/GCP/Azure","Lương Senior hàng đầu"]', '["Thành thạo ít nhất 1 nền tảng cloud","Kinh nghiệm Terraform Ansible","Kiến thức networking nâng cao"]'),
(11, 'QA Test Engineer', 5, 'Không yêu cầu', 'Cơ bản', 'VND', '10-18 triệu', 'Hà Nội', 'Đống Đa', 'https://placehold.co/600x400', '17 Duy Tan', 'Full time', '01/07/2025', 'IT', '1', 'verified', '2025-02-08', '["Viết test case manual và automation","Báo cáo bug và theo dõi fix","Tham gia sprint planning và review"]', '["Fresher","Junior"]', '["Đào tạo nội bộ bài bản","Bảo hiểm đầy đủ","Nghỉ phép linh hoạt"]', '["Hiểu quy trình kiểm thử phần mềm","Biết Selenium hoặc Cypress là lợi thế","Tư duy logic cẩn thận"]'),
(12, 'Product Manager', 1, 'Không yêu cầu', 'Chuyên sâu', 'VND', '35-55 triệu', 'Hồ Chí Minh', 'Quận 7', 'https://placehold.co/600x400', '182 Le Dai Hanh', 'Full time', '30/06/2025', 'IT', '2', 'verified', '2025-02-10', '["Định hướng sản phẩm và roadmap","Làm việc với tech team và stakeholder","Phân tích thị trường và đối thủ"]', '["Lead"]', '["Stock option hấp dẫn","Môi trường startup scale-up","Budget đào tạo lớn"]', '["Kinh nghiệm PM ít nhất 3 năm","Biết Agile/Scrum","Kỹ năng giao tiếp xuất sắc"]'),
(13, 'Scrum Master', 2, 'Không yêu cầu', 'Nâng cao', 'VND', '28-40 triệu', 'Hà Nội', 'Cầu Giấy', 'https://placehold.co/600x400', '52 Ut Tich', 'Full time', '25/07/2025', 'IT', '3', 'verified', '2025-02-12', '["Tổ chức và điều phối sprint","Loại bỏ impediment cho team","Coaching Agile mindset"]', '["Senior"]', '["Chế độ nghỉ phép hấp dẫn","Teambuilding hàng quý","WFH linh hoạt"]', '["Chứng chỉ CSM hoặc PSM","Kinh nghiệm Scrum Master ít nhất 2 năm","Kỹ năng lãnh đạo tốt"]'),
(14, 'Business Analyst', 4, 'Không yêu cầu', 'Trung cấp', 'VND', '20-30 triệu', 'Hồ Chí Minh', 'Quận 1', 'https://placehold.co/600x400', '163 Tran Trong Cuong', 'Full time', '10/08/2025', 'IT', '4', 'verified', '2025-02-15', '["Thu thập và phân tích yêu cầu nghiệp vụ","Viết tài liệu đặc tả chi tiết","Phối hợp dev team và khách hàng"]', '["Junior","Mid"]', '["Data-driven environment","Phụ cấp ăn trưa","Review lương 2 lần/năm"]', '["Hiểu quy trình phân tích nghiệp vụ","Kỹ năng viết tài liệu tốt","Tiếng Anh giao tiếp được"]'),
(15, 'Graphic Designer', 3, 'Không yêu cầu', 'Trung cấp', 'VND', '12-20 triệu', 'Đà Nẵng', 'Hải Châu', 'https://placehold.co/600x400', '14 Cong Truong Me Linh', 'Part time', '20/08/2025', 'Design', '5', 'verified', '2025-02-18', '["Thiết kế ấn phẩm truyền thông","Làm việc với team marketing","Đảm bảo brand identity"]', '["Fresher","Junior"]', '["Budget học tập 5tr/năm","Thưởng dự án","Môi trường sáng tạo"]', '["Thành thạo Adobe Photoshop Illustrator","Có portfolio thiết kế","Tư duy sáng tạo tốt"]'),
(16, 'Network Security Engineer', 2, 'Không yêu cầu', 'Chuyên sâu', 'VND', '30-45 triệu', 'Hà Nội', 'Hoàn Kiếm', 'https://placehold.co/600x400', '58 Nguyen Dinh Chieu', 'Full time', '05/08/2025', 'IT', '6', 'verified', '2025-02-20', '["Giám sát và bảo vệ hệ thống mạng","Phân tích và phòng chống tấn công","Thiết lập chính sách bảo mật"]', '["Senior"]', '["Lương cạnh tranh top thị trường","Cert security được hỗ trợ","Làm việc với hệ thống doanh nghiệp lớn"]', '["Kinh nghiệm network security 3+ năm","Hiểu biết về firewall IDS/IPS","Cert CISSP hoặc CEH là lợi thế"]'),
(17, 'Digital Marketing Specialist', 3, 'Không yêu cầu', 'Trung cấp', 'VND', '15-25 triệu', 'Hồ Chí Minh', 'Quận 3', 'https://placehold.co/600x400', '1 Giang Van Minh', 'Full time', '15/08/2025', 'Marketing', '7', 'verified', '2025-02-22', '["Lên kế hoạch và chạy chiến dịch digital","Phân tích hiệu quả và tối ưu ROI","Quản lý các kênh mạng xã hội"]', '["Junior","Mid"]', '["Môi trường sáng tạo năng động","Thưởng KPI hấp dẫn","Đào tạo chuyên sâu"]', '["Hiểu biết về SEO Google Ads Facebook Ads","Có kinh nghiệm chạy campaign","Tư duy phân tích số liệu"]'),
(18, 'Content Writer', 5, 'Không yêu cầu', 'Cơ bản', 'VND', '8-15 triệu', 'Hà Nội', 'Hai Bà Trưng', 'https://placehold.co/600x400', '57 Huynh Thuc Khang', 'Part time', '30/07/2025', 'Marketing', '8', 'pending', '2025-02-25', '["Viết nội dung bài blog website","Sáng tạo nội dung mạng xã hội","Tối ưu SEO on-page"]', '["Fresher"]', '["Thời gian linh hoạt","Cơ hội phát triển kỹ năng viết","Môi trường trẻ trung"]', '["Kỹ năng viết lách tốt tiếng Việt","Hiểu cơ bản về SEO","Sáng tạo và chủ động"]'),
(19, 'Finance Analyst', 3, 'Không yêu cầu', 'Nâng cao', 'VND', '20-35 triệu', 'Hà Nội', 'Hoàn Kiếm', 'https://placehold.co/600x400', '191 Ba Trieu', 'Full time', '10/09/2025', 'Finance', '9', 'verified', '2025-03-01', '["Phân tích báo cáo tài chính","Xây dựng mô hình dự báo tài chính","Hỗ trợ quyết định đầu tư"]', '["Mid","Senior"]', '["Lương cạnh tranh ngành tài chính","Bảo hiểm toàn diện","Môi trường chuyên nghiệp"]', '["Bằng cử nhân Tài chính Kế toán","Thành thạo Excel tài chính","Kinh nghiệm phân tích 2+ năm"]'),
(20, 'HR Recruitment Specialist', 2, 'Không yêu cầu', 'Trung cấp', 'VND', '12-20 triệu', 'Hồ Chí Minh', 'Quận 1', 'https://placehold.co/600x400', '29 Ly Tu Trong', 'Full time', '20/08/2025', 'HR', '10', 'verified', '2025-03-05', '["Tuyển dụng nhân sự IT và non-IT","Phỏng vấn và đánh giá ứng viên","Xây dựng thương hiệu tuyển dụng"]', '["Junior"]', '["Môi trường HR chuyên nghiệp","Đào tạo kỹ năng tuyển dụng","Review lương 6 tháng/lần"]', '["Kinh nghiệm tuyển dụng 1+ năm","Kỹ năng phỏng vấn và đánh giá","Tiếng Anh giao tiếp tốt"]');

-- (description/rank/benefits/required already embedded in jobs INSERT above)

-- INTERVIEW BOOKINGS
INSERT IGNORE INTO interview_bookings (id, enterprise_id, job_id, time, date, user_id, status, create_at, meeting_link, cancel_reason, interview_mode, description, skills, province, district, address, benefits_description, working_time, education) VALUES
(1, 1, 1, '09:00', '2025-02-10', 2, 'pending', '2025-01-20', 'https://zoom.us/j/123456', NULL, 'Online', 'Java Backend Developer', 'Nâng cao', 'Hà Nội', 'Hoàn Kiếm', '17 Duy Tan', 'Bảo hiểm đầy đủ', 'Full time', NULL),
(2, 2, 2, '14:00', '2025-02-12', 3, 'Enterprise Verified', '2025-01-22', 'https://meet.google.com/abc', NULL, 'Online', 'React Frontend Developer', 'Trung cấp', 'Hồ Chí Minh', 'Quận 1', '182 Le Dai Hanh', 'WFH linh hoạt', 'Full time', NULL),
(3, 3, 3, '10:30', '2025-02-14', 4, 'done', '2025-01-24', 'https://teams.microsoft.com/l/abc', NULL, 'In-person', 'DevOps Engineer', 'Chuyên sâu', 'Hồ Chí Minh', 'Quận 3', '52 Ut Tich', 'Teambuilding quarterly', 'Full time', NULL),
(4, 4, 4, '15:00', '2025-02-16', 5, 'pending', '2025-01-26', 'https://zoom.us/j/789012', NULL, 'Online', 'Data Analyst', 'Nâng cao', 'Hà Nội', 'Cầu Giấy', '163 Tran Cuong', 'Phụ cấp ăn trưa', 'Full time', NULL),
(5, 5, 5, '09:30', '2025-02-18', 6, 'cancelled', '2025-01-28', NULL, 'Ứng viên không phù hợp', 'Online', 'UI/UX Designer', 'Trung cấp', 'Hà Nội', 'Hoàn Kiếm', '14 Me Linh', 'MacBook Pro', 'Full time', NULL),
(6, 6, 6, '11:00', '2025-02-20', 7, 'pending', '2025-01-30', 'https://zoom.us/j/345678', NULL, 'Online', 'Python ML Engineer', 'Chuyên sâu', 'Hồ Chí Minh', 'Bình Thạnh', '58 Nguyen Dinh Chieu', 'Conference allowance', 'Full time', NULL),
(7, 7, 7, '14:30', '2025-02-22', 8, 'Enterprise Verified', '2025-02-01', 'https://meet.google.com/xyz', NULL, 'Online', 'iOS Developer', 'Nâng cao', 'Hà Nội', 'Hoàng Mai', '1 Giang Van Minh', 'Health insurance', 'Full time', NULL),
(8, 8, 8, '10:00', '2025-02-24', 9, 'pending', '2025-02-03', NULL, NULL, 'In-person', 'Android Developer', 'Trung cấp', 'Đà Nẵng', 'Hải Châu', '57 Huynh Thuc Khang', 'Free lunch', 'Full time', NULL),
(9, 9, 9, '16:00', '2025-02-26', 10, 'done', '2025-02-05', 'https://zoom.us/j/901234', NULL, 'Online', '.NET Developer', 'Nâng cao', 'Hà Nội', 'Ba Đình', '191 Ba Trieu', 'Lộ trình thăng tiến', 'Full time', NULL),
(10, 10, 10, '09:00', '2025-02-28', 11, 'pending', '2025-02-07', 'https://meet.google.com/pqr', NULL, 'Online', 'Cloud Engineer', 'Chuyên sâu', 'Hồ Chí Minh', 'Quận 1', '29 Ly Tu Trong', 'AWS certification support', 'Full time', NULL),
(11, 1, 11, '10:00', '2025-03-05', 12, 'pending', '2025-02-10', NULL, NULL, 'In-person', 'QA Engineer', 'Cơ bản', 'Hà Nội', 'Đống Đa', '17 Duy Tan', 'Đào tạo nội bộ', 'Full time', NULL),
(12, 2, 12, '14:00', '2025-03-07', 13, 'Enterprise Verified', '2025-02-12', 'https://zoom.us/j/567890', NULL, 'Online', 'Product Manager', 'Chuyên sâu', 'Hồ Chí Minh', 'Quận 7', '182 Le Dai Hanh', 'Stock option', 'Full time', NULL),
(13, 3, 13, '11:30', '2025-03-10', 14, 'pending', '2025-02-15', 'https://meet.google.com/lmn', NULL, 'Online', 'Scrum Master', 'Nâng cao', 'Hà Nội', 'Cầu Giấy', '52 Ut Tich', 'Chế độ nghỉ phép', 'Full time', NULL),
(14, 4, 14, '15:30', '2025-03-12', 15, 'pending', '2025-02-17', NULL, NULL, 'In-person', 'Business Analyst', 'Trung cấp', 'Hồ Chí Minh', 'Quận 1', '163 Tran Cuong', 'Gaming room', 'Full time', NULL),
(15, 5, 15, '09:30', '2025-03-14', 2, 'cancelled', '2025-02-19', NULL, 'Lịch bận', 'Online', 'Graphic Designer', 'Trung cấp', 'Đà Nẵng', 'Hải Châu', '14 Me Linh', 'Budget học tập', 'Part time', NULL);

-- (updateStatusTime and rank already stored as JSON strings in interview_bookings INSERT above)

-- CAROUSELS
INSERT IGNORE INTO carousels (id, title, idx, img_url, status) VALUES
(1, 'Tuyển dụng mùa hè 2025', 1, 'https://placehold.co/1200x400/3b82f6/ffffff?text=Tuyen+Dung+He+2025', 'active'),
(2, 'Top Công Ty Công Nghệ', 2, 'https://placehold.co/1200x400/8b5cf6/ffffff?text=Top+Cong+Ty+CN', 'active'),
(3, 'Cơ Hội Nghề Nghiệp IT', 3, 'https://placehold.co/1200x400/10b981/ffffff?text=Co+Hoi+Nghe+Nghiep', 'active'),
(4, 'Học Bổng & Thực Tập', 4, 'https://placehold.co/1200x400/f59e0b/ffffff?text=Hoc+Bong+Thuc+Tap', 'inactive'),
(5, 'Hội Chợ Việc Làm 2025', 5, 'https://placehold.co/1200x400/ef4444/ffffff?text=Hoi+Cho+Viec+Lam', 'active');
