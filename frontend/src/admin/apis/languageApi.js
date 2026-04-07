import axios from "axios";

export const getLanguageData = async () => {
  const response = await axios.get("http://localhost:8080/cvLanguages");
  return response.data;
};
export const addLanguageData = async (newLanguage) => {
  const response = await axios.post(
    "http://localhost:8080/cvLanguages",
    newLanguage
  );
  console.log(response.data);
  return response.data;
};
export const updateLanguageData = async (newLanguage) => {
  const res = await axios.patch(
    `http://localhost:8080/cvLanguages/${newLanguage.id}`,
    newLanguage
  );

  return res.data;
};
export const deleteLanguageData = async (id) => {
  await axios.delete(`http://localhost:8080/cvLanguages/${id}`);
};
