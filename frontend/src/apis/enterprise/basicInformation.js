import axios from "axios";

export const getEnterpriseInfo = async (id) => {
  const response = await axios.get(`http://localhost:8080/enterprises/${id}`);
  return response.data;
};

export const updateEnterpriseInfo = async (enterpriseData) => {
  const res = await axios.put(
    `http://localhost:8080/enterprises/${enterpriseData.id}`,
    enterpriseData
  );
  return res.data;
};
