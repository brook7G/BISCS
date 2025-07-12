import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import academicService from "./clearanceService";

const initialState = {
  isError: false,
  isSuccess: false,
  isSuccessUpdateClearance: false,
  isLoading: false,
  message: "",
};

// create academic type
export const createClearanceType = createAsyncThunk(
  "academic/create",
  async (academicName, thunkAPI) => {
    try {
      return await academicService.createClearanceType(academicName);
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
export const getClearanceDetails = createAsyncThunk(
  "academic/getClearanceDetails",
  async (_, thunkAPI) => {
    try {
      return await academicService.getClearanceDetails();
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
// Get academic types
export const getClearanceTypes = createAsyncThunk(
  "academic/get",
  async (_, thunkAPI) => {
    try {
      return await academicService.getClearanceTypes();
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
// Get update types
export const updateClearance = createAsyncThunk(
  "academic/updateClearnce",
  async (data, thunkAPI) => {
    try {
      return await academicService.updateClearance(data);
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
// Get define Clearance types
export const defineClearance = createAsyncThunk(
  "academic/defineClearance",
  async (data, thunkAPI) => {
    try {
      return await academicService.defineClearance(data);
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
// Get initiate Clearance types
export const initiateStudentClearance = createAsyncThunk(
  "academic/initiateStudentClearance",
  async (data, thunkAPI) => {
    try {
      return await academicService.initiateStudentClearance(data);
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
// Get create students Clearance
export const createStudentsClearance = createAsyncThunk(
  "academic/createStudentsClearance",
  async (data, thunkAPI) => {
    try {
      return await academicService.createStudentsClearance(data);
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
export const getStudentClearance = createAsyncThunk(
  "academic/getStudentClearance",
  async (data, thunkAPI) => {
    try {
      return await academicService.getStudentClearance(data);
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
export const approveStudentClearance = createAsyncThunk(
  "academic/approveStudentClearance",
  async (data, thunkAPI) => {
    try {
      return await academicService.approveStudentClearance(data);
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
export const getSpecificStudentClearances = createAsyncThunk(
  "academic/getSpecificStudentClearances",
  async (data, thunkAPI) => {
    try {
      return await academicService.getSpecificStudentClearances(data);
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
export const getStudentInfo = createAsyncThunk(
  "academic/getStudentInfo",
  async (data, thunkAPI) => {
    try {
      return await academicService.getStudentInfo(data);
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
export const getNotifications = createAsyncThunk(
  "academic/getNotifications",
  async (data, thunkAPI) => {
    try {
      return await academicService.getNotifications(data);
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

export const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isSuccessUpdateClearance = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // to register Floor
      .addCase(createClearanceType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClearanceType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createClearanceType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClearanceDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClearanceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getClearanceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getClearanceTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClearanceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getClearanceTypes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStudentClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getStudentClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSpecificStudentClearances.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificStudentClearances.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getSpecificStudentClearances.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(approveStudentClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveStudentClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(approveStudentClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStudentInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getStudentInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessUpdateClearance = true;
        state.message = action.payload;
      })
      .addCase(updateClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(defineClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(defineClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessUpdateClearance = true;
      })
      .addCase(defineClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createStudentsClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentsClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessUpdateClearance = true;
      })
      .addCase(createStudentsClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(initiateStudentClearance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiateStudentClearance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessUpdateClearance = true;
      })
      .addCase(initiateStudentClearance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = academicSlice.actions;
export default academicSlice.reducer;
