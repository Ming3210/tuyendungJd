import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface InterviewBooking {
  id: string | number;
  jobId: number;
  userId: string | number;
  enterpriseId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'interviewing' | 'completed' | 'cancelled';
  createAt: string;
  updateStatusTime: string[];
  date: string | null;
  time: string | null;
  interviewMode: string | null;
  meetingLink: string | null;
  cancelReason: string | null;
  description: string | null;
  rank: string | null;
  skill: string | null;
  province: string | null;
  district: string | null;
  address: string | null;
  benefitsDescription: string | null;
  workingTime: string | null;
}

interface InterviewBookingState {
  bookings: InterviewBooking[];
  loading: boolean;
  error: string | null;
  totalBookings: number;
  currentPage: number;
  limit: number;
}

const initialState: InterviewBookingState = {
  bookings: [],
  loading: false,
  error: null,
  totalBookings: 0,
  currentPage: 1,
  limit: 10,
};

export const fetchAllBookings = createAsyncThunk('interviewBooking/fetchAll', async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
  const response = await api.get('/interview-bookings', { params: { _page: page, _limit: limit } });
  return {
    bookings: response.data,
    totalBookings: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const fetchEnterpriseBookingsPaginated = createAsyncThunk(
  'interviewBooking/fetchEnterprisePaginated', 
  async ({ enterpriseId, status = 'all', page = 1, limit = 10 }: { enterpriseId: string | number; status?: string; page?: number; limit?: number }) => {
  const response = await api.get(`/interview-bookings/enterprise/${enterpriseId}`, { params: { status, _page: page, _limit: limit } });
  return {
    bookings: response.data,
    totalBookings: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit,
  };
});

export const addBooking = createAsyncThunk('interviewBooking/add', async (payload: Partial<InterviewBooking>) => {
  const response = await api.post('/interview-bookings', payload);
  return response.data;
});

export const updateBooking = createAsyncThunk('interviewBooking/update', async (payload: Partial<InterviewBooking>) => {
  const response = await api.patch(`/interview-bookings/${payload.id}`, payload);
  return response.data;
});

export const deleteBooking = createAsyncThunk('interviewBooking/delete', async (id: string | number) => {
  await api.delete(`/interview-bookings/${id}`);
  return id;
});

const interviewBookingSlice = createSlice({
  name: 'interviewBooking',
  initialState,
  reducers: {
    addBookingOptimistic: (state, action: PayloadAction<InterviewBooking>) => {
      state.bookings.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.totalBookings;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(fetchEnterpriseBookingsPaginated.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnterpriseBookingsPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.totalBookings;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchEnterpriseBookingsPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enterprise bookings';
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
           state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(b => String(b.id) !== String(action.payload));
      });
  },
});

export const { addBookingOptimistic } = interviewBookingSlice.actions;
export default interviewBookingSlice.reducer;

