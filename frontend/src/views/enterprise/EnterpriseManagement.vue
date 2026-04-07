<template>
  <div class="relative w-full h-full">
    <!-- Phần background overlay -->
    <div
      class="absolute inset-0 bg-gray-800 bg-opacity-50 z-10"
      v-if="isModalOpen"
      @click="isModalOpen = false"
    ></div>

    <!-- Modal - Đã điều chỉnh position và margin -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mx-auto max-w-[700px] w-full px-4"
      v-if="isModalOpen"
    >
      <div class="bg-white rounded-lg shadow-lg px-8 py-4">
        <AddEnterpriseModel @cancel="cancel" />
      </div>
    </div>

    <!-- Phần nội dung chính -->
    <div class="bg-custom p-6 z-0">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between mb-[24px]">
          <div>
            <h2 class="text-[18px] font-[600]">Danh sách doanh nghiệp</h2>
            <p class="font-[400] text-[16px] text-gray-700">
              Hãy xem và cập nhật doanh nghiệp của bạn
            </p>
          </div>
          <div class="mr-[100px]">
            <a-button
              @click="isModalOpen = true"
              class="bg-[#f8e9ea] gap-[4px] text-[#ab1f24] flex items-center justify-center border-0 w-[215px] h-[48px] font-[600] text-[16px]"
            >
              <PlusCircleFilled />Thêm doanh nghiệp
            </a-button>
          </div>
        </div>
      </div>
      <div class="mr-[100px]">
        <a-table
          :columns="columns"
          :data-source="paginated"
          :pagination="false"
          class="custom-table"
        >
          <!-- Header cell template -->
          <template #headerCell="{ column }">
            <th class="table-header">
              <span>{{ column.title }}</span>
            </th>
          </template>

          <!-- Body cell template -->
          <template #bodyCell="{ column, record, index }">
            <!-- Display ID -->
            <template v-if="column.key === 'index'">
              <a>{{ index + 1 }}</a>
            </template>

            <!-- Display Title -->
            <template v-else-if="column.key === 'title'">
              <a>{{ record.title }}</a>
            </template>

            <!-- Display Status with Tag Color based on status -->
            <template v-else-if="column.key === 'status'">
              <span>
                <a-tag :color="`default`" v-if="record.status === 'pending'">
                  chờ xác nhận
                </a-tag>
                <a-tag
                  :color="'green'"
                  v-else-if="record.status === 'verified'"
                >
                  đã xác minh
                </a-tag>
                <a-tag :color="`red`" v-else> đã bị chặn </a-tag>
              </span>
            </template>

            <!-- Display Action Link -->
            <template v-else-if="column.key === 'action'">
              <span>
                <router-link
                  to=""
                  @click="redirect(record)"
                  class="flex gap-1 text-[14px] font-[600] hover:underline items-center"
                  style="color: #231651"
                >
                  <EyeOutlined class="cursor-pointer" /> Xem chi tiết
                  <ArrowRightOutlined />
                </router-link>
              </span>
              <div class="flex mt-1"></div>
            </template>
          </template>
        </a-table>
        <div class="flex mt-6 justify-end">
          <a-pagination
            class="text-end p-5"
            :current="current"
            :total="total"
            :pageSize="perPage"
            show-less-items
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddEnterpriseModel from "@/components/AddEnterpriseModel.vue";
import { computed, onMounted, ref } from "vue";
import {
  ArrowRightOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleFilled,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const cancel = () => {
  isModalOpen.value = false;
};
const userLoginId = ref(JSON.parse(localStorage.getItem("token")));

const user = computed(() => store.state.user.userLogin || []);
const router = useRouter();
const perPage = 2; // Items per page
const current = ref(1);
const paginated = computed(() => store.state.enterprise.paginatedEnterprise);
const isModalOpen = ref(false);
const store = useStore();
const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Tên doanh nghiệp",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "tags",
  },

  {
    title: "Action",
    key: "action",
  },
];
const enterprises = computed(() => store.state.enterprise.enterprises);
const enterpriseId = computed(() =>
  store.state.enterprise.enterprises.filter(
    (e) => e.userId == userLoginId.value
  )
);
const handlePageChange = async (page) => {
  try {
    current.value = page;
    const payload = {
      page,
      limit: perPage,
      id: userLoginId.value,
    };

    await store.dispatch("paginatedEnterprise", payload);
    console.log("Pagination updated:", payload);
  } catch (error) {
    console.error("Error in handlePageChange:", error);
  }
};
const total = computed(() => enterpriseId.value.length);
const redirect = (enterprise) => {
  if (enterprise.status != "pending" && enterprise.status != "blocked") {
    router.push(`/company/${enterprise.id}/dashboard`);
  } else {
    message.error("Doanh nghiệp đã bị chặn hoặc chưa được xác minh");
  }
};
console.log(paginated, "aaaa");

onMounted(() => {
  store.dispatch("getUser", userLoginId.value);

  store.dispatch("getAllEnterprise");
  handlePageChange(current.value);
});
</script>

<style scoped>
.bg {
  background-color: #fafafa;
}

/* Tăng độ specificity và thêm !important cho các thuộc tính */
:deep(.custom-table .ant-table-thead > tr > th) {
  background-color: #fff6f7 !important;
  color: #ab1f24 !important;
  padding: 16px;
  text-align: center;
}

:deep(.custom-table .ant-table-thead > tr) {
  background-color: #fff6f7 !important;
}

/* Đảm bảo hover state cũng có màu đỏ */
:deep(.custom-table .ant-table-thead > tr > th:hover) {
  background-color: #fff6f7 !important;
}
:deep(.custom-table .ant-table-tbody) {
  background-color: #f4f4f4 !important;
}

/* Đảm bảo hover state cũng có màu đỏ */
:deep(.custom-table .ant-table-tbody) {
  background-color: #f4f4f4 !important;
}
:deep(.custom-table .ant-table-pagination) {
  display: none !important;
}
:deep(.ant-table-thead > tr > th::before) {
  background-color: #eababc !important; /* để ẩn background */
}
</style>
