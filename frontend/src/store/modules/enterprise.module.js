import {
  getEnterpriseInfo,
  updateEnterpriseInfo,
} from "@/apis/enterprise/basicInformation";

import {
  addEnterprise,
  getAllEnterprise,
  paginatedEnterprise,
} from "@/apis/enterprise/enterprise";
import {
  addJob,
  deleteJob,
  getAllJob,
  searchJob,
  updateJob,
} from "@/apis/enterprise/enterpriseJobManager";

const enterprise = {
  state: {
    jobs: [],
    paginatedJobs: [],
    currentJob: null,
    currentEnterprise: null,
    enterprises: [],
    paginatedEnterprise: [],
  },
  getters: {
    getJobs: (state) => state.jobs,
    Enterprises: (state) => state.enterprises,
  },
  mutations: {
    SET_JOBS: (state, jobs) => {
      state.jobs = jobs;
    },
    ADD_JOB: (state, job) => {
      state.jobs.push(job);
    },
    DELETE_JOB: (state, jobId) => {
      const index = state.jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        state.jobs = [
          ...state.jobs.slice(0, index),
          ...state.jobs.slice(index + 1),
        ];
      }
    },

    UPDATE_JOB: (state, updatedJob) => {
      const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
      if (index !== -1) {
        state.jobs[index] = updatedJob;
      }
    },
    SEARCH_JOB: (state, keyWords) => {
      state.jobs = keyWords;
    },
    SET_PAGINATED_JOBS: (state, paginatedJobs) => {
      state.paginatedJobs = paginatedJobs;
    },
    GET_ENTERPRISE_DETAIL: (state, payload) => {
      state.currentEnterprise = payload;
    },
    UPDATE_ENTERPRISE_DETAIL: (state, updatedJob) => {
      state.currentJob = updatedJob;
    },
    GET_ALL_ENTERPRISE: (state, payload) => {
      state.enterprises = payload;
    },
    PAGINATED_ENTERPRISE: (state, payload) => {
      state.paginatedEnterprise = payload;
    },
    ADD_ENTERPRISE: (state, payload) => {
      state.enterprises.push(payload);
    },
  },
  actions: {
    getAllJob: async ({ commit }) => {
      try {
        const jobs = await getAllJob();
        commit("SET_JOBS", jobs);
        return jobs;
      } catch (error) {
        console.log(error);
      }
    },
    addJob: async ({ commit }, payload) => {
      try {
        console.log(payload);

        const newJob = await addJob(payload);
        commit("ADD_JOB", newJob);
        return newJob;
      } catch (error) {
        console.log(error);
      }
    },
    deleteJob: async ({ commit }, jobId) => {
      try {
        await deleteJob(jobId);
        commit("DELETE_JOB", jobId);
      } catch (error) {
        console.log(error);
      }
    },

    updateJob: async ({ commit }, payload) => {
      try {
        console.log(payload, 999);

        await updateJob(payload);
        commit("UPDATE_JOB", payload);
      } catch (error) {
        console.log(error);
      }
    },
    searchJob: async ({ commit }, payload) => {
      try {
        const jobs = await searchJob(payload);
        console.log(jobs);

        commit("SEARCH_JOB", jobs);
        return filteredJobs;
      } catch (error) {
        console.log(error);
      }
    },
    getPaginatedJobs: async ({ commit }, payload) => {
      try {
        const jobs = await getPaginatedJobs(payload);
        console.log(jobs);
        commit("SET_PAGINATED_JOBS", jobs);
      } catch (error) {
        console.log(error);
      }
    },
    getAllEnterprise: async ({ commit }) => {
      try {
        const enterprises = await getAllEnterprise();
        commit("GET_ALL_ENTERPRISE", enterprises);
      } catch (error) {}
    },
    getEnterpriseInfo: async ({ commit }, payload) => {
      try {
        const enterprise = await getEnterpriseInfo(payload);
        commit("GET_ENTERPRISE_DETAIL", enterprise);
      } catch (error) {
        console.log(error);
      }
    },
    updateEnterpriseInfo: async ({ commit }, payload) => {
      try {
        const enterprise = await updateEnterpriseInfo(payload);
        commit("UPDATE_ENTERPRISE_DETAIL", enterprise);
        console.log(enterprise, "cccccccccccccc");
      } catch (error) {
        console.log(error);
      }
    },
    paginatedEnterprise: async ({ commit }, payload) => {
      try {
        console.log(payload, "ấdasdaasdss");

        const enterprise = await paginatedEnterprise(payload);
        console.log(enterprise);

        commit("PAGINATED_ENTERPRISE", enterprise);
      } catch (error) {
        console.log(error);
      }
    },
    addEnterprise: async ({ commit }, payload) => {
      try {
        const newEnterprise = await addEnterprise(payload);
        commit("ADD_ENTERPRISE", newEnterprise);
        return newEnterprise;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default enterprise;
