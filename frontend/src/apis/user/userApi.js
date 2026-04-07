import axios from "axios";

export const getUserData = async (id) => {
  const res = await axios.get(`http://localhost:8080/users/${id}`);
  return res.data;
};

export const updateUserData = async (updatedUser) => {
  const res = await axios.patch(
    ` http://localhost:8080/users/${updatedUser.id}`,
    updatedUser
  );
  return res.data;
};
export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:8080/users");
  return res.data;
};
