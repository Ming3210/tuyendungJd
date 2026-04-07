import axios from "axios";
export const getAllCandidates = async () => {
  try {
    const res = await axios.get("http://localhost:8080/users?status=active");
    return res.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
  }
};

export const getShowCandidateByPageDE = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/users?_page=${page}&_limit=${limit}&status=active&_sort=id&_order=DESC`
    );
    const totalCandidates = parseInt(res.headers["x-total-count"], 10);
    return {
      candidates: res.data,
      totalCandidates: totalCandidates,
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
  }
};
export const getShowCandidateByPageA = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/users?_page=${page}&_limit=${limit}&status=active&_sort=id&_order=ASC&role=user`
    );
    const totalCandidates = parseInt(res.headers["x-total-count"], 10);
    return {
      candidates: res.data,
      totalCandidates: totalCandidates,
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
  }
};
export const getCvData = async (userId) => {
  const res = await axios.get(`http://localhost:8080/cvs`);
  return res.data;
};
