<template>
  <div>
    <div class="" v-if="isOpen">
      <BookingModel @cancel="cancel" />
    </div>
    <Header class="mb-[50px]" />
    <div class="flex ml-[110px] justify-between">
      <div class="flex w-[500px] gap-[20px]">
        <div class="img">
          <img
            class="w-[180px] h-[200px] rounded-md object-cover"
            :src="candidate?.avatar"
            alt=""
          />
        </div>
        <div>
          <div class="gap-[16px]">
            <div>
              <p class="name1 w-[300px] h-[40px] font-bold">
                {{ candidate?.fullName }}
              </p>
              <!-- Bind candidate's name -->
            </div>
            <div class="flex gap-[12px]">
              <p class="text-item">
                {{ calculateAge(candidate?.birthdate) }} tuổi
              </p>
              <!-- Bind candidate's age -->
              <p class="location min-w-[70px] justify-center flex">
                {{ candidate?.position }}
              </p>
            </div>
          </div>
          <div>
            <div class="flex gap-4">
              <p>
                <font-awesome-icon
                  :icon="['fas', 'graduation-cap']"
                  class="icon"
                />
              </p>
              <p class="text font-bold">Trình độ :</p>
              <p class="text-item">{{ candidate?.level }}</p>
              <!-- Bind candidate's degree -->
            </div>
            <div class="flex gap-4">
              <p>
                <font-awesome-icon :icon="['fas', 'language']" class="icon" />
              </p>
              <div class="text font-bold w-[90px]">Ngoại ngữ :</div>
              <span
                v-for="(edu, index) in candidate?.foreignLanguage"
                :key="index"
              >
                {{ edu
                }}<span
                  class="m-0 p-0"
                  v-if="index < candidate?.foreignLanguage.length - 1"
                  >,
                </span>
              </span>
              <!-- Bind candidate's language -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="isAllowedToViewCVP">
        <button @click="openModal" class="btn w-[170px] h-[40px] mr-[110px]">
          Hẹn lịch phỏng vấn
        </button>
      </div>
    </div>
    <div class="mt-10 mb-10 flex justify-center">
      <hr class="w-[85.5%]" />
    </div>
    <div class="ml-[110px]" v-if="isAllowedToViewCV">
      <div class="flex gap-[12px]">
        <p>
          <font-awesome-icon
            :icon="['fas', 'book']"
            class="text-[rgba(188,34,40,1)]"
          />
        </p>
        <p class="cv font-bold">Danh sách CV</p>
        <!-- khung cv -->
      </div>
      <div>
        <div class="grid grid-cols-4 gap-4 mb-[20px] mr-[80px]">
          <a-card
            v-for="cv in filteredCvs"
            :key="cv.id"
            class="bg-white rounded-lg shadow-md"
            hoverable
            style="width: 280px; position: relative; right: 0"
          >
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
                    [CV]{{ cv.pdf }}
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
                  <font-awesome-icon :icon="['fas', 'eye']" />
                  Xem</a
                >
              </button>
              <div v-if="cv.status === false" class="text-red-500 mt-0">
                Đang chờ xét duyệt
              </div>
            </template>
          </a-card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BookingModel from "@/components/BookingModel.vue";
const cancel = () => {
  isOpen.value = false;
};
const store = useStore();
const route = useRoute();
const userId = route.params.id;
const users = computed(() => store.state.login.users);
const isOpen = ref(false);
const loggedUser = computed(() => {
  const users = store.state.login.users;
  const loggedUserId = JSON.parse(localStorage.getItem("token"));
  return users.find((u) => u.id == loggedUserId);
});
console.log(loggedUser);

const isAllowedToViewCV = computed(() => {
  return (
    loggedUser.value?.role === "partner" ||
    loggedUser.value?.role === "admin" ||
    loggedUser.value?.role === "user"
  );
});
const isAllowedToViewCVP = computed(() => {
  return loggedUser.value?.role === "partner";
});

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const cv = computed(() => store.state.user.cv);

const filteredCvs = computed(() => {
  if (cv.value && cv.value.length > 0) {
    // console.log(loggedUser);

    // console.log(loggedUser.value?.id == userId);
    if (loggedUser.value?.id == userId) {
      // Nếu người dùng hiện tại là người dùng đang đăng nhập, hiển thị tất cả CV của người đó
      console.log(cv.value);

      return cv.value.filter((item) => item.userId == userId);
    } else {
      // Nếu không phải người dùng đăng nhập, chỉ hiển thị CV có status là true
      // console.log("1111111");

      return cv.value.filter((item) => {
        return item.userId == userId && item.status == true;
      });
    }
  }
  return []; // Trả về mảng rỗng nếu không có dữ liệu
});

// console.log(filteredCvs);

onMounted(async () => {
  await store.dispatch("getDetailCandidate", userId);
  await store.dispatch("getAllUsers");
  await store.dispatch("getCvCdd");
});
const candidate = computed(() => {
  return store.state.candidateDetail.candidateDetail;
});
const openModal = () => {
  isOpen.value = true;
};
</script>

<style scoped>
.btn {
  color: rgba(255, 255, 255, 1);
  background: rgba(171, 31, 36, 1);
  border-radius: 8px;
}
.img {
  border-radius: 8px;
}
.name1 {
  font-family: "SF Pro Displays", sans-serif;
  font-size: 32px;
  line-height: 40px;
  color: rgba(0, 0, 0, 1);
}
.icon {
  color: rgba(188, 34, 40, 1);
}
.text {
  color: rgba(45, 44, 44, 1);
  font-size: 16px;
  font-family: "SF Pro Displays", sans-serif;
}
.text-item {
  color: rgba(103, 103, 103, 1);
  font-family: "SF Pro Displays", sans-serif;
  font-size: 16px;
}
.location {
  background-color: rgba(254, 243, 242, 1);
  border-radius: 11px;
  color: rgba(180, 35, 24, 1);
}
.cv {
  font-family: "SF Pro Displays", sans-serif;
  color: rgba(45, 44, 44, 1);
  font-size: 18px;
}
.cv-cover-container {
  position: relative;
  height: 200px;
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
