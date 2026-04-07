import axios from "axios";

export const getCertificateTypesData = async () => {
  const response = await axios.get("http://localhost:8080/CertificateTypes");
  return response.data;
};
