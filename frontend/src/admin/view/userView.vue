<template>
  <div>
    <div class="w-full justify-between flex m-0 h-[50px]">
      <b class="h-[30px] flex items-center text-[30px]">Nhân viên</b>
      <!-- <button class="w-[150px] h-[30px] bg-blue-500 rounded-md text-white">
        Thêm mới nhân viên
      </button> -->
    </div>
    <div class="w-full h-[40px] flex justify-between">
      <div class="flex gap-[10px] relative">
        <!-- <div
          class="w-[180px] h-[30px] border-2 border-[rgba(123,205,222,50)] px-[17px] py-[6px] rounded-md"
        >
          <button>Thực hiện hàng loạt</button>
          <CaretDownOutlined class="z-[1] absolute px-[15px] py-[2px]" />
        </div> -->
        <div>
          <FilterOutlined @click="showFilterMenu" />
        </div>

        <a-menu
          v-if="isFilterMenuVisible"
          @click="handleRoleFilter"
          class="absolute top-[30px] left-[0] z-10"
        >
          <a-menu-item key="user">User</a-menu-item>
          <a-menu-item key="admin">Admin</a-menu-item>
          <a-menu-item key="partner">Partner</a-menu-item>
        </a-menu>
      </div>
      <div class="flex items-center">
        <div class="relative flex items-center">
          <input
            type="text"
            class="min-w-[300px] h-[30px] border-2 border-[rgba(123,205,222,50)] rounded-md pl-3"
            placeholder="Tìm kiếm theo tên hoặc email"
            v-model="searchQuery"
          />
          <SearchOutlined class="relative right-5" />
        </div>
        <SyncOutlined @click="refresh" />
      </div>
    </div>
    <div>
      <a-table
        :columns="columns"
        :dataSource="filteredUsers"
        rowKey="key"
        :pagination="pag"
        @change="onChange"
        loading="true"
      >
        <!-- Custom header cell for 'checkbox' column -->
        <template v-slot:headerCell="{ column }">
          <template v-if="column.key === 'index'"> </template>
          <template v-else>
            {{ column.title }}
          </template>
        </template>

        <!-- Custom body cell for 'checkbox' column -->
        <template v-slot:bodyCell="{ record, column, index }">
          <template v-if="column.key === 'index'">
            {{ index + 1 }}
          </template>
          <template v-else-if="column.key === 'avatar'">
            <img
              :src="record.avatar || 'https://via.placeholder.com/50'"
              alt="Hình ảnh nhân viên"
              class="w-[50px] h-[50px] object-cover rounded-full"
            />
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="getTagColor(tag)"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'fullName'">
            <span v-if="record.fullName">
              {{ record.fullName }}
            </span>
            <span v-else> unknow </span>
          </template>
          <template v-else-if="column.key === 'status'">
            <div class="relative" v-if="record.role !== 'admin'">
              <div
                :class="{
                  'flex items-center cursor-pointer w-[80px] justify-center h-[35px] border-2 border-[#d9d9d9] rounded-md': true,
                }"
              >
                <div class="items-center flex m-0 p-0">
                  {{ record.status }}
                </div>
                <DownOutlined
                  class="ml-2 mt-0"
                  @click="toggleStatusMenu(record.id)"
                />
              </div>
              <!-- Hiển thị menu đổi trạng thái -->
              <a-menu
                v-if="isStatusMenuVisible(record.id)"
                class="absolute top-[30px] left-0 z-10"
                @click="changeStatus(record)"
              >
                <a-menu-item
                  key="active"
                  :disabled="record.status === 'active'"
                >
                  Active
                </a-menu-item>
                <a-menu-item
                  key="inActive"
                  :disabled="record.status === 'inActive'"
                >
                  Inactive
                </a-menu-item>
              </a-menu>
            </div>
            <div
              v-else
              class="border-2 rounded-md w-[80px] h-[35px] flex items-center justify-center bg-[rgba(236,253,243,1)]"
            >
              active
            </div>
          </template>
          <template v-else-if="column.key === 'role'">
            <div class="relative" v-if="record.role !== 'admin'">
              <div
                :class="{
                  'flex items-center cursor-pointer  justify-evenly w-[100px] h-[35px] border-2 border-[#d9d9d9] rounded-md ': true,
                }"
              >
                <div class="items-center flex m-0 p-0">{{ record.role }}</div>
                <DownOutlined
                  class="ml-2 mt-0"
                  @click="toggleRoleMenu(record.id)"
                />
              </div>
              <!-- Hiển thị menu đổi vai trò -->
              <a-menu
                v-if="isRoleMenuVisible(record.id)"
                class="absolute top-[30px] left-0 z-10"
                @click="({ key }) => changeRole({ key, record })"
              >
                <a-menu-item key="user" :disabled="record.role === 'user'">
                  User
                </a-menu-item>
                <a-menu-item
                  key="partner"
                  :disabled="record.role === 'partner'"
                >
                  Partner
                </a-menu-item>
                <!-- Ẩn tùy chọn Admin -->
              </a-menu>
            </div>
            <div
              v-else
              class="border-2 rounded-md w-[100px] h-[35px] flex items-center justify-center bg-[rgba(236,253,243,1)]"
            >
              ADMIN
            </div>
          </template>
          <template v-else-if="column.key === 'email'">
            <div>
              {{ record.email }}
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a href="#" @click.prevent="openUserInfo(record)">Xem</a>
              <a
                v-if="!record.lock && record.role !== 'admin'"
                href="#"
                @click.prevent="confirmLock(record.id, true)"
                class="hover:cursor-pointer hover:text-[rgba(188,34,40,1)]"
              >
                Khóa
              </a>
              <span
                v-else-if="!record.lock && record.role === 'admin'"
                class="text-gray-400 cursor-not-allowed"
              >
                Khóa
              </span>
              <span
                v-else
                @click.prevent="confirmLock(record.id, false)"
                class="hover:cursor-pointer"
              >
                Mở khóa
              </span>
            </a-space>
          </template>
          <template v-else>
            <!-- Check if the column is 'birthdate' and format it -->
            <template v-if="column.key === 'birthdate'">
              <span v-if="record.birthdate">
                {{ formatDate(record.birthdate) }}
              </span>
              <span v-else> unknown</span>
            </template>
            <template v-else>
              {{ record[column.key] }}
            </template>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import {
  CaretDownOutlined,
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { updateStatusUserData } from "@/admin/apis/userManagerApi";

const store = useStore();
const allChecked = ref(false);
const data = computed(() => store.state.user.users || []);
const isFilterMenuVisible = ref(false);
const selectedRole = ref("");
const statusMenus = ref({});
const roleMenus = ref({});
const searchQuery = ref("");

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (a, b) => a.fullName?.length - b.fullName?.length,
  },
  {
    title: "Birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
    customRender: ({ text }) => formatDate(text),
  },
  { title: "Email", dataIndex: "emal", key: "email" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});
const onChange = (pagination, filters, sorter) => {
  // console.log("params", pagination, filters, sorter);
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};
const cv = computed(() => store.state.user.cv);
// console.log(cv);

// Hiển thị menu đổi vai trò
const isRoleMenuVisible = (userId) => !!roleMenus.value[userId];
const toggleRoleMenu = (userId) => {
  // Đóng tất cả menu trước khi mở menu cần thiết
  roleMenus.value = { [userId]: !roleMenus.value[userId] };
};

// Thay đổi vai trò của người dùng

const filteredUsers = computed(() => {
  let users = data.value;
  // console.log(users);

  if (selectedRole.value) {
    users = users.filter((user) => user.role === selectedRole.value);
  }
  if (searchQuery.value.trim()) {
    users = users.filter((user) =>
      [user.fullName, user.email].some((field) =>
        field?.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }
  users = users.map((user) => {
    const userInCv = cv.value.find((cvUser) => cvUser.userId === user.id);
    // console.log(userInCv);

    if (userInCv) {
      // Nếu có userId trong cv, cập nhật trạng thái
      // console.log(user.status);

      user.status = userInCv.status ? "active" : "inActive";
      // console.log(user.status);
    }
    return user;
  });
  pag.total = users.length;
  return users;
});

const showFilterMenu = () => {
  isFilterMenuVisible.value = !isFilterMenuVisible.value;
};

const handleRoleFilter = ({ key }) => {
  selectedRole.value = key;

  isFilterMenuVisible.value = false;
};

const isStatusMenuVisible = (userId) => !!statusMenus.value[userId];
const toggleStatusMenu = (userId) => {
  statusMenus.value = { [userId]: !statusMenus.value[userId] };
};

const changeStatus = async (record) => {
  if (record.role === "admin") return; // Không thay đổi nếu là admin

  try {
    const newStatus = record.status === "active" ? "inActive" : "active";
    await store.dispatch("updateUserStatus", {
      id: record.id,
      status: newStatus,
    });
    record.status = newStatus;
    statusMenus.value = {};
    message.success("Thay đổi trạng thái thành công.");
  } catch (error) {
    console.error("Lỗi khi đổi trạng thái:", error);
    message.error("Có lỗi xảy ra khi thay đổi trạng thái.");
  }
};

const changeRole = async ({ key, record }) => {
  try {
    // Chỉ cho phép thay đổi role thành "partner" hoặc "user"
    if (["partner", "user"].includes(key)) {
      await store.dispatch("updateUserRole", {
        id: record.id,
        role: key,
      });
      record.role = key;
      roleMenus.value = "";
      await store.dispatch("getUsers");
    } else {
      console.error("Không thể thay đổi vai trò thành admin.");
      message.success("Vai trò đã được thay đổi thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi thay đổi vai trò:", error);
    message.error("Có lỗi xảy ra khi thay đổi vai trò.");
  }
};

const refresh = async () => {
  try {
    await store.dispatch("getUsers");
    if (Array.isArray(data.value.users)) {
      allChecked.value = false;
      data.value.users.forEach((user) => {
        user.checked = false;
      });
    }

    selectedRole.value = "";
    searchQuery.value = "";
  } catch (error) {
    console.error("Lỗi khi làm mới dữ liệu:", error);
  }
};

const lockUser = async (userId) => {
  try {
    await store.dispatch("lockUser", { userId, lock: true });
    message.success("Tài khoản đã bị khóa thành công!");
  } catch (error) {
    console.error("Lỗi khi khóa người dùng:", error);
    message.error("Có lỗi xảy ra khi khóa tài khoản.");
  }
};

const unLockUser = async (userId) => {
  try {
    await store.dispatch("unLockUser", { userId, lock: false });
  } catch (error) {
    console.error("Lỗi khi mở khóa người dùng:", error);
  }
};
const confirmLock = (userId, lock) => {
  const action = lock ? "khóa" : "mở khóa";
  Modal.confirm({
    title: `Bạn có chắc chắn muốn ${action} người dùng này không?`,
    okText: lock ? "Khóa" : "Mở khóa",
    cancelText: "Hủy",
    onOk: async () => {
      try {
        if (lock) {
          await lockUser(userId);
        } else {
          await unLockUser(userId);
        }

        await store.dispatch("getUsers");
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
      }
    },
  });
};
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Gọi khi tải component
onMounted(() => {
  store.dispatch("getUsers").then(() => {
    // Kiểm tra lại dữ liệu sau khi lấy từ store
    if (Array.isArray(data.value.users)) {
      // Khởi tạo trạng thái checkbox cho từng user
      data.value.users.forEach((user) => {
        user.checked = false;
      });
    }
  });
});
console.log(store);

watch(cv, (newCv) => {
  newCv.forEach((cvUser) => {
    const user = data.value.find((user) => user.id === cvUser.userId);
    if (user && user.status !== (cvUser.status ? "active" : "inActive")) {
      // Gửi yêu cầu cập nhật nếu trạng thái khác nhau
      updateStatusUserData(user.id, cvUser.status ? "active" : "inActive");
    }
  });
});

onMounted(() => {
  store.dispatch("getUsers");
  store.dispatch("getCvCdd");
});
</script>

<style>
.ant-layout-content {
  margin: 0 !important;
}
.ant-modal-confirm-title {
  font-size: 16px;
  font-weight: 600;
}
</style>
