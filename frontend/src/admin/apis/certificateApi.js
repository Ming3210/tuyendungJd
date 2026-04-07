import axios from "axios";

export const getCertificateTypesData = async () => {
  const response = await axios.get("http://localhost:8080/CertificateTypes");
  return response.data;
};
export const addCertificateTypeData = async (newCerti) => {
  const response = await axios.post(
    "http://localhost:8080/CertificateTypes",
    newCerti
  );
  return response.data;
};
export const updateCertificateTypeData = async (newCerti) => {
  const res = await axios.patch(
    `http://localhost:8080/CertificateTypes/${newCerti.id}`,
    newCerti
  );
  return res.data;
};
export const deleteCertificateData = async (id) => {
  await axios.delete(`http://localhost:8080/CertificateTypes/${id}`);
};
