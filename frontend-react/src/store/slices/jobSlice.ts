import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Job {
  id: string;
  title: string;
  enterpriseId: string;
  enterpriseName: string;
  location: string;
  province: string;
  salary: string;
  industry: string;
  description: string;
  required: string;
  benefitsDescription: string;
  deadline: string;
  type: string; // Dynamic/Permanent etc
  level: string;
  flight: 'verified' | 'unverified';
  status: boolean;
  createdAt: string;
}

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
  totalJobs: number;
  currentPage: number;
  limit: number;
  industries: string[];
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  totalJobs: 0,
  currentPage: 1,
  limit: 6,
  industries: [],
};

export const fetchJobsByPage = createAsyncThunk(
  'jobs/fetchByPage',
  async ({ page, limit = 6, industry = '', province = '', sort = '', enterpriseId = '', flight = 'verified', title = '' }: { 
    page: number; 
    limit?: number;
    industry?: string; 
    province?: string; 
    sort?: string;
    enterpriseId?: string | number;
    flight?: string;
    title?: string;
  }) => {
    const response = await api.get(`/jobs`, {
      params: {
        _page: page,
        _limit: limit,
        flight: flight || undefined,
        enterpriseId: enterpriseId || undefined,
        title: title || undefined,
        industry: industry || undefined,
        province: province || undefined,
        _sort: sort || undefined,
      },
    });
    return {
      jobs: response.data,
      totalJobs: parseInt(response.headers['x-total-count'] || '0', 10),
      page,
      limit,
    };
  }
);

export const fetchJobsByEnterprise = createAsyncThunk(
  'jobs/fetchByEnterprise',
  async ({ enterpriseId, page = 1, limit = 10 }: { enterpriseId: string | number; page?: number; limit?: number }) => {
    const response = await api.get(`/jobs`, { 
      params: { enterpriseId, _page: page, _limit: limit } 
    });
    return {
      jobs: response.data,
      totalJobs: parseInt(response.headers['x-total-count'] || '0', 10),
      page,
      limit
    };
  }
);

export const deleteJob = createAsyncThunk('jobs/delete', async (id: string | number) => {
  await api.delete(`/jobs/${id}`);
  return id;
});

export const createJob = createAsyncThunk('jobs/create', async (data: Partial<Job>) => {
  const response = await api.post('/jobs', data);
  return response.data;
});

export const updateJob = createAsyncThunk('jobs/update', async ({ id, data }: { id: string | number; data: Partial<Job> }) => {
  const response = await api.put(`/jobs/${id}`, data);
  return response.data;
});

export const fetchJobById = createAsyncThunk('jobs/fetchById', async (id: string) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
});

export const fetchAllJobs = createAsyncThunk('jobs/fetchAll', async ({ page = 1, limit = 10, title = '' }: { page?: number; limit?: number; title?: string } = {}) => {
  const response = await api.get('/jobs', { 
    params: { 
      _limit: limit, 
      _page: page,
      title: title || undefined 
    } 
  });
  return {
    jobs: response.data,
    totalJobs: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit
  };
});

export const updateJobStatus = createAsyncThunk('jobs/updateStatus', async ({ id, flight }: { id: string | number; flight: string }) => {
  await api.patch(`/jobs/${id}`, { flight });
  return { id, flight };
});

export const fetchIndustries = createAsyncThunk('jobs/fetchIndustries', async () => {
  const response = await api.get('/jobs');
  const jobs: Job[] = response.data;
  return [...new Set(jobs.map((job) => job.industry))];
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchJobsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })
      .addCase(fetchJobsByEnterprise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsByEnterprise.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.page;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => String(j.id) !== String(action.payload));
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all jobs';
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => String(j.id) === String(action.payload.id));
        if (index !== -1) {
          state.jobs[index].flight = action.payload.flight as any;
        }
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.currentJob = action.payload;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.industries = action.payload;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload);
        state.totalJobs += 1;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => String(j.id) === String(action.payload.id));
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      });
  },
});

export const { setCurrentPage, clearCurrentJob } = jobSlice.actions;
export default jobSlice.reducer;
