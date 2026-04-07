import { province } from "@/apis/province/provinceApi";

const provinces = {
  state: {
    provinces: [],
  },
  getters: {},
  mutations: {
    setProvince(state, provinces) {
      state.provinces = provinces;
    },
  },
  actions: {
    getAllProvince: async ({ commit }) => {
      const data = await province();
      commit("setProvince", data);
    },
  },
};
export default provinces;
