import axios from "axios";
export const getUserDatasByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/users?_page=${page}&_limit=${limit}`
    );
    const totalUsers = parseInt(res.headers["x-total-count"], 10);
    return {
      users: res.data,
      totalUsers: totalUsers,
    };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
  }
};

export const updateRoleUserData = async (userId, roleUser) => {
  try {
    const res = await axios.patch(`http://localhost:8080/users/${userId}`, {
      role: roleUser,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const updateStatusUserData = async (userId, statusUser) => {
  try {
    // Lấy dữ liệu hiện tại của người dùng
    const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
    const currentUserData = userRes.data;

    // Cập nhật trường status
    const updatedData = {
      ...currentUserData,
      status: statusUser,
    };

    // Gửi dữ liệu cập nhật đến API
    const res = await axios.put(
      `http://localhost:8080/users/${userId}`,
      updatedData
    );

    return res.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};
export const deleteUserData = (userId) => {
  const res = axios.delete(`http://localhost:8080/users/${userId}`);
  return res.data;
};

export const updateUserLockStatus = async (userId, lock) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/users/${userId}`,
      {
        lock: lock, // lock là true hoặc false
      }
    );
    return response.data;
  } catch (error) {
    console.error("loi khi capnhat:", error);
    throw error;
  }
};
export const getAllUserData = async () => {
  const res = await axios.get("http://localhost:8080/users");
  return res.data;
};
export const getCvData = async (userId) => {
  const res = await axios.get(`http://localhost:8080/cvs`);
  return res.data;
};
