-- ============================================================================
-- DATA MASTER SQL: BỘ DỮ LIỆU CHUẨN CHO HỆ THỐNG TUYỂN DỤNG
-- Bao gồm: Provinces, Users, Enterprises, Jobs (with JSON Details)
-- ============================================================================

-- 1. XÓA DỮ LIỆU CŨ ĐỂ TRÁNH TRÙNG LẶP (TÙY CHỌN - HÃY CẨN THẬN)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE jobs;
-- TRUNCATE TABLE enterprises;
-- TRUNCATE TABLE users;
-- TRUNCATE TABLE provinces;
-- SET FOREIGN_KEY_CHECKS = 1;

-- 2. SEEDING USERS (ADMIN, PARTNERS, CANDIDATES)
INSERT IGNORE INTO users (id, first_name, last_name, full_name, email, user_name, status, password, address, phone, role, is_lock, gender, level, skills, years_of_experience, avatar, position, birthdate) VALUES
(1, 'Nguyen', 'Van An', 'Nguyen Van An', 'admin@gmail.com', 'admin', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hà Nội', '0123456789', 'admin', false, 'male', 'Senior', 'Management', 10, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/avatars/admin.png', 'Administrator', '1990-01-01'),
(5, 'Hoang', 'Van Em', 'Hoang Van Em', 'partner1@gmail.com', 'partner1', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'TP. HCM', '0987654321', 'partner', false, 'male', 'Manager', 'Recruitment', 5, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/avatars/p1.png', 'HR Manager', '1992-05-15'),
(6, 'Vu', 'Thi Phuong', 'Vu Thi Phuong', 'partner2@gmail.com', 'partner2', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hà Nội', '0912345678', 'partner', false, 'female', 'Senior', 'Tech Sourcing', 7, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/avatars/p2.png', 'Talent Acquisition', '1994-11-20'),
(13, 'Ngo', 'Van Phuc', 'Ngo Van Phuc', 'partner3@gmail.com', 'partner3', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Đà Nẵng', '0933445566', 'partner', false, 'male', 'Manager', 'Business', 6, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/avatars/p3.png', 'CEO', '1988-02-14'),
(16, 'Phan', 'Thanh Nam', 'Phan Thanh Nam', 'tech_hr@gmail.com', 'nampt', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hà Nội', '0988776655', 'partner', false, 'male', 'Senior', 'Management', 10, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/avatars/p4.png', 'HR Director', '1985-04-12');

-- 4. SEEDING ENTERPRISES (CÔNG TY)
INSERT IGNORE INTO enterprises (id, title, email, company_size, phone_number, industry, introduction, website_url, address, user_id, avatar, status) VALUES
(1, 'FPT Software', 'recruitment@fpt-software.com', '10000+', '02437689048', 'IT', 'Công ty xuất khẩu phần mềm lớn nhất Việt Nam.', 'https://fpt-software.com', 'Duy Tân, Cầu Giấy, Hà Nội', 5, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/fpt.png', 'verified'),
(2, 'Vingroup', 'tuyendung@vingroup.net', '10000+', '02439749999', 'Multi-industry', 'Tập đoàn đa ngành hàng đầu Việt Nam.', 'https://vingroup.net', 'Long Biên, Hà Nội', 6, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/vin.png', 'verified'),
(3, 'Vietcombank', 'hr@vietcombank.com.vn', '10000+', '1900545413', 'Finance', 'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam.', 'https://vietcombank.com.vn', 'Hoàn Kiếm, Hà Nội', 1, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/vcb.png', 'verified'),
(4, 'CMC Corporation', 'contact@cmc.com.vn', '5000-10000', '02437674666', 'IT', 'Tập đoàn Công nghệ hàng đầu Việt Nam.', 'https://cmc.com.vn', 'Duy Tân, Cầu Giấy, Hà Nội', 13, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/cmc.png', 'verified'),
(5, 'Viettel Group', 'hr@viettel.com.vn', '10000+', '18008098', 'Telecommunication', 'Tập đoàn Công nghiệp - Viễn thông Quân đội.', 'https://viettel.com.vn', 'Nam Từ Liêm, Hà Nội', 16, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/viettel.png', 'verified');

-- 5. SEEDING JOBS (DỮ LIỆU CÔNG VIỆC VỚI CHI TIẾT ĐẦY ĐỦ)
INSERT IGNORE INTO jobs (id, title, quantity, gender, skills, salary_current, salary, province, district, image, address, working_time, deadline, industry, enterprise_id, flight, update_date, description, `rank`, benefits_description, required) VALUES
(1, 'Senior Java Developer (Microservices)', 5, 'Bất kỳ', 'Expert', 'USD', '2500 - 4500', 'Thành phố Hà Nội', 'Cầu Giấy', 'https://placehold.co/600x400', 'Duy Tân', 'Full-time', '31/12/2026', 'IT', 1, 'verified', '2024-04-14', 
'["Xây dựng và duy trì các hệ thống microservices hiệu suất cao","Tham gia thiết kế kiến trúc hệ thống backend","Tối ưu hóa các truy vấn database"]', 
'["Senior"]', 
'["Thưởng lương tháng 13, 14, 15","Review lương 2 lần/năm","Bảo hiểm sức khỏe cao cấp FPT Care"]', 
'["Tối thiểu 5 năm kinh nghiệm Java/Spring Boot","Am hiểu về Docker, Kubernetes, Kafka","Tiếng Anh giao tiếp tốt"]'),

(2, 'Project Manager (Bất động sản)', 2, 'Bất kỳ', 'Advanced', 'VND', '40 - 70 Triệu', 'Thành phố Hà Nội', 'Long Biên', 'https://placehold.co/600x400', 'Vinhomes Riverside', 'Full-time', '31/12/2026', 'Multi-industry', 2, 'verified', '2024-04-14', 
'["Quản lý tiến độ các dự án xây dựng trọng điểm","Điều phối nhân sự và các nhà thầu phụ","Báo cáo trực tiếp cho Ban Giám đốc"]', 
'["Manager"]', 
'["Môi trường làm việc đẳng cấp quốc tế","Phúc lợi từ hệ sinh thái Vingroup (Vinmec, Vinschool)","Cơ hội thăng tiến lên Giám đốc dự án"]', 
'["Có kinh nghiệm ít nhất 7 năm trong ngành BĐS/Xây dựng","Kỹ năng quản trị rủi ro và lãnh đạo xuất sắc"]'),

(3, 'Giao dịch viên ngân hàng (Priority)', 10, 'Nữ', 'Basic', 'VND', '12 - 20 Triệu', 'Thành phố Hà Nội', 'Hoàn Kiếm', 'https://placehold.co/600x400', 'Trần Quang Khải', 'Full-time', '31/12/2026', 'Finance', 3, 'verified', '2024-04-14', 
'["Thực hiện các giao dịch tiền gửi, nộp và rút tiền cho khách hàng","Tư vấn các sản phẩm thẻ và bảo hiểm của ngân hàng","Chăm sóc khách hàng VIP tại quầy"]', 
'["Junior"]', 
'["Thưởng cuối năm cực cao theo KPI","Làm việc tại ngân hàng top 1 Việt Nam","Chế độ nghỉ dưỡng hàng năm tại các resort cao cấp"]', 
'["Ngoại hình sáng, cao từ 1m60","Tốt nghiệp loại Khá/Giỏi các trường Kinh tế","Phát âm chuẩn, giao tiếp tự tin"]');

-- 6. TẠO HÀNG LOẠT 100 JOBS MẪU (WITH RICH DETAILS)
-- Sử dụng các template để dữ liệu đa dạng
INSERT INTO jobs (title, quantity, gender, skills, salary_current, salary, province, district, image, address, working_time, deadline, industry, enterprise_id, flight, update_date, description, `rank`, benefits_description, required)
SELECT 
    CASE 
        WHEN n % 4 = 1 THEN CONCAT('Chuyên viên Marketing - ', e.title)
        WHEN n % 4 = 2 THEN CONCAT('Nhân viên Kinh doanh - ', e.title)
        WHEN n % 4 = 3 THEN CONCAT('Kế toán tổng hợp - ', e.title)
        ELSE CONCAT('Nhân viên Hành chính - ', e.title)
    END as title,
    (n % 10 + 1) as quantity,
    'Bất kỳ' as gender,
    CASE WHEN n % 3 = 0 THEN 'Intermediate' WHEN n % 3 = 1 THEN 'Senior' ELSE 'Junior' END as skills,
    'VND' as salary_current,
    CONCAT(10 + (n%20), ' - ', 20 + (n%20), ' Triệu') as salary,
    e.province_name as province,
    'Quận trung tâm' as district,
    'https://placehold.co/600x400' as image,
    e.address as address,
    'Full-time' as working_time,
    '31/12/2026' as deadline,
    e.industry as industry,
    e.id as enterprise_id,
    'verified' as flight,
    '2024-04-14' as update_date,
    CASE 
        WHEN n % 4 = 1 THEN '["Lập kế hoạch truyền thông cho sản phẩm mới","Quản lý các kênh Social Media","Chạy quảng cáo Facebook/Google Ads"]'
        WHEN n % 4 = 2 THEN '["Tìm kiếm và khai thác khách hàng tiềm năng","Tư vấn và chốt hợp đồng","Duy trì mối quan hệ với khách hàng cũ"]'
        WHEN n % 4 = 3 THEN '["Kiểm soát các chứng từ thu chi","Lập báo cáo thuế định kỳ","Quản lý công nợ khách hàng"]'
        ELSE '["Lưu trữ hồ sơ, giấy tờ công ty","Sắp xếp lịch họp cho ban lãnh đạo","Quản lý văn phòng phẩm"]'
    END as description,
    '["Staff"]' as `rank`,
    '["Đóng bảo hiểm đầy đủ theo luật","Thưởng các ngày lễ tết","Du lịch công ty hàng năm"]' as benefits_description,
    CASE 
        WHEN n % 4 = 1 THEN '["Có kinh nghiệm Marketing tối thiểu 2 năm","Biết sử dụng các công cụ thiết kế cơ bản","Sáng tạo, năng động"]'
        WHEN n % 4 = 2 THEN '["Kỹ năng giao tiếp và thuyết phục tốt","Không ngại khó, chịu được áp lực doanh số","Có phương tiện đi lại"]'
        WHEN n % 4 = 3 THEN '["Thành thạo Excel và các phần mềm kế toán","Cẩn thận, trung thực","Có chứng chỉ kế toán trưởng là lợi thế"]'
        ELSE '["Ngoại hình ưa nhìn","Kỹ năng tin học văn phòng tốt","Nhanh nhẹn, tháo vát"]'
    END as required
FROM (
    WITH RECURSIVE seq AS (SELECT 10 AS n UNION ALL SELECT n + 1 FROM seq WHERE n < 110)
    SELECT n FROM seq
) AS ns,
(SELECT id, title, industry, address, 'Thành phố Hà Nội' as province_name FROM enterprises) AS e
LIMIT 100;
