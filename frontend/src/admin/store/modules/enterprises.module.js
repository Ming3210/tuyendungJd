import {
  getEnterprisesData,
  updateEnterpriseStatus,
} from "@/admin/apis/enterpriseApi";
import { getAllUserData } from "@/admin/apis/userManagerApi";

const enterprises = {
  state: { enterprises: [], users: [] },
  getters: {
    Enterprises: (state) => {
      return state.enterprises.map((enter) => {
        const user = state.users.find((user) => user.id === enter.userId);
        return {
          ...enter,
          userName: user ? user.fullName : "Unknown",
        };
      });
    },
  },
  mutations: {
    setEnterprises(state, enterprises) {
      state.enterprises = enterprises;
    },
    updateStatus(state, res) {
      console.log(res);
      const index = state.enterprises.findIndex((item) => item.id === res.id);
      console.log(index);
      if (index !== -1) {
        state.enterprises[index] = res;
      }
    },
    allUsers: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    async getEnterprises({ commit }) {
      const data = await getEnterprisesData();

      commit("setEnterprises", data);
    },
    async updateEnterpriseStatus({ commit }, newStatus) {
      const res = await updateEnterpriseStatus(newStatus);
      commit("updateStatus", res);
    },

    async getAllUsers({ commit }) {
      const res = await getAllUserData();
      // console.log(res);
      commit("allUsers", res);
    },
  },
};

export default enterprises;
