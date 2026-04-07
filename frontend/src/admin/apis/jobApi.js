import axios from "axios";
export const getJobsData = async () => {
  const res = await axios.get("http://localhost:8080/jobs");
  return res.data;
};
export const updateJobData = async (job) => {
  const res = await axios.patch(`http://localhost:8080/jobs/${job.id}`, job);
  return res.data;
};
