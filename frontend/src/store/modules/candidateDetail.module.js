import { getDetailCandidate } from "@/apis/candidate/candidateDetailApi";
import { getCvData } from "@/apis/candidate/candidateShowApi";
const candidateDetail = {
  state: {
    candidateDetail: null,
    cv: [],
  },
  mutations: {
    GET_CANDIDATEDETAIL: (state, candidateDetail) => {
      state.candidateDetail = candidateDetail;
    },
    SET_CV(state, cvData) {
      state.cv = cvData;
    },
  },
  actions: {
    getDetailCandidate: async ({ commit }, userId) => {
      try {
        const candidateDetail = await getDetailCandidate(userId);
        commit("GET_CANDIDATEDETAIL", candidateDetail);
        return candidateDetail;
      } catch (error) {
        console.log(error);
      }
    },
    async getCvCdd({ commit, state }) {
      const allCvs = await getCvData();
      console.log(allCvs);

      commit("SET_CV", allCvs);
      return allCvs;
    },
  },
};
export default candidateDetail;
