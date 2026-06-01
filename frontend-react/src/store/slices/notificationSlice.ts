import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  seen: boolean;
  relatedId: number;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notification/fetchAll',
  async (userId: number) => {
    const response = await api.get(`/notifications/user/${userId}`);
    return response.data;
  }
);

export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id: number) => {
    await api.patch(`/notifications/${id}/read`);
    return id;
  }
);

export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (userId: number) => {
    await api.patch(`/notifications/user/${userId}/read-all`);
    return userId;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      // Prevents duplicates and maintains descending order (newest first)
      const exists = state.notifications.find(n => n.id === action.payload.id);
      if (!exists) {
        state.notifications = [action.payload, ...state.notifications];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notif = state.notifications.find(n => n.id === action.payload);
        if (notif) notif.seen = true;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(n => n.seen = true);
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
