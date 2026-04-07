import axios from "axios";

export const getAllJob = async () => {
  try {
    const res = await axios.get("http://localhost:8080/jobs");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addJob = async (newJob) => {
  try {
    const res = await axios.post("http://localhost:8080/jobs", newJob);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (updatedJob) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/jobs/${updatedJob.id}`,
      updatedJob.data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await axios.delete(`http://localhost:8080/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDetailJob = async (jobId) => {
  try {
    const res = await axios.get(`http://localhost:8080/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchJob = async (keyWords) => {
  console.log(keyWords);

  try {
    const res = await axios.get(
      `http://localhost:8080/jobs?title_like=${keyWords}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPaginatedJobs = async (payload) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/jobs?_start=${payload.page}&_limit=${payload.limit}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
