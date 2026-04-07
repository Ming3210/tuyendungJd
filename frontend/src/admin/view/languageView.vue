<template>
  <div>
    <context-holder />

    <div class="flex justify-between px-5">
      <h1 class="font-bold text-3xl">Ngôn ngữ</h1>
    </div>
    <a-divider class="my-3 bg-red-600"></a-divider>
    <div class="justify-between flex mb-2">
      <a-input
        class="w-[40%]"
        v-model:value="searchInput"
        placeholder="Tìm kiếm ngôn ngữ... "
      />
      <a-button type="primary" @click="showModalAdd">Thêm ngôn ngữ</a-button>
    </div>
    <a-modal v-model:open="openAdd" title="Basic Modal" @ok="handleOkAdd">
      <a-lable>Ngôn ngữ </a-lable>
      <a-input v-model:value="newLanguage.language"></a-input>
      <a-lable>Mã</a-lable>
      <a-input v-model:value="newLanguage.code"> </a-input>
    </a-modal>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pag"
      @change="onChange"
      loading="true"
    >
      <template #headerCell> </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <span>
            <a-tag :color="record.status ? 'green' : 'red'">
              {{ record.status ? "ACTIVE" : "INACTIVE" }}
            </a-tag>
          </span> </template
        ><template v-else-if="column.key === 'action'">
          <div class="flex gap-5 justify-center">
            <div>
              <a-button type="link" @click="() => showModalEdit(record)"
                >Sửa</a-button
              >
              <a-modal
                v-model:open="openEdit"
                title="Chỉnh sửa chứng chỉ"
                @ok="handleOkEdit()"
                centered
              >
                <a-lable>Ngôn ngữ</a-lable>
                <a-input v-model:value="selectedRecord.language"></a-input>
                <a-lable>Mã</a-lable>
                <a-input v-model:value="selectedRecord.code"></a-input>
                <a-label>Trạng thái</a-label>
                <a-select v-model:value="selectedRecord.status" class="w-full">
                  <a-select-option :value="true">ACTIVE</a-select-option>
                  <a-select-option :value="false">INACTIVE</a-select-option>
                </a-select>
              </a-modal>
            </div>
            <a-popconfirm
              title="Sure to delete?"
              @confirm="handleDelete(record)"
            >
              <a-button type="link" danger>Xóa</a-button>
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
import language from "@/admin/store/modules/language.module";

const store = useStore();
const [messageApi, contextHolder] = message.useMessage();
const searchInput = ref("");

const openAdd = ref(false);
const openEdit = ref(false);

const selectedRecord = ref("");
const newLanguage = reactive({
  language: "",
  code: "",
  status: false,
});
const showModalAdd = () => {
  openAdd.value = true;
};
const handleOkAdd = () => {
  store.dispatch("addLanguage", { ...newLanguage });
  openAdd.value = false;
};
console.log(store);
const showModalEdit = (record) => {
  selectedRecord.value = { ...record };
  openEdit.value = true;
};

const handleOkEdit = () => {
  openEdit.value = false;
  //   console.log(selectedRecord.value);
  store.dispatch("updateLanguage", selectedRecord.value);
};

const handleDelete = (language) => {
  store.dispatch("removeLanguage", language.id);
};
const columns = [
  {
    title: "Ngôn ngữ",
    dataIndex: "language",
    sorter: (a, b) => a.language.length - b.language.length,
  },
  {
    title: "Mã",
    dataIndex: "code",
  },

  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",

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
  },
  { title: "Thao tác", key: "action", align: "center" },
];
const data = computed(() => {
  if (!searchInput.value) return store.getters.Language;

  return store.getters.Language.filter((item) =>
    item.language.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});
////
/////
const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});

const onChange = (pagination, filters, sorter) => {
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};

onMounted(async () => {
  await store.dispatch("getLanguage");
});
</script>

<style scoped></style>
