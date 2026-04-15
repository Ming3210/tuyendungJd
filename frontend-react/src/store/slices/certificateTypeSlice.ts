import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface CertificateType {
  id: number;
  type: string;
  value: string[];
  language?: string;
  status: boolean;
  code?: string;
}

interface CertificateTypeState {
  certificateTypes: CertificateType[];
  loading: boolean;
  error: string | null;
  totalCertificateTypes: number;
  currentPage: number;
  limit: number;
}

const initialState: CertificateTypeState = {
  certificateTypes: [],
  loading: false,
  error: null,
  totalCertificateTypes: 0,
  currentPage: 1,
  limit: 7,
};

export const fetchCertificateTypes = createAsyncThunk('certificateType/fetchAll', async ({ page = 1, limit = 7 }: { page?: number; limit?: number } = {}) => {
  const response = await api.get('/certificateTypes', { params: { _page: page, _limit: limit } });
  return {
    certificateTypes: response.data,
    totalCertificateTypes: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const addCertificateType = createAsyncThunk('certificateType/add', async (newCert: Partial<CertificateType>) => {
  const response = await api.post('/certificateTypes', newCert);
  return response.data;
});

export const updateCertificateType = createAsyncThunk('certificateType/update', async ({ id, data }: { id: number; data: Partial<CertificateType> }) => {
  const response = await api.put(`/certificateTypes/${id}`, data);
  return response.data;
});

export const deleteCertificateType = createAsyncThunk('certificateType/delete', async (id: number) => {
  await api.delete(`/certificateTypes/${id}`);
  return id;
});

const certificateTypeSlice = createSlice({
  name: 'certificateType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificateTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCertificateTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.certificateTypes = action.payload.certificateTypes;
        state.totalCertificateTypes = action.payload.totalCertificateTypes;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCertificateTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch certificate types';
      })
      .addCase(addCertificateType.fulfilled, (state, action) => {
        state.certificateTypes.push(action.payload);
      })
      .addCase(updateCertificateType.fulfilled, (state, action) => {
        const index = state.certificateTypes.findIndex(ct => ct.id === action.payload.id);
        if (index !== -1) {
          state.certificateTypes[index] = action.payload;
        }
      })
      .addCase(deleteCertificateType.fulfilled, (state, action) => {
        state.certificateTypes = state.certificateTypes.filter(ct => ct.id !== action.payload);
      });
  },
});

export default certificateTypeSlice.reducer;
