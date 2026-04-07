import axios from "axios";

export const getCvLanguagesData = async () => {
  const response = await axios.get(
    "http://localhost:8080/cvLanguages?status=true"
  );
  return response.data;
};
