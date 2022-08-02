import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  messege: "",
};

//Create New Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      console.log(goalData);
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.messege ||
        error.toString();
      console.log(`messege ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

//Get All Goals
export const getAllGoals = createAsyncThunk(
  "goals/list",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getAllGoals(token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.messege ||
        error.toString();
      console.log(`messege ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

//Delete Goals
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(goalData, token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.messege ||
        error.toString();
      console.log(`messege ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messege = action.payload;
      })
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messege = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messege = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
