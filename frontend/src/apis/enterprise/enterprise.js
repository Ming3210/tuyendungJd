import axios from "axios";

export const getAllEnterprise = async () => {
  const response = await axios.get(`http://localhost:8080/enterprises`);
  return response.data;
};
export const addEnterprise = async (payload) => {
  const res = await axios.post(`http://localhost:8080/enterprises`, payload);
  return res.data;
};
export const updateEnterprise = async (payload) => {
  const res = await axios.patch(
    `http://localhost:8080/interview-bookings/${payload.id}`,
    payload
  );
  return res.data;
};
export const paginatedEnterprise = async (payload) => {
  const res = await axios.get(
    `http://localhost:8080/enterprises?userId=${payload.id}&_page=${payload.page}&_limit=${payload.limit}`
  );

  return res.data;
};
export const searchEnterprise = async (payload) => {
  const res = await axios.get(
    `http://localhost:8080/enterprises?name_like=${payload.name}`
  );
  return res.data;
};
export const getDetailEnterprise = async (id) => {
  const response = await axios.get(`http://localhost:8080/enterprises/${id}`);
  return response.data;
};
