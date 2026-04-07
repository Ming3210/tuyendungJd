import axios from "axios";

export const addBooking = async (booking) => {
  const res = await axios.post(
    "http://localhost:8080/interview-bookings",
    booking
  );
  return res.data;
};
