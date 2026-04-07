<template>
  <div class="flex min-h-screen w-[100%] h-[680px]">
    <div class="flex flex-col justify-center w-full md:w-1/2 p-12 bg-white">
      <div class="mx-auto w-[451px]">
        <div>
          <img
            class="absolute top-[-174px] left-[1px] w-[490px] h-[300px]"
            src="../../assets/decor.svg"
            alt=""
          />
        </div>

        <!-- Logo container -->
        <div class="flex items-center mb-8">
          <img src="../../assets/rikkei.svg" alt="Rikkei" class="h-8" />
          <img src="../../assets/jobs.svg" alt="Jobs" class="h-8 ml-1" />
        </div>

        <!-- Form content -->
        <h2 class="text-[32px] font-bold text-[#101828] mb-2">Đăng ký</h2>
        <p class="text-[#667085] text-base mb-8">
          Cùng phát triển con đường sự nghiệp với Rikkei Jobs
        </p>

        <form @submit.prevent="onFinish">
          <!-- Username -->
          <div class="mb-5 relative">
            <label
              class="block text-gray-900 font-sf-pro-display mb-1"
              for="userName"
              >Tên đăng nhập</label
            >
            <div class="flex items-center border rounded-md">
              <UserOutlined class="text-gray-400 w-5 h-5 absolute left-3" />
              <input
                v-model="formState.userName"
                type="text"
                id="userName"
                placeholder="tên đăng nhập"
                class="w-full px-10 py-2 border-none rounded-md outline-none focus:border-red-500"
              />
            </div>
            <p v-if="!isUsernameAvailable" class="text-red-500 text-sm mt-1.5">
              Tên đăng nhập đã tồn tại
            </p>
          </div>

          <!-- Email -->
          <div class="mb-5">
            <label
              class="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
              for="email"
            >
              Email
            </label>
            <div class="flex items-center border border-[#D0D5DD] rounded-lg">
              <UserOutlined class="text-[#667085] w-5 h-5 ml-3 mr-2" />
              <input
                v-model="formState.email"
                type="email"
                id="email"
                placeholder="you@company.com"
                class="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828] placeholder-[#667085]"
              />
            </div>
            <p v-if="!isEmailAvailable" class="text-red-500 text-sm mt-1.5">
              Email đã tồn tại
            </p>
          </div>

          <div class="mb-5">
            <label
              class="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
              for="password"
            >
              Mật khẩu
            </label>
            <div
              class="flex items-center border border-[#D0D5DD] rounded-lg relative"
            >
              <LockOutlined class="text-[#667085] w-5 h-5 ml-3 mr-2" />
              <input
                v-model="formState.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="********"
                class="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828] opacity-75 focus:opacity-100"
              />

              <EyeInvisibleOutlined
                v-if="!showPassword"
                @click="togglePassword"
                class="absolute right-3 text-[#667085] cursor-pointer"
              />
              <EyeOutlined
                v-else
                @click="togglePassword"
                class="absolute right-3 text-[#667085] cursor-pointer"
              />
            </div>
          </div>

          <!-- Confirm Password with blur and toggle -->
          <div class="mb-6">
            <label
              class="block text-gray-900 text-sm font-sf-pro-display mb-1.5"
              for="Repassword"
            >
              Xác nhận mật khẩu
            </label>
            <div
              class="flex items-center border border-[#D0D5DD] rounded-lg relative"
            >
              <LockOutlined class="text-[#667085] w-5 h-5 ml-3 mr-2" />
              <input
                v-model="formState.rePassword"
                :type="showRePassword ? 'text' : 'password'"
                id="Repassword"
                placeholder="********"
                class="w-full py-2.5 px-2 rounded-lg outline-none text-[#101828] opacity-75 focus:opacity-100"
              />
              <template v-if="formState.rePassword">
                <template v-if="passwordsMatch">
                  <CheckOutlined
                    class="absolute right-10 text-green-500"
                  ></CheckOutlined>
                </template>
                <template v-else>
                  <CloseOutlined
                    class="absolute right-10 text-red-500"
                  ></CloseOutlined>
                </template>
              </template>
              <EyeInvisibleOutlined
                v-if="!showRePassword"
                @click="toggleRePassword"
                class="absolute right-3 text-[#667085] cursor-pointer"
              />
              <EyeOutlined
                v-else
                @click="toggleRePassword"
                class="absolute right-3 text-[#667085] cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#BC2228] text-white py-2.5 rounded-lg font-sf-pro-display hover:bg-[#a61d22] transition duration-200"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>

    <div
      class="hidden md:block w-1/2 bg-cover bg-right bg-no-repeat"
      :style="{
        backgroundImage:
          'url(https://s3-alpha-sig.figma.com/img/3534/ab76/cb2d49b52daf07fc61fafb25f1930020?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pbQSLgabg0hjK9B~SJ7lMKfT~9N2C6jDt6Ai7MUS2tsl4HDxu~Qn2z3BqHGoWWGk8xy6f-YDHq4V8Ff~Er1cKJWNi41KzsC3WQw3YoYeMTNj0syRGWDwudiFZOPgq48HpA9Rgx3-vQwR92kfUalNjt~gA33VEu1wnJmKlwYoYfDSLXuRcggqq57SEcyhSQ1DcxMvNuZ-CZnjKDyz2wo8TiS2x5Rkn2yF~u2GznYwqle33nDK8WyIElSvWglLRL0xJPwGaNEUwPBr~b5DBj4Of3s5FoYCqb5o2mop3~ejnddTrvsMDBYsYrcc~FqcDkZX0GzcvWRNRKBPJJ~mVUM8kQ__)',
      }"
    ></div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import bcrypt from "bcryptjs";

const store = useStore();
const router = useRouter();

const formState = reactive({
  email: "",
  userName: "",
  password: "",
  rePassword: "",
});
const showPassword = ref(false);
const showRePassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleRePassword = () => {
  showRePassword.value = !showRePassword.value;
};
const passwordsMatch = computed(() => {
  return formState.password === formState.rePassword;
});
const isUsernameAvailable = computed(() => {
  if (!formState.userName) return true; // Khi ô trống, không hiển thị lỗi
  return !store.getters.getUserByUsername(formState.userName);
});

console.log(store.getters);

const isEmailAvailable = computed(() => {
  return !store.getters.getUserByEmail(formState.email);
});

const validateForm = () => {
  if (!formState.email || !formState.password || !formState.rePassword) {
    message.error("Vui lòng điền đầy đủ thông tin");
    return false;
  }

  if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    message.error("Email không hợp lệ");
    return false;
  }

  if (formState.password.length < 6) {
    message.error("Mật khẩu phải có ít nhất 6 ký tự");
    return false;
  }

  if (formState.password !== formState.rePassword) {
    message.error("Mật khẩu xác nhận không khớp");
    return false;
  }

  return true;
};

const onFinish = async () => {
  try {
    if (!validateForm()) return;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.value, salt);

    const userData = {
      firstName: null,
      lastName: null,
      email: formState.email,
      userName: formState.userName,
      status: "inActive",
      createAt: null,
      updateAt: null,
      password: hashedPassword,
      avatar: "https://placehold.co/400",
      address: null,
      phone: null,
      role: "user",
      deleteAt: null,
      permissionList: null,
      foreignLanguage: null,
      yearsOfExperience: null,
      skills: null,
      gender: null,
      birthdate: null,
      position: null,
      level: null,
      fullName: null,
      saveJob: [],
      lock: false,
    };

    await store.dispatch("registerUser", userData);
    message.success("Đăng ký thành công");
    router.push("/login");
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message.error("Thông tin không hợp lệ");
          break;
        case 409:
          message.error("Email đã tồn tại trong hệ thống");
          break;
        default:
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    } else {
      message.error("Không thể kết nối đến server");
    }
  }
};

onMounted(() => {
  store.dispatch("getAllUsers");
});
</script>

<style scoped>
.font-sf-pro-display {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
}

input::placeholder {
  color: #667085;
}

.bg-cover {
  background-size: cover;
}
</style>
