import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Candidate {
  id: string | number;
  fullName: string;
  email: string;
  avatar: string;
  birthdate: string;
  gender: string;
  phone: string;
  level: string;
  position: string;
  yearsOfExperience: number | string;
  foreignLanguage?: string[];
  role: string;
}

interface CandidateState {
  candidates: Candidate[];
  totalCandidates: number;
  currentPage: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  candidates: [],
  totalCandidates: 0,
  currentPage: 1,
  limit: 8,
  loading: false,
  error: null,
};

export const fetchCandidatesPaginated = createAsyncThunk(
  'candidate/fetchPaginated',
  async ({ page = 1, limit = 8, sort = '', q = '', role = 'user' }: { 
    page?: number; 
    limit?: number; 
    sort?: string; 
    q?: string;
    role?: string;
  } = {}) => {
    // Artificial delay for testing skeleton loaders
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const response = await api.get('/users', {
      params: {
        _page: page,
        _limit: limit,
        _sort: sort || undefined,
        q: q || undefined,
        role: role || undefined,
      },
    });
    return {
      candidates: response.data,
      totalCandidates: parseInt(response.headers['x-total-count'] || '0', 10),
      page,
      limit,
    };
  }
);

// Backward compatibility or for internal use
export const fetchAllCandidates = fetchCandidatesPaginated;

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    setCandidatePage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesPaginated.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidatesPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload.candidates;
        state.totalCandidates = action.payload.totalCandidates;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCandidatesPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch candidates';
      });
  },
});

export const { setCandidatePage } = candidateSlice.actions;
export default candidateSlice.reducer;
