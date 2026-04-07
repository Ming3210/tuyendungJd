<template>
  <div class="container flex">
    <context-holder />

    <div class="left-container">
      <h2 class="font-bold text-lg">Ảnh đại diện</h2>
      <div class="avatar">
        <img v-if="imageSrc" :src="imageSrc" />
      </div>
      <input type="file" @change="onFileChange" accept="image/*" />
    </div>

    <div class="right-container">
      <div class="header">
        <h2 class="font-bold text-lg">Cập nhật thông tin cá nhân</h2>
        <p>Quản lý thông tin hồ sơ để đảm bảo tài khoản</p>
      </div>

      <form @submit.prevent="updateProfile">
        <div class="input-row">
          <div class="input-item">
            <label>Tên đăng nhập</label>
            <input v-model="userProfile.userName" placeholder="Tên đăng nhập" />
            <p v-if="errors.userName" class="error">{{ errors.userName }}</p>
          </div>

          <div class="input-item">
            <label>Tên</label>
            <input v-model="userProfile.fullName" placeholder="Tên" />
            <p v-if="errors.fullName" class="error">{{ errors.fullName }}</p>
          </div>
        </div>

        <div class="input-row">
          <div class="input-item">
            <label f>Email</label>
            <input
              disabled
              v-model="userProfile.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="input-item" v-if="userProfile.role === 'user'">
            <label>Ngày sinh</label>
            <input
              v-model="userProfile.birthdate"
              type="date"
              placeholder="Ngày sinh"
            />
            <p v-if="errors.birthdate" class="error">{{ errors.birthdate }}</p>
          </div>
        </div>

        <div class="input-row">
          <div class="input-item">
            <label>Số điện thoại</label>
            <input
              v-model="userProfile.phone"
              type="tel"
              placeholder="Số điện thoại"
            />
            <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
          </div>
          <div class="input-item" v-if="userProfile.role === 'user'">
            <label>Giới tính</label>
            <select v-model="userProfile.gender">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <p v-if="errors.gender" class="error">{{ errors.gender }}</p>
          </div>
        </div>

        <div class="input-row" v-if="userProfile.role === 'user'">
          <div class="input-item">
            <label>Vị trí</label>
            <input
              v-model="userProfile.position"
              placeholder="Kỹ năng của bạn"
            />
            <p v-if="errors.position" class="error">{{ errors.position }}</p>
          </div>
          <div class="input-item">
            <label>Số năm làm việc</label>
            <input
              v-model="userProfile.yearsOfExperience"
              type="number"
              placeholder="Số năm làm việc"
              max="10"
            />
            <p v-if="errors.yearsOfExperience" class="error">
              {{ errors.yearsOfExperience }}
            </p>
          </div>
        </div>

        <!-- New Select Input for Level -->
        <div class="input-row" v-if="userProfile.role === 'user'">
          <div class="input-item">
            <label>Level</label>
            <select v-model="userProfile.level">
              <option value="fresher">Fresher</option>
              <option value="mid-level">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="other">Khác</option>
            </select>
            <p v-if="errors.level" class="error">{{ errors.level }}</p>
          </div>
        </div>

        <div class="btn-group">
          <button
            type="button"
            class="cancel-btn p-[20px]"
            @click="cancelUpdate"
          >
            Hủy
          </button>
          <button type="submit" class="update-btn">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebase/firebase";
const [messageApi, contextHolder] = message.useMessage();
const imageSrc = ref(null);
const store = useStore();

const userLoginId = ref(JSON.parse(localStorage.getItem("token")));
const user = computed(() => store.getters.User);

// console.log("test1", user.value);
const userProfile = reactive({
  userName: "",
  fullName: "",
  email: "",
  birthdate: "",
  phone: "",
  gender: "",
  avatar: "",
  level: "",
  position: "",
  yearsOfExperience: "",
});
const errors = reactive({
  userName: "",
  fullName: "",
  birthdate: "",
  phone: "",
  gender: "",
  position: "",
  yearsOfExperience: "",
  level: "",
  role: "",
});
//// hàm bất đồng bộ sẽ mất thời gian để thục hiện=> then sẽ dc chạy khi hàm bdb hoàn tất => để đảm bảo biến user có dữ liệu
onMounted(async () => {
  await store.dispatch("getUser", userLoginId.value).then(() => {
    if (user.value) {
      userProfile.userName = user.value.userName;
      userProfile.fullName = user.value.fullName;
      userProfile.email = user.value.email;
      userProfile.birthdate = user.value.birthdate;
      userProfile.phone = user.value.phone;
      userProfile.gender = user.value.gender;
      userProfile.avatar = user.value.avatar;
      userProfile.position = user.value.position;
      userProfile.yearsOfExperience = user.value.yearsOfExperience;
      userProfile.level = user.value.level;
      userProfile.role = user.value.role;

      if (userProfile.avatar) {
        imageSrc.value = userProfile.avatar;
      }
    }
  });
});

const onFileChange = async (event) => {
  const file = event.target.files[0];
  console.log(file);

  if (file) {
    // Tạo đường dẫn trong Firebase Storage
    const fileRef = storageRef(storage, `avatars/${file.name}`);

    try {
      // Upload ảnh lên Firebase Storage
      await uploadBytes(fileRef, file);
      console.log("Ảnh đã được tải lên Firebase thành công");

      // Lấy URL tải về của ảnh sau khi upload
      const downloadURL = await getDownloadURL(fileRef);

      // Cập nhật vào `userProfile.avatar` và `imageSrc`
      userProfile.avatar = downloadURL;
      imageSrc.value = downloadURL;
      console.log("URL ảnh đã được cập nhật:", downloadURL);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên Firebase:", error);
    }
  }
};

const validateForm = () => {
  let isValid = true;

  if (!userProfile.userName) {
    errors.userName = "Tên đăng nhập không được để trống.";
    isValid = false;
  } else {
    errors.userName = "";
  }

  if (!userProfile.fullName) {
    errors.fullName = "Tên không được để trống.";
    isValid = false;
  } else {
    errors.fullName = "";
  }

  if (!userProfile.birthdate) {
    errors.birthdate = "Ngày sinh không được để trống.";
    isValid = false;
  } else {
    errors.birthdate = "";
  }

  if (!checkPhoneNumber(userProfile.phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
    isValid = false;
  } else {
    errors.phone = "";
  }

  if (!userProfile.gender) {
    errors.gender = "Vui lòng chọn giới tính.";
    isValid = false;
  } else {
    errors.gender = "";
  }

  if (!userProfile.position) {
    errors.position = "Kỹ năng không được để trống.";
    isValid = false;
  } else {
    errors.position = "";
  }

  if (!userProfile.yearsOfExperience) {
    errors.yearsOfExperience = "Số năm làm việc không được để trống.";
    isValid = false;
  } else {
    errors.yearsOfExperience = "";
  }

  if (!userProfile.level) {
    errors.level = "Vui lòng chọn cấp độ.";
    isValid = false;
  } else {
    errors.level = "";
  }

  return isValid;
};

const updateProfile = () => {
  // if (!validateForm()) {
  //   messageApi.error("Có lỗi trong biểu mẫu. Vui lòng kiểm tra lại.");
  //   return;
  // }

  const userId = store.getters.User.id;
  messageApi.success("Cập nhật thành công!");

  store.dispatch("updateUser", { ...userProfile, id: userId });
  store.dispatch("getUser", userLoginId.value);
};
const checkPhoneNumber = (phone) => {
  const phoneString = String(phone);
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return phoneString.match(regexPhoneNumber) ? true : false;
};
// console.log(checkPhoneNumber("0948258384"));
</script>

<style scoped>
.container {
  padding: 50px 20px;
}
.left-container {
  display: flex;

  flex-direction: column;
  align-items: start;
  gap: 20px;
}

.avatar {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
}

.header h2 {
  margin-bottom: 5px;
}

.header p {
  margin: 0;
  color: #555;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-row {
  display: flex;
  gap: 30px;
}

.input-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-item label {
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  color: gray;
}

.input-item input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: white;
}
.input-item select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: white;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-weight: 600;
}

.cancel-btn {
  background-color: #e6e6e6;
  color: black;
  padding: 10px 70px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn {
  background-color: #ab1e24;
  color: white;

  padding: 15px 80px;

  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-group button:hover {
  opacity: 0.9;
}
.error {
  color: #e63946;
  font-size: 12px;
  margin-top: 4px;
}
</style>
