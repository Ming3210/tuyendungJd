import { getCvLanguagesData } from "@/apis/user/cvLanguageApi";

const cvLanguages = {
  state: {
    cvLanguages: [],
  },
  getters: {
    allCvLanguages: (state) => state.cvLanguages,
  },
  mutations: {
    setCvLanguages(state, cvLanguages) {
      state.cvLanguages = cvLanguages;
    },
  },
  actions: {
    async getCvLanguages({ commit }) {
      const data = await getCvLanguagesData();

      commit("setCvLanguages", data);
    },
  },
};

export default cvLanguages;
