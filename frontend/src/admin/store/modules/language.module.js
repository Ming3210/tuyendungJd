import {
  addLanguageData,
  deleteLanguageData,
  getLanguageData,
  updateLanguageData,
} from "@/admin/apis/languageApi";

const language = {
  state: {
    language: [],
  },
  getters: {
    Language: (state) => state.language,
  },
  mutations: {
    setLanguage(state, data) {
      state.language = data;
    },
    updateLanguage(state, updateLanguage) {
      const index = state.language.findIndex(
        (item) => item.id === updateLanguage.id
      );

      if (index !== -1) {
        state.language[index] = updateLanguage;
      }
    },
    addLanguage(state, newLanguage) {
      state.language.push(newLanguage);
    },
    removeLanguage(state, languageId) {
      state.language = state.language.filter((cert) => cert.id !== languageId);
    },
  },
  actions: {
    async getLanguage({ commit }) {
      const data = await getLanguageData();
      console.log(data);
      commit("setLanguage", data);
    },
    async addLanguage({ commit }, newLanguage) {
      const data = await addLanguageData(newLanguage);
      console.log(data);
      commit("addLanguage", data);
    },

    async updateLanguage({ commit }, updateLanguage) {
      const res = await updateLanguageData(updateLanguage);
      // console.log(res);
      commit("updateLanguage", res);
    },
    async removeLanguage({ commit }, languageId) {
      await deleteLanguageData(languageId);
      commit("removeLanguage", languageId);
    },
  },
};

export default language;
