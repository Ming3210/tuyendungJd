import axios from "axios";

export const getDetailJobs = async (jobId) => {
  try {
    const res = await axios.get(`http://localhost:8080/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    throw error;
  }
};

