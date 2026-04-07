import {
  getAllInterviewBooking,
  getAllJob,
  paginatedInterviewBookings,
  searchInterviewBooking,
  updatedInterviewBookings,
} from "../../apis/interviewApi";

const interview = {
  state: {
    interviewBookings: [],
    paginatedInterviewBookings: [],
    jobs: [],
  },
  getters: {
    getInterviewBookings: (state) => state.interviewBookings,
    getPaginatedInterviewBookings: (state) => state.paginatedInterviewBookings,
  },
  mutations: {
    SET_INTERVIEW_BOOKINGS: (state, interviewBookings) => {
      state.interviewBookings = interviewBookings;
    },
    SET_PAGINATED_INTERVIEW_BOOKINGS: (state, paginated) => {
      state.paginatedInterviewBookings = paginated;
    },
    SET_SEARCHED_INTERVIEW_BOOKINGS: (state, searchResults) => {
      const arr = state.paginatedInterviewBookings.filter((i) =>
        searchResults.some((result) => i.enterpriseId === result.id)
      );
      state.paginatedInterviewBookings = arr;
    },
    UPDATE_INTERVIEW_BOOKINGS: (state, updated) => {
      const index = state.interviewBookings.findIndex(
        (booking) => booking.id === updated.id
      );
      if (index > -1) {
        state.interviewBookings[index] = updated;
      }
    },
    SET_JOBS: (state, joined) => {
      state.jobs = joined;
    },
  },
  actions: {
    getAllInterviewBooking: async ({ commit }) => {
      try {
        const interviewBookings = await getAllInterviewBooking();
        commit("SET_INTERVIEW_BOOKINGS", interviewBookings);
        return interviewBookings;
      } catch (error) {
        console.error(error);
      }
    },
    getPaginatedInterviewBookings: async ({ commit }, payload) => {
      try {
        const paginated = await paginatedInterviewBookings(payload);

        commit("SET_PAGINATED_INTERVIEW_BOOKINGS", paginated);
      } catch (error) {
        console.error(error);
      }
    },
    searchInterviewBooking: async ({ commit }, keyWords) => {
      try {
        const searchResults = await searchInterviewBooking(keyWords);
        commit("SET_SEARCHED_INTERVIEW_BOOKINGS", searchResults);
      } catch (error) {
        console.error(error);
      }
    },
    updatedInterviewBookings: async ({ commit }, payload) => {
      try {
        console.log(payload);

        const updated = await updatedInterviewBookings(payload);
        commit("UPDATE_INTERVIEW_BOOKINGS", updated);
      } catch (error) {
        console.log(error);
      }
    },
    a: async ({ commit }) => {
      try {
        const job = await getAllJob();
        commit("SET_JOBS", job);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default interview;
