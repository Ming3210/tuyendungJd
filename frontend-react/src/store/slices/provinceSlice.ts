import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Province {
  id: string;
  name: string;
  code: string;
}

interface ProvinceState {
  provinces: Province[];
  loading: boolean;
  error: string | null;
}

const initialState: ProvinceState = {
  provinces: [],
  loading: false,
  error: null,
};

const MOCK_PROVINCES: Province[] = [
  { id: '1', name: 'Toàn quốc', code: '' },
  { id: '2', name: 'Hà Nội', code: 'HN' },
  { id: '3', name: 'Hồ Chí Minh', code: 'HCM' },
  { id: '4', name: 'Đà Nẵng', code: 'DN' },
  { id: '5', name: 'Hải Phòng', code: 'HP' },
  { id: '6', name: 'Cần Thơ', code: 'CT' },
  { id: '7', name: 'Đồng Nai', code: 'DNA' },
  { id: '8', name: 'Bình Dương', code: 'BD' },
];

export const fetchAllProvinces = createAsyncThunk('provinces/fetchAll', async () => {
  return MOCK_PROVINCES;
});

const provinceSlice = createSlice({
  name: 'provinces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchAllProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch provinces';
      });
  },
});

export default provinceSlice.reducer;
