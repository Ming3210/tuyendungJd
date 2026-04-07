import { getAllUsers, register } from "@/apis/login/loginApi";

const login = {
  state: {
    users: [],
    currentUser: null,
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getAllUsers: (state) => state.users || [],
    getUserByUsername: (state) => (username) => {
      return state.users.find((user) => user.userName === username);
    },
    getUserByEmail: (state) => (email) => {
      return state.users.find((user) => user.email === email);
    },
  },
  mutations: {
    GET_USERS: (state, user) => {
      state.users = user;
    },

    SET_CURRENT_USER: (state, user) => {
      state.currentUser = user;
    },
  },
  actions: {
    registerUser: async ({ commit, state }, payload) => {
      try {
        const emailExists = state.users.some(
          (user) => user.email === payload.email
        );
        if (emailExists) {
          throw { response: { status: 409 } };
        }
        const response = await register(payload);
        commit("SET_CURRENT_USER", response.user);
        return response;
      } catch (error) {
        console.error("Lỗi trong quá trình đăng kí tài khoản:", error);
        throw error;
      }
    },
    getAllUsers: async ({ commit }) => {
      try {
        const users = await getAllUsers();
        commit("GET_USERS", users);
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default login;
