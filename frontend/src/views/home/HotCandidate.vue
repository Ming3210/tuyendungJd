<template>
  <div class="flex justify-center">
    <div class="min-h-[478px] w-full bg-[rgba(250,250,250,1)] relative z-10">
      <div class="absolute top-0 left-0 -z-10">
        <img src="../../assets/decorJob.svg" alt="" />
      </div>
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 z-10 mt-10 ml-[130px]">
        <h2 class="text-2xl font-bold">Ứng viên nổi bật</h2>
        <router-link
          to="/homepage/candidate"
          class="header-item flex items-center mr-[130px]"
        >
          Xem tất cả
          <font-awesome-icon
            :icon="['fas', 'angle-right']"
            class="h-4 w-4 ml-1 header-item"
          />
        </router-link>
      </div>

      <!-- Candidates Grid -->
      <div class="flex justify-center">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-[10px] md:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="candidate in limitedCandidates"
            :key="candidate.id"
            class="w-full h-[222px] p-[20px] gap-[16px] bg-[rgba(255,255,255,1)] rounded-lg shadow-md"
            @click="handleClick(candidate.id)"
            :class="{
              'cursor-not-allowed':
                !currentUser || currentUser.status !== 'active',
              'hover:shadow-lg hover:cursor-pointer':
                currentUser && currentUser.status === 'active',
            }"
          >
            <div class="flex w-full h-[118px] justify-between">
              <div
                class="gap-[8px] w-[158px] h-[102px] border-[rgba(221,221,221,1)]"
              >
                <img
                  class="w-[52px] h-[52px] img rounded-lg"
                  :src="candidate.avatar"
                  :alt="candidate.name"
                />
                <div class="w-[158px] h-[18px]">
                  <p
                    class="text-[rgba(0,0,0,1)] text-[16px] font-semibold w-[158px] h-[18px]"
                  >
                    {{ candidate.fullName }}
                  </p>
                  <p class="text-[rgba(103,103,103,1)] mt-1">
                    {{ calculateAge(candidate.birthdate) }} tuổi
                  </p>
                </div>
              </div>
              <p
                :class="[
                  'w-[107px] text-[12px] h-[22px] flex items-center justify-center rounded-xl',
                  {
                    'bg-[rgba(236,253,243,1)] text-[rgba(2,122,72,1)] ':
                      candidate.position === 'Project Manager',
                    'bg-[rgba(238,244,255,1)] text-[rgba(53,56,205,1)]':
                      candidate.position === 'Full-stack Developer',
                    'bg-[rgba(255,246,237,1)] text-[rgba(196,50,10,1)]':
                      candidate.position === 'Front-end Developer',
                    'bg-[rgba(245,246,255,1)] text-[#8c70a7]':
                      candidate.position === 'Tester',
                    'bg-[#e1e1e6] text-[#c77138]':
                      candidate.position === 'Software Engineer',
                    'bg-[#e1e1e6] text-[#f05151]':
                      candidate.position === 'Team Lead',
                  },
                ]"
              >
                {{ candidate.position }}
              </p>
            </div>
            <hr class="my-2" />

            <!--  -->
            <div>
              <div class="w-full h-[48px]">
                <div class="w-full flex h-[20px] mb-[8px]">
                  <div class="flex items-center w-[16px] h-[16px]">
                    <font-awesome-icon
                      :icon="['fas', 'graduation-cap']"
                      class="text-[rgba(188,34,40,1)]"
                    />
                  </div>

                  <div class="w-[116px] h-[20px] flex gap-[20px] ml-[10px]">
                    <p
                      class="text-[rgba(45,44,44,1)] text-[14px] w-[70px] h-[20px] lv"
                    >
                      Trình độ:
                    </p>
                    <p
                      class="w-[41px] h-[20px] text-[rgba(103,103,103,1)] flex items-center"
                    >
                      {{ candidate.level }}
                    </p>
                  </div>
                </div>

                <div class="flex w-[242px] h-[20px]">
                  <div class="flex items-center w-[16px] h-[16px]">
                    <font-awesome-icon
                      :icon="['fas', 'box-archive']"
                      class="text-[rgba(188,34,40,1)]"
                    />
                  </div>

                  <div class="w-[156px] h-[20px] flex ml-[10px]">
                    <p
                      class="text-[rgba(45,44,44,1)] text-[14px] min-w-[80px] h-[20px] lv"
                    >
                      Ngoại Ngữ:
                    </p>
                    <p
                      v-for="(edu, index) in candidate.foreignLanguage?.slice(
                        0,
                        1
                      )"
                      :key="index"
                      class="w-[65px] ml-0 h-[20px] text-[rgba(103,103,103,1)] flex items-center"
                    >
                      {{ edu }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script setup>
import candidate from "@/store/modules/candidate.module";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const candidates = computed(() => store.state.candidate.candidates);
// console.log(candidates.value, 999999);

const handleClick = (id) => {
  if (!currentUser || currentUser.value.status !== "active") {
    return;
  }
  router.push(`/homepage/candidate/candidateDetail/${id}`);
};

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
const limitedCandidates = computed(() => {
  const candidates = store.state.candidate.candidates;
  const returnCandidate = candidates.filter((c) => c.role === "user"); // Lọc chỉ các ứng viên có role là "user"
  return returnCandidate.slice(0, 4); // Lấy tối đa 4 ứng viên
});

const userId = JSON.parse(localStorage.getItem("token"));
const users = computed(() => store.state.login.users);
const currentUser = computed(() => {
  return users.value.find((user) => user.id === userId);
});

onMounted(() => {
  store.dispatch("getAllCandidates");
});
</script>

<style scoped>
.header-item {
  font-size: 16px;
  font-family: "SF Pro Display", sans-serif;
  color: rgba(188, 34, 40, 1);
}

.img {
  border: 1px solid rgba(204, 204, 204, 1);
  color: rgba(250, 250, 250, 1);
}

.lv {
  font-family: "SF Pro Display", sans-serif;
}

@media (max-width: 768px) {
  .md\:h-\[478px\] {
    height: auto;
  }

  .w-full {
    width: 100%;
  }

  .max-w-\[1440px\] {
    max-width: 100%;
  }

  .p-4 {
    padding: 1rem;
  }

  .max-w-\[282px\] {
    max-width: 100%;
  }

  .h-\[222px\] {
    height: auto;
  }
}
</style>
