<template>
  <a-layout class="min-h-[100vh]">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <div class="flex items-center gap-2 uppercase">
            <UserOutlined />
            <router-link v-if="!collapsed" to="/admin/user">Người dùng</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="2">
          <div class="flex items-center gap-2 uppercase">
            <FileTextOutlined />
            <router-link v-if="!collapsed" to="/admin/cv">CV</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="3">
          <div class="flex items-center gap-2 uppercase">
            <AlipayCircleOutlined />
            <router-link v-if="!collapsed" to="/admin/language">Ngôn ngữ CV</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="4">
          <div class="flex items-center gap-2 uppercase">
            <DatabaseOutlined />
            <router-link v-if="!collapsed" to="/admin/job">Job</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="5">
          <div class="flex items-center gap-2 uppercase">
            <DatabaseOutlined />
            <router-link v-if="!collapsed" to="/admin/enterprise">Doanh nghiệp</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="6">
          <div class="flex items-center gap-2 uppercase">
            <BookOutlined />
            <router-link v-if="!collapsed" to="/admin/certificate">Chứng chỉ</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="7">
          <div class="flex items-center gap-2 uppercase">
            <FileProtectOutlined />
            <router-link v-if="!collapsed" to="/admin/interview">Phỏng vấn</router-link>
          </div>
        </a-menu-item>
        <a-menu-item key="9">
          <div class="flex items-center gap-2 uppercase" @click="showConfirm">
            <LogoutOutlined />
            <div>Đăng xuất</div>
          </div>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="text-lg h-full w-20 hover:bg-[#F5F5F5] ease-in rounded-lg">
          <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger px-7 mt-5"
            @click="() => (collapsed = !collapsed)"
          />
          <MenuFoldOutlined
            v-else
            class="trigger px-7 mt-5"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',

          minHeight: '100vh',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-modal
      v-model:visible="isModalVisible"
      title="Xác nhận đăng xuất"
      @ok="handleLogout"
      @cancel="handleCancel"
    >
      <p>Bạn có chắc chắn muốn đăng xuất?</p>
    </a-modal>
  </a-layout>
</template>

<script setup>
import {
  AlipayCircleOutlined,
  BookOutlined,
  DatabaseOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  InsuranceOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const selectedKeys = ref(["1"]);
const collapsed = ref(false);
const router = useRouter();
const isModalVisible = ref(false);
// Hiển thị modal khi nhấp vào "Đăng xuất"
const showConfirm = () => {
  isModalVisible.value = true;
};

// Hàm xử lý đăng xuất
const handleLogout = () => {
  // Xử lý đăng xuất ở đây, ví dụ: xóa token, chuyển hướng đến trang đăng nhập
  router.push("/auth");
  localStorage.removeItem("token");
  isModalVisible.value = false;
};

// Hàm xử lý khi hủy bỏ đăng xuất
const handleCancel = () => {
  isModalVisible.value = false;
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
