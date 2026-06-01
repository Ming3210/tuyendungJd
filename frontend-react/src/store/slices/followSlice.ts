import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface FollowState {
  followingIds: Record<number | string, boolean>;
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followingIds: {},
  loading: false,
  error: null,
};

export const toggleFollow = createAsyncThunk(
  'follow/toggle',
  async ({ userId, enterpriseId }: { userId: number; enterpriseId: number | string }) => {
    const response = await api.post('/follows/toggle', { userId, enterpriseId });
    return { enterpriseId, following: response.data.following };
  }
);

export const checkFollowStatus = createAsyncThunk(
  'follow/checkStatus',
  async ({ userId, enterpriseId }: { userId: number; enterpriseId: number | string }) => {
    const response = await api.get('/follows/status', { params: { userId, enterpriseId } });
    return { enterpriseId, following: response.data.following };
  }
);

export const fetchUserFollows = createAsyncThunk(
  'follow/fetchUserFollows',
  async (userId: number) => {
    const response = await api.get(`/follows/user/${userId}`);
    return response.data; // List of CompanyFollow
  }
);

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFollow.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.followingIds[action.payload.enterpriseId] = action.payload.following;
      })
      .addCase(checkFollowStatus.fulfilled, (state, action) => {
        state.followingIds[action.payload.enterpriseId] = action.payload.following;
      })
      .addCase(fetchUserFollows.fulfilled, (state, action) => {
        const follows = action.payload as any[];
        follows.forEach(f => {
          state.followingIds[f.enterpriseId] = true;
        });
      });
  },
});

export default followSlice.reducer;
