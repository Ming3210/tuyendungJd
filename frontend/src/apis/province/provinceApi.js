import axios from "axios";
export const province = async () => {
  const res = await axios.get("https://provinces.open-api.vn/api");
  //   console.log(res.data);
  return res.data;
};
