import { getCertificateTypesData } from "@/apis/user/certificateTypeApi";

const certificateTypes = {
  state: {
    certificateTypes: [],
  },
  getters: {
    allCertificateTypes: (state) => state.certificateTypes,
  },
  mutations: {
    setCertificateTypes(state, certificateTypes) {
      state.certificateTypes = certificateTypes;
    },
  },
  actions: {
    async getCertificateTypes({ commit }) {
      const data = await getCertificateTypesData();
      commit("setCertificateTypes", data);
    },
  },
};

export default certificateTypes;
