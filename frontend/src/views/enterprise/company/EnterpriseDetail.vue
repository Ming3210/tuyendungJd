<template>
  <div class="max-w-full p-4">
    <div class="flex flex-col md:flex-row gap-8 md:gap-[100px]">
      <!-- Avatar section -->
      <div
        class="relative w-full h-[312px] md:w-[200px] gap-[24px] flex flex-col items-center md:items-start"
      >
        <p class="mb-2 md:mb-0 font-[600] text-[18px]">Ảnh đại diện</p>
        <div class="relative">
          <img
            v-if="!isEditting"
            :src="avatarPreviewUrl || enterprise?.avatar"
            alt="Company Avatar"
            class="w-[200px] h-[200px] rounded-full object-cover"
          />
          <img
            v-else
            @click="$refs.fileInput.click()"
            :src="avatarPreviewUrl || enterprise?.avatar"
            alt="Company Avatar"
            class="w-[200px] h-[200px] rounded-full hover:cursor-pointer object-cover"
          />
          <input
            type="file"
            ref="fileInput"
            @change="changeImage"
            accept="image/*"
            class="hidden"
          />
          <div
            v-if="!isEditting"
            class="absolute bottom-[10px] right-0 bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 border-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                fill="#12B76A"
              />
            </svg>
          </div>
          <div
            v-if="isEditting"
            @click="$refs.fileInput.click()"
            class="absolute bottom-[10px] right-0 bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 border-white cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6ZM10.5002 7.25H13.5002C13.9102 7.25 14.2502 7.59 14.2502 8C14.2502 8.41 13.9102 8.75 13.5002 8.75H10.5002C10.0902 8.75 9.75017 8.41 9.75017 8C9.75017 7.59 10.0902 7.25 10.5002 7.25ZM12.0002 18.12C10.1402 18.12 8.62017 16.61 8.62017 14.74C8.62017 12.87 10.1302 11.36 12.0002 11.36C13.8702 11.36 15.3802 12.87 15.3802 14.74C15.3802 16.61 13.8602 18.12 12.0002 18.12Z"
                fill="#848484"
              />
            </svg>
          </div>
        </div>
        <p v-if="isEditting" class="text-center md:text-left mt-4 md:mt-0">
          Định dạng PNG hoặc JPG
        </p>
      </div>

      <!-- Company info section -->
      <div class="flex-1 w-full">
        <div class="flex items-center gap-[12px] mb-6">
          <h1 v-if="!isEditting" class="text-xl font-semibold">
            {{ enterprise?.title }}
          </h1>
          <h1 class="" v-else>
            <a-input
              class="w-[300px] font-bold"
              :value="enterprise?.title"
              @input="(event) => (enterprise.title = event.target.value)"
            ></a-input>
          </h1>
          <button
            v-if="!isEditting"
            @click="edit"
            class="text-red-500 bg-red-100 py-[8px] px-[14px] rounded-lg flex items-center gap-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0514 3.00002L4.20976 10.2417C3.95142 10.5167 3.70142 11.0584 3.65142 11.4334L3.34309 14.1334C3.23476 15.1084 3.93476 15.775 4.90142 15.6084L7.58476 15.15C7.95976 15.0834 8.48475 14.8084 8.74309 14.525L15.5848 7.28335C16.7681 6.03335 17.3014 4.60835 15.4598 2.86668C13.6264 1.14168 12.2348 1.75002 11.0514 3.00002Z"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.91016 4.20831C10.2685 6.50831 12.1352 8.26665 14.4518 8.49998"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 18.3333H17.5"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Chỉnh sửa
          </button>
        </div>

        <!-- Grid layout for company details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Mã số thuế</h3>
            <p>{{ enterprise?.businessLicense }}</p>
          </div>

          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Lĩnh vực hoạt động</h3>
            <p>{{ enterprise?.industry }}</p>
          </div>
          <div class="" v-else>
            <h3 class="text-gray-600 mb-1">Lĩnh vực hoạt động</h3>
            <a-input
              :value="enterprise.industry"
              @input="(event) => (enterprise.industry = event.target.value)"
            ></a-input>
          </div>

          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Quy mô công ty</h3>
            <p>{{ enterprise?.companySize }} nhân viên</p>
          </div>
          <div class="" v-else>
            <h3 class="text-gray-600 mb-1">Quy mô công ty</h3>
            <a-input
              :value="enterprise.companySize"
              @input="(event) => (enterprise.companySize = event.target.value)"
            ></a-input>
          </div>

          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Số điện thoại</h3>
            <p>{{ enterprise?.phoneNumber }}</p>
          </div>
          <div v-else>
            <h3 class="text-gray-600 mb-1">Số điện thoại</h3>
            <a-input
              :value="enterprise.phoneNumber"
              @input="(event) => (enterprise.phoneNumber = event.target.value)"
            ></a-input>
          </div>
          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Website link</h3>
            <a :href="enterprise?.websiteUrl"
              ><p class="truncate">{{ enterprise?.websiteUrl }}</p></a
            >
          </div>
          <div v-else>
            <h3 class="text-gray-600 mb-1">Website link</h3>
            <a-input
              :value="enterprise.websiteUrl"
              @input="(event) => (enterprise.websiteUrl = event.target.value)"
            ></a-input>
          </div>
          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Facebook link</h3>
            <a :href="enterprise?.facebookUrl"
              ><p class="truncate">{{ enterprise?.facebookUrl }}</p></a
            >
          </div>
          <div v-else>
            <h3 class="text-gray-600 mb-1">Facebook link</h3>
            <a-input
              :value="enterprise.facebookUrl"
              @input="(event) => (enterprise.facebookUrl = event.target.value)"
            ></a-input>
          </div>
          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Linkedin link</h3>
            <a :href="enterprise?.linkedinUrl"
              ><p class="truncate">{{ enterprise?.linkedinUrl }}</p></a
            >
          </div>
          <div v-else>
            <h3 class="text-gray-600 mb-1">Linkedin link</h3>
            <a-input
              :value="enterprise.facebookUrl"
              @input="(event) => (enterprise.linkedinUrl = event.target.value)"
            ></a-input>
          </div>
          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Số điện thoại</h3>
            <p>{{ enterprise?.phoneNumber }}</p>
          </div>
          <div v-else>
            <h3 class="text-gray-600 mb-1">Số điện thoại</h3>
            <a-input
              :value="enterprise.phoneNumber"
              @input="(event) => (enterprise.phoneNumber = event.target.value)"
            ></a-input>
          </div>

          <div v-if="!isEditting">
            <h3 class="text-gray-600 mb-1">Địa chỉ</h3>
            <p>{{ enterprise?.address }}</p>
          </div>
          <div v-else>
            <h3 class="text-gray-600 w-full mb-1">Địa chỉ</h3>
            <a-input
              :value="enterprise.address"
              @input="(event) => (enterprise.address = event.target.value)"
            ></a-input>
          </div>
        </div>
        <div v-if="isEditting" class="flex gap-10 justify-end mt-10">
          <a-button @click="cancel" class="w-[161px] h-[48px]">Hủy</a-button>
          <a-button
            @click="editEnterpriseProfile"
            class="w-[213px] h-[48px] bg-[#AB1F24] hover:text-white"
            >Cập nhật</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { storage } from "@/firebase/firebase";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const avatarFile = ref(null);
const avatarPreviewUrl = ref("");
const isUploading = ref(false);
const fileInput = ref(null);

const route = useRoute();
const store = useStore();
const isEditting = ref(false);
const { id } = route.params;
const enterprise = computed(() => store.state.enterprise.currentEnterprise);

const edit = () => {
  isEditting.value = true;
};

const changeImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
    message.error("Chỉ chấp nhận file PNG hoặc JPG");
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    message.error("Kích thước file không được vượt quá 5MB");
    return;
  }

  avatarFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreviewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const uploadImage = async () => {
  if (!avatarFile.value) return null;

  try {
    isUploading.value = true;
    const fileExtension = avatarFile.value.name.split(".").pop();
    const fileName = `enterprise_${id}_${Date.now()}.${fileExtension}`;
    const storageReference = storageRef(storage, `enterprises/${fileName}`);

    const snapshot = await uploadBytes(storageReference, avatarFile.value);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    message.error("Tải ảnh lên thất bại");
    return null;
  } finally {
    isUploading.value = false;
  }
};

const editEnterpriseProfile = async () => {
  try {
    let imageUrl = enterprise.value.avatar;

    if (avatarFile.value) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const newEnterprise = {
      ...enterprise.value,
      avatar: imageUrl,
    };

    await store.dispatch("updateEnterpriseInfo", newEnterprise);
    message.success("Cập nhật thành công");
    isEditting.value = false;
  } catch (error) {
    console.error("Update failed:", error);
    message.error("Cập nhật thất bại");
  }
};

const cancel = () => {
  isEditting.value = false;
  avatarPreviewUrl.value = "";
  avatarFile.value = null;
  message.error("Hủy cập nhật dữ liệu");
};

onMounted(() => {
  store.dispatch("getEnterpriseInfo", id);
});
</script>

<style></style>
