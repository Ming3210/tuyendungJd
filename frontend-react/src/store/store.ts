import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import provinceReducer from './slices/provinceSlice'
import interviewBookingReducer from './slices/interviewBookingSlice'
import userReducer from './slices/userSlice'
import cvLanguageReducer from './slices/cvLanguageSlice'
import enterpriseReducer from './slices/enterpriseSlice'
import candidateReducer from './slices/candidateSlice'
import certificateTypeReducer from './slices/certificateTypeSlice'
import vipReducer from './slices/vipSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    provinces: provinceReducer,
    interviewBooking: interviewBookingReducer,
    user: userReducer,
    cvLanguages: cvLanguageReducer,
    enterprise: enterpriseReducer,
    candidate: candidateReducer,
    certificateType: certificateTypeReducer,
    vip: vipReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
