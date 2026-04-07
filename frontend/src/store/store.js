import { createStore } from "vuex";
import login from "./modules/login.module";
import user from "./modules/user.module";
import enterprise from "./modules/enterprise.module";
import interviewBooking from "./modules/interview.module";
import certificateTypes from "./modules/certificateType.module";
import cvLanguages from "./modules/cvLanguage.module";
import candidate from "./modules/candidate.module";
import candidateDetail from "./modules/candidateDetail.module";
import jobs from "./modules/jobs.module";
import jobsDetail from "./modules/jobsDetail.module";
import provinces from "./modules/province.module";

// Admin modules
import adminCertificateTypes from "@/admin/store/modules/certificateType.module";
import adminCvs from "@/admin/store/modules/cvs.module";
import adminUser from "@/admin/store/modules/userType.module";
import adminEnterprises from "@/admin/store/modules/enterprises.module";
import adminLanguage from "@/admin/store/modules/language.module";
import adminJobs from "@/admin/store/modules/job.module";
import adminInterview from "@/admin/store/modules/interview.module";

const store = createStore({
  modules: {
    login,
    user,
    enterprise,
    interviewBooking,
    certificateTypes,
    cvLanguages,
    candidate,
    candidateDetail,
    jobs,
    jobsDetail,
    provinces,
    // Admin modules (namespaced under same store)
    adminCertificateTypes,
    adminCvs,
    adminUser,
    adminEnterprises,
    adminLanguage,
    adminJobs,
    adminInterview,
  },
});
export default store;
