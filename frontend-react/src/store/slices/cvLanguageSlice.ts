import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface CvLanguage {
  id: number;
  language: string;
  code: string;
  status: boolean;
}

interface CvLanguageState {
  languages: CvLanguage[];
  loading: boolean;
  error: string | null;
  totalLanguages: number;
  currentPage: number;
  limit: number;
}

const initialState: CvLanguageState = {
  languages: [],
  loading: false,
  error: null,
  totalLanguages: 0,
  currentPage: 1,
  limit: 8,
};

export const fetchCvLanguages = createAsyncThunk('cvLanguages/fetchAll', async ({ page = 1, limit = 8 }: { page?: number; limit?: number } = {}) => {
  const response = await api.get('/cvLanguages', { params: { _page: page, _limit: limit } });
  return {
    languages: response.data,
    totalLanguages: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const addCvLanguage = createAsyncThunk('cvLanguages/add', async (newLang: Partial<CvLanguage>) => {
  const response = await api.post('/cvLanguages', newLang);
  return response.data;
});

export const updateCvLanguage = createAsyncThunk('cvLanguages/update', async ({ id, data }: { id: number; data: Partial<CvLanguage> }) => {
  const response = await api.put(`/cvLanguages/${id}`, data);
  return response.data;
});

export const deleteCvLanguage = createAsyncThunk('cvLanguages/delete', async (id: number) => {
  await api.delete(`/cvLanguages/${id}`);
  return id;
});

const cvLanguageSlice = createSlice({
  name: 'cvLanguages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCvLanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCvLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload.languages;
        state.totalLanguages = action.payload.totalLanguages;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCvLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch CV languages';
      })
      .addCase(addCvLanguage.fulfilled, (state, action) => {
        state.languages.push(action.payload);
      })
      .addCase(updateCvLanguage.fulfilled, (state, action) => {
        const index = state.languages.findIndex(lang => lang.id === action.payload.id);
        if (index !== -1) {
          state.languages[index] = action.payload;
        }
      })
      .addCase(deleteCvLanguage.fulfilled, (state, action) => {
        state.languages = state.languages.filter(lang => lang.id !== action.payload);
      });
  },
});

export default cvLanguageSlice.reducer;
