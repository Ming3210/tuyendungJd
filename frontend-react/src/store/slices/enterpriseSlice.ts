import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Enterprise {
  id: string | number;
  title: string;
  avatar: string;
  industry: string;
  province: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  companySize?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  businessLicense?: string;
  address?: string;
  status: 'verified' | 'pending' | 'blocked';
}

interface EnterpriseState {
  enterprises: Enterprise[];
  currentEnterprise: Enterprise | null;
  loading: boolean;
  error: string | null;
  totalEnterprises: number;
  currentPage: number;
  limit: number;
}

const initialState: EnterpriseState = {
  enterprises: [],
  currentEnterprise: null,
  loading: false,
  error: null,
  totalEnterprises: 0,
  currentPage: 1,
  limit: 8,
};

export const fetchAllEnterprises = createAsyncThunk('enterprise/fetchAll', async ({ page = 1, limit = 8 }: { page?: number; limit?: number } = {}) => {
  const response = await api.get('/enterprises', { params: { _page: page, _limit: limit } });
  return {
    enterprises: response.data,
    totalEnterprises: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const fetchEnterpriseById = createAsyncThunk('enterprise/fetchById', async (id: string | number) => {
  const response = await api.get(`/enterprises/${id}`);
  return response.data;
});

export const updateEnterpriseProfile = createAsyncThunk('enterprise/updateProfile', async (data: Enterprise) => {
  const response = await api.put(`/enterprises/${data.id}`, data);
  return response.data;
});

export const createEnterprise = createAsyncThunk('enterprise/create', async (data: Partial<Enterprise>) => {
  const response = await api.post('/enterprises', data);
  return response.data;
});

export const updateEnterpriseStatus = createAsyncThunk('enterprise/updateStatus', async ({ id, status }: { id: string | number; status: 'verified' | 'blocked' | 'pending' }) => {
  await api.patch(`/enterprises/${id}`, { status });
  return { id, status };
});

const enterpriseSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEnterprises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEnterprises.fulfilled, (state, action) => {
        state.loading = false;
        state.enterprises = action.payload.enterprises;
        state.totalEnterprises = action.payload.totalEnterprises;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchAllEnterprises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enterprises';
      })
      .addCase(fetchEnterpriseById.fulfilled, (state, action) => {
        state.currentEnterprise = action.payload;
      })
      .addCase(updateEnterpriseProfile.fulfilled, (state, action) => {
         state.currentEnterprise = action.payload;
         const index = state.enterprises.findIndex(e => e.id === action.payload.id);
         if (index !== -1) {
            state.enterprises[index] = action.payload;
         }
      })
      .addCase(updateEnterpriseStatus.fulfilled, (state, action) => {
        const index = state.enterprises.findIndex(e => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.enterprises[index].status = action.payload.status;
        }
        if (state.currentEnterprise && String(state.currentEnterprise.id) === String(action.payload.id)) {
          state.currentEnterprise.status = action.payload.status;
        }
      })
      .addCase(createEnterprise.fulfilled, (state, action) => {
        state.enterprises.unshift(action.payload);
      });
  },
});

export default enterpriseSlice.reducer;

