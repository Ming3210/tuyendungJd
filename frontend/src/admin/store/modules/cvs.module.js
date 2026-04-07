import { deleteCvData, getCvsData, updateCvData } from "@/admin/apis/cvApi";
import { getAllUserData } from "@/admin/apis/userManagerApi";

const cvs = {
  state: {
    cvs: [],
    users: [],
  },
  getters: {
    // Cvs: (state) => state.cvs,
    Cvs: (state) => {
      return state.cvs.map((cv) => {
        const user = state.users.find((user) => user.id === cv.userId);
        return {
          ...cv,
          userName: user ? user.fullName : "Unknown",
        };
      });
    },
  },
  mutations: {
    setCvs(state, cvs) {
      state.cvs = cvs;
    },
    updateCvStatus(state, cv) {
      const index = state.cvs.findIndex((item) => item.id === cv.id);

      if (index !== -1) {
        state.cvs[index] = cv;
      }
    },

    deleteCvData(state, cvId) {
      state.cvs = state.cvs.filter((cv) => cv.id !== cvId);
    },
    allUsers: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    async getCvs({ commit }) {
      const data = await getCvsData();
      commit("setCvs", data);
    },

    async updateCvStatus({ commit }, cv) {
      const res = await updateCvData(cv);
      console.log(res);
      commit("updateCvStatus", res);
    },
    async deleteCv({ commit }, cvId) {
      console.log(cvId);
      await deleteCvData(cvId);
      commit("deleteCvData", cvId);
    },
    async getAllUsers({ commit }) {
      const res = await getAllUserData();
      // console.log(res);
      commit("allUsers", res);
    },
  },
};

export default cvs;
