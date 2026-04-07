<template>
  <div>
    <context-holder />

    <div class="flex justify-between px-5">
      <h1 class="font-bold text-3xl">CV người dùng</h1>
    </div>
    <a-divider class="my-3 bg-red-600"></a-divider>
    <a-input
      class="w-[40%]"
      v-model:value="searchInput"
      placeholder="Tìm kiếm tên người dùng "
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pag"
      @change="onChange"
      loading="true"
    >
      <template #headerCell> </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 + (pag.current - 1) * pag.pageSize }}
        </template>
        <template v-else-if="column.key === 'language'">
          <a>{{ record.language }}</a>
        </template>

        <template v-else-if="column.key === 'pdfDataUrl'">
          <a class="text-blue-500" :href="record.pdfDataUrl" target="_blank"
            >View PDF</a
          >
        </template>
        <template v-else-if="column.key === 'status'">
          <span>
            <a-tag :color="record.status ? 'green' : 'red'">
              {{ record.status ? "ACTIVE" : "INACTIVE" }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="flex justify-evenly gap-0">
            <a-button
              type="primary"
              @click="handleActivate(record)"
              v-if="!record.status"
              >ACTIVATE</a-button
            >
            <a-button
              class="px-2"
              danger
              @click="handleDeactivate(record)"
              v-if="record.status"
              >DEACTIVATE</a-button
            >
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleDelete(record.id)"
              @cancel="cancel"
            >
              <a-button type="primary" danger>Primary</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const store = useStore();
const [messageApi, contextHolder] = message.useMessage();
const searchInput = ref("");
const columns = [
  { title: "STT", key: "index", width: "5%" },
  {
    title: "Chủ CV",
    dataIndex: "userName",
    key: "userName",
    width: "10%",
    sorter: (a, b) => a.userName?.length - b.userName?.length,
  },
  { title: "Ngôn ngữ", dataIndex: "language", key: "language", width: "10%" },
  {
    title: "URL PDF",
    dataIndex: "pdfDataUrl",
    key: "pdfDataUrl",
    width: "10%",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: "15%",
    filters: [
      {
        text: "ACTIVE",
        value: "ACTIVE",
      },
      {
        text: "INACTIVE",
        value: "INACTIVE",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) =>
      (record.status ? "ACTIVE" : "INACTIVE") === value,

    sorter: (a, b) => a.status - b.status,
  },
  { title: "Thao tác", key: "action", align: "center", width: "15%" },
];

const data = computed(() => {
  if (!searchInput.value) return store.getters.Cvs;

  return store.getters.Cvs.filter((item) =>
    item.userName?.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});

const handleActivate = async (record) => {
  messageApi.success("Cập nhật trạng thái thành công!");
  await store.dispatch("updateCvStatus", { id: record.id, status: true });
};

const handleDeactivate = async (record) => {
  messageApi.success("Cập nhật trạng thái thành công!");
  await store.dispatch("updateCvStatus", { id: record.id, status: false });
};
const handleDelete = (cvId) => {
  console.log(cvId);
  store.dispatch("deleteCv", cvId);
};

const onChange = (pagination, filters, sorter) => {
  // console.log("params", pagination, filters, sorter);
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};
console.log(store);

onMounted(async () => {
  await store.dispatch("getAllUsers");
  await store.dispatch("getCvs");
  // await store.dispatch("getUsers");
});
</script>

<style scoped></style>
