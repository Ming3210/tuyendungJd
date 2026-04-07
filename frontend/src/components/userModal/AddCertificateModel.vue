<template>
  <div class="bg-white">
    <h2 class="text-2xl font-bold mb-6 bg-">Thêm Chứng Chỉ</h2>
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
          :max="formData.expirationDate"
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
          :disabled="isSubmitting"
          class="bg-[#AB1F24] hover:bg-red-700 h-[50px] w-[50%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Thêm chứng chỉ
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { PlusCircleFilled } from "@ant-design/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const emit = defineEmits(["cancel"]);
const formData = reactive({
  certificateType: "default",
  certificateValue: "",
  receivedDate: "",
  expirationDate: "",
  certificateId: "",
});

const certificateValues = ref([]);
const isSubmitting = ref(false);
const user = computed(() => store.getters.User);

///

///
const certificateTypes = computed(() => {
  return store.getters.allCertificateTypes;
});

const updateSelectValues = () => {
  const selectedCertificate = certificateTypes.value.find(
    (cert) => cert.type === formData.certificateType
  );
  console.log(selectedCertificate);
  formData.certificateId = selectedCertificate.id;

  certificateValues.value = selectedCertificate
    ? selectedCertificate.value
    : [];
  console.log(certificateValues.value);
  formData.certificateValue = certificateValues.value[0] || "";
};

const cancel = () => {
  emit("cancel");
};

const submitForm = async () => {
  isSubmitting.value = true;

  const newCertificate = {
    certificateType: formData.certificateType,
    certificateValue: formData.certificateValue,
    receivedDate: formData.receivedDate,
    expirationDate: formData.expirationDate,
    userId: user.value.id,
    certificateId: formData.certificateId,
  };
  cancel();
  store.dispatch("addCertificate", newCertificate);
};

onMounted(() => {
  store.dispatch("getCertificateTypes");
});
</script>
