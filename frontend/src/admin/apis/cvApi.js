import axios from "axios";

export const getCvsData = async () => {
  const response = await axios.get("http://localhost:8080/cvs");
  return response.data;
};

export const updateCvData = async (cv) => {
  const res = await axios.patch(`http://localhost:8080/cvs/${cv.id}`, cv);
  return res.data;
};
export const deleteCvData = async (id) => {
  await axios.delete(`http://localhost:8080/cvs/${id}`);
};
