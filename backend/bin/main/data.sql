-- =============================================
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE jobs;
TRUNCATE TABLE enterprises;
DELETE FROM users;
INSERT IGNORE INTO users (id, first_name, last_name, full_name, email, user_name, status, password, address, phone, role, is_lock, gender, level, skills, years_of_experience, avatar, position, birthdate) VALUES
(1, 'Nguyen', 'An', 'Nguyen Van An', 'admin@gmail.com', 'admin', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0901234567', 'admin', false, 'male', 'Lead', 'Java, Spring Boot', 5, 'https://placehold.co/400', 'Project Manager', '1990-01-15'),
(2, 'Tran', 'Binh', 'Tran Thi Binh', 'binh@gmail.com', 'trbinh', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0912345678', 'user', false, 'female', 'Senior', 'React, Vue.js', 4, 'https://placehold.co/400', 'Frontend Developer', '1993-03-20'),
(3, 'Le', 'Cuong', 'Le Van Cuong', 'cuong@gmail.com', 'levc', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Da Nang', '0923456789', 'user', false, 'male', 'Mid', 'Node.js, MongoDB', 3, 'https://placehold.co/400', 'Backend Developer', '1995-07-10'),
(4, 'Pham', 'Duong', 'Pham Thi Duong', 'duong@gmail.com', 'phtd', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0934567890', 'user', false, 'female', 'Junior', 'Python, Django', 2, 'https://placehold.co/400', 'Full-stack Developer', '1997-11-05'),
(5, 'Hoang', 'Em', 'Hoang Van Em', 'em@gmail.com', 'hvem', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Can Tho', '0945678901', 'partner', false, 'male', 'Senior', 'C++, Embedded', 6, 'https://placehold.co/400', 'Embedded Engineer', '1989-05-25'),
(6, 'Vu', 'Phuong', 'Vu Thi Phuong', 'phuong@gmail.com', 'vtp', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hai Phong', '0956789012', 'partner', false, 'female', 'Lead', 'DevOps, Docker', 7, 'https://placehold.co/400', 'DevOps Engineer', '1988-09-15'),
(13, 'Ngo', 'Phuc', 'Ngo Van Phuc', 'phuc@gmail.com', 'nvphuc', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ha Noi', '0923344556', 'partner', false, 'male', 'Lead', 'AWS, Cloud', 8, 'https://placehold.co/400', 'Cloud Architect', '1987-07-22'),
(14, 'Dinh', 'Quynh', 'Dinh Thi Quynh', 'quynh@gmail.com', 'dtq', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Hai Phong', '0934455667', 'user', false, 'female', 'Mid', 'PHP, Laravel', 3, 'https://placehold.co/400', 'Backend Developer', '1994-10-10'),
(15, 'Cao', 'Son', 'Cao Van Son', 'son@gmail.com', 'cvson', 'active', '$2a$10$5FLdf8zzp/lAQyEYGZx8EeSMRecUqVEBwuAlFK1V5vszvaaztwWD.', 'Ho Chi Minh', '0945566778', 'user', false, 'male', 'Senior', '.NET, C#', 6, 'https://placehold.co/400', '.NET Developer', '1991-01-08');

-- 2. ENTERPRISES (Professional Legal Names)
DELETE FROM enterprises;
INSERT INTO enterprises (id, title, email, company_size, phone_number, industry, introduction, website_url, address, user_id, avatar, status) VALUES
(1, 'Công ty Cổ phần Tập đoàn Đầu tư EMIR', 'hr@emirgroup.vn', '500-1000', '0243123456', 'IT', 'Tập đoàn đa ngành hàng đầu về đầu tư và công nghệ.', 'https://emirgroup.vn', 'Tòa nhà EMIR Tower, Cầu Giấy, Hà Nội', 5, 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job01_emir.png', 'verified'),
(2, 'Công ty Cổ phần PowerGate Software', 'recruitment@powergate.com', '200-500', '0243987654', 'IT', 'Đối tác chiến lược về tư vấn và phát triển phần mềm toàn cầu.', 'https://powergatesoftware.com', 'Tầng 8, Tòa nhà Toyota Thanh Xuân, Hà Nội', 6, 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job02_weqmfy.png', 'verified'),
(3, 'Tập đoàn Công nghệ CMC (CMC Corporation)', 'hr@cmc.com.vn', '5000+', '0243767676', 'IT', 'Tập đoàn ICT top 2 tại Việt Nam với hơn 30 năm hình thành.', 'https://cmc.com.vn', 'CMC Tower, Duy Tân, Hà Nội', 13, 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job03_cmc.png', 'verified'),
(4, 'Ngân hàng Thương mại Cổ phần Ngoại thương (Vietcombank)', 'tuyendung@vietcombank.com.vn', '15000+', '1900545413', 'Finance', 'Ngân hàng số 1 Việt Nam về hiệu quả hoạt động.', 'https://vietcombank.com.vn', '11 Láng Hạ, Ba Đình, Hà Nội', 1, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/vcb.png', 'verified'),
(5, 'Công ty Cổ phần Viễn thông FPT (FPT Telecom)', 'jobs@fpt.com.vn', '10000+', '02473002222', 'IT', 'Nhà cung cấp dịch vụ Internet và truyền hình hàng đầu.', 'https://fpt.vn', 'Tòa nhà PVI, Phạm Văn Bạch, Hà Nội', 5, 'https://res.cloudinary.com/drt6vjktv/image/upload/v1/logos/fpt.png', 'verified'),
(6, 'Tập đoàn Công nghệ G-Group', 'hr@g-group.vn', '1000+', '0243111222', 'IT', 'Tập đoàn công nghệ với hệ sinh thái đa dạng.', 'https://g-group.vn', 'Duy Tân, Cầu Giấy, Hà Nội', 6, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/g-group.png', 'verified'),
(7, 'Công ty Cổ phần MISA', 'jobs@misa.com.vn', '2500+', '02437654321', 'IT', 'Phần mềm kế toán và quản trị hàng đầu.', 'https://misa.com.vn', 'Tòa nhà MISA, Hà Đông, Hà Nội', 13, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/misa.png', 'verified'),
(8, 'Công ty Cổ phần VNG (VNG Corporation)', 'recruit@vng.com', '5000+', '02839400000', 'IT', 'Kỳ lân công nghệ đầu tiên của Việt Nam.', 'https://vng.com.vn', 'VNG Campus, Quận 7, HCM', 5, 'https://res.cloudinary.com/drt6vjktv/image/upload/v1/logos/vng.png', 'verified'),
(9, 'Tập đoàn Vingroup', 'tuyendung@vingroup.net', '50000+', '02431234567', 'Service', 'Tập đoàn kinh tế tư nhân đa ngành lớn nhất Việt Nam.', 'https://vingroup.net', 'Vinhomes Riverside, Long Biên, Hà Nội', 6, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/vingroup.png', 'verified'),
(10, 'Công ty Cổ phần Be Group', 'hr@be.com.vn', '1000+', '1900232345', 'Service', 'Ứng dụng đa dịch vụ hàng đầu tại Việt Nam.', 'https://be.com.vn', 'Quận 2, Hồ Chí Minh', 13, 'https://res.cloudinary.com/djppquc7s/image/upload/v1/logos/be.png', 'verified');

-- 3. JOBS (True Professional Titles)
DELETE FROM jobs;
INSERT INTO jobs (id, title, quantity, gender, salary_current, salary, province, district, image, address, working_time, deadline, industry, enterprise_id, flight, update_date, saturday_off, experience, min_salary, max_salary, negotiable, job_level, education, description, `rank`, benefits_description, required) VALUES
-- EMIR Group
(1, 'Trưởng Phòng Công Nghệ Thông Tin (TECH LEAD) - Lương UPTO 50M', 1, 'Bất kỳ', 'VND', '35 - 50 Triệu', 'Thành phố Hà Nội', 'Cầu Giấy', 'https://res.cloudinary.com/djppquc7s/image/upload/v1712739000/job_techlead.jpg', 'Tòa nhà EMIR Tower', 'Full-time', '31/12/2026', 'IT', 1, 'verified', '2024-04-10', 0, 'Trên 5 năm', 35.0, 50.0, 1, 'Trưởng/Phó phòng', 'Đại học chuyên ngành CNTT',
'["Quản lý đội ngũ phát triển 10 người","Xây dựng kiến trúc hệ thống Microservices","Review code và mentor thành viên"]', '["Manager","Lead","Expert"]', '["Lương tháng 13 + Thưởng hiệu quả lên tới 3 tháng lương","Bảo hiểm sức khỏe cao cấp EMIR Care","Cơ hội sở hữu cổ phần ưu đãi (ESOP)"]', 
'["Tốt nghiệp ĐH chuyên ngành CNTT","Tối thiểu 3 năm kinh nghiệm Lead","Thành thạo Java/Go và kiến thức về AWS"]'),

(2, 'Chuyên Viên Phân Tích Tài Chính Cao Cấp (Senior Financial Analyst)', 2, 'Bất kỳ', 'VND', '25 - 40 Triệu', 'Thành phố Hà Nội', 'Cầu Giấy', 'https://res.cloudinary.com/djppquc7s/image/upload/v1712739000/job_finance.jpg', 'Tòa nhà EMIR Tower', 'Full-time', '31/12/2026', 'IT', 1, 'verified', '2024-04-10', 0, '3 năm', 25.0, 40.0, 0, 'Nhân viên', 'Đại học chuyên ngành Tài chính/Kế toán',
'["Thực hiện báo cáo tài chính định kỳ","Phân tích rủi ro danh mục đầu tư","Thẩm định các dự án M&A"]', '["Senior","Advanced"]', '["Môi trường làm việc chuyên nghiệp, chuẩn quốc tế","Hỗ trợ cơm trưa và phí gửi xe"]', 
'["Có chứng chỉ CFA là lợi thế","Kỹ năng Excel và SQL tốt","Tiếng Anh thương mại thành thạo"]'),

-- PowerGate
(3, 'Kỹ Sư Phát Triển Phần Mềm (C/C++/Java/Golang/Python) - Gross $2500', 5, 'Bất kỳ', 'USD', '1500 - 2500', 'Thành phố Hà Nội', 'Thanh Xuân', 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job02_weqmfy.png', 'Tòa nhà Toyota Thanh Xuân', 'Full-time', '31/12/2026', 'IT', 2, 'verified', '2024-04-10', 1, '2 năm', 1500.0, 2500.0, 0, 'Nhân viên', 'Đại học trở lên',
'["Phát triển Core Back-end cho hệ thống ERP quốc tế","Tối ưu hóa performance database Oracle","Thiết kế API chuẩn RESTful"]', '["Senior","Advanced"]', '["Làm việc tại văn phòng hạng A","Nghỉ Thứ 7, Chủ Nhật","Khám sức khỏe tại Vinmec"]', 
'["Thống thạo 1 trong các ngôn ngữ: C++, Java, Golang, Python","Tư duy thuật toán tốt","Tiếng Anh tốt"]'),

(4, 'Frontend Developer (NodeJS + ReactJS) - Middle Level', 3, 'Bất kỳ', 'VND', '20 - 35 Triệu', 'Thành phố Hà Nội', 'Thanh Xuân', 'https://res.cloudinary.com/djppquc7s/image/upload/v1712739000/job_frontend.jpg', 'Tòa nhà Toyota Thanh Xuân', 'Full-time', '31/12/2026', 'IT', 2, 'verified', '2024-04-10', 1, '1 năm', 20.0, 35.0, 1, 'Nhân viên', 'Cao đẳng trở lên',
'["Phát triển giao diện ứng dụng web hiện đại","Tích hợp logic backend qua Redux","Đảm bảo tính tương thích trình duyệt"]', '["Middle","Advanced"]', '["Review lương 2 lần/năm","Du lịch hè nước ngoài","Laptop Macbook Pro"]', 
'["Kinh nghiệm 2-3 năm ReactJS","Biết về TailWindCSS là lợi thế"]'),

-- CMC
(5, 'Fullstack Developer (NodeJS + ReactJS) - Good At English, At least 5 Yrs Exp', 4, 'Bất kỳ', 'VND', '30 - 45 Triệu', 'Thành phố Hà Nội', 'Cầu Giấy', 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job03_cmc.png', 'CMC Tower', 'Full-time', '31/12/2026', 'IT', 3, 'verified', '2024-04-10', 1, '5 năm', 30.0, 45.0, 0, 'Phó giám đốc', 'Đại học chuyên ngành CNTT',
'["Tham gia các dự án Cloud của tập đoàn","Thiết kế kiến trúc Cloud-Native","Optimize server performance"]', '["Senior","Expert"]', '["Phúc lợi từ tập đoàn công nghệ hàng đầu","Môi trường trẻ trung, năng động"]', 
'["5+ năm kinh nghiệm Fullstack","Tiếng Anh giao tiếp tốt"]');

-- Massive Bulk Mock Data (150+ more realistic titles)
INSERT INTO jobs (title, quantity, gender, salary_current, salary, province, district, image, address, working_time, deadline, industry, enterprise_id, flight, update_date, saturday_off, experience, min_salary, max_salary, negotiable, job_level, education, description, `rank`, benefits_description, required)
SELECT 
    CONCAT(t.job_prefix, ' ', s.skill_name, ' (', l.level_name, ') ',
           CASE WHEN n % 3 = 0 THEN '- Lương UPTO 35M' WHEN n % 3 = 1 THEN '- Thu nhập hấp dẫn' ELSE '- Gross $1500+' END),
    (n % 5 + 2), -- quantity
    'Bất kỳ', -- gender
    CASE WHEN n % 2 = 1 THEN 'VND' ELSE 'USD' END, -- salary_current
    CASE WHEN n % 2 = 1 THEN CONCAT(18+(n%7), '-', 30+(n%7), ' Triệu') ELSE CONCAT('1', (n%5)+2, '00 - 2', (n%5)+4, '00') END, -- salary
    CASE WHEN n % 3 = 1 THEN 'Thành phố Hà Nội' WHEN n % 3 = 2 THEN 'Thành phố Hồ Chí Minh' ELSE 'Thành phố Đà Nẵng' END, -- province
    'Quận trung tâm', -- district
    'https://res.cloudinary.com/djppquc7s/image/upload/v1766996331/Job02_weqmfy.png', -- image
    'Văn phòng công ty', -- address
    'Full-time', -- working_time
    '31/12/2026', -- deadline
    'IT', -- industry
    (n % 10 + 1), -- enterprise_id
    'verified', -- flight
    '2024-04-10', -- update_date
    (n % 2), -- saturday_off
    CASE WHEN n % 5 = 0 THEN 'Không yêu cầu' WHEN n % 5 = 1 THEN '1 năm' WHEN n % 5 = 2 THEN '2 năm' WHEN n % 5 = 3 THEN '3 năm' ELSE 'Trên 5 năm' END, -- experience
    CASE WHEN n % 2 = 1 THEN (18+(n%7)) ELSE (1200 + (n%5)*100) END, -- min_salary
    CASE WHEN n % 2 = 1 THEN (30+(n%7)) ELSE (2400 + (n%5)*100) END, -- max_salary
    CASE WHEN n % 4 = 0 THEN 1 ELSE 0 END, -- negotiable
    CASE 
        WHEN n % 8 = 0 THEN 'Nhân viên'
        WHEN n % 8 = 1 THEN 'Trưởng nhóm'
        WHEN n % 8 = 2 THEN 'Trưởng/Phó phòng'
        WHEN n % 8 = 3 THEN 'Quản lý / Giám sát'
        WHEN n % 8 = 4 THEN 'Trưởng chi nhánh'
        WHEN n % 8 = 5 THEN 'Phó giám đốc'
        WHEN n % 8 = 6 THEN 'Giám đốc'
        ELSE 'Thực tập sinh'
    END, -- job_level
    CASE 
        WHEN n % 3 = 0 THEN 'Đại học trở lên'
        WHEN n % 3 = 1 THEN 'Cao đẳng trở lên'
        ELSE 'Đại học năm 4'
    END, -- education
    '["Thực hiện phân tích và phát triển tính năng mới","Hỗ trợ các thành viên khác trong team","Gửi báo cáo công việc hàng tuần"]', -- description
    CONCAT('["', CASE WHEN n % 3 = 1 THEN 'Senior' WHEN n % 3 = 2 THEN 'Junior' ELSE 'Middle' END, '","', CASE WHEN n % 4 = 1 THEN 'Senior Skill' WHEN n % 4 = 2 THEN 'Middle Skill' ELSE 'Junior Skill' END, '"]') , -- rank (merged skills)
    '["Thưởng định kỳ","Team building quý","Nghỉ lễ tết"]', -- benefits_description
    '["Nắm vững kiến thức nền tảng","Có thái độ tốt và cầu tiến"]' -- required
FROM (
    WITH RECURSIVE seq AS (SELECT 11 AS n UNION ALL SELECT n + 1 FROM seq WHERE n < 160)
    SELECT n FROM seq
) AS ns,
(SELECT 'Kỹ sư Logic' AS job_prefix UNION SELECT 'Chuyên viên' UNION SELECT 'Nhân viên kinh doanh' UNION SELECT 'Project Manager') AS t,
(SELECT 'Java/Spring' AS skill_name UNION SELECT 'PHP Laravel' UNION SELECT '.NET Core' UNION SELECT 'Python Automation') AS s,
(SELECT 'Middle Level' AS level_name UNION SELECT 'Senior' UNION SELECT 'Professional' UNION SELECT 'Junior') AS l
LIMIT 150;

-- 4. OTHER DATA (CVs, etc)
DELETE FROM cv_languages;
INSERT INTO cv_languages (id, language, code, status) VALUES (1, 'Tiếng Việt', 'vn', true), (2, 'Tiếng Anh', 'en', true);

DELETE FROM carousels;
INSERT INTO carousels (id, title, idx, img_url, status) VALUES
(1, 'Hợp tác cùng EMIR Group', 1, 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996348/AboutUsBanner_oknigh.png', 'active'),
(2, 'PowerGate Career 2025', 2, 'https://res.cloudinary.com/djppquc7s/image/upload/v1766996348/AboutUsBanner_oknigh.png', 'active');

SET FOREIGN_KEY_CHECKS = 1;
