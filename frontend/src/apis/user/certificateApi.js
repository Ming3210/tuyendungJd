import axios from "axios";

export const getCertificateData = async (userId) => {
  const res = await axios.get(`http://localhost:8080/UserCertificates`);
  return res.data;
};

export const addCertificateData = async (newCertificate) => {
  const response = await axios.post(
    "http://localhost:8080/UserCertificates",
    newCertificate
  );
  return response.data;
};

export const deleteCertificateData = async (id) => {
  const response = await axios.delete(
    `http://localhost:8080/UserCertificates/${id}`
  );
  return response.data;
};
export const updateCertificateData = async (id, updateCertificate) => {
  const res = await axios.patch(
    ` http://localhost:8080/UserCertificates/${id}`,
    updateCertificate
  );
  return res.data;
};
