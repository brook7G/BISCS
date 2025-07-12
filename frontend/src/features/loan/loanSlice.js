import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loanService from "./loanService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createLoan = createAsyncThunk(
  "academic/createLoan",
  async (data, thunkAPI) => {
    try {
      return await loanService.createLoan(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getStudentLoans = createAsyncThunk(
  "academic/getStudentLoans",
  async (data, thunkAPI) => {
    try {
      return await loanService.getStudentLoans(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getStudentBelongings = createAsyncThunk(
  "academic/getStudentBelongings",
  async (data, thunkAPI) => {
    try {
      return await loanService.getStudentBelongings(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getStudentFileCase = createAsyncThunk(
  "academic/ getStudentFileCase",
  async (data, thunkAPI) => {
    try {
      return await loanService.getStudentFileCase(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const approveStudentLoans = createAsyncThunk(
  "academic/approveStudentLoan",
  async (data, thunkAPI) => {
    try {
      return await loanService.approveStudentLoan(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteStudentLoans = createAsyncThunk(
  "academic/deleteStudentLoans",
  async (data, thunkAPI) => {
    try {
      return await loanService.deleteStudentLoans(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllLoans = createAsyncThunk(
  "academic/getAllLoans",
  async (_, thunkAPI) => {
    try {
      return await loanService.getAllLoans(_);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    reset: (state) => {
      // state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudentLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getStudentLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStudentBelongings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentBelongings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getStudentBelongings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStudentFileCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentFileCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getStudentFileCase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(approveStudentLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveStudentLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(approveStudentLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudentLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudentLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteStudentLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = loanSlice.actions;
export default loanSlice.reducer;
