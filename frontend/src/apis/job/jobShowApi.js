import axios from "axios";
export const getAllJobs = async () => {
  try {
    const res = await axios.get("http://localhost:8080/jobs");
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export const getShowJobByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/jobs?_sort=id&_order=DESC&_page=${page}&_limit=${limit}&flight=verified`
    );
    // console.log(res.data);

    const totalJobs = parseInt(res.headers["x-total-count"], 10);
    return {
      jobs: res.data,
      totalJobs: totalJobs,
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
  }
};
export const getDistinctIndustries = async () => {
  try {
    const response = await axios.get("http://localhost:8080/jobs");
    const jobs = response.data;
    // console.log(jobs);

    // Lấy danh sách các giá trị industry và loại bỏ các giá trị trùng lặp
    const industries = [...new Set(jobs.map((job) => job.industry))];
    // console.log("Các giá trị industry khác nhau:", industries);

    return industries;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};
export const getJobsByLocation = async (location, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/jobs?province=${location}&_page=${page}&_limit=${limit}`
    );
    console.log(response);

    // Trả về dữ liệu công việc và tổng số công việc từ header `x-total-count`
    return {
      jobs: response.data,
      totalJobs: parseInt(response.headers["x-total-count"], 10),
    };
  } catch (error) {
    console.error("Error fetching jobs by location:", error);
    throw error;
  }
};
export const getRandomJobs = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/jobs?_page=${page}&_limit=${limit}&_sort=id`
    );

    // Sử dụng thuật toán Fisher-Yates để trộn ngẫu nhiên mảng
    const shuffledJobs = shuffleArray(response.data);
    console.log(shuffledJobs);

    return {
      jobs: shuffledJobs,
      totalJobs: parseInt(response.headers["x-total-count"], 10),
    };
  } catch (error) {
    console.error("Error fetching random jobs:", error);
    throw error;
  }
};

// Hàm trộn mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi phần tử
  }
  return array;
};
