<template>
  <div class="relative w-full h-full">
    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
      v-if="isAddModalOpen || isEditModalOpen"
    ></div>

    <!-- Add CV Modal -->
    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mx-auto max-w-[500px] w-full px-4"
      v-if="isAddModalOpen"
    >
      <div class="bg-white rounded-lg shadow-lg p-8">
        <AddCvModal @cancel="cancel" />
      </div>
    </div>

    <!-- Edit CV Modal -->
    <!-- <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 mx-auto max-w-[500px] w-full px-4"
      v-if="isEditModalOpen"
    >
      <div class="bg-white rounded-lg shadow-lg p-8">
        <EditCertificateModel @cancel="cancel" :certificate="editRecord" />
      </div>
    </div> -->

    <!-- CV Display Area -->
    <div class="bg-custom p-6 z-0">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between">
          <div>
            <h2 class="text-[18px] font-[600]">CV đã tải lên</h2>
            <p class="font-[400] text-[16px] text-gray-700">
              Hãy xem và cập nhật CV mới nhất của bạn
            </p>
          </div>
          <div class="mr-[100px]">
            <button
              @click="isAddModalOpen = true"
              class="bg-[#f8e9ea] gap-[4px] text-[#ab1f24] flex items-center justify-center border-0 w-[150px] h-[48px] font-[700] text-[16px] rounded-md"
            >
              <UploadOutlined />Tải CV lên
            </button>
          </div>
        </div>

        <di v class="grid grid-cols-3 gap-5 mb-[10px] mr-[80px]">
          <div v-for="cv in paginatedCv" :key="cv.id" class="relative">
            <a-badge-ribbon
              :text="cv.status ? 'đạt yêu cầu ' : 'đang xử lý'"
              :color="cv.status ? 'green' : 'orange'"
              class="z-10"
            ></a-badge-ribbon>

            <a-card class="bg-white rounded-lg relative shadow-md" hoverable>
              <template #cover>
                <div
                  class="cv-cover-container bg-gradient-to-t from-[rgba(19,12,45,1)] to-[rgba(19,12,45,0)]"
                >
                  <img
                    class="cv-cover-image"
                    alt="example"
                    src="https://i.pinimg.com/236x/02/51/a3/0251a343c25f47b11800d8014364332b.jpg"
                  />
                  <div class="cv-cover-overlay">
                    <h1 class="font-medium text-base inline-block text-pretty">
                      [CV]{{ cv.pdf }}-<span class="font-bold">{{
                        cv.language
                      }}</span>
                    </h1>
                    <div class="text-xs font-light">
                      Cập nhật lần cuối {{ cv.date }}
                    </div>
                  </div>
                </div>
              </template>

              <template #actions>
                <button class="custom-btn">
                  <a
                    :href="cv.pdfDataUrl"
                    target="blank"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      gap: 5px;
                      color: black;
                    "
                  >
                    <EyeOutlined /> Xem</a
                  >
                </button>

                <button class="border p-1 rounded-full flex ml-[60px]">
                  <DeleteOutlined @click="showConfirm(cv)" />
                </button>
              </template>
            </a-card>
          </div>
        </di>

        <a-pagination
          v-if="cv.length > 0"
          v-model:current="current"
          :total="cv.length"
          :page-size="pageSize"
          @change="handlePageChange"
          show-less-items
          class="text-end mr-[100px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import EditCertificateModel from "@/components/userModal/EditCertificateModel.vue";
import AddCvModal from "@/components/userModal/AddCvModal.vue";
import {
  DeleteOutlined,
  UploadOutlined,
  EyeFilled,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
const store = useStore();
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const current = ref(1);
const pageSize = ref(6);

const cv = computed(() => store.getters.Cv);

const paginatedCv = computed(() => {
  const start = (current.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return cv.value.slice(start, end);
});

const cancel = () => {
  isAddModalOpen.value = false;
  isEditModalOpen.value = false;
};
const showConfirm = (cv) => {
  Modal.confirm({
    title: `bạn có muốn xóa CV ${cv.pdf}`,
    icon: createVNode(ExclamationCircleOutlined),

    onOk() {
      store.dispatch("removeCv", cv.id);
    },

    onCancel() {},
  });
};
// const handleDelete = (cv) => {
//   // store.dispatch("removeCertificate", .id);
//   console.log("test delete", cv);
// };

const handlePageChange = (page, pagesize) => {
  current.value = page;
  pageSize.value = pagesize;
  console.log(page, pagesize);
};

onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem("token"));
  if (userId) {
    await store.dispatch("getUser", userId);
    await store.dispatch("getCv");
  }
});
</script>
<style scoped>
.custom-btn {
  padding: 0 0.5rem;
  border-radius: 1rem;
  border: 1px solid;
}
.cv-cover-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.cv-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  mask-image: linear-gradient(to top, transparent 0%, black 100%);
}

.cv-cover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  color: white;
}
</style>
