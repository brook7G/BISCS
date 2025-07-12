import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const User = localStorage.getItem('user');
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  user: User ? JSON.parse(User) : null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data, thunkAPI) => {
    try {
      return await userService.registerUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    return await userService.login(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const saveLocation = createAsyncThunk(
  'user/location',
  async (data, thunkAPI) => {
    try {
      return await userService.saveLocation(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (data, thunkAPI) => {
    try {
      return await userService.getUsers(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getUser = createAsyncThunk(
  'user/getUser',
  async (data, thunkAPI) => {
    try {
      return await userService.getUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getLocation = createAsyncThunk(
  'user/getLocation',
  async (data, thunkAPI) => {
    try {
      return await userService.getLocation(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      // state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    resetUser: state => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getLocation.pending, state => {
        state.isLoading = true;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, resetUser } = userSlice.actions;
export default userSlice.reducer;
