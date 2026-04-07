<template>
  <div class="bg-white">
    <h2 class="text-2xl font-bold mb-6">Tải CV của Bạn lên</h2>
    <a-divider></a-divider>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="cvFile" class="block text-gray-700 font-bold mb-2"
          >PDF Tài liệu</label
        >
        <input type="file" required accept=".pdf" @change="onFileChange" />
      </div>

      <div class="mb-4">
        <label for="language" class="block text-gray-700 font-bold mb-2"
          >Ngôn ngữ CV</label
        >
        <select
          id="language"
          v-model="formData.language"
          required
          @change="updateSelectValues"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option disabled value="">Chọn ngôn ngữ</option>
          <option
            v-for="language in cvLanguages"
            :key="language.id"
            :value="language.language"
          >
            {{ language.language }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-bold mb-2"
          >Tiêu đề CV</label
        >
        <input
          type="text"
          v-model="formData.title"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
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
          class="bg-[#AB1F24] hover:bg-red-700 h-[50px] w-[50%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Thêm CV
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
const store = useStore();
const emit = defineEmits(["cancel"]);
const formData = reactive({
  languageId: "",
  language: "",
  title: "",
  pdf: null,
  pdfDataUrl: "",
  date: "",
});

const user = computed(() => store.getters.User);
const cvLanguages = computed(() => store.getters.allCvLanguages);
const updateSelectValues = () => {
  const selectedCv = cvLanguages.value.find(
    (lang) => lang.language === formData.language
  );
  console.log(selectedCv);
  formData.languageId = selectedCv.id;
};

const onFileChange = async (event) => {
  const file = event.target.files[0];
  formData.pdf = file.name;
  formData.date = file.lastModifiedDate.toLocaleString();

  if (file) {
    // Tạo đường dẫn trong Firebase Storage
    const fileRef = storageRef(storage, `cvs/${file.name}`);

    try {
      // Upload ảnh lên Firebase Storage
      await uploadBytes(fileRef, file);
      console.log("Ảnh đã được tải lên Firebase thành công");

      // Lấy URL tải về của ảnh sau khi upload
      const downloadURL = await getDownloadURL(fileRef);

      ///cập nhật lại biến reactive

      formData.pdfDataUrl = downloadURL;
      console.log("URL ảnh đã được cập nhật:", downloadURL);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên Firebase:", error);
    }
  }
};

const cancel = () => {
  emit("cancel");
};

const submitForm = () => {
  const newCv = {
    languageId: formData.languageId,
    language: formData.language,
    title: formData.title,
    pdf: formData.pdf,
    pdfDataUrl: formData.pdfDataUrl,
    userId: user.value.id,
    date: formData.date,
    status: false,
  };

  store.dispatch("addCv", newCv);
  cancel();
};

onMounted(() => {
  store.dispatch("getCvLanguages");
});
</script>
