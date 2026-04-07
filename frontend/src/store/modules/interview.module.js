import { getEnterpriseInfo } from "@/apis/enterprise/basicInformation";
import { addBooking } from "@/apis/enterprise/bookingApi";
import {
  deleteInterviewBooking,
  getAllInterviewBooking,
  getDetailInterviewBooking,
  paginatedInterviewBooking,
  searchInterviewBooking,
  updateInterviewBooking,
} from "@/apis/enterprise/interviewBookingApi";

const interviewBooking = {
  state: {
    currentInterviewBooking: null,
    interviewBookings: [],
    paginatedInterviewBookings: [],
  },
  getters: {},
  mutations: {
    SET_INTERVIEW_BOOKINGS: (state, interviewBookings) => {
      state.interviewBookings = interviewBookings;
    },
    SET_PAGINATED_INTERVIEW_BOOKINGS: (state, paginatedInterviewBookings) => {
      state.paginatedInterviewBookings = paginatedInterviewBookings;
    },
    UPDATE_INTERVIEW_BOOKING: (state, payload) => {
      const index = state.interviewBookings.findIndex(
        (booking) => booking._id === payload.id
      );
      if (index !== -1) {
        state.interviewBookings[index] = payload.updatedInterviewBooking;
      }
    },
    ADD_INTERVIEW_BOOKING: (state, interviewBooking) => {
      state.interviewBookings.push(interviewBooking);
    },
    DELETE_INTERVIEW_BOOKING: (state, payload) => {
      const index = state.interviewBookings.findIndex(
        (booking) => booking._id === payload
      );
      if (index !== -1) {
        state.interviewBookings.splice(index, 1);
      }
    },
    SET_SEARCHED_INTERVIEW_BOOKINGS: (state, keywords) => {
      state.interviewBookings = keywords;
    },

    SET_PAGINATED_INTERVIEW_BOOKINGS: (state, payload) => {
      state.paginatedInterviewBookings = payload;
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
    addInterviewBooking: async ({ commit }, payload) => {
      try {
        const newInterviewBooking = await addBooking(payload);
        commit("ADD_INTERVIEW_BOOKING", payload);
        return newInterviewBooking;
      } catch (error) {
        console.error(error);
      }
    },
    updateInterviewBooking: async ({ commit }, payload) => {
      try {
        const updatedInterviewBooking = await updateInterviewBooking(payload);
        commit("UPDATE_INTERVIEW_BOOKING", updatedInterviewBooking);
        return updatedInterviewBooking;
      } catch (error) {
        console.error(error);
      }
    },
    deleteInterviewBooking: async ({ commit }, payload) => {
      try {
        await deleteInterviewBooking(payload);
        commit("DELETE_INTERVIEW_BOOKING", payload);
      } catch (error) {
        console.error(error);
      }
    },
    searchInterviewBooking: async ({ commit }, payload) => {
      try {
        const searchResults = await searchInterviewBooking(payload);
        commit("SET_SEARCHED_INTERVIEW_BOOKINGS", searchResults);
      } catch (error) {
        console.error(error);
      }
    },
    paginatedInterviewBooking: async ({ commit }, payload) => {
      try {
        const paginatedResults = await paginatedInterviewBooking(payload);
        console.log(paginatedResults);

        commit("SET_PAGINATED_INTERVIEW_BOOKINGS", paginatedResults);
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default interviewBooking;
