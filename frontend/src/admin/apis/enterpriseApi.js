import axios from "axios";
export const getEnterprisesData = async () => {
  const response = await axios.get("http://localhost:8080/enterprises");
  return response.data;
};
export const updateEnterpriseStatus = async (enter) => {
  const res = await axios.patch(
    `http://localhost:8080/enterprises/${enter.id}`,
    enter
  );
  return res.data;
};
