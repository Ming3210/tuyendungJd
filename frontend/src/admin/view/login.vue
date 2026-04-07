<template>
  <div class="flex min-h-screen w-[100%] h-[680px]">
    <div class="flex flex-col justify-center w-full md:w-1/2 p-12 bg-gray-50">
      <div class="mb-1 absolute top-[-200px] left-[1px] w-[490px] h-[300px]">
        <img class="w-[550px]" src="../assets/decor.svg" alt="" />
      </div>
      <div class="flex relative top-0 mb-8 left-[110px]">
        <img src="../assets/rikkei.svg" alt="Rikkei" class="h-8" />
        <img src="../assets/jobs.svg" alt="Jobs" class="h-8 ml-1" />
      </div>
      <div class="mx-auto w-[451px] h-[445px]">
        <h2 class="text-3xl font-bold w-[158px]">Đăng nhập</h2>
        <p class="text-gray-600 font-sf-pro-display mb-8">
          Cùng phát triển con đường sự nghiệp với Rikkei Jobs
        </p>

        <form @submit.prevent="handleLogin">
          <div class="mb-4 relative">
            <label class="block text-gray-700 font-sf-pro-display" for="email"
              >Email</label
            >
            <div class="flex items-center border rounded-md">
              <UserOutlined class="text-gray-400 w-5 h-5 absolute left-3" />
              <input
                v-model="formState.email"
                type="email"
                id="email"
                placeholder="you@company.com"
                class="w-full px-10 py-2 border-none rounded-md outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="mb-4 relative">
            <label
              class="block font-sf-pro-display text-gray-700"
              for="password"
              >Mật khẩu</label
            >
            <div class="flex items-center border rounded-md">
              <LockOutlined class="text-gray-400 w-5 h-5 absolute left-3" />
              <input
                v-model="formState.password"
                type="password"
                id="password"
                placeholder="********"
                class="w-full px-10 py-2 border-none rounded-md outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-between mb-4">
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-checkbox text-red-500" />
              <span class="ml-2 text-gray-700 font-sf-pro-display"
                >Ghi nhớ đăng nhập</span
              >
            </label>
            <a href="#" class="text-red-500 text-1xl font-sf-pro-display"
              >Quên mật khẩu?</a
            >
          </div>

          <button
            type="submit"
            :disabled="disabled"
            style="background-color: rgba(188, 34, 40, 1)"
            class="w-full text-white py-2 rounded-md font-sf-pro-display hover:bg-red-600 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <p class="text-center font-sf-pro-display text-gray-600 mt-8">
          Bạn chưa có tài khoản?
          <router-link class="text-red-500 font-sf-pro-display" to="/register"
            >Đăng ký</router-link
          >
        </p>
      </div>
    </div>

    <div class="hidden md:block w-1/2 bg-image-container">
      <div
        class="w-full h-full flex items-center justify-center bg-image"
        :style="{
          backgroundImage:
            'url(https://s3-alpha-sig.figma.com/img/3534/ab76/cb2d49b52daf07fc61fafb25f1930020?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XbDtvDM59r46ElrtYYzQCD7DqgUGZD1STxbNO5jlXcTywNFED2YUcfoY3fjfTIzgIkvjueI3zWDNGnX9vSzsxw~XYIJi4m3PwMFZahJoDCA7t7Zl4HTpAoNgJBYg8Z7Y9UgL0RvbJDUGByBiOOmpL5c-xiDZMHBFyhWR1g1YNRV4-n6fZUPLyCDlQzwi2VtFXgg1gZ25LbsbpFGQ7s7XfXs6HtfcaYloe5XSCE2FYucDDL7b3-w-qkZFAJHMpTbZFCjmQFEnSIBTgoSNemfhmiXzyOp43izrBjxO2QBzidcna5g2PvKAzesW3AMXinJu2IQnJEH-m3HUGSbrPjZj0g__)',
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import bcrypt from "bcryptjs";

const store = useStore();
const router = useRouter();
console.log(store);

const formState = reactive({
  email: localStorage.getItem("email") || "",
  password: localStorage.getItem("password") || "",
});

const handleLogin = async () => {
  const { email, password } = formState;

  if (!email && !password) {
    message.error("Vui lòng nhập email và mật khẩu");
    return;
  }
  if (!email) {
    message.error("Vui lòng nhập email");
    return;
  }
  if (!password) {
    message.error("Vui lòng nhập mật khẩu");
    return;
  }

  const users = store.state.user.users;
  const user = users.find((u) => u.email === email);

  if (!user) {
    message.error("Email không tồn tại");
    return;
  }

  // Kiểm tra trạng thái tài khoản
  if (user.lock !== false) {
    message.error("Tài khoản của bạn đã bị khóa.");
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    message.error("Mật khẩu không chính xác");
    return;
  }

  localStorage.setItem("token", user.id);
  // localStorage.setItem("status", user.status);

  if (user.role === "admin") {
    message.success("Đăng nhập thành công!");
    router.push("/");
  } else {
    message.error("Ban khong co quyen dang nhap");
  }
};

onMounted(() => {
  store.dispatch("getUsers");
});
</script>

<style scoped>
.bg-image-container {
  position: relative;
  overflow: hidden;
}

.bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.font-sf-pro-display {
  font-family: "SF Pro Display", sans-serif;
}
</style>
