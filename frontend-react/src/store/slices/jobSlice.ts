import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Job {
  id: number;
  title: string;
  quantity: number;
  description: string[];
  rank: string[] | string;
  gender: string;
  salaryCurrent: string;
  salary: string;
  province: string;
  district: string;
  image: string;
  address: string;
  benefitsDescription: string[];
  workingTime: string;
  deadline: string;
  required: string[];
  industry: string;
  enterpriseId: number;
  enterprise?: {
    id: number;
    title: string;
    avatar: string;
    industry: string;
    address: string;
    status: string;
  };
  flight: string;
  experience: string;
  saturdayOff: boolean;
  minSalary?: number;
  maxSalary?: number;
  negotiable?: boolean;
  jobLevel?: string;
  education?: string;
  updateDate?: string;
}

interface JobState {
  jobs: Job[];
  featuredJobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
  totalJobs: number;
  currentPage: number;
  limit: number;
}

const initialState: JobState = {
  jobs: [],
  featuredJobs: [],
  currentJob: null,
  loading: false,
  error: null,
  totalJobs: 0,
  currentPage: 1,
  limit: 6,
};

export const fetchJobsByPage = createAsyncThunk(
  'jobs/fetchByPage',
  async ({
    page = 1, limit = 6, industry = '', province = '', sort = '',
    enterpriseId = '', flight = '', title = '',
    experience = '', saturdayOff = null,
    rank = '', salaryMin = null, salaryMax = null,
    negotiable = null, jobLevel = '', education = '',
    searchMode = 'both'
  }: {
    page?: number;
    limit?: number;
    industry?: string;
    province?: string;
    sort?: string;
    enterpriseId?: string | number;
    flight?: string;
    title?: string;
    experience?: string;
    saturdayOff?: boolean | null;
    rank?: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    negotiable?: boolean | null;
    jobLevel?: string;
    education?: string;
    searchMode?: 'title' | 'company' | 'both';
  }) => {
    // Add 700ms delay to show loading state more clearly
    await new Promise(resolve => setTimeout(resolve, 700));

    const response = await api.get(`/jobs`, {
      params: {
        _page: page,
        _limit: limit,
        flight: flight || undefined,
        industry: industry || undefined,
        province: province || undefined,
        _sort: sort || undefined,
        experience: experience !== '' ? experience : undefined,
        saturdayOff: saturdayOff === 'true' ? true : (saturdayOff === 'false' ? false : (typeof saturdayOff === 'boolean' ? saturdayOff : undefined)),
        jobCategory: undefined,
        rank: rank || undefined,
        salaryMin: salaryMin || undefined,
        salaryMax: salaryMax || undefined,
        negotiable: negotiable !== null ? negotiable : undefined,
        jobLevel: jobLevel || undefined,
        education: education || undefined,
        searchMode: searchMode || undefined,
        random: sort === 'random' ? true : undefined,
        title: title || undefined,
        enterpriseId: enterpriseId || undefined
      },
    });

    console.log('[DEBUG] jobs/fetchByPage Response Arrival');
    console.table(response.data);

    return {
      jobs: response.data,
      totalJobs: parseInt(response.headers['x-total-count'] || response.data.length.toString(), 10),
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
      totalJobs: parseInt(response.headers['x-total-count'] || response.data.length.toString(), 10),
    };
  }
);

export const fetchJobById = createAsyncThunk('jobs/fetchById', async (id: string | number) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
});

export const fetchAllJobs = fetchJobsByPage;

export const updateJobStatus = createAsyncThunk(
  'jobs/updateStatus',
  async ({ id, flight }: { id: number | string; flight: 'verified' | 'pending' | 'rejected' | 'blocked' | 'unverified' }) => {
    const response = await api.patch(`/jobs/${id}`, { flight });
    return response.data;
  }
);

export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData: Partial<Job>) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  }
);

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, jobData }: { id: number | string; jobData: Partial<Job> }) => {
    const response = await api.patch(`/jobs/${id}`, jobData);
    return response.data;
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (id: number | string) => {
    await api.delete(`/jobs/${id}`);
    return id;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobsByPage (and fetchAllJobs)
      .addCase(fetchJobsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;

        // Sync featuredJobs if the query was random or we have no featured jobs yet
        if (state.featuredJobs.length === 0 || action.meta.arg.sort === 'random') {
          state.featuredJobs = action.payload.jobs;
        }
      })
      .addCase(fetchJobsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
        console.error('[DEBUG] Job Fetch Rejected:', action.error);
      })
      // updateJobStatus
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        if (state.currentJob?.id === action.payload.id) {
          state.currentJob = action.payload;
        }
      })
      // createJob
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload);
      })
      // updateJob
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        if (state.currentJob?.id === action.payload.id) {
          state.currentJob = action.payload;
        }
      })
      // deleteJob
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => j.id !== action.payload);
      })
      // fetchJobsByEnterprise
      .addCase(fetchJobsByEnterprise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsByEnterprise.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
      })
      // fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      });
  },
});

export const { clearCurrentJob, setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;
