import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Certificate {
  id: string | number;
  userId: string | number;
  name: string;
  organization: string;
  issueDate: string;
}

export interface SavedJob {
  id: string | number;
  userId: string | number;
  jobId: string | number;
}

export interface CV {
  id: string | number;
  userId: string | number;
  pdfDataUrl: string;
  status: boolean;
  createAt?: string;
  title?: string;
  fileName?: string;
  date?: string;
}

interface UserState {
  certificates: Certificate[];
  cvs: CV[];
  savedJobs: SavedJob[];
  savedJobsDetail: any[];
  ownedEnterprises: any[];
  interviews: any[]; // InterviewBookings specifically for the logged-in user
  currentCvLanguage: string;
  loading: boolean;
  error: string | null;
  totalCvs: number;
  cvCurrentPage: number;
  cvLimit: number;
}

const initialState: UserState = {
  certificates: [],
  cvs: [],
  savedJobs: [],
  savedJobsDetail: [],
  ownedEnterprises: [],
  interviews: [],
  currentCvLanguage: 'vi',
  loading: false,
  error: null,
  totalCvs: 0,
  cvCurrentPage: 1,
  cvLimit: 8,
};

// Async Thunks
export const fetchUserCertificates = createAsyncThunk('user/fetchCertificates', async (userId: string | number) => {
  const response = await api.get(`/userCertificates/user/${userId}`);
  return response.data;
});

export const fetchUserCvs = createAsyncThunk('user/fetchCvs', async (userId: string | number) => {
  const response = await api.get(`/cvs/user/${userId}`);
  return response.data;
});

export const addCertificate = createAsyncThunk('user/addCertificate', async (certificate: Partial<Certificate>) => {
  const response = await api.post('/userCertificates', certificate);
  return response.data;
});

export const deleteCertificate = createAsyncThunk('user/deleteCertificate', async (id: string | number) => {
  await api.delete(`/userCertificates/${id}`);
  return id;
});

export const addCv = createAsyncThunk('user/addCv', async (cv: Partial<CV>) => {
  const response = await api.post('/cvs', cv);
  return response.data;
});

export const deleteCv = createAsyncThunk('user/deleteCv', async (id: string | number) => {
  await api.delete(`/cvs/${id}`);
  return id;
});

export const fetchAllCvs = createAsyncThunk('user/fetchAllCvs', async ({ page = 1, limit = 8 }: { page?: number; limit?: number } = {}) => {
  const response = await api.get('/cvs', { params: { _page: page, _limit: limit } });
  return {
    cvs: response.data,
    totalCvs: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const updateCvStatus = createAsyncThunk('user/updateCvStatus', async ({ id, status }: { id: string | number; status: boolean }) => {
  // await api.put(`/cvs/${id}/status`, { status });
  return { id, status }; // Simulation
});

export const fetchSavedJobs = createAsyncThunk('user/fetchSavedJobs', async (userId: string | number) => {
  const response = await api.get(`/api/saved-jobs/user/${userId}`);
  return response.data;
});

export const toggleSaveJob = createAsyncThunk('user/toggleSaveJob', async ({ userId, jobId }: { userId: string | number; jobId: string | number }) => {
  const response = await api.post('/api/saved-jobs', { userId, jobId });
  return { data: response.data, jobId };
});

export const fetchOwnedEnterprises = createAsyncThunk('user/fetchOwnedEnterprises', async (userId: string | number) => {
  const response = await api.get(`/enterprises/user/${userId}`);
  return response.data;
});

export const fetchSavedJobsDetail = createAsyncThunk('user/fetchSavedJobsDetail', async (ids: (string | number)[]) => {
  if (ids.length === 0) return [];
  const response = await api.get(`/jobs/ids?ids=${ids.join(',')}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentCvLanguage: (state, action: PayloadAction<string>) => {
      state.currentCvLanguage = action.payload;
    },
    clearSavedJobsDetail: (state) => {
      state.savedJobsDetail = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Certificates
      .addCase(fetchUserCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
      })
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.certificates.push(action.payload);
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.certificates = state.certificates.filter(c => c.id !== action.payload);
      })
      // CVs
      .addCase(fetchUserCvs.fulfilled, (state, action) => {
        state.cvs = action.payload;
      })
      .addCase(addCv.fulfilled, (state, action) => {
        state.cvs.push(action.payload);
      })
      .addCase(deleteCv.fulfilled, (state, action) => {
        state.cvs = state.cvs.filter(c => c.id !== action.payload);
      })
      .addCase(fetchAllCvs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCvs.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload.cvs;
        state.totalCvs = action.payload.totalCvs;
        state.cvCurrentPage = action.payload.page;
        state.cvLimit = action.payload.limit;
      })
      .addCase(fetchAllCvs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all CVs';
      })
      .addCase(updateCvStatus.fulfilled, (state, action) => {
        const index = state.cvs.findIndex(c => String(c.id) === String(action.payload.id));
        if (index !== -1) {
          state.cvs[index].status = action.payload.status;
        }
      })
      // Saved Jobs
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      })
      .addCase(toggleSaveJob.fulfilled, (state, action) => {
        // Since it's a toggle, the response is either the new saved job or 204 No Content
        // Our controller returns 200 with object or 204
        if (action.payload.data) {
          state.savedJobs.push(action.payload.data);
        } else {
          state.savedJobs = state.savedJobs.filter(sj => sj.jobId !== action.payload.jobId);
        }
      })
      // Owned Enterprises
      .addCase(fetchOwnedEnterprises.fulfilled, (state, action) => {
        state.ownedEnterprises = action.payload;
      })
      .addCase(fetchSavedJobsDetail.fulfilled, (state, action) => {
        state.savedJobsDetail = action.payload;
      });
  },
});

export const { setCurrentCvLanguage, clearSavedJobsDetail } = userSlice.actions;
export default userSlice.reducer;
