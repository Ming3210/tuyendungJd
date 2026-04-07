import App from "@/admin/App.vue";
import CertificateView from "@/admin/view/certificateView.vue";
import CvView from "@/admin/view/cvView.vue";
import EnterpriseView from "@/admin/view/enterpriseView.vue";
import Home from "@/admin/view/home.vue";
import InterviewBooking from "@/admin/view/interviewBooking.vue";
import LanguageView from "@/admin/view/languageView.vue";
import Login from "@/admin/view/login.vue";
import UserView from "@/admin/view/userView.vue";


import { createRouter, createWebHistory } from "vue-router";
import JobView from "@/admin/view/jobView.vue";

const routes = [
  {
    path: "/admin",
    component: Home,
    alias: ["/"],
    children: [
      {
        path: "user",
        component: UserView,
      },
      {
        path: "cv",
        component: CvView,
      },
      {
        path: "certificate",
        component: CertificateView,
      },
      {
        path: "enterprise",
        component: EnterpriseView,
      },
      {
        path: "language",
        component: LanguageView,
      },
      {
        path: "job",
        component: JobView,
      },
      {
        path: "interview",
        component: InterviewBooking,
      },
    ],
  },
  {
    path: "/auth",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
