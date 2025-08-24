import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const addTask = createAsyncThunk(
  "task/addTTask",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("hello");
      const docRef = await addDoc(collection(db, "task"), {
        ...data,
        createdAt: new Date(),
      });
      return { id: docRef.id, ...data };
    } catch (error: any) {
      console.error("Firestore add error:", error);
      return rejectWithValue(error.message);
    }
  }
);

interface Task {
  title: string;
  description?: string;
  category: string;
  status: "to-do" | "in-progress" | "completed";
  dueDate: string;
  createdAt: string;
}

interface TaskStateProps {
  taskItems: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskStateProps = {
  taskItems: [],
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTask.pending, (state) => {
        console.log("load");
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action: any) => {
        state.loading = false;
        state.taskItems.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? action.error.message ?? null;
      });
  },
});

export default taskSlice.reducer;
