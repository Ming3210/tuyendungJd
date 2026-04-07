import axios from "axios";

export const getAllInterviewBooking = async () => {
  try {
    const res = await axios.get("http://localhost:8080/interview-bookings");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addInterviewBooking = async (newBooking) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/interview-bookings",
      newBooking
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateInterviewBooking = async (updatedBooking) => {
  try {
    const res = await axios.patch(
      `http://localhost:8080/interview-bookings/${updatedBooking.id}`,
      updatedBooking
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInterviewBooking = async (bookingId) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/interview-bookings/${bookingId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailInterviewBooking = async (bookingId) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/interview-bookings/${bookingId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchInterviewBooking = async (keywords) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/interview-bookings&title_like=${keywords}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const paginatedInterviewBooking = async (payload) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/interview-bookings?enterpriseId=${payload.id}&_page=${payload.page}&_limit=${payload.limit}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const enterpriseUpdateInterviewBooking = async (payload) => {
  try {
    const res = await axios.patch(
      `http://localhost:8080/interview-bookings/jobId=${payload.jobId}`,
      payload
    );
  } catch (error) {}
};
