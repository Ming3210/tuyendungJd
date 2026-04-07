import axios from "axios";
export const getInterviewData = async () => {
  const res = await axios.get(`http://localhost:8080/interview-bookings`);
  return res.data;
};
