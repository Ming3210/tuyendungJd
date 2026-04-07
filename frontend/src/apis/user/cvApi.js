import axios from "axios";
export const getCvData = async (userId) => {
  const res = await axios.get(`http://localhost:8080/cvs`);
  return res.data;
};

export const addCvData = async (newCv) => {
  const response = await axios.post("http://localhost:8080/cvs", newCv);
  return response.data;
};

export const deleteCvData = async (id) => {
  const response = await axios.delete(`http://localhost:8080/cvs/${id}`);
  return response.data;
};
