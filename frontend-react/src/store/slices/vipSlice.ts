import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface VipState {
  isVip: boolean;
  planType: string | null;
  endDate: string | null;
  subscriptionId: number | null;
  currentSubscription: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: VipState = {
  isVip: false,
  planType: null,
  endDate: null,
  subscriptionId: null,
  currentSubscription: null,
  loading: false,
  error: null,
};

export const checkVipStatus = createAsyncThunk('vip/checkStatus', async (userId: string | number) => {
  const response = await api.get(`/api/vip/status/${userId}`);
  return response.data;
});

export const subscribePlan = createAsyncThunk('vip/subscribe', async (payload: { userId: string | number; planType: string; months: number }) => {
  const response = await api.post('/api/vip/subscribe', payload);
  return response.data;
});

export const confirmPayment = createAsyncThunk('vip/confirmPayment', async (transactionCode: string) => {
  const response = await api.post(`/api/vip/confirm/${transactionCode}`);
  return response.data;
});

export const cancelSubscription = createAsyncThunk('vip/cancel', async (subscriptionId: number) => {
  const response = await api.post(`/api/vip/cancel/${subscriptionId}`);
  return response.data;
});

const vipSlice = createSlice({
  name: 'vip',
  initialState,
  reducers: {
    resetVipState: (state) => {
      state.isVip = false;
      state.planType = null;
      state.endDate = null;
      state.subscriptionId = null;
      state.currentSubscription = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkVipStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkVipStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isVip = action.payload.isVip;
        state.planType = action.payload.planType || null;
        state.endDate = action.payload.endDate || null;
        state.subscriptionId = action.payload.subscriptionId || null;
      })
      .addCase(checkVipStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to check VIP status';
      })
      .addCase(subscribePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
      })
      .addCase(subscribePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Subscription failed';
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.isVip = true;
        state.planType = action.payload.planType;
        state.endDate = action.payload.endDate;
        state.subscriptionId = action.payload.id;
        state.currentSubscription = action.payload;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.isVip = false;
        state.planType = null;
        state.endDate = null;
        state.subscriptionId = null;
        state.currentSubscription = null;
      });
  },
});

export const { resetVipState } = vipSlice.actions;
export default vipSlice.reducer;
