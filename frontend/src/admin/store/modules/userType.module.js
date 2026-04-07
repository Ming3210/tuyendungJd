import {
  getAllUserData,
  getCvData,
  getUserDatasByPage,
  updateRoleUserData,
  updateStatusUserData,
  updateUserLockStatus,
} from "@/admin/apis/userManagerApi";

const user = {
  state: {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    limit: 10,
    cv: [],
  },
  getters: {},
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users;
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    allUsers: (state, users) => {
      state.users = users;
    },
    UPDATE_USER_STATUS(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index].status = updatedUser.status;
      }
    },
    UPDATE_USER_ROLE(state, updatedUser) {
      const userIndex = state.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (userIndex !== -1) {
        // Tạo một object mới để Vue phản ứng lại
        state.users.splice(userIndex, 1, {
          ...state.users[userIndex],
          role: updatedUser.role,
        });
      }
    },
    SET_CV(state, cvData) {
      state.cv = cvData;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await getAllUserData();
        commit("SET_USERS", response);
      } catch (error) {
        console.error("loi khi lay data:", error);
      }
    },
    async lockUser({ commit }, { userId, lock }) {
      try {
        const updatedUser = await updateUserLockStatus(userId, lock);
        // console.log(updatedUser);

        commit("updateUser", updatedUser); // Gọi mutation để cập nhật Vuex
      } catch (error) {
        console.error("Failed to lock user:", error);
      }
    },
    async unLockUser({ commit }, { userId, lock }) {
      try {
        const updatedUser = await updateUserLockStatus(userId, lock);
        commit("updateUser", updatedUser); // Gọi mutation để cập nhật Vuex
      } catch (error) {
        console.error("Failed to lock user:", error);
      }
    },
    async getAllUsers({ commit }) {
      const res = await getAllUserData();
      // console.log(res);
      commit("allUsers", res);
    },
    async updateUserStatus({ commit }, { id, status }) {
      try {
        const response = await updateStatusUserData(id, status);
        console.log(response);

        commit("UPDATE_USER_STATUS", response);
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái người dùng:", error);
      }
    },
    async updateUserRole({ commit }, { id, role }) {
      try {
        const response = await updateRoleUserData(id, role);
        // console.log(response);

        const updatedUser = response;
        // console.log(updatedUser);
        commit("UPDATE_USER_ROLE", updatedUser);
      } catch (error) {
        console.error("Lỗi khi cập nhật vai trò:", error);
        throw error;
      }
    },
    async getCvCdd({ commit, state }) {
      const allCvs = await getCvData();
      commit("SET_CV", allCvs);
      return allCvs;
    },
  },
};
export default user;
