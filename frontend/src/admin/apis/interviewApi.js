import axios from "axios";

export const getAllInterviewBooking = async () => {
  const res = await axios.get(`http://localhost:8080/interview-bookings`);
  return res.data;
};

export const paginatedInterviewBookings = async (payload) => {
  const res = await axios.get(
    `http://localhost:8080/interview-bookings?_page=${payload.page}&_limit=${payload.limit}`
  );
  return res.data;
};

export const searchInterviewBooking = async (payload) => {
  const res = await axios.get(
    `http://localhost:8080/enterprises?title_like=${payload.title}`
  );

  return res.data;
};

export const updatedInterviewBookings = async (payload) => {
  const res = await axios.patch(
    `http://localhost:8080/interview-bookings/${payload.id}`,
    payload
  );
  return res.data;
};
export const getAllJob = async () => {
  const res = await axios.get(`http://localhost:8080/jobs`);
  return res.data;
};
