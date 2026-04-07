import { getAllUsers, getUserData, updateUserData } from "@/apis/user/userApi";
import {
  addCertificateData,
  deleteCertificateData,
  getCertificateData,
} from "@/apis/user/certificateApi";
import { addCvData, deleteCvData, getCvData } from "@/apis/user/cvApi";
import { getInterviewData } from "@/apis/user/interviewApi";
const user = {
  state: {
    userLogin: null,
    certificate: [],
    cv: [],
    interview: [],
  },
  getters: {
    User: (state) => state.userLogin,
    Certificate: (state) => state.certificate,
    Cv: (state) => state.cv,
    Interview: (state) => state.interview,
  },
  mutations: {
    SET_USER(state, user) {
      state.userLogin = user;
    },
    UPDATE_USER(state, updatedUser) {
      state.userLogin = updatedUser;
    },
    ////
    SET_CERTIFICATE(state, certificateData) {
      state.certificate = certificateData;
    },
    ADD_CERTIFICATE(state, newCertificate) {
      state.certificate.push(newCertificate);
    },
    DELETE_CERTIFICATE(state, certificateId) {
      state.certificate = state.certificate.filter(
        (cert) => cert.id !== certificateId
      );
    },
    UPDATE_CERTIFICATE(state, updatedCertificate) {
      const index = state.certificate.findIndex(
        (item) => item.id === updatedCertificate.id
      );
      if (index !== -1) {
        state.certificate[index] = updatedCertificate;
      }
    },
    SET_CV(state, cvData) {
      state.cv = cvData;
    },
    ADD_CV(state, newCv) {
      state.cv.push(newCv);
    },
    DELETE_CV(state, cvId) {
      state.cv = state.cv.filter((cv) => cv.id !== cvId);
    },
    SET_INTERVIEW(state, interviewData) {
      state.interview = interviewData;
    },
  },
  actions: {
    async getUser({ commit }, id) {
      const userData = await getUserData(id);
      commit("SET_USER", userData);
    },
    async updateUser({ commit }, updatedUser) {
      const response = await updateUserData(updatedUser);
      commit("UPDATE_USER", response);
      console.log(response);
    },
    // CERTIFICATE
    async getCertificate({ commit, state }) {
      const allCertificates = await getCertificateData();
      const userCertificates = allCertificates.filter(
        (cert) => cert.userId === state.userLogin.id
      );
      commit("SET_CERTIFICATE", userCertificates);
    },

    async addCertificate({ commit }, newCertificate) {
      const savedCertificate = await addCertificateData(newCertificate);
      commit("ADD_CERTIFICATE", savedCertificate);
    },
    async removeCertificate({ commit }, certificateId) {
      try {
        await deleteCertificateData(certificateId);
      } catch (error) {
        console.log(error);
      }
      commit("DELETE_CERTIFICATE", certificateId);
    },
    async updateCertificate({ commit }, updatedCertificate) {
      try {
        commit("UPDATE_CERTIFICATE", updatedCertificate);
      } catch (error) {
        console.error("Error updating certificate:", error);
      }
    },
    // CV

    async getCv({ commit, state }) {
      const allCvs = await getCvData();
      const userCvs = allCvs.filter((cv) => cv.userId === state.userLogin.id);
      commit("SET_CV", userCvs);
    },
    async addCv({ commit }, newCv) {
      const savedCertificate = await addCvData(newCv);
      commit("ADD_CV", savedCertificate);
    },
    async removeCv({ commit }, cvId) {
      try {
        await deleteCvData(cvId);
      } catch (error) {
        console.log("lỗi ở cv");
      }
      commit("DELETE_CV", cvId);
    },
    //INTERVIEW
    async getInterview({ commit, state }) {
      const allInterviews = await getInterviewData();
      const userInterview = allInterviews.filter(
        (item) => item.userId === state.userLogin.id
      );
      commit("SET_INTERVIEW", userInterview);
    },
  },
};

export default user;
