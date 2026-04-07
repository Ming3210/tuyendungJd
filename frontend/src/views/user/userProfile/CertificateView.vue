<template>
  <div class="relative w-full h-full">
    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
      v-if="isAddModalOpen || isEditModalOpen"
    ></div>

    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mx-auto max-w-[500px] w-full px-4"
      v-if="isAddModalOpen"
    >
      <div class="bg-white rounded-lg shadow-lg p-8">
        <AddCertificateModel @cancel="cancel" />
      </div>
    </div>

    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mx-auto max-w-[500px] w-full px-4"
      v-if="isEditModalOpen"
    >
      <div class="bg-white rounded-lg shadow-lg p-8">
        <EditCertificateModel @cancel="cancel" :certificate="editRecord" />
      </div>
    </div>

    <div class="bg-custom p-6 z-0">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between mb-[24px]">
          <div>
            <h2 class="text-[18px] font-[600]">Danh sách chứng chỉ</h2>
            <p class="font-[400] text-[16px] text-gray-700">
              Hãy xem và cập nhật chứng chỉ của bạn
            </p>
          </div>
          <div class="mr-[100px]">
            <button
              @click="isAddModalOpen = true"
              class="bg-[#f8e9ea] gap-[4px] text-[#ab1f24] flex items-center justify-center border-0 w-[200px] h-[48px] font-[600] text-[16px] rounded-md"
            >
              <PlusCircleFilled />Thêm chứng chỉ
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="mr-[100px]">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pag"
          @change="onChange"
          class="custom-table"
        >
          <template #headerCell="{ column }">
            <th>
              <span>{{ column.title }}</span>
            </th>
          </template>

          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'STT'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'certificate_name'">
              <span>{{ record.certificateType }}</span>
            </template>
            <template v-else-if="column.key === 'classification'">
              <span>{{ record.certificateValue }}</span>
            </template>
            <template v-else-if="column.key === 'date'">
              <span>
                {{ record.receivedDate }} / {{ record.expirationDate }}</span
              >
            </template>
            <template v-else-if="column.key === 'actions'">
              <button
                @click="handleEdit(record)"
                class="text-white bg-blue-500 px-2 py-1 rounded mr-2"
              >
                Sửa
              </button>
              <a-popconfirm
                title="Sure to delete?"
                @confirm="handleDelete(record)"
              >
                <button class="text-white bg-red-500 px-2 py-1 rounded">
                  Xóa
                </button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { PlusCircleFilled } from "@ant-design/icons-vue";
import AddCertificateModel from "@/components/userModal/AddCertificateModel.vue";
import EditCertificateModel from "@/components/userModal/EditCertificateModel.vue";

const store = useStore();
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

// const certificate = computed(() => store.getters.Certificate);

const editRecord = ref(null);
// console.log(certificate.value);
// console.log("store", store);
// // const test = computed(() => store.state.user.certificate);
// // console.log(certificate.value);

////////////
const cancel = () => {
  isAddModalOpen.value = false;
  isEditModalOpen.value = false;
};

const handleEdit = (record) => {
  isEditModalOpen.value = true;
  editRecord.value = { ...record };
};

const handleDelete = async (record) => {
  store.dispatch("removeCertificate", record.id);
  console.log("test delete", record);
};
const data = computed(() => store.getters.Certificate);
const columns = [
  {
    title: "STT",
    key: "STT",
    render: (text, record, index) =>
      index + 1 + (currentPage.value - 1) * pageSize.value,
  },
  {
    title: "Loại chứng chỉ/bằng cấp",
    dataIndex: "certificate_name",
    key: "certificate_name",
  },
  {
    title: "Xếp loại",
    key: "classification",
    dataIndex: "classification",
  },
  {
    title: "Ngày cấp / Thời hạn",
    key: "date",
    dataIndex: "date",
  },
  {
    title: "Actions",
    key: "actions",
  },
];
const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});

const onChange = (pagination, filters, sorter) => {
  console.log(pagination);
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};
onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem("token"));

  if (userId) {
    await store.dispatch("getUser", userId);
    await store.dispatch("getCertificate");
  }
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
  padding: 13px;
  text-align: center;
}

:deep(.custom-table .ant-table-thead > tr) {
  background-color: #fff6f7 !important;
}

:deep(.ant-table-thead > tr > th::before) {
  background-color: #eababc !important; /* để ẩn background */
}
</style>
