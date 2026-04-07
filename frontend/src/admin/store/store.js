import { createStore } from "vuex";
import certificateTypes from "./modules/certificateType.module";
import cvs from "./modules/cvs.module";
import user from "./modules/userType.module";
import enterprises from "./modules/enterprises.module";
import language from "./modules/language.module";
import jobs from "./modules/job.module";
import interview from "./modules/interview.module";

const store = createStore({
  modules: {
    certificateTypes,
    user,
    cvs,
    enterprises,
    language,
    jobs,
    interview,
  },
});
export default store;
