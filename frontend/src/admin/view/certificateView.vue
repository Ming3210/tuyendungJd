<template>
  <div>
    <div class="flex justify-between px-5">
      <h1 class="font-bold text-3xl">Quản lý chứng chỉ</h1>
      <div>
        <a-button type="primary" @click="showModalAdd">Open Modal</a-button>
        <a-modal v-model:open="openAdd" title="Basic Modal" @ok="handleOkAdd">
          <a-lable>Tên chứng chỉ</a-lable>
          <a-input v-model:value="newCertificate.type"></a-input>
          <a-label>Cấp độ</a-label>
          <a-select
            mode="tags"
            v-model:value="newCertificate.value"
            :token-separators="[',']"
            placeholder="Nhập các cấp độ, cách nhau bằng dấu phẩy"
            style="width: 100%"
          />
        </a-modal>
      </div>
    </div>
    <a-divider class="my-3 bg-red-600"></a-divider>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="paginationOptions"
      @change="onChange"
    >
      <!-- Header Cell -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'index'">STT</template>
        <template v-else>{{ column.title }}</template>
      </template>

      <!-- Body Cell -->
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ index + 1 }}
        </template>
        <template v-else-if="column.key === 'type'">
          <a>{{ record.type }}</a>
        </template>
        <template v-else-if="column.key === 'value'">
          <a-select
            mode="tags"
            v-model:value="record.value"
            :token-separators="['']"
            @change="(value) => handleChange(record.id, record.type, value)"
            style="width: 100%"
          />
        </template>
        <template v-else-if="column.key === 'action'">
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
                <a-label>Cấp độ</a-label>
                <a-select
                  mode="tags"
                  v-model:value="selectedRecord.value"
                  :token-separators="[',']"
                  placeholder="Nhập các cấp độ, cách nhau bằng dấu phẩy"
                  style="width: 100%"
                  @change="handleLevelChange"
                />
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
import { Modal } from "ant-design-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const openAdd = ref(false);
const openEdit = ref(false);

const newCertificate = reactive({
  type: "",
  value: [],
});
const selectedRecord = ref("");
//////
const showModalAdd = () => {
  openAdd.value = true;
};
const handleOkAdd = () => {
  // Kiểm tra và xử lý các giá trị trống trước khi thêm
  if (newCertificate.type.trim() && newCertificate.value.length > 0) {
    store.dispatch("addCertificateType", { ...newCertificate });
    openAdd.value = false;

    // Reset giá trị sau khi thêm
    newCertificate.type = "";
    newCertificate.value = [];
  } else {
    Modal.error({
      title: "Lỗi",
      content: "Vui lòng nhập đầy đủ thông tin chứng chỉ.",
    });
  }
};

/////
const showModalEdit = (record) => {
  selectedRecord.value = { ...record };
  openEdit.value = true;
  // console.log(selectedRecord.value)
};

const handleOkEdit = () => {
  openEdit.value = false;
  store.dispatch("updateCertificate", {
    id: selectedRecord.value.id,
    type: selectedRecord.value.type,
    value: selectedRecord.value.value, // Đảm bảo chỉ gửi phần value đã chỉnh sửa
  });
};

const handleChange = (id, type, newValue) => {
  const updateCertificate = {
    type: type,
    value: newValue,
  };
  store.dispatch("updateCertificate", { id: id, ...updateCertificate });
};
const handleLevelChange = (newValue) => {
  selectedRecord.value = {
    ...selectedRecord.value,
    value: newValue, // Cập nhật chỉ phần `value`
  };
};

const handleDelete = (certificate) => {
  store.dispatch("removeCertificate", certificate.id);
  console.log(certificate);
};
const columns = [
  {
    title: "STT",
    key: "index",
    width: "10%",
  },
  {
    title: "Tên chứng chỉ",
    dataIndex: "type",
    key: "type",

    width: "20%",
  },
  {
    title: "Cấp độ",
    dataIndex: "value",
    key: "value",
    width: "40%",
  },
  {
    title: "Thao tác",
    key: "action",
    align: "center",
    width: "30%",
  },
];

const data = computed(() => store.getters.allCertificateTypes);
const paginationOptions = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});
const onChange = (pagination, filters, sorter) => {
  console.log("params", pagination, filters, sorter);
  paginationOptions.current = pagination.current;
  paginationOptions.currentPage = pagination.currentPage;
};
onMounted(() => {
  store.dispatch("getCertificateTypes");
});
</script>

<style scoped></style>
