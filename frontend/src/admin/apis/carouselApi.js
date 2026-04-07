export const getAllCarousel = async () => {
  const res = axios.get("http://localhost:8080/carousel?status=active");
  return res.data;
};
export const addCarousel = async (newData) => {
  const res = await axios.post("http://localhost:8080/carousel", { newData });
  return res.data;
};
export const updateCarousel = async (id, updatedData) => {
  const res = await axios.put(`http://localhost:8080/carousel/${id}`, {
    updatedData,
  });
  return res.data;
};
export const deleteCarousel = async (id) => {
  await axios.delete(`http://localhost:8080/carousel/${id}`);
};
