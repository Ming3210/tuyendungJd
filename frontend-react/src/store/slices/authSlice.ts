import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api'

interface User {
  id: string
  userName: string
  email: string
  role: 'admin' | 'candidate' | 'enterprise'
  lock: boolean
  // Add other user fields as needed
}

interface AuthState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  totalUsers: number
  currentPage: number
  limit: number
}

const savedUser = localStorage.getItem('currentUser')
const initialState: AuthState = {
  users: [],
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
  totalUsers: 0,
  currentPage: 1,
  limit: 6,
}

// Simulated Async Thunks (will be updated to use actual API later)
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async ({ page = 1, limit = 6, role = '', q = '' }: { page?: number; limit?: number; role?: string; q?: string } = {}) => {
  const response = await api.get('/users', {
    params: {
      _page: page,
      _limit: limit,
      role: role || undefined,
      q: q || undefined
    }
  })
  return {
    users: response.data,
    totalUsers: parseInt(response.headers['x-total-count'] || '0', 10),
    page,
    limit
  }
})


export const updateProfile = createAsyncThunk('auth/updateProfile', async (updatedUser: any) => {
  // Simulate API call
  return updatedUser
})

export const setUserLock = createAsyncThunk('auth/setUserLock', async ({ userId, lock }: { userId: string; lock: boolean }) => {
  // await api.put(`/users/${userId}/lock`, { lock })
  return { userId, lock }
})

export const setUserRole = createAsyncThunk('auth/setUserRole', async ({ userId, role }: { userId: string; role: string }) => {
  // await api.put(`/users/${userId}/role`, { role })
  return { userId, role }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any | null>) => {
      state.currentUser = action.payload
      if (action.payload) {
        localStorage.setItem('currentUser', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('currentUser')
      }
    },
    logout: (state) => {
      state.currentUser = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('currentUser')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.totalUsers = action.payload.totalUsers
        state.currentPage = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload
        // Update the user in the users list too
        const index = state.users.findIndex(u => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(setUserLock.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => String(u.id) === String(action.payload.userId))
        if (index !== -1) {
          state.users[index].lock = action.payload.lock
        }
      })
      .addCase(setUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => String(u.id) === String(action.payload.userId))
        if (index !== -1) {
          state.users[index].role = action.payload.role as any
        }
      })
  },
})

export const { setCurrentUser, logout } = authSlice.actions
export default authSlice.reducer
