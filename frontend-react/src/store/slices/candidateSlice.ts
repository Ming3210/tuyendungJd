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
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  candidates: [],
  totalCandidates: 0,
  loading: false,
  error: null,
};

export const fetchAllCandidates = createAsyncThunk('candidate/fetchAll', async () => {
  const response = await api.get('/users');
  return response.data;
});

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCandidates.fulfilled, (state, action) => {
        state.loading = false;
        // Filter only users with role 'user' as candidates
        state.candidates = (action.payload as Candidate[]).filter(c => c.role === 'user');
        state.totalCandidates = state.candidates.length;
      })
      .addCase(fetchAllCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch candidates';
      });
  },
});

export default candidateSlice.reducer;
