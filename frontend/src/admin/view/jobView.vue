<template>
  <div>
    <context-holder />

    <div class="flex justify-between px-5">
      <h1 class="font-bold text-3xl">Jobs</h1>
    </div>

    <a-divider class="my-3 bg-red-600"></a-divider>
    <a-input
      class="w-[40%]"
      v-model:value="searchInput"
      placeholder="Tìm kiếm jobs. "
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
          <a>{{ record.title }}</a>
        </template>
        <template v-else-if="column.key === 'updateDate'">
          {{ record.updateDate.split("T")[0].split("-").reverse().join("/") }}
        </template>
        <template v-else-if="column.key === 'salary'">
          <a class="text-blue-700 font-semibold">{{ record.salary }}</a>
        </template>
        <template v-else-if="column.key === 'rank'">
          <div class="flex flex-wrap gap-2">
            <a-tag
              v-for="(rank, index) in record.rank"
              :key="index"
              :color="getRankColor(rank)"
            >
              {{ rank }}
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'flight'">
          <div class="flex flex-row justify-center gap-5">
            <a-tag
              :color="
                record.flight === 'verified'
                  ? 'green'
                  : record.flight === 'pending'
                  ? 'orange'
                  : 'red'
              "
            >
              {{ record.flight }}
            </a-tag>
            <a-dropdown placement="bottomRight">
              <a class="ant-dropdown-link" @click.prevent>
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="updateStatus(record, 'verified')"
                    >Duyệt
                  </a-menu-item>
                  <a-menu-item @click="updateStatus(record, 'blocked')"
                    >Chặn
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-button type="primary" @click="showModal(record)">Xem</a-button>
          <!-- show chi tiet cong viec -->
          <a-modal
            v-model:open="open"
            title="Chi tiết công việc"
            footer
            width="1000px"
          >
            <div class="flex flex-col gap-5">
              <!--  -->
              <div class="flex justify-between">
                <div>
                  <h1>{{ selectedRecord.title }}</h1>
                  <div>
                    <a-tag
                      class="p-2 text-base"
                      :color="
                        selectedRecord.workingTime === 'Full time'
                          ? 'magenta'
                          : selectedRecord.workingTime === 'Part time'
                          ? 'blue'
                          : 'lime'
                      "
                      >{{ selectedRecord.workingTime }}</a-tag
                    >
                    <a-tag
                      class="p-2 text-base"
                      :color="
                        selectedRecord.flight === 'verified'
                          ? 'green'
                          : selectedRecord.flight === 'pending'
                          ? 'orange'
                          : 'red'
                      "
                    >
                      {{ selectedRecord.flight }}
                    </a-tag>
                  </div>
                </div>

                <div>
                  <div class="text-xl text-blue-600 font-semibold">
                    {{ selectedRecord.salary }}
                  </div>
                  <!-- <span>{{
                    selectedRecord.skills === "Sơ cấp"
                      ? "2 năm kinh nghiệm"
                      : "update sau"
                  }}</span> -->
                </div>
              </div>
              <!--  -->
              <a-tag class="flex p-7">
                <a-tag color="processing">
                  <HomeOutlined class="p-2 text-3xl" />
                </a-tag>
                <div>
                  <div class="text-base">
                    {{ selectedRecord.enterpriseName }}
                  </div>
                  <div>
                    <span class="flex items-center gap-1 text-sm text-gray-500"
                      ><MailOutlined />{{
                        selectedRecord.enterpriseEmail
                      }}</span
                    >
                  </div>
                </div>
              </a-tag>
              <!--  -->
              <div class="rounded-lg border overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b">
                  <span>Nội dung công việc</span>
                </div>
                <div class="p-5">
                  <div class="text-sm">Tên công việc</div>
                  <span class="text-lg font-semibold">{{
                    selectedRecord.title
                  }}</span>
                  <div class="text-sm mt-5">Mô tả công việc</div>
                  <span class="text-base font-medium">{{
                    selectedRecord.description
                  }}</span>
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
  CheckCircleOutlined,
  ChromeOutlined,
  DownOutlined,
  ExportOutlined,
  FacebookOutlined,
  GlobalOutlined,
  HomeOutlined,
  LinkedinOutlined,
  LinkOutlined,
  MailOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

// let startDate = new Date("2024-11-21");
// let endDate = new Date("2024-11-26");

// // Lấy ngày hôm nay (mốc hiện tại)
// let today = new Date();

// // Kiểm tra nếu hôm nay nằm trong khoảng startDate và endDate
// if (today <= endDate) {
//   // Tính số ngày còn lại (endDate - today)
//   let remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
//   console.log(`Số ngày còn lại là: ${remainingDays}`);
// } else {
//   console.log("hết hạn");
// }
const store = useStore();

const open = ref(false);
const searchInput = ref("");
const selectedRecord = ref(null);

const data = computed(() => {
  if (!searchInput.value) return store.getters.Jobs;

  return store.getters.Jobs.filter((item) =>
    item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});
const columns = [
  {
    title: "Tên công việc",
    dataIndex: "title",
    key: "title",
    width: "20%",
  },
  {
    title: "Mức lương",
    dataIndex: "salary",
    key: "salary",
    width: "10%",
  },
  {
    title: "Level",
    dataIndex: "rank",
    key: "rank",
    width: "15%",
  },

  {
    title: "Doanh nghiệp",
    dataIndex: "enterpriseName",
  },
  {
    title: "Ngày tạo",
    dataIndex: "updateDate",
    key: "updateDate",
  },

  {
    title: "Thời gian hết ",
    dataIndex: "deadline",
  },
  {
    title: "trạng thái",
    key: "flight",
    dataIndex: "flight",
    width: "10%",
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
    onFilter: (value, record) => record.flight === value,
  },
  { title: "Hành động", key: "actions" },
];

const showModal = (record) => {
  selectedRecord.value = record;
  open.value = true;
};
const updateStatus = async (record, newStatus) => {
  store.dispatch("updateJobStatus", {
    id: record.id,
    flight: newStatus,
  });
  message.success(`Trạng thái đã được cập nhật thành ${newStatus}`);
};
const pag = reactive({
  current: 1,
  pageSize: 5,
  total: data.value.length,
});

const onChange = (pagination, filters, sorter) => {
  pag.current = pagination.current;
  pag.currentPage = pagination.currentPage;
};
const getRankColor = (rank) => {
  switch (rank) {
    case "Fresher":
      return "blue";
    case "Intern":
      return "purple";
    case "Junior":
      return "green";
    case "Senior":
      return "gold";
    case "Lead":
      return "red";
  }
};
onMounted(async () => {
  store.dispatch("getJobs");
  store.dispatch("getEnterprises");
});
</script>

<style scoped></style>
