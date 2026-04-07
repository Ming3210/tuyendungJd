<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Chỉnh sửa chứng chỉ</h2>
    <a-divider></a-divider>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="certificate" class="block text-gray-700 font-bold mb-2">
          Chứng chỉ/Bằng cấp
        </label>
        <select
          id="certificate"
          v-model="formData.certificateType"
          @change="updateSelectValues"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="default">Chọn chứng chỉ</option>
          <option
            v-for="certificate in certificateTypes"
            :key="certificate.id"
            :value="certificate.type"
          >
            {{ certificate.type }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="score" class="block text-gray-700 font-bold mb-2">
          Xếp loại
        </label>
        <select
          id="score"
          v-model="formData.certificateValue"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        >
          <option
            v-for="value in certificateValues"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="date" class="block text-gray-700 font-bold mb-2">
          Ngày cấp
        </label>
        <input
          type="date"
          id="date"
          v-model="formData.receivedDate"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
      </div>
      <div class="mb-4">
        <label for="date" class="block text-gray-700 font-bold mb-2">
          Thời hạn
        </label>
        <input
          type="date"
          id="date"
          v-model="formData.expirationDate"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
      </div>

      <div class="flex justify-between">
        <button
          @click="cancel"
          type="button"
          class="bg-gray-200 font-bold w-[40%] h-[50px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="bg-[#AB1F24] hover:bg-red-700 h-[50px] flex items-center justify-center gap-2 w-[50%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <PlusCircleOutlined />
          Xác nhận
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["cancel"]);
const props = defineProps(["certificate"]);

const certificateValues = ref([]);

const formData = reactive({
  certificateType: props.certificate.certificateType,
  certificateValue: props.certificate.certificateValue,
  receivedDate: props.certificate.receivedDate,
  expirationDate: props.certificate.expirationDate,
});

const isSubmitting = ref(false);
const user = computed(() => store.getters.User);
const certificateTypes = computed(() => store.getters.allCertificateTypes);

const updateSelectValues = () => {
  const selectedCertificate = certificateTypes.value.find(
    (cert) => cert.type === formData.certificateType
  );

  if (selectedCertificate) {
    certificateValues.value = selectedCertificate.value;

    if (!certificateValues.value.includes(formData.certificateValue)) {
      formData.certificateValue = certificateValues.value[0] || "";
    }
  } else {
    certificateValues.value = [];
    formData.certificateValue = "";
  }
};

onMounted(() => {
  updateSelectValues();
});

const cancel = () => {
  emit("cancel");
};

const submitForm = async () => {
  isSubmitting.value = true;

  const updatedCertificate = {
    certificateType: formData.certificateType,
    certificateValue: formData.certificateValue,
    receivedDate: formData.receivedDate,
    id: props.certificate.id,
    expirationDate: formData.expirationDate,
  };

  store.dispatch("updateCertificate", updatedCertificate);
  cancel();
};
</script>
