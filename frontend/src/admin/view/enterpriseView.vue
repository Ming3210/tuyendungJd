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
      placeholder="Tìm kiếm doanh nghiệp... "
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pag"
      @change="onChange"
      size="large"
    >
      <template #headerCell> </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <div class="flex flex-row items-center gap-3">
            <img :src="record.avatar" class="h-10 w10" />

            <a>{{ record.title }}</a>
          </div>
        </template>

        <template v-else-if="column.key === 'status'">
          <div class="flex flex-row justify-center gap-5">
            <a-tag
              :color="
                record.status === 'verified'
                  ? 'green'
                  : record.status === 'pending'
                  ? 'orange'
                  : 'red'
              "
            >
              {{ record.status }}
            </a-tag>
            <a-dropdown placement="bottomRight">
              <a class="ant-dropdown-link" @click.prevent>
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="updateStatus(record, 'verified')">
                    Đã xác minh
                  </a-menu-item>
                  <a-menu-item @click="updateStatus(record, 'blocked')">
                    Đã chặn
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>

        <template v-else-if="column.key === 'actions'">
          <a-button type="primary" @click="showModal(record)">Xem</a-button>
          <a-modal
            v-model:open="open"
            title="Thông tin doanh nghiệp"
            footer
            centered
          >
            <div v-if="selectedRecord">
              <!-- {{ selectedRecord }} -->
              <img
                class="object-cover w-32 h-32"
                :src="selectedRecord.avatar"
                alt=""
              />
            </div>
            <div class="my-10">
              <p class="text-2xl font-semibold">{{ selectedRecord.title }}</p>
              <p class="text-slate-400">{{ selectedRecord.industry }}</p>
            </div>
            <!-- nên ẩn  -->
            <div class="flex flex-col gap-3">
              <div
                v-if="selectedRecord.websiteUrl"
                class="boder p-3 border rounded-xl bg-[#F9FAFB]"
              >
                <div class="flex justify-between items-center">
                  <div class="leading-none flex items-center gap-3">
                    <GlobalOutlined class="text-xl" />

                    <div class="mt-5">
                      <h1>Website</h1>
                      <p>{{ selectedRecord.websiteUrl }}</p>
                    </div>
                  </div>
                  <ExportOutlined />
                </div>
              </div>
              <div
                v-if="selectedRecord.linkedinUrl"
                class="boder p-3 border rounded-xl bg-[#F9FAFB]"
              >
                <div class="flex justify-between items-center">
                  <div class="leading-none flex items-center gap-3">
                    <LinkedinOutlined class="text-xl" />

                    <div class="mt-5">
                      <h1>Linked</h1>
                      <p>{{ selectedRecord.linkedinUrl }}</p>
                    </div>
                  </div>
                  <ExportOutlined />
                </div>
              </div>
              <div
                v-if="selectedRecord.facebookUrl"
                class="boder p-3 border rounded-xl bg-[#F9FAFB]"
              >
                <div class="flex justify-between items-center">
                  <div class="leading-none flex items-center gap-3">
                    <FacebookOutlined class="text-xl" />
                    <div class="mt-5">
                      <h1>Facebook</h1>
                      <p>{{ selectedRecord.facebookUrl }}</p>
                    </div>
                  </div>
                  <ExportOutlined />
                </div>
              </div>

              <div
                v-if="selectedRecord.twitterUrl"
                class="boder p-3 border rounded-xl bg-[#F9FAFB]"
              >
                <div class="flex justify-between items-center">
                  <div class="leading-none flex items-center gap-3">
                    <TwitterOutlined class="text-xl" />
                    <div class="mt-5">
                      <h1>Facebook</h1>
                      <p>{{ selectedRecord.twitterUrl }}</p>
                    </div>
                  </div>
                  <ExportOutlined />
                </div>
              </div>
            </div>
            <a-divider></a-divider>
          </a-modal>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import {
  ChromeOutlined,
  DownOutlined,
  ExportOutlined,
  FacebookOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  LinkOutlined,
  TwitterOutlined,
} from "@ant-design/icons-vue";

const store = useStore();
console.log(store);
const open = ref(false);

const data = computed(() => {
  if (!searchInput.value) return store.getters.Enterprises;

  return store.getters.Enterprises.filter((item) =>
    item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});
console.log(store);
const selectedRecord = ref(null);
const showModal = (record) => {
  selectedRecord.value = record;
  open.value = true; // Mở modal
};
const searchInput = ref("");
const columns = [
  {
    title: "Tên doanh nghiệp",
    dataIndex: "title",
    key: "title",
    width: "30%",
  },
  {
    title: "Quy mô",
    dataIndex: "companySize",
    key: "companySize",
    width: "10%",
  },
  {
    title: "Ngành nghề",
    dataIndex: "industry",
    // width: 10,
  },
  {
    title: "trạng thái",
    key: "status",
    dataIndex: "status",
    width: "15%",
    filters: [
      {
        text: "Đã xác minh",
        value: "verified",
      },
      {
        text: "Đang chờ",
        value: "pending",
      },
      {
        text: "Đã chặn",
        value: "blocked",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Chủ sở hữu",
    dataIndex: "userName",
    key: "userName",
    width: "20%",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
  },

  {
    title: "Email",
    dataIndex: "email",
  },
  { title: "Hành động", key: "actions" },
];
const updateStatus = async (record, newStatus) => {
  store.dispatch("updateEnterpriseStatus", {
    id: record.id,
    status: newStatus,
  });
  message.success(`Trạng thái đã được cập nhật thành ${newStatus}`);
};
const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});

const onChange = (pagination, filters, sorter) => {
  console.log("params", pagination, filters, sorter);
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};

onMounted(async () => {
  store.dispatch("getEnterprises");
  store.dispatch("getAllUsers");
});
</script>

<style scoped></style>
